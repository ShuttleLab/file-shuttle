"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";

const CURRENT_HOST = "file.shuttlelab.org";

const SIBLING_SITES: { name: string; host: string; featured?: boolean }[] = [
  { name: "Note Shuttle", host: "note.shuttlelab.org", featured: true },
  { name: "Status Shuttle", host: "status.shuttlelab.org", featured: true },
  { name: "Calendar Shuttle", host: "calendar.shuttlelab.org" },
  { name: "Clipboard Shuttle", host: "clipboard.shuttlelab.org" },
  { name: "Docx Shuttle", host: "docx.shuttlelab.org" },
  { name: "Json Shuttle", host: "json.shuttlelab.org" },
  { name: "Yaml Shuttle", host: "yaml.shuttlelab.org" },
  { name: "Message Shuttle", host: "msg.shuttlelab.org" },
  { name: "Music Shuttle", host: "music.shuttlelab.org" },
  { name: "Nav Shuttle", host: "shuttlelab.org" },
  { name: "File Shuttle", host: "file.shuttlelab.org" },
];

export default function Footer() {
  const { t } = useI18n();
  const others = SIBLING_SITES.filter((s) => s.host !== CURRENT_HOST);

  return (
    <footer className="bg-muted border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <Link href="/about" className="hover:text-foreground transition-colors">
              {t.common.about}
            </Link>
            <span className="text-muted-foreground/30">|</span>
            <a
              href="mailto:support@shuttlelab.org"
              className="hover:text-foreground transition-colors"
            >
              {t.common.contact}
            </a>
          </div>

          <div className="flex flex-col items-center gap-1.5 pt-1">
            <span className="text-xs uppercase tracking-wider text-muted-foreground/70">
              {t.common.otherTools}
            </span>
            <div className="flex items-center gap-x-2 gap-y-1 flex-wrap justify-center max-w-3xl">
              {others.map((s, idx) => (
                <span key={s.host} className="flex items-center gap-x-2">
                  <a
                    href={`https://${s.host}`}
                    rel="noopener"
                    className={
                      s.featured
                        ? "font-semibold text-foreground hover:text-primary transition-colors"
                        : "hover:text-foreground transition-colors"
                    }
                  >
                    {s.name}
                  </a>
                  {idx < others.length - 1 && (
                    <span className="text-muted-foreground/30">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          <p className="pt-1">
            &copy; {new Date().getFullYear()}{" "}
            <a href="https://shuttlelab.org/" className="hover:text-foreground transition-colors">
              {t.common.appName}
            </a>
            . {t.common.allRightsReserved}
          </p>
        </div>
      </div>
    </footer>
  );
}
