import { useState, useEffect } from "react";
import { Route } from "../../types";
import { BlogPost, BLOG_POSTS } from "../../data/blogData";

interface BlogPostPageProps {
  post: BlogPost;
  navigate: (r: Route) => void;
  onBackToBlog: () => void;
}

export default function BlogPostPage({ post, navigate, onBackToBlog }: BlogPostPageProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(post.sections[0]?.id || "");

  // Update scroll reading progress
  useEffect(() => {
    function handleScroll() {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard?.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Find previous and next articles
  const currentIndex = BLOG_POSTS.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextPost = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

  // Find related articles
  const relatedPosts = BLOG_POSTS.filter((p) => post.relatedSlugs.includes(p.slug));

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen relative">
      {/* Reading Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <button
              onClick={() => navigate({ page: "home" })}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <span>/</span>
            <button
              onClick={() => navigate({ page: "resources", sub: "blog" })}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Resources
            </button>
            <span>/</span>
            <button
              onClick={onBackToBlog}
              className="hover:text-blue-600 transition-colors cursor-pointer"
            >
              Blog
            </button>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-xs">{post.title}</span>
          </nav>

          <button
            onClick={onBackToBlog}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-xs cursor-pointer"
          >
            &larr; Back to all articles
          </button>
        </div>

        {/* Article Header */}
        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
              {post.tagLabel}
            </span>
            <span className="text-slate-400 text-xs">&bull;</span>
            <time className="text-xs text-slate-500 font-medium">{post.publishDate}</time>
            <span className="text-slate-400 text-xs">&bull;</span>
            <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded">
              {post.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8">
            {post.subtitle}
          </p>

          {/* Author Bar & Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-xs">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 text-white font-bold text-sm flex items-center justify-center shadow-xs">
                {post.author.avatar}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{post.author.name}</div>
                <div className="text-xs text-slate-500">{post.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all cursor-pointer"
                title="Share this article"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-emerald-700 font-medium">Link copied!</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Key Takeaways Callout Card */}
        <section className="mb-12 p-6 sm:p-8 bg-blue-50/70 border border-blue-200 rounded-2xl shadow-xs">
          <div className="flex items-center gap-2.5 text-blue-900 font-bold text-sm sm:text-base mb-3.5">
            <span className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-600 text-white text-xs font-bold">
              &check;
            </span>
            <span>Key Executive Takeaways</span>
          </div>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            {post.keyTakeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-blue-600 font-bold mt-0.5">&bull;</span>
                <span className="leading-relaxed">{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Table of Contents Floating/Header Bar */}
        {post.sections.length > 1 && (
          <nav aria-label="Table of contents" className="mb-12 p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono mb-3">
              Table of Contents
            </h3>
            <div className="flex flex-wrap gap-2">
              {post.sections.map((section, idx) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer text-left ${
                    activeSection === section.id
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200"
                  }`}
                >
                  <span className="opacity-60 mr-1.5">{idx + 1}.</span>
                  {section.title}
                </button>
              ))}
            </div>
          </nav>
        )}

        {/* Structured Article Sections */}
        <div className="space-y-14">
          {post.sections.map((sec, idx) => (
            <article key={sec.id} id={sec.id} className="scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-5 flex items-baseline gap-3">
                <span className="text-blue-600 font-mono text-lg font-semibold">0{idx + 1}.</span>
                <span>{sec.title}</span>
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
                {sec.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Callout Block */}
              {sec.callout && (
                <div
                  className={`mt-6 p-5 sm:p-6 rounded-2xl border ${
                    sec.callout.type === "warning"
                      ? "bg-amber-50/70 border-amber-200 text-amber-950"
                      : sec.callout.type === "formula"
                      ? "bg-slate-900 text-white border-slate-800"
                      : sec.callout.type === "stat"
                      ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
                      : "bg-blue-50/70 border-blue-200 text-blue-950"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider mb-2">
                    {sec.callout.type === "warning" && <span>⚠️ Caution &bull; Architectural Constraint</span>}
                    {sec.callout.type === "formula" && <span className="text-blue-400 font-mono">&Sigma; Ledger Invariant Equation</span>}
                    {sec.callout.type === "stat" && <span className="text-emerald-700 font-mono">📊 Benchmark Performance</span>}
                    {sec.callout.type === "note" && <span className="text-blue-700">📌 Regulatory Context</span>}
                  </div>
                  <h4 className="text-base font-bold mb-1.5">{sec.callout.title}</h4>
                  <p className="text-xs sm:text-sm leading-relaxed opacity-90">{sec.callout.text}</p>
                </div>
              )}

              {/* Comparison / Structured Data Table */}
              {sec.table && (
                <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-800 font-bold font-mono">
                        {sec.table.headers.map((h, hIdx) => (
                          <th key={hIdx} className="py-3 px-4 sm:px-5">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700">
                      {sec.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-slate-50/50"}>
                          {row.map((cell, cIdx) => (
                            <td
                              key={cIdx}
                              className={`py-3 px-4 sm:px-5 ${cIdx === 0 ? "font-semibold text-slate-900" : ""}`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Code Snippet / Manifest Block */}
              {sec.codeBlock && (
                <div className="mt-8 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100 shadow-md">
                  <div className="bg-slate-900 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                    <span>{sec.codeBlock.caption || sec.codeBlock.language.toUpperCase()}</span>
                    <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                      {sec.codeBlock.language}
                    </span>
                  </div>
                  <pre className="p-4 sm:p-5 text-xs font-mono overflow-x-auto text-emerald-400 leading-relaxed">
                    <code>{sec.codeBlock.code}</code>
                  </pre>
                </div>
              )}

              {/* Bullet Points */}
              {sec.bulletPoints && (
                <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-slate-700 pl-2">
                  {sec.bulletPoints.map((item, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        {/* Author Bio Card */}
        <div className="mt-16 p-6 sm:p-8 bg-white rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center sm:items-start gap-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-blue-700 to-indigo-600 text-white font-bold text-xl flex items-center justify-center shrink-0 shadow-sm">
            {post.author.avatar}
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 font-mono mb-1">
              About the Author
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">{post.author.name}</h3>
            {post.author.credentials && (
              <p className="text-xs text-slate-500 font-medium mb-3">{post.author.credentials}</p>
            )}
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">{post.author.bio}</p>
            <button
              onClick={() => navigate({ page: "company", sub: "team" })}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
            >
              Meet the Sheshi Engineering &amp; Accounting Team &rarr;
            </button>
          </div>
        </div>

        {/* Previous & Next Navigation */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-slate-200">
          {prevPost ? (
            <button
              onClick={() => navigate({ page: "resources", sub: "blog", slug: prevPost.slug })}
              className="p-5 text-left bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all group cursor-pointer"
            >
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                &larr; Previous Article
              </div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {prevPost.title}
              </div>
            </button>
          ) : (
            <div />
          )}

          {nextPost ? (
            <button
              onClick={() => navigate({ page: "resources", sub: "blog", slug: nextPost.slug })}
              className="p-5 text-right bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all group cursor-pointer"
            >
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Next Article &rarr;
              </div>
              <div className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                {nextPost.title}
              </div>
            </button>
          ) : (
            <div />
          )}
        </div>

        {/* Related Articles Grid */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-slate-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                  Related Architecture Guides
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Continue exploring deterministic financial systems and continuous accounting.
                </p>
              </div>
              <button
                onClick={onBackToBlog}
                className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
              >
                View all ({BLOG_POSTS.length}) &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rel) => (
                <div
                  key={rel.slug}
                  onClick={() => navigate({ page: "resources", sub: "blog", slug: rel.slug })}
                  className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 mb-2 inline-block">
                      {rel.tagLabel}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-3 mb-4">{rel.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{rel.readTime}</span>
                    <span className="text-blue-600 font-bold group-hover:underline">Read &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Executive Newsletter Signup */}
        <section className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 to-blue-950 text-white shadow-xl text-center">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-4">
            The Sheshi Technical Briefing
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
            Get Architecture Walkthroughs in Your Inbox
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mb-6 leading-relaxed">
            Join 12,000+ CFOs, controllers, and distributed systems engineers receiving monthly deep-dives on ASC 810, Kafka CDC ledger pipelines, and zero-day financial closes.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing to the Sheshi Technical Briefing!");
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="corporate.email@company.com"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800/90 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          <p className="text-[11px] text-slate-400 mt-3 font-mono">Zero spam &bull; Unsubscribe at any time &bull; Strictly technical</p>
        </section>
      </div>
    </div>
  );
}
