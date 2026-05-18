import Link from "next/link";

const CURRENT_HOST = "file.shuttlelab.org";

const SUGGESTIONS = [
  { name: "Note Shuttle", host: "note.shuttlelab.org" },
  { name: "Status Shuttle", host: "status.shuttlelab.org" },
  { name: "Calendar Shuttle", host: "calendar.shuttlelab.org" },
  { name: "Clipboard Shuttle", host: "clipboard.shuttlelab.org" },
];

export default function NotFound() {
  const others = SUGGESTIONS.filter((s) => s.host !== CURRENT_HOST).slice(0, 3);

  return (
    <div className="flex flex-1 items-center justify-center px-4 py-16">
      <div className="text-center max-w-lg">
        <div className="text-7xl mb-4">🚀</div>
        <h1 className="text-5xl font-bold mb-2">404</h1>
        <p className="text-muted-foreground mb-1">页面未找到</p>
        <p className="text-muted-foreground mb-8 text-sm">Page not found</p>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 bg-foreground text-background rounded-md hover:opacity-90 transition-opacity"
        >
          返回首页 / Back to Home
        </Link>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs uppercase tracking-wider text-muted-foreground/70 mb-3">
            Try our other tools
          </p>
          <div className="flex flex-wrap gap-x-3 gap-y-2 justify-center text-sm">
            {others.map((s) => (
              <a
                key={s.host}
                href={`https://${s.host}`}
                rel="noopener"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
