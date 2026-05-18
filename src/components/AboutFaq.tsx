"use client";

import { useI18n } from "@/lib/i18n";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { WHO_FOR, WHEN_USE, HOWTOS, FAQS, COMPARISON, HEADINGS } from "@/lib/faq-data";

export { aboutFaqData } from "@/lib/faq-data";

export function AboutFaq() {
  const { lang } = useI18n();
  const comparison = COMPARISON[lang];

  return (
    <div className="space-y-10">
      {/* Who is it for */}
      <Card className="border-2 border-border shadow-md">
        <CardHeader>
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            {HEADINGS.whoFor[lang]}
          </h2>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-muted-foreground text-lg leading-relaxed list-disc list-inside">
            {WHO_FOR.map((item, i) => (
              <li key={i}>{item[lang]}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* When to use */}
      <Card className="border-2 border-border shadow-md">
        <CardHeader>
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            {HEADINGS.whenUse[lang]}
          </h2>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-muted-foreground text-lg leading-relaxed list-disc list-inside">
            {WHEN_USE.map((item, i) => (
              <li key={i}>{item[lang]}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* HowTo sections */}
      <section className="space-y-6">
        {HOWTOS.map((ht) => (
          <Card key={ht.id} className="border-2 border-border shadow-md">
            <CardHeader>
              <h2 className="text-xl font-bold text-foreground sm:text-2xl">
                {ht.name[lang]}
              </h2>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 text-muted-foreground text-lg leading-relaxed list-decimal list-inside">
                {ht.steps.map((s, i) => (
                  <li key={i}>{s[lang]}</li>
                ))}
              </ol>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Comparison */}
      <Card className="border-2 border-border shadow-md">
        <CardHeader>
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            {comparison.heading}
          </h2>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-base">
              <thead>
                <tr className="border-b border-border">
                  {comparison.columns.map((c, i) => (
                    <th key={i} className="px-3 py-2 text-left font-semibold text-foreground">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row, r) => (
                  <tr key={r} className="border-b border-border/50">
                    {row.map((cell, c) => (
                      <td
                        key={c}
                        className={
                          c === 0
                            ? "px-3 py-2 font-semibold text-foreground"
                            : "px-3 py-2 text-muted-foreground"
                        }
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* FAQ */}
      <Card className="border-2 border-border shadow-md">
        <CardHeader>
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">
            {HEADINGS.faq[lang]}
          </h2>
        </CardHeader>
        <CardContent>
          <dl className="space-y-6">
            {FAQS.map((item, i) => (
              <div key={i}>
                <dt className="font-semibold text-foreground text-lg mb-2">
                  {item.q[lang]}
                </dt>
                <dd className="text-muted-foreground text-base leading-relaxed">
                  {item.a[lang]}
                </dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}
