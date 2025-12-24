import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

interface Env {
  FILE_SHUTTLE_KV: KVNamespace;
  R2_ACCOUNT_ID: string;
  R2_ACCESS_KEY_ID: string;
  R2_SECRET_ACCESS_KEY: string;
  R2_BUCKET_NAME: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const url = new URL(request.url);
  const code = url.searchParams.get("code")?.toUpperCase();

  if (!code) {
    return new Response("Code is required", { status: 400 });
  }

  try {
    // 1. Look up code in KV
    const dataStr = await env.FILE_SHUTTLE_KV.get(code);
    if (!dataStr) {
      return new Response("Invalid or expired code", { status: 404 });
    }

    const { key, filename } = JSON.parse(dataStr);

    // 2. Setup S3 Client (R2)
    const S3 = new S3Client({
      region: "auto",
      endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: env.R2_ACCESS_KEY_ID,
        secretAccessKey: env.R2_SECRET_ACCESS_KEY,
      },
    });

    // 3. Generate Presigned GET URL
    const downloadUrl = await getSignedUrl(S3, new GetObjectCommand({
      Bucket: env.R2_BUCKET_NAME,
      Key: key,
      ResponseContentDisposition: `attachment; filename="${filename}"`
    }), { expiresIn: 3600 }); // Link valid for 1 hour

    return new Response(JSON.stringify({ downloadUrl }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}