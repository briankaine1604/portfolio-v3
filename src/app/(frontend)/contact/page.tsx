"use client";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";

export default function Contact() {
  // state for each field
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const trpc = useTRPC();
  const mutation = useMutation(trpc.contact.create.mutationOptions());

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // form values available here
    console.log({
      name,
      email,
      message,
    });
    mutation.mutate(
      { name, email, message },
      {
        onSuccess: () => console.log("success"),
        onError: (err) => console.log(err),
      }
    );

    // reset if needed
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section className="py-20 px-6 md:px-8 bg-gray-50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-light text-slate-900">
            Let’s Build Something Together
          </h2>
          <p className="text-lg text-slate-600 font-light">
            Whether it’s a project idea, a collaboration, or just a hello — I’d
            love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-6 gap-12">
          {/* Contact Form */}
          <form
            className="col-span-4 space-y-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
            onSubmit={onSubmit}
          >
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Name
              </label>
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400/50 focus:border-slate-400 text-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400/50 focus:border-slate-400 text-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Tell me a bit about your project..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400/50 focus:border-slate-400 text-slate-900"
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 focus:ring-2 focus:ring-slate-400/50 shadow transition duration-150"
            >
              Send Message
            </button>
          </form>

          {/* Alternative contact */}
          <div className="flex flex-col justify-center space-y-8 col-span-2">
            <a
              href="mailto:contact@briankaine.com"
              className="flex gap-x-2 items-center"
            >
              <div className="flex size-8 gap-6 text-slate-600">
                <img src="/mail.svg" alt="GitHub" />
              </div>

              <span className="text-slate-600 hover:text-slate-900 transition-colors">
                contact@briankaine.com
              </span>
            </a>

            <div>
              <h3 className="text-lg font-medium text-slate-900">Socials</h3>
              <div className="flex gap-6 mt-3 text-slate-600">
                <a
                  href="https://github.com/briankaine1604"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors"
                >
                  <div className="flex size-8 gap-6 mt-3 text-slate-600">
                    <img src="/github.svg" alt="GitHub" />
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/in/brian-ikeogu-876023199/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors"
                >
                  <div className="flex size-8 gap-6 mt-3 text-slate-600">
                    <img src="/linkedIn.svg" alt="GitHub" />
                  </div>
                </a>
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-900 transition-colors"
                >
                  <div className="flex size-8 gap-6 mt-3 text-slate-600">
                    <img src="/twitter.svg" alt="GitHub" />
                  </div>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-900">Location</h3>
              <p className="text-slate-600">Port Harcourt, Nigeria</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
