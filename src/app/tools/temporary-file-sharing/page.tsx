import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Temporary File Sharing — Files Vanish After 24 Hours | File Shuttle",
  description:
    "Share files temporarily with auto-destruct after 24 hours. No account, no permanent storage. Upload, get a code, share. Files expire automatically.",
  alternates: { canonical: "/tools/temporary-file-sharing" },
  openGraph: {
    title: "Temporary File Sharing — Files Vanish After 24 Hours",
    description:
      "Ephemeral file transfer with auto-destruct. No account, no permanent storage. Upload, get a code, share.",
    type: "article",
  },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to share files temporarily with File Shuttle",
  description:
    "Upload a file, get a temporary code, and share it. The file becomes inaccessible after 24 hours.",
  totalTime: "PT2M",
  tool: { "@type": "HowToTool", name: "Web browser" },
  step: [
    { "@type": "HowToStep", position: 1, name: "Open File Shuttle", text: "Go to file.shuttlelab.org and click the 'Send' button." },
    { "@type": "HowToStep", position: 2, name: "Upload your file", text: "Click the upload area to select your file. Upload starts automatically." },
    { "@type": "HowToStep", position: 3, name: "Get the temporary code", text: "When the upload finishes, a 4-character code appears. This code expires in 24 hours." },
    { "@type": "HowToStep", position: 4, name: "Share with recipient", text: "Copy the code and send it to the recipient. They have 24 hours to download." },
  ],
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How long do files stay on File Shuttle?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The pickup code expires after 24 hours. After that, the code stops working and the file becomes inaccessible. The metadata (code-to-key mapping) is stored in Cloudflare KV with a 24-hour TTL.",
      },
    },
    {
      "@type": "Question",
      name: "Is this truly temporary? Can files be recovered after 24 hours?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The pickup code expires after 24 hours via KV TTL. The R2 object itself isn't auto-deleted, but without a valid code pointing to it, it's effectively unreachable. For true deletion, the R2 lifecycle policy would need to be configured separately.",
      },
    },
    {
      "@type": "Question",
      name: "What happens if someone tries to use an expired code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "They receive a 404 error with the message 'Invalid or expired code.' The file cannot be accessed once the code expires.",
      },
    },
    {
      "@type": "Question",
      name: "Can I set a shorter expiry time?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No. The 24-hour TTL is fixed. If you need a file destroyed sooner, contact support@shuttlelab.org for manual removal.",
      },
    },
    {
      "@type": "Question",
      name: "How is File Shuttle different from WeTransfer for temporary sharing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "WeTransfer's free tier keeps files for 7 days and requires an email address. File Shuttle keeps files for 24 hours and requires no email — just a pickup code. File Shuttle's shorter retention means your data spends less time in the cloud.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Temporary File Sharing — Files Vanish After 24 Hours",
  description:
    "Guide to ephemeral file sharing with auto-destruct. Why temporary file transfer matters for privacy and how File Shuttle implements it.",
  author: { "@type": "Organization", name: "ShuttleLab" },
  publisher: { "@type": "Organization", name: "ShuttleLab", url: "https://shuttlelab.org" },
  url: "https://file.shuttlelab.org/tools/temporary-file-sharing",
};

export default function TemporaryFileSharingPage() {
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
            Temporary File Sharing — Files Vanish After 24 Hours
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed sm:text-xl">
            Share files that don&apos;t stick around. Upload, get a code, share it. After 24 hours, the code expires
            and the file becomes inaccessible. No account, no permanent storage.
          </p>
        </header>

        <section className="prose prose-base max-w-none space-y-12 text-foreground">
          <div>
            <h2 className="text-2xl font-bold mb-3">What is temporary file sharing?</h2>
            <p className="text-muted-foreground leading-relaxed">
              Temporary file sharing is the practice of transferring files with an automatic expiration date.
              Unlike cloud storage services that keep your files indefinitely (Google Drive, Dropbox, OneDrive),
              temporary sharing services remove access to your files after a set period — typically hours or days.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-3">
              This approach is useful when you need to transfer a file once and don&apos;t want it sitting in someone
              else&apos;s cloud account forever. Think of it as handing someone a physical document — they read it,
              and then it&apos;s gone.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Why ephemerality matters for privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Most file-sharing services retain your data indefinitely. A file you shared three years ago might
              still be sitting on a server, accessible to anyone with the link. This creates several risks:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed mt-3">
              <li><strong>Data breaches.</strong> If the service is compromised, old files are exposed alongside new ones.</li>
              <li><strong>Link sharing.</strong> Anyone who intercepts or forwards the link can access the file indefinitely.</li>
              <li><strong>Storage footprint.</strong> Your files contribute to a growing digital footprint you may not control.</li>
              <li><strong>Compliance.</strong> Some regulations (GDPR, CCPA) require data minimization — storing only what&apos;s necessary for only as long as necessary.</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Temporary file sharing addresses these risks by design. The file exists only long enough for the
              intended recipient to download it, then it becomes inaccessible.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">How auto-destruct works in File Shuttle</h2>
            <p className="text-muted-foreground leading-relaxed">
              File Shuttle uses Cloudflare&apos;s infrastructure to implement automatic expiration:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground leading-relaxed mt-3">
              <li><strong>KV storage with TTL.</strong> When you upload a file, the system stores a mapping from the pickup code to the file&apos;s R2 key in Cloudflare KV. This mapping has a 24-hour TTL (time-to-live).</li>
              <li><strong>Code expiration.</strong> After 24 hours, the KV entry expires automatically. The pickup code no longer resolves to a file key.</li>
              <li><strong>Inaccessible file.</strong> Without a valid code-to-key mapping, the file in R2 cannot be located or downloaded through the service. The R2 object itself isn&apos;t auto-deleted, but it&apos;s effectively orphaned.</li>
            </ol>
            <p className="text-muted-foreground leading-relaxed mt-3">
              The download link generated via presigned URL also expires after 1 hour, adding another layer of
              time-limited access.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">Comparison with services that retain files indefinitely</h2>
            <p className="text-muted-foreground leading-relaxed">
              Here&apos;s how File Shuttle compares to common file-sharing services on retention and privacy:
            </p>
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-base border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-3 py-2 text-left font-semibold text-foreground">Service</th>
                    <th className="px-3 py-2 text-left font-semibold text-foreground">Retention</th>
                    <th className="px-3 py-2 text-left font-semibold text-foreground">Account Required</th>
                    <th className="px-3 py-2 text-left font-semibold text-foreground">Auto-Destruct</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="px-3 py-2 font-semibold text-foreground">File Shuttle</td>
                    <td className="px-3 py-2 text-muted-foreground">24 hours</td>
                    <td className="px-3 py-2 text-muted-foreground">No</td>
                    <td className="px-3 py-2 text-muted-foreground">✓</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-3 py-2 font-semibold text-foreground">Google Drive</td>
                    <td className="px-3 py-2 text-muted-foreground">Permanent</td>
                    <td className="px-3 py-2 text-muted-foreground">Yes</td>
                    <td className="px-3 py-2 text-muted-foreground">No</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-3 py-2 font-semibold text-foreground">WeTransfer</td>
                    <td className="px-3 py-2 text-muted-foreground">7 days (free)</td>
                    <td className="px-3 py-2 text-muted-foreground">No</td>
                    <td className="px-3 py-2 text-muted-foreground">No</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="px-3 py-2 font-semibold text-foreground">Dropbox</td>
                    <td className="px-3 py-2 text-muted-foreground">Permanent</td>
                    <td className="px-3 py-2 text-muted-foreground">Yes</td>
                    <td className="px-3 py-2 text-muted-foreground">No</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
                <Link href="/tools/send-large-files" className="text-primary underline">
                  Send Large Files for Free
                </Link>{" "}
                — no email limits, no sign-up required
              </li>
            </ul>
          </div>
        </section>
      </article>
    </>
  );
}
