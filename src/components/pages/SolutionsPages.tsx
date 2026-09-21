import { useState } from "react";
import { Route } from "../../types";

export default function SolutionsPages({
  sub,
  navigate,
}: {
  sub?: string;
  navigate: (r: Route) => void;
}) {
  switch (sub) {
    case "enterprise":
      return <EnterpriseSolutionPage navigate={navigate} />;
    case "startup":
      return <StartupSolutionPage navigate={navigate} />;
    case "consulting":
      return <ConsultingSolutionPage navigate={navigate} />;
    case "professionals":
      return <ProfessionalsSolutionPage navigate={navigate} />;
    default:
      return <EnterpriseSolutionPage navigate={navigate} />;
  }
}

// ═════════════════════════════════════════════════════════════════════════════════
// 1. ENTERPRISE FINANCE SOLUTION
// ═════════════════════════════════════════════════════════════════════════════════

function EnterpriseSolutionPage({ navigate }: { navigate: (r: Route) => void }) {
  const [activeDay, setActiveDay] = useState(0);

  const days = [
    { day: "Day -5", title: "Pre-Close Ingestion", legacy: "Manual accrual estimates in Excel", sheshi: "Verity auto-computes PO & receipt accruals directly from ERP" },
    { day: "Day -1", title: "Subledger Verification", legacy: "Waiting for AP/AR subledger freezes", sheshi: "99.4% of subledgers pre-matched & verified in real time" },
    { day: "Day 0", title: "Period Cutoff & Lock", legacy: "High-stress overnight batch processing", sheshi: "Trial balance sealed at 00:00 with cryptographic provenance" },
    { day: "Day +1", title: "Consolidation & Netting", legacy: "Intercompany email disputes & manual FX", sheshi: "Automated reciprocal elimination journals under ASC 810" },
    { day: "Day +2", title: "Executive Board Packs", legacy: "Copy-pasting tables into PowerPoint", sheshi: "Instant board disclosures generated with drill-down audit trail" },
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs mb-4">
            Enterprise Finance Architecture
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4 leading-tight">
            Continuous Close &amp; Multi-Entity Governance for Global Enterprises
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Eliminate weeks of chaotic month-end fire drills. Streamline 100+ subsidiary rollups with zero-batch
            latency, mathematical invariant enforcement, and automated SOX 404 audit trails.
          </p>
        </div>

        {/* Interactive Close Timeline Compression */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 mb-16 shadow-xs">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
            The Close Timeline Compression: Legacy 15-Day Batch vs Sheshi
          </h2>
          <p className="text-xs text-slate-500 text-center mb-10 max-w-md mx-auto">
            Click each milestone to contrast legacy manual operations against Sheshi streaming automation.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-8">
            {days.map((d, i) => (
              <button
                key={i}
                onClick={() => setActiveDay(i)}
                className={`p-3 rounded-xl text-center border cursor-pointer transition-all ${
                  activeDay === i
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <div className="text-xs font-mono font-bold">{d.day}</div>
                <div className="text-[11px] truncate mt-0.5">{d.title}</div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-xl bg-slate-50 border border-slate-200">
            <div className="p-5 bg-white rounded-xl border border-rose-200 text-left">
              <span className="text-[10px] font-mono font-bold text-rose-600 uppercase px-2 py-0.5 rounded bg-rose-50 border border-rose-200">
                LEGACY 15-DAY BATCH PROCESS
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2 mb-2">{days[activeDay].title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{days[activeDay].legacy}</p>
            </div>

            <div className="p-5 bg-white rounded-xl border border-blue-300 text-left shadow-xs">
              <span className="text-[10px] font-mono font-bold text-blue-700 uppercase px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                SHESHI CONTINUOUS STREAM
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-2 mb-2">{days[activeDay].title}</h3>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">{days[activeDay].sheshi}</p>
            </div>
          </div>
        </div>

        {/* 3 Enterprise Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 bg-white rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">ASC 810 &amp; IFRS 10 Consolidation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Consolidate dozens of subsidiaries across differing charts of accounts, functional currencies, and
              tax jurisdictions with automated netting journals.
            </p>
          </div>
          <div className="p-8 bg-white rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">SOX 404 Control Enforcement</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Continuous mathematical testing of segregation of duties, journal authorization thresholds, and
              trial balance invariants.
            </p>
          </div>
          <div className="p-8 bg-white rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Big 4 Auditor Vault Access</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Eliminate weeks of chaotic PBC sample gathering. External audit teams inspect cryptographic block
              hashes tied directly to ERP source vouchers.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate({ page: "products", sub: "quanta" })}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer mr-3"
          >
            Explore Quanta Enterprise Platform →
          </button>
          <button
            onClick={() => navigate({ page: "contact" })}
            className="px-6 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs shadow-xs transition-all cursor-pointer"
          >
            Schedule Enterprise Consultation
          </button>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// 2. STARTUP & SCALEUP FINANCE
// ═════════════════════════════════════════════════════════════════════════════════

function StartupSolutionPage({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs mb-4">
            Startup &amp; Scaleup Finance
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Runway Predictability &amp; Investor Confidence
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From pre-seed to Series C. Replace broken Google Sheets with live bank integrations, dynamic hiring
            plans, and 1-click investor board updates.
          </p>
        </div>

        {/* Growth Stages Roadmap */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { stage: "Pre-Seed & Seed", focus: "Cash Runway & Burn Alerts", desc: "Connect Mercury and Stripe in 60 seconds to get daily burn alerts and exact zero-cash date forecasts." },
            { stage: "Series A", focus: "Unit Economics & Headcount", desc: "Model hiring plans with tax/benefits sensitivity, track CAC/LTV cohorts, and generate monthly VC memos." },
            { stage: "Series B & Growth", focus: "Multi-Entity & GAAP Revenue", desc: "ASC 606 revenue recognition, international subsidiary setup, and audit-ready schedules." },
          ].map((item, i) => (
            <div key={i} className="p-8 bg-white rounded-2xl border border-slate-200">
              <div className="text-xs font-mono font-bold text-emerald-600 mb-1">{item.focus}</div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">{item.stage}</h2>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate({ page: "products", sub: "catalyx" })}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer mr-3"
          >
            Launch Catalyx for Startups →
          </button>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// 3. CONSULTING & ADVISORY FIRMS
// ═════════════════════════════════════════════════════════════════════════════════

function ConsultingSolutionPage({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-800 border border-purple-200 shadow-xs mb-4">
            Advisory &amp; CAS Practices
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            3.4x Client Capacity Without Staff Burnout
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Empower your firm to transition from low-margin hourly bookkeeping to high-value strategic CFO
            advisory retainers with white-labeled client portals and standardized workpaper signoffs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 bg-white rounded-2xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Multi-Tenant Client Roster</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Inspect month-end close progress across 50+ client accounts from a single unified master cockpit.
            </p>
          </div>
          <div className="p-8 bg-white rounded-2xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Automated Workpaper Review</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Staff draft &rarr; Senior review &rarr; Partner signoff &rarr; Client delivery with AICPA compliance.
            </p>
          </div>
          <div className="p-8 bg-white rounded-2xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-2">White-Labeled Portals</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Your firm logo and custom URL (portal.yourfirm.com) for client KPI presentations and secure file drop.
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate({ page: "products", sub: "consultease" })}
            className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer mr-3"
          >
            Explore ConsultEase for Firms →
          </button>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// 4. FINANCE PROFESSIONALS
// ═════════════════════════════════════════════════════════════════════════════════

function ProfessionalsSolutionPage({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 shadow-xs mb-4">
            For Corporate Controllers &amp; CFOs
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Built by Controllers, for Controllers
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Eliminate repetitive manual journal entry creation, un-reconciled suspense accounts, and late-night
            spreadsheet formulas during audit season.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 bg-white rounded-2xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Direct Trial Balance Tie-Out</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every balance sheet footnote and schedule maintains an immutable link to underlying ERP journal vouchers.
            </p>
          </div>
          <div className="p-8 bg-white rounded-2xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Automated Variance Commentary</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Threshold-triggered flux analysis automatically prompts department owners for structured commentary.
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate({ page: "products", sub: "sheshifr" })}
            className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer mr-3"
          >
            Inspect Sheshi FR Suite →
          </button>
        </div>
      </div>
    </div>
  );
}
