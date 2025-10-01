export default function About() {
  return (
    <section className="py-16 px-6 md:px-8  border-t border-slate-100 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-light text-slate-900">
                Building the future of web
              </h2>

              <div className="space-y-4 text-lg text-slate-600 leading-relaxed font-light">
                <p>
                  I’m Brian — a Computer Engineering graduate turned fullstack
                  developer. What started with hardware experiments grew into a
                  passion for building software that feels fast, intelligent,
                  and human.
                </p>

                <p>
                  I live in Port Harcourt and spend most nights exploring ideas
                  at the intersection of web and AI. For me, code isn’t just
                  about shipping features — it’s about shaping experiences that
                  anticipate what people need, not just react to what they
                  click.
                </p>
              </div>
            </div>

            {/* Tech Stack Highlights */}
          </div>

          {/* Side Stats */}
          <div className="lg:col-span-4">
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-4">
              <div className="text-center lg:text-left p-4 bg-slate-50 rounded-lg">
                <div className="text-2xl font-semibold text-slate-900">20+</div>
                <div className="text-sm text-slate-500">Projects</div>
              </div>
              <div className="text-center lg:text-left p-4 bg-slate-50 rounded-lg">
                <div className="text-2xl font-semibold text-slate-900">3+</div>
                <div className="text-sm text-slate-500">Years</div>
              </div>
              <div className="text-center lg:text-left p-4 bg-gradient-to-br from-orange-50 to-blue-50 rounded-lg border border-orange-100">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                  <div className="text-sm text-orange-600 font-medium">
                    AI Focus
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
