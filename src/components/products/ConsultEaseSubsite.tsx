import { useState } from "react";
import { Route } from "../../types";

export default function ConsultEaseSubsite({
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
    { id: "firms", label: "For Advisory Firms" },
    { id: "resources", label: "Resources" },
    { id: "contact", label: "Partner With Us" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 font-sans">
      {/* 21st.dev Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-16 justify-between gap-4">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setProductPage("home")}
              className="flex items-center gap-3 cursor-pointer group text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-extrabold text-sm shadow-sm group-hover:bg-purple-700 transition-colors">
                CE
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
                  Sheshi ConsultEase
                </span>
                <span className="text-[10px] font-mono text-purple-600 tracking-wider uppercase font-semibold">
                  Advisory &amp; CAS Suite
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
                      ? "bg-white text-purple-700 shadow-xs border border-slate-200/60"
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
              className="text-xs text-white font-semibold px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              Apply as Partner
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
                  ? "bg-white text-purple-700 shadow-xs border border-slate-200"
                  : "text-slate-600"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Subpage Switcher */}
      <main className="flex-1">
        {productPage === "home" && <ConsultEaseOverviewTab setProductPage={setProductPage} />}
        {productPage === "solutions" && <ConsultEaseSolutionsTab setProductPage={setProductPage} />}
        {productPage === "features" && <ConsultEaseFeaturesTab setProductPage={setProductPage} />}
        {productPage === "firms" && <ConsultEaseFirmsTab setProductPage={setProductPage} />}
        {productPage === "resources" && <ConsultEaseResourcesTab setProductPage={setProductPage} />}
        {productPage === "contact" && <ConsultEaseContactTab navigate={navigate} />}
      </main>

      {/* Dedicated Footer */}
      <footer className="bg-white text-slate-600 border-t border-slate-200 px-6 py-10 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded bg-purple-600 text-white font-bold text-xs flex items-center justify-center">
              CE
            </div>
            <span className="font-bold text-slate-900">Sheshi ConsultEase for Advisory Practices</span>
            <span className="text-slate-400">•</span>
            <span>Multi-Entity Client Accounting, Automated Workpapers &amp; Branded Portals</span>
          </div>
          <button
            onClick={() => navigate({ page: "home" })}
            className="text-purple-700 hover:text-purple-900 font-semibold cursor-pointer transition-colors"
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

function ConsultEaseOverviewTab({ setProductPage }: { setProductPage: (p: string) => void }) {
  const [activeStep, setActiveStep] = useState(2);
  const [clientCount, setClientCount] = useState(35);

  const clients = [
    { name: "Acme Healthcare Group", type: "Multi-Location LLC", balance: "$4.2M", status: "CLOSED & CERTIFIED", stage: 4 },
    { name: "Vanguard Logistics", type: "S-Corp (3 Entities)", balance: "$8.9M", status: "PARTNER SIGNOFF PENDING", stage: 3 },
    { name: "Nova SaaS Labs", type: "Delaware C-Corp", balance: "$1.8M", status: "SENIOR REVIEW IN PROGRESS", stage: 2 },
    { name: "Apex Commercial Real Estate", type: "LP Fund III", balance: "$24.5M", status: "DRAFT WORKPAPERS", stage: 1 },
  ];

  return (
    <div>
      {/* 21st.dev Style Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-purple-50/20 to-slate-50 border-b border-slate-200/80 pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(147,51,234,0.12),rgba(255,255,255,0))] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200/80 shadow-xs mb-6">
            <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse" />
            <span>CPA &amp; Advisory Operating System • ConsultEase 2.0</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.12]">
            Scale Client Accounting Services Without{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-700">
              Staff Burnout
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Designed specifically for CPA firms, fractional CFO practices, and client accounting services (CAS)
            teams. Deliver white-labeled financial reporting, automated workpaper binders, and multi-tenant client
            reconciliation in one unified platform.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={() => setProductPage("contact")}
              className="text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Apply for Advisory Partner Access
            </button>
            <button
              onClick={() => setProductPage("features")}
              className="text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 px-6 py-3 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Explore Firm Features →
            </button>
          </div>

          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 py-2.5 px-6 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 text-xs text-slate-600 shadow-xs">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Multi-Tenant Security Isolation
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span>100% White-Labeled Client Portals</span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="font-semibold text-purple-700">AICPA Peer-Review Ready</span>
          </div>
        </div>
      </section>

      {/* 4 Metrics */}
      <section className="py-10 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-purple-50/40 border border-purple-100">
            <div className="text-3xl font-extrabold text-purple-700 mb-1">3.4x</div>
            <div className="text-xs font-bold text-slate-800">Client Capacity</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Per senior accountant</div>
          </div>
          <div className="p-4 rounded-xl bg-purple-50/40 border border-purple-100">
            <div className="text-3xl font-extrabold text-purple-700 mb-1">72%</div>
            <div className="text-xs font-bold text-slate-800">Review Bottleneck Reduction</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Automated signoff gates</div>
          </div>
          <div className="p-4 rounded-xl bg-purple-50/40 border border-purple-100">
            <div className="text-3xl font-extrabold text-purple-700 mb-1">100%</div>
            <div className="text-xs font-bold text-slate-800">White-Label Portals</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Your firm brand &amp; domain</div>
          </div>
          <div className="p-4 rounded-xl bg-purple-50/40 border border-purple-100">
            <div className="text-3xl font-extrabold text-purple-700 mb-1">Zero</div>
            <div className="text-xs font-bold text-slate-800">Lost Workpapers</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Automated PBC archiving</div>
          </div>
        </div>
      </section>

      {/* Live Interactive Multi-Client Advisory Cockpit */}
      <section className="py-16 bg-slate-50 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200 mb-3">
              Interactive Practice Cockpit
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Multi-Client Accounting Portfolio Dashboard
            </h2>
            <p className="text-sm text-slate-600">
              Manage dozens of client month-end closes simultaneously with automated reviewer signoff gates.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
            {/* 4-Stage Workpaper Stepper */}
            <div className="mb-8">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Standardized 4-Stage Workpaper Review Stepper
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { step: 1, label: "Staff Preparation", sub: "Auto-Reconciled Feeds" },
                  { step: 2, label: "Senior Review", sub: "Variance & Tax Flux" },
                  { step: 3, label: "Partner Signoff", sub: "Final Risk Clearance" },
                  { step: 4, label: "Client Portal Delivery", sub: "Branded Presentation" },
                ].map((s) => (
                  <button
                    key={s.step}
                    onClick={() => setActiveStep(s.step)}
                    className={`p-3.5 rounded-xl text-left border cursor-pointer transition-all ${
                      activeStep === s.step
                        ? "bg-purple-50 border-purple-500 shadow-xs"
                        : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <div className="text-[10px] font-bold text-purple-700 uppercase mb-0.5">STAGE 0{s.step}</div>
                    <div className="font-bold text-slate-900 text-xs">{s.label}</div>
                    <div className="text-[11px] text-slate-500">{s.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Client Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono uppercase">
                    <th className="py-3 px-4">Client Entity</th>
                    <th className="py-3 px-4">Entity Structure</th>
                    <th className="py-3 px-4 text-right">Monthly Volume</th>
                    <th className="py-3 px-4 text-center">Close Progress</th>
                    <th className="py-3 px-4 text-center">Review Stage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {clients.map((c, i) => (
                    <tr key={i} className="hover:bg-purple-50/30 transition-colors">
                      <td className="py-3 px-4 font-bold text-slate-900">{c.name}</td>
                      <td className="py-3 px-4 text-slate-600">{c.type}</td>
                      <td className="py-3 px-4 text-right font-mono font-semibold text-slate-800">{c.balance}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center font-mono font-bold text-purple-700">
                        Stage {c.stage} / 4
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Practice Multiplier Calculator */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex justify-between text-xs font-bold mb-2">
                <span className="text-slate-700">Current Client Practice Roster:</span>
                <span className="text-purple-700 font-mono text-sm">{clientCount} Active Clients</span>
              </div>
              <input
                type="range"
                min="10"
                max="150"
                value={clientCount}
                onChange={(e) => setClientCount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-[11px] text-slate-500 mt-2 font-mono">
                <span>10 Clients</span>
                <span className="font-bold text-purple-700">
                  Projected Annual CAS Gross Margin: ${(clientCount * 42000 * 0.65).toLocaleString()}
                </span>
                <span>150 Clients</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid for ConsultEase */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Engineered for the Modern Advisory Firm
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Say goodbye to juggling multiple login credentials across 50 separate QuickBooks and Xero files.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 rounded-2xl p-8 bg-gradient-to-br from-slate-50 to-purple-50/40 border border-slate-200 hover:border-purple-400 hover:shadow-lg transition-all">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-purple-100 text-purple-800 mb-4 inline-block">
                WHITE-LABEL DELIVERY
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Your Brand. Your URL. Your Practice.</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Provide business owners with a stunning financial portal hosted under your own domain (e.g.
                portal.yourfirm.com). Clients log in to view real-time KPIs, approve journal vouchers, and securely
                upload PBC requests without messy email attachments.
              </p>
              <button
                onClick={() => setProductPage("features")}
                className="px-4 py-2 bg-purple-600 text-white text-xs font-semibold rounded-lg hover:bg-purple-700 cursor-pointer"
              >
                Inspect White-Label Portal Mockup
              </button>
            </div>

            <div className="rounded-2xl p-8 bg-white border border-slate-200 hover:border-purple-400 hover:shadow-lg transition-all">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-indigo-100 text-indigo-800 mb-4 inline-block">
                PEER REVIEW READY
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Automated Audit Binders</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Export complete AICPA-compliant workpaper binders with one click, showing clear reviewer signoff
                stamps and substantiating documentation.
              </p>
              <span className="text-xs font-bold text-purple-700">Learn about peer-review compliance →</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ConsultEaseSolutionsTab({ setProductPage }: { setProductPage: (p: string) => void }) {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Tailored Practice Solutions
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          From solo fractional CFOs to top 100 regional accounting firms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: "Fractional CFOs & Advisors", desc: "Manage 8 to 15 high-touch clients with executive cash flow dashboards, board decks, and automated KPI tracking." },
          { title: "Boutique CAS Practices", desc: "Scale from 25 to 100+ clients with structured preparer/reviewer gates, bulk bank reconciliations, and automated PBC reminders." },
          { title: "Top 100 Regional CPA Firms", desc: "Enterprise multi-office isolation, standardized audit methodology, and custom ERP integration for client accounting departments." },
        ].map((sol, i) => (
          <div key={i} className="p-8 bg-white rounded-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-3">{sol.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-6">{sol.desc}</p>
            <button
              onClick={() => setProductPage("contact")}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 cursor-pointer"
            >
              Explore Firm Blueprint →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConsultEaseFeaturesTab({ setProductPage }: { setProductPage: (p: string) => void }) {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Advisory Practice Capabilities
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Eliminate manual spreadsheet checklists with automated practice workflow orchestration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: "Bulk Multi-Client Reconciliation", desc: "Run algorithmic reconciliation across all 40 client bank feeds in parallel rather than logging into each account individually." },
          { title: "Automated Client PBC Reminders", desc: "Set automatic email and SMS reminders for clients to upload missing receipts, statement PDFs, and tax documentation." },
          { title: "Standardized Review Signoff Matrix", desc: "Enforce multi-level signoffs before workpapers can be finalized or delivered to client executives." },
          { title: "Firm Realization & Capacity Tracker", desc: "Track billable time, realization rates, and client margin contribution across all practice staff members in real time." },
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

function ConsultEaseFirmsTab({ setProductPage }: { setProductPage: (p: string) => void }) {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Trusted by Leading CPA &amp; CAS Leaders</h1>
      <p className="text-slate-600 text-sm mb-12">
        See how advisory practices increased their monthly client capacity by 340% without hiring additional staff.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
        <div className="p-6 bg-white rounded-2xl border border-slate-200">
          <p className="text-xs text-slate-700 italic mb-4 leading-relaxed">
            &quot;ConsultEase allowed us to expand our CAS practice from 18 clients to 65 clients with the exact same
            senior accounting team. The automated review gates give our partners complete peace of mind.&quot;
          </p>
          <div className="text-xs font-bold text-slate-900">Marcus Sterling, CPA</div>
          <div className="text-[11px] text-slate-500">Managing Partner, Sterling Advisory &amp; Tax</div>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-slate-200">
          <p className="text-xs text-slate-700 italic mb-4 leading-relaxed">
            &quot;Our clients love the white-label portal. It makes our boutique firm look like a Big 4 technology
            powerhouse, and our realization rates are up by 28%.&quot;
          </p>
          <div className="text-xs font-bold text-slate-900">Rachel Vance</div>
          <div className="text-[11px] text-slate-500">Founder, Vance Fractional CFO Partners</div>
        </div>
      </div>
    </div>
  );
}

function ConsultEaseResourcesTab({ setProductPage }: { setProductPage: (p: string) => void }) {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Advisory Practice Toolkits
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Proven frameworks to transition from low-margin hourly compliance to high-value advisory retainer fees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "CAS Value-Pricing Playbook", desc: "How to package and price client accounting services on fixed monthly retainers ranging from $2,500 to $10,000/mo." },
          { title: "Standard Client Engagement Master Letter", desc: "Attorney-vetted engagement contract covering scope limitations, PBC deadlines, and advisory deliverables." },
          { title: "Month-End Quality Control Checklist", desc: "45-point peer review checklist to eliminate balance sheet errors and tax timing adjustments." },
        ].map((res, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-2">{res.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">{res.desc}</p>
            </div>
            <button
              onClick={() => setProductPage("contact")}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 cursor-pointer"
            >
              Download Advisory Toolkit →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConsultEaseContactTab({ navigate }: { navigate: (r: Route) => void }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Join the Advisory Partner Program</h1>
        <p className="text-slate-600 text-sm">
          Schedule a private partner walkthrough to evaluate ConsultEase for your accounting practice.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Partner Application Received!</h2>
            <p className="text-sm text-slate-600 mb-6">
              Our firm success director will reach out within 4 business hours to arrange your white-label sandbox.
            </p>
            <button
              onClick={() => navigate({ page: "home" })}
              className="px-6 py-2.5 bg-purple-600 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer"
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
                <label className="block text-slate-700 font-bold mb-1">Partner / Principal Name *</label>
                <input required type="text" placeholder="Sarah Jenkins, CPA" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 outline-none text-slate-900" />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Firm Email *</label>
                <input required type="email" placeholder="sarah@jenkins-cpa.com" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 outline-none text-slate-900" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Firm Name</label>
                <input required type="text" placeholder="Jenkins Advisory LLP" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 outline-none text-slate-900" />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Active Client Count</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-slate-300 outline-none bg-white text-slate-900">
                  <option>1 - 15 Clients (Solo / Boutique)</option>
                  <option>15 - 50 Clients (Growing CAS)</option>
                  <option>50 - 150 Clients (Regional Firm)</option>
                  <option>150+ Clients (Top 100 Practice)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl shadow-md cursor-pointer transition-all"
            >
              Schedule Partner Sandbox Demo
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
