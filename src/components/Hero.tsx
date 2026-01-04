"use client";

import { useState } from "react";
import Link from "next/link";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Profile Image */}
            <div className="shrink-0">
              <div className="w-48 h-48 md:w-56 md:h-56 p-1 bg-zinc-900 dark:bg-white rounded-2xl overflow-hidden relative">
                <img
                  alt="Muhammad Aamir Khan, Founder and CEO of Zoviotech"
                  className={`w-full h-full object-cover rounded-xl dark:hidden ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
                  src="./profile_white.png"
                  onLoad={() => setLoaded(true)}
                />
                <img
                  alt="Muhammad Aamir Khan, Founder and CEO of Zoviotech"
                  className={`w-full h-full object-cover rounded-xl hidden dark:block absolute inset-1 ${loaded ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}
                  src="./profile_dark.png"
                  onLoad={() => setLoaded(true)}
                />
              </div>
            </div>

            {/* Hero Content */}
            <div className="text-center md:text-left">
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
                Founder & CEO — Zoviotech
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-4 leading-tight">
                Muhammad Aamir Khan
              </h1>
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 mb-6 max-w-2xl">
                Building AI-powered automation solutions that help businesses scale.
                Leading <a href="https://zoviotech.com" target="_blank" rel="noreferrer" className="underline hover:text-zinc-900 dark:hover:text-white">Zoviotech</a> to
                transform how companies operate through intelligent systems.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a
                  href="https://calendly.com/aamirdev/1-in-1-meeting"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                >
                  Schedule a Call
                </a>
                <a
                  href="https://zoviotech.com"
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg font-medium hover:border-zinc-900 dark:hover:border-white hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  Visit Zoviotech
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-zinc-50 dark:bg-zinc-800/30" id="about">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-6">
            About
          </h2>
          <div className="space-y-4 text-zinc-600 dark:text-zinc-300 leading-relaxed">
            <p>
              Muhammad Aamir Khan is the Founder and CEO of Zoviotech, a technology company focused on AI automation and digital transformation.
            </p>
            <p>
              At Zoviotech, we build intelligent systems that automate business processes, create custom AI agents for internal operations, and engineer scalable SaaS products. Our mission is to make AI accessible and practical for businesses of all sizes.
            </p>
            <p>
              With a vision to transform how companies operate, Aamir leads a team dedicated to delivering real business outcomes through technology—not just building software, but creating systems that fundamentally improve how organizations work.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24" id="services">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white mb-4 text-center">
            What We Build at Zoviotech
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-center mb-12 max-w-2xl mx-auto">
            Enterprise-grade AI solutions that deliver measurable business outcomes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service 1 */}
            <div className="p-6 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-zinc-700 dark:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">AI Automation</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Automate repetitive business processes with intelligent AI systems. Reduce operational costs and free your team to focus on high-value work.
              </p>
            </div>

            {/* Service 2 */}
            <div className="p-6 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-zinc-700 dark:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">Custom AI Agents</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Purpose-built AI agents that handle customer support, data analysis, document processing, and internal workflows autonomously.
              </p>
            </div>

            {/* Service 3 */}
            <div className="p-6 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-zinc-700 dark:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">SaaS Engineering</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                End-to-end SaaS product development. From architecture to deployment, we build scalable products designed for growth.
              </p>
            </div>

            {/* Service 4 */}
            <div className="p-6 border border-zinc-200 dark:border-zinc-700 rounded-xl hover:border-zinc-400 dark:hover:border-zinc-500 transition-colors">
              <div className="w-12 h-12 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-zinc-700 dark:text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">AI Consulting</h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Strategic guidance for AI adoption. We help enterprises and startups identify opportunities, build roadmaps, and implement AI solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-zinc-900 dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Transform Your Business with AI?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Let's discuss how Zoviotech can help automate your operations, build custom AI solutions, or engineer your next product.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://calendly.com/aamirdev/1-in-1-meeting"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3 bg-white text-zinc-900 rounded-lg font-medium hover:bg-zinc-100 transition-colors"
            >
              Schedule a Consultation
            </a>
            <a
              href="https://zoviotech.com"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3 border border-zinc-600 text-white rounded-lg font-medium hover:border-white transition-colors"
            >
              Explore Zoviotech
            </a>
          </div>
        </div>
      </section>

      {/* Footer Links */}
      <section className="py-12 px-6 md:px-12 lg:px-24 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a
              href="https://www.linkedin.com/in/i-aamir-khan"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/aamir-067"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://zoviotech.com"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Zoviotech
            </a>
            <a
              href="mailto:aamirkhan@engineer.com"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Email
            </a>
            <Link
              href="/blogs"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Insights
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Hero;