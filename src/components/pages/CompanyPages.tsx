import { useState } from "react";
import { Route } from "../../types";

// ─── Company Pages Router ─────────────────────────────────────────────────────

export default function CompanyPages({
  sub,
  navigate,
}: {
  sub?: string;
  navigate: (r: Route) => void;
}) {
  switch (sub) {
    case "about":
      return <AboutSheshiPage navigate={navigate} />;
    case "story":
      return <OurStoryPage navigate={navigate} />;
    case "leadership":
      return <LeadershipPage navigate={navigate} />;
    case "team":
      return <TeamPage navigate={navigate} />;
    case "culture":
      return <CulturePage navigate={navigate} />;
    case "careers":
      return <CareersPage navigate={navigate} />;
    default:
      return <AboutSheshiPage navigate={navigate} />;
  }
}

// ═════════════════════════════════════════════════════════════════════════════════
// 1. ABOUT SHESHI
// ═════════════════════════════════════════════════════════════════════════════════

function AboutSheshiPage({ navigate }: { navigate: (r: Route) => void }) {
  const hubs = [
    { city: "San Francisco", address: "555 California St, Suite 3200", region: "North America HQ", time: "PST" },
    { city: "London", address: "100 Bishopsgate, 18th Floor", region: "EMEA HQ", time: "GMT" },
    { city: "Singapore", address: "Marina Bay Financial Centre, Tower 2", region: "APAC HQ", time: "SGT" },
    { city: "Bengaluru", address: "Outer Ring Road, Tech Corridor", region: "Global R&D Hub", time: "IST" },
    { city: "Sydney", address: "Barangaroo International Towers", region: "ANZ Operations", time: "AEST" },
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen">
      {/* 21st.dev Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50/25 to-slate-50 border-b border-slate-200/80 pt-20 pb-24 px-6 md:px-12">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(37,99,235,0.12),rgba(255,255,255,0))] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Corporate Mission &amp; Purpose</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
            Built from Inside Finance. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600">
              For the World Outside It.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Sheshi was founded on a simple truth: Enterprise ERPs record raw transactions, but the critical work
            of closing, consolidating, analyzing, and reporting happens in un-governed spreadsheets. We engineered
            the mathematical operating system that unites them all.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate({ page: "contact" })}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md transition-all cursor-pointer"
            >
              Request Leadership Briefing
            </button>
            <button
              onClick={() => navigate({ page: "company", sub: "story" })}
              className="px-6 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-xs shadow-xs transition-all cursor-pointer"
            >
              Read Our Founding Story →
            </button>
          </div>
        </div>
      </section>

      {/* 4 Key Numbers */}
      <section className="py-12 bg-white border-b border-slate-200/80 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { stat: "20+ Years", label: "Accounting Practice Pedigree", sub: "Founded by Fellow Chartered Accountants" },
            { stat: "50M+", label: "Governed Financial Records", sub: "Processed with sub-second latency" },
            { stat: "0", label: "SOX 404 Deficiencies", sub: "Across all enterprise deployments" },
            { stat: "5 Hubs", label: "Global Presence", sub: "San Francisco, London, Singapore, BLR, Sydney" },
          ].map((m, i) => (
            <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <div className="text-3xl font-extrabold text-blue-700 mb-1">{m.stat}</div>
              <div className="text-xs font-bold text-slate-800 mb-0.5">{m.label}</div>
              <div className="text-[11px] text-slate-500 font-mono">{m.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Founder Letter Band */}
      <section className="py-20 bg-slate-50 px-6 md:px-12 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 shadow-sm">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-6 text-2xl font-serif">
            “
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">A Letter from the Founder</h2>
          <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
            <p>
              For over twenty years in audit and enterprise financial practice, I watched brilliant CFOs and controllers
              fight the same losing battle. At the end of every quarter, regardless of whether a company ran SAP,
              Oracle, or NetSuite, finance teams would export millions of rows into fragile, un-versioned Excel workbooks.
            </p>
            <p>
              Millions of dollars were lost to broken formulas, unnoticed intercompany imbalances, and the exhaustion of
              80-hour close weeks. Point solutions claimed to fix this, but each one created its own silo.
            </p>
            <p>
              We built Sheshi because finance does not need another disconnected dashboard. Finance needs a single,
              governed financial operating system that enforces mathematical invariants at the speed of distributed
              streaming infrastructure.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
            <div>
              <div className="font-bold text-slate-900 text-sm">Goutham Sheshi, FCA</div>
              <div className="text-xs text-slate-500">Founder &amp; Chief Executive Officer</div>
            </div>
            <span className="text-xs font-mono text-blue-600 font-semibold">Chartered Accountant &bull; Systems Architect</span>
          </div>
        </div>
      </section>

      {/* 21st.dev Bento Grid: Corporate Pillars */}
      <section className="py-20 bg-white px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-3">Our Corporate Principles</h2>
            <p className="text-slate-600 text-sm">
              The fundamental convictions that guide how we design financial software and steward customer data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "Mathematical Determinism Over Heuristics",
                desc: "Financial ledgers cannot hallucinate. Where other systems use loose probabilities, Sheshi enforces strict double-entry mathematical invariants: Assets must equal Liabilities plus Equity at every microsecond.",
                tag: "Core Invariant",
              },
              {
                title: "Auditors as First-Class Citizens",
                desc: "We believe month-end audits should not be an afterthought of chaotic PBC binder compilation. We built dedicated, read-only cryptographic vaults for Big 4 audit partners from day one.",
                tag: "Governance",
              },
              {
                title: "Zero-Latency Real-Time Close",
                desc: "Month-end close is an artifact of the punch-card batch era. By streaming continuous transactions into a real-time state machine, Day 0 close becomes reality.",
                tag: "Architecture",
              },
              {
                title: "Controller Empathy & Human Craft",
                desc: "We engineer for the people who bear legal liability for financial filings. Every interface, notification, and workflow is crafted to eliminate stress and cognitive overload.",
                tag: "Humanity",
              },
            ].map((pillar, i) => (
              <div key={i} className="p-8 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all">
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 uppercase mb-3 inline-block">
                  {pillar.tag}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{pillar.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-16 bg-slate-50 border-t border-slate-200/80 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Global Operations &amp; Engineering Hubs</h2>
            <p className="text-slate-600 text-xs">Follow-the-sun enterprise support and distributed engineering.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {hubs.map((h, i) => (
              <div key={i} className="p-5 bg-white rounded-xl border border-slate-200 text-left">
                <div className="text-xs font-mono font-bold text-blue-600 mb-1">{h.time}</div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{h.city}</h3>
                <div className="text-[11px] text-slate-500 mb-2">{h.region}</div>
                <div className="text-[11px] text-slate-400 font-mono leading-snug">{h.address}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// 2. OUR STORY (MILESTONE TIMELINE)
// ═════════════════════════════════════════════════════════════════════════════════

function OurStoryPage({ navigate }: { navigate: (r: Route) => void }) {
  const milestones = [
    {
      year: "2022",
      title: "The Genesis & Whitepaper",
      desc: "Following two decades of Big 4 and corporate controller practice, the foundational blueprint for a mathematically verified, continuous streaming financial operating system was authored.",
    },
    {
      year: "2023",
      title: "Kafka CDC & Invariant Engine",
      desc: "Built the high-throughput change-data-capture (CDC) pipeline capable of ingesting 50,000 transactions per second from legacy SAP ECC and NetSuite systems without modifying source tables.",
    },
    {
      year: "2024",
      title: "Big 4 Read-Only Audit Vault",
      desc: "Launched cryptographic SHA-256 block hashing on all balance sheet schedules, allowing external audit partners to independently verify trial balances with zero manual PBC binders.",
    },
    {
      year: "2025",
      title: "Multi-Subsidiary Consolidation (Quanta)",
      desc: "Engineered automated bilateral intercompany eliminations under ASC 810 and IFRS 10, compressing 14-day close cycles for global multinational enterprises down to under 5 hours.",
    },
    {
      year: "2026",
      title: "Autonomous Finance OS 2.0 & NEXUS",
      desc: "Expanded to 4 specialized suites (Quanta, Catalyx, ConsultEase, Sheshi FR) serving Fortune 500 enterprises, high-growth startups, and Top 100 advisory practices worldwide.",
    },
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs mb-4">
            Our Journey
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            How Sheshi Was Engineered
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            From late nights debugging broken reconciliation formulas to building the authoritative operating
            system for modern enterprise finance.
          </p>
        </div>

        {/* 21st.dev Vertical Timeline */}
        <div className="relative border-l-2 border-blue-200 ml-4 sm:ml-8 space-y-12 mb-20 pl-6 sm:pl-10">
          {milestones.map((m, i) => (
            <div key={i} className="relative group">
              <div className="absolute -left-[31px] sm:-left-[47px] top-1 w-6 h-6 rounded-full bg-white border-4 border-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform" />
              <div className="text-xs font-mono font-bold text-blue-600 uppercase mb-1">{m.year} Milestone</div>
              <h2 className="text-xl font-bold text-slate-900 mb-2">{m.title}</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">{m.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center shadow-xs">
          <h2 className="text-xl font-bold text-slate-900 mb-2">Be Part of the Autonomous Close Revolution</h2>
          <p className="text-xs text-slate-600 mb-6 max-w-md mx-auto">
            Experience what happens when financial operations are built with engineering rigor.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate({ page: "products", sub: "quanta" })}
              className="px-5 py-2.5 bg-blue-600 text-white font-semibold text-xs rounded-xl hover:bg-blue-700 cursor-pointer transition-all"
            >
              Explore Quanta Engine
            </button>
            <button
              onClick={() => navigate({ page: "company", sub: "careers" })}
              className="px-5 py-2.5 bg-white border border-slate-300 text-slate-800 font-semibold text-xs rounded-xl hover:bg-slate-50 cursor-pointer transition-all"
            >
              Join Our Team →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// 3. EXECUTIVE LEADERSHIP
// ═════════════════════════════════════════════════════════════════════════════════

function LeadershipPage({ navigate }: { navigate: (r: Route) => void }) {
  const leaders = [
    {
      name: "Goutham Sheshi, FCA",
      role: "Founder & Chief Executive Officer",
      bio: "20+ years of chartered accounting practice and enterprise software leadership. Former advisory partner and advisor to Fortune 500 financial leadership.",
      pedigree: "Fellow Chartered Accountant • Systems Architect",
    },
    {
      name: "Dr. Elena Rostova",
      role: "Chief Technology Officer",
      bio: "Ph.D. in Distributed Systems from Stanford. Previously led streaming data infrastructure teams at Palantir and Apache Kafka committers.",
      pedigree: "Stanford Ph.D. • Ex-Palantir Principal",
    },
    {
      name: "Marcus Sterling, CPA",
      role: "Chief Product Officer",
      bio: "Former Big 4 audit partner and head of financial applications. Specialized in ASC 810 multi-entity consolidation and SOX 404 internal controls.",
      pedigree: "PwC Senior Director • AICPA Committee",
    },
    {
      name: "Sarah Jenkins",
      role: "Chief Revenue Officer",
      bio: "15+ years scaling enterprise fintech go-to-market teams. Previously VP of Global Enterprise Sales at SAP Financial Solutions and Workday.",
      pedigree: "Ex-Workday Financials • SAP Enterprise",
    },
    {
      name: "David Chen, CFA",
      role: "VP of Financial Engineering",
      bio: "Former quantitative strategist at Goldman Sachs. Leads the mathematical invariant verification engine and currency remeasurement models.",
      pedigree: "Goldman Sachs • MIT Mathematics",
    },
    {
      name: "Claire Vance",
      role: "General Counsel & VP Governance",
      bio: "Former SEC enforcement attorney and corporate governance partner specializing in PCAOB compliance and enterprise data sovereign privacy.",
      pedigree: "Ex-SEC Enforcement • Harvard Law",
    },
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs mb-4">
            Executive Management
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Accounting Rigor Meets Distributed Systems
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Our leadership team unites Chartered Accountants with veteran engineers from Goldman Sachs, SAP,
            Palantir, and Stanford.
          </p>
        </div>

        {/* Leaders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {leaders.map((leader, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white font-bold text-lg flex items-center justify-center mb-4 shadow-xs">
                  {leader.name.split(" ")[0][0]}
                  {leader.name.split(" ")[1] ? leader.name.split(" ")[1][0] : ""}
                </div>
                <h2 className="text-lg font-bold text-slate-900">{leader.name}</h2>
                <div className="text-xs font-semibold text-blue-600 mb-1">{leader.role}</div>
                <div className="text-[10px] font-mono uppercase text-slate-400 font-semibold mb-3">{leader.pedigree}</div>
                <p className="text-xs text-slate-600 leading-relaxed">{leader.bio}</p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-blue-600 font-medium">
                <span>Verified Executive Profile</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Advisory Board */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 text-center shadow-xs">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Advisory Board &amp; Investor Syndicate</h2>
          <p className="text-xs text-slate-600 max-w-xl mx-auto mb-8">
            Backed by former CFOs of Fortune 100 enterprises, prominent venture capital funds, and senior partners
            from Big 4 accounting firms.
          </p>
          <button
            onClick={() => navigate({ page: "contact" })}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs cursor-pointer transition-all"
          >
            Connect with Executive Office
          </button>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// 4. OUR TEAM
// ═════════════════════════════════════════════════════════════════════════════════

function TeamPage({ navigate }: { navigate: (r: Route) => void }) {
  const [department, setDepartment] = useState("all");

  const team = [
    { name: "Devin Zhao", role: "Principal Distributed Systems Engineer", dept: "eng", loc: "San Francisco" },
    { name: "Priya Sundaram", role: "Senior Financial Engineer (ASC 810)", dept: "fin", loc: "Singapore" },
    { name: "Alexander Wright", role: "Staff Kafka Streaming Architect", dept: "eng", loc: "London" },
    { name: "Ananya Sharma", role: "Lead Machine Learning Researcher", dept: "ai", loc: "Bengaluru" },
    { name: "Carlos Mendoza", role: "Head of Client Advisory Solutions", dept: "adv", loc: "New York" },
    { name: "Sophie Dupont", role: "Senior Security & Cryptography Engineer", dept: "eng", loc: "Paris" },
    { name: "Liam O'Connor", role: "VP Client Success & Implementations", dept: "adv", loc: "Dublin" },
    { name: "Yuki Tanaka", role: "Lead UI & Design Systems Engineer", dept: "eng", loc: "Tokyo" },
  ];

  const filtered = department === "all" ? team : team.filter((t) => t.dept === department);

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs mb-4">
            Global Workforce
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Meet the Builders of Sheshi
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            A distributed team across 28 countries united by craftsmanship, financial truth, and engineering depth.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: "all", label: "All Teams (180+)" },
            { id: "eng", label: "Distributed Systems & Security" },
            { id: "fin", label: "Financial Engineering" },
            { id: "ai", label: "Deterministic AI & Models" },
            { id: "adv", label: "Advisory & Implementation" },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setDepartment(d.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                department === d.id
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {filtered.map((member, i) => (
            <div key={i} className="p-5 bg-white rounded-2xl border border-slate-200 text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 font-bold text-sm flex items-center justify-center mb-3">
                {member.name[0]}
              </div>
              <h2 className="font-bold text-slate-900 text-sm">{member.name}</h2>
              <div className="text-xs text-blue-600 font-medium mb-1">{member.role}</div>
              <div className="text-[11px] text-slate-400 font-mono">📍 {member.loc}</div>
            </div>
          ))}
        </div>

        {/* Join CTA */}
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-2xl p-8 text-center shadow-md">
          <h2 className="text-2xl font-bold mb-2">Want to Build with Us?</h2>
          <p className="text-blue-100 text-xs mb-6 max-w-md mx-auto">
            We are hiring distributed systems engineers, financial analysts, and enterprise solutions architects.
          </p>
          <button
            onClick={() => navigate({ page: "company", sub: "careers" })}
            className="px-6 py-2.5 bg-white text-blue-700 font-bold text-xs rounded-xl shadow-xs hover:bg-blue-50 cursor-pointer transition-all"
          >
            Explore Open Roles →
          </button>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// 5. PEOPLE & CULTURE
// ═════════════════════════════════════════════════════════════════════════════════

function CulturePage({ navigate }: { navigate: (r: Route) => void }) {
  const benefits = [
    { title: "Remote-First Autonomy", desc: "Work from anywhere with home office stipends and local co-working memberships." },
    { title: "Meaningful Equity Ownership", desc: "Every employee receives incentive stock options with founder-aligned vesting." },
    { title: "Continuous Learning Budget", desc: "$3,500 annual stipend for CFA, CPA, technical conferences, and books." },
    { title: "Comprehensive Family Healthcare", desc: "100% premium coverage for medical, dental, vision, and mental health." },
    { title: "Flexible Time Off", desc: "Unlimited PTO with mandatory 3-week annual minimum to prevent burnout." },
    { title: "Annual Global Retreats", desc: "Twice-yearly gatherings in locations like Lisbon, Tokyo, and Whistler." },
  ];

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs mb-4">
            Culture &amp; Community
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Craftsmanship, Empathy &amp; Integrity
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We are building a company where deep domain expertise is respected, decisions are transparent,
            and personal well-being is paramount.
          </p>
        </div>

        {/* 4 Cultural Invariants */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {[
            {
              num: "01",
              title: "Audacity with Integrity",
              desc: "We tackle the most complex, high-liability problems in finance. We never cut corners or hide edge cases; truth in data is our product.",
            },
            {
              num: "02",
              title: "Craftsmanship over Speed",
              desc: "A broken financial ledger cannot be fixed with a quick hotfix. We build with the precision of civil engineers designing bridges.",
            },
            {
              num: "03",
              title: "Radical Transparency",
              desc: "From company runway to product roadmaps, information is shared openly across all levels of the organization.",
            },
            {
              num: "04",
              title: "Controller Empathy",
              desc: "We remember that behind every balance sheet is a human being striving to do their best work without burning out.",
            },
          ].map((principle, i) => (
            <div key={i} className="p-8 bg-white rounded-2xl border border-slate-200">
              <div className="text-xs font-mono font-bold text-blue-600 mb-2">{principle.num} // INVARIANT</div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">{principle.title}</h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{principle.desc}</p>
            </div>
          ))}
        </div>

        {/* Benefits & Wellness Grid */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-12 mb-20 shadow-xs">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Comprehensive Benefits &amp; Wellness</h2>
          <p className="text-xs text-slate-500 text-center mb-10 max-w-md mx-auto">
            Designed to support long-term careers and balanced, healthy lives.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                <h3 className="font-bold text-slate-900 text-sm mb-1">{b.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => navigate({ page: "company", sub: "careers" })}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            Join Our Mission — View Open Roles →
          </button>
        </div>
      </div>
    </div>
  );
}

// ═════════════════════════════════════════════════════════════════════════════════
// 6. CAREERS AT SHESHI
// ═════════════════════════════════════════════════════════════════════════════════

function CareersPage({ navigate }: { navigate: (r: Route) => void }) {
  const [filter, setFilter] = useState("all");
  const [applyingJob, setApplyingJob] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const jobs = [
    { id: "eng-1", title: "Senior Distributed Systems Engineer", dept: "eng", loc: "Remote (Global)", salary: "$185,000 - $240,000 + Equity" },
    { id: "eng-2", title: "Staff Streaming Ingestion Architect (Kafka)", dept: "eng", loc: "San Francisco / Remote", salary: "$210,000 - $275,000 + Equity" },
    { id: "fin-1", title: "Financial Engineering Lead (ASC 810 Consolidation)", dept: "fin", loc: "London / Remote", salary: "£130,000 - £170,000 + Equity" },
    { id: "ai-1", title: "Research Scientist — Deterministic Financial ML", dept: "ai", loc: "Bengaluru / Remote", salary: "₹45L - ₹75L + Equity" },
    { id: "prod-1", title: "Principal Product Manager (Quanta Core)", dept: "prod", loc: "San Francisco / Remote", salary: "$190,000 - $250,000 + Equity" },
    { id: "sales-1", title: "Enterprise Account Executive (Fortune 500)", dept: "sales", loc: "New York / Remote", salary: "$160k Base / $320k OTE + Equity" },
  ];

  const filteredJobs = filter === "all" ? jobs : jobs.filter((j) => j.dept === filter);

  return (
    <div className="bg-[#f8fafc] text-slate-900 min-h-screen py-16 px-6 md:px-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 shadow-xs mb-4">
            Careers at Sheshi
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">
            Work on What Truly Matters
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Help us build the next-generation operating system that powers trillions of dollars in global commerce.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: "all", label: "All Open Positions" },
            { id: "eng", label: "Engineering" },
            { id: "fin", label: "Financial Accounting" },
            { id: "ai", label: "AI Research" },
            { id: "prod", label: "Product" },
            { id: "sales", label: "Enterprise Sales" },
          ].map((d) => (
            <button
              key={d.id}
              onClick={() => setFilter(d.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                filter === d.id
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Jobs List */}
        <div className="space-y-4 mb-20">
          {filteredJobs.map((j) => (
            <div
              key={j.id}
              className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <h2 className="text-base font-bold text-slate-900 mb-1">{j.title}</h2>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-mono">
                  <span>📍 {j.loc}</span>
                  <span>•</span>
                  <span className="text-blue-600 font-bold">{j.salary}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setApplyingJob(j.title);
                  setSubmitted(false);
                }}
                className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white text-xs font-semibold rounded-xl border border-blue-200 transition-all cursor-pointer self-start sm:self-center"
              >
                Apply Now →
              </button>
            </div>
          ))}
        </div>

        {/* Application Modal */}
        {applyingJob && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl border border-slate-200 max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
              <button
                onClick={() => setApplyingJob(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-3 text-xl font-bold">
                    ✓
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Application Received!</h3>
                  <p className="text-xs text-slate-600 mb-6">
                    Thank you for applying for <strong>{applyingJob}</strong>. Our recruiting team will review your
                    submission within 48 hours.
                  </p>
                  <button
                    onClick={() => setApplyingJob(null)}
                    className="px-5 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Close Window
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
                  <div className="text-left">
                    <span className="text-[10px] font-mono text-blue-600 uppercase font-bold">APPLICATION</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">{applyingJob}</h3>
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Full Name *</label>
                    <input required type="text" placeholder="Sarah Mitchell" className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-slate-900" />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Email Address *</label>
                    <input required type="email" placeholder="sarah@example.com" className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-slate-900" />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">LinkedIn or Portfolio URL *</label>
                    <input required type="url" placeholder="https://linkedin.com/in/username" className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-slate-900" />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Brief Note on Why Sheshi</label>
                    <textarea rows={3} placeholder="Tell us what excites you about governed financial infrastructure..." className="w-full px-3 py-2 rounded-lg border border-slate-300 outline-none text-slate-900" />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs cursor-pointer transition-all"
                  >
                    Submit Application
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
