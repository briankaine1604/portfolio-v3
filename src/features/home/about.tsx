import Link from "next/link";

export default function About() {
  return (
    <section className="py-24 px-6 md:px-8 border-t border-slate-200 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-light text-slate-900">
                Building the future of web
              </h2>

              <div className="space-y-4 text-lg text-slate-600 leading-relaxed font-light">
                <p>
                  I'm Brian — a Computer Engineering graduate turned fullstack
                  developer. What started with hardware experiments grew into a
                  passion for building software that feels fast, intelligent,
                  and human.
                </p>

                <p>
                  I live in Port Harcourt and spend most nights exploring ideas
                  at the intersection of web and AI. For me, code isn't just
                  about shipping features — it's about shaping experiences that
                  anticipate what people need, not just react to what they
                  click.
                </p>
              </div>
            </div>

            {/* Currently Exploring */}
            <div className="pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-500 font-medium mb-4">
                Currently Exploring
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:border-slate-300 transition-colors">
                  Bun
                </span>
                <span className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:border-slate-300 transition-colors">
                  Drizzle ORM
                </span>
                <span className="px-4 py-2 bg-white border border-slate-200 rounded-full text-sm text-slate-600 hover:border-slate-300 transition-colors">
                  Hono
                </span>
                <span className="px-4 py-2 bg-gradient-to-r from-orange-50 to-blue-50 border border-orange-200 rounded-full text-sm text-orange-600 font-medium hover:border-orange-300 transition-colors">
                  AI Integration
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group"
              >
                <span className="font-medium">Learn more about my journey</span>
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* Side Stats */}
          <div className="lg:col-span-4">
            <dl className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-4">
              <div className="text-center lg:text-left p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                <dt className="text-3xl font-semibold text-slate-900">20+</dt>
                <dd className="text-sm text-slate-500 mt-1">Projects</dd>
              </div>
              <div className="text-center lg:text-left p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
                <dt className="text-3xl font-semibold text-slate-900">3+</dt>
                <dd className="text-sm text-slate-500 mt-1">Years</dd>
              </div>
              <div className="text-center lg:text-left p-6 bg-gradient-to-br from-orange-50 to-blue-50 rounded-xl border border-orange-200 shadow-sm">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <div
                    className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"
                    aria-hidden="true"
                  ></div>
                  <div className="text-sm text-orange-600 font-medium">
                    AI Focus
                  </div>
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
