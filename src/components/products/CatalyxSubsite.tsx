import { useState } from "react";
import { Route } from "../../types";

export default function CatalyxSubsite({
  productPage,
  setProductPage,
  navigate,
}: {
  productPage: string;
  setProductPage: (p: string) => void;
  navigate: (r: Route) => void;
}) {
  const tabs = [
    { id: "home", label: "Overview" },
    { id: "solutions", label: "Solutions" },
    { id: "features", label: "Features" },
    { id: "startups", label: "For Startups" },
    { id: "resources", label: "Resources" },
    { id: "contact", label: "Get Started" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 font-sans">
      {/* 21st.dev Top Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-16 justify-between gap-4">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setProductPage("home")}
              className="flex items-center gap-3 cursor-pointer group text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-extrabold text-sm shadow-sm group-hover:bg-emerald-700 transition-colors">
                C
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
                  Sheshi Catalyx
                </span>
                <span className="text-[10px] font-mono text-emerald-600 tracking-wider uppercase font-semibold">
                  Startup Finance Command
                </span>
              </div>
            </button>

            {/* Subnav Tabs */}
            <div className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setProductPage(t.id)}
                  className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    productPage === t.id
                      ? "bg-white text-emerald-700 shadow-xs border border-slate-200/60"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate({ page: "products" })}
              className="hidden sm:inline-flex text-xs text-slate-500 hover:text-slate-900 font-medium cursor-pointer transition-colors"
            >
              ← Ecosystem
            </button>
            <button
              onClick={() => setProductPage("contact")}
              className="text-xs text-white font-semibold px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              Get Started Free
            </button>
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="flex lg:hidden overflow-x-auto px-4 py-2 border-t border-slate-200 gap-1 bg-slate-50/80">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setProductPage(t.id)}
              className={`px-3 py-1 text-xs font-semibold whitespace-nowrap rounded-lg cursor-pointer ${
                productPage === t.id
                  ? "bg-white text-emerald-700 shadow-xs border border-slate-200"
                  : "text-slate-600"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Subpage Switcher */}
      <main className="flex-1">
        {productPage === "home" && <CatalyxOverviewTab setProductPage={setProductPage} />}
        {productPage === "solutions" && <CatalyxSolutionsTab setProductPage={setProductPage} />}
        {productPage === "features" && <CatalyxFeaturesTab setProductPage={setProductPage} />}
        {productPage === "startups" && <CatalyxStartupsTab setProductPage={setProductPage} />}
        {productPage === "resources" && <CatalyxResourcesTab setProductPage={setProductPage} />}
        {productPage === "contact" && <CatalyxContactTab navigate={navigate} />}
      </main>

      {/* Footer */}
      <footer className="bg-white text-slate-600 border-t border-slate-200 px-6 py-10 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
              C
            </div>
            <span className="font-bold text-slate-900">Sheshi Catalyx for Startups</span>
            <span className="text-slate-400">•</span>
            <span>Runway Predictability, Burn Oversight &amp; Investor Updates</span>
          </div>
          <button
            onClick={() => navigate({ page: "home" })}
            className="text-emerald-700 hover:text-emerald-900 font-semibold cursor-pointer transition-colors"
          >
            Return to Sheshi Corporate Home →
          </button>
        </div>
      </footer>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// TAB 1: OVERVIEW (HOME)
// ═════════════════════════════════════════════════════════════════════════════════

function CatalyxOverviewTab({ setProductPage }: { setProductPage: (p: string) => void }) {
  const [cashBalance, setCashBalance] = useState(2500000);
  const [monthlyGrossBurn, setMonthlyGrossBurn] = useState(140000);
  const [mrr, setMrr] = useState(45000);
  const [newHires, setNewHires] = useState(3);

  const netBurn = monthlyGrossBurn - mrr + newHires * 12500;
  const runwayMonths = Math.max(1, Math.round((cashBalance / Math.max(1000, netBurn)) * 10) / 10);

  return (
    <div>
      {/* 21st.dev Style Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/20 to-slate-50 border-b border-slate-200/80 pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(16,185,129,0.12),rgba(255,255,255,0))] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/80 shadow-xs mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span>Built for High-Growth Founders • Catalyx 2.0</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.12]">
            Runway Predictability, Burn Oversight &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-700">
              Board Pack Velocity
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Built for venture-backed founders and startup finance leads. Connect Stripe, Brex, Ramp, and Mercury in
            60 seconds to unlock real-time cash runway forecasting and investor-ready board updates without spreadsheet
            chaos.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={() => setProductPage("contact")}
              className="text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Start Free 30-Day Founder Trial
            </button>
            <button
              onClick={() => setProductPage("features")}
              className="text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 px-6 py-3 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Inspect Startup Features →
            </button>
          </div>

          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 py-2.5 px-6 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 text-xs text-slate-600 shadow-xs">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Real-Time Bank Sync Active
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span>1-Click Investor Board Updates</span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="font-semibold text-emerald-700">$100k+ Partner Cloud Perks</span>
          </div>
        </div>
      </section>

      {/* 4 Startup Impact Metrics */}
      <section className="py-10 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100">
            <div className="text-3xl font-extrabold text-emerald-700 mb-1">18.4 Mo</div>
            <div className="text-xs font-bold text-slate-800">Average Runway Visibility</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Live bank cash forecast</div>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100">
            <div className="text-3xl font-extrabold text-emerald-700 mb-1">60 Sec</div>
            <div className="text-xs font-bold text-slate-800">Instant Setup</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Connect Stripe &amp; Mercury</div>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100">
            <div className="text-3xl font-extrabold text-emerald-700 mb-1">4.8x</div>
            <div className="text-xs font-bold text-slate-800">Faster Board Packs</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Zero manual formatting</div>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-100">
            <div className="text-3xl font-extrabold text-emerald-700 mb-1">$140k+</div>
            <div className="text-xs font-bold text-slate-800">SaaS Waste Identified</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Automated spend alerts</div>
          </div>
        </div>
      </section>

      {/* Interactive Startup Runway Forecaster Tool */}
      <section className="py-16 bg-slate-50 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200 mb-3">
              Interactive Founder Cockpit
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Live Cash Runway &amp; Headcount Simulator
            </h2>
            <p className="text-sm text-slate-600">
              Adjust your funding balance, burn rate, and planned hires to see instant runway impact.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Sliders */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-slate-700">Cash in Bank:</span>
                    <span className="text-emerald-700 font-mono">${(cashBalance / 1000).toFixed(0)}k</span>
                  </div>
                  <input
                    type="range"
                    min="250000"
                    max="10000000"
                    step="50000"
                    value={cashBalance}
                    onChange={(e) => setCashBalance(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
                    <span>$250k (Seed)</span>
                    <span>$5M (Series A)</span>
                    <span>$10M+</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-slate-700">Monthly Gross Burn:</span>
                    <span className="text-rose-600 font-mono">${(monthlyGrossBurn / 1000).toFixed(0)}k / mo</span>
                  </div>
                  <input
                    type="range"
                    min="20000"
                    max="500000"
                    step="10000"
                    value={monthlyGrossBurn}
                    onChange={(e) => setMonthlyGrossBurn(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-slate-700">Monthly Recurring Revenue (MRR):</span>
                    <span className="text-blue-600 font-mono">${(mrr / 1000).toFixed(0)}k / mo</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="300000"
                    step="5000"
                    value={mrr}
                    onChange={(e) => setMrr(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-slate-700">New Engineering &amp; Sales Hires:</span>
                    <span className="text-purple-600 font-mono">+{newHires} Hires</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="15"
                    value={newHires}
                    onChange={(e) => setNewHires(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
                </div>
              </div>

              {/* Output Display */}
              <div className="flex flex-col justify-between p-6 bg-slate-900 text-white rounded-xl">
                <div>
                  <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider mb-2">
                    PROJECTED CASH RUNWAY
                  </div>
                  <div className="text-5xl font-extrabold text-white mb-1">{runwayMonths} Months</div>
                  <div className="text-xs text-slate-400">
                    Estimated Zero-Cash Date:{" "}
                    <strong className="text-slate-200 font-mono">
                      Q{Math.min(4, Math.ceil((new Date().getMonth() + 1 + runwayMonths) / 3))} 202
                      {26 + Math.floor((new Date().getMonth() + runwayMonths) / 12)}
                    </strong>
                  </div>
                </div>

                <div className="space-y-3 py-6 border-y border-slate-800 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Net Monthly Burn:</span>
                    <span className="font-mono font-bold text-rose-400">${netBurn.toLocaleString()} / mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Annualized Run-Rate ARR:</span>
                    <span className="font-mono font-bold text-blue-300">${(mrr * 12).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Hiring Burn Delta:</span>
                    <span className="font-mono font-bold text-purple-300">
                      +${(newHires * 12500).toLocaleString()} / mo
                    </span>
                  </div>
                </div>

                <div>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      runwayMonths >= 18
                        ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                        : runwayMonths >= 12
                        ? "bg-amber-950 text-amber-300 border border-amber-800"
                        : "bg-rose-950 text-rose-300 border border-rose-800"
                    }`}
                  >
                    {runwayMonths >= 18 ? "● HEALTHY (18+ Mo Runway)" : runwayMonths >= 12 ? "▲ MODERATE RUNWAY" : "⚠ CRITICAL (<12 Mo)"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 21st.dev Bento Grid for Catalyx */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Everything Your Startup Needs to Reach Series A &amp; Beyond
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Replace 4 different point tools with one intelligent finance operating system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 rounded-2xl p-8 bg-gradient-to-br from-slate-50 to-emerald-50/30 border border-slate-200 hover:border-emerald-400 hover:shadow-lg transition-all">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-emerald-100 text-emerald-800 mb-4 inline-block">
                INVESTOR UPDATES
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">1-Click Investor Board Deck &amp; Memo</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Automatically aggregate your cash balance, net burn, ARR growth cohorts, gross margins, and team
                milestones into a clean, presentation-ready deck for your venture capital backers.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setProductPage("features")}
                  className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  View Sample Board Pack
                </button>
              </div>
            </div>

            <div className="rounded-2xl p-8 bg-white border border-slate-200 hover:border-emerald-400 hover:shadow-lg transition-all">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-teal-100 text-teal-800 mb-4 inline-block">
                SPEND CONTROL
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Automated SaaS Waste Alerts</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Catalyx scans Brex and Ramp card transactions to detect forgotten recurring SaaS subscriptions and
                unassigned seat licenses.
              </p>
              <span className="text-xs font-bold text-emerald-700">Average $14,200 saved per startup →</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function CatalyxSolutionsTab({ setProductPage }: { setProductPage: (p: string) => void }) {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Financial Solutions Across Every Startup Stage
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          From your first angel check to multi-entity international expansion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          { stage: "Pre-Seed & Seed", funds: "$250k - $2M", desc: "Simple cash runway tracking, automated Stripe revenue sync, and founder burn alerts." },
          { stage: "Series A", funds: "$2M - $15M", desc: "Departmental budget vs actuals, headcount planning, and monthly VC investor board updates." },
          { stage: "Series B & Growth", funds: "$15M+", desc: "Multi-subsidiary rollup, GAAP revenue recognition, and automated audit preparation." },
        ].map((s, i) => (
          <div key={i} className="p-8 bg-white rounded-2xl border border-slate-200">
            <div className="text-xs font-mono font-bold text-emerald-600 mb-1">{s.funds} Raised</div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{s.stage}</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">{s.desc}</p>
            <button
              onClick={() => setProductPage("contact")}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
            >
              Get Started for {s.stage} →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CatalyxFeaturesTab({ setProductPage }: { setProductPage: (p: string) => void }) {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Startup-First Financial Features
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          No accounting jargon. Just clean visual metrics and automated insights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: "Real-Time Bank Feeds", desc: "Instant bi-directional connection to Mercury, Brex, Ramp, Stripe, Chase, and SVB with zero delay." },
          { title: "Headcount & Compensation Modeling", desc: "Model salary, bonuses, payroll taxes, and benefits for every department with start-date sensitivity." },
          { title: "Investor-Ready Board Memos", desc: "Turn raw financial data into clear board decks with revenue growth, burn multiple, and Magic Number." },
          { title: "13-Week Cash Flow Forecast", desc: "Deterministic weekly cash inflow and outflow modeling to predict working capital dips before they happen." },
        ].map((f, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function CatalyxStartupsTab({ setProductPage }: { setProductPage: (p: string) => void }) {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Loved by 400+ Venture-Backed Startups</h1>
      <p className="text-slate-600 text-sm mb-12">
        From YC alumni to Series B category leaders who refuse to manage company runway on static spreadsheets.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
        <div className="p-6 bg-white rounded-2xl border border-slate-200">
          <p className="text-xs text-slate-700 italic mb-4 leading-relaxed">
            &quot;Catalyx replaced 3 different Google Sheets models that were always out of date. Now our whole
            executive team checks runway in real-time before approving any major hire.&quot;
          </p>
          <div className="text-xs font-bold text-slate-900">David Lin</div>
          <div className="text-[11px] text-slate-500">Co-Founder &amp; CEO, NexaFlow (YC W24)</div>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-slate-200">
          <p className="text-xs text-slate-700 italic mb-4 leading-relaxed">
            &quot;Generating our quarterly board update used to take 2 full days of manual work. With Catalyx it
            happens in one click and our investors love the clarity.&quot;
          </p>
          <div className="text-xs font-bold text-slate-900">Elena Rostova</div>
          <div className="text-[11px] text-slate-500">Head of Finance, HyperScale Cloud (Series A)</div>
        </div>
      </div>
    </div>
  );
}

function CatalyxResourcesTab({ setProductPage }: { setProductPage: (p: string) => void }) {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Free Founder Finance Templates
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Battle-tested financial model templates and guides downloaded by 10,000+ founders.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Standard SaaS Financial Model v4.2", desc: "Includes 3-statement forecast, hiring plan, CAC/LTV calculator, and cohort retention curves." },
          { title: "Seed to Series A Board Deck Template", desc: "10-slide template designed by top tier VCs focusing on unit economics and runway." },
          { title: "Non-Dilutive Runway Extension Playbook", desc: "14 practical levers to extend company runway by 4 to 6 months without emergency bridge rounds." },
        ].map((res, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-2">{res.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">{res.desc}</p>
            </div>
            <button
              onClick={() => setProductPage("contact")}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
            >
              Download Free Template →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function CatalyxContactTab({ navigate }: { navigate: (r: Route) => void }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Get Started with Catalyx</h1>
        <p className="text-slate-600 text-sm">
          Activate your startup workspace in 60 seconds with instant bank connection.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Startup Workspace Created!</h2>
            <p className="text-sm text-slate-600 mb-6">
              Check your inbox for your secure workspace login link and partner perk codes.
            </p>
            <button
              onClick={() => navigate({ page: "home" })}
              className="px-6 py-2.5 bg-emerald-600 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer"
            >
              Return Home
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="space-y-6 text-xs"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Founder / Finance Lead Name *</label>
                <input required type="text" placeholder="Alex Morgan" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 outline-none text-slate-900" />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Work Email *</label>
                <input required type="email" placeholder="alex@startup.com" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 outline-none text-slate-900" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Company Name</label>
                <input required type="text" placeholder="Acme AI Inc" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 outline-none text-slate-900" />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Funding Stage</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-slate-300 outline-none bg-white text-slate-900">
                  <option>Bootstrapped</option>
                  <option>Pre-Seed ($250k - $1M)</option>
                  <option>Seed ($1M - $4M)</option>
                  <option>Series A ($4M - $15M)</option>
                  <option>Series B+</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md cursor-pointer transition-all"
            >
              Activate 30-Day Free Founder Trial
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
