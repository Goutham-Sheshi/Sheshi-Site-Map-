import { useState } from "react";
import { Route } from "../../types";

export default function SheshiFRSubsite({
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
    { id: "features", label: "Features" },
    { id: "workflows", label: "Workflows" },
    { id: "professionals", label: "For Controllers" },
    { id: "resources", label: "Resources" },
    { id: "contact", label: "Request Demo" },
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
              <div className="w-8 h-8 rounded-lg bg-amber-600 flex items-center justify-center text-white font-extrabold text-sm shadow-sm group-hover:bg-amber-700 transition-colors">
                FR
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
                  Sheshi FR
                </span>
                <span className="text-[10px] font-mono text-amber-600 tracking-wider uppercase font-semibold">
                  Autonomous Reporting Suite
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
                      ? "bg-white text-amber-800 shadow-xs border border-slate-200/60"
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
              className="text-xs text-white font-semibold px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              Request Demo
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
                  ? "bg-white text-amber-800 shadow-xs border border-slate-200"
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
        {productPage === "home" && <SheshiFROverviewTab setProductPage={setProductPage} />}
        {productPage === "features" && <SheshiFRFeaturesTab setProductPage={setProductPage} />}
        {productPage === "workflows" && <SheshiFRWorkflowsTab setProductPage={setProductPage} />}
        {productPage === "professionals" && <SheshiFRProfessionalsTab setProductPage={setProductPage} />}
        {productPage === "resources" && <SheshiFRResourcesTab setProductPage={setProductPage} />}
        {productPage === "contact" && <SheshiFRContactTab navigate={navigate} />}
      </main>

      {/* Footer */}
      <footer className="bg-white text-slate-600 border-t border-slate-200 px-6 py-10 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded bg-amber-600 text-white font-bold text-xs flex items-center justify-center">
              FR
            </div>
            <span className="font-bold text-slate-900">Sheshi FR Autonomous Reporting Suite</span>
            <span className="text-slate-400">•</span>
            <span>GAAP &amp; IFRS Financial Statements, Footnote Disclosures &amp; XBRL Tagging</span>
          </div>
          <button
            onClick={() => navigate({ page: "home" })}
            className="text-amber-700 hover:text-amber-900 font-semibold cursor-pointer transition-colors"
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

function SheshiFROverviewTab({ setProductPage }: { setProductPage: (p: string) => void }) {
  const [activeStatement, setActiveStatement] = useState<"bs" | "is" | "note">("bs");
  const [currency, setCurrency] = useState("USD");

  return (
    <div>
      {/* 21st.dev Style Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-amber-50/20 to-slate-50 border-b border-slate-200/80 pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(217,119,6,0.12),rgba(255,255,255,0))] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200/80 shadow-xs mb-6">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            <span>Designed by Chartered Accountants • Sheshi FR 2.0</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.12]">
            Autonomous Financial Statements &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-700">
              XBRL Disclosure Suite
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Eliminate high-risk manual spreadsheet linking for 10-K, 10-Q, and statutory annual reports. Sheshi FR
            compiles trial balance records into fully GAAP and IFRS compliant financial statements, automated
            footnote schedules, and validated XBRL taxonomy tags with sub-second recalculation.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={() => setProductPage("contact")}
              className="text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Request Reporting Suite Demo
            </button>
            <button
              onClick={() => setProductPage("features")}
              className="text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 px-6 py-3 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Inspect Disclosure Features →
            </button>
          </div>

          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 py-2.5 px-6 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 text-xs text-slate-600 shadow-xs">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              US-GAAP &amp; IFRS Dual Support
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span>SEC Edgar XBRL Taxonomy Tagging</span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="font-semibold text-amber-700">Zero Spreadsheet Rounding Errors</span>
          </div>
        </div>
      </section>

      {/* 4 Key Metrics */}
      <section className="py-10 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-100">
            <div className="text-3xl font-extrabold text-amber-700 mb-1">100%</div>
            <div className="text-xs font-bold text-slate-800">Mathematical Invariants</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Strict double-entry proof</div>
          </div>
          <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-100">
            <div className="text-3xl font-extrabold text-amber-700 mb-1">Zero</div>
            <div className="text-xs font-bold text-slate-800">Manual Spreadsheets</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Direct trial balance tie-out</div>
          </div>
          <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-100">
            <div className="text-3xl font-extrabold text-amber-700 mb-1">SEC XBRL</div>
            <div className="text-xs font-bold text-slate-800">Automated Tagging</div>
            <div className="text-[10px] text-slate-500 mt-0.5">US-GAAP Taxonomy 2026</div>
          </div>
          <div className="p-4 rounded-xl bg-amber-50/40 border border-amber-100">
            <div className="text-3xl font-extrabold text-amber-700 mb-1">85%</div>
            <div className="text-xs font-bold text-slate-800">Faster Audit Tie-Out</div>
            <div className="text-[10px] text-slate-500 mt-0.5">PwC, EY, KPMG ready</div>
          </div>
        </div>
      </section>

      {/* Interactive Financial Statement & XBRL Disclosure Viewer */}
      <section className="py-16 bg-slate-50 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200 mb-3">
              Interactive Financial Statement Viewer
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Consolidated Balance Sheet &amp; Footnote Schedules
            </h2>
            <p className="text-sm text-slate-600">
              Hover over any line item to inspect its associated XBRL taxonomy tag and trial balance tie-out proof.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header Toolbar */}
            <div className="p-4 bg-slate-100/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveStatement("bs")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    activeStatement === "bs"
                      ? "bg-amber-600 text-white shadow-xs"
                      : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                  }`}
                >
                  Balance Sheet (ASC 210)
                </button>
                <button
                  onClick={() => setActiveStatement("is")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    activeStatement === "is"
                      ? "bg-amber-600 text-white shadow-xs"
                      : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                  }`}
                >
                  Income Statement (ASC 225)
                </button>
                <button
                  onClick={() => setActiveStatement("note")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-all ${
                    activeStatement === "note"
                      ? "bg-amber-600 text-white shadow-xs"
                      : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
                  }`}
                >
                  Note 4: Leases (ASC 842)
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500">Presentation Currency:</span>
                {["USD", "EUR", "GBP"].map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-2.5 py-1 rounded font-mono font-bold cursor-pointer transition-colors ${
                      currency === curr ? "bg-slate-900 text-white" : "bg-white text-slate-700 border border-slate-200"
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            {/* Statement Content */}
            <div className="p-6 sm:p-8">
              {activeStatement === "bs" && (
                <div className="space-y-6 text-xs">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider mb-3 pb-2 border-b border-slate-200">
                      Current Assets
                    </h3>
                    <div className="space-y-2.5">
                      {[
                        { label: "Cash and Cash Equivalents", amt: "$14,892,100", xbrl: "us-gaap:CashAndCashEquivalentsAtCarryingValue" },
                        { label: "Accounts Receivable, Net of Allowance", amt: "$8,420,500", xbrl: "us-gaap:AccountsReceivableNetCurrent" },
                        { label: "Prepaid Expenses and Other Current Assets", amt: "$2,150,000", xbrl: "us-gaap:PrepaidExpenseCurrent" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded hover:bg-amber-50/50 group transition-colors">
                          <div>
                            <span className="font-semibold text-slate-800">{item.label}</span>
                            <span className="ml-2 text-[10px] font-mono text-amber-700 opacity-0 group-hover:opacity-100 transition-opacity">
                              [{item.xbrl}]
                            </span>
                          </div>
                          <span className="font-mono font-bold text-slate-900">{item.amt}</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-200">
                        <span>Total Current Assets</span>
                        <span className="font-mono text-amber-800">$25,462,600</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider mb-3 pb-2 border-b border-slate-200">
                      Non-Current Assets &amp; Right-of-Use
                    </h3>
                    <div className="space-y-2.5">
                      {[
                        { label: "Property, Plant and Equipment, Net", amt: "$12,400,000", xbrl: "us-gaap:PropertyPlantAndEquipmentNet" },
                        { label: "Operating Lease Right-of-Use Assets", amt: "$6,150,000", xbrl: "us-gaap:OperatingLeaseRightOfUseAsset" },
                        { label: "Goodwill and Intangibles", amt: "$4,200,000", xbrl: "us-gaap:Goodwill" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center justify-between p-2 rounded hover:bg-amber-50/50 group transition-colors">
                          <div>
                            <span className="font-semibold text-slate-800">{item.label}</span>
                            <span className="ml-2 text-[10px] font-mono text-amber-700 opacity-0 group-hover:opacity-100 transition-opacity">
                              [{item.xbrl}]
                            </span>
                          </div>
                          <span className="font-mono font-bold text-slate-900">{item.amt}</span>
                        </div>
                      ))}
                      <div className="flex justify-between font-extrabold text-sm text-slate-900 pt-3 border-t-2 border-slate-900">
                        <span>TOTAL ASSETS</span>
                        <span className="font-mono text-blue-700">$48,212,600</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStatement === "is" && (
                <div className="space-y-6 text-xs">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider mb-3 pb-2 border-b border-slate-200">
                      Operating Revenues &amp; Direct Costs
                    </h3>
                    <div className="space-y-2.5">
                      <div className="flex justify-between p-2 font-semibold">
                        <span>Subscription &amp; Software Licenses</span>
                        <span className="font-mono font-bold text-slate-900">$38,900,000</span>
                      </div>
                      <div className="flex justify-between p-2 font-semibold">
                        <span>Cost of Subscription Revenues</span>
                        <span className="font-mono font-bold text-rose-600">($8,240,000)</span>
                      </div>
                      <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-200">
                        <span>GROSS PROFIT (78.8% Margin)</span>
                        <span className="font-mono text-emerald-700">$30,660,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeStatement === "note" && (
                <div className="space-y-4 text-xs">
                  <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider mb-2 pb-2 border-b border-slate-200">
                    Note 4: Operating Leases Maturity Schedule (ASC 842)
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    Undiscounted future minimum lease commitments as of period end:
                  </p>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-mono">
                        <th className="py-2">Maturity Period</th>
                        <th className="py-2 text-right">Commitment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-mono">
                      <tr><td className="py-2 font-sans">Year 1 (2027)</td><td className="py-2 text-right">$1,850,000</td></tr>
                      <tr><td className="py-2 font-sans">Year 2 (2028)</td><td className="py-2 text-right">$1,920,000</td></tr>
                      <tr><td className="py-2 font-sans">Thereafter</td><td className="py-2 text-right">$2,380,000</td></tr>
                      <tr className="font-bold border-t border-slate-300">
                        <td className="py-2 font-sans">Total Undiscounted Lease Liabilities</td>
                        <td className="py-2 text-right text-amber-800">$6,150,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Verification Proof Footer */}
            <div className="p-4 bg-emerald-50/60 border-t border-emerald-200 text-xs flex flex-col sm:flex-row items-center justify-between gap-2 text-emerald-900">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold">
                  Mathematical Invariant Proof: Total Assets tie 100% to Trial Balance Voucher #TB-8149
                </span>
              </div>
              <div className="font-mono text-[11px] text-emerald-700">0 Rounding Discrepancies</div>
            </div>
          </div>
        </div>
      </section>

      {/* 21st.dev Bento Grid for Sheshi FR */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Autonomous Disclosure Engine for Enterprise Controllers
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Say goodbye to broken VLOOKUPs and manual footnote spreadsheet updates during audit season.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 rounded-2xl p-8 bg-gradient-to-br from-slate-50 to-amber-50/30 border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-amber-100 text-amber-800 mb-4 inline-block">
                FOOTNOTE AUTOMATION
              </span>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Automated Footnote Schedule Compiler</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Lease maturity schedules, debt covenant compliance, stock-based compensation amortization, and
                fair-value level 1/2/3 tables are generated directly from subledger records with full drill-down.
              </p>
              <button
                onClick={() => setProductPage("features")}
                className="px-4 py-2 bg-amber-600 text-white text-xs font-semibold rounded-lg hover:bg-amber-700 cursor-pointer"
              >
                Inspect Footnote Engine
              </button>
            </div>

            <div className="rounded-2xl p-8 bg-white border border-slate-200 hover:border-amber-400 hover:shadow-lg transition-all">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-orange-100 text-orange-800 mb-4 inline-block">
                SEC EDGAR
              </span>
              <h3 className="text-xl font-bold text-slate-900 mb-2">XBRL Taxonomy Validator</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Pre-validate financial tags against the US-GAAP 2026 taxonomy to eliminate SEC filing rejections
                and Edgar errors.
              </p>
              <span className="text-xs font-bold text-amber-700">Learn about XBRL compliance →</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function SheshiFRFeaturesTab({ setProductPage }: { setProductPage: (p: string) => void }) {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Enterprise Reporting Features
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Engineered to satisfy the most demanding external audit partners and regulators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { title: "Sub-Second Recalculation", desc: "When late adjusting journal entries post to the general ledger, every financial statement and footnote table updates in under 400ms." },
          { title: "Dual GAAP & IFRS Reporting", desc: "Produce parallel financial statements under US-GAAP and IFRS from the exact same underlying ERP transaction records." },
          { title: "Automated SEC Edgar HTML & XBRL", desc: "Export SEC-compliant HTML filing packages with fully tagged inline XBRL (iXBRL) ready for direct submission to the SEC." },
          { title: "Big 4 Audit Trail & PBC Tie-Out", desc: "Every number on the face of the financial statements links directly to supporting ledger lines and external bank confirmations." },
        ].map((feat, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2">{feat.title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SheshiFRWorkflowsTab({ setProductPage }: { setProductPage: (p: string) => void }) {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">The Autonomous Reporting Lifecycle</h1>
        <p className="text-slate-600 text-sm">
          A governed, linear workflow from trial balance snapshot to audited public filing.
        </p>
      </div>

      <div className="space-y-6">
        {[
          { step: "01", title: "Trial Balance Ingestion & Mapping", desc: "Extract final trial balances from SAP, NetSuite, or Quanta. Auto-map to canonical GAAP taxonomy." },
          { step: "02", title: "Footnote Computation & Tie-Out", desc: "Generate complex supporting schedules for leases (ASC 842), revenue recognition (ASC 606), and debt." },
          { step: "03", title: "Controller Review & Variance Commentary", desc: "Reviewers inspect line-by-line flux analysis and record audit-ready qualitative disclosures." },
          { step: "04", title: "Auditor Signoff & SEC Edgar Packaging", desc: "Grant external auditors read-only access to verify mathematical invariants, then export iXBRL package." },
        ].map((wf, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-bold font-mono text-sm flex items-center justify-center shrink-0">
              {wf.step}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-1">{wf.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{wf.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SheshiFRProfessionalsTab({ setProductPage }: { setProductPage: (p: string) => void }) {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Built by Controllers, for Controllers</h1>
      <p className="text-slate-600 text-sm mb-12">
        Created by Chartered Accountants and former audit partners who experienced the pain of 2:00 AM spreadsheet
        re-linking during quarterly earnings.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
        <div className="p-6 bg-white rounded-2xl border border-slate-200">
          <p className="text-xs text-slate-700 italic mb-4 leading-relaxed">
            &quot;Sheshi FR cut our 10-Q disclosure preparation time from 3 weeks down to 3 days. Our audit committee
            was blown away by the clarity of the automated footnote schedules.&quot;
          </p>
          <div className="text-xs font-bold text-slate-900">Jonathan Price, CPA</div>
          <div className="text-[11px] text-slate-500">VP Corporate Controller, Global BioTech Corp</div>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-slate-200">
          <p className="text-xs text-slate-700 italic mb-4 leading-relaxed">
            &quot;Having external auditors independently verify our financial statement line items through Sheshi FR
            saved us over $180,000 in annual audit overtime fees.&quot;
          </p>
          <div className="text-xs font-bold text-slate-900">Claire Chen</div>
          <div className="text-[11px] text-slate-500">Director of External Reporting &amp; SEC Compliance</div>
        </div>
      </div>
    </div>
  );
}

function SheshiFRResourcesTab({ setProductPage }: { setProductPage: (p: string) => void }) {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Financial Reporting Toolkits
        </h1>
        <p className="text-slate-600 text-sm sm:text-base">
          Authoritative disclosure checklists and technical accounting guides.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "2026 US-GAAP Disclosure Checklist", desc: "Comprehensive 80-page checklist covering all required footnote presentations for public filers." },
          { title: "ASC 842 Lease Accounting Guide", desc: "Detailed transition blueprint for computing ROU assets, lease liabilities, and footnote maturity schedules." },
          { title: "SEC Edgar iXBRL Compliance Handbook", desc: "How to eliminate common tagging errors, calculation inconsistencies, and negative sign discrepancies." },
        ].map((res, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-base mb-2">{res.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">{res.desc}</p>
            </div>
            <button
              onClick={() => setProductPage("contact")}
              className="text-xs font-bold text-amber-700 hover:text-amber-900 cursor-pointer"
            >
              Download Reporting Guide →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function SheshiFRContactTab({ navigate }: { navigate: (r: Route) => void }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Schedule Sheshi FR Walkthrough</h1>
        <p className="text-slate-600 text-sm">
          See how Sheshi FR automates statement generation and XBRL tagging for your organization.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Demo Request Confirmed!</h2>
            <p className="text-sm text-slate-600 mb-6">
              Our financial reporting practice director will reach out within 2 hours with customized session details.
            </p>
            <button
              onClick={() => navigate({ page: "home" })}
              className="px-6 py-2.5 bg-amber-600 text-white font-semibold text-xs rounded-xl shadow-xs cursor-pointer"
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
                <label className="block text-slate-700 font-bold mb-1">Full Name *</label>
                <input required type="text" placeholder="David Vance, CPA" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 outline-none text-slate-900" />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Corporate Email *</label>
                <input required type="email" placeholder="david@company.com" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 outline-none text-slate-900" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1">Company Name</label>
                <input required type="text" placeholder="Global Enterprise Ltd" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 outline-none text-slate-900" />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1">Reporting Framework</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-slate-300 outline-none bg-white text-slate-900">
                  <option>US-GAAP (Public SEC Filer)</option>
                  <option>US-GAAP (Private Company)</option>
                  <option>IFRS (International Standards)</option>
                  <option>Dual US-GAAP &amp; IFRS</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm rounded-xl shadow-md cursor-pointer transition-all"
            >
              Schedule Reporting Walkthrough
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
