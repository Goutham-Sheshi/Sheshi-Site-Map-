import { useState } from "react";
import { Route } from "../../types";

export default function QuantaSubsite({
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
    { id: "platform", label: "Platform" },
    { id: "solutions", label: "Solutions" },
    { id: "capabilities", label: "Capabilities" },
    { id: "enterprise", label: "Enterprise" },
    { id: "resources", label: "Resources" },
    { id: "contact", label: "Contact Sales" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-900 font-sans">
      {/* 21st.dev Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center h-16 justify-between gap-4">
          <div className="flex items-center gap-8">
            <button
              onClick={() => setProductPage("home")}
              className="flex items-center gap-3 cursor-pointer group text-left"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm shadow-sm group-hover:bg-blue-700 transition-colors">
                Q
              </div>
              <div>
                <span className="font-extrabold text-base tracking-tight text-slate-900 block leading-tight">
                  Sheshi Quanta
                </span>
                <span className="text-[10px] font-mono text-blue-600 tracking-wider uppercase font-semibold">
                  Autonomous Ledger &amp; Close
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
                      ? "bg-white text-blue-600 shadow-xs border border-slate-200/60"
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
              className="text-xs text-white font-semibold px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition-all shadow-sm hover:shadow-md cursor-pointer"
            >
              Schedule Demo
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Tabs */}
        <div className="flex lg:hidden overflow-x-auto px-4 py-2 border-t border-slate-200 gap-1 bg-slate-50/80">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setProductPage(t.id)}
              className={`px-3 py-1 text-xs font-semibold whitespace-nowrap rounded-lg cursor-pointer ${
                productPage === t.id
                  ? "bg-white text-blue-600 shadow-xs border border-slate-200"
                  : "text-slate-600"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Subpage View Switcher */}
      <main className="flex-1">
        {productPage === "home" && <QuantaOverviewTab setProductPage={setProductPage} navigate={navigate} />}
        {productPage === "platform" && <QuantaPlatformTab setProductPage={setProductPage} />}
        {productPage === "solutions" && <QuantaSolutionsTab setProductPage={setProductPage} />}
        {productPage === "capabilities" && <QuantaCapabilitiesTab setProductPage={setProductPage} />}
        {productPage === "enterprise" && <QuantaEnterpriseTab setProductPage={setProductPage} />}
        {productPage === "resources" && <QuantaResourcesTab setProductPage={setProductPage} />}
        {productPage === "contact" && <QuantaContactTab navigate={navigate} />}
      </main>

      {/* Quanta Dedicated Footer */}
      <footer className="bg-white text-slate-600 border-t border-slate-200 px-6 py-10 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
              Q
            </div>
            <span className="font-bold text-slate-900">Sheshi Quanta Enterprise Suite</span>
            <span className="text-slate-400">•</span>
            <span>Continuous Ledger, Multi-Entity Consolidation &amp; Close Orchestration</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate({ page: "home" })}
              className="text-blue-600 hover:text-blue-800 font-semibold cursor-pointer transition-colors"
            >
              Return to Sheshi Corporate Home →
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// TAB 1: OVERVIEW (HOME)
// ═════════════════════════════════════════════════════════════════════════════════

function QuantaOverviewTab({
  setProductPage,
  navigate,
}: {
  setProductPage: (p: string) => void;
  navigate: (r: Route) => void;
}) {
  const [matchTolerance, setMatchTolerance] = useState(1);
  const [currencyNetting, setCurrencyNetting] = useState(true);
  const [fuzzyRef, setFuzzyRef] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [matchedCount, setMatchedCount] = useState(4182);

  const handleRunSimulation = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setMatchedCount(4198);
    }, 600);
  };

  return (
    <div>
      {/* 21st.dev Style Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-slate-50 border-b border-slate-200/80 pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Subtle Ambient Radial Mesh */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(37,99,235,0.14),rgba(255,255,255,0))] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200/80 shadow-xs mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Autonomous Finance OS • Quanta Core 2.0</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.12]">
            Autonomous Financial Ledger &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600">
              Continuous Close Orchestration
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Replace fragmented 15-day batch closes with a single governed streaming ledger. Automate
            multi-entity reconciliations, journal entries, and ASC 810 / IFRS 10 consolidation with
            deterministic mathematical integrity.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <button
              onClick={() => setProductPage("contact")}
              className="text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              Schedule Architecture Walkthrough
            </button>
            <button
              onClick={() => setProductPage("capabilities")}
              className="text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 px-6 py-3 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Explore 10 Close Modules →
            </button>
          </div>

          {/* Status Ribbon */}
          <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 py-2.5 px-6 rounded-2xl bg-white/80 backdrop-blur-md border border-slate-200/80 text-xs text-slate-600 shadow-xs">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Big 4 Read-Only Vault Active
            </span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span>50,000 tx/sec Stream Ingestion</span>
            <span className="hidden sm:inline text-slate-300">•</span>
            <span className="font-semibold text-blue-700">0 SOX Deficiencies</span>
          </div>
        </div>
      </section>

      {/* 6-Metric Enterprise ROI Grid (Directly from Figma Reference 0 & 4) */}
      <section className="py-12 bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { val: "621%", label: "3-Year Verified ROI", sub: "IDC Enterprise Study" },
              { val: "99.4%", label: "Automated Match Rate", sub: "50M+ Line Items" },
              { val: "68%", label: "Close Time Reduction", sub: "14 Days → 4.5 Hours" },
              { val: "100%", label: "Audit Traceability", sub: "Cryptographic Provenance" },
              { val: "0", label: "SOX Deficiencies", sub: "Guaranteed Compliance" },
              { val: "50k/s", label: "Stream Ingestion", sub: "Zero-Batch Latency" },
            ].map((m, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/60 text-center">
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-700 mb-1">{m.val}</div>
                <div className="text-xs font-bold text-slate-800 leading-snug mb-0.5">{m.label}</div>
                <div className="text-[10px] text-slate-500 font-mono">{m.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Interactive Ledger & Matching Cockpit (21st.dev interactive mockup) */}
      <section className="py-16 bg-slate-50 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100/60 text-blue-800 border border-blue-200 mb-3">
              Interactive Software Workspace
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
              High-Throughput Autonomous Transaction Engine
            </h2>
            <p className="text-sm text-slate-600">
              Test how Quanta reconciles disparate feeds across ERP, bank statements, and clearing accounts with
              deterministic algorithmic matching.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
            {/* Mac-style Window Header */}
            <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="ml-3 text-xs font-mono text-slate-300">
                  quanta://cluster-prod-east/autonomous-reconciler/engine-v4
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-mono border border-emerald-700/50">
                  LIVE STREAMING
                </span>
                <span className="font-mono text-slate-400">48.2 ms latency</span>
              </div>
            </div>

            {/* Interactive Control Ribbon */}
            <div className="bg-slate-100/80 border-b border-slate-200 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-6 text-xs">
                <div>
                  <span className="text-slate-500 font-medium block mb-1">Match Tolerance ($):</span>
                  <div className="flex items-center gap-2">
                    {[0, 1, 5, 25].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setMatchTolerance(amt)}
                        className={`px-2.5 py-1 rounded font-semibold cursor-pointer transition-colors ${
                          matchTolerance === amt
                            ? "bg-blue-600 text-white shadow-xs"
                            : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                        }`}
                      >
                        ±${amt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 font-medium block mb-1">Multi-Currency Netting:</span>
                  <button
                    onClick={() => setCurrencyNetting(!currencyNetting)}
                    className={`px-3 py-1 rounded font-semibold cursor-pointer transition-colors ${
                      currencyNetting
                        ? "bg-emerald-600 text-white"
                        : "bg-white text-slate-700 border border-slate-200"
                    }`}
                  >
                    {currencyNetting ? "ENABLED (ASC 830)" : "DISABLED"}
                  </button>
                </div>

                <div>
                  <span className="text-slate-500 font-medium block mb-1">Fuzzy Reference Match:</span>
                  <button
                    onClick={() => setFuzzyRef(!fuzzyRef)}
                    className={`px-3 py-1 rounded font-semibold cursor-pointer transition-colors ${
                      fuzzyRef
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-slate-700 border border-slate-200"
                    }`}
                  >
                    {fuzzyRef ? "LEVENSHTEIN 92%" : "STRICT EXACT"}
                  </button>
                </div>
              </div>

              <div>
                <button
                  onClick={handleRunSimulation}
                  disabled={isRunning}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold text-xs shadow-xs cursor-pointer transition-all flex items-center gap-2"
                >
                  {isRunning ? (
                    <>
                      <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Evaluating Ledger Invariants...
                    </>
                  ) : (
                    <>⚡ Run Invariant Verification</>
                  )}
                </button>
              </div>
            </div>

            {/* Live Ledger Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-mono">
                    <th className="py-3 px-4">TX ID &amp; Source</th>
                    <th className="py-3 px-4">Legal Entity</th>
                    <th className="py-3 px-4">Account Code</th>
                    <th className="py-3 px-4">Description / Reference</th>
                    <th className="py-3 px-4 text-right">Debit / Credit</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-right">Confidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-sans">
                  {[
                    {
                      id: "TX-99014",
                      src: "SAP S/4HANA",
                      entity: "US Corp (1001)",
                      code: "1010-00 Cash at Chase",
                      ref: "ACH WIRE / STRIPE BATCH #4819",
                      amt: "$1,482,900.00",
                      isCredit: false,
                      status: "AUTO-MATCHED",
                      conf: "100.0%",
                    },
                    {
                      id: "TX-99015",
                      src: "JP Morgan Chase",
                      entity: "US Corp (1001)",
                      code: "1010-00 Bank Clearing",
                      ref: "CREDIT WIRE BATCH STRIPE 4819",
                      amt: "$1,482,900.00",
                      isCredit: true,
                      status: "AUTO-MATCHED",
                      conf: "100.0%",
                    },
                    {
                      id: "TX-99018",
                      src: "NetSuite EMEA",
                      entity: "UK Ltd (2004)",
                      code: "2150-10 IC Clearing",
                      ref: "PO-68192 MGMT FEES USD EQV",
                      amt: "$342,150.00",
                      isCredit: false,
                      status: "NETTED (ASC 810)",
                      conf: "99.8%",
                    },
                    {
                      id: "TX-99019",
                      src: "Workday AP",
                      entity: "US Corp (1001)",
                      code: "2150-10 IC Payable UK",
                      ref: "INV-2026-UK-044 MGMT CHARGE",
                      amt: "$342,150.00",
                      isCredit: true,
                      status: "NETTED (ASC 810)",
                      conf: "99.8%",
                    },
                    {
                      id: "TX-99022",
                      src: "Stripe Enterprise",
                      entity: "US Corp (1001)",
                      code: "1200-05 AR Merchant",
                      ref: "PAYOUT #PO-98124 (FEE NETTED)",
                      amt: "$89,420.50",
                      isCredit: true,
                      status: "RULE CERTIFIED",
                      conf: "99.4%",
                    },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50/40 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-mono font-bold text-slate-900">{row.id}</div>
                        <div className="text-[10px] text-slate-500">{row.src}</div>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800">{row.entity}</td>
                      <td className="py-3 px-4 font-mono text-slate-600">{row.code}</td>
                      <td className="py-3 px-4 text-slate-700">{row.ref}</td>
                      <td
                        className={`py-3 px-4 text-right font-mono font-semibold ${
                          row.isCredit ? "text-emerald-700" : "text-blue-700"
                        }`}
                      >
                        {row.amt} {row.isCredit ? "CR" : "DR"}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wide bg-emerald-100 text-emerald-800 border border-emerald-300">
                          {row.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-slate-800">{row.conf}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Bottom Status Banner */}
            <div className="bg-slate-50 px-5 py-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>
                  <strong>{matchedCount}</strong> of 4,200 pending transactions verified with zero manual
                  intervention.
                </span>
              </div>
              <div className="font-mono text-slate-500 text-[11px]">
                Cryptographic Block #814,921 • Invariants Verified
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 21st.dev Bento Grid for Core Capabilities */}
      <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-3">
              Comprehensive Platform Surface
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Built for the High-Scrutiny Enterprise Close
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Every capability is integrated into a unified mathematical data foundation, preventing reconciliation
              debt between point solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Bento Card 1: Span 2 */}
            <div className="md:col-span-2 rounded-2xl p-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/40 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-blue-100 text-blue-800">
                  CONTINUOUS STREAMING
                </span>
                <span className="text-xs text-slate-500">Sub-Second Balance Updates</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Zero-Day Financial Close Engine</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Rather than waiting for the month-end calendar to trigger batch reconciliation jobs, Quanta ingests
                every journal entry and external statement continuously. By Day -1, 99.4% of all ledger accounts
                are already certified.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200">
                <div>
                  <div className="text-xl font-extrabold text-blue-700">4.5 Hours</div>
                  <div className="text-xs text-slate-500">Average Close Duration</div>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-blue-700">99.4%</div>
                  <div className="text-xs text-slate-500">Zero-Touch Automation</div>
                </div>
                <div>
                  <div className="text-xl font-extrabold text-blue-700">Zero</div>
                  <div className="text-xs text-slate-500">Out-of-Period Postings</div>
                </div>
              </div>
            </div>

            {/* Bento Card 2: Span 1 */}
            <div className="rounded-2xl p-8 bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-indigo-100 text-indigo-800 inline-block mb-4">
                  ASC 810 / IFRS 10
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Intercompany Elimination</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Automatic reciprocal balance identification across multiple subsidiaries, automated elimination
                  journal creation, and currency remeasurement.
                </p>
              </div>
              <button
                onClick={() => setProductPage("solutions")}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                Inspect Elimination Engine →
              </button>
            </div>

            {/* Bento Card 3: Span 1 */}
            <div className="rounded-2xl p-8 bg-white border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-amber-100 text-amber-800 inline-block mb-4">
                  RISK ANALYSIS
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Journals Risk Analyser</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Automated scanning of all posted manual journals for anomalies: off-hours timing, round dollar
                  amounts, threshold circumvention, and segregation of duties.
                </p>
              </div>
              <button
                onClick={() => setProductPage("capabilities")}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                View Risk Detection →
              </button>
            </div>

            {/* Bento Card 4: Span 2 */}
            <div className="md:col-span-2 rounded-2xl p-8 bg-gradient-to-br from-white to-slate-50 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded bg-emerald-100 text-emerald-800">
                  BIG 4 AUDIT READY
                </span>
                <span className="text-xs text-slate-500">PwC • EY • Deloitte • KPMG</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Immutable Cryptographic Audit Vault</h3>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed">
                Provide external auditors with direct read-only access to a self-verifying vault. Every journal
                entry, rule execution, and reconciliation is tied to raw cryptographic hashes, eliminating weeks
                of manual PBC sample gathering.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setProductPage("enterprise")}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Review SOX 404 Controls Matrix
                </button>
                <button
                  onClick={() => setProductPage("resources")}
                  className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  Download Auditor Whitepaper
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise ERP Ecosystem Ribbon */}
      <section className="py-12 bg-slate-50 border-y border-slate-200/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-6">
            Pre-Built Bi-Directional Connectors for Enterprise Systems
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            {["SAP S/4HANA", "Oracle Fusion Cloud", "NetSuite OneWorld", "Workday Financials", "Microsoft Dynamics 365", "Kyriba Treasury", "Salesforce Billing"].map(
              (erp, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-xs"
                >
                  {erp}
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Controller Testimonial Band (Directly from Reference 2) */}
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-6 text-xl font-serif">
            “
          </div>
          <blockquote className="text-lg sm:text-2xl font-bold text-slate-900 mb-6 leading-relaxed">
            &quot;I really value the visibility of metrics inherent in Quanta. Not only can we track match rates over
            time, but <span className="bg-blue-100 text-blue-900 px-1.5 py-0.5 rounded">we have real-time visibility into transaction anomalies</span> that
            previously took our team 8 to 10 days to uncover.&quot;
          </blockquote>
          <div className="text-xs font-semibold text-slate-900">Nelson Lopes</div>
          <div className="text-xs text-slate-500">Director of Financial Reporting &amp; Global Treasury</div>
        </div>
      </section>

      {/* Next Step CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-indigo-800 text-white text-center px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
            Ready to Compress Your Next Month-End Close?
          </h2>
          <p className="text-blue-100 text-sm mb-8 leading-relaxed">
            Schedule an architecture deep-dive with our former Big 4 partners and enterprise systems architects.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setProductPage("contact")}
              className="px-6 py-3 rounded-xl bg-white text-blue-700 font-bold text-xs hover:bg-blue-50 shadow-md cursor-pointer transition-all"
            >
              Request Custom Enterprise Demo
            </button>
            <button
              onClick={() => setProductPage("platform")}
              className="px-6 py-3 rounded-xl bg-blue-800/80 text-white font-semibold text-xs border border-blue-400/40 hover:bg-blue-800 cursor-pointer transition-all"
            >
              Inspect Platform Architecture
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// TAB 2: PLATFORM ARCHITECTURE
// ═════════════════════════════════════════════════════════════════════════════════

function QuantaPlatformTab({ setProductPage }: { setProductPage: (p: string) => void }) {
  const [activeStage, setActiveStage] = useState(1);
  const [monthlyVolume, setMonthlyVolume] = useState(5); // Millions

  const stages = [
    {
      id: 1,
      title: "1. Ingestion & Change Data Capture",
      subtitle: "Kafka, Debezium, REST & SFTP",
      desc: "Streams transactions directly from SAP S/4HANA, NetSuite, and core banking feeds without modifying legacy ERP source tables.",
      specs: ["50,000 events/sec capacity", "Sub-50ms queue propagation", "Bi-directional idempotency keys"],
    },
    {
      id: 2,
      title: "2. Canonical Normalization",
      subtitle: "Double-Entry Invariant Enforcement",
      desc: "Validates strict mathematical invariants (Debits = Credits, Valid Cost Centers) and normalizes disparate chart-of-accounts into a unified schema.",
      specs: ["Zero-hallucination deterministic engine", "100% chart of accounts mapping", "Real-time syntax validation"],
    },
    {
      id: 3,
      title: "3. Continuous Balance Engine",
      subtitle: "Streaming Multi-Entity State",
      desc: "Maintains real-time general ledger balances across 100+ entities with instantaneous currency remeasurement under ASC 830 / IFRS 21.",
      specs: ["Sub-second trial balance compilation", "Automated CTA currency recalculation", "No end-of-month batch locks"],
    },
    {
      id: 4,
      title: "4. Cryptographic Provenance",
      subtitle: "Immutable Big 4 Audit Vault",
      desc: "Every journal entry and match operation is sealed with SHA-256 block hashes, giving auditors direct read-only access to verifiable proof.",
      specs: ["Zero manual PBC binder creation", "WORM immutable cloud storage", "SOX 404 automated audit trails"],
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 21st.dev Hero */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-4">
          Platform Blueprint
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Zero-Batch Streaming Platform Architecture
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          How Quanta converts fragmented ERP data feeds into an immutable, mathematically verified financial
          ledger in continuous real time.
        </p>
      </div>

      {/* 4-Stage Interactive Pipeline */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          {stages.map((st) => (
            <button
              key={st.id}
              onClick={() => setActiveStage(st.id)}
              className={`p-4 rounded-xl text-left transition-all cursor-pointer border ${
                activeStage === st.id
                  ? "bg-blue-50/80 border-blue-500 shadow-xs"
                  : "bg-slate-50 hover:bg-slate-100 border-slate-200"
              }`}
            >
              <div className="text-xs font-bold text-blue-700 mb-1">STAGE {st.id}</div>
              <div className="font-bold text-slate-900 text-sm mb-1">{st.title.split(". ")[1]}</div>
              <div className="text-[11px] text-slate-500">{st.subtitle}</div>
            </button>
          ))}
        </div>

        {/* Active Stage Deep-Dive */}
        {stages
          .filter((st) => st.id === activeStage)
          .map((st) => (
            <div key={st.id} className="bg-slate-50 rounded-xl p-6 sm:p-8 border border-slate-200">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wide">
                    {st.subtitle}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">{st.title}</h3>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-mono font-bold border border-emerald-300 inline-block">
                  STATE: LIVE ACTIVE
                </div>
              </div>

              <p className="text-sm text-slate-700 mb-6 leading-relaxed">{st.desc}</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {st.specs.map((sp, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                    <div className="text-blue-600 font-bold mb-0.5">✓ Specification</div>
                    <div className="font-semibold text-slate-800">{sp}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>

      {/* Interactive Volume & Timeline Calculator */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl p-8 sm:p-12 mb-16 shadow-xl">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
            PERFORMANCE SIMULATOR
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold mt-2 mb-3">
            Close Timeline Compression vs Legacy Batch
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Adjust your monthly transaction volume to see projected timeline savings with Quanta continuous ingestion.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-10">
          <div className="flex justify-between text-xs font-bold mb-2">
            <span>Monthly Transaction Volume:</span>
            <span className="text-blue-400 font-mono text-sm">{monthlyVolume} Million Rows</span>
          </div>
          <input
            type="range"
            min="1"
            max="25"
            value={monthlyVolume}
            onChange={(e) => setMonthlyVolume(Number(e.target.value))}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
            <span>1M Line Items</span>
            <span>10M Line Items</span>
            <span>25M Line Items</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="p-6 rounded-xl bg-slate-800/80 border border-slate-700 text-center">
            <div className="text-xs text-rose-400 font-bold uppercase mb-1">Legacy ERP Batch Close</div>
            <div className="text-3xl font-extrabold text-white mb-2">
              {Math.round(8 + monthlyVolume * 0.4)} Days
            </div>
            <div className="text-xs text-slate-400">Manual spreadsheets, batch freeze, sleep deprivation</div>
          </div>

          <div className="p-6 rounded-xl bg-blue-900/60 border border-blue-500 text-center">
            <div className="text-xs text-blue-300 font-bold uppercase mb-1">Quanta Continuous Stream</div>
            <div className="text-3xl font-extrabold text-emerald-400 mb-2">
              {Math.round(2 + monthlyVolume * 0.15)} Hours
            </div>
            <div className="text-xs text-slate-300">Automated certification, continuous trial balance</div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center">
        <button
          onClick={() => setProductPage("capabilities")}
          className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer mr-3"
        >
          View All 10 Capabilities →
        </button>
        <button
          onClick={() => setProductPage("contact")}
          className="px-6 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs shadow-xs transition-all cursor-pointer"
        >
          Schedule Platform Walkthrough
        </button>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// TAB 3: SOLUTIONS (CONSOLIDATION & INTERCOMPANY)
// ═════════════════════════════════════════════════════════════════════════════════

function QuantaSolutionsTab({ setProductPage }: { setProductPage: (p: string) => void }) {
  const [selectedPair, setSelectedPair] = useState("us-uk");
  const [eliminated, setEliminated] = useState(false);

  const pairs: Record<string, { label: string; sub1: string; sub2: string; fx: string; diff: string }> = {
    "us-uk": {
      label: "US Parent Corp (1001) ↔ UK European Ltd (2004)",
      sub1: "US Parent Receivable: $1,250,000.00 USD",
      sub2: "UK Ltd Payable: £985,804.42 GBP ($1,250,000.00 USD eqv)",
      fx: "1 GBP = 1.2680 USD (Spot rate per OANDA)",
      diff: "$0.00 Variance (Deterministic Net)",
    },
    "us-sg": {
      label: "US Parent Corp (1001) ↔ Singapore APAC Pte (3002)",
      sub1: "US Parent Receivable: $840,000.00 USD",
      sub2: "SG APAC Payable: S$1,125,600.00 SGD ($840,000.00 USD eqv)",
      fx: "1 USD = 1.3400 SGD (Spot rate per MAS)",
      diff: "$0.00 Variance (Deterministic Net)",
    },
    "uk-de": {
      label: "UK European Ltd (2004) ↔ Germany GmbH (2008)",
      sub1: "UK Ltd Receivable: €420,000.00 EUR (£358,974.36 GBP)",
      sub2: "Germany GmbH Payable: €420,000.00 EUR",
      fx: "1 EUR = 0.8547 GBP (ECB Official)",
      diff: "$0.00 Variance (Deterministic Net)",
    },
  };

  const currentPair = pairs[selectedPair];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-4">
          Enterprise Solutions
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Multi-Subsidiary Close &amp; Intercompany Elimination
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Automate complex multi-entity consolidation, currency remeasurement, and intercompany netting under
          ASC 810 and IFRS 10 without spreadsheet risk.
        </p>
      </div>

      {/* Interactive Intercompany Elimination Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Interactive Bilateral Elimination Engine</h2>
            <p className="text-xs text-slate-500">
              Select an intercompany pair to inspect automated reciprocal balance reconciliation.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.keys(pairs).map((k) => (
              <button
                key={k}
                onClick={() => {
                  setSelectedPair(k);
                  setEliminated(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedPair === k
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {k.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 mb-6">
          <div className="text-xs font-mono font-bold text-blue-700 mb-3">{currentPair.label}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-white rounded-lg border border-slate-200">
              <div className="text-[11px] text-slate-500 uppercase font-mono mb-1">Entity A Balance</div>
              <div className="font-mono font-bold text-slate-900 text-sm">{currentPair.sub1}</div>
            </div>
            <div className="p-4 bg-white rounded-lg border border-slate-200">
              <div className="text-[11px] text-slate-500 uppercase font-mono mb-1">Entity B Balance</div>
              <div className="font-mono font-bold text-slate-900 text-sm">{currentPair.sub2}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs pt-4 border-t border-slate-200">
            <div>
              <span className="text-slate-500">FX Rate Invariant: </span>
              <span className="font-mono font-bold text-slate-800">{currentPair.fx}</span>
            </div>
            <div>
              <span className="text-slate-500">Reciprocal Variance: </span>
              <span className="font-mono font-bold text-emerald-700">{currentPair.diff}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => setEliminated(true)}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer transition-all"
          >
            {eliminated ? "✓ Elimination Journal Posted & Sealed" : "⚡ Post Automated Elimination Journal"}
          </button>
          {eliminated && (
            <span className="text-xs font-mono text-emerald-600 font-bold">
              Journal #ELIM-2026-09 Generated • Dr 2150 / Cr 1250 Net $0
            </span>
          )}
        </div>
      </div>

      {/* 3 Core Solution Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="p-6 bg-white rounded-2xl border border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center mb-4 text-sm">
            01
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">ASC 810 &amp; IFRS 10 Compliance</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Support for variable interest entities (VIEs), non-controlling interests (NCI), and step acquisitions
            with automatic journal generation at legal entity and consolidated levels.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center mb-4 text-sm">
            02
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Currency Remeasurement &amp; CTA</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Automatic distinction between functional and presentation currencies under ASC 830, with real-time
            cumulative translation adjustments (CTA) posted directly to OCI equity.
          </p>
        </div>

        <div className="p-6 bg-white rounded-2xl border border-slate-200">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center mb-4 text-sm">
            03
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Continuous Subsidiary Rollups</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Eliminate month-end consolidation batch bottlenecks. As subsidiary entities post transactions in
            local currencies, the consolidated parent trial balance updates instantaneously.
          </p>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// TAB 4: CAPABILITIES (THE 10 CLOSE MODULES FROM FIGMA)
// ═════════════════════════════════════════════════════════════════════════════════

function QuantaCapabilitiesTab({ setProductPage }: { setProductPage: (p: string) => void }) {
  const [selectedCap, setSelectedCap] = useState(0);

  const capabilities = [
    {
      title: "Account Reconciliations",
      tagline: "Automated Risk-Based Balance Sheet Certification",
      badge: "Core Close",
      desc: "Reconcile balance sheet accounts with automated rules, risk-based assignment, and direct integration into ERP trial balances. High-volume accounts are certified automatically when zero un-reconciled items exist.",
      metrics: ["99.4% Automated Certification", "Zero Unexplained Variances", "Complete Preparer/Approver Signoff"],
      features: [
        "Risk-based auto-certification policies",
        "Pre-built schedules for prepaid expenses, fixed assets, and accruals",
        "Direct drill-down to underlying ERP subledger documents",
      ],
      mockupData: {
        account: "1010-00 Cash & Equivalents (Chase Main Operating)",
        glBalance: "$14,892,100.00",
        bankBalance: "$14,892,100.00",
        variance: "$0.00",
        status: "AUTO-CERTIFIED",
        certifier: "Autonomous Engine (Deterministic Rule #CASH-01)",
      },
    },
    {
      title: "Transaction Matching",
      tagline: "High-Volume Multi-Source Algorithmic Matching",
      badge: "Matching Engine",
      desc: "Process tens of millions of records across banks, merchant gateways, credit card feeds, and internal ERP clearing accounts with one-to-one, one-to-many, and many-to-many matching rules.",
      metrics: ["50M+ Line Items Processed", "<1 Sec Execution Time", "Fuzzy Levenshtein & Date Netting"],
      features: [
        "One-to-many and many-to-many matching algorithms",
        "Configurable monetary and percentage tolerances",
        "Automated exception routing and discrepancy ticketing",
      ],
      mockupData: {
        account: "1200-05 Stripe Merchant Clearing",
        glBalance: "$3,420,950.00",
        bankBalance: "$3,420,950.00",
        variance: "$0.00",
        status: "100% MATCHED",
        certifier: "Algorithmic Ruleset #STRIPE-NET",
      },
    },
    {
      title: "Journal Entry Management",
      tagline: "Governed Creation, Validation & Direct ERP Posting",
      badge: "Automation",
      desc: "Streamline the journal entry lifecycle from creation and validation through multi-level approval workflows and direct automated posting into SAP, NetSuite, or Oracle.",
      metrics: ["92% Recurring Journals Automated", "0 Out-of-Period Postings", "Enforced Segregation of Duties"],
      features: [
        "Pre-posting validation against ERP chart-of-accounts rules",
        "Dynamic approval routing based on amount thresholds and entity",
        "Automated reversing journals on Day 1 of subsequent period",
      ],
      mockupData: {
        account: "JE-2026-09-041 (Depreciation & Amortization)",
        glBalance: "$450,000.00 Debit",
        bankBalance: "$450,000.00 Credit",
        variance: "Balanced",
        status: "POSTED TO SAP",
        certifier: "Controller Signoff #CONT-814",
      },
    },
    {
      title: "Journals Risk Analyser",
      tagline: "Deterministic & AI Anomaly Detection for Manual Entries",
      badge: "Risk & SOX",
      desc: "Continuous automated scanning of manual journal postings to flag statistical anomalies: entries posted on weekends/holidays, round-sum postings, entries circumventing approval thresholds, or unusual account combinations.",
      metrics: ["100% Manual Entries Scanned", "High-Risk Items Highlighted", "SOX 404 Audit Logged"],
      features: [
        "Benford Law and round-number anomaly scoring",
        "Detection of off-hours, weekend, and holiday postings",
        "Segregation of duties (SoD) violation alerts",
      ],
      mockupData: {
        account: "Manual JE #MJE-9912 (Legal Contingency Reserve)",
        glBalance: "$1,000,000.00",
        bankBalance: "N/A (Accrual)",
        variance: "Risk Score: 12/100 (Normal)",
        status: "VERIFIED LOW RISK",
        certifier: "Risk Invariant Engine",
      },
    },
    {
      title: "Verity Accruals",
      tagline: "Algorithmic Accrual Calculation from POs and Receipts",
      badge: "Predictive",
      desc: "Eliminate spreadsheet estimation for month-end expenses. Verity Accruals scans open purchase orders, received-not-invoiced goods receipts, and historical vendor invoicing trends to generate precise accrual entries.",
      metrics: ["88% Accrual Preparation Time Saved", "Zero Under-Accrual Surprises", "Automated Day-1 Reversals"],
      features: [
        "Automated PO-to-receipt GR/IR gap analysis",
        "Vendor recurring billing pattern extrapolation",
        "Audit-ready documentation linked to every calculated line",
      ],
      mockupData: {
        account: "2050-00 Unbilled Vendor Accruals (AWS & Snowflake)",
        glBalance: "$892,400.00",
        bankBalance: "$892,400.00 Calculated",
        variance: "$0.00",
        status: "ACCRUAL COMPUTED",
        certifier: "Verity Engine V2",
      },
    },
    {
      title: "Smart Close for SAP & NetSuite",
      tagline: "In-ERP Robotic Process Automation for Month-End Tasks",
      badge: "ERP Native",
      desc: "Execute and verify batch jobs, depreciation runs, foreign currency revaluations, and clearing transactions directly within your ERP without manual user logins or waiting for overnight queues.",
      metrics: ["40+ ERP Tasks Automated", "Instant Dependency Triggers", "Zero Manual Job Monitoring"],
      features: [
        "Direct API orchestration inside SAP S/4HANA and NetSuite",
        "Sequential task dependency triggers based on job completion",
        "Automated error logging and instant Slack/Teams alerts",
      ],
      mockupData: {
        account: "SAP S/4HANA Job F.05 (Foreign Currency Valuation)",
        glBalance: "Job Completed (248 Entities)",
        bankBalance: "0 Errors Logged",
        variance: "Execution Time: 4.2 min",
        status: "COMPLETED",
        certifier: "Smart Close Bot",
      },
    },
    {
      title: "Account Analysis & Variance",
      tagline: "Real-Time Balance Sheet Flux & Commentary Attribution",
      badge: "Analytics",
      desc: "Continuous flux analysis across prior periods, budget, and forecast. When accounts breach variance thresholds (e.g. >$100k or >10%), owners are prompted for structured commentary tied directly to transaction line items.",
      metrics: ["Instant Threshold Alerts", "Transaction-Level Attribution", "Audit-Ready Flux Binder"],
      features: [
        "Dynamic period-over-period and budget variance thresholds",
        "Drill-down to largest contributing transaction vouchers",
        "Integrated commentary workflow with reviewer signoff",
      ],
      mockupData: {
        account: "6010-00 Cloud Infrastructure Expense",
        glBalance: "$1,450,000.00 (Current)",
        bankBalance: "$1,120,000.00 (Prior)",
        variance: "+$330,000.00 (+29.5%)",
        status: "COMMENTED & APPROVED",
        certifier: "FP&A Lead (Attributed to EU Cluster Expansion)",
      },
    },
    {
      title: "Consolidation & Currency Netting",
      tagline: "Automated Multi-Entity Eliminations & Translation",
      badge: "Multi-Entity",
      desc: "Automate complex intercompany eliminations, non-controlling interest allocations, and foreign currency cumulative translation adjustments (CTA) under ASC 810 and IFRS 10.",
      metrics: ["100+ Legal Entities Supported", "Real-Time Equity Netting", "ASC 830 Compliance"],
      features: [
        "Multi-tier consolidation hierarchy mapping",
        "Bilateral and multilateral intercompany netting",
        "Automated CTA equity translation adjustments",
      ],
      mockupData: {
        account: "Consolidated Trial Balance (Global Group)",
        glBalance: "$248,500,000.00 Assets",
        bankBalance: "$248,500,000.00 Liab & Eq",
        variance: "$0.00 Invariant Holds",
        status: "CONSOLIDATED",
        certifier: "Global Consolidation Engine",
      },
    },
    {
      title: "Reporting & Board Analytics",
      tagline: "Instant Board-Ready Financial Packs & Footnotes",
      badge: "Reporting",
      desc: "Compile final trial balances, balance sheets, income statements, and cash flow schedules into interactive executive dashboards and board-ready reporting packages with live drill-down capability.",
      metrics: ["1-Click Board Pack Generation", "Real-Time Drill-Through", "Role-Based Permissions"],
      features: [
        "Standard GAAP and IFRS presentation templates",
        "Executive variance commentary integration",
        "Direct export to Excel, PowerPoint, and PDF",
      ],
      mockupData: {
        account: "Q3 2026 Board Consolidation Package",
        glBalance: "EBITDA: $42.8M (104% to Plan)",
        bankBalance: "Operating Cash: $84.2M",
        variance: "Ready for CFO Presentation",
        status: "PUBLISHED",
        certifier: "VP Finance & Controller",
      },
    },
    {
      title: "Task Management & SOX Compliance",
      tagline: "Hierarchical Close Checklists & Auditor PBC Tracker",
      badge: "Compliance",
      desc: "Orchestrate every close activity across global finance teams with dependency tracking, automated status updates, role-based signoffs, and pre-built SOX 404 audit binders.",
      metrics: ["100% Close Tasks Tracked", "Real-Time Gantt Visibility", "Automated PBC Package"],
      features: [
        "Milestone-based close calendars with SLA alerts",
        "Segregation of duties enforcement on task signoff",
        "Direct export of auditor PBC binders with attached workpapers",
      ],
      mockupData: {
        account: "Month-End Close Calendar (Day 0 of Close)",
        glBalance: "148 of 152 Tasks Completed",
        bankBalance: "4 Pending Final Review",
        variance: "97.4% Complete",
        status: "ON TRACK",
        certifier: "Corporate Controller Dashboard",
      },
    },
  ];

  const current = capabilities[selectedCap];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-4">
          Financial Close &amp; Consolidation
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          The 10 Specialized Financial Close Modules
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Inspired by the comprehensive architectures of enterprise leaders, Quanta replaces fragmented point
          solutions with a unified, mathematically governed close suite.
        </p>
      </div>

      {/* Interactive Module Selector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
        {/* Left List of 10 Modules */}
        <div className="lg:col-span-4 flex flex-col gap-2">
          {capabilities.map((cap, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCap(idx)}
              className={`p-3.5 rounded-xl text-left transition-all cursor-pointer border ${
                selectedCap === idx
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                    selectedCap === idx ? "bg-blue-700 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {cap.badge}
                </span>
                <span className={`text-xs ${selectedCap === idx ? "text-blue-200" : "text-slate-400"}`}>
                  #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                </span>
              </div>
              <div className={`font-bold text-sm ${selectedCap === idx ? "text-white" : "text-slate-900"}`}>
                {cap.title}
              </div>
              <div
                className={`text-[11px] truncate mt-0.5 ${
                  selectedCap === idx ? "text-blue-100" : "text-slate-500"
                }`}
              >
                {cap.tagline}
              </div>
            </button>
          ))}
        </div>

        {/* Right Active Capability Showcase (Software Preview & Details) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-mono font-bold text-blue-700 uppercase">{current.badge}</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{current.title}</h2>
              </div>
              <button
                onClick={() => setProductPage("contact")}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs cursor-pointer transition-all"
              >
                Schedule {current.title} Demo
              </button>
            </div>

            <p className="text-sm font-semibold text-blue-600 mb-3">{current.tagline}</p>
            <p className="text-sm text-slate-600 mb-6 leading-relaxed">{current.desc}</p>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              {current.metrics.map((m, i) => (
                <div key={i} className="p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-center">
                  <span className="text-xs font-bold text-blue-900">{m}</span>
                </div>
              ))}
            </div>

            {/* Features List */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Key Architectural Capabilities
              </h4>
              <div className="space-y-2">
                {current.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <span className="text-blue-600 font-bold mt-0.5">✓</span>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Software Mockup Preview Box */}
            <div className="bg-slate-900 rounded-xl p-5 text-white shadow-inner font-mono text-xs">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800 text-[11px] text-slate-400">
                <span>QUANTA WORKSPACE // {current.title.toUpperCase()}</span>
                <span className="text-emerald-400 font-bold">● {current.mockupData.status}</span>
              </div>
              <div className="space-y-2 text-slate-300">
                <div>
                  <span className="text-slate-500">Target Object: </span>
                  <span className="text-white font-bold">{current.mockupData.account}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-500">General Ledger: </span>
                    <span className="text-blue-300 font-bold">{current.mockupData.glBalance}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">External / Reciprocal: </span>
                    <span className="text-blue-300 font-bold">{current.mockupData.bankBalance}</span>
                  </div>
                </div>
                <div>
                  <span className="text-slate-500">Net Variance: </span>
                  <span className="text-emerald-400 font-bold">{current.mockupData.variance}</span>
                </div>
                <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                  Certified By: {current.mockupData.certifier}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// TAB 5: ENTERPRISE (GOVERNANCE, SOX 404 & SECURITY)
// ═════════════════════════════════════════════════════════════════════════════════

function QuantaEnterpriseTab({ setProductPage }: { setProductPage: (p: string) => void }) {
  const controls = [
    { id: "IC-01", name: "Segregation of Duties (SoD)", desc: "Enforces strict role separation between journal creators, reviewers, and approvers.", status: "AUTOMATED / PASS" },
    { id: "IC-02", name: "Automated Reconciliations", desc: "Accounts with balances >$500k require two-tier approval; auto-certified only with $0 diff.", status: "CONTINUOUS / PASS" },
    { id: "IC-03", name: "Intercompany Netting Invariants", desc: "Reciprocal balances must net to $0 before consolidated trial balance can be sealed.", status: "MATHEMATICAL / PASS" },
    { id: "IC-04", name: "Out-of-Period Postings Block", desc: "Automatic hard-lock on closed periods preventing backdated entries into ERP subledgers.", status: "ENFORCED / PASS" },
    { id: "IC-05", name: "Audit Trail Immutability", desc: "Cryptographic SHA-256 block hashing on all system actions with external auditor vault.", status: "WORM SEALED / PASS" },
    { id: "IC-06", name: "Currency Rate Invariants", desc: "Enforces daily certified rates from central bank feeds; manual rate overrides trigger alerts.", status: "FEED VERIFIED / PASS" },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-4">
          Enterprise Trust &amp; Governance
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          SOX 404 Controls &amp; Big 4 Audit Vault
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Engineered for global public enterprises and multinational corporations subject to PCAOB, SEC, and
          statutory auditor scrutiny.
        </p>
      </div>

      {/* SOX 404 Controls Matrix */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm mb-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Pre-Mapped SOX 404 Internal Controls</h2>
            <p className="text-xs text-slate-500">
              Continuous mathematical enforcement of internal control objectives without manual testing.
            </p>
          </div>
          <button
            onClick={() => setProductPage("resources")}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 cursor-pointer"
          >
            Download SOX 404 Evidence Package →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-mono uppercase tracking-wider">
                <th className="py-3 px-4">Control ID</th>
                <th className="py-3 px-4">Control Objective</th>
                <th className="py-3 px-4">Enforcement Mechanism</th>
                <th className="py-3 px-4 text-center">Test Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {controls.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-blue-700">{c.id}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{c.name}</td>
                  <td className="py-3 px-4 text-slate-600">{c.desc}</td>
                  <td className="py-3 px-4 text-center">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 font-mono">
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Enterprise Security Certifications */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {[
          { name: "SOC 1 Type II", org: "SSAE 18 / ISAE 3402", desc: "Annual report covering financial reporting controls." },
          { name: "SOC 2 Type II", org: "AICPA Trust Principles", desc: "Security, availability, and confidentiality audit." },
          { name: "ISO 27001", org: "Information Security", desc: "Certified global ISMS security management." },
          { name: "FedRAMP High Ready", org: "Federal Government", desc: "Strict data residency and sovereign tenancy options." },
        ].map((cert, idx) => (
          <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-200 text-center">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-bold flex items-center justify-center mx-auto mb-3 text-xs">
              ★
            </div>
            <div className="font-bold text-slate-900 text-sm mb-1">{cert.name}</div>
            <div className="text-[10px] font-mono text-blue-600 uppercase font-semibold mb-2">{cert.org}</div>
            <div className="text-xs text-slate-500 leading-normal">{cert.desc}</div>
          </div>
        ))}
      </div>

      {/* Enterprise SLA Grid */}
      <div className="bg-slate-900 text-white rounded-2xl p-8 sm:p-12 text-center">
        <h3 className="text-2xl font-extrabold mb-4">Dedicated Enterprise SLA &amp; Global Support</h3>
        <p className="text-slate-300 text-xs sm:text-sm max-w-2xl mx-auto mb-8 leading-relaxed">
          Guaranteed 99.99% uptime with financial penalties, 15-minute response time for P1 incidents, and a
          dedicated Technical Account Manager (TAM) assigned to your organization.
        </p>
        <button
          onClick={() => setProductPage("contact")}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
        >
          Request Enterprise Master Services Agreement
        </button>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// TAB 6: RESOURCES (WHITEPAPERS & ROI CALCULATOR)
// ═════════════════════════════════════════════════════════════════════════════════

function QuantaResourcesTab({ setProductPage }: { setProductPage: (p: string) => void }) {
  const [entityCount, setEntityCount] = useState(25);
  const [teamSize, setTeamSize] = useState(40);

  const hoursSaved = Math.round(entityCount * 180 + teamSize * 120);
  const dollarSaved = (hoursSaved * 95).toLocaleString();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-4">
          Resources &amp; ROI
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
          Architectural Guides &amp; Enterprise ROI
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Explore technical blueprints, benchmark reports, and calculate projected annual return on investment
          for your finance organization.
        </p>
      </div>

      {/* Interactive ROI Calculator */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">Interactive Quanta ROI Calculator</h2>
        <p className="text-xs text-slate-500 mb-8">
          Based on verified client studies across Fortune 500 controllers and accounting departments.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div>
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-slate-700">Number of Legal Subsidiaries:</span>
              <span className="text-blue-600 font-mono text-sm">{entityCount} Entities</span>
            </div>
            <input
              type="range"
              min="5"
              max="150"
              value={entityCount}
              onChange={(e) => setEntityCount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>5 Entities</span>
              <span>75 Entities</span>
              <span>150 Entities</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-bold mb-2">
              <span className="text-slate-700">Accounting &amp; Finance Team Size:</span>
              <span className="text-blue-600 font-mono text-sm">{teamSize} Professionals</span>
            </div>
            <input
              type="range"
              min="5"
              max="200"
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>5 People</span>
              <span>100 People</span>
              <span>200 People</span>
            </div>
          </div>
        </div>

        {/* Calculated Results */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-xl bg-blue-50/50 border border-blue-200/80">
          <div className="text-center">
            <div className="text-xs text-blue-700 font-bold uppercase mb-1">Annual Accounting Hours Saved</div>
            <div className="text-3xl font-extrabold text-blue-900">{hoursSaved.toLocaleString()} Hours</div>
            <div className="text-[11px] text-slate-500 mt-1">Eliminated manual reconciliations</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-blue-700 font-bold uppercase mb-1">Projected Annual Savings</div>
            <div className="text-3xl font-extrabold text-emerald-700">${dollarSaved}</div>
            <div className="text-[11px] text-slate-500 mt-1">Direct labor &amp; audit fee reduction</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-blue-700 font-bold uppercase mb-1">Close Timeline Compression</div>
            <div className="text-3xl font-extrabold text-indigo-700">68% Faster</div>
            <div className="text-[11px] text-slate-500 mt-1">From 14 Days to &lt; 4.5 Hours</div>
          </div>
        </div>
      </div>

      {/* Downloadable Whitepapers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "The Autonomous Ledger Blueprint",
            desc: "Technical engineering deep-dive on continuous streaming close architecture for high-volume enterprise ERP environments.",
            tag: "Architecture Guide",
            pages: "38 Pages PDF",
          },
          {
            title: "CFO Benchmark: Continuous vs Batch Close",
            desc: "Survey of 4,200 CFOs analyzing total cost of ownership, error rates, and team retention between legacy batch closes and real-time ledgers.",
            tag: "Industry Report",
            pages: "46 Pages PDF",
          },
          {
            title: "ASC 810 Multi-Entity Consolidation",
            desc: "Practical handbook for automating intercompany eliminations, currency remeasurement, and non-controlling interest allocations.",
            tag: "Accounting Whitepaper",
            pages: "24 Pages PDF",
          },
        ].map((doc, idx) => (
          <div key={idx} className="p-6 bg-white rounded-2xl border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-800">
                  {doc.tag}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{doc.pages}</span>
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-2">{doc.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-6">{doc.desc}</p>
            </div>
            <button
              onClick={() => setProductPage("contact")}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
            >
              Request Whitepaper Copy →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// TAB 7: CONTACT SALES
// ═════════════════════════════════════════════════════════════════════════════════

function QuantaContactTab({ navigate }: { navigate: (r: Route) => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    erp: "SAP S/4HANA",
    entities: "10 - 50 Entities",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 mb-4">
          Enterprise Demo
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
          Schedule Quanta Architecture Walkthrough
        </h1>
        <p className="text-slate-600 text-sm">
          Speak with our enterprise solutions architects and former Big 4 partners to evaluate Quanta on your
          existing ERP infrastructure.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm">
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Demo Request Confirmed</h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto mb-6">
              Thank you, {formData.name || "Finance Leader"}. Our enterprise solutions director will reach out to{" "}
              <strong>{formData.email || "your email"}</strong> within 2 hours with tailored calendar times.
            </p>
            <button
              onClick={() => navigate({ page: "home" })}
              className="px-6 py-2.5 bg-blue-600 text-white font-semibold text-xs rounded-xl shadow-xs hover:bg-blue-700 cursor-pointer"
            >
              Return to Sheshi Home
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-slate-700 font-bold mb-2">Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Sarah Jenkins"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-2">Work Email *</label>
                <input
                  required
                  type="email"
                  placeholder="sarah@enterprise.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-900"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="block text-slate-700 font-bold mb-2">Company Name *</label>
                <input
                  required
                  type="text"
                  placeholder="Global Holdings Inc"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-slate-900"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-2">Primary Core ERP *</label>
                <select
                  value={formData.erp}
                  onChange={(e) => setFormData({ ...formData, erp: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white text-slate-900 cursor-pointer"
                >
                  <option>SAP S/4HANA</option>
                  <option>SAP ECC 6.0</option>
                  <option>NetSuite OneWorld</option>
                  <option>Oracle Fusion Cloud</option>
                  <option>Workday Financials</option>
                  <option>Microsoft Dynamics 365</option>
                  <option>Other / Multi-ERP Stack</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-2">Legal Entities Count</label>
                <select
                  value={formData.entities}
                  onChange={(e) => setFormData({ ...formData, entities: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none bg-white text-slate-900 cursor-pointer"
                >
                  <option>1 - 10 Entities</option>
                  <option>10 - 50 Entities</option>
                  <option>50 - 150 Entities</option>
                  <option>150+ Global Entities</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                Schedule Architecture Walkthrough &amp; Invariant Demo
              </button>
              <div className="text-center text-[11px] text-slate-400 mt-3">
                Protected by Enterprise NDA • Zero obligation • Tailored technical session
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
