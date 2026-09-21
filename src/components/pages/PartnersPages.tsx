import { useState } from "react";
import { Route } from "../../types";

export default function PartnersPages({
  sub,
  navigate,
}: {
  sub?: string;
  navigate: (r: Route) => void;
}) {
  switch (sub) {
    case "tech":
      return <TechPartnersPage navigate={navigate} />;
    case "strategic":
      return <StrategicPartnersPage navigate={navigate} />;
    case "join":
      return <JoinPartnerPage navigate={navigate} />;
    default:
      return <TechPartnersPage navigate={navigate} />;
  }
}

function TechPartnersPage({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 shadow-xs mb-4">
            Technology Ecosystem
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            ISV &amp; Technology Partners
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Pre-built, certified integrations with leading enterprise resource planning, banking, and data platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            { name: "SAP S/4HANA", type: "Certified ERP Connector", desc: "Native Change Data Capture (CDC) streaming integration for enterprise accounting clusters." },
            { name: "Oracle Cloud Infrastructure", type: "Certified ERP Partner", desc: "Bi-directional ledger synchronization and Subledger Accounting (SLA) verification." },
            { name: "NetSuite OneWorld", type: "SuiteCloud Developer", desc: "Multi-subsidiary automated journal creation and consolidation rollups." },
            { name: "Workday Financials", type: "Enterprise Integration", desc: "Automated business process event triggers and financial reporting integration." },
            { name: "Kyriba Treasury", type: "Treasury Management", desc: "Direct cash positioning and multi-currency bank account balancing." },
            { name: "Snowflake & Databricks", type: "Data Lakehouse", desc: "High-volume analytical export with cryptographic provenance metadata." },
          ].map((partner, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 text-left">
              <span className="text-[10px] font-mono font-bold text-amber-700 uppercase mb-2 block">{partner.type}</span>
              <h2 className="font-bold text-slate-900 text-lg mb-2">{partner.name}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{partner.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate({ page: "partners", sub: "join" })}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
          >
            Apply to Become a Tech Partner →
          </button>
        </div>
      </div>
    </div>
  );
}

function StrategicPartnersPage({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 shadow-xs mb-4">
            Advisory Alliances
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Accounting &amp; Advisory Alliances
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Collaborating with global accounting firms, systems integrators, and CFO advisory networks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {[
            { name: "PwC Advisory & Audit", desc: "Collaborative implementation frameworks for continuous close and read-only auditor vaults." },
            { name: "EY Technology Consulting", desc: "Enterprise multi-subsidiary transformation practices powered by Sheshi Quanta." },
            { name: "Deloitte Digital Finance", desc: "Global finance modernization and ERP streaming ledger architecture." },
            { name: "KPMG Lighthouse", desc: "Autonomous accounting, tax compliance, and automated SOX 404 controls testing." },
            { name: "BDO Global Advisors", desc: "Client accounting services (CAS) and advisory scaling with ConsultEase." },
            { name: "RSM International", desc: "Mid-market enterprise ERP migration and automated reconciliations." },
          ].map((partner, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 text-left">
              <h2 className="font-bold text-slate-900 text-lg mb-2">{partner.name}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{partner.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => navigate({ page: "partners", sub: "join" })}
            className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
          >
            Explore Strategic Alliance Benefits →
          </button>
        </div>
      </div>
    </div>
  );
}

function JoinPartnerPage({ navigate }: { navigate: (r: Route) => void }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-3">Become a Sheshi Partner</h1>
          <p className="text-slate-600 text-sm">
            Join our partner network to deliver governed financial intelligence to your clients with dedicated
            revenue sharing, developer sandboxes, and co-marketing support.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                ✓
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">Partner Application Received!</h2>
              <p className="text-xs text-slate-600 mb-6">
                Our alliance director will reach out within 4 hours to arrange your partner enablement session.
              </p>
              <button
                onClick={() => navigate({ page: "home" })}
                className="px-5 py-2 bg-amber-600 text-white text-xs font-semibold rounded-xl cursor-pointer"
              >
                Return to Sheshi Home
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Partner Lead Name *</label>
                  <input required type="text" placeholder="Michael Vance" className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-slate-900" />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Business Email *</label>
                  <input required type="email" placeholder="michael@firm.com" className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-slate-900" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Company / Firm Name *</label>
                  <input required type="text" placeholder="Global Consulting Partners" className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-slate-900" />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Partnership Track *</label>
                  <select className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none bg-white text-slate-900">
                    <option>Strategic Accounting &amp; Advisory Firm</option>
                    <option>Independent Software Vendor (ISV / ERP)</option>
                    <option>Systems Integrator (SI)</option>
                    <option>Venture Capital / Portfolio Partner</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl shadow-md cursor-pointer transition-all mt-4"
              >
                Submit Partner Application
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
