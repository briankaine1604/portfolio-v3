import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-6 md:px-8 bg-white p-10">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left content */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-slate-400"></div>
                <p className="text-sm font-medium tracking-wider text-slate-500 uppercase">
                  Fullstack Developer
                </p>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-slate-900 leading-[0.95]">
                Hi, I'm{" "}
                <span className="font-medium bg-gradient-to-r from-orange-500 via-blue-600 to-orange-600 bg-clip-text text-transparent">
                  Brian
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl font-light">
                I craft digital experiences that are both beautiful and
                functional. Specializing in modern web technologies and
                user-centered design.
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#projects"
                className="group px-8 py-4 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all duration-200 text-center"
              >
                View My Work
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <Link
                href="/contact"
                className="px-8 py-4 border border-slate-200 text-slate-700 rounded-lg font-medium hover:border-slate-300 hover:bg-slate-50 transition-all duration-200 text-center"
              >
                Get In Touch
              </Link>
            </div>

            {/* Quick stats/skills - Improved spacing and semantic markup */}
            <dl className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-200">
              <div className="text-center sm:text-left">
                <dt className="text-3xl font-semibold text-slate-900">3+</dt>
                <dd className="text-sm text-slate-500 mt-1">
                  Years Experience
                </dd>
              </div>
              <div className="text-center sm:text-left border-l border-slate-100 pl-6">
                <dt className="text-3xl font-semibold text-slate-900">20+</dt>
                <dd className="text-sm text-slate-500 mt-1">
                  Projects Delivered
                </dd>
              </div>
              <div className="text-center sm:text-left border-l border-slate-100 pl-6">
                <dt className="text-3xl font-semibold text-slate-900">∞</dt>
                <dd className="text-sm text-slate-500 mt-1">Lines of Code</dd>
              </div>
            </dl>
          </div>

          {/* Right visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main image container */}
              <div className="w-80 h-80 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-lg">
                <Image
                  src="/profile.webp"
                  alt="Brian - Fullstack Developer"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* Subtle decorative elements - Added aria-hidden */}
              <div
                className="absolute -z-10 -top-4 -right-4 w-20 h-20 bg-orange-100 rounded-2xl opacity-40"
                aria-hidden="true"
              ></div>
              <div
                className="absolute -z-10 -bottom-6 -left-6 w-16 h-16 bg-blue-100 rounded-full opacity-30"
                aria-hidden="true"
              ></div>

              {/* Small accent elements */}
              <div
                className="absolute top-4 left-4 w-2 h-2 bg-orange-400 rounded-full opacity-70"
                aria-hidden="true"
              ></div>
              <div
                className="absolute bottom-8 right-6 w-1 h-6 bg-blue-400 opacity-40"
                aria-hidden="true"
              ></div>
            </div>
          </div>
        </div>

        {/* Tech stack indicator - Core technologies */}
        <div className="mt-24 pt-12 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <p className="text-sm text-slate-500 font-medium">
              Core Technologies
            </p>
            <div>
              <div className="flex flex-wrap gap-6 text-sm text-slate-400">
                <span className="hover:text-slate-600 transition-colors cursor-default">
                  React
                </span>
                <span className="hover:text-slate-600 transition-colors cursor-default">
                  Next.js
                </span>
                <span className="hover:text-slate-600 transition-colors cursor-default">
                  TypeScript
                </span>
                <span className="hover:text-slate-600 transition-colors cursor-default">
                  Node.js
                </span>
                <span className="hover:text-slate-600 transition-colors cursor-default">
                  Tailwind
                </span>
                <span className="hover:text-slate-600 transition-colors cursor-default">
                  PostgreSQL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
