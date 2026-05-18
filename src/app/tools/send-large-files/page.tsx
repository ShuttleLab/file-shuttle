import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Send Large Files for Free — No Sign-up, Auto-Destruct in 24h | File Shuttle",
  description:
    "Send large files without email limits or account sign-ups. Upload, get a 4-digit code, share it. Files auto-delete after 24 hours. Free, no registration.",
  alternates: { canonical: "/tools/send-large-files" },
  openGraph: {
    title: "Send Large Files for Free — No Sign-up, Auto-Destruct",
    description:
      "Upload large files, get a pickup code, share it. Files auto-delete after 24 hours. No account required.",
    type: "article",
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to send large files for free with File Shuttle",
  description:
    "Upload a large file, get a 4-character code, and share it with the recipient. No account needed.",
  totalTime: "PT2M",
  tool: { "@type": "HowToTool", name: "Web browser" },
  step: [
    { "@type": "HowToStep", position: 1, name: "Open File Shuttle", text: "Go to file.shuttlelab.org and click the 'Send' button." },
    { "@type": "HowToStep", position: 2, name: "Select your file", text: "Click the upload area to select your file. Upload starts automatically." },
    { "@type": "HowToStep", position: 3, name: "Get the pickup code", text: "When the upload finishes, a 4-character code appears on screen." },
    { "@type": "HowToStep", position: 4, name: "Share the code", text: "Copy the code or use the 'Copy: URL + Code' button to share with the recipient." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is the maximum file size I can send?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The practical limit is about 5 GB per file — that's Cloudflare R2's maximum size for a single PUT request, and File Shuttle uploads via a single PUT (multipart upload would be required to reach R2's 5 TB object ceiling). In daily use, files from hundreds of megabytes up to a few gigabytes transfer without issues.",
      },
    },
    {
      "@type": "Question",
      name: "How long does the file stay available?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The pickup code remains valid for 24 hours. After that, the code expires and the file becomes inaccessible. The recipient must download within this window.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need to create an account?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. File Shuttle requires no registration, no login, and no email address. Open the site, upload, get a code, and share it.",
      },
    },
    {
      "@type": "Question",
      name: "Is my file encrypted?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Files are stored in plaintext on Cloudflare R2. Transport uses HTTPS (TLS), but the server can access file contents. For sensitive files, encrypt them with 7-Zip or VeraCrypt before uploading.",
      },
    },
    {
      "@type": "Question",
      name: "How does File Shuttle compare to WeTransfer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WeTransfer's free tier limits uploads to 2 GB and keeps files for 7 days. File Shuttle supports up to about 5 GB per file (Cloudflare R2 single-PUT cap) and files expire in 24 hours. File Shuttle requires no email address — just a pickup code.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Send Large Files for Free — No Sign-up, Auto-Destruct in 24h",
  description:
    "Complete guide to sending large files without email limits or account sign-ups. Upload, get a code, share. Files auto-delete after 24 hours.",
  author: { "@type": "Organization", name: "ShuttleLab" },
  publisher: { "@type": "Organization", name: "ShuttleLab", url: "https://shuttlelab.org" },
  url: "https://file.shuttlelab.org/tools/send-large-files",
};

export default function SendLargeFilesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <header className="mb-8 sm:mb-12">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Send Large Files for Free — No Sign-up, Auto-Destruct in 24h
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed sm:text-xl">
            Email attachments too big? WeChat compressing your files? Upload your file, get a 4-character code,
            and share it. No account required. Files auto-delete after 24 hours.
          </p>
        </header>

        <section className="prose prose-base max-w-none space-y-12 text-foreground">
          <div>
            <h2 className="text-2xl font-bold mb-3">The problem with sending large files</h2>
            <p className="text-muted-foreground leading-relaxed">
              Sending large files online is surprisingly hard. Email providers cap attachments at 25 MB (Gmail)
              or 20 MB (Outlook). Cloud storage services like Google Drive or Dropbox require accounts on both
              ends. Messaging apps like WeChat compress images and videos, destroying quality. And services like
              WeTransfer limit free uploads to 2 GB with a 7-day retention window.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              If you need to send a 50 MB design file, a 200 MB video, or a 1 GB installer — and you need it
              done now, without sign-ups or compression — File Shuttle offers a simpler path.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">How File Shuttle works</h2>
            <p className="text-muted-foreground leading-relaxed">
              File Shuttle is a serverless file transfer service built on Cloudflare&apos;s global infrastructure.
              The flow is simple:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground leading-relaxed mt-3">
              <li><strong>Upload your file.</strong> Go to file.shuttlelab.org, click &ldquo;Send,&rdquo; and select your file. Upload starts immediately.</li>
              <li><strong>Get a 4-character code.</strong> When the upload finishes, you receive a unique pickup code like &ldquo;A7K2&rdquo; — generated from a 31-character set (A-H, J-N, P-Z, 2-9) to avoid confusing characters like I, 1, O, 0.</li>
              <li><strong>Share the code.</strong> Send the code to the recipient via any channel — text message, email, chat. You can also copy the full URL with the code embedded.</li>
              <li><strong>Recipient downloads.</strong> The recipient opens file.shuttlelab.org, clicks &ldquo;Receive,&rdquo; enters the code, and downloads the file directly from Cloudflare R2.</li>
            </ol>
            <p className="text-muted-foreground leading-relaxed mt-3">
              The entire process takes under a minute for most files. No registration, no email exchange, no app installation.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Privacy and security</h2>
            <p className="text-muted-foreground leading-relaxed">
              File Shuttle stores files in Cloudflare R2, a globally distributed object storage service.
              All transfers use HTTPS (TLS encryption), so data is protected in transit. However, files are
              stored in plaintext on R2 — this is not end-to-end encryption. The server can technically access
              file contents.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              For highly sensitive files, we recommend encrypting them before upload using tools like 7-Zip
              (with AES-256 encryption) or VeraCrypt. Share the decryption password through a separate channel.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Files are automatically removed from accessibility after 24 hours — the KV metadata (code-to-key
              mapping) expires via TTL. This means files don&apos;t linger in the cloud indefinitely.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Common large file transfer scenarios</h2>
            <ul className="list-disc list-inside space-y-3 text-muted-foreground leading-relaxed">
              <li><strong>Sending design files to clients.</strong> PSD, AI, or Figma exports often exceed 50 MB. Email bounces them back. File Shuttle handles them without compression.</li>
              <li><strong>Sharing video files.</strong> WeChat and WhatsApp compress video aggressively. Upload the original file and share the code — the recipient gets it at full quality.</li>
              <li><strong>Distributing software installers.</strong> A 500 MB installer can&apos;t go via email. Upload it, share the code, and the download starts instantly from Cloudflare&apos;s CDN.</li>
              <li><strong>Cross-device transfers.</strong> Need a file from your work PC on your home Mac? Upload from one, download on the other — no USB drive, no AirDrop (which only works on Apple devices).</li>
              <li><strong>Temporary contract sharing.</strong> Sharing a legal document that shouldn&apos;t live in someone&apos;s cloud drive forever? The 24-hour expiry keeps it ephemeral.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Frequently Asked Questions</h2>
            <dl className="space-y-6">
              {faqSchema.mainEntity.map((q) => (
                <div key={q.name}>
                  <dt className="font-semibold mb-2">{q.name}</dt>
                  <dd className="text-muted-foreground leading-relaxed">
                    {q.acceptedAnswer.text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="border-t border-border pt-8">
            <h2 className="text-xl font-bold mb-3">Related tools</h2>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-primary underline">
                  File Shuttle Home
                </Link>{" "}
                — upload and download files with a pickup code
              </li>
              <li>
                <Link href="/about" className="text-primary underline">
                  About File Shuttle
                </Link>{" "}
                — privacy, use cases, full FAQ
              </li>
              <li>
                <Link href="/tools/temporary-file-sharing" className="text-primary underline">
                  Temporary File Sharing
                </Link>{" "}
                — learn about ephemeral file transfer
              </li>
            </ul>
          </div>
        </section>
      </article>
    </>
  );
}
