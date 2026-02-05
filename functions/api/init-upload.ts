import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

interface Env {
  FILE_SHUTTLE_KV: KVNamespace;
  R2_ACCOUNT_ID: string;
  R2_ACCESS_KEY_ID: string;
  R2_SECRET_ACCESS_KEY: string;
  R2_BUCKET_NAME: string;
}

function generateCode(length: number = 4): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // No I, 1, O, 0 for clarity
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  
  try {
    const { filename, contentType } = await request.json() as { filename: string; contentType: string };

    if (!filename) {
      return new Response("Filename is required", { status: 400 });
    }

    // 1. Generate a unique code
    let code = generateCode();
    let attempts = 0;
    while ((await env.FILE_SHUTTLE_KV.get(code)) && attempts < 5) {
      code = generateCode();
      attempts++;
    }
    if (attempts >= 5) return new Response("Server busy, try again", { status: 503 });

    // 2. Setup S3 Client (R2)
    const S3 = new S3Client({
      region: "auto",
      endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: env.R2_ACCESS_KEY_ID,
        secretAccessKey: env.R2_SECRET_ACCESS_KEY,
      },
    });

    // 3. Generate Presigned PUT URL
    // We use the code as part of the key to ensure uniqueness in the bucket too, 
    // or use a UUID. Let's use `code-filename` to keep it simple but unique per code.
    const key = `${code}-${filename}`;
    
    const url = await getSignedUrl(S3, new PutObjectCommand({
      Bucket: env.R2_BUCKET_NAME,
      Key: key,
      ContentType: contentType,
    }), { expiresIn: 3600 }); // 1 hour to upload

    // 4. Store metadata in KV
    // Expires in 24 hours (86400 seconds)
    await env.FILE_SHUTTLE_KV.put(code, JSON.stringify({ key, filename }), { expirationTtl: 86400 });

    return new Response(JSON.stringify({ code, uploadUrl: url }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}