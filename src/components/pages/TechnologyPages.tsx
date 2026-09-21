import { useState } from "react";
import { Route } from "../../types";

export default function TechnologyPages({
  sub,
  navigate,
}: {
  sub?: string;
  navigate: (r: Route) => void;
}) {
  switch (sub) {
    case "fos":
      return <FOSPage navigate={navigate} />;
    case "ai":
      return <AIPage navigate={navigate} />;
    case "integrations":
      return <IntegrationsPage navigate={navigate} />;
    case "security":
      return <SecurityPage navigate={navigate} />;
    case "trust":
      return <TrustPage navigate={navigate} />;
    default:
      return <FOSPage navigate={navigate} />;
  }
}

// ═════════════════════════════════════════════════════════════════════════════════
// 1. FINANCIAL OPERATING SYSTEM (FOS)
// ═════════════════════════════════════════════════════════════════════════════════

function FOSPage({ navigate }: { navigate: (r: Route) => void }) {
  const [activeCodeTab, setActiveCodeTab] = useState<"curl" | "ts" | "py">("curl");

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs mb-4">
            System Architecture
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            The Financial Operating System (FOS)
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            The authoritative infrastructure layer that sits between raw transactional databases (ERPs, banks,
            gateways) and audited financial truth.
          </p>
        </div>

        {/* 4-Tier Interactive Architecture Diagram */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 mb-16 shadow-xs">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">4-Tier Governed System Topology</h2>
          <div className="space-y-4 max-w-4xl mx-auto">
            {[
              {
                tier: "TIER 01",
                name: "Streaming Ingestion & Change Data Capture (CDC)",
                tech: "Apache Kafka • Debezium • Enterprise REST Webhooks • ISO 20022 Banking",
                desc: "Sub-50ms queue ingestion of transactions from SAP S/4HANA, NetSuite, Workday, and banking clearing feeds without modifying legacy ERP source tables.",
              },
              {
                tier: "TIER 02",
                name: "Canonical Schema Normalization & Double-Entry Invariant Engine",
                tech: "Deterministic State Machine • AST Parser • Invariant Proof Rules",
                desc: "Validates double-entry invariants (Debits = Credits, Valid Segment & Cost Center) and normalizes disparate subsidiary chart-of-accounts into a unified schema.",
              },
              {
                tier: "TIER 03",
                name: "Continuous Multi-Entity Ledger State (ASC 810 / IFRS 10)",
                tech: "Streaming Balance Engine • Bilateral Intercompany Netting • Currency CTA",
                desc: "Maintains real-time consolidated trial balances across 100+ entities with instant functional vs presentation currency remeasurement under ASC 830.",
              },
              {
                tier: "TIER 04",
                name: "Cryptographic Provenance & Big 4 Read-Only Auditor Vault",
                tech: "SHA-256 Merkle Provenance • WORM Cloud Storage • GraphQL / gRPC API",
                desc: "Every posted journal and reconciliation is sealed with cryptographic hashes, granting external auditors direct read-only access to self-verifying proof.",
              },
            ].map((t, i) => (
              <div key={i} className="p-6 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-mono font-bold text-blue-700">{t.tier}</span>
                  <span className="text-[11px] font-mono text-slate-500">{t.tech}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{t.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Interactive API Explorer */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 shadow-xl mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-blue-400 font-bold uppercase">DEVELOPER API</span>
              <h3 className="text-xl font-bold mt-1">Autonomous Ledger Stream API</h3>
            </div>
            <div className="flex gap-2">
              {(["curl", "ts", "py"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCodeTab(tab)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold cursor-pointer ${
                    activeCodeTab === tab ? "bg-blue-600 text-white" : "bg-slate-800 text-slate-400 hover:bg-slate-700"
                  }`}
                >
                  {tab.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <pre className="font-mono text-xs text-slate-300 overflow-x-auto p-4 bg-slate-950 rounded-xl leading-relaxed">
            {activeCodeTab === "curl" &&
              `curl -X POST https://api.sheshi.com/v2/ledger/invariants/verify \\
  -H "Authorization: Bearer sec_live_89128f7a90b4" \\
  -H "Content-Type: application/json" \\
  -d '{
    "entity_id": "ENT-1001-US-CORP",
    "period": "2026-09",
    "enforce_intercompany_netting": true,
    "tolerance_usd": 0.00
  }'`}
            {activeCodeTab === "ts" &&
              `import { SheshiClient } from "@sheshi/sdk";

const client = new SheshiClient({ apiKey: process.env.SHESHI_API_KEY });

const verification = await client.ledger.verifyInvariants({
  entityId: "ENT-1001-US-CORP",
  period: "2026-09",
  enforceIntercompanyNetting: true,
  toleranceUsd: 0.0,
});

console.log("Invariant status:", verification.isBalanced); // true`}
            {activeCodeTab === "py" &&
              `from sheshi import SheshiClient

client = SheshiClient(api_key="sec_live_89128f7a90b4")

result = client.ledger.verify_invariants(
    entity_id="ENT-1001-US-CORP",
    period="2026-09",
    enforce_intercompany_netting=True,
    tolerance_usd=0.0
)

print(f"Cryptographic Hash: {result.merkle_root}")`}
          </pre>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate({ page: "products", sub: "quanta" })}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            Explore Quanta Implementation →
          </button>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// 2. AI & AUTOMATION
// ═════════════════════════════════════════════════════════════════════════════════

function AIPage({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs mb-4">
            Zero-Hallucination AI
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Deterministic AI Engineered for Financial Truth
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Why probabilistic LLMs cannot be trusted with balance sheets, and how Sheshi combines mathematical
            symbolic solvers with semantic attribution models.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 mb-16 shadow-xs overflow-x-auto">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Probabilistic AI vs Sheshi Deterministic Engine
          </h2>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 uppercase font-mono">
                <th className="py-3 px-4">Capability</th>
                <th className="py-3 px-4 text-rose-600">Generic LLM / Chatbot</th>
                <th className="py-3 px-4 text-blue-700 font-bold">Sheshi Deterministic Engine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {[
                { cap: "Mathematical Invariant Proof", llm: "Probabilistic approximation (can hallucinate figures)", sheshi: "100% Deterministic (Debits == Credits invariant)" },
                { cap: "Audit Evidence Traceability", llm: "Opaque weights (Black-box rationale)", sheshi: "Cryptographic SHA-256 link to raw ERP line items" },
                { cap: "ASC 810 Intercompany Netting", llm: "Prone to sign inversion and rounding drift", sheshi: "Strict bilateral elimination matrix" },
                { cap: "SOX 404 Control Compliance", llm: "Cannot legally be certified by external auditors", sheshi: "PCAOB and Big 4 read-only audit vault ready" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-slate-900">{row.cap}</td>
                  <td className="py-3 px-4 text-slate-600">{row.llm}</td>
                  <td className="py-3 px-4 text-blue-700 font-semibold">{row.sheshi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate({ page: "contact" })}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
          >
            Request AI Architecture Whitepaper
          </button>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// 3. INTEGRATIONS CATALOG
// ═════════════════════════════════════════════════════════════════════════════════

function IntegrationsPage({ navigate }: { navigate: (r: Route) => void }) {
  const [category, setCategory] = useState("all");

  const connectors = [
    { name: "SAP S/4HANA", cat: "erp", latency: "12ms", desc: "Real-time CDC extraction for general ledger, AP, AR, and material ledger." },
    { name: "NetSuite OneWorld", cat: "erp", latency: "18ms", desc: "Multi-subsidiary trial balance synchronization and automated journal posting." },
    { name: "Oracle Fusion Cloud", cat: "erp", latency: "24ms", desc: "Bi-directional ledger sync and subledger accounting (SLA) tie-out." },
    { name: "Workday Financials", cat: "erp", latency: "20ms", desc: "Direct journal entry voucher injection and business process workflow triggers." },
    { name: "J.P. Morgan Chase", cat: "bank", latency: "Instant", desc: "Direct ISO 20022 camt.053 intraday bank statement streaming." },
    { name: "Bank of America", cat: "bank", latency: "Instant", desc: "Automated lockbox and ACH clearing account reconciliation." },
    { name: "Stripe Enterprise", cat: "pay", latency: "Sub-second", desc: "Automated fee netting, dispute holds, and multi-currency payouts." },
    { name: "Brex & Ramp", cat: "pay", latency: "Instant", desc: "Automated corporate card receipt matching and department spend categorization." },
    { name: "Salesforce Billing", cat: "crm", latency: "Real-time", desc: "Contract-to-cash invoice reconciliation and ASC 606 revenue recognition." },
  ];

  const filtered = category === "all" ? connectors : connectors.filter((c) => c.cat === category);

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs mb-4">
            Ecosystem Directory
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Pre-Built Connectors for Your Enterprise Stack
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Zero-code, high-throughput bi-directional synchronization with ERPs, banks, and clearing houses.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: "all", label: "All Connectors" },
            { id: "erp", label: "Core ERPs" },
            { id: "bank", label: "Corporate Banking" },
            { id: "pay", label: "Payments & Corporate Cards" },
            { id: "crm", label: "CRM & Billing" },
          ].map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                category === c.id
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filtered.map((item, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-slate-900 text-base">{item.name}</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-[10px] font-bold border border-emerald-200">
                    {item.latency}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{item.desc}</p>
              </div>
              <div className="pt-3 border-t border-slate-100 text-xs font-semibold text-blue-600 flex items-center justify-between">
                <span>Certified Connector</span>
                <span>Active →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// 4. SECURITY & COMPLIANCE
// ═════════════════════════════════════════════════════════════════════════════════

function SecurityPage({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs mb-4">
            Security Architecture
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Defense-in-Depth Financial Infrastructure
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Engineered to safeguard confidential corporate financials with cryptographic WORM guarantees,
            zero-knowledge auditor vaults, and sovereign cloud residency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 bg-white rounded-2xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-2">AES-256 GCM &amp; TLS 1.3</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              All financial data is encrypted at rest using dedicated customer-managed encryption keys (CMEK) and
              in transit using modern cipher suites.
            </p>
          </div>
          <div className="p-8 bg-white rounded-2xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Cryptographic Immutability</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every balance modification is sealed into a SHA-256 hash tree. Any unauthorized backdated entry breaks
              the verification chain immediately.
            </p>
          </div>
          <div className="p-8 bg-white rounded-2xl border border-slate-200">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Sovereign Data Residency</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Deploy in dedicated sovereign cloud regions across the US, European Union, UK, Singapore, or
              Australia to meet strict statutory data localization.
            </p>
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate({ page: "technology", sub: "trust" })}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer"
          >
            Visit Live Trust Center →
          </button>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// 5. TRUST CENTER
// ═════════════════════════════════════════════════════════════════════════════════

function TrustPage({ navigate }: { navigate: (r: Route) => void }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs mb-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>All Systems Operational • 99.99% Uptime</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Sheshi Trust Center
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Real-time system availability, compliance certifications, and independent auditor attestations.
          </p>
        </div>

        {/* Live System Status Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 mb-16 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase">90-DAY UPTIME HISTORY</span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">99.994% Availability</h2>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
              ● Zero Unscheduled Downtime
            </span>
          </div>

          {/* 90-Day Pips Grid */}
          <div className="flex items-center gap-1 overflow-hidden py-2">
            {Array.from({ length: 90 }).map((_, idx) => (
              <div
                key={idx}
                className="h-8 flex-1 bg-emerald-500 rounded-xs hover:bg-emerald-400 transition-colors cursor-pointer"
                title={`Day ${idx + 1}: 100% Operational`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-2">
            <span>90 Days Ago</span>
            <span>Today (Operational)</span>
          </div>
        </div>

        {/* 6 Compliance Certifications */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
          {[
            { name: "SOC 1 Type II", auth: "AICPA / SSAE 18", desc: "Annual evaluation of internal financial reporting controls." },
            { name: "SOC 2 Type II", auth: "AICPA Trust Principles", desc: "Annual audit for Security, Availability, and Confidentiality." },
            { name: "ISO 27001", auth: "BSI Global Certified", desc: "Information security management system (ISMS) standard." },
            { name: "FedRAMP High Ready", auth: "US Federal Framework", desc: "Strict government data residency and operational security." },
            { name: "GDPR Compliant", auth: "EU Data Privacy", desc: "Full European Union data sovereignty and right-to-erasure." },
            { name: "HIPAA Compliant", auth: "Healthcare Security", desc: "BAA agreements for healthcare client accounting." },
          ].map((cert, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 text-left flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-blue-600 uppercase mb-1 block">{cert.auth}</span>
                <h3 className="font-bold text-slate-900 text-sm mb-2">{cert.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{cert.desc}</p>
              </div>
              <button
                onClick={() => {
                  setModalOpen(true);
                  setSubmitted(false);
                }}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer text-left"
              >
                Request Audit Report →
              </button>
            </div>
          ))}
        </div>

        {/* Auditor Request Modal */}
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
                  <h3 className="text-lg font-bold text-slate-900 mb-2">NDA &amp; Audit Packet Sent</h3>
                  <p className="text-xs text-slate-600 mb-6">
                    Our compliance team has dispatched our SOC 1 &amp; SOC 2 Type II packages to your corporate email.
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
                    <span className="text-[10px] font-mono text-blue-600 uppercase font-bold">SECURITY COMPLIANCE</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">Request SOC 1 / SOC 2 Report</h3>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Corporate Email *</label>
                    <input required type="email" placeholder="cfo@enterprise.com" className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-slate-900" />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Company Legal Name *</label>
                    <input required type="text" placeholder="Global Corp Inc" className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-slate-900" />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl cursor-pointer transition-all"
                  >
                    Sign NDA &amp; Download Reports
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
