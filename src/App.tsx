import { useState, useEffect } from "react";
import QuantaSubsite from "./components/products/QuantaSubsite";
import CatalyxSubsite from "./components/products/CatalyxSubsite";
import ConsultEaseSubsite from "./components/products/ConsultEaseSubsite";
import SheshiFRSubsite from "./components/products/SheshiFRSubsite";
import CompanyPages from "./components/pages/CompanyPages";
import SolutionsPages from "./components/pages/SolutionsPages";
import TechnologyPages from "./components/pages/TechnologyPages";
import ResourcesPages from "./components/pages/ResourcesPages";
import TopicsPages from "./components/pages/TopicsPages";
import PartnersPages from "./components/pages/PartnersPages";
import logoImg from "./assets/logo.png";

// ─── Types ────────────────────────────────────────────────────────────────────

type Route = {
  page: string;
  sub?: string;
  product?: string;
  productPage?: string;
  slug?: string;
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
    label: "Topics & Guides",
    page: "topics",
    children: [
      { label: "Financial Consolidation Software", sub: "financial-consolidation" },
      { label: "Continuous Financial Close", sub: "continuous-close" },
      { label: "Autonomous Account Reconciliation", sub: "account-reconciliation" },
      { label: "Intercompany Accounting", sub: "intercompany-accounting" },
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
    <div className="bg-white text-slate-900 rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden text-left max-w-5xl mx-auto">
      {/* Top Application Bar */}
      <div className="bg-slate-50 px-5 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-slate-600">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-400" />
            <div className="w-3 h-3 rounded-full bg-amber-400" />
            <div className="w-3 h-3 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs font-mono text-slate-500 pl-2 border-l border-slate-300">
            Sheshi Financial OS • Session ID: #SH-2026-LIVE
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-emerald-700 font-semibold">99.99% Live Sync</span>
          <span className="text-slate-300">•</span>
          <span className="text-slate-500 font-mono">Entity: Sheshi Global Holdings Inc.</span>
        </div>
      </div>

      {/* Control Strip */}
      <div className="bg-slate-50/80 px-6 py-4 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 bg-slate-200/70 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setActiveTab("close")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === "close" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Financial Close Progress
          </button>
          <button
            onClick={() => setActiveTab("ledger")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === "ledger" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Governed General Ledger
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === "audit" ? "bg-white text-blue-600 shadow-xs" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Audit Trail &amp; Lineage
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div>
            <span className="text-slate-500">Close Phase: </span>
            <span className="font-bold text-slate-900">Day 3 of Close (89% Complete)</span>
          </div>
          <div className="w-28 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div className="w-[89%] h-full bg-blue-600 rounded-full" />
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="p-6 overflow-x-auto">
        {activeTab === "close" && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Total Journal Entries</span>
                <p className="text-xl font-bold text-slate-900 mt-1 font-mono">42,890</p>
                <span className="text-[11px] text-emerald-700 font-semibold">↑ 99.4% Auto-Verified</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Unreconciled Variances</span>
                <p className="text-xl font-bold text-emerald-700 mt-1 font-mono">$0.00</p>
                <span className="text-[11px] text-slate-500">Zero variance tolerance</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">Multi-Entity Consolidations</span>
                <p className="text-xl font-bold text-slate-900 mt-1 font-mono">14 Subsidiaries</p>
                <span className="text-[11px] text-blue-700 font-semibold">FX Remeasured (USD)</span>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs text-slate-500 font-medium">External Auditor Status</span>
                <p className="text-xl font-bold text-slate-900 mt-1 font-mono">Pre-Certified</p>
                <span className="text-[11px] text-emerald-700 font-semibold">SOC 1 / SOX Aligned</span>
              </div>
            </div>

            <table className="w-full text-left text-xs text-slate-700">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider text-[10px] bg-slate-50/50">
                  <th className="py-2.5 px-3 font-semibold">Entry ID</th>
                  <th className="py-2.5 px-3 font-semibold">Account / Description</th>
                  <th className="py-2.5 px-3 font-semibold">Source ERP</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Debit Balance</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Credit Balance</th>
                  <th className="py-2.5 px-3 font-semibold">Governance Engine</th>
                  <th className="py-2.5 px-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {ledgerItems.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-3 text-blue-700 font-bold">{row.id}</td>
                    <td className="py-3 px-3 text-slate-900 font-sans font-medium">{row.account}</td>
                    <td className="py-3 px-3 text-slate-500 font-sans">{row.erp}</td>
                    <td className="py-3 px-3 text-right text-emerald-700 font-bold">{row.debit}</td>
                    <td className="py-3 px-3 text-right text-slate-800 font-bold">{row.credit}</td>
                    <td className="py-3 px-3">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 text-[10px] font-sans font-semibold">
                        {row.match}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button className="text-[11px] text-blue-600 hover:text-blue-800 font-sans font-semibold transition-colors cursor-pointer">
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
          <div className="py-8 text-center text-slate-700 max-w-xl mx-auto space-y-3">
            <h4 className="font-bold text-slate-900 text-base">Governed Unified Ledger Architecture</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Sheshi sits between SAP S/4, Oracle NetSuite, and Workday, normalizing disparate charts of accounts into a single immutable ledger layer. Changes require cryptographic dual-signoff.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <span className="text-[11px] bg-slate-100 text-slate-700 border border-slate-200 px-3 py-1 rounded-full font-mono">
                Lineage: SHA-256 Provenance
              </span>
              <span className="text-[11px] bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full font-mono font-semibold">
                SOX 404 Controls Active
              </span>
            </div>
          </div>
        )}

        {activeTab === "audit" && (
          <div className="py-8 text-center text-slate-700 max-w-xl mx-auto space-y-3">
            <h4 className="font-bold text-slate-900 text-base">Continuous Independent Audit Trail</h4>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Every journal entry, flux explanation, and controller signoff is watermarked with immutable timestamps and user identities. Big 4 auditors receive read-only federated portal access.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <span className="text-[11px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full font-mono font-semibold">
                Audit Status: 100% Traceable
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Status Ribbon */}
      <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center gap-2">
          <span>🔒 End-to-End TLS 1.3 Encryption</span>
          <span>•</span>
          <span className="text-emerald-700 font-semibold">SOC 2 Type II Certified</span>
        </span>
        <button className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer">
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
    <div className="relative bg-gradient-to-b from-white via-blue-50/20 to-slate-50 text-slate-900 px-6 md:px-12 pt-20 pb-20 overflow-hidden border-b border-slate-200/80">
      {/* Subtle minimalist gradient aura */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30 pointer-events-none"
        style={{
          background: "radial-gradient(circle at 50% 30%, #bfdbfe, transparent 70%)",
        }}
      />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-8">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
          <span>{eyebrow ?? "The Financial Operating System"}</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight max-w-4xl mx-auto">
          {title ?? (
            <>
              Your ERP records the transactions. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">
                Everything after is where Sheshi lives.
              </span>
            </>
          )}
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          {subtitle ??
            "The governed layer between your ERP and every financial output your organisation produces. Close, plan, consolidate, analyse, collaborate, and report with immutable trust."}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={() => navigate({ page: "contact" })}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition-all cursor-pointer"
          >
            Request Enterprise Demo
          </button>
          <button
            onClick={() => navigate({ page: "products", sub: "quanta" })}
            className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 font-semibold text-sm px-6 py-3.5 rounded-xl transition-all cursor-pointer shadow-xs"
          >
            Explore Quanta Engine →
          </button>
          <button
            onClick={() => {
              const el = document.getElementById("sitemap-flowchart");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="border border-slate-300 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-sm px-5 py-3.5 rounded-xl transition-all cursor-pointer bg-white"
          >
            Interactive Site Map ↓
          </button>
        </div>

        {/* Live Interactive Ledger Mockup in Light Theme */}
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

        <div className="lg:col-span-5 bg-slate-50 text-slate-900 p-6 rounded-2xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4 text-xs font-mono text-slate-500">
            <span className="font-semibold">GOVERNANCE ENGINE</span>
            <span className="text-emerald-600 font-bold">● ACTIVE</span>
          </div>
          <div className="space-y-3 text-xs">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-slate-500 block text-[10px] font-bold uppercase tracking-wider">ERP INGESTION</span>
              <span className="font-semibold text-slate-900">SAP S/4HANA &amp; NetSuite Stream</span>
              <span className="text-emerald-600 block text-[11px] font-semibold mt-1">✓ 12ms Synchronization Latency</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-slate-500 block text-[10px] font-bold uppercase tracking-wider">AGENTIC RECONCILIATION</span>
              <span className="font-semibold text-slate-900">Flux &amp; Variance Analysis Agent</span>
              <span className="text-blue-600 block text-[11px] font-semibold mt-1">99.4% Automated Match Rate</span>
            </div>
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
              <span className="text-slate-500 block text-[10px] font-bold uppercase tracking-wider">AUDIT PACK LINEAGE</span>
              <span className="font-semibold text-slate-900">Cryptographic Board Reporting</span>
              <span className="text-slate-600 block text-[11px] font-mono mt-1">SHA-256 Provenance Ledger</span>
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
                <div className="bg-white text-slate-800 p-6 rounded-2xl border border-slate-200 shadow-md">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <span className="text-xs font-mono text-blue-700 font-semibold">COMPONENT // {item.tag.toUpperCase()}</span>
                    <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 font-semibold px-2 py-0.5 rounded">
                      Verified
                    </span>
                  </div>
                  <div className="space-y-2.5 text-xs font-mono">
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Processing Node</span>
                      <span className="text-slate-900 font-semibold">Sheshi-FOS-v4.2</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Status</span>
                      <span className="text-emerald-700 font-semibold">100% Governed</span>
                    </div>
                    <div className="flex justify-between py-1.5 border-b border-slate-100">
                      <span className="text-slate-500">Security Guardrail</span>
                      <span className="text-slate-900 font-semibold">SOX 404 Cryptographic Log</span>
                    </div>
                    <div className="pt-2 text-[11px] text-slate-600 font-sans leading-relaxed">
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
    <div className="bg-gradient-to-br from-blue-50/60 via-white to-slate-50 text-slate-900 px-6 md:px-12 py-20 border-b border-blue-100/80">
      <div className="max-w-4xl mx-auto text-center">
        <div className="text-blue-600 text-3xl mb-4 font-serif">“</div>
        <blockquote className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed mb-6 font-sans">
          Most financial software is built by technologists who learned finance. Sheshi is built from inside finance by people who have actually run month-end close cycles, managed audits, and carried accountability for what the numbers say to the board.
        </blockquote>
        <div className="flex items-center justify-center gap-3">
          <div className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center shadow-md shadow-blue-500/20">
            CA
          </div>
          <div className="text-left">
            <p className="text-sm font-bold text-slate-900">Founding Philosophy</p>
            <p className="text-xs text-slate-500">Sheshi Financial Operating System • Practice-Led Architecture</p>
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

// ─── Bespoke Domain Components (Rich Variety Per Page) ─────────────────────────

function FounderLetterSection() {
  return (
    <div className="bg-white border-b border-slate-200/80 px-6 md:px-12 py-20">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#fcfdfd] border border-slate-200 rounded-3xl p-8 sm:p-14 shadow-sm relative overflow-hidden">
          <div className="absolute top-6 right-8 opacity-10 pointer-events-none select-none text-right">
            <span className="text-8xl font-serif font-black text-blue-900">CA</span>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-widest uppercase text-blue-700 bg-blue-50 border border-blue-200 px-3.5 py-1.5 rounded-full mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            Founder&apos;s Perspective // 20 Years of Practice
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-8">
            Why Enterprise Finance Breaks Between the ERP and the Board Room
          </h2>

          <div className="prose prose-slate max-w-none text-sm sm:text-base text-slate-700 leading-relaxed space-y-5 font-sans">
            <p>
              Twenty years ago, when I began my career as a Chartered Accountant leading statutory audits and corporate consolidations, I observed an uncomfortable reality that has only worsened with time:
            </p>
            <p className="font-medium text-slate-900 border-l-2 border-blue-600 pl-4 py-1 italic bg-blue-50/40 rounded-r-lg">
              &ldquo;ERPs are transactional record-keepers. They were designed to ensure that if a debited invoice is created, a credited account exists. But an ERP is not a Financial Operating System.&rdquo;
            </p>
            <p>
              The moment transactions leave SAP, Oracle NetSuite, or Workday, finance teams are forced into an invisible underworld of hundreds of linked spreadsheets. Every month-end close becomes a frantic race against the clock. Controllers work past midnight on Day 11 fixing broken VLOOKUP formulas, currency netting discrepancies, and intercompany imbalances across 40 subsidiaries.
            </p>
            <p>
              By the time the CFO presents the board deck or files the 10-K, nobody can genuinely verify the digital provenance of the numbers. One untracked spreadsheet cell edit can alter EBITDA by millions.
            </p>
            <p>
              We founded <strong>Sheshi</strong> to build the governed layer that should have existed all along. Sheshi sits directly above your ERPs. It operates with mathematical invariants &mdash; <em>zero hallucinations, deterministic matching, real-time multi-currency remeasurement, and an immutable SHA-256 audit trail</em>.
            </p>
            <p>
              We did not build this from the outside looking in. We built it because we have lived through the pain of closing books at 3 AM. Sheshi is our answer to the future of financial truth.
            </p>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="font-bold text-slate-900 text-base">Goutham Sheshi</p>
              <p className="text-xs text-slate-500">Founder &amp; Chief Executive Officer • Chartered Accountant</p>
              <p className="text-[11px] text-blue-600 font-mono mt-0.5">Sheshi Technologies Inc.</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg font-mono border border-slate-200">
                Lineage: Practice-Verified
              </span>
              <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg font-mono border border-emerald-200 font-semibold">
                SOC 1/2 Governed
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeadershipSection() {
  const leaders = [
    {
      name: "Goutham Sheshi, FCA",
      role: "Founder & Chief Executive Officer",
      pedigree: "Former Big 4 Audit Lead • 20+ Years Practice Experience",
      bio: "Advised Fortune 500 enterprises on statutory compliance, multi-entity IFRS/GAAP consolidations, and autonomous ledger design.",
      avatar: "GS",
    },
    {
      name: "Dr. Elena Rostova",
      role: "Chief Technology Officer",
      pedigree: "Ex-Staff Distributed Systems Architect at SAP & Oracle Labs",
      bio: "Ph.D. in Computer Science from MIT. Architected high-throughput financial streaming engines processing 50,000 tx/sec.",
      avatar: "ER",
    },
    {
      name: "Marcus Vance, CPA",
      role: "Head of Product & Financial Governance",
      pedigree: "Former Corporate Controller at Salesforce & Workday",
      bio: "Led financial transformation across 60 subsidiaries. Direct architect behind Sheshi Quanta continuous close workflows.",
      avatar: "MV",
    },
    {
      name: "Sophia Sterling",
      role: "VP of Enterprise Solutions & Advisory",
      pedigree: "Former Partner at Deloitte Financial Advisory Services",
      bio: "Specializes in cross-border transfer pricing, sovereign regulatory filings, and CPA firm capacity modernization.",
      avatar: "SS",
    },
    {
      name: "Kavitha Narayanan",
      role: "Head of AI & Formal Invariant Research",
      pedigree: "Ex-Research Scientist at DeepMind • Stanford AI Labs",
      bio: "Pioneered deterministic verification models that mathematically eliminate LLM hallucinations in ledger reconciliations.",
      avatar: "KN",
    },
    {
      name: "David Chen",
      role: "Chief Information Security Officer",
      pedigree: "Former CISO at Stripe Treasury & FinTech Guild",
      bio: "Oversees SOC 1/2 Type II compliance, zero-knowledge encryption proofs, and FedRAMP governance certifications.",
      avatar: "DC",
    },
  ];

  return (
    <div className="bg-white border-b border-slate-200/80 px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel text="Executive Leadership" />
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
            Built by Practitioners Who Lived the Crisis
          </h3>
          <p className="text-sm text-slate-600 mt-2">
            Our leadership combines Chartered Accountants with distributed systems engineers to bring mathematical rigor to financial operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {leaders.map((ldr) => (
            <div
              key={ldr.name}
              className="bg-white border border-slate-200 rounded-2xl p-7 hover:border-blue-500/60 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white font-bold text-base flex items-center justify-center shadow-sm">
                    {ldr.avatar}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 leading-tight">{ldr.name}</h4>
                    <p className="text-xs font-semibold text-blue-600 mt-0.5">{ldr.role}</p>
                  </div>
                </div>
                <div className="text-[11px] font-mono text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/70 mb-3">
                  {ldr.pedigree}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{ldr.bio}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="hover:text-blue-600 cursor-pointer font-medium">View Biography &amp; Publications</span>
                <span className="text-blue-600">&rarr;</span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
          <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-4 font-mono text-center">
            Senior Advisory Board &amp; Audit Fellows
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs text-slate-600">
            <div>
              <p className="font-bold text-slate-900 text-sm">Arthur Henderson</p>
              <p className="text-slate-500">Former Senior Audit Partner, PwC US</p>
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Prof. Claire DeWitt</p>
              <p className="text-slate-500">Chair of Accounting, London Business School</p>
            </div>
            <div>
              <p className="font-bold text-slate-900 text-sm">Vikram Singhania</p>
              <p className="text-slate-500">Former Group CFO, Tata Enterprise Holdings</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CareersJobBoardSection() {
  const [deptFilter, setDeptFilter] = useState("all");
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applied, setApplied] = useState(false);

  const jobs = [
    { id: "1", title: "Principal Distributed Systems Engineer", dept: "engineering", loc: "Remote (US/EU)", comp: "$210k - $270k + 0.3% Equity", type: "Full-Time" },
    { id: "2", title: "Senior AI Research Scientist (Formal Methods)", dept: "ai", loc: "New York or Remote", comp: "$200k - $260k + 0.25% Equity", type: "Full-Time" },
    { id: "3", title: "Enterprise Solutions Architect (CPA Required)", dept: "finance", loc: "London / Remote", comp: "£140k - £180k + Equity", type: "Full-Time" },
    { id: "4", title: "Lead Frontend Engineer (Financial Canvas)", dept: "engineering", loc: "Remote Global", comp: "$170k - $220k + Equity", type: "Full-Time" },
    { id: "5", title: "Director of Technical Accounting & GAAP Strategy", dept: "finance", loc: "San Francisco / Remote", comp: "$220k - $280k + Equity", type: "Full-Time" },
    { id: "6", title: "Senior Product Designer (Complex Systems)", dept: "product", loc: "Remote (Americas/EMEA)", comp: "$160k - $210k + Equity", type: "Full-Time" },
  ];

  const filteredJobs = deptFilter === "all" ? jobs : jobs.filter((j) => j.dept === deptFilter);

  return (
    <div className="bg-white border-b border-slate-200/80 px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <SectionLabel text="Open Positions" />
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
              Build the Foundation of Global Financial Trust
            </h3>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              We offer top-of-market compensation, meaningful equity ownership, comprehensive healthcare, and true remote-first autonomy.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs">
            {[
              { id: "all", label: "All Roles" },
              { id: "engineering", label: "Engineering" },
              { id: "ai", label: "AI Research" },
              { id: "finance", label: "Finance & Advisory" },
              { id: "product", label: "Product & Design" },
            ].map((d) => (
              <button
                key={d.id}
                onClick={() => setDeptFilter(d.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  deptFilter === d.id ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredJobs.map((j) => (
            <div
              key={j.id}
              className="bg-white border border-slate-200 rounded-xl p-6 hover:border-blue-500/50 hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                    {j.dept}
                  </span>
                  <span className="text-xs text-slate-500">{j.loc}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">{j.title}</h4>
                <p className="text-xs text-slate-500 mt-1 font-mono">{j.comp} • {j.type}</p>
              </div>

              <button
                onClick={() => {
                  setSelectedJob(j.title);
                  setApplied(false);
                }}
                className="bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 text-xs font-bold px-4 py-2.5 rounded-lg border border-blue-200 hover:border-blue-600 transition-all cursor-pointer shrink-0"
              >
                View Role &amp; Apply &rarr;
              </button>
            </div>
          ))}
        </div>

        {selectedJob && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-8 shadow-2xl border border-slate-200 relative">
              <button
                onClick={() => setSelectedJob(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 text-lg cursor-pointer"
              >
                ✕
              </button>
              {applied ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                    ✓
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Application Received!</h4>
                  <p className="text-xs text-slate-600 mb-6">
                    Our talent partner and hiring manager will review your submission and respond within 48 business hours.
                  </p>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="bg-slate-900 text-white text-xs font-semibold px-5 py-2.5 rounded-lg cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-600 font-mono">Job Application</span>
                  <h3 className="text-xl font-bold text-slate-900 mb-1">{selectedJob}</h3>
                  <p className="text-xs text-slate-500 mb-6">Sheshi Technologies • Global Remote Team</p>

                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Full Name</label>
                      <input
                        type="text"
                        placeholder="Sarah Jenkins"
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Email Address</label>
                      <input
                        type="email"
                        placeholder="sarah@example.com"
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">LinkedIn Profile or Portfolio URL</label>
                      <input
                        type="text"
                        placeholder="https://linkedin.com/in/..."
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Why Sheshi?</label>
                      <textarea
                        rows={3}
                        placeholder="Briefly describe your interest in financial infrastructure..."
                        className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:outline-none focus:border-blue-600"
                      />
                    </div>
                    <button
                      onClick={() => setApplied(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-xs transition-colors cursor-pointer mt-2"
                    >
                      Submit Confidential Application
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CloseTimelineSection() {
  const [activeMode, setActiveMode] = useState<"traditional" | "sheshi">("sheshi");

  const traditionalSteps = [
    { day: "Day -5 to -1", title: "Cut-Off Notices & Manual Accruals", desc: "Staff accountants send frantic email chasers to departmental heads. Invoices trickle in through PDF attachments." },
    { day: "Day 1 to 4", title: "Trial Balance Export & VLOOKUP Hell", desc: "Dumping raw GL lines into desktop Excel models. Multiple versions circulating via email attachments." },
    { day: "Day 5 to 9", title: "Intercompany Dispute & FX Mismatches", desc: "London subsidiary ledger doesn't net with New York. 3 days lost in email reconciliation threads." },
    { day: "Day 10 to 14", title: "Flux Scramble & Board Deck Editing", desc: "Late adjustments force controller to re-paste 80 charts into PowerPoint. High risk of transposition errors." },
    { day: "Day 15+", title: "Audit Anxiety & Post-Close Discrepancies", desc: "Auditors discover undocumented manual spreadsheet formula alterations, requiring retrospective restatements." },
  ];

  const sheshiSteps = [
    { day: "Continuous (T-0)", title: "Streaming Ingestion & Automated Accruals", desc: "ERP webhooks stream transaction journals in real-time. Accrual rules evaluate continuously every 24 hours." },
    { day: "Day 1 (Morning)", title: "Deterministic Invariant Reconciliation", desc: "99.4% of subledgers auto-match with zero human intervention. Real-time bank feed verification." },
    { day: "Day 1 (Afternoon)", title: "Algorithmic Intercompany Netting", desc: "Automated elimination entries posted according to ASC 810/IFRS 10 standards with continuous central bank FX rates." },
    { day: "Day 2", title: "Autonomous Flux Analysis & Sign-Off", desc: "Anomaly detection flags material variances with suggested commentary and immutable dual-controller signoff." },
    { day: "Day 3", title: "Instant Board Pack & Audit Lineage Lock", desc: "Cryptographic SHA-256 data pack published. External Big 4 auditors view federated read-only lineage." },
  ];

  const activeSteps = activeMode === "traditional" ? traditionalSteps : sheshiSteps;

  return (
    <div className="bg-slate-50 border-b border-slate-200/80 px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionLabel text="Close Cycle Architecture" />
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            The 15-Day Batch Scramble vs. Continuous Close
          </h3>
          <p className="text-sm text-slate-600 mt-2">
            Compare the operational reality of traditional spreadsheet-dependent finance with Sheshi&apos;s governed autonomous pipeline.
          </p>

          <div className="inline-flex items-center gap-2 bg-white border border-slate-300 p-1.5 rounded-xl shadow-xs mt-6">
            <button
              onClick={() => setActiveMode("traditional")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeMode === "traditional" ? "bg-rose-100 text-rose-800 border border-rose-200" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              ⚠️ Traditional 15-Day Batch Close
            </button>
            <button
              onClick={() => setActiveMode("sheshi")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeMode === "sheshi" ? "bg-blue-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              ⚡ Sheshi 3-Day Continuous Close
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {activeSteps.map((step, idx) => (
            <div
              key={step.day}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                activeMode === "traditional"
                  ? "bg-white border-rose-200 hover:border-rose-400"
                  : "bg-white border-blue-200 hover:border-blue-500 shadow-xs"
              }`}
            >
              <div>
                <span
                  className={`text-[11px] font-bold font-mono px-2.5 py-1 rounded-full inline-block mb-3 ${
                    activeMode === "traditional"
                      ? "bg-rose-50 text-rose-700 border border-rose-200"
                      : "bg-blue-50 text-blue-700 border border-blue-200"
                  }`}
                >
                  {step.day}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                  {idx + 1}. {step.title}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-[11px] font-semibold flex items-center justify-between">
                <span className={activeMode === "traditional" ? "text-rose-600" : "text-blue-600"}>
                  {activeMode === "traditional" ? "Status: High Friction" : "Status: Autonomous"}
                </span>
                <span>{activeMode === "traditional" ? "⏳" : "✓"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StartupRunwayForecasterSection() {
  const [cash, setCash] = useState(2400000);
  const [burn, setBurn] = useState(160000);
  const [growth, setGrowth] = useState(8);

  const netBurn = Math.max(10000, Math.round(burn * (1 - growth / 100)));
  const runwayMonths = (cash / netBurn).toFixed(1);
  const isDefaultAlive = Number(runwayMonths) >= 18;

  return (
    <div className="bg-white border-b border-slate-200/80 px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionLabel text="Interactive Tool // Sheshi Catalyx" />
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Live Startup Runway &amp; Burn Forecaster
          </h3>
          <p className="text-sm text-slate-600 mt-2">
            Drag the sliders below to evaluate capital runway, growth compounding, and board-pack readiness under different macro scenarios.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Cash &amp; Liquid Equivalents
                </label>
                <span className="text-base font-extrabold text-blue-700 font-mono">
                  ${(cash / 1000000).toFixed(2)}M
                </span>
              </div>
              <input
                type="range"
                min={500000}
                max={10000000}
                step={100000}
                value={cash}
                onChange={(e) => setCash(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>$500K</span>
                <span>$5.0M</span>
                <span>$10.0M</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Gross Monthly Burn Rate
                </label>
                <span className="text-base font-extrabold text-rose-600 font-mono">
                  ${(burn / 1000).toFixed(0)}k / mo
                </span>
              </div>
              <input
                type="range"
                min={50000}
                max={500000}
                step={10000}
                value={burn}
                onChange={(e) => setBurn(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>$50k</span>
                <span>$250k</span>
                <span>$500k</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Monthly Net Revenue Growth %
                </label>
                <span className="text-base font-extrabold text-emerald-600 font-mono">
                  +{growth}%
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={25}
                step={1}
                value={growth}
                onChange={(e) => setGrowth(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1">
                <span>0% (Flat)</span>
                <span>12%</span>
                <span>25% (Hyper-growth)</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 block mb-2 font-semibold">
              CATALYX PROJECTION METRICS
            </span>
            <div className="mb-6">
              <span className="text-5xl font-extrabold tracking-tight text-white font-mono">{runwayMonths}</span>
              <span className="text-sm text-slate-400 ml-2">Months Runway</span>
            </div>

            <div className="space-y-3 border-t border-slate-800 pt-6 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Effective Net Burn</span>
                <span className="text-white font-bold">${(netBurn / 1000).toFixed(1)}k / mo</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Survival Status</span>
                <span className={isDefaultAlive ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                  {isDefaultAlive ? "● Default Alive (Healthy)" : "▲ Fundraise Required (<18m)"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Board Pack Status</span>
                <span className="text-blue-400 font-semibold">Audit-Ready 1-Click Export</span>
              </div>
            </div>

            <button
              onClick={() => alert("Simulating Catalyx Board Deck PDF generation...")}
              className="w-full mt-8 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-3 rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              Generate Catalyx Investor Deck &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdvisoryCockpitSection() {
  const [clients, setClients] = useState([
    { name: "Veritas Logistics LLC", erp: "NetSuite", period: "Sep 2026", progress: 95, exceptions: 0, status: "Ready for Signoff" },
    { name: "Nordic Health Systems", erp: "SAP S/4", period: "Sep 2026", progress: 80, exceptions: 2, status: "Variance Review" },
    { name: "Apex SaaS Technologies", erp: "QuickBooks Online", period: "Sep 2026", progress: 100, exceptions: 0, status: "Signed & Filed" },
    { name: "Meridian Real Estate Fund", erp: "Yardi & NetSuite", period: "Sep 2026", progress: 65, exceptions: 5, status: "Intercompany Netting" },
    { name: "Beacon Retail Corp", erp: "Microsoft Dynamics", period: "Sep 2026", progress: 88, exceptions: 1, status: "Tax Accrual Check" },
  ]);

  const [signedCount, setSignedCount] = useState(1);

  const handleBatchSign = () => {
    setClients((prev) =>
      prev.map((c) =>
        c.exceptions === 0 ? { ...c, progress: 100, status: "Signed & Filed" } : c
      )
    );
    setSignedCount(2);
  };

  return (
    <div className="bg-white border-b border-slate-200/80 px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <SectionLabel text="CPA &amp; Advisory Workbench // ConsultEase" />
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
              Multi-Client Practice Command Center
            </h3>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Manage 50+ enterprise audit and advisory clients from a single governed pane of glass without logging in and out of different ERP instances.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleBatchSign}
              className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Batch Sign Cleared Workpapers ({signedCount} Signed)
            </button>
          </div>
        </div>

        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-3.5">Client Organization</th>
                  <th className="px-6 py-3.5">ERP Connection</th>
                  <th className="px-6 py-3.5">Close Progress</th>
                  <th className="px-6 py-3.5 text-center">Open Exceptions</th>
                  <th className="px-6 py-3.5">Audit Posture</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clients.map((c) => (
                  <tr key={c.name} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{c.name}</td>
                    <td className="px-6 py-4 text-slate-600 font-mono">{c.erp}</td>
                    <td className="px-6 py-4">
                      <div className="w-36 bg-slate-100 rounded-full h-2 overflow-hidden inline-block mr-2 align-middle">
                        <div
                          className="bg-purple-600 h-2 rounded-full transition-all"
                          style={{ width: `${c.progress}%` }}
                        />
                      </div>
                      <span className="font-mono text-slate-600 font-semibold">{c.progress}%</span>
                    </td>
                    <td className="px-6 py-4 text-center font-mono font-bold">
                      {c.exceptions === 0 ? (
                        <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          0
                        </span>
                      ) : (
                        <span className="text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {c.exceptions}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                          c.status === "Signed & Filed"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : c.status === "Ready for Signoff"
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-purple-600 hover:text-purple-800 font-bold hover:underline cursor-pointer">
                        Open Portal &rarr;
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function RuleEngineSimulatorSection() {
  const [isRunning, setIsRunning] = useState(false);
  const [hasRun, setHasRun] = useState(false);

  const simulateRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setHasRun(true);
    }, 1200);
  };

  return (
    <div className="bg-slate-50 border-b border-slate-200/80 px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <SectionLabel text="Core Engine // Sheshi Quanta" />
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Deterministic Rule Engine &amp; Invariant Matcher
          </h3>
          <p className="text-sm text-slate-600 mt-2">
            Experience how Sheshi validates transaction batches using zero-hallucination mathematical proofs rather than probabilistic guesses.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block mb-1">
                RULE SUITE // ASC 810 CONSOLIDATION &amp; NETTING
              </span>
              <h4 className="text-base font-bold text-slate-900">
                Sample Live Ingestion: Intercompany Transactions (EUR &amp; USD)
              </h4>
            </div>
            <button
              onClick={simulateRun}
              disabled={isRunning}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isRunning
                  ? "bg-slate-200 text-slate-500"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
              }`}
            >
              {isRunning ? "Evaluating Math Invariants..." : "Run Deterministic Engine ▶"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <span className="text-[10px] text-slate-500 font-mono uppercase block">Batch Ingestion</span>
              <p className="text-lg font-bold text-slate-900 font-mono mt-1">42,810 Tx / sec</p>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">✓ Zero Drop Rate</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <span className="text-[10px] text-slate-500 font-mono uppercase block">Model Integrity</span>
              <p className="text-lg font-bold text-slate-900 font-mono mt-1">Deterministic Math</p>
              <p className="text-[11px] text-blue-600 font-medium mt-1">0% LLM Hallucination Risk</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
              <span className="text-[10px] text-slate-500 font-mono uppercase block">Audit Verification</span>
              <p className="text-lg font-bold text-slate-900 font-mono mt-1">
                {hasRun ? "SHA-256 Provenance" : "Awaiting Execution"}
              </p>
              <p className="text-[11px] text-slate-600 font-medium mt-1">
                {hasRun ? "Hash: 9f82...c41a" : "Standard SOX Lock"}
              </p>
            </div>
          </div>

          <div className="bg-slate-900 text-white p-5 rounded-2xl font-mono text-xs overflow-x-auto">
            <div className="flex justify-between items-center pb-2 border-b border-slate-800 text-slate-400 text-[10px]">
              <span>LEDGER EVENT STREAM</span>
              <span>INVARIANT STATUS</span>
            </div>
            <div className="py-2 space-y-1.5 text-[11px]">
              <div className="flex justify-between text-slate-300">
                <span>[13:42:01.102] INGEST entity_us_subsidiary.journal_entry_#88412 ($1,420,000.00)</span>
                <span className="text-emerald-400">PASSED</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>[13:42:01.118] INGEST entity_eu_subsidiary.journal_entry_#41092 (€1,314,814.81)</span>
                <span className="text-emerald-400">PASSED</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>[13:42:01.144] REMEASURE fx_rate: ECB_DAILY_RATE(1.0800 USD/EUR)</span>
                <span className="text-emerald-400">VERIFIED</span>
              </div>
              {hasRun && (
                <div className="flex justify-between text-blue-300 bg-blue-950/70 p-1.5 rounded">
                  <span>[13:42:01.210] AUTO_ELIMINATE Intercompany account balance netting &rarr; Delta: $0.00</span>
                  <span className="text-emerald-300 font-bold">100% BALANCED</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FinancialStatementsViewerSection() {
  const [showXBRL, setShowXBRL] = useState(false);

  return (
    <div className="bg-white border-b border-slate-200/80 px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <SectionLabel text="Disclosure Intelligence // Sheshi FR" />
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
              Audited Financial Statement &amp; XBRL Tag Inspector
            </h3>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Examine live balance sheet lines with real-time XBRL taxonomy mappings and immutable ERP audit lineage.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowXBRL(!showXBRL)}
              className={`text-xs font-bold px-3.5 py-2 rounded-xl border transition-all cursor-pointer ${
                showXBRL
                  ? "bg-amber-500 text-white border-amber-600"
                  : "bg-white border-slate-300 text-slate-700 hover:bg-slate-50"
              }`}
            >
              {showXBRL ? "Hide XBRL Tags" : "Inspect XBRL Taxonomy"}
            </button>
          </div>
        </div>

        <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs bg-white">
          <div className="p-6 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <div>
              <h4 className="font-bold text-slate-900 text-base">Consolidated Balance Sheets (Unaudited)</h4>
              <p className="text-xs text-slate-500">Period Ended September 30, 2026 (in thousands)</p>
            </div>
            <span className="text-xs font-mono bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full font-semibold">
              Live Invariant: Balance Check Delta = $0.00
            </span>
          </div>

          <div className="divide-y divide-slate-100 text-xs font-mono">
            <div className="px-6 py-2.5 bg-slate-100/60 font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Assets // Current Assets
            </div>

            <div className="px-6 py-3.5 flex justify-between items-center hover:bg-slate-50">
              <div>
                <span className="font-sans font-medium text-slate-900 text-sm">Cash and cash equivalents</span>
                {showXBRL && (
                  <span className="block text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 mt-1">
                    us-gaap:CashAndCashEquivalentsAtCarryingValue
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-900 text-sm">$482,910</span>
                <span className="block text-[10px] text-emerald-600 font-sans">✓ Verified via JPMorgan API</span>
              </div>
            </div>

            <div className="px-6 py-3.5 flex justify-between items-center hover:bg-slate-50">
              <div>
                <span className="font-sans font-medium text-slate-900 text-sm">Accounts receivable, net</span>
                {showXBRL && (
                  <span className="block text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 mt-1">
                    us-gaap:AccountsReceivableNetCurrent
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-900 text-sm">$124,550</span>
                <span className="block text-[10px] text-slate-500 font-sans">99.1% Current (&lt;30 days)</span>
              </div>
            </div>

            <div className="px-6 py-3.5 flex justify-between items-center hover:bg-slate-50">
              <div>
                <span className="font-sans font-medium text-slate-900 text-sm">Prepaid expenses &amp; other</span>
                {showXBRL && (
                  <span className="block text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 mt-1">
                    us-gaap:PrepaidExpenseAndOtherAssetsCurrent
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className="font-bold text-slate-900 text-sm">$18,200</span>
                <span className="block text-[10px] text-slate-500 font-sans">Amortized monthly</span>
              </div>
            </div>

            <div className="px-6 py-3 bg-slate-100 font-bold text-slate-900 flex justify-between items-center text-sm">
              <span className="font-sans">Total Current Assets</span>
              <span>$625,660</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IntegrationsCatalogSection() {
  const [filter, setFilter] = useState("all");

  const integrations = [
    { name: "SAP S/4HANA", cat: "erp", latency: "12ms", desc: "Bi-directional streaming ledger sync via SAP OData and RFC connector.", logo: "SAP" },
    { name: "Oracle NetSuite", cat: "erp", latency: "14ms", desc: "SuiteAnalytics SuiteTalk integration with multi-subsidiary automated journal writes.", logo: "NS" },
    { name: "Workday Financials", cat: "erp", latency: "18ms", desc: "Enterprise interface connector for GL consolidation and workforce flux analysis.", logo: "WD" },
    { name: "Microsoft Dynamics 365", cat: "erp", latency: "15ms", desc: "Native Azure data lake bridge for real-time ledger variance monitoring.", logo: "MSD" },
    { name: "JPMorgan ACCESS", cat: "bank", latency: "5ms", desc: "Direct treasury cash concentration API with automated MT940 / BAI2 ingestion.", logo: "JPM" },
    { name: "HSBC Net Direct", cat: "bank", latency: "8ms", desc: "Cross-border global treasury and multi-currency liquidity sync.", logo: "HSBC" },
    { name: "Stripe Treasury & Billing", cat: "bank", latency: "2ms", desc: "Automated merchant payout reconciliations and dispute fee journalization.", logo: "STR" },
    { name: "Snowflake Financial Data Cloud", cat: "bi", latency: "22ms", desc: "Zero-copy cloning of audit ledger tables for enterprise FP&A modeling.", logo: "SNOW" },
  ];

  const filtered = filter === "all" ? integrations : integrations.filter((i) => i.cat === filter);

  return (
    <div className="bg-white border-b border-slate-200/80 px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <SectionLabel text="Integrations &amp; Connectors" />
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
              Direct Ingestion for Every Financial System
            </h3>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              Connect in minutes without custom engineering. Sheshi standardizes disparate charts of accounts into a single governed schema.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs">
            {[
              { id: "all", label: "All Integrations" },
              { id: "erp", label: "Core ERP" },
              { id: "bank", label: "Treasury & Banking" },
              { id: "bi", label: "BI & Data Warehouses" },
            ].map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  filter === c.id ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item.name}
              className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-blue-500/50 hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-extrabold text-xs text-blue-700 font-mono">
                    {item.logo}
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                    ⚡ {item.latency}
                  </span>
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-1">{item.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{item.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-blue-600">
                <span>View Schema Docs</span>
                <span>&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ResearchStudySection() {
  return (
    <div className="bg-slate-50 border-b border-slate-200/80 px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          <SectionLabel text="Benchmark Research Study // The Numbers Story" />
          <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            The Unstudied Journey of Financial Numbers
          </h3>
          <p className="text-sm md:text-base text-slate-600 max-w-3xl leading-relaxed mb-8">
            In Q1 2026, Sheshi surveyed 4,200 CFOs, Corporate Controllers, and Heads of Financial Reporting across the US, UK, and European Union to quantify the hidden labor between transaction capture and board presentation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-2xl">
              <span className="text-4xl font-extrabold text-blue-700 font-mono">78%</span>
              <h4 className="font-bold text-slate-900 text-sm mt-2 mb-1">Night &amp; Weekend Overtime</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Of senior controllers work after 10 PM during month-end close to reconcile spreadsheet formulas.
              </p>
            </div>
            <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-2xl">
              <span className="text-4xl font-extrabold text-blue-700 font-mono">142</span>
              <h4 className="font-bold text-slate-900 text-sm mt-2 mb-1">Linked Spreadsheets</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The average mid-market enterprise maintains 142 separate Excel files outside their governed ERP.
              </p>
            </div>
            <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-2xl">
              <span className="text-4xl font-extrabold text-blue-700 font-mono">41%</span>
              <h4 className="font-bold text-slate-900 text-sm mt-2 mb-1">Undetected Formula Errors</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Of board presentation packages contained at least one formula transposition caught only during external audit.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => alert("Downloading 'The Numbers Story (2026 Benchmark Report)'...")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Download Full 48-Page Research Report (PDF)
            </button>
            <span className="text-xs text-slate-500 font-mono">
              Free • Peer-Reviewed Methodology • Includes Benchmark Calculator
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function EventsScheduleSection() {
  const [activeDay, setActiveDay] = useState<1 | 2 | 3>(1);
  const [registered, setRegistered] = useState(false);

  const schedule = {
    1: [
      { time: "09:00 AM", title: "Opening Keynote: The Death of the Batch Close", speaker: "Goutham Sheshi, CEO & Founder" },
      { time: "11:00 AM", title: "Architecting Ledger Invariants vs LLM Hallucinations", speaker: "Dr. Elena Rostova, CTO" },
      { time: "02:30 PM", title: "Continuous Intercompany Netting Under ASC 810", speaker: "Marcus Vance, CPA" },
    ],
    2: [
      { time: "09:30 AM", title: "CFO Panel: Transitioning 45 Subsidiaries in 90 Days", speaker: "Enterprise CFO Roundtable" },
      { time: "01:00 PM", title: "Big 4 Audit Transformation: Federated Lineage Rooms", speaker: "Former PwC Audit Partners" },
      { time: "03:45 PM", title: "Hands-on Masterclass: Writing Custom Sheshi Quanta Rules", speaker: "Solutions Architecture Team" },
    ],
    3: [
      { time: "10:00 AM", title: "Autonomous Disclosure Filing & XBRL Validation", speaker: "SEC & Statutory Reporting Experts" },
      { time: "01:30 PM", title: "Product Roadmap 2027: Multi-Chain Treasury Settlement", speaker: "Head of Product" },
      { time: "04:00 PM", title: "Closing Gala & Sheshi Innovation Awards", speaker: "Executive Committee" },
    ],
  };

  return (
    <div className="bg-white border-b border-slate-200/80 px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <SectionLabel text="Sheshi Flagship Summit" />
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
              Sheshi NEXUS 2026 Summit Agenda
            </h3>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              October 14–16, 2026 • San Francisco, CA &amp; Live Digital Streaming. 3 days of intensive financial engineering masterclasses.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setActiveDay(1)}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeDay === 1 ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
              }`}
            >
              Day 1 (Architecture)
            </button>
            <button
              onClick={() => setActiveDay(2)}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeDay === 2 ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
              }`}
            >
              Day 2 (CFO Strategy)
            </button>
            <button
              onClick={() => setActiveDay(3)}
              className={`px-3.5 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeDay === 3 ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
              }`}
            >
              Day 3 (Future of FOS)
            </button>
          </div>
        </div>

        <div className="space-y-4 mb-10">
          {schedule[activeDay].map((s) => (
            <div
              key={s.time + s.title}
              className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-blue-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded">
                  {s.time}
                </span>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{s.title}</h4>
                  <p className="text-xs text-slate-500">{s.speaker}</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-blue-600">Track: Main Stage</span>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="font-bold text-slate-900 text-sm">Reserve Your In-Person or Digital Pass</p>
            <p className="text-xs text-slate-600">Complimentary access for verified Corporate Controllers, CFOs, and Audit Partners.</p>
          </div>
          <button
            onClick={() => setRegistered(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer shrink-0"
          >
            {registered ? "✓ Registration Confirmed!" : "Register for Sheshi NEXUS 2026"}
          </button>
        </div>
      </div>
    </div>
  );
}

function TrustComplianceAuditSection() {
  return (
    <div className="bg-white border-b border-slate-200/80 px-6 md:px-12 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Trust Center • System SLA: 99.994%
            </div>
            <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
              Enterprise Trust &amp; Independent Verification
            </h3>
            <p className="text-sm text-slate-600 mt-2 max-w-xl">
              We operate under continuous audit scrutiny. Every compliance report is available to authorized enterprise controllers and external auditors.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => alert("Downloading Sheshi SOC 2 Type II Executive Summary...")}
              className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Request SOC 2 Type II Pack
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-900">SOC 1 Type II (SSAE 18)</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                Verified
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Rigorous annual evaluation of controls relevant to internal control over financial reporting (ICFR). Audited by Big 4 CPA firm.
            </p>
            <span className="text-[11px] font-mono text-slate-500">Period: Nov 2025 – Oct 2026</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-900">SOC 2 Type II</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                Continuous
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Real-time programmatic evidence collection across all 5 Trust Services Criteria: Security, Availability, Confidentiality, Privacy, Processing Integrity.
            </p>
            <span className="text-[11px] font-mono text-slate-500">Automated Audit Sync</span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-900">ISO/IEC 27001:2022</span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                Certified
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              Global information security standard certification covering our cloud infrastructure, hardware security modules (HSMs), and software development lifecycle.
            </p>
            <span className="text-[11px] font-mono text-slate-500">Cert # ISMS-2026-9941</span>
          </div>
        </div>

        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
          <div className="p-5 bg-slate-50 border-b border-slate-200 font-bold text-slate-900 text-xs font-mono uppercase tracking-wider">
            Approved Sub-Processors &amp; Infrastructure Providers
          </div>
          <div className="divide-y divide-slate-100 text-xs">
            <div className="p-4 flex justify-between items-center hover:bg-slate-50">
              <div>
                <span className="font-bold text-slate-900">Amazon Web Services (AWS)</span>
                <span className="block text-[11px] text-slate-500">us-east-1 &amp; eu-central-1 Isolated Dedicated VPCs</span>
              </div>
              <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                Core Cloud Infrastructure
              </span>
            </div>
            <div className="p-4 flex justify-between items-center hover:bg-slate-50">
              <div>
                <span className="font-bold text-slate-900">Cloudflare Inc.</span>
                <span className="block text-[11px] text-slate-500">Enterprise DDoS Mitigation &amp; TLS 1.3 Edge Termination</span>
              </div>
              <span className="text-[10px] font-mono bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                Edge Security
              </span>
            </div>
          </div>
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
    <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 text-white px-6 md:px-12 py-20 border-t border-blue-800 text-center relative overflow-hidden shadow-inner">
      <div className="max-w-3xl mx-auto relative z-10">
        <span className="inline-block text-xs font-bold text-blue-200 uppercase tracking-widest mb-3 font-mono">
          GET STARTED WITH SHESHI
        </span>
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{title}</h3>
        <p className="text-sm md:text-base text-blue-100 mb-8 leading-relaxed max-w-2xl mx-auto">{subtitle}</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => navigate && navigate({ page: "contact" })}
            className="bg-white hover:bg-blue-50 text-blue-800 font-bold px-7 py-3 rounded-xl text-sm shadow-lg transition-all cursor-pointer"
          >
            Request an Executive Conversation
          </button>
          <button
            onClick={() => {
              const el = document.getElementById("sitemap-flowchart");
              el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="border border-white/40 text-white hover:bg-white/10 px-6 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer"
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
    case "founderletter": return <FounderLetterSection key={i} />;
    case "leadership": return <LeadershipSection key={i} />;
    case "careers": return <CareersJobBoardSection key={i} />;
    case "closetimeline": return <CloseTimelineSection key={i} />;
    case "startupforecaster": return <StartupRunwayForecasterSection key={i} />;
    case "advisorycockpit": return <AdvisoryCockpitSection key={i} />;
    case "ruleengine": return <RuleEngineSimulatorSection key={i} />;
    case "financialstatements": return <FinancialStatementsViewerSection key={i} />;
    case "integrationscatalog": return <IntegrationsCatalogSection key={i} />;
    case "researchstudy": return <ResearchStudySection key={i} />;
    case "eventsschedule": return <EventsScheduleSection key={i} />;
    case "trustaudit": return <TrustComplianceAuditSection key={i} />;
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
      sections: [{ type: "founderletter" }, { type: "metrics", count: 4 }, { type: "casestudies" }, { type: "ctaband" }],
    },
    story: {
      title: "Our Story",
      subtitle: "How two decades in professional accounting practice revealed the hidden risks of un-governed financial spreadsheets.",
      hero: "split",
      sections: [{ type: "founderletter" }, { type: "closetimeline" }, { type: "testimonial" }, { type: "ctaband" }],
    },
    leadership: {
      title: "Executive Leadership",
      subtitle: "Chartered Accountants and distributed systems engineers uniting deep financial practice with modern infrastructure.",
      hero: "split",
      sections: [{ type: "leadership" }, { type: "trustbadges" }, { type: "ctaband" }],
    },
    team: {
      title: "Our Global Team",
      subtitle: "28+ countries represented across financial engineering, distributed consensus, and client advisory.",
      hero: "split",
      sections: [{ type: "culturevalues" }, { type: "leadership" }, { type: "ctaband" }],
    },
    culture: {
      title: "People - and culture",
      subtitle: "Our core principles, radical transparency, global inclusion, and life inside Sheshi.",
      hero: "split",
      sections: [{ type: "culturevalues" }, { type: "careers" }, { type: "testimonial" }, { type: "ctaband" }],
    },
    careers: {
      title: "Careers at Sheshi",
      subtitle: "Build the future of governed financial intelligence. Competitive equity, remote-first autonomy, and deep impact.",
      hero: "split",
      sections: [{ type: "culturevalues" }, { type: "careers" }, { type: "faq" }, { type: "ctaband" }],
    },
  },
  solutions: {
    enterprise: {
      title: "Enterprise Finance",
      subtitle: "Complex multi-entity consolidation, SOX compliance, and continuous close for global organizations.",
      hero: "split",
      sections: [{ type: "closetimeline" }, { type: "metrics", count: 4 }, { type: "ruleengine" }, { type: "casestudies" }, { type: "ctaband" }],
    },
    startup: {
      title: "Startup & Scaleup Finance",
      subtitle: "Burn oversight, investor runway predictability, and board pack automation for high-growth ventures.",
      hero: "split",
      sections: [{ type: "startupforecaster" }, { type: "featurecards", count: 3 }, { type: "casestudies" }, { type: "ctaband" }],
    },
    consulting: {
      title: "Consulting & Advisory Firms",
      subtitle: "Empower your advisory engagements with automated client reconciliation and white-label governance.",
      hero: "split",
      sections: [{ type: "advisorycockpit" }, { type: "capgrid", count: 6 }, { type: "testimonial" }, { type: "ctaband" }],
    },
    professionals: {
      title: "Finance Professionals",
      subtitle: "Purpose-built workbench for CFOs, controllers, and FP&A analysts to eliminate manual re-keying.",
      hero: "split",
      sections: [{ type: "closetimeline" }, { type: "financialstatements" }, { type: "faq" }, { type: "ctaband" }],
    },
  },
  technology: {
    fos: {
      title: "Financial Operating System",
      subtitle: "The authoritative infrastructure layer that sits between your transaction ERP and board outputs.",
      hero: "centered",
      sections: [{ type: "ruleengine" }, { type: "integrationscatalog" }, { type: "capgrid", count: 6 }, { type: "ctaband" }],
    },
    ai: {
      title: "AI & Automation",
      subtitle: "Autonomous variance detection, flux analysis agents, and audit-ready machine learning workflows.",
      hero: "centered",
      sections: [{ type: "ruleengine" }, { type: "metrics", count: 5 }, { type: "faq" }, { type: "ctaband" }],
    },
    integrations: {
      title: "ERP & Data Integrations",
      subtitle: "Pre-built connectors for SAP, NetSuite, Workday, Microsoft Dynamics, QuickBooks, and Salesforce.",
      hero: "split",
      sections: [{ type: "integrationscatalog" }, { type: "ruleengine" }, { type: "ctaband" }],
    },
    security: {
      title: "Security & Compliance",
      subtitle: "Enterprise-grade AES-256 encryption, SOC 1/2 compliance, and immutable cryptographic audit trails.",
      hero: "split",
      sections: [{ type: "trustaudit" }, { type: "trustbadges" }, { type: "ctaband" }],
    },
    trust: {
      title: "Trust Center",
      subtitle: "Real-time security posture, compliance certifications, sub-processors, and system status transparency.",
      hero: "centered",
      sections: [{ type: "trustaudit" }, { type: "trustbadges" }, { type: "faq" }, { type: "ctaband" }],
    },
  },
  resources: {
    blog: {
      title: "Sheshi Perspectives & Blog",
      subtitle: "Engineering insights, financial governance frameworks, and continuous close case studies.",
      hero: "split",
      sections: [{ type: "casestudies" }, { type: "featurecards", count: 3 }, { type: "ctaband" }],
    },
    insights: {
      title: "Executive Insights",
      subtitle: "In-depth research on financial operations, multi-entity complexity, and autonomous close architecture.",
      hero: "split",
      sections: [{ type: "researchstudy" }, { type: "closetimeline" }, { type: "ctaband" }],
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
      sections: [{ type: "researchstudy" }, { type: "metrics", count: 4 }, { type: "casestudies" }, { type: "ctaband" }],
    },
    events: {
      title: "Events & Summits",
      subtitle: "Join us at Sheshi NEXUS 2026, CFO leadership roundtables, and regional financial engineering symposiums.",
      hero: "split",
      sections: [{ type: "eventsschedule" }, { type: "eventsfeatured" }, { type: "ctaband" }],
    },
    webinars: {
      title: "Webinars & Masterclasses",
      subtitle: "Learn continuous close techniques, automated flux analysis, and ERP governance from practicing leaders.",
      hero: "split",
      sections: [{ type: "videocards" }, { type: "eventsschedule" }, { type: "ctaband" }],
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
      sections: [{ type: "integrationscatalog" }, { type: "featurecards", count: 3 }, { type: "ctaband" }],
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
  topics: {
    "financial-consolidation": {
      title: "Financial Consolidation Software",
      subtitle: "Multi-entity accounting, automated currency netting, and GAAP / IFRS statutory reporting in a single governed ledger.",
      hero: "centered",
      sections: [{ type: "ruleengine" }, { type: "financialstatements" }, { type: "faq" }, { type: "ctaband" }],
    },
    "continuous-close": {
      title: "Continuous Financial Close",
      subtitle: "Shift from high-stress 15-day batch closes to continuous streaming ledger verification with zero day-end chaos.",
      hero: "centered",
      sections: [{ type: "closetimeline" }, { type: "metrics", count: 4 }, { type: "faq" }, { type: "ctaband" }],
    },
    "account-reconciliation": {
      title: "Autonomous Account Reconciliation",
      subtitle: "Deterministic algorithmic matching across ERPs, bank statements, and payment gateways with 99.4% match rates.",
      hero: "centered",
      sections: [{ type: "ruleengine" }, { type: "advisorycockpit" }, { type: "faq" }, { type: "ctaband" }],
    },
    "intercompany-accounting": {
      title: "Intercompany Accounting & Eliminations",
      subtitle: "Eliminate cross-border transfer pricing discrepancies, dispute emails, and manual journal writebacks.",
      hero: "centered",
      sections: [{ type: "ruleengine" }, { type: "financialstatements" }, { type: "faq" }, { type: "ctaband" }],
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
  if (productId === "quanta") {
    return (
      <QuantaSubsite
        productPage={productPage}
        setProductPage={setProductPage}
        navigate={navigate}
      />
    );
  }

  if (productId === "catalyx") {
    return (
      <CatalyxSubsite
        productPage={productPage}
        setProductPage={setProductPage}
        navigate={navigate}
      />
    );
  }

  if (productId === "consultease") {
    return (
      <ConsultEaseSubsite
        productPage={productPage}
        setProductPage={setProductPage}
        navigate={navigate}
      />
    );
  }

  if (productId === "sheshifr") {
    return (
      <SheshiFRSubsite
        productPage={productPage}
        setProductPage={setProductPage}
        navigate={navigate}
      />
    );
  }

  return null;
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
      id: "topics",
      title: "Topics & Guides",
      icon: "📖",
      color: "#2563eb",
      tagline: "Searchable Technical Accounting Guides",
      route: { page: "topics" },
      leaves: [
        { id: "topic-consolidation", label: "Financial Consolidation Software", route: { page: "topics", sub: "financial-consolidation" }, tagline: "Multi-entity accounting & currency netting" },
        { id: "topic-close", label: "Continuous Financial Close", route: { page: "topics", sub: "continuous-close" }, tagline: "Shift from 15-day batch close to real-time" },
        { id: "topic-rec", label: "Autonomous Account Reconciliation", route: { page: "topics", sub: "account-reconciliation" }, tagline: "Algorithmic matching & ERP auto-sync" },
        { id: "topic-intercompany", label: "Intercompany Accounting", route: { page: "topics", sub: "intercompany-accounting" }, tagline: "Automated eliminations & transfer pricing" },
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
            <img src={logoImg} alt="Sheshi Logo" className="h-7 w-7 object-contain" />
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
    <footer className="bg-slate-50 text-slate-600 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="col-span-2">
          <div className="flex items-center gap-2 font-bold text-xl mb-3 tracking-tight text-slate-900">
            <img src={logoImg} alt="Sheshi Logo" className="h-7 w-7 object-contain" />
            <span>SHESHI</span>
          </div>
          <p className="text-slate-600 text-xs max-w-sm leading-relaxed mb-4">
            The Financial Operating System &mdash; the governed layer between your ERP and every financial output your organisation produces.
          </p>
          <p className="text-[11px] text-slate-500 font-mono">
            Close, plan, consolidate, analyse, collaborate, report.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 font-mono">Products</p>
          <ul className="space-y-2.5 text-xs text-slate-600">
            {PRODUCTS.map((p) => (
              <li key={p.id}>
                <button
                  onClick={() => navigate({ page: "products", sub: p.id, productPage: "home" })}
                  className="hover:text-blue-600 transition-colors cursor-pointer text-left"
                >
                  {p.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 font-mono">Company</p>
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li><button onClick={() => navigate({ page: "company", sub: "about" })} className="hover:text-blue-600 transition-colors cursor-pointer">About Sheshi</button></li>
            <li><button onClick={() => navigate({ page: "company", sub: "story" })} className="hover:text-blue-600 transition-colors cursor-pointer">Our Story</button></li>
            <li><button onClick={() => navigate({ page: "company", sub: "leadership" })} className="hover:text-blue-600 transition-colors cursor-pointer">Leadership</button></li>
            <li><button onClick={() => navigate({ page: "company", sub: "culture" })} className="hover:text-blue-600 transition-colors cursor-pointer">People &amp; Culture</button></li>
            <li><button onClick={() => navigate({ page: "company", sub: "careers" })} className="hover:text-blue-600 transition-colors cursor-pointer">Careers</button></li>
            <li><button onClick={() => navigate({ page: "resources", sub: "blog" })} className="hover:text-blue-600 transition-colors cursor-pointer text-blue-600 font-semibold">Engineering Blog</button></li>
            <li><button onClick={() => navigate({ page: "resources", sub: "events" })} className="hover:text-blue-600 transition-colors cursor-pointer">Events</button></li>
            <li><button onClick={() => navigate({ page: "contact" })} className="hover:text-blue-600 transition-colors cursor-pointer">Contact Us</button></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 font-mono">Governance &amp; Trust</p>
          <ul className="space-y-2.5 text-xs text-slate-600">
            <li><button onClick={() => navigate({ page: "technology", sub: "trust" })} className="hover:text-blue-600 transition-colors cursor-pointer text-blue-600 font-semibold">Trust Center (99.99%)</button></li>
            <li><button onClick={() => navigate({ page: "technology", sub: "security" })} className="hover:text-blue-600 transition-colors cursor-pointer">Security Disclosure</button></li>
            <li><button onClick={() => navigate({ page: "legal", sub: "privacy" })} className="hover:text-blue-600 transition-colors cursor-pointer">Privacy Policy</button></li>
            <li><button onClick={() => navigate({ page: "legal", sub: "terms" })} className="hover:text-blue-600 transition-colors cursor-pointer">Terms of Service</button></li>
            <li><button onClick={() => navigate({ page: "legal", sub: "cookies" })} className="hover:text-blue-600 transition-colors cursor-pointer">Cookie Policy</button></li>
            <li><button onClick={() => navigate({ page: "legal", sub: "sitemap" })} className="hover:text-blue-600 transition-colors cursor-pointer">System Sitemap</button></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 px-6 md:px-12 py-5 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
        <p>&copy; 2026 Sheshi Technologies Inc. Built from inside finance for the world outside it.</p>
        <div className="flex gap-4">
          <span className="hover:text-blue-600 cursor-pointer">LinkedIn</span>
          <span className="hover:text-blue-600 cursor-pointer">Twitter / X</span>
          <span className="hover:text-emerald-700 font-semibold cursor-pointer">SOC 2 Type II Verified</span>
        </div>
      </div>
    </footer>
  );
}

// ─── Router & Root Component ──────────────────────────────────────────────────

function resolvePageComponent(route: Route, navigate: (r: Route) => void) {
  if (route.page === "home") return <HomePage navigate={navigate} />;
  if (route.page === "company") return <CompanyPages sub={route.sub} navigate={navigate} />;
  if (route.page === "solutions") return <SolutionsPages sub={route.sub} navigate={navigate} />;
  if (route.page === "technology") return <TechnologyPages sub={route.sub} navigate={navigate} />;
  if (route.page === "resources") return <ResourcesPages sub={route.sub} slug={route.slug} navigate={navigate} />;
  if (route.page === "blog") return <ResourcesPages sub="blog" slug={route.slug} navigate={navigate} />;
  if (route.page === "partners") return <PartnersPages sub={route.sub} navigate={navigate} />;
  if (route.page === "topics" && route.sub) return <TopicsPages sub={route.sub} navigate={navigate} />;
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

  if (route.page === "topics" && !route.sub) {
    return (
      <div>
        <PageHero
          title="Searchable Financial Topics &amp; Practice Guides"
          subtitle="Authoritative guides on multi-entity consolidation, continuous close architecture, autonomous reconciliation, and intercompany accounting."
          breadcrumb={["Home", "Topics & Guides"]}
        />
        <div className="bg-white px-6 md:px-12 py-20 border-b border-slate-200/80">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                id: "financial-consolidation",
                title: "Financial Consolidation Software",
                desc: "How enterprises automate multi-tier subsidiary consolidation, currency remeasurement, and equity netting under ASC 810 and IFRS 10.",
                tag: "Consolidation Guide",
              },
              {
                id: "continuous-close",
                title: "Continuous Financial Close",
                desc: "Shift from high-stress 15-day batch closes to continuous streaming ledger verification with zero day-end chaos.",
                tag: "Close Cycle Guide",
              },
              {
                id: "account-reconciliation",
                title: "Autonomous Account Reconciliation",
                desc: "Deterministic algorithmic matching across ERPs, bank statements, and payment gateways with 99.4% match rates.",
                tag: "Reconciliation Guide",
              },
              {
                id: "intercompany-accounting",
                title: "Intercompany Accounting & Eliminations",
                desc: "Eliminate cross-border transfer pricing discrepancies, dispute emails, and manual journal writebacks.",
                tag: "Intercompany Guide",
              },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => navigate({ page: "topics", sub: t.id })}
                className="text-left bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-500 hover:shadow-lg transition-all group cursor-pointer"
              >
                <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
                  {t.tag}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {t.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{t.desc}</p>
                <span className="text-xs font-semibold text-blue-600 group-hover:underline">
                  Read complete practice guide &rarr;
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

  useEffect(() => {
    function handleHash() {
      const hash = window.location.hash.replace(/^#\/?/, "");
      if (!hash) return;
      const parts = hash.split("/");
      if (parts[0] === "products" && parts[1]) {
        setRoute({ page: "products", sub: parts[1], productPage: parts[2] || "home" });
      } else if (parts[0] === "resources" && (parts[1] === "blog" || parts[1] === "insights") && parts[2]) {
        setRoute({ page: "resources", sub: parts[1], slug: parts[2] });
      } else if (parts[0] === "blog" && parts[1]) {
        setRoute({ page: "resources", sub: "blog", slug: parts[1] });
      } else if (parts[0] === "blog") {
        setRoute({ page: "resources", sub: "blog" });
      } else if (parts[0]) {
        setRoute({ page: parts[0], sub: parts[1] });
      }
    }
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  function navigate(r: Route) {
    setRoute(r);
    let hash = "#/" + r.page;
    if (r.sub) hash += "/" + r.sub;
    if (r.slug) hash += "/" + r.slug;
    if (r.productPage) hash += "/" + r.productPage;
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function setProductPage(p: string) {
    setRoute((prev) => {
      const updated = { ...prev, productPage: p };
      let hash = "#/products/" + (prev.sub || "quanta") + "/" + p;
      window.location.hash = hash;
      return updated;
    });
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
