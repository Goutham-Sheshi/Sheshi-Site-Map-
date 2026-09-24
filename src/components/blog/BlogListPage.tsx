import { useState, useMemo } from "react";
import { Route } from "../../types";
import { BLOG_POSTS, BLOG_CATEGORIES, BlogPost } from "../../data/blogData";

interface BlogListPageProps {
  navigate: (r: Route) => void;
  onSelectArticle: (slug: string) => void;
}

export default function BlogListPage({ navigate, onSelectArticle }: BlogListPageProps) {
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<"newest" | "readTime">("newest");

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: BLOG_POSTS.length };
    BLOG_POSTS.forEach((post) => {
      counts[post.tag] = (counts[post.tag] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered and sorted articles
  const filteredArticles = useMemo(() => {
    let result = BLOG_POSTS.filter((post) => {
      const matchesCategory = selectedTag === "all" || post.tag === selectedTag;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.subtitle.toLowerCase().includes(q) ||
        post.desc.toLowerCase().includes(q) ||
        post.author.name.toLowerCase().includes(q) ||
        post.tagLabel.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "readTime") {
      result.sort((a, b) => parseInt(a.readTime) - parseInt(b.readTime));
    }
    return result;
  }, [selectedTag, searchQuery, sortBy]);

  // Featured article is the first flagship article
  const featuredArticle = BLOG_POSTS[0];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs mb-4">
            Thought Leadership &bull; Financial Engineering
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Sheshi Perspectives &amp; Engineering Blog
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            In-depth architectural blueprints on deterministic ledgers, continuous close, multi-tier consolidation,
            and SOX governance written by practitioners.
          </p>
        </div>

        {/* Featured Spotlight Card */}
        {selectedTag === "all" && !searchQuery && featuredArticle && (
          <div className="mb-14 bg-gradient-to-br from-white to-blue-50/40 rounded-3xl border border-slate-200/90 p-8 sm:p-10 shadow-sm hover:border-blue-400 hover:shadow-md transition-all">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-600 text-white shadow-xs">
                    Featured Deep Dive
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{featuredArticle.publishDate}</span>
                  <span className="text-xs text-slate-400 font-mono">&bull;</span>
                  <span className="text-xs text-slate-500 font-medium">{featuredArticle.readTime}</span>
                </div>
                <h2
                  onClick={() => onSelectArticle(featuredArticle.slug)}
                  className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight hover:text-blue-600 cursor-pointer transition-colors mb-3"
                >
                  {featuredArticle.title}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {featuredArticle.subtitle}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-700 text-white font-bold text-xs flex items-center justify-center">
                    {featuredArticle.author.avatar}
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-slate-900">{featuredArticle.author.name}</span>
                    <span className="text-slate-500 block">{featuredArticle.author.role}</span>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-auto shrink-0">
                <button
                  onClick={() => onSelectArticle(featuredArticle.slug)}
                  className="w-full lg:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 group"
                >
                  <span>Read Full Article</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <svg
                className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search articles by title, author, keyword, or standard (e.g. ASC 810, Kafka, SOX)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 shadow-xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold"
                >
                  &times;
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs text-slate-500 self-end md:self-auto">
              <span>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "newest" | "readTime")}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-blue-500 cursor-pointer shadow-xs"
              >
                <option value="newest">Latest Articles</option>
                <option value="readTime">Read Time (Shortest)</option>
              </select>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {BLOG_CATEGORIES.map((cat) => {
              const count = categoryCounts[cat.id] ?? 0;
              const isSelected = selectedTag === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedTag(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all flex items-center gap-2 ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected ? "bg-blue-500/80 text-white" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter / Filter Status */}
        {(searchQuery || selectedTag !== "all") && (
          <div className="flex items-center justify-between text-xs text-slate-500 mb-6 px-1">
            <span>
              Showing {filteredArticles.length} {filteredArticles.length === 1 ? "article" : "articles"}
              {searchQuery && (
                <>
                  {" "}
                  for &ldquo;<strong>{searchQuery}</strong>&rdquo;
                </>
              )}
            </span>
            {(searchQuery || selectedTag !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTag("all");
                }}
                className="text-blue-600 hover:underline cursor-pointer font-medium"
              >
                Reset all filters
              </button>
            )}
          </div>
        )}

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {filteredArticles.map((art) => (
              <div
                key={art.slug}
                onClick={() => onSelectArticle(art.slug)}
                className="p-8 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="text-blue-600 font-bold uppercase tracking-wider font-mono text-[11px]">
                      {art.tagLabel}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">{art.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3 leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {art.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-bold text-[10px] flex items-center justify-center">
                      {art.author.avatar}
                    </div>
                    <span className="text-slate-600 font-medium">{art.author.name}</span>
                  </div>

                  <span className="text-blue-600 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                    <span>Read Article</span>
                    <span>&rarr;</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-slate-200 mb-16">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4 text-xl">
              🔍
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">No matching articles found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6">
              We couldn&apos;t find any articles matching your search. Try adjusting your query or category filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedTag("all");
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Newsletter Signup Banner */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white shadow-lg text-center max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30 mb-3">
            Financial Engineering Dispatch
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
            Stay Ahead of Autonomous Ledger Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6 leading-relaxed">
            Curated monthly briefings for enterprise CFOs, controllers, and distributed systems architects.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Subscribed! You will receive the monthly Sheshi technical dispatch.");
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="work.email@enterprise.com"
              className="w-full px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md cursor-pointer whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
