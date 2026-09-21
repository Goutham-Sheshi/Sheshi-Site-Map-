import { Route } from "../../types";

export default function TopicsPages({
  sub,
  navigate,
}: {
  sub?: string;
  navigate: (r: Route) => void;
}) {
  switch (sub) {
    case "financial-consolidation":
      return <FinancialConsolidationGuide navigate={navigate} />;
    case "continuous-close":
      return <ContinuousCloseGuide navigate={navigate} />;
    case "account-reconciliation":
      return <AccountReconciliationGuide navigate={navigate} />;
    case "intercompany-accounting":
      return <IntercompanyAccountingGuide navigate={navigate} />;
    default:
      return <FinancialConsolidationGuide navigate={navigate} />;
  }
}

// ═════════════════════════════════════════════════════════════════════════════════
// 1. FINANCIAL CONSOLIDATION SOFTWARE GUIDE
// ═════════════════════════════════════════════════════════════════════════════════

function FinancialConsolidationGuide({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs mb-4">
            Searchable Practice Guide &bull; ASC 810 / IFRS 10
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Financial Consolidation Software for Multinational Enterprises
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            How global organizations automate multi-tier subsidiary rollups, foreign currency translation adjustments,
            and intercompany eliminations without manual spreadsheet errors.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs mb-12 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900">What is Financial Consolidation Software?</h2>
          <p>
            Financial consolidation software aggregates financial data across multiple legal operating subsidiaries,
            business units, and foreign entities into a single, compliant set of consolidated financial statements.
            Under US-GAAP (ASC 810) and IFRS (IFRS 10), parent corporations must present the financial results of all
            controlled entities as if they were a single economic organization.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
            Key Architectural Challenges in Legacy Consolidation
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">Disparate Charts of Accounts</h3>
              <p className="text-xs text-slate-600">
                Acquired companies often run legacy ERPs with non-standard account numbering, requiring complex mapping.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 mb-1">Currency Remeasurement Drift</h3>
              <p className="text-xs text-slate-600">
                Distinguishing between functional currency translation and transactional remeasurement under ASC 830.
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
            How Sheshi Quanta Automates Consolidation
          </h2>
          <p>
            Rather than relying on periodic batch rollup jobs, Sheshi Quanta continuously streams trial balance
            mutations into a real-time consolidation state machine. When a subsidiary in Germany or Singapore posts a
            transaction in local currency, reciprocal intercompany balances are matched, elimination journals are
            computed, and the group consolidated balance sheet is updated in sub-second time.
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate({ page: "products", sub: "quanta", productPage: "solutions" })}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
          >
            Explore Quanta Consolidation Engine →
          </button>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// 2. CONTINUOUS FINANCIAL CLOSE GUIDE
// ═════════════════════════════════════════════════════════════════════════════════

function ContinuousCloseGuide({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs mb-4">
            Practice Guide &bull; Modern Close Architecture
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            The Continuous Financial Close Architecture
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Shifting from high-stress 15-day batch closes to continuous streaming ledger verification with zero
            period-end chaos.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs mb-12 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900">The Problem with the Batch Close</h2>
          <p>
            The traditional month-end close is an anachronism from the 1970s mainframe computing era. Because legacy
            ERPs lacked the processing capacity to maintain real-time trial balances, companies established a calendar
            cadence where accounts were &quot;frozen&quot; for days while accounting teams worked through backlogs.
          </p>
          <p>
            The result is that financial statements reflect information that is 15 to 20 days old, leaving executive
            leadership navigating the business through a rearview mirror.
          </p>

          <h2 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
            Principles of Continuous Streaming Accounting
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Intraday Ingestion:</strong> Bank statements and clearing feeds stream via Kafka CDC throughout the month.</li>
            <li><strong>Automated Pre-Matching:</strong> Algorithmic matching runs as transactions occur, achieving 99.4% certification by Day -1.</li>
            <li><strong>Continuous Accrual Calculations:</strong> Predictive algorithms monitor POs and receipts rather than relying on manual spreadsheets.</li>
            <li><strong>Immediate Anomaly Alerts:</strong> Unusual postings trigger immediate controller reviews rather than being uncovered weeks later.</li>
          </ul>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate({ page: "products", sub: "quanta", productPage: "platform" })}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
          >
            Inspect Continuous Close Platform →
          </button>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// 3. AUTONOMOUS ACCOUNT RECONCILIATION
// ═════════════════════════════════════════════════════════════════════════════════

function AccountReconciliationGuide({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs mb-4">
            Practice Guide &bull; Autonomous Matching
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Autonomous Account Reconciliation
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Deterministic algorithmic matching across ERPs, bank statements, and payment gateways with 99.4%
            zero-touch certification rates.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs mb-12 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900">Why Manual Reconciliations Fail</h2>
          <p>
            Reconciliations account for over 40% of the time spent during the financial close. When done in spreadsheets,
            teams manually compare rows, look up reference numbers, and post manual balancing journal entries that
            obscure transaction history.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
            Algorithmic Matching Hierarchy
          </h2>
          <p>
            Sheshi applies a deterministic matching hierarchy: exact 1:1 matching on monetary amounts and ISO
            reference codes, followed by 1:M and M:M matching with configurable monetary tolerances and fuzzy
            Levenshtein string metrics. Zero-balance accounts are auto-certified, leaving human controllers to focus
            solely on true material exceptions.
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate({ page: "products", sub: "quanta", productPage: "capabilities" })}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
          >
            Explore Reconciliations Module →
          </button>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// 4. INTERCOMPANY ACCOUNTING & ELIMINATIONS
// ═════════════════════════════════════════════════════════════════════════════════

function IntercompanyAccountingGuide({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs mb-4">
            Practice Guide &bull; Bilateral Netting
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Intercompany Accounting &amp; Eliminations
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Eliminating cross-border transfer pricing discrepancies, intercompany dispute threads, and manual
            elimination journal writebacks under ASC 810.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 shadow-xs mb-12 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900">The Intercompany Trap</h2>
          <p>
            When a US entity bills an entity in London for management fees or intellectual property, currency
            fluctuations, invoice receipt delays, and differing chart of account codes routinely cause balances to
            fall out of alignment. At year-end, external auditors scrutinize these un-reconciled intercompany items
            as primary indicators of internal control deficiency.
          </p>
          <h2 className="text-xl font-bold text-slate-900 pt-4 border-t border-slate-100">
            Automated Bilateral Elimination
          </h2>
          <p>
            Sheshi creates a unified bilateral clearing registry across all entities. When one entity records an
            intercompany invoice, the reciprocal entity&apos;s payable is generated simultaneously. Currency conversion rates
            are locked to statutory daily feeds, ensuring that reciprocal balances net to zero with zero manual
            disputes.
          </p>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate({ page: "products", sub: "quanta", productPage: "solutions" })}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
          >
            Inspect Intercompany Elimination Engine →
          </button>
        </div>
      </div>
    </div>
  );
}
