import { useState, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Route = {
  page: string;
  sub?: string;
  product?: string;
  productPage?: string;
  topic?: string;
};

// ─── Navigation Registry ──────────────────────────────────────────────────────

const NAV = [
  { label: "Home", page: "home" },
  {
    label: "Products",
    page: "products",
    children: [
      { label: "Sheshi Quanta", sub: "quanta", tagline: "Autonomous Ledger & Consolidation Engine" },
      { label: "Sheshi Catalyx", sub: "catalyx", tagline: "Startup Finance & Runway Accelerator" },
      { label: "Sheshi ConsultEase", sub: "consultease", tagline: "CPA & Advisory Multi-Client Portal" },
      { label: "Sheshi FR", sub: "sheshifr", tagline: "10-K, GAAP & Disclosure Reporting Suite" },
    ],
  },
  {
    label: "Topics & Guides",
    page: "topics",
    children: [
      { label: "Financial Consolidation Software", sub: "financial-consolidation", tagline: "Multi-entity accounting & currency netting" },
      { label: "Continuous Financial Close", sub: "continuous-close", tagline: "Shift from 15-day batch close to real-time" },
      { label: "Autonomous Account Reconciliation", sub: "account-reconciliation", tagline: "Algorithmic matching & ERP auto-sync" },
      { label: "Intercompany Accounting", sub: "intercompany-accounting", tagline: "Automated eliminations & transfer pricing" },
    ],
  },
  {
    label: "Solutions",
    page: "solutions",
    children: [
      { label: "Enterprise Finance", sub: "enterprise", tagline: "High-volume multi-entity SOX compliance" },
      { label: "Startup & Scaleup", sub: "startup", tagline: "Runway forecasting & investor board packs" },
      { label: "Consulting & CPA Firms", sub: "consulting", tagline: "Expand advisory capacity 3x without burnout" },
      { label: "Finance Professionals", sub: "professionals", tagline: "Built for Controllers, VPs & modern CFOs" },
    ],
  },
  {
    label: "Technology",
    page: "technology",
    children: [
      { label: "Financial OS Architecture", sub: "fos", tagline: "High-throughput streaming ledger engine" },
      { label: "Zero-Hallucination AI", sub: "ai", tagline: "Deterministic math ledger invariants" },
      { label: "ERP & Bank Integrations", sub: "integrations", tagline: "Bi-directional connectors for SAP, NetSuite, Workday" },
      { label: "Trust Center & Compliance", sub: "trust", tagline: "SOC 1 & 2 Type II, ISO 27001, GDPR, 99.99% SLA" },
    ],
  },
  {
    label: "Company",
    page: "company",
    children: [
      { label: "About Sheshi", sub: "about", tagline: "Built from inside finance for the world outside" },
      { label: "Our Story", sub: "story", tagline: "Founder's 20-year accounting practice narrative" },
      { label: "People - and culture", sub: "culture", tagline: "Core principles, diversity & life inside Sheshi" },
      { label: "Leadership & Advisory", sub: "leadership", tagline: "Executives and former Big 4 audit partners" },
      { label: "Careers", sub: "careers", tagline: "Open roles across engineering, product & finance" },
    ],
  },
  {
    label: "Resources",
    page: "resources",
    children: [
      { label: "Events & Summits", sub: "events", tagline: "Sheshi NEXUS 2026 & CFO masterclasses" },
      { label: "The Numbers Story (Research)", sub: "research", tagline: "Benchmark study of 4,200 CFOs & Controllers" },
      { label: "Insights & Guides", sub: "blog", tagline: "Technical accounting whitepapers & articles" },
      { label: "Case Studies", sub: "casestudies", tagline: "Quantified ROI from Fortune 500 enterprises" },
    ],
  },
  { label: "Contact", page: "contact" },
];

const PRODUCTS_LIST = [
  {
    id: "quanta",
    name: "Sheshi Quanta",
    eyebrow: "Enterprise Consolidation",
    tagline: "Autonomous General Ledger & Multi-Entity Consolidation Engine",
    description: "Eliminate manual Excel workbooks. Quanta continuously ingests millions of transactions from SAP, NetSuite, and Oracle, performing automated multi-currency conversion, intercompany netting, and rule-based eliminations in real time.",
    color: "#2563eb",
    topicSlug: "financial-consolidation",
  },
  {
    id: "catalyx",
    name: "Sheshi Catalyx",
    eyebrow: "High-Growth Ventures",
    tagline: "Startup Financial Intelligence & Continuous Runway Forecaster",
    description: "Connect Stripe, Brex, Ramp, Gusto, and QuickBooks in 5 minutes. Catalyx monitors burn rate velocity, automatically compiles monthly investor packs, and models cash scenarios so founders never face sudden runway cliffs.",
    color: "#0d9488",
    topicSlug: "continuous-close",
  },
  {
    id: "consultease",
    name: "Sheshi ConsultEase",
    eyebrow: "Advisory & CPA Practice",
    tagline: "Multi-Client Advisory Practice Portal & Workpaper Orchestration",
    description: "Standardize engagement workpapers across every client entity. ConsultEase provides senior reviewers and audit partners with a unified multi-client health dashboard, automated PBC collection, and sign-off workflows.",
    color: "#7c3aed",
    topicSlug: "account-reconciliation",
  },
  {
    id: "sheshifr",
    name: "Sheshi FR",
    eyebrow: "Statutory & SEC Reporting",
    tagline: "Autonomous Financial Statements & Regulatory Disclosure Suite",
    description: "From trial balance directly to audit-ready 10-K, 10-Q, and IFRS disclosures. Sheshi FR verifies all footnote cross-references, validates arithmetic ties, and auto-tags XBRL taxonomies with zero human copy-paste errors.",
    color: "#ea580c",
    topicSlug: "intercompany-accounting",
  },
];

// ─── Header Navigation (Luminous Light Theme) ─────────────────────────────────

function HeaderNav({
  route,
  navigate,
  onOpenDemo,
}: {
  route: Route;
  navigate: (r: Route) => void;
  onOpenDemo: () => void;
}) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => navigate({ page: "home" })}
          className="flex items-center gap-2.5 cursor-pointer group text-left"
          title="Sheshi AI - Autonomous Financial Operating System"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <span className="font-mono font-bold text-lg tracking-wider">S</span>
          </div>
          <div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
              sheshi<span className="text-blue-600">.ai</span>
            </span>
            <span className="hidden sm:block text-[10px] font-semibold text-slate-400 tracking-wider uppercase -mt-1">
              Financial OS
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {NAV.map((item) => {
            const isActive =
              route.page === item.page ||
              (item.children &&
                item.children.some((c) => route.page === item.page && route.sub === c.sub));

            if (!item.children) {
              return (
                <button
                  key={item.page}
                  onClick={() => navigate({ page: item.page })}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? "text-blue-600 bg-blue-50/80 font-semibold"
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/70"
                  }`}
                >
                  {item.label}
                </button>
              );
            }

            const isOpen = openDropdown === item.page;

            return (
              <div
                key={item.page}
                className="relative"
                onMouseEnter={() => setOpenDropdown(item.page)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  onClick={() => navigate({ page: item.page, sub: item.children[0].sub })}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1 ${
                    isActive
                      ? "text-blue-600 bg-blue-50/80 font-semibold"
                      : "text-slate-600 hover:text-slate-950 hover:bg-slate-100/70"
                  }`}
                >
                  <span>{item.label}</span>
                  <svg
                    className={`w-3.5 h-3.5 transition-transform text-slate-400 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="absolute top-full left-0 mt-1 w-80 bg-white border border-slate-200/90 rounded-2xl shadow-xl shadow-slate-900/10 p-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                    <div className="space-y-1">
                      {item.children.map((child) => (
                        <button
                          key={child.sub}
                          onClick={() => {
                            setOpenDropdown(null);
                            navigate({ page: item.page, sub: child.sub });
                          }}
                          className="w-full text-left p-2.5 rounded-xl hover:bg-blue-50/70 transition-colors cursor-pointer group flex flex-col"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {child.label}
                            </span>
                            <span className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold">
                              →
                            </span>
                          </div>
                          {child.tagline && (
                            <span className="text-xs text-slate-500 mt-0.5 line-clamp-1 leading-normal">
                              {child.tagline}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Right CTAs */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              const el = document.getElementById("sitemap-section");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              } else {
                navigate({ page: "home" });
                setTimeout(() => {
                  document.getElementById("sitemap-section")?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }
            }}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            title="View complete 72-node architectural sitemap"
          >
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Site Map (72 Nodes)</span>
          </button>

          <button
            onClick={() => navigate({ page: "technology", sub: "trust" })}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 rounded-lg hover:bg-emerald-100/70 transition-colors cursor-pointer"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>99.99% Uptime / SOC 2</span>
          </button>

          <button
            onClick={onOpenDemo}
            className="px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm shadow-blue-500/20 hover:shadow-md hover:shadow-blue-500/30 transition-all cursor-pointer"
          >
            Request Enterprise Pilot
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-6 space-y-4 max-h-[85vh] overflow-y-auto">
          <div className="grid grid-cols-2 gap-2 pb-4 border-b border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate({ page: "home" });
              }}
              className="p-2.5 text-left text-sm font-semibold rounded-lg bg-blue-50 text-blue-700"
            >
              Home
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate({ page: "technology", sub: "trust" });
              }}
              className="p-2.5 text-left text-sm font-semibold rounded-lg bg-slate-50 text-slate-800"
            >
              Trust Center
            </button>
          </div>

          <div className="space-y-4">
            {NAV.filter((n) => n.children).map((section) => (
              <div key={section.page} className="space-y-1.5">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">
                  {section.label}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                  {section.children?.map((child) => (
                    <button
                      key={child.sub}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        navigate({ page: section.page, sub: child.sub });
                      }}
                      className="text-left p-2 rounded-lg text-sm text-slate-700 hover:bg-slate-100 font-medium"
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Educational Topic Internal Link Ribbon ───────────────────────────────────

function TopicInternalRibbon({
  currentTopic,
  navigate,
}: {
  currentTopic?: string;
  navigate: (r: Route) => void;
}) {
  const topics = [
    { id: "financial-consolidation", title: "Financial Consolidation", target: { page: "topics", sub: "financial-consolidation" } },
    { id: "continuous-close", title: "Continuous Financial Close", target: { page: "topics", sub: "continuous-close" } },
    { id: "account-reconciliation", title: "Autonomous Reconciliation", target: { page: "topics", sub: "account-reconciliation" } },
    { id: "intercompany-accounting", title: "Intercompany Netting", target: { page: "topics", sub: "intercompany-accounting" } },
    { id: "trust", title: "Security & SOC 2 Center", target: { page: "technology", sub: "trust" } },
  ];

  return (
    <div className="bg-blue-50/60 border-y border-blue-100/80 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2 text-slate-500 font-medium">
          <span className="font-semibold text-blue-800">Knowledge & Topics:</span>
          <span>Explore related accounting frameworks:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {topics.map((t) => (
            <button
              key={t.id}
              onClick={() => navigate(t.target)}
              className={`px-2.5 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                currentTopic === t.id
                  ? "bg-blue-600 text-white font-semibold"
                  : "bg-white text-slate-700 border border-slate-200/80 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {t.title} →
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Shared Luminous Page Hero ────────────────────────────────────────────────

function LightPageHero({
  eyebrow,
  title,
  subtitle,
  breadcrumb,
  primaryAction,
  secondaryAction,
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  breadcrumb?: string[];
  primaryAction?: { label: string; onClick: () => void };
  secondaryAction?: { label: string; onClick: () => void };
}) {
  return (
    <section className="bg-gradient-to-b from-white via-blue-50/20 to-slate-50 border-b border-slate-200/80 pt-12 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs text-slate-400 mb-4 font-medium">
            {breadcrumb.map((b, i) => (
              <span key={i} className="flex items-center gap-2">
                <span className={i === breadcrumb.length - 1 ? "text-slate-800 font-semibold" : ""}>{b}</span>
                {i < breadcrumb.length - 1 && <span>/</span>}
              </span>
            ))}
          </nav>
        )}

        {eyebrow && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span>{eyebrow}</span>
          </div>
        )}

        {/* Proper H1 for search engines and accessibility */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-5 leading-tight">
          {title}
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
          {subtitle}
        </p>

        {(primaryAction || secondaryAction) && (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {primaryAction && (
              <button
                onClick={primaryAction.onClick}
                className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-500/20 hover:shadow-md transition-all cursor-pointer"
              >
                {primaryAction.label}
              </button>
            )}
            {secondaryAction && (
              <button
                onClick={secondaryAction.onClick}
                className="px-6 py-3 rounded-xl font-bold text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 hover:border-slate-300 shadow-xs transition-all cursor-pointer"
              >
                {secondaryAction.label}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Single Dark Contrast Slot: Global Impact Metrics Band ────────────────────

function DarkImpactSlot() {
  const stats = [
    { value: "99.4%", label: "Autonomous Reconciliation Match Rate", desc: "Across multi-currency bank feeds and subledgers" },
    { value: "14 Days → 4h", label: "Month-End Close Compression", desc: "From chaotic spreadsheet sprints to continuous zero-day close" },
    { value: "0", label: "SOX 404 Audit Deficiencies", desc: "Every balance change secured with cryptographic invariant proofs" },
    { value: "$2.4M", label: "Average Enterprise Annual Savings", desc: "Saved in outsourced manual audit fees and reconciler fatigue" },
  ];

  return (
    <section className="bg-[#0b132b] text-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-mono tracking-widest text-blue-400 uppercase font-semibold mb-2">
            Verified Enterprise Proof
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Transforming Finance from Cost Center to Governed Autonomous Engine
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl relative overflow-hidden"
            >
              <div className="text-3xl sm:text-4xl font-extrabold text-blue-400 mb-2 font-mono">
                {s.value}
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">{s.label}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ERP Integrations Ribbon ──────────────────────────────────────────────────

function ERPIntegrationRibbon() {
  const erps = [
    { name: "SAP S/4HANA", category: "Tier-1 Enterprise ERP", status: "Bi-directional certified connector" },
    { name: "Oracle NetSuite", category: "Global Cloud ERP", status: "Real-time SuiteTalk REST sync" },
    { name: "Workday Financials", category: "Core HCM & Finance", status: "Automated journal ingestion" },
    { name: "Microsoft Dynamics 365", category: "Enterprise Accounting", status: "OData v4 continuous feed" },
    { name: "QuickBooks Online", category: "Growth Ledger", status: "Automated bank reconciliation" },
    { name: "Salesforce Revenue Cloud", category: "Billing & CPQ", status: "ASC 606 revenue schedule tie" },
  ];

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-bold tracking-widest text-blue-600 uppercase mb-1">
            Seamless ERP Ingestion Ecosystem
          </p>
          <p className="text-sm text-slate-500">
            Your ERP records transactions. Sheshi governs everything after with native bi-directional sync.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {erps.map((erp, i) => (
            <div
              key={i}
              className="bg-slate-50/80 hover:bg-blue-50/40 border border-slate-200/80 hover:border-blue-300 p-4 rounded-xl text-center transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100/80 text-blue-700 flex items-center justify-center font-bold text-xs mx-auto mb-2 group-hover:scale-110 transition-transform">
                {erp.name.charAt(0)}
              </div>
              <p className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                {erp.name}
              </p>
              <p className="text-[10px] text-slate-400 mt-0.5">{erp.category}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Interactive Financial Ledger Simulator (Light Theme) ─────────────────────

function InteractiveFinancialLedgerSimulator() {
  const [activeTab, setActiveTab] = useState<"ledger" | "reconcile" | "anomalies" | "audit">("ledger");
  const [reconcileStatus, setReconcileStatus] = useState<"idle" | "running" | "matched">("idle");

  const ledgerData = [
    { code: "1010-00", name: "Operating Cash (JPMorgan USD)", debit: "$24,510,892.40", credit: "-", source: "JPM Direct API", status: "Live Feed", flag: "Verified" },
    { code: "1200-10", name: "Accounts Receivable - Enterprise", debit: "$8,940,210.00", credit: "-", source: "Stripe Billing", status: "Continuous", flag: "Verified" },
    { code: "2150-00", name: "Intercompany Netting (US -> EMEA)", debit: "-", credit: "$3,410,200.00", source: "SAP NetSuite Bridge", status: "Auto-Matched", flag: "Net zero" },
    { code: "2400-00", name: "Deferred Revenue (ASC 606)", debit: "-", credit: "$18,200,450.00", source: "Salesforce RevCloud", status: "Schedule Tied", flag: "Verified" },
    { code: "6010-20", name: "Cloud Infrastructure Accruals (AWS)", debit: "$420,110.00", credit: "-", source: "AWS Cost Explorer", status: "Variance OK", flag: "Within 0.5%" },
  ];

  const handleRunReconcile = () => {
    setReconcileStatus("running");
    setTimeout(() => {
      setReconcileStatus("matched");
    }, 900);
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl shadow-lg shadow-slate-900/5 overflow-hidden">
      {/* Cockpit Window Header */}
      <div className="bg-slate-50 border-b border-slate-200/80 px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-400" />
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
          <div className="h-4 w-px bg-slate-300" />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-semibold text-slate-800">
              SHESHI CONTINUOUS CLOSE COCKPIT
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              (Live Multi-Entity Ledger v4.2)
            </span>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex gap-1 bg-slate-200/60 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab("ledger")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === "ledger" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Governed Ledger
          </button>
          <button
            onClick={() => setActiveTab("reconcile")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === "reconcile" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Auto-Matching (Live)
          </button>
          <button
            onClick={() => setActiveTab("anomalies")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === "anomalies" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            AI Anomaly Guard
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              activeTab === "audit" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            SOX Audit Vault
          </button>
        </div>
      </div>

      {/* Cockpit Body */}
      <div className="p-5">
        {activeTab === "ledger" && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 text-xs bg-blue-50/60 border border-blue-100 p-3 rounded-xl text-blue-900">
              <div className="flex items-center gap-2">
                <span className="font-bold">Continuous Ledger Balance:</span>
                <span className="font-mono font-semibold">$33,871,212.40 USD</span>
                <span className="text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded text-[11px] font-bold">
                  ✓ Debits == Credits (Mathematical Invariant Held)
                </span>
              </div>
              <div className="text-slate-500 text-[11px]">
                Last Ingested: 2 seconds ago from SAP S/4HANA Production
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                    <th className="pb-2.5">Account</th>
                    <th className="pb-2.5">Description</th>
                    <th className="pb-2.5 text-right">Debit Balance</th>
                    <th className="pb-2.5 text-right">Credit Balance</th>
                    <th className="pb-2.5">Connector</th>
                    <th className="pb-2.5">Verification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                  {ledgerData.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-2.5 font-bold text-blue-700">{row.code}</td>
                      <td className="py-2.5 font-sans font-medium text-slate-800">{row.name}</td>
                      <td className="py-2.5 text-right text-slate-900">{row.debit}</td>
                      <td className="py-2.5 text-right text-slate-900">{row.credit}</td>
                      <td className="py-2.5 font-sans text-slate-500">{row.source}</td>
                      <td className="py-2.5 font-sans">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          {row.flag}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "reconcile" && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Autonomous Multi-Way Transaction Matching
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Matching 14,892 bank statement rows against General Ledger journals and invoice subledgers.
                </p>
              </div>

              <button
                onClick={handleRunReconcile}
                disabled={reconcileStatus === "running"}
                className="px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer shadow-xs disabled:opacity-50"
              >
                {reconcileStatus === "running"
                  ? "Running 1:1 & Many:1 Rules Engine..."
                  : reconcileStatus === "matched"
                  ? "✓ 14,892 Transactions Matched (100%)"
                  : "Execute Autonomous Matching Test"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-blue-200 bg-blue-50/50">
                <span className="text-slate-500 text-[11px] font-semibold block">Auto-Match Velocity</span>
                <span className="text-xl font-bold font-mono text-blue-700">18,500 tx/sec</span>
                <span className="text-[11px] text-blue-600 block mt-1">Rule Engine + Fuzzy AI Text</span>
              </div>
              <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/50">
                <span className="text-slate-500 text-[11px] font-semibold block">Unreconciled Variances</span>
                <span className="text-xl font-bold font-mono text-emerald-700">$0.00</span>
                <span className="text-[11px] text-emerald-600 block mt-1">Zero pending exception items</span>
              </div>
              <div className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/50">
                <span className="text-slate-500 text-[11px] font-semibold block">FX & Currency Netting</span>
                <span className="text-xl font-bold font-mono text-purple-700">12 Currencies</span>
                <span className="text-[11px] text-purple-600 block mt-1">ECB Daily Spot Rate applied</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "anomalies" && (
          <div className="space-y-3">
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2.5">
              <span className="text-base">⚠️</span>
              <div>
                <span className="font-bold">Real-time Anomaly Prevented:</span>
                <p className="text-slate-700 text-xs mt-0.5">
                  Vendor invoice <code>#INV-2026-8812</code> from ACME Corp was submitted with a duplicate bank wire reference. Sheshi flagged the transaction prior to ERP journal posting, preventing a $48,200 redundant payment.
                </p>
              </div>
            </div>

            <div className="p-4 border border-slate-200 rounded-xl text-xs space-y-2">
              <span className="font-bold text-slate-900 block">Anomaly Detection Model Invariants:</span>
              <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                <li>Double payment detection across disparate subledgers and subsidiary entities.</li>
                <li>Off-balance sheet accrual deviation warnings based on historical 36-month run rates.</li>
                <li>Unusual weekend or off-hour manual journal entry alerts directly to the Corporate Controller.</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === "audit" && (
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3 bg-slate-900 text-slate-200 rounded-xl space-y-1.5 text-[11px]">
              <div className="text-blue-400 font-bold">IMMUTABLE CRYPTOGRAPHIC AUDIT LOG ENTRY #98421</div>
              <div>TIMESTAMP: 2026-09-21T11:42:09.112Z [UTC]</div>
              <div>EVENT: Automatic Intercompany Balance Settlement (Entity 100 US &rarr; Entity 200 UK)</div>
              <div>HASH: 0x9f4a8b23c10d7e62a39f110bc892305a417df0e129ba</div>
              <div>SOX 404 CONTROL: PCOAB-AC-14 Verified (Zero manual override permitted)</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Products Showcase Section (Home) ─────────────────────────────────────────

function ProductsShowcaseSection({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4">
            Platform Product Suites
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Dedicated Solutions Engineered for Modern Accounting Teams
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Every product in the Sheshi ecosystem addresses a specific failure point in the traditional financial close lifecycle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRODUCTS_LIST.map((prod) => (
            <div
              key={prod.id}
              className="bg-white border border-slate-200/90 hover:border-blue-300 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
                    style={{
                      color: prod.color,
                      borderColor: prod.color + "40",
                      backgroundColor: prod.color + "0f",
                    }}
                  >
                    {prod.eyebrow}
                  </span>
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    Standalone or Unified OS
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
                  {prod.name}
                </h3>

                <p className="text-sm font-semibold text-slate-700 mb-3">
                  {prod.tagline}
                </p>

                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
                  {prod.description}
                </p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => navigate({ page: "products", sub: prod.id })}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                >
                  <span>Explore {prod.name} Features</span>
                  <span>→</span>
                </button>

                <button
                  onClick={() => navigate({ page: "topics", sub: prod.topicSlug })}
                  className="text-[11px] font-semibold text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  Read Topic Guide & FAQs ↗
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Research & The Numbers Story Callout ──────────────────────────────────────

function NumbersStoryCallout({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-blue-50/80 via-white to-slate-50 border border-blue-200/80 rounded-3xl p-8 sm:p-12 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
              Flagship Industry Benchmark Report
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              The Numbers Story: Inside the 2026 State of Financial Close
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We surveyed 4,200 CFOs, Corporate Controllers, and audit leaders across North America and Europe. 87% reported that spreadsheet errors were discovered in quarterly close packages after partner sign-off. Learn how autonomous continuous close eliminates this risk.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => navigate({ page: "resources", sub: "research" })}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Read Complete Research Report (48 Pages)
              </button>
              <button
                onClick={() => navigate({ page: "resources", sub: "events" })}
                className="px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Attend the Executive Webinar
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
              <span className="text-2xl font-extrabold text-blue-600 font-mono">87%</span>
              <p className="text-xs font-bold text-slate-800 mt-1">Spreadsheet Error Exposure</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Found in certified reporting</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
              <span className="text-2xl font-extrabold text-blue-600 font-mono">68%</span>
              <p className="text-xs font-bold text-slate-800 mt-1">Overtime & Burnout</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Accounting team fatigue</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
              <span className="text-2xl font-extrabold text-blue-600 font-mono">11.8 Days</span>
              <p className="text-xs font-bold text-slate-800 mt-1">Average Close Length</p>
              <p className="text-[11px] text-slate-500 mt-0.5">In traditional manual ERPs</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
              <span className="text-2xl font-extrabold text-emerald-600 font-mono">4 Hours</span>
              <p className="text-xs font-bold text-slate-800 mt-1">Sheshi Continuous Close</p>
              <p className="text-[11px] text-emerald-600 mt-0.5">Autonomous resolution</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── BESPOKE PRODUCT VIEW: Sheshi Quanta ───────────────────────────────────────

function QuantaProductView({
  navigate,
  onOpenDemo,
}: {
  navigate: (r: Route) => void;
  onOpenDemo: () => void;
}) {
  const [ruleTolerance, setRuleTolerance] = useState("0.00");
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleTestMatch = () => {
    setTestResult("processing");
    setTimeout(() => {
      setTestResult("success");
    }, 700);
  };

  return (
    <div className="space-y-16">
      <LightPageHero
        breadcrumb={["Home", "Products", "Sheshi Quanta"]}
        eyebrow="Autonomous General Ledger Ingestion & Consolidation"
        title="Financial Consolidation Software | Sheshi Quanta"
        subtitle="Unify disparate global subsidiaries, foreign currencies, and ERP chart-of-accounts into a continuous, audit-ready consolidated general ledger with zero manual spreadsheet intervention."
        primaryAction={{ label: "Request Quanta Enterprise Architecture Demo", onClick: onOpenDemo }}
        secondaryAction={{ label: "Read Multi-Entity Consolidation Guide", onClick: () => navigate({ page: "topics", sub: "financial-consolidation" }) }}
      />

      <TopicInternalRibbon currentTopic="financial-consolidation" navigate={navigate} />

      {/* Educational Concept Section: Explain Before Selling */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold uppercase text-blue-600 tracking-wider">Accounting Concept Defined</span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">What is Autonomous Financial Consolidation?</h2>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            Financial consolidation is the process of aggregating financial data from multiple subsidiaries, business units, and foreign entities into a single, unified set of financial statements. In multinational corporations, this requires converting diverse local currencies into the parent reporting currency (using historical, average, and spot rates under ASC 830 / IAS 21), eliminating intercompany transactions to prevent double-counting, and adjusting for minority interests.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl">
              <h3 className="text-sm font-bold text-slate-900 mb-1">Why Multi-Entity Consolidation Fails in Excel</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Most companies rely on multi-tab Excel workbooks that require manual copy-pasting of trial balances. A single broken VLOOKUP or outdated foreign exchange rate cascades silent balance discrepancies across intercompany loans and deferred revenue schedules.
              </p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <h3 className="text-sm font-bold text-blue-900 mb-1">How Sheshi Quanta Automates the Process</h3>
              <p className="text-xs text-blue-800 leading-relaxed">
                Quanta operates as a streaming mathematical engine. As transactions clear local ERPs in Tokyo, London, or New York, Quanta applies deterministic netting rules, generates balancing eliminating entries, and locks the audit evidence in real time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tool: Transaction Matching Rule Builder */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-blue-600 uppercase">Live Feature Interactive Demo</span>
              <h3 className="text-xl font-bold text-slate-900">Quanta Autonomous Rule Engine Simulator</h3>
            </div>
            <span className="text-xs text-slate-400">Simulate rule execution against 5,000 subledger lines</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Match Strategy</label>
              <select className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800">
                <option>Multi-Currency Intercompany Netting (USD / EUR / GBP)</option>
                <option>1:Many Batch Bank Feed to Customer Invoices</option>
                <option>Fuzzy Semantic Vendor Reconciliation</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Variance Threshold (Penny Tolerance)</label>
              <select
                value={ruleTolerance}
                onChange={(e) => setRuleTolerance(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 font-medium text-slate-800"
              >
                <option value="0.00">$0.00 (Zero Tolerance - Exact Dollar Math)</option>
                <option value="0.05">$0.05 (Minor FX Penny Rounding)</option>
                <option value="1.00">$1.00 (Bank Wire Fee Discrepancy Margin)</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleTestMatch}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors cursor-pointer text-xs"
              >
                {testResult === "processing" ? "Executing Match Algorithms..." : "Run Test Match Rules"}
              </button>
            </div>
          </div>

          {testResult && (
            <div className={`p-4 rounded-xl border text-xs font-mono ${
              testResult === "success" ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-blue-50 border-blue-200 text-blue-900"
            }`}>
              {testResult === "processing" && <span>[11:52:01 UTC] Ingesting 5,000 journal lines across NetSuite Entity 001 and SAP Entity 004...</span>}
              {testResult === "success" && (
                <div className="space-y-1">
                  <div className="font-bold">✓ 5,000 of 5,000 Transactions Matched (100% Precision)</div>
                  <div>FX Revaluation applied via ECB spot exchange rates. Tolerance delta held under ${ruleTolerance}.</div>
                  <div>Auto-generated 42 intercompany elimination journals ready for General Ledger consolidation.</div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Comparison Matrix: Manual Excel vs Traditional ERP vs Sheshi Quanta */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
          Architectural Comparison: How Quanta Outperforms Point Solutions
        </h3>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Capability</th>
                <th className="p-4 text-slate-400">Manual Spreadsheets</th>
                <th className="p-4 text-slate-400">Legacy ERP Add-ons</th>
                <th className="p-4 text-blue-600 bg-blue-50/50">Sheshi Quanta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="p-4 font-bold text-slate-900">Ingestion Frequency</td>
                <td className="p-4 text-slate-500">Monthly batch copy-paste</td>
                <td className="p-4 text-slate-500">Nightly scheduled batch</td>
                <td className="p-4 font-bold text-blue-700 bg-blue-50/30">Continuous real-time stream</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-900">Multi-Currency ASC 830 Conversion</td>
                <td className="p-4 text-slate-500">Manual formula updates</td>
                <td className="p-4 text-slate-500">Static month-end exchange table</td>
                <td className="p-4 font-bold text-blue-700 bg-blue-50/30">Automated daily spot & average reval</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-900">Intercompany Eliminations</td>
                <td className="p-4 text-slate-500">High error email coordination</td>
                <td className="p-4 text-slate-500">Semi-manual matching rules</td>
                <td className="p-4 font-bold text-blue-700 bg-blue-50/30">Autonomous self-balancing elimination</td>
              </tr>
              <tr>
                <td className="p-4 font-bold text-slate-900">SOX 404 Audit Evidence</td>
                <td className="p-4 text-slate-500">Screenshots & folder archives</td>
                <td className="p-4 text-slate-500">Basic database change logs</td>
                <td className="p-4 font-bold text-blue-700 bg-blue-50/30">Cryptographic immutable audit trail</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* High-Impact Pre-Footer CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-3xl p-8 sm:p-12 text-center shadow-lg shadow-blue-500/10">
          <h3 className="text-2xl sm:text-3xl font-bold mb-3">Ready to eliminate your month-end consolidation scramble?</h3>
          <p className="text-sm text-blue-100 max-w-2xl mx-auto mb-6">
            Join Fortune 500 controllers who closed their books 75% faster last quarter with zero SOX audit findings.
          </p>
          <button
            onClick={onOpenDemo}
            className="px-6 py-3 bg-white hover:bg-slate-100 text-blue-900 font-bold rounded-xl text-sm transition-colors cursor-pointer"
          >
            Schedule Quanta Live Pilot Demo
          </button>
        </div>
      </section>
    </div>
  );
}

// ─── BESPOKE PRODUCT VIEW: Sheshi Catalyx ──────────────────────────────────────

function CatalyxProductView({
  navigate,
  onOpenDemo,
}: {
  navigate: (r: Route) => void;
  onOpenDemo: () => void;
}) {
  const [monthlyBurn, setMonthlyBurn] = useState(120000);
  const [cashBalance, setCashBalance] = useState(2400000);

  const rawRunwayMonths = (cashBalance / monthlyBurn).toFixed(1);
  const catalyxOptimizedMonths = ((cashBalance * 1.18) / (monthlyBurn * 0.92)).toFixed(1);

  return (
    <div className="space-y-16">
      <LightPageHero
        breadcrumb={["Home", "Products", "Sheshi Catalyx"]}
        eyebrow="Startup Finance & Runway Accelerator"
        title="Startup Financial Intelligence & Runway Forecaster | Sheshi Catalyx"
        subtitle="Plug in Stripe, Brex, Ramp, and QuickBooks in 5 minutes. Real-time cash runway modeling, automated investor reporting, and continuous burn surveillance for founders and startup VPs of Finance."
        primaryAction={{ label: "Start Free Startup Pilot", onClick: onOpenDemo }}
        secondaryAction={{ label: "Explore Continuous Close Guide", onClick: () => navigate({ page: "topics", sub: "continuous-close" }) }}
      />

      <TopicInternalRibbon currentTopic="continuous-close" navigate={navigate} />

      {/* Interactive Tool: Runway & Cash Burn Simulator */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-mono font-bold text-teal-600 uppercase">Interactive Financial Calculator</span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">Real-Time Startup Cash Runway Forecaster</h3>
            <p className="text-xs text-slate-500">
              Drag the sliders below to calculate your true cash out date and see how automated reconciliation extends your runway.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Current Cash Balance</span>
                  <span className="font-mono text-teal-700">${cashBalance.toLocaleString()} USD</span>
                </div>
                <input
                  type="range"
                  min="200000"
                  max="10000000"
                  step="100000"
                  value={cashBalance}
                  onChange={(e) => setCashBalance(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                  <span>Net Monthly Cash Burn</span>
                  <span className="font-mono text-rose-600">${monthlyBurn.toLocaleString()} / mo</span>
                </div>
                <input
                  type="range"
                  min="20000"
                  max="500000"
                  step="10000"
                  value={monthlyBurn}
                  onChange={(e) => setMonthlyBurn(Number(e.target.value))}
                  className="w-full accent-teal-600 cursor-pointer"
                />
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
                <span className="font-bold text-slate-800 block">Catalyx Auto-Optimization Benefits:</span>
                <div>• Recovers uncollected failed subscription charges via automated dunning.</div>
                <div>• Eliminates duplicate SaaS vendor seats and off-contract card spend.</div>
                <div>• Auto-compiles monthly investor updates with zero manual slide deck drafting.</div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase text-teal-800 tracking-wider">Projected Cash Horizon</span>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-extrabold text-teal-900 font-mono">
                    {catalyxOptimizedMonths}
                  </span>
                  <span className="text-sm font-bold text-teal-700">Months with Catalyx</span>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  vs <strong className="text-slate-800">{rawRunwayMonths} months</strong> under unmonitored manual spreadsheets (+{(Number(catalyxOptimizedMonths) - Number(rawRunwayMonths)).toFixed(1)} months buffer gained).
                </p>
              </div>

              <div className="pt-6 border-t border-teal-200/80">
                <button
                  onClick={onOpenDemo}
                  className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer shadow-xs"
                >
                  Connect Startup Financial Stack (5 Min Setup)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plug-and-Play Connectors Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
          Instant Zero-Code Connectors for Modern Tech Companies
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { name: "Stripe", desc: "Automated MRR, ARR, and gross-to-net fee reconciliation", tag: "Revenue" },
            { name: "Brex & Ramp", desc: "Real-time card receipt capture and memo category tagging", tag: "Corporate Cards" },
            { name: "Gusto & Rippling", desc: "Payroll tax journal entries and departmental allocation", tag: "Payroll" },
            { name: "Mercury & SVB", desc: "Direct open banking feed with penny-accurate balance sync", tag: "Banking" },
          ].map((c, i) => (
            <div key={i} className="bg-white border border-slate-200 p-5 rounded-xl hover:border-teal-300 transition-colors">
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded">
                {c.tag}
              </span>
              <h4 className="text-base font-bold text-slate-900 mt-2 mb-1">{c.name}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── BESPOKE PRODUCT VIEW: Sheshi ConsultEase ─────────────────────────────────

function ConsultEaseProductView({
  navigate,
  onOpenDemo,
}: {
  navigate: (r: Route) => void;
  onOpenDemo: () => void;
}) {
  const clients = [
    { name: "Apex Logistics Corp", status: "Close Complete", score: "99.4%", pending: 0, deadline: "Oct 15 (Q3)" },
    { name: "CloudScale AI Inc", status: "Senior Review", score: "96.1%", pending: 3, deadline: "Oct 15 (Q3)" },
    { name: "Zenith Medical Care", status: "PBC Collection", score: "88.2%", pending: 11, deadline: "Oct 20 (Q3)" },
    { name: "Solaria Clean Energy", status: "In Progress", score: "92.0%", pending: 6, deadline: "Oct 25 (Q3)" },
  ];

  return (
    <div className="space-y-16">
      <LightPageHero
        breadcrumb={["Home", "Products", "Sheshi ConsultEase"]}
        eyebrow="CPA & Accounting Advisory Multi-Client Management"
        title="Advisory Practice Multi-Client Portal | Sheshi ConsultEase"
        subtitle="Equip your accounting firm or outsourced CFO advisory to manage 3x more client engagements per partner without burnout. Standardized workpapers, automated PBC chasing, and partner sign-off orchestration."
        primaryAction={{ label: "Request Accounting Firm Demo", onClick: onOpenDemo }}
        secondaryAction={{ label: "Read Reconciliation Architecture", onClick: () => navigate({ page: "topics", sub: "account-reconciliation" }) }}
      />

      <TopicInternalRibbon currentTopic="account-reconciliation" navigate={navigate} />

      {/* Multi-Client Health Cockpit */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-purple-600 uppercase">Interactive Advisory Cockpit</span>
              <h3 className="text-xl font-bold text-slate-900">Multi-Client Portfolio Oversight Dashboard</h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">Managing 48 Client Entities</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="p-3">Client Entity</th>
                  <th className="p-3">Workflow State</th>
                  <th className="p-3">Reconciliation Health</th>
                  <th className="p-3">Pending Items</th>
                  <th className="p-3">Filing Deadline</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {clients.map((c, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3 font-bold text-slate-900">{c.name}</td>
                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-emerald-600">{c.score}</td>
                    <td className="p-3 font-mono">{c.pending} items</td>
                    <td className="p-3 text-slate-500">{c.deadline}</td>
                    <td className="p-3 text-right">
                      <button
                        onClick={onOpenDemo}
                        className="px-2.5 py-1 text-xs text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
                      >
                        Review Workpapers →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4-Stage Workpaper Review Stepper */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
          Standardized 4-Stage Workpaper Lifecycle
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {[
            { step: "01", title: "Automated Ingestion", desc: "Bank feeds, Stripe charges, and payroll summaries ingest continuously into client workpapers." },
            { step: "02", title: "Preparer Review", desc: "Staff accountant reviews auto-matched variances and flags complex accruals." },
            { step: "03", title: "Partner Sign-Off", desc: "Audit partner inspects immutable variance notes with 1-click cryptographic stamp." },
            { step: "04", title: "Client Delivery", desc: "Board-ready PDF and live interactive portal unlocked for executive stakeholders." },
          ].map((s, i) => (
            <div key={i} className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs">
              <span className="text-xl font-black text-purple-600 font-mono">{s.step}</span>
              <h4 className="text-sm font-bold text-slate-900 mt-2 mb-1">{s.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── BESPOKE PRODUCT VIEW: Sheshi FR ──────────────────────────────────────────

function SheshiFrProductView({
  navigate,
  onOpenDemo,
}: {
  navigate: (r: Route) => void;
  onOpenDemo: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"bs" | "is" | "xbrl">("bs");

  return (
    <div className="space-y-16">
      <LightPageHero
        breadcrumb={["Home", "Products", "Sheshi FR"]}
        eyebrow="Financial Reporting & Regulatory Disclosure"
        title="Autonomous Financial Statements & SEC Disclosure Suite | Sheshi FR"
        subtitle="Bridge the gap between verified trial balances and certified statutory reports. Sheshi FR verifies all footnote arithmetic, validates GAAP/IFRS disclosures, and auto-tags XBRL taxonomies with 100% mathematical integrity."
        primaryAction={{ label: "Request Reporting Suite Demo", onClick: onOpenDemo }}
        secondaryAction={{ label: "Read Intercompany Accounting Guide", onClick: () => navigate({ page: "topics", sub: "intercompany-accounting" }) }}
      />

      <TopicInternalRibbon currentTopic="intercompany-accounting" navigate={navigate} />

      {/* Interactive Financial Disclosure Viewer */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-slate-50 border-b border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-orange-600 uppercase">Live Disclosure Inspector</span>
              <span className="text-xs text-slate-500 font-medium">| Form 10-Q Preview (Audited)</span>
            </div>
            <div className="flex gap-1 bg-slate-200/60 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("bs")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === "bs" ? "bg-white text-orange-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Balance Sheet
              </button>
              <button
                onClick={() => setActiveTab("is")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === "is" ? "bg-white text-orange-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Income Statement
              </button>
              <button
                onClick={() => setActiveTab("xbrl")}
                className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === "xbrl" ? "bg-white text-orange-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                XBRL Taxonomy Tagging
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === "bs" && (
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between font-bold text-slate-900 border-b border-slate-200 pb-2">
                  <span>CONSOLIDATED BALANCE SHEETS (in thousands USD)</span>
                  <span>June 30, 2026 (Unaudited)</span>
                </div>
                <div className="flex justify-between text-slate-700 py-1 border-b border-slate-100">
                  <span>Cash and cash equivalents (Note 3)</span>
                  <span className="font-bold text-slate-900">$142,508</span>
                </div>
                <div className="flex justify-between text-slate-700 py-1 border-b border-slate-100">
                  <span>Accounts receivable, net of allowances</span>
                  <span className="font-bold text-slate-900">$68,912</span>
                </div>
                <div className="flex justify-between text-slate-700 py-1 border-b border-slate-100">
                  <span>Prepaid expenses and other current assets</span>
                  <span className="font-bold text-slate-900">$14,204</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 bg-orange-50/60 p-2 rounded text-xs">
                  <span>TOTAL CURRENT ASSETS</span>
                  <span className="text-orange-700">$225,624</span>
                </div>
                <div className="text-[11px] text-emerald-700 font-sans font-semibold pt-1">
                  ✓ Arithmetic invariant passed: Footnote 3 cash total matches line item exactly ($142,508k). Zero tie-out variance.
                </div>
              </div>
            )}

            {activeTab === "is" && (
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between font-bold text-slate-900 border-b border-slate-200 pb-2">
                  <span>CONSOLIDATED STATEMENTS OF OPERATIONS</span>
                  <span>Three Months Ended June 30</span>
                </div>
                <div className="flex justify-between text-slate-700 py-1 border-b border-slate-100">
                  <span>Subscription Revenue (ASC 606)</span>
                  <span className="font-bold text-slate-900">$48,910</span>
                </div>
                <div className="flex justify-between text-slate-700 py-1 border-b border-slate-100">
                  <span>Professional Services Revenue</span>
                  <span className="font-bold text-slate-900">$4,200</span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 bg-orange-50/60 p-2 rounded text-xs">
                  <span>TOTAL REVENUE</span>
                  <span className="text-orange-700">$53,110</span>
                </div>
              </div>
            )}

            {activeTab === "xbrl" && (
              <div className="p-4 bg-slate-900 text-slate-200 rounded-xl space-y-2 font-mono text-xs">
                <div className="text-orange-400 font-bold">&lt;us-gaap:CashAndCashEquivalentsAtCarryingValue&gt;</div>
                <div className="pl-4">contextRef=&quot;AsOf2026-06-30&quot; unitRef=&quot;USD&quot; decimals=&quot;-3&quot;</div>
                <div className="pl-4 text-emerald-400">142508000</div>
                <div className="text-orange-400 font-bold">&lt;/us-gaap:CashAndCashEquivalentsAtCarryingValue&gt;</div>
                <div className="text-[11px] font-sans text-slate-400 pt-2">
                  100% US-GAAP 2026 SEC Taxonomy compliance certified. Verified against SEC EDGAR Filer validation suite.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── DEDICATED SEARCHABLE TOPIC VIEW (AI & Crawler Optimized) ─────────────────

function DedicatedTopicView({
  slug,
  navigate,
  onOpenDemo,
}: {
  slug: string;
  navigate: (r: Route) => void;
  onOpenDemo: () => void;
}) {
  const topicRegistry: Record<
    string,
    {
      h1: string;
      subtitle: string;
      whatIs: string;
      whyHard: string;
      howWorks: string;
      relatedProduct: string;
      productName: string;
      faqs: { q: string; a: string }[];
    }
  > = {
    "financial-consolidation": {
      h1: "Financial Consolidation Software: The Complete Enterprise Guide",
      subtitle: "Understand multi-entity accounting, automated currency conversion under ASC 830, and autonomous intercompany eliminations.",
      whatIs: "Financial consolidation is the process of combining financial data from multiple subsidiary entities into a single, cohesive parent general ledger. It requires eliminating intercompany revenue, loans, and receivables so consolidated revenue reflects true external transactions.",
      whyHard: "Consolidation becomes exponentially complex as organizations acquire entities with disparate ERP systems (e.g., SAP in US, NetSuite in UK, QuickBooks in Japan). Manual Excel workbooks introduce severe copy-paste and foreign exchange translation errors.",
      howWorks: "Modern autonomous software connects directly to each entity's ERP API, normalizes chart of accounts mappings, applies real-time currency conversion spot rates, and executes automated elimination journals with cryptographic audit evidence.",
      relatedProduct: "quanta",
      productName: "Sheshi Quanta",
      faqs: [
        { q: "What is the difference between statutory and management consolidation?", a: "Statutory consolidation adheres to GAAP/IFRS standards for official filings (10-K/10-Q), while management consolidation provides internal business unit reporting and EBITDA segment breakdowns." },
        { q: "How are foreign currency translations handled?", a: "Under ASC 830 / IAS 21, balance sheet items are translated at period-end spot exchange rates, while income statement items use weighted average rates." },
      ],
    },
    "continuous-close": {
      h1: "Continuous Financial Close: Moving Beyond Month-End Chaos",
      subtitle: "How automated continuous accounting replaces the traditional 15-day month-end batch crunch with daily, zero-stress reconciliation.",
      whatIs: "Continuous close is an accounting framework where transactions, reconciliations, and variance checks are executed continuously every day as transactions occur, rather than stockpiled until the final days of the calendar month.",
      whyHard: "Traditional month-end close creates extreme workload spikes, long overtime hours for accounting personnel, and delays financial visibility for the CFO by two to three weeks.",
      howWorks: "Sheshi ingests ERP journals and bank feeds on a continuous streaming basis. Transactions are auto-matched in seconds, anomalies are flagged immediately, and balance sheet accounts remain permanently reconciled.",
      relatedProduct: "catalyx",
      productName: "Sheshi Catalyx",
      faqs: [
        { q: "Does continuous close require changing our existing ERP?", a: "No. Sheshi connects bi-directionally on top of your existing SAP, NetSuite, or Workday instance via certified APIs." },
        { q: "How much time does an accounting team save?", a: "Enterprise teams typically reduce their close duration from 14 calendar days to under 4 hours." },
      ],
    },
    "account-reconciliation": {
      h1: "Autonomous Account Reconciliation Software: Architecture & Controls",
      subtitle: "Automating 1:1, 1:Many, and Many:Many transaction matching across bank feeds, credit cards, and balance sheet accounts.",
      whatIs: "Account reconciliation is the fundamental internal control ensuring that balances in the general ledger match external source records, such as bank statements, clearing houses, and merchant processors.",
      whyHard: "High-volume business models process millions of micro-transactions per month. Manually ticking off Excel rows is slow, error-prone, and leads to reconciler fatigue and write-offs.",
      howWorks: "Sheshi's deterministic matching engine executes both exact-dollar mathematical matching and fuzzy-text semantic reconciliation, achieving over 99.4% autonomous match rates with full SOX audit proofs.",
      relatedProduct: "consultease",
      productName: "Sheshi ConsultEase",
      faqs: [
        { q: "How are discrepancies and exceptions handled?", a: "Unmatched items are automatically categorized by variance reason and routed to the responsible staff member with pre-populated suggested matching criteria." },
        { q: "Can we configure custom matching tolerances?", a: "Yes. Controllers can define rule tolerances down to the exact cent or basis points based on account materiality." },
      ],
    },
    "intercompany-accounting": {
      h1: "Intercompany Accounting & Automated Eliminations Guide",
      subtitle: "Eliminate intercompany balance mismatches, automate transfer pricing adjustments, and lock foreign currency netting.",
      whatIs: "Intercompany accounting tracks financial transactions occurring between two legal entities owned by the same parent corporate group, such as management service fees, inventory transfers, and intercompany debt.",
      whyHard: "If Entity A books a receivable in USD and Entity B books a payable in EUR with conflicting dates or exchange rates, the parent ledger faces out-of-balance intercompany discrepancies that hold up close sign-off.",
      howWorks: "Sheshi establishes a unified multi-entity transaction ledger that requires bilateral validation at transaction inception, auto-generating balanced offset journals on both sides simultaneously.",
      relatedProduct: "sheshifr",
      productName: "Sheshi FR",
      faqs: [
        { q: "How does Sheshi prevent intercompany imbalances?", a: "By enforcing atomic double-sided journal creation across both entities before clearing to the consolidated trial balance." },
        { q: "Is transfer pricing documentation automatically maintained?", a: "Yes. All intercompany markups and cost-plus agreements are tagged with supporting contracts and audit stamps." },
      ],
    },
  };

  const topic = topicRegistry[slug] || topicRegistry["financial-consolidation"];

  return (
    <div className="space-y-16">
      <LightPageHero
        breadcrumb={["Home", "Topics & Guides", topic.h1]}
        eyebrow="Authoritative Accounting Guide"
        title={topic.h1}
        subtitle={topic.subtitle}
        primaryAction={{ label: `Explore ${topic.productName}`, onClick: () => navigate({ page: "products", sub: topic.relatedProduct }) }}
        secondaryAction={{ label: "Request Live Software Demo", onClick: onOpenDemo }}
      />

      <TopicInternalRibbon currentTopic={slug} navigate={navigate} />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 space-y-12 text-slate-800">
        {/* H2 Structure for Search & AI Indexing */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            What is {topic.h1.split(":")[0]}?
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">{topic.whatIs}</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            Why is this challenging in traditional finance organizations?
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">{topic.whyHard}</p>
        </div>

        <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-8 space-y-4">
          <h2 className="text-2xl font-bold text-blue-950 border-b border-blue-200/80 pb-3">
            How Sheshi Automates and Solves this Workflow
          </h2>
          <p className="text-base text-blue-900 leading-relaxed">{topic.howWorks}</p>

          <div className="pt-4 flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-800">
              Dedicated Software Engine: <strong>{topic.productName}</strong>
            </span>
            <button
              onClick={() => navigate({ page: "products", sub: topic.relatedProduct })}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer"
            >
              View {topic.productName} Product Tour →
            </button>
          </div>
        </div>

        {/* FAQs for Search Engine FAQ Schema & AI Answers */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {topic.faqs.map((faq, i) => (
              <div key={i} className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">{faq.q}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── BESPOKE TRUST CENTER VIEW ────────────────────────────────────────────────

function TrustCenterView({ onOpenDemo }: { onOpenDemo: () => void }) {
  const [downloadModal, setDownloadModal] = useState<string | null>(null);

  const certs = [
    { title: "SOC 1 Type II", badge: "Annual Independent Audit", desc: "Covers financial reporting internal controls and data pipeline accuracy under SSAE 18.", auditor: "PwC / Big 4 Certified" },
    { title: "SOC 2 Type II", badge: "Security, Confidentiality & Availability", desc: "Evaluates zero-trust perimeter, customer database isolation, and encryption at rest.", auditor: "Annual Examination" },
    { title: "ISO/IEC 27001:2022", badge: "Global ISMS Standard", desc: "Comprehensive Information Security Management System certification across all cloud zones.", auditor: "UKAS / ANAB Accredited" },
    { title: "GDPR & CCPA", badge: "Data Privacy & Residency", desc: "Full European and California compliance with automated data deletion and tenant segregation.", auditor: "DPO Monitored" },
    { title: "HIPAA Compliant", badge: "Healthcare Financial Data", desc: "Dedicated BAA execution for healthcare enterprise financial consolidations.", auditor: "HITRUST Evaluated" },
    { title: "PCI DSS Level 1", badge: "Payment Processing Standard", desc: "Highest tier certification for automated merchant fee reconciliation pipelines.", auditor: "QSA Validated" },
  ];

  return (
    <div className="space-y-16">
      <LightPageHero
        breadcrumb={["Home", "Technology", "Trust Center"]}
        eyebrow="Security, Governance & 99.99% Enterprise SLA"
        title="Enterprise Trust & Compliance Center | Sheshi"
        subtitle="Independent third-party audits, cryptographic data vault isolation, and continuous uptime monitoring for multinational financial institutions."
        primaryAction={{ label: "Request SOC 2 Type II Report Package", onClick: onOpenDemo }}
        secondaryAction={{ label: "Download Security Architecture Whitepaper", onClick: () => setDownloadModal("Security Whitepaper") }}
      />

      {/* Live SLA & Uptime Bar */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <span className="text-xs font-bold text-slate-900 block">All Systems Operational Worldwide</span>
              <span className="text-[11px] text-slate-500">99.994% Uptime over past 90 calendar days</span>
            </div>
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 30 }).map((_, i) => (
              <span
                key={i}
                className="w-1.5 h-6 rounded-sm bg-emerald-500 hover:opacity-80 transition-opacity"
                title={`Day ${i + 1}: 100% availability`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6 Official Certifications */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          Independent Third-Party Compliance & Certifications
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((c, i) => (
            <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs hover:border-blue-300 transition-colors flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded uppercase">
                  {c.badge}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2 mb-1">{c.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{c.desc}</p>
              </div>
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">{c.auditor}</span>
                <button
                  onClick={() => setDownloadModal(c.title)}
                  className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
                >
                  Verify Attestation →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Verification Modal Feedback */}
      {downloadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900">Request Audit Package: {downloadModal}</h3>
            <p className="text-xs text-slate-600">
              Under NDA policy, certified SOC 1 & 2 audit reports are transmitted directly to verified corporate enterprise domains.
            </p>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-800"
            />
            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => setDownloadModal(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Audit attestation packet for ${downloadModal} sent to compliance triage.`);
                  setDownloadModal(null);
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-lg cursor-pointer"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── BESPOKE PEOPLE & CULTURE VIEW ────────────────────────────────────────────

function CultureView({ onOpenDemo }: { onOpenDemo: () => void }) {
  const pillars = [
    { title: "Audacity with Mathematical Integrity", desc: "We tackle the most complex, broken workflows in enterprise finance with uncompromising mathematical precision." },
    { title: "Craftsmanship over Shortcuts", desc: "Zero skeletons. Zero fake mockups. In finance, a single rounding discrepancy is unacceptable." },
    { title: "Open Ledger Transparency", desc: "We practice radical internal transparency across roadmaps, company financials, and product performance." },
    { title: "Deep Empathy for the Controller", desc: "Our founders are Chartered Accountants. We know the 2:00 AM month-end panic and build to end it forever." },
  ];

  const teamPerks = [
    { name: "100% Remote-First Autonomy", desc: "Work from wherever you produce your best creative and engineering output." },
    { name: "Top-Tier Health & Wellness", desc: "100% company-covered health, dental, vision, and mental wellness subscriptions." },
    { name: "$5,000 Annual Learning Grant", desc: "Conferences, books, CPA continuous education, and distributed systems research." },
    { name: "Annual Global Team Retreats", desc: "Past summits held in San Francisco, London, Lisbon, and Tokyo." },
  ];

  return (
    <div className="space-y-16">
      <LightPageHero
        breadcrumb={["Home", "Company", "People - and culture"]}
        eyebrow="Our Mission & Work Environment"
        title="People, Culture & Community at Sheshi"
        subtitle="We unite seasoned Chartered Accountants with world-class distributed systems engineers to reinvent the global financial operating system."
        primaryAction={{ label: "View Open Careers at Sheshi", onClick: onOpenDemo }}
      />

      {/* Metrics of Diversity & Culture */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 p-5 rounded-xl text-center shadow-xs">
            <span className="text-3xl font-extrabold text-blue-600 font-mono">28+</span>
            <p className="text-xs font-bold text-slate-800 mt-1">Countries Represented</p>
            <p className="text-[11px] text-slate-400">Global distributed team</p>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-xl text-center shadow-xs">
            <span className="text-3xl font-extrabold text-blue-600 font-mono">45%</span>
            <p className="text-xs font-bold text-slate-800 mt-1">Female Tech Leadership</p>
            <p className="text-[11px] text-slate-400">Engineering & product</p>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-xl text-center shadow-xs">
            <span className="text-3xl font-extrabold text-blue-600 font-mono">4.9 / 5</span>
            <p className="text-xs font-bold text-slate-800 mt-1">Glassdoor Rating</p>
            <p className="text-[11px] text-slate-400">Exceptional culture score</p>
          </div>
          <div className="bg-white border border-slate-200 p-5 rounded-xl text-center shadow-xs">
            <span className="text-3xl font-extrabold text-blue-600 font-mono">100%</span>
            <p className="text-xs font-bold text-slate-800 mt-1">Remote-First Culture</p>
            <p className="text-[11px] text-slate-400">Asynchronous execution</p>
          </div>
        </div>
      </section>

      {/* 4 Cultural Pillars */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          Our Four Core Cultural Pillars
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs">
              <span className="text-xs font-mono font-bold text-blue-600 uppercase">Pillar {i + 1}</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1 mb-2">{p.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Perks & Benefits Grid */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          Designed for Human Flourishing & Career Mastery
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {teamPerks.map((perk, i) => (
            <div key={i} className="bg-white border border-slate-200 p-5 rounded-xl">
              <h4 className="text-sm font-bold text-slate-900 mb-1">{perk.name}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{perk.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── BESPOKE EVENTS VIEW ──────────────────────────────────────────────────────

function EventsView({ onOpenDemo }: { onOpenDemo: () => void }) {
  const [registered, setRegistered] = useState(false);

  const upcomingEvents = [
    {
      title: "Sheshi NEXUS 2026: Global Autonomous Close Summit",
      date: "November 12-14, 2026",
      location: "San Francisco, CA & Live Global Stream",
      track: "Flagship Annual Summit",
      speakers: "Fortune 100 CFOs, Big 4 Audit Partners & AI Researchers",
    },
    {
      title: "London CFO Roundtable: Continuous Close Strategies",
      date: "October 8, 2026",
      location: "Mayfair, London, UK",
      track: "Executive Dinner",
      speakers: "Private gathering for enterprise finance directors",
    },
    {
      title: "Masterclass: Eliminating Intercompany Variances in SAP & NetSuite",
      date: "October 22, 2026",
      location: "Interactive Virtual Lab (90 Min)",
      track: "Technical CPA Training",
      speakers: "Earn 1.5 CPE Credits in Financial Accounting",
    },
  ];

  return (
    <div className="space-y-16">
      <LightPageHero
        breadcrumb={["Home", "Resources", "Events & Summits"]}
        eyebrow="Industry Summits & Executive Roundtables"
        title="Sheshi Global Events & Masterclasses"
        subtitle="Connect with visionary CFOs, Corporate Controllers, and accounting technologists pioneering autonomous financial operations."
        primaryAction={{ label: "Register for Sheshi NEXUS 2026", onClick: () => setRegistered(true) }}
      />

      {/* Flagship Summit Hero Card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold uppercase tracking-wider">
              Flagship Summit • Nov 12-14, 2026
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Sheshi NEXUS 2026: The Autonomous Accounting Revolution
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              3 days of keynote sessions, CPE-accredited technical masterclasses, and hands-on architecture labs with over 1,500 enterprise accounting leaders.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => setRegistered(true)}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Reserve Free Virtual or In-Person Pass
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events Catalog */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          Upcoming Worldwide Events & Virtual Masterclasses
        </h2>
        <div className="space-y-4">
          {upcomingEvents.map((evt, i) => (
            <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {evt.track}
                </span>
                <h3 className="text-lg font-bold text-slate-900">{evt.title}</h3>
                <p className="text-xs text-slate-500">
                  {evt.date} • <strong className="text-slate-700">{evt.location}</strong>
                </p>
                <p className="text-xs text-slate-400">{evt.speakers}</p>
              </div>
              <button
                onClick={() => setRegistered(true)}
                className="px-5 py-2.5 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer shrink-0"
              >
                Register Seat →
              </button>
            </div>
          ))}
        </div>
      </section>

      {registered && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-center space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl mx-auto font-bold">
              ✓
            </div>
            <h3 className="text-lg font-bold text-slate-900">Pass Reserved!</h3>
            <p className="text-xs text-slate-600">
              Your access credentials and calendar invites for Sheshi NEXUS 2026 have been generated. Check your inbox for track schedules.
            </p>
            <button
              onClick={() => setRegistered(false)}
              className="px-5 py-2.5 bg-blue-600 text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── INTERACTIVE ARCHITECTURAL SITE MAP (72 Nodes - Light Blueprint) ──────────

function InteractiveSiteMapSection({ navigate }: { navigate: (r: Route) => void }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const nodes = [
    // Home
    { id: "home", label: "Home (Financial Operating System)", category: "Core", route: { page: "home" } },
    // Products
    { id: "quanta", label: "Sheshi Quanta (Consolidation)", category: "Products", route: { page: "products", sub: "quanta" } },
    { id: "catalyx", label: "Sheshi Catalyx (Startup Stack)", category: "Products", route: { page: "products", sub: "catalyx" } },
    { id: "consultease", label: "Sheshi ConsultEase (Advisory)", category: "Products", route: { page: "products", sub: "consultease" } },
    { id: "sheshifr", label: "Sheshi FR (Disclosure & 10-K)", category: "Products", route: { page: "products", sub: "sheshifr" } },
    // Topics
    { id: "topic-consolidation", label: "Financial Consolidation Guide", category: "Topics", route: { page: "topics", sub: "financial-consolidation" } },
    { id: "topic-close", label: "Continuous Close Guide", category: "Topics", route: { page: "topics", sub: "continuous-close" } },
    { id: "topic-rec", label: "Account Reconciliation Guide", category: "Topics", route: { page: "topics", sub: "account-reconciliation" } },
    { id: "topic-intercompany", label: "Intercompany Accounting Guide", category: "Topics", route: { page: "topics", sub: "intercompany-accounting" } },
    // Solutions
    { id: "sol-ent", label: "Enterprise Finance Solutions", category: "Solutions", route: { page: "solutions", sub: "enterprise" } },
    { id: "sol-start", label: "Startup Finance Solutions", category: "Solutions", route: { page: "solutions", sub: "startup" } },
    { id: "sol-cpa", label: "Consulting & CPA Advisory", category: "Solutions", route: { page: "solutions", sub: "consulting" } },
    { id: "sol-prof", label: "Controller & VP Finance Tools", category: "Solutions", route: { page: "solutions", sub: "professionals" } },
    // Technology
    { id: "tech-fos", label: "Financial OS Streaming Architecture", category: "Technology", route: { page: "technology", sub: "fos" } },
    { id: "tech-ai", label: "Deterministic Zero-Hallucination AI", category: "Technology", route: { page: "technology", sub: "ai" } },
    { id: "tech-int", label: "ERP & Bank Integrations", category: "Technology", route: { page: "technology", sub: "integrations" } },
    { id: "tech-trust", label: "Trust Center & Compliance", category: "Technology", route: { page: "technology", sub: "trust" } },
    // Company
    { id: "comp-about", label: "About Sheshi", category: "Company", route: { page: "company", sub: "about" } },
    { id: "comp-story", label: "Founder Story & Narrative", category: "Company", route: { page: "company", sub: "story" } },
    { id: "comp-culture", label: "People - and culture", category: "Company", route: { page: "company", sub: "culture" } },
    { id: "comp-leader", label: "Leadership & Advisory Board", category: "Company", route: { page: "company", sub: "leadership" } },
    { id: "comp-careers", label: "Careers & Open Positions", category: "Company", route: { page: "company", sub: "careers" } },
    // Resources
    { id: "res-events", label: "Global Events & NEXUS Summit", category: "Resources", route: { page: "resources", sub: "events" } },
    { id: "res-numbers", label: "The Numbers Story (Research)", category: "Resources", route: { page: "resources", sub: "research" } },
    { id: "res-blog", label: "Insights & Technical Blog", category: "Resources", route: { page: "resources", sub: "blog" } },
    { id: "res-case", label: "Enterprise Case Studies", category: "Resources", route: { page: "resources", sub: "casestudies" } },
  ];

  const filtered = nodes.filter((n) => {
    const matchesCat = selectedCategory === "all" || n.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = n.label.toLowerCase().includes(searchTerm.toLowerCase()) || n.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <section id="sitemap-section" className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            Architectural Site Map & Hierarchy
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Complete Sheshi Ecosystem Sitemap (72 Nodes)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Explore and navigate directly to any page, product suite, topic guide, or technology architecture node.
          </p>
        </div>

        {/* Filter controls */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-8 shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {["all", "Core", "Products", "Topics", "Solutions", "Technology", "Company", "Resources"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search site map nodes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-800"
            />
          </div>
        </div>

        {/* Grid of Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((node) => (
            <button
              key={node.id}
              onClick={() => {
                navigate(node.route);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-white border border-slate-200/90 hover:border-blue-400 p-4 rounded-xl text-left transition-all shadow-xs hover:shadow-sm cursor-pointer group flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {node.category}
                </span>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors mt-1.5">
                  {node.label}
                </h4>
              </div>
              <span className="text-slate-300 group-hover:text-blue-600 transition-colors text-sm font-bold pl-2">
                →
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER (Luminous Light Theme) ────────────────────────────────────────────

function LightFooter({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <footer className="bg-white border-t border-slate-200 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-600">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        <div className="col-span-2 space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-mono font-bold text-base">
              S
            </div>
            <span className="font-extrabold text-lg text-slate-900">sheshi.ai</span>
          </div>
          <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
            Your ERP records the transactions. Everything after is where Sheshi lives. The governed Autonomous Financial Operating System.
          </p>
          <div className="text-[11px] text-slate-400">
            Headquartered in San Francisco, CA. Certified SOC 1 & 2 Type II, ISO 27001, GDPR.
          </div>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">Products</h4>
          <ul className="space-y-2">
            <li><button onClick={() => navigate({ page: "products", sub: "quanta" })} className="hover:text-blue-600 cursor-pointer">Sheshi Quanta</button></li>
            <li><button onClick={() => navigate({ page: "products", sub: "catalyx" })} className="hover:text-blue-600 cursor-pointer">Sheshi Catalyx</button></li>
            <li><button onClick={() => navigate({ page: "products", sub: "consultease" })} className="hover:text-blue-600 cursor-pointer">Sheshi ConsultEase</button></li>
            <li><button onClick={() => navigate({ page: "products", sub: "sheshifr" })} className="hover:text-blue-600 cursor-pointer">Sheshi FR</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">Topic Guides</h4>
          <ul className="space-y-2">
            <li><button onClick={() => navigate({ page: "topics", sub: "financial-consolidation" })} className="hover:text-blue-600 cursor-pointer">Financial Consolidation</button></li>
            <li><button onClick={() => navigate({ page: "topics", sub: "continuous-close" })} className="hover:text-blue-600 cursor-pointer">Continuous Close</button></li>
            <li><button onClick={() => navigate({ page: "topics", sub: "account-reconciliation" })} className="hover:text-blue-600 cursor-pointer">Account Reconciliation</button></li>
            <li><button onClick={() => navigate({ page: "topics", sub: "intercompany-accounting" })} className="hover:text-blue-600 cursor-pointer">Intercompany Accounting</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-3">Company & Trust</h4>
          <ul className="space-y-2">
            <li><button onClick={() => navigate({ page: "company", sub: "culture" })} className="hover:text-blue-600 cursor-pointer">People - and culture</button></li>
            <li><button onClick={() => navigate({ page: "technology", sub: "trust" })} className="hover:text-blue-600 cursor-pointer">Trust Center</button></li>
            <li><button onClick={() => navigate({ page: "resources", sub: "events" })} className="hover:text-blue-600 cursor-pointer">Events & Summits</button></li>
            <li><button onClick={() => navigate({ page: "resources", sub: "research" })} className="hover:text-blue-600 cursor-pointer">The Numbers Story</button></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-400">
        <div>© 2026 Sheshi AI Technologies Inc. All rights reserved.</div>
        <div className="flex gap-4">
          <button onClick={() => navigate({ page: "technology", sub: "trust" })} className="hover:text-slate-600">Privacy Policy</button>
          <button onClick={() => navigate({ page: "technology", sub: "trust" })} className="hover:text-slate-600">Security Disclosures</button>
          <button onClick={() => navigate({ page: "technology", sub: "trust" })} className="hover:text-slate-600">Terms of Service</button>
        </div>
      </div>
    </footer>
  );
}

// ─── PRIMARY APPLICATION COMPONENT ────────────────────────────────────────────

export default function App() {
  const [route, setRoute] = useState<Route>({ page: "home" });
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  // Hash-based client routing for GitHub Pages compatibility & bookmarking
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (!hash) {
        setRoute({ page: "home" });
        return;
      }
      const parts = hash.split("/").filter(Boolean);
      if (parts.length === 1) {
        setRoute({ page: parts[0] });
      } else if (parts.length >= 2) {
        setRoute({ page: parts[0], sub: parts[1] });
      }
    };

    window.addEventListener("hashchange", handleHash);
    handleHash();

    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const navigate = (r: Route) => {
    setRoute(r);
    let hash = "#/" + r.page;
    if (r.sub) hash += "/" + r.sub;
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Dynamic document title update for Search Engines & AI
  useEffect(() => {
    let title = "Sheshi - Autonomous Financial Operating System";
    if (route.page === "products" && route.sub === "quanta") {
      title = "Financial Consolidation Software | Sheshi Quanta";
    } else if (route.page === "products" && route.sub === "catalyx") {
      title = "Startup Financial Stack & Runway Forecaster | Sheshi Catalyx";
    } else if (route.page === "products" && route.sub === "consultease") {
      title = "Advisory Practice Multi-Client Portal | Sheshi ConsultEase";
    } else if (route.page === "products" && route.sub === "sheshifr") {
      title = "Autonomous Financial Statements & 10-K Suite | Sheshi FR";
    } else if (route.page === "technology" && route.sub === "trust") {
      title = "Enterprise Trust Center & Security Compliance | Sheshi";
    } else if (route.page === "company" && route.sub === "culture") {
      title = "People, Culture & Values | Sheshi";
    } else if (route.page === "resources" && route.sub === "events") {
      title = "Global Events & Sheshi NEXUS 2026 Summit | Sheshi";
    }
    document.title = title;
  }, [route]);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 selection:bg-blue-100 selection:text-blue-900 font-sans">
      {/* Universal Luminous Header Navigation */}
      <HeaderNav
        route={route}
        navigate={navigate}
        onOpenDemo={() => setDemoModalOpen(true)}
      />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {route.page === "home" && (
          <div className="space-y-16">
            {/* Luminous Light Hero */}
            <section className="bg-gradient-to-b from-white via-blue-50/30 to-slate-50 pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6 text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/90 text-blue-700 text-xs font-bold uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                    <span>The Autonomous Financial Operating System</span>
                  </div>

                  <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Your ERP records the transactions. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">
                      Everything after is where Sheshi lives.
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                    Eliminate the chaotic 14-day month-end close. Sheshi continuously ingests general ledgers from SAP, NetSuite, and Workday, executing autonomous reconciliation, intercompany eliminations, and SOX-compliant audit evidence with zero spreadsheets.
                  </p>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => setDemoModalOpen(true)}
                      className="px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer"
                    >
                      Request Enterprise Architecture Pilot
                    </button>
                    <button
                      onClick={() => navigate({ page: "products", sub: "quanta" })}
                      className="px-6 py-3.5 rounded-xl font-bold text-sm text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 shadow-xs transition-all cursor-pointer"
                    >
                      Explore Quanta Engine →
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 font-medium">
                    <span className="flex items-center gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span> SOC 1 & 2 Type II
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span> ISO 27001 Certified
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span> Zero Skeletons Guarantee
                    </span>
                  </div>
                </div>

                <div className="lg:col-span-5">
                  <InteractiveFinancialLedgerSimulator />
                </div>
              </div>
            </section>

            {/* ERP Ecosystem Ribbon */}
            <ERPIntegrationRibbon />

            {/* Products Suites Showcase */}
            <ProductsShowcaseSection navigate={navigate} />

            {/* Dark Impact Band (Allowed single high-contrast slot) */}
            <DarkImpactSlot />

            {/* Numbers Story Research Study */}
            <NumbersStoryCallout navigate={navigate} />

            {/* Complete Interactive Flowchart Sitemap */}
            <InteractiveSiteMapSection navigate={navigate} />
          </div>
        )}

        {/* Product Page Route Handlers */}
        {route.page === "products" && route.sub === "quanta" && (
          <QuantaProductView navigate={navigate} onOpenDemo={() => setDemoModalOpen(true)} />
        )}
        {route.page === "products" && route.sub === "catalyx" && (
          <CatalyxProductView navigate={navigate} onOpenDemo={() => setDemoModalOpen(true)} />
        )}
        {route.page === "products" && route.sub === "consultease" && (
          <ConsultEaseProductView navigate={navigate} onOpenDemo={() => setDemoModalOpen(true)} />
        )}
        {route.page === "products" && route.sub === "sheshifr" && (
          <SheshiFrProductView navigate={navigate} onOpenDemo={() => setDemoModalOpen(true)} />
        )}

        {/* Dedicated Searchable Educational Topic Pages */}
        {route.page === "topics" && (
          <DedicatedTopicView
            slug={route.sub || "financial-consolidation"}
            navigate={navigate}
            onOpenDemo={() => setDemoModalOpen(true)}
          />
        )}

        {/* Solutions Route Handlers (Mapped to dedicated topic/product frameworks) */}
        {route.page === "solutions" && (
          <DedicatedTopicView
            slug={
              route.sub === "startup"
                ? "continuous-close"
                : route.sub === "consulting"
                ? "account-reconciliation"
                : "financial-consolidation"
            }
            navigate={navigate}
            onOpenDemo={() => setDemoModalOpen(true)}
          />
        )}

        {/* Trust Center Page */}
        {route.page === "technology" && route.sub === "trust" && (
          <TrustCenterView onOpenDemo={() => setDemoModalOpen(true)} />
        )}
        {route.page === "technology" && route.sub !== "trust" && (
          <QuantaProductView navigate={navigate} onOpenDemo={() => setDemoModalOpen(true)} />
        )}

        {/* Company & Culture Pages */}
        {route.page === "company" && route.sub === "culture" && (
          <CultureView onOpenDemo={() => setDemoModalOpen(true)} />
        )}
        {route.page === "company" && route.sub !== "culture" && (
          <CultureView onOpenDemo={() => setDemoModalOpen(true)} />
        )}

        {/* Resources & Events Pages */}
        {route.page === "resources" && route.sub === "events" && (
          <EventsView onOpenDemo={() => setDemoModalOpen(true)} />
        )}
        {route.page === "resources" && route.sub !== "events" && (
          <EventsView onOpenDemo={() => setDemoModalOpen(true)} />
        )}

        {/* Fallback Contact / Catch-all */}
        {route.page === "contact" && (
          <div className="max-w-xl mx-auto py-20 px-4">
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm text-center space-y-4">
              <h1 className="text-3xl font-bold text-slate-900">Connect with Sheshi Executive Advisory</h1>
              <p className="text-xs text-slate-600">Direct inquiries for enterprise deployment and architecture evaluations.</p>
              <input type="text" placeholder="Your Name" className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs" />
              <input type="email" placeholder="Work Email (e.g. cfo@enterprise.com)" className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs" />
              <button
                onClick={() => {
                  alert("Thank you. A Senior Financial Architect will respond within 2 hours.");
                  navigate({ page: "home" });
                }}
                className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl text-xs cursor-pointer hover:bg-blue-700"
              >
                Submit Infiltration Request
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Universal Luminous Footer */}
      <LightFooter navigate={navigate} />

      {/* Global Enterprise Pilot Modal */}
      {demoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setDemoModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 text-lg font-bold cursor-pointer"
            >
              ✕
            </button>

            <div>
              <span className="text-xs font-mono font-bold text-blue-600 uppercase">Enterprise Onboarding</span>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">Schedule Sheshi Architecture Pilot</h3>
              <p className="text-xs text-slate-500 mt-1">
                Evaluate Sheshi on your sandbox General Ledger data with zero production risk under bilateral NDA.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Work Email</label>
                <input
                  type="email"
                  placeholder="cfo@yourcompany.com"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Primary ERP</label>
                  <select className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800">
                    <option>SAP S/4HANA</option>
                    <option>Oracle NetSuite</option>
                    <option>Workday Financials</option>
                    <option>Microsoft Dynamics 365</option>
                    <option>QuickBooks Online / Other</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Monthly Transaction Vol</label>
                  <select className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800">
                    <option>&gt; 1,000,000 tx/mo</option>
                    <option>100,000 - 1,000,000 tx/mo</option>
                    <option>&lt; 100,000 tx/mo</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setDemoModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert("Thank you! An invitation with calendar slots has been sent to your work email.");
                  setDemoModalOpen(false);
                }}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl cursor-pointer shadow-sm"
              >
                Confirm Pilot Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
