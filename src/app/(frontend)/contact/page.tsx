"use client";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { Mail, Github, Linkedin, Twitter, MapPin } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const trpc = useTRPC();
  const mutation = useMutation(trpc.contact.create.mutationOptions());

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(
      { name, email, message },
      {
        onSuccess: () => {
          console.log("success");
          // Reset form on success
          setName("");
          setEmail("");
          setMessage("");
        },
        onError: (err) => console.log(err),
      }
    );
  };

  return (
    <section className="min-h-screen px-6 py-20 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-px bg-slate-400"></div>
            <p className="text-sm font-medium tracking-wider text-slate-500 uppercase">
              Get In Touch
            </p>
          </div>

          <h1 className="text-4xl md:text-5xl font-light text-slate-900">
            Let's Build Something Together
          </h1>

          <p className="text-lg text-slate-600 font-light max-w-2xl leading-relaxed">
            Whether it's a project idea, a collaboration, or just a hello — I'd
            love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {/* Contact Form */}
          <form className="md:col-span-2 space-y-6" onSubmit={onSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-slate-400 text-slate-900 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-slate-400 text-slate-900 transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                placeholder="Tell me about your project..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:border-slate-400 text-slate-900 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className="w-full px-8 py-4 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {mutation.isPending ? "Sending..." : "Send Message"}
            </button>

            {mutation.isSuccess && (
              <p className="text-sm text-green-600 text-center">
                Message sent successfully! I'll get back to you soon.
              </p>
            )}

            {mutation.isError && (
              <p className="text-sm text-red-600 text-center">
                Something went wrong. Please try again.
              </p>
            )}
          </form>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-4">Email</h3>
              <a
                href="mailto:contact@briankaine.com"
                className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors group"
              >
                <Mail className="w-5 h-5" />
                <span className="group-hover:underline">
                  contact@briankaine.com
                </span>
              </a>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-4">
                Socials
              </h3>
              <div className="space-y-3">
                <a
                  href="https://github.com/briankaine1604"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/brian-ikeogu-876023199/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://x.com/Briankaine_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                  <span>Twitter</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-slate-900 mb-4">
                Location
              </h3>
              <div className="flex items-center gap-3 text-slate-600">
                <MapPin className="w-5 h-5" />
                <span>Port Harcourt, Nigeria</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
