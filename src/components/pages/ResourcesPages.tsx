import { useState, useEffect } from "react";
import { Route } from "../../types";
import BlogListPage from "../blog/BlogListPage";
import BlogPostPage from "../blog/BlogPostPage";
import { BLOG_POSTS } from "../../data/blogData";

export default function ResourcesPages({
  sub,
  slug,
  navigate,
}: {
  sub?: string;
  slug?: string;
  navigate: (r: Route) => void;
}) {
  switch (sub) {
    case "events":
    case "webinars":
      return <EventsPage navigate={navigate} />;
    case "research":
      return <ResearchPage navigate={navigate} />;
    case "blog":
    case "insights":
      return <BlogContainer slug={slug} navigate={navigate} />;
    case "casestudies":
      return <CaseStudiesPage navigate={navigate} />;
    case "updates":
      return <UpdatesPage navigate={navigate} />;
    default:
      return <BlogContainer slug={slug} navigate={navigate} />;
  }
}

// ═════════════════════════════════════════════════════════════════════════════════
// 1. EVENTS & WEBINARS (SHESHI NEXUS 2026 SUMMIT)
// ═════════════════════════════════════════════════════════════════════════════════

function EventsPage({ navigate }: { navigate: (r: Route) => void }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const events = [
    { title: "Sheshi NEXUS 2026 Flagship Summit", date: "Oct 14-16, 2026", loc: "San Francisco, CA & Virtual", type: "Annual Conference", desc: "The premier gathering for CFOs, controllers, and financial systems architects discussing zero-day continuous close." },
    { title: "Global CFO Roundtable: ASC 810 Consolidation", date: "Nov 5, 2026", loc: "London, UK (100 Bishopsgate)", type: "Executive Roundtable", desc: "Private Chatham House rule dinner analyzing multi-entity intercompany netting strategies for FTSE 100 leaders." },
    { title: "Masterclass: Migrating from Legacy Batch to Kafka Streams", date: "Nov 19, 2026", loc: "Virtual Webinar (On-Demand)", type: "Technical Masterclass", desc: "Engineering deep-dive on integrating SAP S/4HANA CDC streams with zero table modifications." },
    { title: "APAC Financial Intelligence Forum", date: "Dec 3, 2026", loc: "Singapore (Marina Bay)", type: "Regional Forum", desc: "Examining cross-border currency remeasurement and tax compliance across Southeast Asian subsidiaries." },
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs mb-4">
            Global Gatherings &amp; Masterclasses
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Conferences, Roundtables &amp; Masterclasses
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Connect with 5,000+ finance leaders, Big 4 partners, and distributed systems architects shaping the
            future of governed financial intelligence.
          </p>
        </div>

        {/* Flagship Event Banner */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white rounded-2xl p-8 sm:p-12 mb-16 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="text-xs font-mono font-bold text-blue-200 uppercase tracking-widest px-3 py-1 rounded bg-blue-900/60 border border-blue-400/40 mb-4 inline-block">
              OCTOBER 14-16, 2026 • SAN FRANCISCO &amp; VIRTUAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">Sheshi NEXUS 2026 Global Summit</h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed mb-8">
              3 days of executive keynotes, hands-on architectural labs, and roundtables with Fortune 500
              controllers, Big 4 auditors, and leading fintech researchers.
            </p>
            <button
              onClick={() => {
                setModalOpen(true);
                setSubmitted(false);
              }}
              className="px-6 py-3 bg-white text-blue-800 font-bold text-xs rounded-xl shadow-md hover:bg-blue-50 cursor-pointer transition-all"
            >
              Reserve VIP or Virtual Pass →
            </button>
          </div>
        </div>

        {/* Events Catalog */}
        <div className="space-y-4 mb-16">
          {events.map((e, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-[10px] font-mono font-bold text-blue-600 uppercase px-2 py-0.5 rounded bg-blue-50">
                    {e.type}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">📅 {e.date}</span>
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1">{e.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">{e.desc}</p>
                <div className="text-[11px] text-slate-400 font-mono mt-2">📍 {e.loc}</div>
              </div>
              <button
                onClick={() => {
                  setModalOpen(true);
                  setSubmitted(false);
                }}
                className="px-4 py-2 bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-semibold rounded-xl border border-blue-200 transition-all cursor-pointer self-start sm:self-center shrink-0"
              >
                Register Pass →
              </button>
            </div>
          ))}
        </div>

        {/* Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-slate-200 max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>

              {submitted ? (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">Event Registration Confirmed!</h3>
                  <p className="text-xs text-slate-600 mb-6">
                    Your session access credentials and calendar invites have been dispatched.
                  </p>
                  <button
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-4 text-xs"
                >
                  <div>
                    <span className="text-[10px] font-mono text-blue-600 uppercase font-bold">EVENT PASS</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">Register for Sheshi Events</h3>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Full Name *</label>
                    <input required type="text" placeholder="Sarah Jenkins" className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-slate-900" />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Corporate Email *</label>
                    <input required type="email" placeholder="sarah@company.com" className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-slate-900" />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Attendance Mode</label>
                    <select className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none bg-white text-slate-900">
                      <option>Virtual Livestream (Free Access)</option>
                      <option>In-Person VIP Pass (San Francisco)</option>
                      <option>Private London Dinner (By Invitation)</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl cursor-pointer transition-all"
                  >
                    Confirm Event Pass
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// 2. RESEARCH & THE NUMBERS STORY
// ═════════════════════════════════════════════════════════════════════════════════

function ResearchPage({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs mb-4">
            Empirical Benchmark Data
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            The Numbers Story: 4,200 CFO Survey
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Our comprehensive empirical study surveying corporate controllers and CFOs across North America,
            Europe, and APAC on the hidden operational costs of spreadsheet-based month-end closes.
          </p>
        </div>

        {/* Survey Stat Bars */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 mb-16 shadow-xs">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Key Empirical Findings</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              { stat: "84%", label: "Finance leaders admit their month-end close relies on un-governed Excel models with known formula risks" },
              { stat: "68%", label: "Reduction in close cycle duration achieved after transitioning from legacy batch to continuous streaming ledgers" },
              { stat: "92%", label: "Of corporate controllers report working more than 60 hours per week during quarterly earnings closes" },
              { stat: "$180k+", label: "Average annual audit overtime fee incurred due to delayed manual PBC sample gathering" },
            ].map((s, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-6">
                <div className="text-3xl font-extrabold text-blue-700 w-24 shrink-0 font-mono text-center">
                  {s.stat}
                </div>
                <div className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate({ page: "contact" })}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
          >
            Download Full 48-Page Research Report →
          </button>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// 3. BLOG & INSIGHTS (WORKING BLOG SYSTEM)
// ═════════════════════════════════════════════════════════════════════════════════

interface BlogContainerProps {
  slug?: string;
  navigate: (r: Route) => void;
}

function BlogContainer({ slug, navigate }: BlogContainerProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(slug || null);

  // Sync internal state when external slug changes (e.g. browser back/forward or direct hash change)
  useEffect(() => {
    setActiveSlug(slug || null);
  }, [slug]);

  const handleSelectArticle = (selectedSlug: string) => {
    setActiveSlug(selectedSlug);
    navigate({ page: "resources", sub: "blog", slug: selectedSlug });
  };

  const handleBackToBlog = () => {
    setActiveSlug(null);
    navigate({ page: "resources", sub: "blog" });
  };

  const currentPost = activeSlug ? BLOG_POSTS.find((p) => p.slug === activeSlug) : null;

  if (currentPost) {
    return (
      <BlogPostPage
        post={currentPost}
        navigate={navigate}
        onBackToBlog={handleBackToBlog}
      />
    );
  }

  return (
    <BlogListPage
      navigate={navigate}
      onSelectArticle={handleSelectArticle}
    />
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// 4. CASE STUDIES
// ═════════════════════════════════════════════════════════════════════════════════

function CaseStudiesPage({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs mb-4">
            Verified Customer ROI
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Customer Success Stories
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            See how Fortune 500 enterprises, hyper-growth unicorns, and top advisory practices transformed their
            financial close with Sheshi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 bg-white rounded-2xl border border-slate-200">
            <span className="text-xs font-mono font-bold text-blue-600 uppercase mb-2 block">FORTUNE 500 GLOBAL HEALTHCARE</span>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Compressing 14-Day Global Close to 4 Hours</h2>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              With 82 legal entities running across SAP ECC and NetSuite, month-end was plagued by bilateral
              intercompany discrepancies. Quanta automated eliminations with zero variance.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs font-mono">
              <div><strong className="text-blue-700 text-lg block font-sans">621%</strong> 3-Year ROI</div>
              <div><strong className="text-blue-700 text-lg block font-sans">0</strong> SOX Deficiencies</div>
            </div>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-slate-200">
            <span className="text-xs font-mono font-bold text-emerald-600 uppercase mb-2 block">SERIES B FINTECH UNICORN</span>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Extending Company Runway by 5.4 Months</h2>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Catalyx eliminated $240,000 in duplicate SaaS subscriptions, modeled hiring scenarios dynamically,
              and automated quarterly board decks in one click.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs font-mono">
              <div><strong className="text-emerald-700 text-lg block font-sans">+$240k</strong> SaaS Waste Saved</div>
              <div><strong className="text-emerald-700 text-lg block font-sans">1-Click</strong> Board Pack Gen</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// 5. PRODUCT UPDATES (CHANGELOG)
// ═════════════════════════════════════════════════════════════════════════════════

function UpdatesPage({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs mb-4">
            Product Changelog
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Continuous Releases &amp; Improvements
          </h1>
          <p className="text-slate-600 text-sm">Every new capability shipped to our production clusters.</p>
        </div>

        <div className="space-y-8">
          {[
            { ver: "v2.8.0", date: "September 2026", title: "Automated SEC Edgar iXBRL Validator & Note 4 Leases", desc: "Added automated footnote schedule extraction for ASC 842 operating leases with integrated US-GAAP 2026 taxonomy validation." },
            { ver: "v2.7.0", date: "August 2026", title: "High-Volume Kafka CDC Pipeline V4 (50,000 tx/sec)", desc: "Upgraded continuous ingestion stream processing to support multi-million row transaction bursts from SAP S/4HANA clusters." },
            { ver: "v2.6.0", date: "July 2026", title: "Bilateral Intercompany Elimination Matrix (ASC 810)", desc: "Automated identification of reciprocal receivables and payables across foreign subsidiaries with automated CTA calculation." },
          ].map((rel, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
                  {rel.ver}
                </span>
                <span className="text-xs text-slate-400 font-mono">{rel.date}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mb-2">{rel.title}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{rel.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
