import Image from "next/image";

const highlights = [
  "Original structure with a premium editorial layout",
  "A clear call-to-action for launches and invitations",
  "Responsive design that reads well in email and document previews",
];

export default function ChallengePage() {
  return (
    <main className="min-h-screen bg-[#f7f4ef] px-4 py-10 text-stone-900">
      <div className="mx-auto max-w-6xl rounded-[28px] border border-stone-200 bg-white p-6 shadow-[0_20px_80px_rgba(15,23,42,0.08)] md:p-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="mb-2 inline-flex rounded-full bg-[#fdf0f0] px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#8a4f4f]">
              Built with Elements
            </p>
            <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
              Spring Launch Brief
            </h1>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-[#faf8f4] px-4 py-3 text-sm font-medium text-stone-700">
            Original email-template concept
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <section className="overflow-hidden rounded-[24px] border border-stone-200 bg-[#fffdfb]">
            <div className="bg-[linear-gradient(135deg,#f8e9e1,#fffaf7)] p-6">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
                    Unlayer / Elements Demo
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold md:text-3xl">
                    Shape a standout message with one confident template.
                  </h2>
                </div>
                <div className="rounded-full bg-white px-3 py-1 text-sm font-medium text-stone-700 shadow-sm">
                  Campaign Ready
                </div>
              </div>

              <div className="rounded-[20px] border border-white/80 bg-white p-5 shadow-sm">
                <p className="mb-4 text-sm font-medium text-stone-500">
                  Hi team,
                </p>
                <div className="space-y-4 text-[15px] leading-7 text-stone-700">
                  <p>
                    This original concept uses a soft editorial structure, a bold title block,
                    and highly readable supporting copy to make reusable template content feel
                    premium instead of generic.
                  </p>
                  <p>
                    The emphasis is on a crisp hierarchy: headline, proof points, and a single,
                    clear action so the message feels polished in both email and document form.
                  </p>
                </div>

                <div className="mt-6 rounded-[18px] bg-[#f9f5ef] p-4">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-stone-500">
                    Highlights
                  </p>
                  <ul className="mt-3 space-y-2 text-sm text-stone-700">
                    {highlights.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-[#c18470]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <button className="rounded-full bg-[#111111] px-4 py-2 text-sm font-semibold text-white">
                    Launch Preview
                  </button>
                  <button className="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700">
                    Copy Layout
                  </button>
                </div>
              </div>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="rounded-[24px] border border-stone-200 bg-[#faf8f4] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                Why it stands out
              </p>
              <div className="mt-4 space-y-3 text-sm text-stone-700">
                <div className="rounded-2xl bg-white p-3">
                  Editorial balance with room for branding and copy variation
                </div>
                <div className="rounded-2xl bg-white p-3">
                  Designed to feel useful for real product launches, invites, and announcements
                </div>
                <div className="rounded-2xl bg-white p-3">
                  Keeps the template showcase focused on clarity and execution
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-stone-200 bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                Preview snapshot
              </p>
              <div className="mt-3 overflow-hidden rounded-[18px] border border-stone-200">
                <Image
                  src="/elements-template-preview.svg"
                  alt="Elements challenge template preview"
                  width={800}
                  height={620}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
