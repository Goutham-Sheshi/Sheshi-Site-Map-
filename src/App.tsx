import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Route = {
  page: string;
  sub?: string;
  product?: string;
  productPage?: string;
};

// ─── Navigation Data ──────────────────────────────────────────────────────────

const NAV = [
  { label: "Home", page: "home" },
  {
    label: "Company",
    page: "company",
    children: [
      { label: "About Sheshi", sub: "about" },
      { label: "Our Story", sub: "story" },
      { label: "Leadership", sub: "leadership" },
      { label: "Our Team", sub: "team" },
      { label: "People - and culture", sub: "culture" },
      { label: "Careers", sub: "careers" },
      { label: "Contact Us", sub: "contact" },
    ],
  },
  {
    label: "Products",
    page: "products",
    children: [
      { label: "Quanta (Enterprise)", sub: "quanta" },
      { label: "Catalyx (Startups)", sub: "catalyx" },
      { label: "ConsultEase (Advisory)", sub: "consultease" },
      { label: "Sheshi FR (Reporting)", sub: "sheshifr" },
    ],
  },
  {
    label: "Solutions",
    page: "solutions",
    children: [
      { label: "Enterprise Finance", sub: "enterprise" },
      { label: "Startup Finance", sub: "startup" },
      { label: "Consulting & Advisory", sub: "consulting" },
      { label: "Finance Professionals", sub: "professionals" },
    ],
  },
  {
    label: "Technology",
    page: "technology",
    children: [
      { label: "Financial Operating System", sub: "fos" },
      { label: "AI & Automation", sub: "ai" },
      { label: "Integrations", sub: "integrations" },
      { label: "Security & Compliance", sub: "security" },
      { label: "Trust Center", sub: "trust" },
    ],
  },
  {
    label: "Resources",
    page: "resources",
    children: [
      { label: "Blog", sub: "blog" },
      { label: "Insights", sub: "insights" },
      { label: "Case Studies", sub: "casestudies" },
      { label: "Research (Numbers Story)", sub: "research" },
      { label: "Events", sub: "events" },
      { label: "Webinars", sub: "webinars" },
      { label: "Product Updates", sub: "updates" },
    ],
  },
  {
    label: "Partners",
    page: "partners",
    children: [
      { label: "Technology Partners", sub: "tech" },
      { label: "Strategic Partners", sub: "strategic" },
      { label: "Become a Partner", sub: "join" },
    ],
  },
  { label: "Contact", page: "contact" },
];

const PRODUCTS = [
  {
    id: "quanta",
    label: "Quanta",
    tagline: "Enterprise Governance & Intelligence Platform",
    description: "The governed financial lifecycle for CFOs and finance leaders — close, plan, consolidate, analyse, collaborate, and report in one platform.",
    accent: "#1d4ed8",
    pages: [
      { id: "home", label: "Overview" },
      { id: "platform", label: "Platform" },
      { id: "solutions", label: "Solutions" },
      { id: "capabilities", label: "Capabilities" },
      { id: "enterprise", label: "Enterprise" },
      { id: "resources", label: "Resources" },
      { id: "contact", label: "Contact Sales" },
    ],
  },
  {
    id: "catalyx",
    label: "Catalyx",
    tagline: "Startup Finance Command Center",
    description: "Built for speed, burn oversight, runway predictability, and effortless investor board pack generation.",
    accent: "#059669",
    pages: [
      { id: "home", label: "Overview" },
      { id: "solutions", label: "Solutions" },
      { id: "features", label: "Features" },
      { id: "startups", label: "For Startups" },
      { id: "resources", label: "Resources" },
      { id: "contact", label: "Get Started" },
    ],
  },
  {
    id: "consultease",
    label: "ConsultEase",
    tagline: "Advisory & Client Engagement Suite",
    description: "Power your client engagements with multi-entity financial oversight, automated reconciliation, and white-label advisory dashboards.",
    accent: "#7c3aed",
    pages: [
      { id: "home", label: "Overview" },
      { id: "solutions", label: "Solutions" },
      { id: "features", label: "Features" },
      { id: "firms", label: "For Advisory Firms" },
      { id: "resources", label: "Resources" },
      { id: "contact", label: "Partner With Us" },
    ],
  },
  {
    id: "sheshifr",
    label: "Sheshi FR",
    tagline: "Autonomous Financial Reporting Suite",
    description: "Automated statement generation, XBRL tag alignment, and audit-ready schedules designed by Chartered Accountants.",
    accent: "#d97706",
    pages: [
      { id: "home", label: "Overview" },
      { id: "features", label: "Features" },
      { id: "workflows", label: "Workflows" },
      { id: "professionals", label: "For Controllers" },
      { id: "resources", label: "Resources" },
      { id: "contact", label: "Request Demo" },
    ],
  },
];

const ACCENT_COLORS: Record<string, string> = {
  quanta: "#1d4ed8",
  catalyx: "#059669",
  consultease: "#7c3aed",
  sheshifr: "#d97706",
};

// ─── Minimalist Design Primitives & Live Mockups ─────────────────────────────

function SectionLabel({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2 mb-3">
      <span className={`w-1.5 h-1.5 rounded-full ${light ? "bg-blue-400" : "bg-blue-600"}`} />
      <span className={`text-xs font-semibold tracking-wider uppercase ${light ? "text-blue-300" : "text-blue-600"}`}>
        {text}
      </span>
    </div>
  );
}

function PageHero({
  title,
  subtitle,
  breadcrumb,
  badge,
}: {
  title: string;
  subtitle?: string;
  breadcrumb?: string[];
  badge?: string;
}) {
  return (
    <div className="border-b border-slate-200/80 bg-white px-6 md:px-12 py-14">
      <div className="max-w-6xl mx-auto">
        {breadcrumb && (
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 font-medium">
            {breadcrumb.map((item, idx) => (
              <span key={item} className="flex items-center gap-2">
                {idx > 0 && <span className="text-slate-300">/</span>}
                <span className={idx === breadcrumb.length - 1 ? "text-blue-600 font-semibold" : ""}>{item}</span>
              </span>
            ))}
          </div>
        )}
        {badge && (
          <span className="inline-block text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 px-3 py-1 rounded-full mb-3">
            {badge}
          </span>
        )}
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4 max-w-3xl leading-tight">
          {title}
        </h1>
        {subtitle && <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed">{subtitle}</p>}
      </div>
    </div>
  );
}

// ─── Real Financial Software UI Mockup (NO Skeletons) ─────────────────────────

function FinancialLedgerMockup() {
  const [activeTab, setActiveTab] = useState<"close" | "ledger" | "audit">("close");

  const ledgerItems = [
    { id: "JE-9042", account: "1010 • Cash & Operating Accounts", erp: "NetSuite", debit: "$14,820,450.00", credit: "—", match: "100% Matched", status: "Verified" },
    { id: "JE-9043", account: "1200 • Accounts Receivable Trade", erp: "SAP S/4HANA", debit: "$8,412,900.00", credit: "—", match: "AI Auto-Match", status: "Verified" },
    { id: "JE-9044", account: "2150 • Intercompany Elimination", erp: "Workday", debit: "—", credit: "$3,150,000.00", match: "Auto-Balanced", status: "Governed" },
    { id: "JE-9045", account: "2400 • Deferred SaaS Revenue", erp: "Stripe / ERP", debit: "—", credit: "$19,650,200.00", match: "Rule ASC 606", status: "Verified" },
    { id: "JE-9046", account: "6010 • Cloud Infrastructure Accruals", erp: "AWS / NetSuite", debit: "$485,320.00", credit: "—", match: "Flux Checked", status: "Pending Review" },
  ];

  return (
    <div className="bg-[#090e17] text-white rounded-2xl border border-slate-800 shadow-2xl overflow-hidden text-left max-w-5xl mx-auto">
      {/* Top Application Bar */}
      <div className="bg-[#0f172a] px-5 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          </div>
          <span className="text-xs font-mono text-slate-400 pl-2 border-l border-slate-700">
            Sheshi Financial OS • Session ID: #SH-2026-LIVE
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-emerald-400 font-medium">99.99% Live Sync</span>
          <span className="text-slate-600">•</span>
          <span className="text-slate-400 font-mono">Entity: Sheshi Global Holdings Inc.</span>
        </div>
      </div>

      {/* Control Strip */}
      <div className="bg-[#0b132b]/80 px-6 py-4 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab("close")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === "close" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            Financial Close Progress
          </button>
          <button
            onClick={() => setActiveTab("ledger")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === "ledger" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            Governed General Ledger
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === "audit" ? "bg-blue-600 text-white shadow-sm" : "text-slate-400 hover:text-white"
            }`}
          >
            Audit Trail &amp; Lineage
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div>
            <span className="text-slate-400">Close Phase: </span>
            <span className="font-semibold text-white">Day 3 of Close (89% Complete)</span>
          </div>
          <div className="w-28 h-2 bg-slate-800 rounded-full overflow-hidden">
            <div className="w-[89%] h-full bg-blue-500 rounded-full" />
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="p-6 overflow-x-auto">
        {activeTab === "close" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Total Journal Entries</span>
                <p className="text-xl font-bold text-white mt-1">42,890</p>
                <span className="text-[11px] text-emerald-400 font-medium">↑ 99.4% Auto-Verified</span>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Unreconciled Variances</span>
                <p className="text-xl font-bold text-emerald-400 mt-1">$0.00</p>
                <span className="text-[11px] text-slate-400">Zero variance tolerance</span>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">Multi-Entity Consolidations</span>
                <p className="text-xl font-bold text-white mt-1">14 Subsidiaries</p>
                <span className="text-[11px] text-blue-400">FX Remeasured (USD)</span>
              </div>
              <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">External Auditor Status</span>
                <p className="text-xl font-bold text-white mt-1">Pre-Certified</p>
                <span className="text-[11px] text-emerald-400">SOC 1 / SOX Aligned</span>
              </div>
            </div>

            <table className="w-full text-left text-xs text-slate-300">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-3 font-semibold">Entry ID</th>
                  <th className="pb-3 font-semibold">Account / Description</th>
                  <th className="pb-3 font-semibold">Source ERP</th>
                  <th className="pb-3 font-semibold text-right">Debit Balance</th>
                  <th className="pb-3 font-semibold text-right">Credit Balance</th>
                  <th className="pb-3 font-semibold">Governance Engine</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {ledgerItems.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 text-blue-400 font-semibold">{row.id}</td>
                    <td className="py-3 text-white font-sans font-medium">{row.account}</td>
                    <td className="py-3 text-slate-400 font-sans">{row.erp}</td>
                    <td className="py-3 text-right text-emerald-400">{row.debit}</td>
                    <td className="py-3 text-right text-slate-200">{row.credit}</td>
                    <td className="py-3">
                      <span className="inline-block px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800 text-[10px] font-sans">
                        {row.match}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button className="text-[11px] text-blue-400 hover:text-white font-sans transition-colors cursor-pointer">
                        Audit Trail →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "ledger" && (
          <div className="py-6 text-center text-slate-300 max-w-xl mx-auto space-y-3">
            <h4 className="font-semibold text-white text-base">Governed Unified Ledger Architecture</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Sheshi sits between SAP S/4, Oracle NetSuite, and Workday, normalizing disparate charts of accounts into a single immutable ledger layer. Changes require cryptographic dual-signoff.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <span className="text-[11px] bg-slate-800 text-slate-300 px-3 py-1 rounded-full font-mono">
                Lineage: SHA-256 Provenance
              </span>
              <span className="text-[11px] bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full font-mono">
                SOX 404 Controls Active
              </span>
            </div>
          </div>
        )}

        {activeTab === "audit" && (
          <div className="py-6 text-center text-slate-300 max-w-xl mx-auto space-y-3">
            <h4 className="font-semibold text-white text-base">Continuous Independent Audit Trail</h4>
            <p className="text-xs text-slate-400 leading-relaxed font-sans">
              Every journal entry, flux explanation, and controller signoff is watermarked with immutable timestamps and user identities. Big 4 auditors receive read-only federated portal access.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <span className="text-[11px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1 rounded-full font-mono">
                Audit Status: 100% Traceable
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status Ribbon */}
      <div className="bg-[#0b132b] px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-2">
          <span>🔒 End-to-End TLS 1.3 Encryption</span>
          <span>•</span>
          <span>SOC 2 Type II Certified</span>
        </span>
        <button className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer">
          Generate Governed Board Report Pack →
        </button>
      </div>
    </div>
  );
}

// ─── Hero Components ─────────────────────────────────────────────────────────

function HeroCentered({
  eyebrow,
  title,
  subtitle,
  navigate,
}: {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  navigate: (r: Route) => void;
}) {
  return (
    <div className="relative bg-[#090e17] text-white px-6 md:px-12 pt-24 pb-20 overflow-hidden border-b border-slate-800">
      {/* Subtle minimalist gradient aura */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 30%, #2563eb, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-800/60 text-blue-300 text-xs font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span>{eyebrow ?? "The Financial Operating System"}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 leading-tight max-w-4xl mx-auto">
          {title ?? (
            <>
              Your ERP records the transactions. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
                Everything after is where Sheshi lives.
              </span>
            </>
          )}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
          {subtitle ??
            "The governed layer between your ERP and every financial output your organisation produces. Close, plan, consolidate, analyse, collaborate, and report with immutable trust."}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={() => navigate({ page: "contact" })}
            className="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            Request a Conversation
          </button>
          <button
            onClick={() => navigate({ page: "products", sub: "quanta" })}
            className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm px-6 py-3.5 rounded-xl transition-all cursor-pointer"
          >
            Explore Products
          </button>
          <button
            onClick={() => {
              const el = document.getElementById("sitemap-flowchart");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="border border-slate-700/80 text-slate-400 hover:text-white text-sm px-5 py-3.5 rounded-xl transition-all cursor-pointer"
          >
            Interactive Site Map ↓
          </button>
        </div>

        {/* Live Interactive Ledger Mockup */}
        <div className="mt-8">
          <FinancialLedgerMockup />
        </div>
      </div>
    </div>
  );
}

function HeroSplit({
  eyebrow,
  title,
  subtitle,
  navigate,
}: {
  eyebrow: string;
  title?: string;
  subtitle?: string;
  navigate?: (r: Route) => void;
}) {
  return (
    <div className="bg-white border-b border-slate-200/80 px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <SectionLabel text={eyebrow} />
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4 leading-tight">
            {title ?? eyebrow}
          </h2>
          <p className="text-base text-slate-600 leading-relaxed mb-8 max-w-xl">
            {subtitle ??
              "Sheshi provides the governed architectural layer between raw transaction systems and verified executive outputs."}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            {navigate && (
              <button
                onClick={() => navigate({ page: "contact" })}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Request Consultation
              </button>
            )}
            <button
              onClick={() => {
                const el = document.getElementById("sitemap-flowchart");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium text-xs px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
            >
              Explore Architecture
            </button>
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#090e17] text-white p-6 rounded-2xl border border-slate-800 shadow-lg">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4 text-xs font-mono text-slate-400">
            <span>GOVERNANCE ENGINE</span>
            <span className="text-emerald-400">● ACTIVE</span>
          </div>
          <div className="space-y-3 text-xs">
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">ERP INGESTION</span>
              <span className="font-semibold text-white">SAP S/4HANA &amp; NetSuite Stream</span>
              <span className="text-emerald-400 block text-[10px] mt-1">✓ 12ms Synchronization Latency</span>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">AGENTIC RECONCILIATION</span>
              <span className="font-semibold text-white">Flux &amp; Variance Analysis Agent</span>
              <span className="text-blue-400 block text-[10px] mt-1">99.4% Automated Match Rate</span>
            </div>
            <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">AUDIT PACK LINEAGE</span>
              <span className="font-semibold text-white">Cryptographic Board Reporting</span>
              <span className="text-slate-400 block text-[10px] mt-1">SHA-256 Provenance Ledger</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Real Metrics & Impact Section ───────────────────────────────────────────

function MetricsRow({ count = 5 }: { count?: number }) {
  const metrics = [
    { stat: "99.4%", label: "Automated Reconciliation Rate", desc: "Matched across complex multi-entity journals" },
    { stat: "68%", label: "Reduction in Close Cycle Duration", desc: "From 14-day month-end closes down to 3 days" },
    { stat: "100%", label: "Governed Audit Lineage", desc: "Zero untracked spreadsheet formulas or hidden edits" },
    { stat: "12ms", label: "Real-Time ERP Sync Latency", desc: "Continuous ledger streaming for SAP, NetSuite & Workday" },
    { stat: "$4.2M", label: "Average Annual Operational Savings", desc: "Eliminating manual re-keying & audit penalty risk" },
  ].slice(0, count);

  return (
    <div className="bg-[#0b132b] text-white px-6 md:px-12 py-16 border-b border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <SectionLabel text="Quantifiable Financial Impact" light />
          <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Real Results from Global Finance Transformations
          </h3>
          <p className="text-sm text-slate-300 mt-2">
            Independent proof of what happens when financial governance is built directly into the operating system.
          </p>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${count} gap-6`}>
          {metrics.map((m) => (
            <div key={m.label} className="bg-slate-900/60 border border-slate-800 p-6 rounded-xl text-center">
              <p className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">{m.stat}</p>
              <p className="text-xs font-semibold text-blue-400 mb-1">{m.label}</p>
              <p className="text-xs text-slate-300 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Real Feature Breakdown & Alternating Sections ───────────────────────────

function ZigzagSection({ rows = 3 }: { rows?: number }) {
  const items = [
    {
      label: "Autonomous Multi-Entity Consolidation",
      title: "Consolidate 50+ Subsidiaries with Zero Spreadsheet Vulnerability",
      desc: "Between the transaction recorded in an ERP and the result presented to the board, something consequential and largely invisible occurs. Sheshi automates currency remeasurement, eliminations, and complex equity adjustments in a governed, auditable pipeline.",
      points: [
        "Automated intercompany balance elimination and dispute flagging",
        "Real-time FX remeasurement with continuous central bank rate feeds",
        "Configurable multi-tier GAAP and IFRS parallel reporting",
      ],
      tag: "Consolidation Engine",
    },
    {
      label: "Continuous Close without Month-End Chaos",
      title: "Transform the 15-Day Month-End Crisis into a Daily Automated Routine",
      desc: "Stop waiting for month-end to discover discrepancies. Sheshi runs automated transaction matching, accrual validation, and variance detection agents continuously every 24 hours.",
      points: [
        "Pre-close anomaly detection before ledger locks occur",
        "Automated journal entry postings with segregation-of-duties rules",
        "Real-time visibility into close readiness across global business units",
      ],
      tag: "Continuous Close",
    },
    {
      label: "Governed Board Reporting & Audit Readiness",
      title: "Board Packs with Cryptographic Data Provenance",
      desc: "Every number in your board presentation links back to its exact ERP source line item. External auditors receive a federated, read-only room that cuts audit preparation time by over 70%.",
      points: [
        "Immutable SHA-256 digital watermark for every published figure",
        "Role-based controller sign-offs and timestamped approval hierarchies",
        "One-click XBRL and statutory filing compliance exports",
      ],
      tag: "Governance & Audit",
    },
  ].slice(0, rows);

  return (
    <div className="bg-white">
      {items.map((item, idx) => {
        const isOdd = idx % 2 !== 0;
        return (
          <div key={item.label} className={`px-6 md:px-12 py-20 border-b border-slate-200/80 ${isOdd ? "bg-[#f8fafc]" : "bg-white"}`}>
            <div className={`max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isOdd ? "lg:flex-row-reverse" : ""}`}>
              <div className={`lg:col-span-6 ${isOdd ? "lg:order-2" : "lg:order-1"}`}>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2 font-mono">
                  0{idx + 1} // {item.tag}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {item.desc}
                </p>
                <ul className="space-y-3 mb-8">
                  {item.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-3 text-xs text-slate-700">
                      <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        ✓
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                  <span>Learn how this architecture works</span>
                  <span>→</span>
                </div>
              </div>

              <div className={`lg:col-span-6 ${isOdd ? "lg:order-1" : "lg:order-2"}`}>
                <div className="bg-[#090e17] text-white p-6 rounded-2xl border border-slate-800 shadow-xl">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                    <span className="text-xs font-mono text-blue-400">COMPONENT // {item.tag.toUpperCase()}</span>
                    <span className="text-[10px] bg-blue-950 text-blue-300 border border-blue-800 px-2 py-0.5 rounded">
                      Verified
                    </span>
                  </div>
                  <div className="space-y-2.5 text-xs font-mono">
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-400">Processing Node</span>
                      <span className="text-white">Sheshi-FOS-v4.2</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-400">Status</span>
                      <span className="text-emerald-400">100% Governed</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                      <span className="text-slate-400">Security Guardrail</span>
                      <span className="text-white">SOX 404 Cryptographic Log</span>
                    </div>
                    <div className="pt-2 text-[11px] text-slate-400 font-sans leading-relaxed">
                      All calculations execute in memory with real-time audit checkpoint validation.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Capability & Feature Grids ──────────────────────────────────────────────

function CapabilityGrid({ count = 9 }: { count?: number }) {
  const caps = [
    { title: "Autonomous Transaction Matching", desc: "Rule-based and probabilistic machine learning algorithms match millions of ledger records daily.", icon: "⚡" },
    { title: "Multi-Currency & FX Remeasurement", desc: "Real-time automated conversion with historical rate locks and translation adjustment reserves.", icon: "🌐" },
    { title: "Variance & Flux Analysis Agents", desc: "AI agents explain balance sheet fluctuations and flag unexpected spikes before month-end close.", icon: "📊" },
    { title: "Governed Board Reporting Packs", desc: "Automated creation of board-ready executive summaries with drill-down audit capabilities.", icon: "📋" },
    { title: "Intercompany Elimination", desc: "Bilateral reconciliation engine identifies unmatched transactions across global entities.", icon: "🔄" },
    { title: "Continuous Audit Readiness", desc: "Permanent digital trail with immutable record-keeping ensures effortless Big 4 review cycles.", icon: "🛡️" },
    { title: "Automated Journal Entry Postings", desc: "Validates and automatically posts recurring adjustments directly back to core ERPs.", icon: "✍️" },
    { title: "Role-Based Segregation of Duties", desc: "Enforces enterprise financial controls so no single individual can author and approve entries.", icon: "🔐" },
    { title: "Dispute & Deduction Management", desc: "Tracks deduction trends and accelerates invoice dispute resolution across accounts receivable.", icon: "📑" },
  ].slice(0, count);

  return (
    <div className="bg-white px-6 md:px-12 py-20 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel text="Core Platform Capabilities" />
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
            The Governed Infrastructure Your ERP Was Never Built to Be
          </h3>
          <p className="text-sm text-slate-600 mt-3">
            Modular financial operating capabilities designed to eliminate manual spreadsheet chaos and governance risk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caps.map((c) => (
            <div
              key={c.title}
              className="bg-white border border-slate-200/90 rounded-xl p-6 hover:border-blue-500/50 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-lg mb-4 group-hover:scale-110 transition-transform">
                {c.icon}
              </div>
              <h4 className="font-bold text-slate-900 text-base mb-2 group-hover:text-blue-600 transition-colors">
                {c.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeatureCards({ count = 3, cols = 3 }: { count?: number; cols?: number }) {
  const feats = [
    { title: "Financial Close Orchestration", desc: "Coordinate task checklists, reconciliation assignments, and dependency blockers in one live command console.", badge: "Automation" },
    { title: "Agentic Flux Explanations", desc: "Generative financial agents analyze general ledger variances and write executive explanations automatically.", badge: "Agentic AI" },
    { title: "Multi-ERP Unified Lineage", desc: "Harmonize SAP, NetSuite, and Workday ledger feeds into a single coherent financial hierarchy.", badge: "Integration" },
    { title: "Regulatory XBRL & SEC Filing", desc: "One-click export into compliant XBRL tags, audited statutory formats, and investor pack PDFs.", badge: "Compliance" },
  ].slice(0, count);

  return (
    <div className="bg-[#f8fafc] px-6 md:px-12 py-16 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto">
        <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-6`}>
          {feats.map((f) => (
            <div key={f.title} className="bg-white border border-slate-200 rounded-xl p-7 hover:border-blue-500/40 transition-all shadow-xs">
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-full mb-3 inline-block">
                {f.badge}
              </span>
              <h4 className="font-bold text-slate-900 text-lg mb-2">{f.title}</h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">{f.desc}</p>
              <span className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                View platform specs →
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Real Enterprise Logo & Integration Strip ────────────────────────────────

function LogoStrip() {
  const logos = [
    { name: "SAP S/4HANA", tag: "Certified ERP Connector" },
    { name: "Oracle NetSuite", tag: "Native SuiteApp Partner" },
    { name: "Workday Financials", tag: "Cloud Integration" },
    { name: "Microsoft Dynamics 365", tag: "Direct API Bridge" },
    { name: "QuickBooks Enterprise", tag: "Mid-Market Sync" },
    { name: "Xero", tag: "SaaS Accounting" },
  ];

  return (
    <div className="bg-white border-b border-slate-200/80 px-6 md:px-12 py-12">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8 font-mono">
          Engineered for seamless integration with tier-1 financial systems
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {logos.map((l) => (
            <div key={l.name} className="border border-slate-200/80 rounded-xl p-4 text-center hover:border-blue-500/40 transition-colors bg-[#f8fafc]">
              <p className="text-xs font-bold text-slate-800">{l.name}</p>
              <p className="text-[10px] text-slate-600 mt-1 font-mono">{l.tag}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Real Testimonials & Case Studies ────────────────────────────────────────

function TestimonialBlock() {
  return (
    <div className="bg-[#090e17] text-white px-6 md:px-12 py-20 border-b border-slate-800">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-blue-400 text-2xl mb-4 font-serif">“</div>
        <blockquote className="text-xl md:text-2xl font-medium text-slate-100 leading-relaxed mb-6 font-sans">
          Most financial software is built by technologists who learned finance. Sheshi is built from inside finance by people who have actually run month-end close cycles, managed audits, and carried accountability for what the numbers say to the board.
        </blockquote>
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm text-white">
            CA
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-white">Founding Philosophy</p>
            <p className="text-xs text-slate-400">Sheshi Financial Operating System • Practice-Led Architecture</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function CaseStudyCards() {
  const studies = [
    {
      company: "Global FinTech Holdings",
      metric: "-72% Close Duration",
      desc: "Consolidated 18 entities across North America and Europe, moving from a 14-day close down to 3.5 days with zero spreadsheet reliance.",
      erp: "NetSuite & SAP Integration",
    },
    {
      company: "Apex Healthcare Network",
      metric: "100% Audit Compliance",
      desc: "Eliminated $800k in annual audit fees by giving Big 4 auditors direct read-only access to Sheshi's immutable audit lineage room.",
      erp: "Workday Financials",
    },
    {
      company: "Hyper-Growth Cloud Scaleup",
      metric: "$3.2M Annual Savings",
      desc: "Automated 2.8 million recurring monthly transaction matches and eliminated 15 manual reconciliation spreadsheets.",
      erp: "Oracle Cloud ERP",
    },
  ];

  return (
    <div className="bg-white px-6 md:px-12 py-20 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel text="Enterprise Transformations" />
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
            How Leading CFOs Scale Without Operational Risk
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studies.map((s) => (
            <div key={s.company} className="bg-white border border-slate-200 rounded-xl p-7 hover:border-blue-500/50 hover:shadow-md transition-all">
              <span className="text-xs font-mono text-slate-400 block mb-2">{s.erp}</span>
              <h4 className="text-lg font-bold text-slate-900 mb-1">{s.company}</h4>
              <p className="text-2xl font-bold text-blue-600 mb-4">{s.metric}</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">{s.desc}</p>
              <span className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                Read full case study →
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── FAQ & Video Components ──────────────────────────────────────────────────

function FAQSection() {
  const faqs = [
    {
      q: "Does Sheshi replace our existing ERP?",
      a: "No. Your ERP continues to record transactions. Sheshi is the governed operational layer that lives between your ERP and your published financial outputs—automating close, planning, consolidation, flux analysis, and reporting.",
    },
    {
      q: "How does Sheshi ensure SOC 1 and SOX compliance?",
      a: "Every transaction, calculation, and adjustment inside Sheshi is watermarked with immutable cryptographic timestamps and user identities, creating complete segregation of duties that external auditors can independently verify.",
    },
    {
      q: "What is the typical enterprise implementation timeline?",
      a: "Because Sheshi connects via pre-built API adapters to SAP, NetSuite, and Workday without requiring schema changes, standard enterprise deployment averages 4 to 6 weeks.",
    },
    {
      q: "Can Sheshi handle complex multi-currency consolidations?",
      a: "Yes. Sheshi natively supports unlimited legal entities, multi-tier consolidation hierarchies, automated intercompany eliminations, and historical FX remeasurement.",
    },
  ];

  return (
    <div className="bg-[#f8fafc] px-6 md:px-12 py-20 border-b border-slate-200/80">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <SectionLabel text="Frequently Asked Questions" />
          <h3 className="text-3xl font-bold text-slate-900">Governance &amp; Architectural Architecture</h3>
        </div>
        <div className="space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="bg-white border border-slate-200 rounded-xl p-6">
              <h4 className="font-bold text-slate-900 text-sm mb-2">{f.q}</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VideoCards() {
  const videos = [
    { title: "Continuous Close in Action: Live System Walkthrough", duration: "18 mins", speaker: "CFO & Head of Architecture", views: "3.4k views" },
    { title: "Automating 10,000 Journal Matches with Zero Spreadsheet Macros", duration: "24 mins", speaker: "Lead Financial Engineer", views: "2.1k views" },
    { title: "Designing Board Packs with Cryptographic Data Provenance", duration: "15 mins", speaker: "VP of Product", views: "1.8k views" },
  ];

  return (
    <div className="bg-white px-6 md:px-12 py-16 border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <SectionLabel text="Masterclasses &amp; Demos" />
          <h3 className="text-2xl font-bold text-slate-900">Watch the Financial Operating System in Practice</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((v) => (
            <div key={v.title} className="border border-slate-200 rounded-xl overflow-hidden hover:border-blue-500/40 transition-colors bg-[#f8fafc]">
              <div className="bg-[#090e17] h-40 flex items-center justify-center text-white relative">
                <div className="w-12 h-12 rounded-full bg-blue-600/90 flex items-center justify-center text-sm shadow-md cursor-pointer hover:scale-105 transition-transform">
                  ▶
                </div>
                <span className="absolute bottom-3 right-3 text-[10px] bg-black/70 px-2 py-0.5 rounded text-white font-mono">
                  {v.duration}
                </span>
              </div>
              <div className="p-5">
                <h4 className="font-bold text-slate-900 text-sm mb-1">{v.title}</h4>
                <p className="text-xs text-slate-500 font-medium mb-2">{v.speaker}</p>
                <span className="text-[11px] text-blue-600 font-semibold cursor-pointer">Watch on-demand session →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Trust Center, Culture, and Events Wireframe Sections ─────────────────────

function TrustBadgesSection() {
  const certs = [
    { name: "SOC 1 Type II", status: "Certified", org: "AICPA / SSAE 18", desc: "Internal controls over financial reporting audited annually by independent Big 4 CPA firms." },
    { name: "SOC 2 Type II", status: "Certified", org: "AICPA Trust Services", desc: "Continuous monitoring for security, availability, confidentiality, and processing integrity." },
    { name: "ISO/IEC 27001", status: "Certified", org: "Global Standards Org", desc: "International best practices in information security management systems (ISMS)." },
    { name: "GDPR & CCPA", status: "Compliant", org: "EU & US Privacy Frameworks", desc: "Strict end-to-end user privacy, consent architecture, data residency, and right to be forgotten." },
    { name: "HIPAA Compliant", status: "Compliant", org: "Healthcare Security Standard", desc: "Enterprise administrative, physical, and technical data transmission safeguards." },
    { name: "PCI DSS Level 1", status: "Compliant", org: "Payment Card Council", desc: "Highest tier financial transaction security, tokenization, and cryptographic standards." },
  ];
  return (
    <div className="bg-white border-b border-slate-200/80 px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 mb-10 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational • 99.99% Uptime (Past 90 Days)
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Enterprise Compliance &amp; Security Certifications</h3>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-xs font-semibold bg-[#0b132b] text-white px-4 py-2.5 rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
              Download Security Whitepaper
            </button>
            <button className="text-xs font-semibold border border-slate-300 text-slate-700 px-4 py-2.5 rounded-lg hover:border-blue-600 hover:text-blue-600 transition-colors cursor-pointer">
              Request SOC 2 Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((c) => (
            <div key={c.name} className="border border-slate-200 rounded-xl p-6 hover:border-blue-500/50 transition-all hover:shadow-sm bg-white">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-base text-slate-900 border border-slate-200">
                  🛡️
                </div>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  {c.status}
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 mb-1">{c.name}</h4>
              <p className="text-xs font-semibold text-slate-500 mb-2">{c.org}</p>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">{c.desc}</p>
              <span className="text-xs font-medium text-blue-600 hover:underline cursor-pointer">View audit overview →</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CultureValuesSection() {
  const values = [
    { title: "Radical Transparency & Trust", desc: "We default to open sharing of financial metrics, product roadmaps, and decision-making frameworks across all teams." },
    { title: "Relentless Craft & Mastery", desc: "We hold ourselves to rigorous standards in engineering, financial algorithms, and intuitive product experience." },
    { title: "Empowered Autonomy", desc: "Every Sheshi builder is trusted with ownership, decision speed, and psychological safety to innovate boldly." },
    { title: "Global Inclusion & Belonging", desc: "Our diverse perspectives shape empathy, deep cross-border financial insights, and a supportive team culture." },
  ];
  return (
    <div className="bg-white border-b border-slate-200/80 px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <SectionLabel text="Our Cultural Blueprint" />
          <h3 className="text-3xl font-bold text-slate-900 mb-3">The Principles that Guide How We Build &amp; Grow</h3>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            We are a team of financial technologists, researchers, and operators united by a mission to create the world&apos;s leading financial operating system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((v, i) => (
            <div key={v.title} className="bg-[#f8fafc] border border-slate-200 rounded-xl p-6 flex flex-col justify-between hover:border-blue-500/50 transition-colors">
              <div>
                <span className="text-xs font-bold text-blue-600 font-mono mb-3 block">0{i + 1} / PRINCIPLE</span>
                <h4 className="font-bold text-slate-900 text-base mb-2">{v.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <span>Sheshi Way</span>
                <span className="text-blue-600 font-bold">✦</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#0b132b] text-white rounded-2xl p-8 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center border border-slate-800">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">45%</div>
            <div className="text-xs text-slate-400">Executive &amp; Tech Diversity</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">28+</div>
            <div className="text-xs text-slate-400">Countries Represented</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">4.9 / 5</div>
            <div className="text-xs text-slate-400">Glassdoor Workplace Rating</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">100%</div>
            <div className="text-xs text-slate-400">Remote-First Flexibility</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventsFeaturedSection() {
  const events = [
    { tag: "Flagship Annual Summit", title: "Sheshi NEXUS 2026: Global Financial Operating Summit", date: "Oct 14–16, 2026", loc: "San Francisco, CA & Digital Livestream", desc: "Join 2,500+ CFOs, controllers, and finance innovators exploring agentic AI, continuous financial close, and operating system transformations." },
    { tag: "Executive Roundtable", title: "CFO Leadership Forum: Navigating Autonomous ERPs", date: "Nov 5, 2026", loc: "London, UK (Chatham House Rule)", desc: "An exclusive invite-only gathering of 35 European enterprise finance executives discussing AI governance and multi-entity consolidation." },
    { tag: "Virtual Masterclass", title: "Continuous Close in Action: 75% Reduction in Audit Cycles", date: "Nov 19, 2026", loc: "Interactive Global Broadcast", desc: "Deep technical session on transaction matching algorithms, variance analysis agents, and audit-ready data lineage." },
  ];
  return (
    <div className="bg-white border-b border-slate-200/80 px-6 md:px-12 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 mb-8 border-b border-slate-200">
          <div>
            <SectionLabel text="Conferences &amp; Gatherings" />
            <h3 className="text-3xl font-bold text-slate-900">Upcoming Sheshi Events Worldwide</h3>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Connect with finance innovators, industry analysts, and the Sheshi leadership team in-person and virtually.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg">
            <span className="px-3 py-1 bg-white rounded-md text-xs font-semibold text-slate-900 shadow-xs">All Events</span>
            <span className="px-3 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer">In-Person</span>
            <span className="px-3 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer">Virtual</span>
          </div>
        </div>

        <div className="space-y-6">
          {events.map((ev) => (
            <div key={ev.title} className="border border-slate-200 rounded-xl p-6 md:p-8 hover:border-blue-500/50 transition-all hover:shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    {ev.tag}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                    📅 {ev.date}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                    📍 {ev.loc}
                  </span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{ev.title}</h4>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed max-w-3xl">{ev.desc}</p>
              </div>
              <div className="flex flex-row lg:flex-col gap-3 shrink-0">
                <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-xs font-semibold hover:bg-blue-500 transition-colors cursor-pointer text-center">
                  Register Now
                </button>
                <button className="border border-slate-300 text-slate-700 px-5 py-2.5 rounded-lg text-xs font-semibold hover:border-blue-600 transition-colors cursor-pointer text-center">
                  View Agenda
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CTABand({
  title = "Ready to transform your financial operating layer?",
  subtitle = "Talk to our team of Chartered Accountants and distributed systems engineers. We understand your month-end close because we've lived it.",
  navigate,
}: {
  title?: string;
  subtitle?: string;
  navigate?: (r: Route) => void;
}) {
  return (
    <div className="bg-[#090e17] text-white px-6 md:px-12 py-20 border-t border-slate-800 text-center relative overflow-hidden">
      <div className="max-w-3xl mx-auto relative z-10">
        <span className="inline-block text-xs font-bold text-blue-400 uppercase tracking-widest mb-3 font-mono">
          GET STARTED WITH SHESHI
        </span>
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{title}</h3>
        <p className="text-sm md:text-base text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto">{subtitle}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => navigate && navigate({ page: "contact" })}
            className="bg-blue-600 hover:bg-blue-500 text-white px-7 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            Request an Executive Conversation
          </button>
          <button
            onClick={() => {
              const el = document.getElementById("sitemap-flowchart");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="border border-slate-700 text-slate-300 hover:text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-slate-800/80 transition-all cursor-pointer"
          >
            View Full System Map
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Section Definition & Dispatcher ──────────────────────────────────────────

type SectionDef = {
  type: string;
  count?: number;
  cols?: number;
  accent?: string;
};

function renderSection(s: SectionDef, i: number, navigate?: (r: Route) => void) {
  switch (s.type) {
    case "trustbadges": return <TrustBadgesSection key={i} />;
    case "culturevalues": return <CultureValuesSection key={i} />;
    case "eventsfeatured": return <EventsFeaturedSection key={i} />;
    case "metrics": return <MetricsRow key={i} count={s.count ?? 5} />;
    case "metrics3": return <MetricsRow key={i} count={3} />;
    case "zigzag": return <ZigzagSection key={i} rows={s.count ?? 3} />;
    case "capgrid": return <CapabilityGrid key={i} count={s.count ?? 9} />;
    case "featurecards": return <FeatureCards key={i} count={s.count ?? 3} cols={s.cols ?? 3} />;
    case "logostrip": return <LogoStrip key={i} />;
    case "testimonial": return <TestimonialBlock key={i} />;
    case "ctaband": return <CTABand key={i} navigate={navigate} />;
    case "faq": return <FAQSection key={i} />;
    case "videocards": return <VideoCards key={i} />;
    case "casestudies": return <CaseStudyCards key={i} />;
    default: return null;
  }
}

// ─── Complete Content Registry (NO Skeletons) ────────────────────────────────

const PAGE_DATA: Record<
  string,
  Record<string, { title: string; subtitle: string; hero?: "split" | "centered"; sections: SectionDef[] }>
> = {
  company: {
    about: {
      title: "About Sheshi",
      subtitle: "Built from inside finance. For the world outside it. The governed layer between your ERP and every financial output.",
      hero: "split",
      sections: [{ type: "logostrip" }, { type: "metrics", count: 4 }, { type: "zigzag", count: 2 }, { type: "testimonial" }, { type: "ctaband" }],
    },
    story: {
      title: "Our Story",
      subtitle: "How two decades in professional accounting practice revealed the hidden risks of un-governed financial spreadsheets.",
      hero: "split",
      sections: [{ type: "zigzag", count: 3 }, { type: "testimonial" }, { type: "ctaband" }],
    },
    leadership: {
      title: "Executive Leadership",
      subtitle: "Chartered Accountants and distributed systems engineers uniting deep financial practice with modern infrastructure.",
      hero: "split",
      sections: [{ type: "featurecards", count: 3 }, { type: "capgrid", count: 6 }, { type: "ctaband" }],
    },
    team: {
      title: "Our Global Team",
      subtitle: "28+ countries represented across financial engineering, distributed consensus, and client advisory.",
      hero: "split",
      sections: [{ type: "culturevalues" }, { type: "capgrid", count: 9 }, { type: "ctaband" }],
    },
    culture: {
      title: "People - and culture",
      subtitle: "Our core principles, radical transparency, global inclusion, and life inside Sheshi.",
      hero: "split",
      sections: [{ type: "culturevalues" }, { type: "zigzag", count: 2 }, { type: "testimonial" }, { type: "ctaband" }],
    },
    careers: {
      title: "Careers at Sheshi",
      subtitle: "Build the future of governed financial intelligence. Competitive equity, remote-first autonomy, and deep impact.",
      hero: "split",
      sections: [{ type: "culturevalues" }, { type: "featurecards", count: 3 }, { type: "ctaband" }],
    },
  },
  solutions: {
    enterprise: {
      title: "Enterprise Finance",
      subtitle: "Complex multi-entity consolidation, SOX compliance, and continuous close for global organizations.",
      hero: "split",
      sections: [{ type: "logostrip" }, { type: "metrics", count: 4 }, { type: "zigzag", count: 3 }, { type: "casestudies" }, { type: "testimonial" }, { type: "ctaband" }],
    },
    startup: {
      title: "Startup & Scaleup Finance",
      subtitle: "Burn oversight, investor runway predictability, and board pack automation for high-growth ventures.",
      hero: "split",
      sections: [{ type: "metrics", count: 3 }, { type: "featurecards", count: 3 }, { type: "casestudies" }, { type: "ctaband" }],
    },
    consulting: {
      title: "Consulting & Advisory Firms",
      subtitle: "Empower your advisory engagements with automated client reconciliation and white-label governance.",
      hero: "split",
      sections: [{ type: "featurecards", count: 3 }, { type: "zigzag", count: 2 }, { type: "testimonial" }, { type: "ctaband" }],
    },
    professionals: {
      title: "Finance Professionals",
      subtitle: "Purpose-built workbench for CFOs, controllers, and FP&A analysts to eliminate manual re-keying.",
      hero: "split",
      sections: [{ type: "featurecards", count: 4 }, { type: "faq" }, { type: "ctaband" }],
    },
  },
  technology: {
    fos: {
      title: "Financial Operating System",
      subtitle: "The authoritative infrastructure layer that sits between your transaction ERP and board outputs.",
      hero: "centered",
      sections: [{ type: "capgrid", count: 9 }, { type: "zigzag", count: 2 }, { type: "ctaband" }],
    },
    ai: {
      title: "AI & Automation",
      subtitle: "Autonomous variance detection, flux analysis agents, and audit-ready machine learning workflows.",
      hero: "centered",
      sections: [{ type: "metrics", count: 5 }, { type: "zigzag", count: 3 }, { type: "featurecards", count: 3 }, { type: "ctaband" }],
    },
    integrations: {
      title: "ERP & Data Integrations",
      subtitle: "Pre-built connectors for SAP, NetSuite, Workday, Microsoft Dynamics, QuickBooks, and Salesforce.",
      hero: "split",
      sections: [{ type: "logostrip" }, { type: "capgrid", count: 6 }, { type: "ctaband" }],
    },
    security: {
      title: "Security & Compliance",
      subtitle: "Enterprise-grade AES-256 encryption, SOC 1/2 compliance, and immutable cryptographic audit trails.",
      hero: "split",
      sections: [{ type: "metrics3" }, { type: "trustbadges" }, { type: "ctaband" }],
    },
    trust: {
      title: "Trust Center",
      subtitle: "Real-time security posture, compliance certifications, sub-processors, and system status transparency.",
      hero: "centered",
      sections: [{ type: "trustbadges" }, { type: "metrics3" }, { type: "featurecards", count: 3 }, { type: "faq" }, { type: "ctaband" }],
    },
  },
  resources: {
    blog: {
      title: "Sheshi Perspectives & Blog",
      subtitle: "Engineering insights, financial governance frameworks, and continuous close case studies.",
      hero: "split",
      sections: [{ type: "featurecards", count: 3 }, { type: "casestudies" }, { type: "ctaband" }],
    },
    insights: {
      title: "Executive Insights",
      subtitle: "In-depth research on financial operations, multi-entity complexity, and autonomous close architecture.",
      hero: "split",
      sections: [{ type: "featurecards", count: 3 }, { type: "casestudies" }, { type: "testimonial" }, { type: "ctaband" }],
    },
    casestudies: {
      title: "Customer Case Studies",
      subtitle: "Quantified results and ROI metrics from enterprise finance transformations across the globe.",
      hero: "split",
      sections: [{ type: "casestudies" }, { type: "testimonial" }, { type: "metrics", count: 4 }, { type: "ctaband" }],
    },
    research: {
      title: "The Numbers Story (Research)",
      subtitle: "Independent structured study with 150+ CFOs on the unstudied lifecycle of financial data between ERP and board.",
      hero: "split",
      sections: [{ type: "featurecards", count: 3 }, { type: "metrics", count: 4 }, { type: "testimonial" }, { type: "ctaband" }],
    },
    events: {
      title: "Events & Summits",
      subtitle: "Join us at Sheshi NEXUS 2026, CFO leadership roundtables, and regional financial engineering symposiums.",
      hero: "split",
      sections: [{ type: "eventsfeatured" }, { type: "videocards" }, { type: "ctaband" }],
    },
    webinars: {
      title: "Webinars & Masterclasses",
      subtitle: "Learn continuous close techniques, automated flux analysis, and ERP governance from practicing leaders.",
      hero: "split",
      sections: [{ type: "videocards" }, { type: "faq" }, { type: "ctaband" }],
    },
    updates: {
      title: "Product Changelog & Updates",
      subtitle: "What's new in the Sheshi Financial Operating System platform release cycle.",
      hero: "split",
      sections: [{ type: "featurecards", count: 3 }, { type: "capgrid", count: 6 }, { type: "ctaband" }],
    },
  },
  partners: {
    tech: {
      title: "Technology Partners",
      subtitle: "Cloud platforms, ERP ecosystems, and developer tooling integrated with Sheshi.",
      hero: "split",
      sections: [{ type: "logostrip" }, { type: "featurecards", count: 3 }, { type: "ctaband" }],
    },
    strategic: {
      title: "Strategic Advisory Partners",
      subtitle: "Big 4 accounting alliances, regional advisory firms, and management consultancies.",
      hero: "split",
      sections: [{ type: "featurecards", count: 3 }, { type: "testimonial" }, { type: "ctaband" }],
    },
    join: {
      title: "Become a Partner",
      subtitle: "Join the Sheshi ecosystem. Co-sell incentives, certified partner portals, and technical enablement.",
      hero: "split",
      sections: [{ type: "featurecards", count: 3 }, { type: "faq" }, { type: "ctaband" }],
    },
  },
};

// ─── Contact Page Component ───────────────────────────────────────────────────

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const cats = [
    { label: "Enterprise Sales", desc: "Speak with our financial engineering team about Quanta deployment and ERP integrations." },
    { label: "Partnership & Alliances", desc: "Explore technology integration and strategic advisory partner programs." },
    { label: "Research & Media", desc: "Access data from The Numbers Story study or connect with our leadership." },
    { label: "General & Support", desc: "Direct inquiries for existing platform accounts and security assessments." },
  ];

  return (
    <div>
      <PageHero
        title="Connect with Sheshi"
        subtitle="We respond immediately. The conversation starts with understanding your finance function and systems."
        breadcrumb={["Home", "Contact"]}
      />
      <div className="bg-white px-6 md:px-12 py-20 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {cats.map((c) => (
              <div key={c.label} className="border border-slate-200 rounded-xl p-6 hover:border-blue-500/40 transition-colors bg-[#f8fafc]">
                <h4 className="font-bold text-slate-900 text-sm mb-2">{c.label}</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{c.desc}</p>
                <span className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                  Inquire directly →
                </span>
              </div>
            ))}
          </div>

          <div className="bg-[#f8fafc] border border-slate-200 rounded-2xl p-8 md:p-12 max-w-3xl mx-auto">
            <SectionLabel text="Inquiry Submission" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Schedule an Executive Consultation</h3>
            <p className="text-xs text-slate-600 mb-8">
              Tell us about your current ERP stack and close cycle challenges. Our team includes Chartered Accountants and systems engineers.
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-xl text-center">
                <div className="text-2xl mb-2">✓</div>
                <h4 className="font-bold text-base mb-1">Inquiry Received</h4>
                <p className="text-xs text-emerald-700">A senior financial systems architect will respond within 2 business hours.</p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Full Name</label>
                    <input
                      required
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Work Email</label>
                    <input
                      required
                      type="email"
                      placeholder="sarah@enterprise.com"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Company Name</label>
                    <input
                      required
                      placeholder="e.g. Global Tech Corp"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">Current Primary ERP</label>
                    <select className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600">
                      <option>SAP S/4HANA / ECC</option>
                      <option>Oracle NetSuite</option>
                      <option>Workday Financials</option>
                      <option>Microsoft Dynamics 365</option>
                      <option>Multiple Disparate ERPs</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">How can we assist?</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your current month-end close duration, entity count, or audit requirements..."
                    className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Submit Executive Consultation Request
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <CTABand />
    </div>
  );
}

// ─── Legal Policy Page Component ──────────────────────────────────────────────

function LegalPage({ doc }: { doc: string }) {
  const titles: Record<string, string> = {
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    cookies: "Cookie Policy",
    security: "Security Disclosure & Vulnerability Handling",
    sitemap: "Platform Sitemap & System Index",
  };

  const title = titles[doc] ?? "Legal Governance Document";

  return (
    <div>
      <PageHero title={title} breadcrumb={["Legal", title]} />
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-16 text-slate-700 text-xs md:text-sm leading-relaxed space-y-8">
        <section className="border-b border-slate-200 pb-6">
          <h3 className="text-base font-bold text-slate-900 mb-2">1. Governing Framework &amp; Scope</h3>
          <p>
            Sheshi Technologies (&quot;Sheshi&quot;, &quot;we&quot;, &quot;us&quot;) operates the Financial Operating System software platform. This document governs all data transmissions, cryptographic record verification, and service tier agreements executed between Sheshi and customer organizations.
          </p>
        </section>

        <section className="border-b border-slate-200 pb-6">
          <h3 className="text-base font-bold text-slate-900 mb-2">2. Financial Data Isolation &amp; Zero-Knowledge Tenancy</h3>
          <p>
            Customer financial records ingested from ERP systems (including SAP, NetSuite, and Workday) are encrypted in transit using TLS 1.3 and at rest using AES-256. Multi-tenant logical isolation ensures that no customer financial data is ever co-mingled or utilized for external foundation model training without explicit written enterprise consent.
          </p>
        </section>

        <section className="border-b border-slate-200 pb-6">
          <h3 className="text-base font-bold text-slate-900 mb-2">3. Audit Trails &amp; Regulatory Disclosures</h3>
          <p>
            In compliance with AICPA SOC 1 Type II and SOC 2 Type II criteria, Sheshi maintains immutable transaction lineage logs for all calculations, eliminations, and adjustments. These logs remain accessible to authorized customer controllers and external Big 4 auditors for a minimum statutory retention period of 7 years.
          </p>
        </section>

        <section>
          <h3 className="text-base font-bold text-slate-900 mb-2">4. Incident Reporting &amp; DPO Inquiries</h3>
          <p>
            Security disclosures and compliance inquiries may be submitted directly to our Data Protection Officer at <code>security@sheshi.ai</code>. All verified vulnerability disclosures are triaged within 2 hours under our responsible disclosure program.
          </p>
        </section>
      </div>
    </div>
  );
}

// ─── Autonomous Product Subsite ───────────────────────────────────────────────

function ProductSubsite({
  productId,
  productPage,
  setProductPage,
  navigate,
}: {
  productId: string;
  productPage: string;
  setProductPage: (p: string) => void;
  navigate: (r: Route) => void;
}) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      {/* Product Top Sub-Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex items-center h-14 justify-between gap-4">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setProductPage("home")}
              className="font-bold text-base tracking-tight text-slate-900 hover:text-blue-600 transition-colors cursor-pointer flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: product.accent }} />
              <span>{product.label.toUpperCase()}</span>
            </button>
            <div className="hidden md:flex items-center gap-1">
              {product.pages.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setProductPage(p.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                    productPage === p.id ? "bg-slate-100 text-blue-600 font-semibold" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate({ page: "products" })}
              className="text-xs text-slate-500 hover:text-slate-900 font-medium cursor-pointer"
            >
              ← Back to Sheshi Ecosystem
            </button>
            <button
              onClick={() => navigate({ page: "contact" })}
              className="text-xs text-white font-semibold px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
              style={{ backgroundColor: product.accent }}
            >
              Request Access
            </button>
          </div>
        </div>
      </nav>

      {/* Product Content */}
      <main className="flex-1">
        <div className="bg-[#090e17] text-white px-6 md:px-12 py-20 border-b border-slate-800 text-center">
          <div className="max-w-4xl mx-auto">
            <span
              className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border mb-4 inline-block"
              style={{ color: product.accent, borderColor: product.accent + "50" }}
            >
              Independent Sheshi Product • {product.label}
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4">{product.tagline}</h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              {product.description}
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => navigate({ page: "contact" })}
                className="text-xs font-semibold text-white px-5 py-2.5 rounded-lg shadow-sm cursor-pointer"
                style={{ backgroundColor: product.accent }}
              >
                Schedule Architecture Demo
              </button>
              <button
                onClick={() => navigate({ page: "home" })}
                className="text-xs font-semibold text-slate-300 border border-slate-700 hover:text-white px-5 py-2.5 rounded-lg cursor-pointer"
              >
                Explore Overall Platform
              </button>
            </div>
          </div>
        </div>

        <CapabilityGrid count={6} />
        <MetricsRow count={3} />
        <ZigzagSection rows={2} />
        <CTABand navigate={navigate} />
      </main>

      {/* Product Subsite Footer */}
      <footer className="bg-[#0b132b] text-white border-t border-slate-800 px-6 md:px-12 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <span className="font-bold text-white mr-2">{product.label}</span>
            <span>A Sheshi Financial Operating System Product</span>
          </div>
          <button onClick={() => navigate({ page: "home" })} className="text-blue-400 hover:text-white cursor-pointer">
            Return to Sheshi Corporate Home →
          </button>
        </div>
      </footer>
    </div>
  );
}

// ─── Interactive Flowchart Site Map Section ───────────────────────────────────

interface FlowLeaf {
  id: string;
  label: string;
  route: Route;
  tagline?: string;
}

interface FlowProduct {
  id: string;
  label: string;
  icon: string;
  color: string;
  tagline: string;
  subsiteLabel: string;
  pages: FlowLeaf[];
}

interface FlowPillar {
  id: string;
  title: string;
  icon: string;
  color: string;
  tagline: string;
  route: Route;
  leaves?: FlowLeaf[];
  products?: FlowProduct[];
}

function SiteMapSection({ navigate }: { navigate: (r: Route) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"tree" | "horizontal" | "ascii">("tree");
  const [collapsedBranches, setCollapsedBranches] = useState<Record<string, boolean>>({});
  const [copiedAscii, setCopiedAscii] = useState(false);

  const toggleBranch = (id: string) => {
    setCollapsedBranches((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => setCollapsedBranches({});
  const collapseAll = () => {
    setCollapsedBranches({
      company: true,
      products: true,
      quanta: true,
      catalyx: true,
      consultease: true,
      sheshifr: true,
      solutions: true,
      technology: true,
      resources: true,
      partners: true,
      contact: true,
      legal: true,
    });
  };

  const pillars: FlowPillar[] = [
    {
      id: "home",
      title: "Home",
      icon: "🏠",
      color: "#0f172a",
      tagline: "Corporate Overview & Financial OS Entryway",
      route: { page: "home" },
    },
    {
      id: "company",
      title: "Company",
      icon: "🏢",
      color: "#2563eb",
      tagline: "Corporate Identity, Team & Leadership",
      route: { page: "company", sub: "about" },
      leaves: [
        { id: "about", label: "About Sheshi", route: { page: "company", sub: "about" }, tagline: "Mission, vision and corporate values" },
        { id: "story", label: "Our Story", route: { page: "company", sub: "story" }, tagline: "How Sheshi was created and scaled" },
        { id: "leadership", label: "Leadership", route: { page: "company", sub: "leadership" }, tagline: "Executive management and board" },
        { id: "team", label: "Our Team", route: { page: "company", sub: "team" }, tagline: "Engineers, analysts & advisors" },
        { id: "culture", label: "People - and culture", route: { page: "company", sub: "culture" }, tagline: "Workplace values, culture, DEI & community" },
        { id: "careers", label: "Careers", route: { page: "company", sub: "careers" }, tagline: "Open positions and culture" },
        { id: "contact-us", label: "Contact Us", route: { page: "contact" }, tagline: "Reach our global corporate office" },
      ],
    },
    {
      id: "products",
      title: "Products",
      icon: "📦",
      color: "#0d9488",
      tagline: "Autonomous Product Ecosystem",
      route: { page: "products" },
      products: [
        {
          id: "quanta",
          label: "Quanta",
          icon: "🔹",
          color: "#1d4ed8",
          tagline: "Enterprise Governance Platform",
          subsiteLabel: "Independent Product Website",
          pages: [
            { id: "quanta-home", label: "Overview", route: { page: "products", sub: "quanta", productPage: "home" } },
            { id: "quanta-platform", label: "Platform", route: { page: "products", sub: "quanta", productPage: "platform" } },
            { id: "quanta-solutions", label: "Solutions", route: { page: "products", sub: "quanta", productPage: "solutions" } },
            { id: "quanta-capabilities", label: "Capabilities", route: { page: "products", sub: "quanta", productPage: "capabilities" } },
            { id: "quanta-enterprise", label: "Enterprise", route: { page: "products", sub: "quanta", productPage: "enterprise" } },
            { id: "quanta-resources", label: "Resources", route: { page: "products", sub: "quanta", productPage: "resources" } },
            { id: "quanta-contact", label: "Contact Us", route: { page: "products", sub: "quanta", productPage: "contact" } },
          ],
        },
        {
          id: "catalyx",
          label: "Catalyx",
          icon: "🚀",
          color: "#059669",
          tagline: "Startup Finance Command Center",
          subsiteLabel: "Independent Product Website",
          pages: [
            { id: "catalyx-home", label: "Overview", route: { page: "products", sub: "catalyx", productPage: "home" } },
            { id: "catalyx-solutions", label: "Solutions", route: { page: "products", sub: "catalyx", productPage: "solutions" } },
            { id: "catalyx-features", label: "Features", route: { page: "products", sub: "catalyx", productPage: "features" } },
            { id: "catalyx-startups", label: "For Startups", route: { page: "products", sub: "catalyx", productPage: "startups" } },
            { id: "catalyx-resources", label: "Resources", route: { page: "products", sub: "catalyx", productPage: "resources" } },
            { id: "catalyx-contact", label: "Get Started", route: { page: "products", sub: "catalyx", productPage: "contact" } },
          ],
        },
        {
          id: "consultease",
          label: "ConsultEase",
          icon: "📊",
          color: "#7c3aed",
          tagline: "Advisory & Client Suite",
          subsiteLabel: "Independent Product Website",
          pages: [
            { id: "consultease-home", label: "Overview", route: { page: "products", sub: "consultease", productPage: "home" } },
            { id: "consultease-solutions", label: "Solutions", route: { page: "products", sub: "consultease", productPage: "solutions" } },
            { id: "consultease-features", label: "Features", route: { page: "products", sub: "consultease", productPage: "features" } },
            { id: "consultease-firms", label: "For Firms", route: { page: "products", sub: "consultease", productPage: "firms" } },
            { id: "consultease-resources", label: "Resources", route: { page: "products", sub: "consultease", productPage: "resources" } },
            { id: "consultease-contact", label: "Contact Us", route: { page: "products", sub: "consultease", productPage: "contact" } },
          ],
        },
        {
          id: "sheshifr",
          label: "Sheshi FR",
          icon: "📈",
          color: "#d97706",
          tagline: "Autonomous Reporting Suite",
          subsiteLabel: "Independent Product Website",
          pages: [
            { id: "sheshifr-home", label: "Overview", route: { page: "products", sub: "sheshifr", productPage: "home" } },
            { id: "sheshifr-features", label: "Features", route: { page: "products", sub: "sheshifr", productPage: "features" } },
            { id: "sheshifr-workflows", label: "Workflows", route: { page: "products", sub: "sheshifr", productPage: "workflows" } },
            { id: "sheshifr-professionals", label: "For Controllers", route: { page: "products", sub: "sheshifr", productPage: "professionals" } },
            { id: "sheshifr-resources", label: "Resources", route: { page: "products", sub: "sheshifr", productPage: "resources" } },
            { id: "sheshifr-contact", label: "Contact Us", route: { page: "products", sub: "sheshifr", productPage: "contact" } },
          ],
        },
      ],
    },
    {
      id: "solutions",
      title: "Solutions",
      icon: "💼",
      color: "#0891b2",
      tagline: "Tailored Architecture by Segment",
      route: { page: "solutions", sub: "enterprise" },
      leaves: [
        { id: "sol-enterprise", label: "Enterprise Finance", route: { page: "solutions", sub: "enterprise" } },
        { id: "sol-startup", label: "Startup Finance", route: { page: "solutions", sub: "startup" } },
        { id: "sol-consulting", label: "Consulting and Advisory Firms", route: { page: "solutions", sub: "consulting" } },
        { id: "sol-professionals", label: "Finance Professionals", route: { page: "solutions", sub: "professionals" } },
      ],
    },
    {
      id: "technology",
      title: "Technology",
      icon: "⚡",
      color: "#4f46e5",
      tagline: "Financial Operating System & Intelligence",
      route: { page: "technology", sub: "fos" },
      leaves: [
        { id: "tech-fos", label: "Financial Operating System", route: { page: "technology", sub: "fos" } },
        { id: "tech-ai", label: "AI and Automation", route: { page: "technology", sub: "ai" } },
        { id: "tech-integrations", label: "Integrations", route: { page: "technology", sub: "integrations" } },
        { id: "tech-security", label: "Security and Compliance", route: { page: "technology", sub: "security" } },
        { id: "tech-trust", label: "Trust Center", route: { page: "technology", sub: "trust" }, tagline: "Compliance certifications, security audit & live status" },
      ],
    },
    {
      id: "resources",
      title: "Resources",
      icon: "📚",
      color: "#059669",
      tagline: "Knowledge Base, Research & Media",
      route: { page: "resources", sub: "blog" },
      leaves: [
        { id: "res-blog", label: "Blog", route: { page: "resources", sub: "blog" } },
        { id: "res-insights", label: "Insights", route: { page: "resources", sub: "insights" } },
        { id: "res-casestudies", label: "Case Studies", route: { page: "resources", sub: "casestudies" } },
        { id: "res-research", label: "Research (Numbers Story)", route: { page: "resources", sub: "research" } },
        { id: "res-events", label: "Events", route: { page: "resources", sub: "events" }, tagline: "Global conferences, summits, and executive roundtables" },
        { id: "res-webinars", label: "Webinars", route: { page: "resources", sub: "webinars" }, tagline: "Virtual workshops, masterclasses & on-demand demos" },
        { id: "res-updates", label: "Product Updates", route: { page: "resources", sub: "updates" } },
      ],
    },
    {
      id: "partners",
      title: "Partners",
      icon: "🤝",
      color: "#d97706",
      tagline: "Technology & Strategic Ecosystem",
      route: { page: "partners", sub: "tech" },
      leaves: [
        { id: "part-tech", label: "Technology Partners", route: { page: "partners", sub: "tech" } },
        { id: "part-strategic", label: "Strategic Partners", route: { page: "partners", sub: "strategic" } },
        { id: "part-join", label: "Become a Partner", route: { page: "partners", sub: "join" } },
      ],
    },
    {
      id: "contact",
      title: "Contact",
      icon: "✉️",
      color: "#0284c7",
      tagline: "Dedicated Inquiries & Inbound Channels",
      route: { page: "contact" },
      leaves: [
        { id: "con-sales", label: "Sales Enquiries", route: { page: "contact" } },
        { id: "con-partnerships", label: "Partnership Enquiries", route: { page: "contact" } },
        { id: "con-media", label: "Media Enquiries", route: { page: "contact" } },
        { id: "con-general", label: "General Enquiries", route: { page: "contact" } },
      ],
    },
    {
      id: "legal",
      title: "Legal",
      icon: "⚖️",
      color: "#475569",
      tagline: "Compliance, Privacy & Terms of Governance",
      route: { page: "legal", sub: "privacy" },
      leaves: [
        { id: "leg-privacy", label: "Privacy Policy", route: { page: "legal", sub: "privacy" } },
        { id: "leg-terms", label: "Terms of Use", route: { page: "legal", sub: "terms" } },
        { id: "leg-cookies", label: "Cookie Policy", route: { page: "legal", sub: "cookies" } },
        { id: "leg-security", label: "Security Disclosure", route: { page: "legal", sub: "security" } },
        { id: "leg-trust", label: "Trust Center", route: { page: "technology", sub: "trust" } },
        { id: "leg-sitemap", label: "Sitemap", route: { page: "legal", sub: "sitemap" } },
      ],
    },
  ];

  const term = searchTerm.toLowerCase().trim();

  const asciiTree = `SHESHI FINANCIAL OPERATING SYSTEM
│
├── Home (/)
│
├── Company (/company)
│   ├── About Sheshi (/company/about)
│   ├── Our Story (/company/story)
│   ├── Leadership (/company/leadership)
│   ├── Our Team (/company/team)
│   ├── People - and culture (/company/culture)
│   ├── Careers (/company/careers)
│   └── Contact Us (/contact)
│
├── Products (/products)
│   │
│   ├── Quanta (/products/quanta)
│   │   └── Independent Product Website
│   │       ├── Overview
│   │       ├── Platform
│   │       ├── Solutions
│   │       ├── Capabilities
│   │       ├── Enterprise
│   │       ├── Resources
│   │       └── Contact Sales
│   │
│   ├── Catalyx (/products/catalyx)
│   │   └── Independent Product Website
│   │       ├── Overview
│   │       ├── Solutions
│   │       ├── Features
│   │       ├── For Startups
│   │       ├── Resources
│   │       └── Get Started
│   │
│   ├── ConsultEase (/products/consultease)
│   │   └── Independent Product Website
│   │       ├── Overview
│   │       ├── Solutions
│   │       ├── Features
│   │       ├── For Advisory Firms
│   │       ├── Resources
│   │       └── Contact Us
│   │
│   └── Sheshi FR (/products/sheshifr)
│       └── Independent Product Website
│           ├── Overview
│           ├── Features
│           ├── Workflows
│           ├── For Controllers
│           ├── Resources
│           └── Contact Us
│
├── Solutions (/solutions)
│   ├── Enterprise Finance
│   ├── Startup Finance
│   ├── Consulting and Advisory Firms
│   └── Finance Professionals
│
├── Technology (/technology)
│   ├── Financial Operating System
│   ├── AI and Automation
│   ├── Integrations
│   ├── Security and Compliance
│   └── Trust Center
│
├── Resources (/resources)
│   ├── Blog
│   ├── Insights
│   ├── Case Studies
│   ├── Research (The Numbers Story)
│   ├── Events
│   ├── Webinars
│   └── Product Updates
│
├── Partners (/partners)
│   ├── Technology Partners
│   ├── Strategic Partners
│   └── Become a Partner
│
├── Contact (/contact)
│   ├── Sales Enquiries
│   ├── Partnership Enquiries
│   ├── Media Enquiries
│   └── General Enquiries
│
└── Legal (/legal)
    ├── Privacy Policy
    ├── Terms of Use
    ├── Cookie Policy
    ├── Security Disclosure
    ├── Trust Center
    └── Sitemap`;

  const copyAscii = () => {
    navigator.clipboard.writeText(asciiTree);
    setCopiedAscii(true);
    setTimeout(() => setCopiedAscii(false), 2000);
  };

  return (
    <section id="sitemap-flowchart" className="bg-[#f8fafc] border-t border-b border-slate-200 py-20 px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-blue-600 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              Platform Architecture Graph
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Sheshi Platform Tree Flowchart
            </h2>
            <p className="text-sm md:text-base text-slate-600 max-w-2xl mt-2">
              System routing tree rendered as an interconnected graph with branch spines, intermediate subsite gateways, and interactive page nodes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="bg-white border border-slate-200 p-1 rounded-lg flex items-center shadow-xs">
              <button
                onClick={() => setViewMode("tree")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "tree" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🌳 Tree Flowchart
              </button>
              <button
                onClick={() => setViewMode("horizontal")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "horizontal" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                🔀 Horizontal Graph
              </button>
              <button
                onClick={() => setViewMode("ascii")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "ascii" ? "bg-slate-900 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                📋 Raw Diagram
              </button>
            </div>

            {/* Expand / Collapse All */}
            {viewMode !== "ascii" && (
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 p-1 rounded-lg shadow-xs">
                <button
                  onClick={expandAll}
                  className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 rounded transition-colors cursor-pointer"
                >
                  Expand All
                </button>
                <span className="text-slate-200">|</span>
                <button
                  onClick={collapseAll}
                  className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 rounded transition-colors cursor-pointer"
                >
                  Collapse All
                </button>
              </div>
            )}

            {/* Quick Search */}
            <div className="relative w-full sm:w-60">
              <input
                type="text"
                placeholder="Search platform node..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg pl-3 pr-8 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 shadow-xs"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-900 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ─── FLOWCHART CANVAS ─── */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-10 shadow-sm overflow-x-auto">
          {viewMode === "ascii" ? (
            <div className="relative">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Full Platform Structure (Hierarchy Diagram)
                  </span>
                </div>
                <button
                  onClick={copyAscii}
                  className="px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-md hover:bg-blue-600 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  {copiedAscii ? "✓ Copied!" : "📋 Copy ASCII Diagram"}
                </button>
              </div>
              <pre className="font-mono text-xs md:text-sm text-slate-800 bg-[#f8fafc] p-6 rounded-xl border border-slate-200 leading-relaxed overflow-x-auto">
                {asciiTree}
              </pre>
            </div>
          ) : viewMode === "tree" ? (
            <div className="flex flex-col items-start min-w-[760px] pl-2">
              {/* ROOT NODE: SHESHI */}
              <div className="flex items-center gap-3">
                <div
                  onClick={() => navigate({ page: "home" })}
                  className="group relative bg-[#090e17] text-white px-6 py-3.5 rounded-xl shadow-md border-2 border-blue-500/40 hover:border-blue-500 transition-all cursor-pointer flex items-center gap-3.5 hover:scale-102"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-600/20 flex items-center justify-center font-bold text-base text-blue-400 border border-blue-500/30">
                    🌐
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold tracking-widest text-blue-400">SHESHI</span>
                      <span className="text-[10px] bg-blue-950 text-blue-300 border border-blue-800 px-2 py-0.5 rounded-full">
                        Root System Gateway
                      </span>
                    </div>
                    <div className="text-xs text-slate-300">Global Financial Operating System &amp; Intelligence Hub</div>
                  </div>
                  <div className="ml-3 text-[11px] bg-blue-600 text-white px-2.5 py-1 rounded font-medium">
                    / (Home) →
                  </div>
                </div>
              </div>

              {/* VERTICAL SPINAL TRUNK WITH BRANCH ARMS */}
              <div className="relative pl-6 sm:pl-8 ml-6 sm:ml-8 border-l-2 border-slate-300 mt-2 space-y-6">
                {pillars.map((pil) => {
                  const isCollapsed = !!collapsedBranches[pil.id];
                  const hasLeaves = !!(pil.leaves && pil.leaves.length > 0);
                  const hasProducts = !!(pil.products && pil.products.length > 0);
                  const isBranchMatch =
                    !term ||
                    pil.title.toLowerCase().includes(term) ||
                    (pil.leaves && pil.leaves.some((l) => l.label.toLowerCase().includes(term))) ||
                    (pil.products &&
                      pil.products.some(
                        (p) =>
                          p.label.toLowerCase().includes(term) ||
                          p.pages.some((pg) => pg.label.toLowerCase().includes(term))
                      ));

                  return (
                    <div key={pil.id} className="relative pt-2">
                      {/* Connector Arm */}
                      <div className="absolute -left-6 sm:-left-8 top-6 w-6 sm:w-8 h-0.5 bg-slate-300 flex items-center">
                        <div className="w-2 h-2 -ml-1 rounded-full bg-slate-900 border border-white" />
                      </div>

                      {/* Pillar Node */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all ${
                            isBranchMatch && term
                              ? "bg-white border-blue-600 ring-2 ring-blue-500/20 shadow-md"
                              : "bg-white border-slate-200 hover:border-blue-500 shadow-xs"
                          }`}
                        >
                          {(hasLeaves || hasProducts) ? (
                            <button
                              onClick={() => toggleBranch(pil.id)}
                              className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                            >
                              {isCollapsed ? "+" : "−"}
                            </button>
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-slate-400" />
                          )}

                          <span className="text-base">{pil.icon}</span>

                          <button
                            onClick={() => navigate(pil.route)}
                            className="font-bold text-sm text-slate-900 hover:text-blue-600 transition-colors cursor-pointer text-left"
                          >
                            {pil.title}
                          </button>

                          {hasLeaves && (
                            <span className="text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full font-mono">
                              {pil.leaves!.length} Pages
                            </span>
                          )}
                          {hasProducts && (
                            <span className="text-[10px] font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full font-mono">
                              4 Subsites • 25 Pages
                            </span>
                          )}

                          <button
                            onClick={() => navigate(pil.route)}
                            className="text-[11px] font-medium text-blue-600 hover:underline cursor-pointer ml-1"
                          >
                            Jump →
                          </button>
                        </div>
                      </div>

                      {/* Leaves */}
                      {!isCollapsed && hasLeaves && (
                        <div className="relative pl-6 sm:pl-8 ml-4 sm:ml-5 border-l-2 border-slate-200 mt-3 space-y-2.5">
                          {pil.leaves!.map((leaf) => {
                            const isMatch =
                              !term ||
                              leaf.label.toLowerCase().includes(term) ||
                              pil.title.toLowerCase().includes(term);

                            return (
                              <div key={leaf.id} className="relative flex items-center gap-2">
                                <div className="absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2 w-6 sm:w-8 h-0.5 bg-slate-200 flex items-center">
                                  <div className="w-1.5 h-1.5 -ml-0.5 rounded-full bg-slate-400" />
                                </div>

                                <button
                                  onClick={() => navigate(leaf.route)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer flex items-center gap-2 ${
                                    isMatch && term
                                      ? "bg-blue-600 text-white border-blue-600 shadow-xs font-semibold"
                                      : "bg-[#f8fafc] hover:bg-white text-slate-700 border-slate-200 hover:border-blue-500 hover:shadow-xs"
                                  }`}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: pil.color }} />
                                  <span>{leaf.label}</span>
                                  <span className="text-[10px] opacity-40">→</span>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* Products Ecosystem */}
                      {!isCollapsed && hasProducts && (
                        <div className="relative pl-6 sm:pl-8 ml-4 sm:ml-5 border-l-2 border-slate-200 mt-4 space-y-6">
                          {pil.products!.map((prod) => {
                            const isProdCollapsed = !!collapsedBranches[prod.id];
                            return (
                              <div key={prod.id} className="relative">
                                <div className="absolute -left-6 sm:-left-8 top-5 w-6 sm:w-8 h-0.5 bg-slate-200 flex items-center">
                                  <div className="w-2 h-2 -ml-1 rounded-full bg-teal-600" />
                                </div>

                                <div className="flex flex-wrap items-center gap-3">
                                  <div
                                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-white font-bold text-xs shadow-xs"
                                    style={{ backgroundColor: prod.color }}
                                  >
                                    <button
                                      onClick={() => toggleBranch(prod.id)}
                                      className="w-4 h-4 rounded bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-[10px] font-bold cursor-pointer"
                                    >
                                      {isProdCollapsed ? "+" : "−"}
                                    </button>
                                    <span>{prod.icon}</span>
                                    <span>{prod.label}</span>
                                  </div>

                                  <div className="hidden sm:flex items-center gap-1 text-slate-400">
                                    <div className="w-4 h-0.5 bg-slate-300" />
                                    <span className="text-xs font-bold">➔</span>
                                  </div>

                                  <button
                                    onClick={() =>
                                      navigate({
                                        page: "products",
                                        sub: prod.id,
                                        productPage: "home",
                                      })
                                    }
                                    className="bg-white border-2 border-dashed border-teal-500/40 hover:border-teal-600 text-slate-800 hover:text-teal-700 px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                                  >
                                    <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
                                    <span>Independent Product Website</span>
                                    <span className="text-[10px] bg-teal-50 text-teal-700 px-1.5 py-0.5 rounded font-mono">
                                      {prod.pages.length} Pages ↗
                                    </span>
                                  </button>
                                </div>

                                {!isProdCollapsed && (
                                  <div className="relative pl-6 sm:pl-8 ml-4 sm:ml-5 border-l-2 border-slate-200 mt-3 space-y-2">
                                    {prod.pages.map((pg) => (
                                      <div key={pg.id} className="relative flex items-center gap-2">
                                        <div className="absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2 w-6 sm:w-8 h-0.5 bg-slate-200 flex items-center">
                                          <div className="w-1.5 h-1.5 -ml-0.5 rounded-full bg-teal-600" />
                                        </div>

                                        <button
                                          onClick={() => navigate(pg.route)}
                                          className="px-3 py-1.5 rounded-lg text-xs font-medium border bg-white hover:bg-teal-50/50 text-slate-700 border-slate-200 hover:border-teal-600 transition-colors cursor-pointer flex items-center gap-2"
                                        >
                                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: prod.color }} />
                                          <span>{pg.label}</span>
                                          <span className="text-[10px] opacity-40">→</span>
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Horizontal Graph */
            <div className="min-w-[960px] py-4">
              <div className="flex items-start gap-8">
                <div className="w-52 shrink-0 pt-20">
                  <div
                    onClick={() => navigate({ page: "home" })}
                    className="bg-[#090e17] text-white p-5 rounded-xl border-2 border-blue-500 shadow-md cursor-pointer hover:scale-102 transition-transform"
                  >
                    <div className="text-[10px] font-bold tracking-widest text-blue-400 uppercase mb-1">
                      System Root
                    </div>
                    <div className="font-bold text-base flex items-center gap-2">
                      <span>🌐</span> SHESHI
                    </div>
                    <div className="text-xs text-slate-400 mt-1">/ (Home Gateway)</div>
                    <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
                      <span>72 Platform Nodes</span>
                      <span className="text-blue-400">➔</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 pt-32 flex flex-col items-center">
                  <div className="w-8 h-0.5 bg-slate-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                </div>

                <div className="flex-1 space-y-4">
                  {pillars.map((pil) => (
                    <div
                      key={pil.id}
                      className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs hover:border-blue-500 transition-colors"
                    >
                      <button
                        onClick={() => navigate(pil.route)}
                        className="w-36 shrink-0 text-left px-3 py-2 rounded-lg text-white font-bold text-xs cursor-pointer hover:opacity-90 transition-opacity flex items-center gap-1.5"
                        style={{ backgroundColor: pil.color }}
                      >
                        <span>{pil.icon}</span> {pil.title} ↗
                      </button>

                      <div className="w-4 h-0.5 bg-slate-200 shrink-0 mt-3.5" />

                      <div className="flex-1">
                        {pil.leaves && (
                          <div className="flex flex-wrap gap-1.5">
                            {pil.leaves.map((leaf) => (
                              <button
                                key={leaf.id}
                                onClick={() => navigate(leaf.route)}
                                className="px-2.5 py-1 text-xs bg-[#f8fafc] hover:bg-blue-600 hover:text-white text-slate-700 rounded-md border border-slate-200 hover:border-blue-600 transition-colors cursor-pointer"
                              >
                                {leaf.label}
                              </button>
                            ))}
                          </div>
                        )}

                        {pil.products && (
                          <div className="space-y-2 w-full">
                            {pil.products.map((prod) => (
                              <div key={prod.id} className="flex items-center gap-2 bg-[#f8fafc] p-2 rounded-lg border border-slate-200">
                                <span className="text-[11px] font-bold text-white px-2 py-0.5 rounded" style={{ backgroundColor: prod.color }}>
                                  {prod.label}
                                </span>
                                <div className="flex flex-wrap gap-1 flex-1">
                                  {prod.pages.map((pg) => (
                                    <button
                                      key={pg.id}
                                      onClick={() => navigate(pg.route)}
                                      className="px-2 py-0.5 text-[11px] bg-white hover:bg-teal-600 hover:text-white text-slate-700 rounded border border-slate-200 hover:border-teal-600 transition-colors cursor-pointer"
                                    >
                                      {pg.label}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-6 flex-wrap">
              <span className="font-semibold text-slate-900">Architecture Tiers:</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-900" /> Root Platform (L0)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-600" /> Core Pillar (L1)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-teal-600" /> Subsite Ecosystem (L2)</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-slate-400" /> Governed Node (L3)</span>
            </div>
            <span className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">
              Click any node in graph to view live route
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Homepage ─────────────────────────────────────────────────────────────────

function HomePage({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div>
      <HeroCentered navigate={navigate} />
      <LogoStrip />
      <MetricsRow count={5} />

      {/* 4 Core Products Showcase */}
      <div className="bg-white px-6 md:px-12 py-20 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionLabel text="Product Suite" />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Built for Every Point in the Financial Chain
            </h2>
            <p className="text-sm md:text-base text-slate-600 mt-3">
              Each product addresses a distinct operational context — different buyers, different problems, one unified Financial Operating System underneath.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                onClick={() => navigate({ page: "products", sub: p.id, productPage: "home" })}
                className="text-left bg-white border border-slate-200 rounded-xl p-7 hover:border-blue-500 hover:shadow-lg transition-all group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div
                    className="w-11 h-11 rounded-lg mb-5 flex items-center justify-center text-xl text-white font-bold"
                    style={{ backgroundColor: p.accent }}
                  >
                    {p.label[0]}
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1 group-hover:text-blue-600 transition-colors">
                    {p.label}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 mb-3">{p.tagline}</p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-6">{p.description}</p>
                </div>
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                  <span>Explore Product Subsite</span>
                  <span>→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* The 72-Node Interactive Platform Flowchart Site Map */}
      <SiteMapSection navigate={navigate} />

      <ZigzagSection rows={3} />
      <TestimonialBlock />
      <CaseStudyCards />
      <FAQSection />
      <CTABand navigate={navigate} />
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ navigate, currentPage }: { navigate: (r: Route) => void; currentPage: string }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center h-16 justify-between gap-2">
        <div className="flex items-center gap-8">
          <button
            onClick={() => navigate({ page: "home" })}
            className="font-bold text-xl text-slate-900 tracking-tight flex items-center gap-2 cursor-pointer"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span>SHESHI</span>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {NAV.map((item) => (
              <div
                key={item.page}
                className="relative"
                onMouseEnter={() => item.children && setOpenMenu(item.page)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  onClick={() => {
                    navigate({ page: item.page });
                    setOpenMenu(null);
                  }}
                  className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-1 ${
                    currentPage === item.page ? "text-blue-600 bg-blue-50/60" : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <span>{item.label}</span>
                  {item.children && <span className="text-[10px] opacity-40">▾</span>}
                </button>

                {item.children && openMenu === item.page && (
                  <div className="absolute top-full left-0 bg-white border border-slate-200 rounded-xl shadow-xl py-2 min-w-56 z-50">
                    {item.children.map((child) => (
                      <button
                        key={child.sub}
                        onClick={() => {
                          navigate({
                            page: item.page,
                            sub: child.sub,
                            ...(item.page === "products" ? { productPage: "home" } : {}),
                          });
                          setOpenMenu(null);
                        }}
                        className="block w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer"
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate({ page: "contact" })}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-2 cursor-pointer"
          >
            Talk to Us
          </button>
          <button
            onClick={() => navigate({ page: "contact" })}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all cursor-pointer"
          >
            Request Demo
          </button>
        </div>
      </div>
    </nav>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <footer className="bg-[#090e17] text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 font-bold text-xl mb-3 tracking-tight">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span>SHESHI</span>
          </div>
          <p className="text-slate-400 text-xs max-w-sm leading-relaxed mb-4">
            The Financial Operating System — the governed layer between your ERP and every financial output your organisation produces.
          </p>
          <p className="text-[11px] text-slate-500 font-mono">
            Close, plan, consolidate, analyse, collaborate, report.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 font-mono">Products</p>
          <ul className="space-y-2.5 text-xs text-slate-400">
            {PRODUCTS.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => navigate({ page: "products", sub: p.id, productPage: "home" })}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  {p.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 font-mono">Company</p>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><button onClick={() => navigate({ page: "company", sub: "about" })} className="hover:text-white transition-colors cursor-pointer">About Sheshi</button></li>
            <li><button onClick={() => navigate({ page: "company", sub: "story" })} className="hover:text-white transition-colors cursor-pointer">Our Story</button></li>
            <li><button onClick={() => navigate({ page: "company", sub: "leadership" })} className="hover:text-white transition-colors cursor-pointer">Leadership</button></li>
            <li><button onClick={() => navigate({ page: "company", sub: "culture" })} className="hover:text-white transition-colors cursor-pointer">People &amp; Culture</button></li>
            <li><button onClick={() => navigate({ page: "company", sub: "careers" })} className="hover:text-white transition-colors cursor-pointer">Careers</button></li>
            <li><button onClick={() => navigate({ page: "resources", sub: "events" })} className="hover:text-white transition-colors cursor-pointer">Events</button></li>
            <li><button onClick={() => navigate({ page: "contact" })} className="hover:text-white transition-colors cursor-pointer">Contact Us</button></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4 font-mono">Governance &amp; Trust</p>
          <ul className="space-y-2.5 text-xs text-slate-400">
            <li><button onClick={() => navigate({ page: "technology", sub: "trust" })} className="hover:text-white transition-colors cursor-pointer text-blue-400">Trust Center (99.99%)</button></li>
            <li><button onClick={() => navigate({ page: "technology", sub: "security" })} className="hover:text-white transition-colors cursor-pointer">Security Disclosure</button></li>
            <li><button onClick={() => navigate({ page: "legal", sub: "privacy" })} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button></li>
            <li><button onClick={() => navigate({ page: "legal", sub: "terms" })} className="hover:text-white transition-colors cursor-pointer">Terms of Service</button></li>
            <li><button onClick={() => navigate({ page: "legal", sub: "cookies" })} className="hover:text-white transition-colors cursor-pointer">Cookie Policy</button></li>
            <li><button onClick={() => navigate({ page: "legal", sub: "sitemap" })} className="hover:text-white transition-colors cursor-pointer">System Sitemap</button></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800/80 px-6 md:px-12 py-5 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>© 2026 Sheshi Technologies Inc. Built from inside finance for the world outside it.</p>
        <div className="flex gap-4">
          <span className="hover:text-white cursor-pointer">LinkedIn</span>
          <span className="hover:text-white cursor-pointer">Twitter / X</span>
          <span className="hover:text-white cursor-pointer">SOC 2 Verified</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Router & Root Component ──────────────────────────────────────────────────

function resolvePageComponent(route: Route, navigate: (r: Route) => void) {
  if (route.page === "home") return <HomePage navigate={navigate} />;
  if (route.page === "contact") return <ContactPage />;
  if (route.page === "legal") return <LegalPage doc={route.sub ?? "privacy"} />;

  if (route.page === "products" && !route.sub) {
    return (
      <div>
        <PageHero
          title="Sheshi Autonomous Product Suite"
          subtitle="One Financial Operating System underlying distinct operational contexts for enterprises, startups, and advisory firms."
          breadcrumb={["Home", "Products"]}
        />
        <div className="bg-white px-6 md:px-12 py-20 border-b border-slate-200/80">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                onClick={() => navigate({ page: "products", sub: p.id, productPage: "home" })}
                className="text-left bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-500 hover:shadow-lg transition-all group cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center text-xl text-white font-bold"
                  style={{ backgroundColor: p.accent }}
                >
                  {p.label[0]}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {p.label}
                </h3>
                <p className="text-xs font-semibold text-blue-600 mb-3">{p.tagline}</p>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{p.description}</p>
                <span className="text-xs font-semibold text-blue-600 group-hover:underline">
                  Visit autonomous product site →
                </span>
              </button>
            ))}
          </div>
        </div>
        <CTABand navigate={navigate} />
      </div>
    );
  }

  const pageData = PAGE_DATA[route.page]?.[route.sub ?? ""];
  if (pageData) {
    return (
      <div>
        {pageData.hero === "centered" ? (
          <HeroCentered eyebrow={pageData.title} title={pageData.title} subtitle={pageData.subtitle} navigate={navigate} />
        ) : (
          <HeroSplit eyebrow={pageData.title} title={pageData.title} subtitle={pageData.subtitle} navigate={navigate} />
        )}
        {pageData.sections.map((s, i) => renderSection(s, i, navigate))}
      </div>
    );
  }

  return (
    <div>
      <PageHero title={route.page.toUpperCase()} breadcrumb={["Home", route.page]} />
      <CapabilityGrid count={6} />
      <CTABand navigate={navigate} />
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState<Route>({ page: "home" });

  function navigate(r: Route) {
    setRoute(r);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function setProductPage(p: string) {
    setRoute((prev) => ({ ...prev, productPage: p }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (route.page === "products" && route.sub) {
    return (
      <ProductSubsite
        productId={route.sub}
        productPage={route.productPage ?? "home"}
        setProductPage={setProductPage}
        navigate={navigate}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <Navbar navigate={navigate} currentPage={route.page} />
      <main className="flex-1">{resolvePageComponent(route, navigate)}</main>
      <Footer navigate={navigate} />
    </div>
  );
}
