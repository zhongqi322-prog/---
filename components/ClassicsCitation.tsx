import type { ReportCitation } from "@/lib/mock-report";

type ClassicsCitationProps = {
  citations?: ReportCitation[];
};

export function ClassicsCitation({ citations = [] }: ClassicsCitationProps) {
  return (
    <section className="rounded-3xl border border-gold/30 bg-amber-50/80 p-5">
      <p className="mb-3 text-sm font-semibold text-cinnabar">古籍出处</p>
      <div className="space-y-3">
        {citations.length === 0 ? (
          <div className="rounded-2xl bg-white/70 p-4 text-sm leading-7 text-muted">
            进入具体功能并生成 mock 报告后，这里会展示已审核、可使用且可追溯到 raw 文件的古籍出处。
          </div>
        ) : null}
        {citations.map((citation) => (
          <div className="space-y-2 rounded-2xl bg-white/70 p-4 text-sm leading-7 text-muted" key={citation.id}>
            <p>
              <span className="font-semibold text-ink">书名：</span>
              {citation.bookTitle}
            </p>
            <p>
              <span className="font-semibold text-ink">章节：</span>
              {citation.chapter}
            </p>
            <p>
              <span className="font-semibold text-ink">原文：</span>
              {citation.sourceText}
            </p>
            <p>
              <span className="font-semibold text-ink">白话解释：</span>
              {citation.plainExplanation}
            </p>
            <p>
              <span className="font-semibold text-ink">与本问题的关系：</span>
              {citation.relationToQuestion}
            </p>
            <p>
              <span className="font-semibold text-ink">风险提醒：</span>
              {citation.riskReminder}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
