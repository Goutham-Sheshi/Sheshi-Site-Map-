import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type Route = { page: string; sub?: string; product?: string; productPage?: string };

// ─── Navigation Data ──────────────────────────────────────────────────────────

const NAV = [
  { label: "Home", page: "home" },
  {
    label: "Company", page: "company",
    children: [
      { label: "About Sheshi", sub: "about" },
      { label: "Our Story", sub: "story" },
      { label: "Leadership", sub: "leadership" },
      { label: "Our Team", sub: "team" },
      { label: "Careers", sub: "careers" },
      { label: "Contact Us", sub: "contact" },
    ],
  },
  {
    label: "Products", page: "products",
    children: [
      { label: "Quanta", sub: "quanta" },
      { label: "Catalyx", sub: "catalyx" },
      { label: "ConsultEase", sub: "consultease" },
      { label: "Sheshi FR", sub: "sheshifr" },
    ],
  },
  {
    label: "Solutions", page: "solutions",
    children: [
      { label: "Enterprise Finance", sub: "enterprise" },
      { label: "Startup Finance", sub: "startup" },
      { label: "Consulting & Advisory", sub: "consulting" },
      { label: "Finance Professionals", sub: "professionals" },
    ],
  },
  {
    label: "Technology", page: "technology",
    children: [
      { label: "Financial Operating System", sub: "fos" },
      { label: "AI & Automation", sub: "ai" },
      { label: "Integrations", sub: "integrations" },
      { label: "Security & Compliance", sub: "security" },
    ],
  },
  {
    label: "Resources", page: "resources",
    children: [
      { label: "Blog", sub: "blog" },
      { label: "Insights", sub: "insights" },
      { label: "Case Studies", sub: "casestudies" },
      { label: "Research", sub: "research" },
      { label: "Webinars & Events", sub: "webinars" },
      { label: "Product Updates", sub: "updates" },
    ],
  },
  {
    label: "Partners", page: "partners",
    children: [
      { label: "Technology Partners", sub: "tech" },
      { label: "Strategic Partners", sub: "strategic" },
      { label: "Become a Partner", sub: "join" },
    ],
  },
  { label: "Contact", page: "contact" },
];

const PRODUCTS = [
  { id: "quanta", label: "Quanta", tagline: "Enterprise Intelligence Platform", pages: [
    { id: "home", label: "Home" }, { id: "platform", label: "Platform" }, { id: "solutions", label: "Solutions" },
    { id: "capabilities", label: "Capabilities" }, { id: "enterprise", label: "Enterprise" },
    { id: "resources", label: "Resources" }, { id: "contact", label: "Contact Us" },
  ]},
  { id: "catalyx", label: "Catalyx", tagline: "Startup Finance Accelerator", pages: [
    { id: "home", label: "Home" }, { id: "solutions", label: "Solutions" }, { id: "features", label: "Features" },
    { id: "startups", label: "For Startups" }, { id: "resources", label: "Resources" }, { id: "contact", label: "Get in Touch" },
  ]},
  { id: "consultease", label: "ConsultEase", tagline: "Advisory Workflow Management", pages: [
    { id: "home", label: "Home" }, { id: "solutions", label: "Solutions" }, { id: "features", label: "Features" },
    { id: "firms", label: "For Consulting Firms" }, { id: "resources", label: "Resources" }, { id: "contact", label: "Contact Us" },
  ]},
  { id: "sheshifr", label: "Sheshi FR", tagline: "Financial Reporting Suite", pages: [
    { id: "home", label: "Home" }, { id: "features", label: "Features" }, { id: "workflows", label: "Workflows" },
    { id: "professionals", label: "For Finance Professionals" }, { id: "resources", label: "Resources" }, { id: "contact", label: "Contact Us" },
  ]},
];

const ACCENT_COLORS: Record<string, string> = {
  quanta: "#1a2744", catalyx: "#0d6b4e", consultease: "#7c3aed", sheshifr: "#b45309",
};

// ─── Primitive Helpers ────────────────────────────────────────────────────────

function Sk({ w = "full", h = "3", className = "" }: { w?: string; h?: string; className?: string }) {
  return <div className={`h-${h} bg-[#e2e6ea] rounded ${className}`} style={{ width: w === "full" ? "100%" : w }} />;
}

function SectionLabel({ text, light = false }: { text: string; light?: boolean }) {
  return (
    <p className={`text-xs font-semibold tracking-widest uppercase mb-3 ${light ? "text-white/50" : "text-[#3b5bdb]"}`}>
      {text}
    </p>
  );
}

function PageHero({ title, subtitle, breadcrumb }: { title: string; subtitle?: string; breadcrumb?: string[] }) {
  return (
    <div className="border-b border-[#dde1e7] bg-white px-8 py-12">
      {breadcrumb && <p className="text-xs text-[#9ca3af] mb-4 tracking-wide">{breadcrumb.join(" / ")}</p>}
      <h1 className="text-4xl font-bold text-[#1a2744] mb-3">{title}</h1>
      {subtitle && <p className="text-base text-[#6b7280] max-w-xl">{subtitle}</p>}
    </div>
  );
}

// ─── Reference-Styled Section Components ─────────────────────────────────────

// BlackLine / Trintech: Dark centered hero with large app mockup below
function HeroCentered({ eyebrow, bg = "#1a2744" }: { eyebrow: string; bg?: string }) {
  return (
    <div style={{ backgroundColor: bg }} className="px-8 py-20 text-center text-white">
      <span className="inline-block border border-white/20 text-white/70 text-xs px-3 py-1 rounded-full mb-6 tracking-wider uppercase">
        {eyebrow}
      </span>
      <div className="max-w-2xl mx-auto mb-6 space-y-3">
        <Sk w="85%" h="10" className="mx-auto" />
        <Sk w="70%" h="10" className="mx-auto" />
        <Sk w="55%" h="10" className="mx-auto" />
      </div>
      <div className="max-w-lg mx-auto mb-8 space-y-2">
        <Sk w="90%" h="4" className="mx-auto" />
        <Sk w="75%" h="4" className="mx-auto" />
      </div>
      <div className="flex gap-3 justify-center mb-14">
        <div className="bg-[#3b5bdb] text-white px-6 py-3 rounded-md text-sm font-semibold">Get Started</div>
        <div className="border border-white/30 text-white px-6 py-3 rounded-md text-sm font-semibold">Learn More</div>
      </div>
      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-xl h-72 flex items-center justify-center">
        <span className="text-white/20 text-sm tracking-wide uppercase">App Mockup / Screenshot</span>
      </div>
    </div>
  );
}

// FloQast / Trintech: Split hero — text left, mockup right
function HeroSplit({ eyebrow, bg = "#f8f9fb", dark = false }: { eyebrow: string; bg?: string; dark?: boolean }) {
  const txt = dark ? "text-white" : "text-[#1a2744]";
  const sub = dark ? "text-white/60" : "text-[#6b7280]";
  const btnBorder = dark ? "border-white/30 text-white" : "border-[#dde1e7] text-[#374151]";
  return (
    <div style={{ backgroundColor: bg }} className="px-8 py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <span className={`inline-block text-xs font-semibold tracking-widest uppercase mb-4 px-3 py-1 rounded-full border ${dark ? "border-white/20 text-white/50" : "border-[#dde1e7] text-[#3b5bdb]"}`}>
            {eyebrow}
          </span>
          <div className="space-y-3 mb-5">
            <Sk w="90%" h="10" className={dark ? "!bg-white/20" : ""} />
            <Sk w="75%" h="10" className={dark ? "!bg-white/20" : ""} />
          </div>
          <div className="space-y-2 mb-8">
            <Sk w="full" h="4" className={dark ? "!bg-white/10" : ""} />
            <Sk w="85%" h="4" className={dark ? "!bg-white/10" : ""} />
            <Sk w="70%" h="4" className={dark ? "!bg-white/10" : ""} />
          </div>
          <div className="flex gap-3">
            <div className={`bg-[#3b5bdb] text-white px-5 py-2.5 rounded-md text-sm font-semibold`}>Get Started</div>
            <div className={`border px-5 py-2.5 rounded-md text-sm font-semibold ${btnBorder}`}>See a Demo</div>
          </div>
        </div>
        <div className={`rounded-2xl h-80 flex items-center justify-center ${dark ? "bg-white/5 border border-white/10" : "bg-[#e8ecf0]"}`}>
          <span className={`text-sm tracking-wide uppercase ${dark ? "text-white/20" : "text-[#9ca3af]"}`}>App Mockup</span>
        </div>
      </div>
    </div>
  );
}

// Trintech: 5-stat dark metrics row
function MetricsRow({ count = 5, bg = "#0f172a" }: { count?: number; bg?: string }) {
  const metrics = ["99%+", "96%+", "75%+", "62%+", "60%+"].slice(0, count);
  const labels = ["Auto-Match Rate", "Reduction in Time Spent", "Shorter Time to Close", "Reduction in Write-Offs", "Reduction for Auditors"].slice(0, count);
  return (
    <div style={{ backgroundColor: bg }} className="px-8 py-14">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-xs font-semibold tracking-widest uppercase text-white/40 mb-10">Real results, measurable impact</p>
        <div className={`grid grid-cols-2 md:grid-cols-${count} gap-6`}>
          {metrics.map((m, i) => (
            <div key={i} className="text-center">
              <p className="text-4xl font-bold text-white mb-2">{m}</p>
              <p className="text-xs text-white/40 leading-tight">{labels[i]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// BlackLine: Alternating text + mockup rows
function ZigzagSection({ rows = 2, bg1 = "white", bg2 = "#f8f9fb" }: { rows?: number; bg1?: string; bg2?: string }) {
  return (
    <div>
      {Array.from({ length: rows }).map((_, i) => {
        const reversed = i % 2 !== 0;
        const bg = i % 2 === 0 ? bg1 : bg2;
        return (
          <div key={i} style={{ backgroundColor: bg }} className="px-8 py-20">
            <div className={`max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${reversed ? "direction-rtl" : ""}`}>
              <div className={reversed ? "order-2 lg:order-1" : ""}>
                <SectionLabel text={`Feature ${i + 1}`} />
                <div className="space-y-3 mb-5">
                  <Sk w="85%" h="7" />
                  <Sk w="65%" h="7" />
                </div>
                <div className="space-y-4 mb-7">
                  {[0, 1, 2, 3].map((b) => (
                    <div key={b} className="flex gap-3 items-start">
                      <div className="w-5 h-5 rounded-full bg-[#e8ecf0] flex-shrink-0 mt-0.5" />
                      <div className="flex-1 space-y-1.5">
                        <Sk w="full" h="3" />
                        <Sk w="80%" h="3" />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="inline-block border border-[#dde1e7] text-[#374151] px-5 py-2.5 rounded-md text-sm font-medium">
                  Explore Feature →
                </div>
              </div>
              <div className={`bg-[#e8ecf0] rounded-xl h-72 flex items-center justify-center ${reversed ? "order-1 lg:order-2" : ""}`}>
                <span className="text-xs text-[#9ca3af] uppercase tracking-wide">Product Screenshot</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Trintech: 3×3 icon capability grid
function CapabilityGrid({ cols = 3, count = 9 }: { cols?: number; count?: number }) {
  return (
    <div className="bg-white px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <SectionLabel text="Capabilities" />
          <div className="space-y-2 max-w-lg mx-auto">
            <Sk w="60%" h="7" className="mx-auto" />
            <Sk w="80%" h="4" className="mx-auto" />
          </div>
        </div>
        <div className={`grid grid-cols-2 md:grid-cols-3 gap-5`}>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="border border-[#dde1e7] rounded-xl p-6 text-center hover:border-[#3b5bdb] transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#e8ecf0] mx-auto mb-4" />
              <Sk w="70%" h="4" className="mx-auto mb-2" />
              <Sk w="90%" h="3" className="mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// OneStream: Feature card grid with icon + description
function FeatureCards({ count = 3, cols = 3, bg = "white" }: { count?: number; cols?: number; bg?: string }) {
  return (
    <div style={{ backgroundColor: bg }} className="px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <div className={`grid grid-cols-1 md:grid-cols-${cols} gap-6`}>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="bg-white border border-[#dde1e7] rounded-xl p-7">
              <div className="w-10 h-10 rounded-lg bg-[#e8ecf0] mb-5" />
              <Sk w="65%" h="5" className="mb-3" />
              <div className="space-y-2 mb-5">
                <Sk w="full" h="3" />
                <Sk w="90%" h="3" />
                <Sk w="75%" h="3" />
              </div>
              <span className="text-xs font-semibold text-[#3b5bdb]">Learn more →</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Logo trust strip
function LogoStrip() {
  return (
    <div className="bg-white border-t border-b border-[#dde1e7] px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-xs text-[#9ca3af] uppercase tracking-widest mb-8">Trusted by leading organisations worldwide</p>
        <div className="flex items-center justify-center gap-10 flex-wrap">
          {[120, 100, 90, 130, 110, 95].map((w, i) => (
            <div key={i} className="h-8 bg-[#e8ecf0] rounded" style={{ width: w }} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Trintech Cadency: Full-width colored testimonial quote
function TestimonialBlock({ accent = "#3b5bdb" }: { accent?: string }) {
  return (
    <div style={{ backgroundColor: accent }} className="px-8 py-20">
      <div className="max-w-4xl mx-auto text-center text-white">
        <p className="text-6xl font-serif text-white/20 leading-none mb-6">"</p>
        <div className="space-y-3 mb-8 max-w-2xl mx-auto">
          <Sk w="full" h="6" className="!bg-white/20 mx-auto" />
          <Sk w="90%" h="6" className="!bg-white/20 mx-auto" />
          <Sk w="75%" h="6" className="!bg-white/20 mx-auto" />
        </div>
        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="w-10 h-10 rounded-full bg-white/20" />
          <div className="text-left">
            <Sk w="120px" h="4" className="!bg-white/20 mb-1" />
            <Sk w="80px" h="3" className="!bg-white/10" />
          </div>
          <div className="ml-6 h-8 w-20 bg-white/10 rounded" />
        </div>
      </div>
    </div>
  );
}

// Dark full-width CTA band
function CTABand({ dark = true, accent = "#3b5bdb" }: { dark?: boolean; accent?: string }) {
  const bg = dark ? "#1a2744" : accent;
  return (
    <div style={{ backgroundColor: bg }} className="px-8 py-20 text-center text-white">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-3 mb-4">
          <Sk w="60%" h="8" className="!bg-white/20 mx-auto" />
          <Sk w="45%" h="8" className="!bg-white/20 mx-auto" />
        </div>
        <Sk w="50%" h="4" className="!bg-white/10 mx-auto mb-8" />
        <button className="bg-white text-[#1a2744] font-bold px-8 py-3 rounded-md text-sm">
          Book a Demo
        </button>
      </div>
    </div>
  );
}

// OneStream: Accordion FAQ
function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const items = 5;
  return (
    <div className="bg-white px-8 py-20">
      <div className="max-w-3xl mx-auto">
        <SectionLabel text="FAQ" />
        <Sk w="40%" h="7" className="mb-10" />
        <div className="space-y-3">
          {Array.from({ length: items }).map((_, i) => (
            <div key={i} className="border border-[#dde1e7] rounded-lg overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#f8f9fb] transition-colors"
              >
                <Sk w="55%" h="4" />
                <span className="text-[#9ca3af] text-sm ml-4">{open === i ? "−" : "+"}</span>
              </button>
              {open === i && (
                <div className="px-6 pb-5 space-y-2">
                  <Sk w="full" h="3" />
                  <Sk w="90%" h="3" />
                  <Sk w="70%" h="3" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Trintech: 2×2 video card grid
function VideoCards() {
  return (
    <div className="bg-[#0f172a] px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="Video Resources" light />
        <Sk w="35%" h="7" className="!bg-white/20 mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <div className="aspect-video bg-white/5 flex items-center justify-center relative">
                <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                  <div className="w-0 h-0 border-t-8 border-b-8 border-l-14 border-transparent border-l-white/60 ml-1" />
                </div>
              </div>
              <div className="p-5">
                <Sk w="80%" h="4" className="!bg-white/20 mb-2" />
                <Sk w="60%" h="3" className="!bg-white/10 mb-4" />
                <span className="text-xs font-semibold text-[#3b5bdb]">Watch Now →</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// OneStream: Outlined border case study cards
function CaseStudyCards() {
  return (
    <div className="bg-[#f8f9fb] px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="Case Studies" />
        <div className="flex items-end justify-between mb-10">
          <Sk w="35%" h="7" />
          <span className="text-xs font-semibold text-[#3b5bdb] cursor-pointer">View all stories →</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white border border-[#dde1e7] rounded-xl p-8 flex flex-col">
              <div className="w-24 h-8 bg-[#e8ecf0] rounded mb-6" />
              <div className="space-y-2 mb-4 flex-1">
                <Sk w="full" h="4" />
                <Sk w="85%" h="4" />
                <Sk w="70%" h="4" />
              </div>
              <div className="space-y-1.5 mb-6">
                <Sk w="full" h="3" />
                <Sk w="90%" h="3" />
              </div>
              <button className="text-xs font-semibold text-[#3b5bdb] border border-[#3b5bdb] px-4 py-2 rounded-md self-start hover:bg-[#3b5bdb] hover:text-white transition-colors">
                Explore Story →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// FloQast: Text left + integration logo tiles right
function IntegrationSection() {
  return (
    <div className="bg-white px-8 py-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <SectionLabel text="Integrations" />
          <div className="space-y-3 mb-5">
            <Sk w="85%" h="7" />
            <Sk w="65%" h="7" />
          </div>
          <div className="space-y-2 mb-8">
            <Sk w="full" h="3" />
            <Sk w="90%" h="3" />
            <Sk w="75%" h="3" />
          </div>
          <div className="inline-block bg-[#3b5bdb] text-white px-5 py-2.5 rounded-md text-sm font-semibold">
            See all integrations →
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="border border-[#dde1e7] rounded-xl p-5 flex items-center justify-center aspect-square bg-[#f8f9fb]">
              <div className="w-12 h-8 bg-[#e8ecf0] rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Trintech Cadency: Tabbed platform overview
function SplitPlatform({ tabs = ["Overview", "Reconciliation", "Close Management", "Journal Entry", "Compliance"] }: { tabs?: string[] }) {
  const [active, setActive] = useState(0);
  return (
    <div className="bg-[#f8f9fb] px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <SectionLabel text="Platform" />
          <Sk w="45%" h="7" className="mx-auto mb-3" />
          <Sk w="55%" h="4" className="mx-auto" />
        </div>
        <div className="flex gap-2 flex-wrap justify-center mb-10">
          {tabs.map((t, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                active === i ? "bg-[#1a2744] text-white" : "bg-white border border-[#dde1e7] text-[#6b7280] hover:border-[#1a2744]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-5">
            <Sk w="70%" h="6" />
            <div className="space-y-2">
              <Sk w="full" h="3" />
              <Sk w="90%" h="3" />
              <Sk w="80%" h="3" />
            </div>
            {[0, 1, 2].map((b) => (
              <div key={b} className="flex gap-3 items-start">
                <div className="w-5 h-5 rounded-full bg-[#e8ecf0] flex-shrink-0 mt-0.5" />
                <div className="flex-1 space-y-1.5">
                  <Sk w="full" h="3" />
                  <Sk w="75%" h="3" />
                </div>
              </div>
            ))}
            <div className="inline-block bg-[#3b5bdb] text-white px-5 py-2.5 rounded-md text-sm font-semibold">
              Learn More
            </div>
          </div>
          <div className="bg-white border border-[#dde1e7] rounded-xl h-72 flex items-center justify-center">
            <span className="text-xs text-[#9ca3af] uppercase tracking-wide">Platform Screenshot</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Trintech: Benefits / colored-header card row
function BenefitCards({ count = 4 }: { count?: number }) {
  const colors = ["#3b5bdb", "#7c3aed", "#0d6b4e", "#1a2744"];
  return (
    <div className="bg-[#f8f9fb] px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <SectionLabel text="Benefits" />
        <Sk w="40%" h="7" className="mb-10" />
        <div className={`grid grid-cols-1 md:grid-cols-${count} gap-5`}>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="bg-white border border-[#dde1e7] rounded-xl overflow-hidden">
              <div className="h-2" style={{ backgroundColor: colors[i % colors.length] }} />
              <div className="p-6">
                <Sk w="75%" h="5" className="mb-3" />
                <div className="space-y-2 mb-4">
                  <Sk w="full" h="3" />
                  <Sk w="90%" h="3" />
                  <Sk w="80%" h="3" />
                  <Sk w="70%" h="3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// CardGrid: kept as fallback
function CardGrid({ count = 3 }: { count?: number }) {
  return (
    <div className="px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <div className={`grid grid-cols-1 md:grid-cols-${count} gap-5`}>
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="bg-white border border-[#dde1e7] rounded-xl p-6">
              <div className="w-8 h-8 rounded bg-[#e8ecf0] mb-4" />
              <Sk w="65%" h="4" className="mb-2" />
              <Sk w="full" h="3" className="mb-1.5" />
              <Sk w="85%" h="3" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Section Renderer ─────────────────────────────────────────────────────────

type SectionDef = {
  type: string;
  label?: string;
  count?: number;
  cols?: number;
  accent?: string;
};

function renderSection(s: SectionDef, i: number) {
  switch (s.type) {
    case "metrics": return <MetricsRow key={i} count={s.count ?? 5} />;
    case "metrics3": return <MetricsRow key={i} count={3} bg="#1a2744" />;
    case "zigzag": return <ZigzagSection key={i} rows={s.count ?? 2} />;
    case "capgrid": return <CapabilityGrid key={i} count={s.count ?? 9} />;
    case "featurecards": return <FeatureCards key={i} count={s.count ?? 3} cols={s.cols ?? 3} />;
    case "logostrip": return <LogoStrip key={i} />;
    case "testimonial": return <TestimonialBlock key={i} accent={s.accent} />;
    case "ctaband": return <CTABand key={i} dark={!s.accent} accent={s.accent} />;
    case "faq": return <FAQSection key={i} />;
    case "videocards": return <VideoCards key={i} />;
    case "casestudies": return <CaseStudyCards key={i} />;
    case "integration": return <IntegrationSection key={i} />;
    case "splitplatform": return <SplitPlatform key={i} />;
    case "benefitcards": return <BenefitCards key={i} count={s.count ?? 4} />;
    case "cards": return <CardGrid key={i} count={s.count ?? 3} />;
    case "list": return (
      <div key={i} className="bg-white px-8 py-14">
        <div className="max-w-3xl mx-auto space-y-3">
          {Array.from({ length: s.count ?? 5 }).map((_, j) => (
            <div key={j} className="flex items-center gap-4 border border-[#dde1e7] rounded-lg px-5 py-4">
              <div className="w-8 h-8 rounded-full bg-[#e8ecf0] flex-shrink-0" />
              <div className="flex-1 space-y-1.5"><Sk w="40%" h="3.5" /><Sk w="65%" h="3" /></div>
            </div>
          ))}
        </div>
      </div>
    );
    default: return null;
  }
}

// ─── Page Data ────────────────────────────────────────────────────────────────

const PAGE_DATA: Record<string, Record<string, { title: string; subtitle: string; hero?: "split" | "centered"; sections: SectionDef[] }>> = {
  company: {
    about:      { title: "About Sheshi", subtitle: "Who we are and what we stand for.", hero: "split", sections: [{ type: "logostrip" }, { type: "metrics", count: 4 }, { type: "zigzag", count: 2 }, { type: "testimonial" }, { type: "ctaband" }] },
    story:      { title: "Our Story", subtitle: "How Sheshi came to be.", sections: [{ type: "splitplatform" }, { type: "list", count: 5 }, { type: "testimonial" }, { type: "ctaband" }] },
    leadership: { title: "Leadership", subtitle: "The team steering Sheshi's direction.", sections: [{ type: "featurecards", count: 3 }, { type: "featurecards", count: 3 }, { type: "ctaband" }] },
    team:       { title: "Our Team", subtitle: "The people behind the platform.", sections: [{ type: "capgrid", count: 9 }, { type: "benefitcards", count: 4 }, { type: "ctaband" }] },
    careers:    { title: "Careers", subtitle: "Join us in building the future of finance.", hero: "split", sections: [{ type: "benefitcards", count: 4 }, { type: "list", count: 6 }, { type: "ctaband" }] },
  },
  solutions: {
    enterprise:    { title: "Enterprise Finance", subtitle: "Solutions for large organisations managing complex financial operations.", hero: "split", sections: [{ type: "logostrip" }, { type: "metrics", count: 4 }, { type: "zigzag", count: 3 }, { type: "casestudies" }, { type: "testimonial" }, { type: "ctaband" }] },
    startup:       { title: "Startup Finance", subtitle: "Built for speed, scale, and survival.", hero: "split", sections: [{ type: "metrics", count: 3 }, { type: "featurecards", count: 3 }, { type: "zigzag", count: 2 }, { type: "casestudies" }, { type: "ctaband" }] },
    consulting:    { title: "Consulting & Advisory Firms", subtitle: "Power your client engagements with Sheshi.", hero: "split", sections: [{ type: "featurecards", count: 3 }, { type: "zigzag", count: 2 }, { type: "testimonial" }, { type: "ctaband" }] },
    professionals: { title: "Finance Professionals", subtitle: "Individual tools for CFOs, analysts, and controllers.", hero: "split", sections: [{ type: "featurecards", count: 4, cols: 4 }, { type: "integration" }, { type: "faq" }, { type: "ctaband" }] },
  },
  technology: {
    fos:          { title: "Financial Operating System", subtitle: "The infrastructure layer powering Sheshi.", hero: "centered", sections: [{ type: "splitplatform" }, { type: "capgrid", count: 9 }, { type: "zigzag", count: 2 }, { type: "ctaband" }] },
    ai:           { title: "AI & Automation", subtitle: "Intelligent automation across every financial workflow.", hero: "centered", sections: [{ type: "metrics", count: 5 }, { type: "zigzag", count: 3 }, { type: "featurecards", count: 3 }, { type: "testimonial" }, { type: "ctaband" }] },
    integrations: { title: "Integrations", subtitle: "Connect Sheshi to your existing stack.", sections: [{ type: "integration" }, { type: "capgrid", count: 6 }, { type: "logostrip" }, { type: "ctaband" }] },
    security:     { title: "Security & Compliance", subtitle: "Enterprise-grade security you can trust.", hero: "split", sections: [{ type: "metrics3" }, { type: "featurecards", count: 3 }, { type: "benefitcards", count: 4 }, { type: "testimonial" }, { type: "ctaband" }] },
  },
  resources: {
    blog:       { title: "Blog", subtitle: "Thoughts, perspectives, and news from Sheshi.", sections: [{ type: "featurecards", count: 3 }, { type: "list", count: 6 }, { type: "ctaband" }] },
    insights:   { title: "Insights", subtitle: "In-depth analysis for financial decision-makers.", sections: [{ type: "featurecards", count: 3 }, { type: "casestudies" }, { type: "testimonial" }, { type: "ctaband" }] },
    casestudies:{ title: "Case Studies", subtitle: "Real results from real clients.", sections: [{ type: "casestudies" }, { type: "testimonial" }, { type: "metrics", count: 4 }, { type: "ctaband" }] },
    research:   { title: "Research", subtitle: "Proprietary research on financial operations.", sections: [{ type: "featurecards", count: 3 }, { type: "list", count: 5 }, { type: "ctaband" }] },
    webinars:   { title: "Webinars & Events", subtitle: "Learn from experts and connect with peers.", sections: [{ type: "videocards" }, { type: "list", count: 3 }, { type: "ctaband" }] },
    updates:    { title: "Product Updates", subtitle: "What's new in the Sheshi platform.", sections: [{ type: "list", count: 6 }, { type: "featurecards", count: 3 }, { type: "ctaband" }] },
  },
  partners: {
    tech:      { title: "Technology Partners", subtitle: "Platforms and tools Sheshi integrates with.", sections: [{ type: "logostrip" }, { type: "integration" }, { type: "ctaband" }] },
    strategic: { title: "Strategic Partners", subtitle: "Advisory and go-to-market partners.", sections: [{ type: "featurecards", count: 3 }, { type: "testimonial" }, { type: "ctaband" }] },
    join:      { title: "Become a Partner", subtitle: "Join the Sheshi partner ecosystem.", sections: [{ type: "featurecards", count: 3 }, { type: "benefitcards", count: 4 }, { type: "faq" }, { type: "ctaband" }] },
  },
};

// ─── Page Components ──────────────────────────────────────────────────────────

function GenericPage({ title, subtitle, breadcrumb, hero, sections }: {
  title: string; subtitle?: string; breadcrumb?: string[];
  hero?: "split" | "centered"; sections: SectionDef[];
}) {
  return (
    <div>
      {hero === "split" ? (
        <HeroSplit eyebrow={title} />
      ) : hero === "centered" ? (
        <HeroCentered eyebrow={title} />
      ) : (
        <PageHero title={title} subtitle={subtitle} breadcrumb={breadcrumb} />
      )}
      {sections.map((s, i) => renderSection(s, i))}
    </div>
  );
}

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

  // Full Flowchart Hierarchy matching the user's diagram
  const pillars: FlowPillar[] = [
    {
      id: "home",
      title: "Home",
      icon: "🏠",
      color: "#1a2744",
      tagline: "Corporate Homepage & Executive Overview",
      route: { page: "home" },
    },
    {
      id: "company",
      title: "Company",
      icon: "🏢",
      color: "#2563eb",
      tagline: "Corporate Identity, Team & Leadership",
      route: { page: "company" },
      leaves: [
        { id: "about", label: "About Sheshi", route: { page: "company", sub: "about" }, tagline: "Mission, vision and corporate values" },
        { id: "story", label: "Our Story", route: { page: "company", sub: "story" }, tagline: "How Sheshi was created and scaled" },
        { id: "leadership", label: "Leadership", route: { page: "company", sub: "leadership" }, tagline: "Executive management and board" },
        { id: "team", label: "Our Team", route: { page: "company", sub: "team" }, tagline: "Engineers, analysts & advisors" },
        { id: "careers", label: "Careers", route: { page: "company", sub: "careers" }, tagline: "Open positions and culture" },
        { id: "contact-us", label: "Contact Us", route: { page: "contact" }, tagline: "Reach our global corporate office" },
      ],
    },
    {
      id: "products",
      title: "Products",
      icon: "📦",
      color: "#0d9488",
      tagline: "Autonomous Product Subsite Ecosystem",
      route: { page: "products" },
      products: [
        {
          id: "quanta",
          label: "Quanta",
          icon: "🔹",
          color: "#1a2744",
          tagline: "Enterprise Intelligence Platform",
          subsiteLabel: "Independent Product Website",
          pages: [
            { id: "quanta-home", label: "Home", route: { page: "products", sub: "quanta", productPage: "home" } },
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
          color: "#0d6b4e",
          tagline: "Startup Finance Accelerator",
          subsiteLabel: "Independent Product Website",
          pages: [
            { id: "catalyx-home", label: "Home", route: { page: "products", sub: "catalyx", productPage: "home" } },
            { id: "catalyx-solutions", label: "Solutions", route: { page: "products", sub: "catalyx", productPage: "solutions" } },
            { id: "catalyx-features", label: "Features", route: { page: "products", sub: "catalyx", productPage: "features" } },
            { id: "catalyx-startups", label: "For Startups", route: { page: "products", sub: "catalyx", productPage: "startups" } },
            { id: "catalyx-resources", label: "Resources", route: { page: "products", sub: "catalyx", productPage: "resources" } },
            { id: "catalyx-contact", label: "Get in Touch", route: { page: "products", sub: "catalyx", productPage: "contact" } },
          ],
        },
        {
          id: "consultease",
          label: "ConsultEase",
          icon: "📊",
          color: "#7c3aed",
          tagline: "Advisory Workflow Management",
          subsiteLabel: "Independent Product Website",
          pages: [
            { id: "consultease-home", label: "Home", route: { page: "products", sub: "consultease", productPage: "home" } },
            { id: "consultease-solutions", label: "Solutions", route: { page: "products", sub: "consultease", productPage: "solutions" } },
            { id: "consultease-features", label: "Features", route: { page: "products", sub: "consultease", productPage: "features" } },
            { id: "consultease-firms", label: "For Consulting Firms", route: { page: "products", sub: "consultease", productPage: "firms" } },
            { id: "consultease-resources", label: "Resources", route: { page: "products", sub: "consultease", productPage: "resources" } },
            { id: "consultease-contact", label: "Contact Us", route: { page: "products", sub: "consultease", productPage: "contact" } },
          ],
        },
        {
          id: "sheshifr",
          label: "Sheshi FR",
          icon: "📈",
          color: "#b45309",
          tagline: "Financial Reporting Suite",
          subsiteLabel: "Independent Product Website",
          pages: [
            { id: "sheshifr-home", label: "Home", route: { page: "products", sub: "sheshifr", productPage: "home" } },
            { id: "sheshifr-features", label: "Features", route: { page: "products", sub: "sheshifr", productPage: "features" } },
            { id: "sheshifr-workflows", label: "Workflows", route: { page: "products", sub: "sheshifr", productPage: "workflows" } },
            { id: "sheshifr-professionals", label: "For Finance Professionals", route: { page: "products", sub: "sheshifr", productPage: "professionals" } },
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
      route: { page: "solutions" },
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
      tagline: "Financial Operating System & Intelligence Engine",
      route: { page: "technology" },
      leaves: [
        { id: "tech-fos", label: "Financial Operating System", route: { page: "technology", sub: "fos" } },
        { id: "tech-ai", label: "AI and Automation", route: { page: "technology", sub: "ai" } },
        { id: "tech-integrations", label: "Integrations", route: { page: "technology", sub: "integrations" } },
        { id: "tech-security", label: "Security and Compliance", route: { page: "technology", sub: "security" } },
      ],
    },
    {
      id: "resources",
      title: "Resources",
      icon: "📚",
      color: "#059669",
      tagline: "Knowledge Base, Research & Media",
      route: { page: "resources" },
      leaves: [
        { id: "res-blog", label: "Blog", route: { page: "resources", sub: "blog" } },
        { id: "res-insights", label: "Insights", route: { page: "resources", sub: "insights" } },
        { id: "res-casestudies", label: "Case Studies", route: { page: "resources", sub: "casestudies" } },
        { id: "res-research", label: "Research", route: { page: "resources", sub: "research" } },
        { id: "res-webinars", label: "Webinars and Events", route: { page: "resources", sub: "webinars" } },
        { id: "res-updates", label: "Product Updates", route: { page: "resources", sub: "updates" } },
      ],
    },
    {
      id: "partners",
      title: "Partners",
      icon: "🤝",
      color: "#d97706",
      tagline: "Technology & Strategic Ecosystem",
      route: { page: "partners" },
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
      route: { page: "legal" },
      leaves: [
        { id: "leg-privacy", label: "Privacy Policy", route: { page: "legal", sub: "privacy" } },
        { id: "leg-terms", label: "Terms of Use", route: { page: "legal", sub: "terms" } },
        { id: "leg-cookies", label: "Cookie Policy", route: { page: "legal", sub: "cookies" } },
        { id: "leg-security", label: "Security Disclosure", route: { page: "legal", sub: "security" } },
        { id: "leg-sitemap", label: "Sitemap", route: { page: "legal", sub: "sitemap" } },
      ],
    },
  ];

  const term = searchTerm.toLowerCase().trim();

  const asciiTree = `SHESHI
│
├── Home
│
├── Company
│   ├── About Sheshi
│   ├── Our Story
│   ├── Leadership
│   ├── Our Team
│   ├── Careers
│   └── Contact Us
│
├── Products
│   │
│   ├── Quanta
│   │   └── Independent Product Website
│   │       ├── Home
│   │       ├── Platform
│   │       ├── Solutions
│   │       ├── Capabilities
│   │       ├── Enterprise
│   │       ├── Resources
│   │       └── Contact Us
│   │
│   ├── Catalyx
│   │   └── Independent Product Website
│   │       ├── Home
│   │       ├── Solutions
│   │       ├── Features
│   │       ├── For Startups
│   │       ├── Resources
│   │       └── Get in Touch
│   │
│   ├── ConsultEase
│   │   └── Independent Product Website
│   │       ├── Home
│   │       ├── Solutions
│   │       ├── Features
│   │       ├── For Consulting Firms
│   │       ├── Resources
│   │       └── Contact Us
│   │
│   └── Sheshi FR
│       └── Independent Product Website
│           ├── Home
│           ├── Features
│           ├── Workflows
│           ├── For Finance Professionals
│           ├── Resources
│           └── Contact Us
│
├── Solutions
│   ├── Enterprise Finance
│   ├── Startup Finance
│   ├── Consulting and Advisory Firms
│   └── Finance Professionals
│
├── Technology
│   ├── Financial Operating System
│   ├── AI and Automation
│   ├── Integrations
│   └── Security and Compliance
│
├── Resources
│   ├── Blog
│   ├── Insights
│   ├── Case Studies
│   ├── Research
│   ├── Webinars and Events
│   └── Product Updates
│
├── Partners
│   ├── Technology Partners
│   ├── Strategic Partners
│   └── Become a Partner
│
├── Contact
│   ├── Sales Enquiries
│   ├── Partnership Enquiries
│   ├── Media Enquiries
│   └── General Enquiries
│
└── Legal
    ├── Privacy Policy
    ├── Terms of Use
    ├── Cookie Policy
    ├── Security Disclosure
    └── Sitemap`;

  const copyAscii = () => {
    navigator.clipboard.writeText(asciiTree);
    setCopiedAscii(true);
    setTimeout(() => setCopiedAscii(false), 2000);
  };

  return (
    <section className="bg-[#f4f6fa] border-t border-b border-[#dde1e7] py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Flowchart Blueprint Dot-Grid Canvas Background */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#cbd5e1 1.2px, transparent 1.2px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#3b5bdb] bg-[#3b5bdb]/10 border border-[#3b5bdb]/20 px-3 py-1 rounded-full mb-3">
              <span className="w-2 h-2 rounded-full bg-[#3b5bdb] animate-pulse" />
              Interactive Flowchart Graph
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1a2744] tracking-tight">
              Sheshi Platform Tree Flowchart
            </h2>
            <p className="text-sm md:text-base text-[#6b7280] max-w-2xl mt-2">
              System routing tree rendered as an interconnected graph with branch spines, intermediate subsite gateways, and interactive page nodes.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="bg-white border border-[#dde1e7] p-1 rounded-lg flex items-center shadow-sm">
              <button
                onClick={() => setViewMode("tree")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "tree"
                    ? "bg-[#1a2744] text-white shadow-sm"
                    : "text-[#6b7280] hover:text-[#1a2744]"
                }`}
              >
                🌳 Tree Flowchart
              </button>
              <button
                onClick={() => setViewMode("horizontal")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "horizontal"
                    ? "bg-[#1a2744] text-white shadow-sm"
                    : "text-[#6b7280] hover:text-[#1a2744]"
                }`}
              >
                🔀 Horizontal Graph
              </button>
              <button
                onClick={() => setViewMode("ascii")}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  viewMode === "ascii"
                    ? "bg-[#1a2744] text-white shadow-sm"
                    : "text-[#6b7280] hover:text-[#1a2744]"
                }`}
              >
                📋 Raw Diagram
              </button>
            </div>

            {/* Expand / Collapse All */}
            {viewMode !== "ascii" && (
              <div className="flex items-center gap-1.5 bg-white border border-[#dde1e7] p-1 rounded-lg shadow-sm">
                <button
                  onClick={expandAll}
                  className="px-2.5 py-1.5 text-xs font-semibold text-[#374151] hover:text-[#3b5bdb] hover:bg-[#f8f9fb] rounded transition-colors cursor-pointer"
                >
                  Expand All
                </button>
                <span className="text-[#dde1e7]">|</span>
                <button
                  onClick={collapseAll}
                  className="px-2.5 py-1.5 text-xs font-semibold text-[#374151] hover:text-[#3b5bdb] hover:bg-[#f8f9fb] rounded transition-colors cursor-pointer"
                >
                  Collapse All
                </button>
              </div>
            )}

            {/* Quick Search */}
            <div className="relative w-full sm:w-60">
              <input
                type="text"
                placeholder="Search node..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-[#dde1e7] rounded-lg pl-3 pr-8 py-2 text-xs text-[#1a2744] placeholder-[#9ca3af] focus:outline-none focus:border-[#3b5bdb] shadow-sm"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-2.5 top-2 text-xs text-[#9ca3af] hover:text-[#1a2744] cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ─── FLOWCHART CANVAS ─── */}
        <div className="bg-white/90 backdrop-blur-sm border border-[#dde1e7] rounded-2xl p-6 md:p-10 shadow-sm overflow-x-auto">
          {viewMode === "ascii" ? (
            /* RAW MONOSPACE DIAGRAM VIEW */
            <div className="relative">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#dde1e7]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3b5bdb]" />
                  <span className="text-xs font-bold text-[#1a2744] uppercase tracking-wider">
                    Full Platform Structure (Hierarchy Diagram)
                  </span>
                </div>
                <button
                  onClick={copyAscii}
                  className="px-3 py-1.5 bg-[#1a2744] text-white text-xs font-semibold rounded-md hover:bg-[#3b5bdb] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  {copiedAscii ? "✓ Copied!" : "📋 Copy ASCII Diagram"}
                </button>
              </div>
              <pre className="font-mono text-xs md:text-sm text-[#1e293b] bg-[#f8fafc] p-6 rounded-xl border border-[#dde1e7] leading-relaxed overflow-x-auto">
                {asciiTree}
              </pre>
            </div>
          ) : viewMode === "tree" ? (
            /* ─── TREE FLOWCHART GRAPH VIEW ─── */
            <div className="flex flex-col items-start min-w-[760px] pl-2">
              {/* ROOT NODE: SHESHI */}
              <div className="flex items-center gap-3">
                <div
                  onClick={() => navigate({ page: "home" })}
                  className={`group relative bg-[#1a2744] text-white px-6 py-3.5 rounded-xl shadow-md border-2 transition-all cursor-pointer flex items-center gap-3.5 hover:scale-105 ${
                    term && "sheshi".includes(term)
                      ? "border-[#3b5bdb] ring-4 ring-[#3b5bdb]/30"
                      : "border-[#3b5bdb]/40 hover:border-[#3b5bdb]"
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center font-bold text-base text-white border border-white/20">
                    🌐
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold tracking-widest text-[#60a5fa]">
                        SHESHI
                      </span>
                      <span className="text-[10px] bg-white/10 text-white/80 px-2 py-0.5 rounded-full">
                        Root System Gateway
                      </span>
                    </div>
                    <div className="text-xs text-white/60">
                      Global Financial Operating System &amp; Intelligence Hub
                    </div>
                  </div>
                  <div className="ml-3 text-[11px] bg-white/10 group-hover:bg-[#3b5bdb] text-white px-2.5 py-1 rounded font-medium transition-colors">
                    / (Home) →
                  </div>
                </div>
              </div>

              {/* VERTICAL SPINAL TRUNK WITH BRANCH ARMS */}
              <div className="relative pl-6 sm:pl-8 ml-6 sm:ml-8 border-l-2 border-[#94a3b8] mt-2 space-y-6">
                {pillars.map((pil, pilIdx) => {
                  const isLastPillar = pilIdx === pillars.length - 1;
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
                      {/* Horizontal Connector Arm from Spine to Pillar */}
                      <div className="absolute -left-6 sm:-left-8 top-6 w-6 sm:w-8 h-0.5 bg-[#94a3b8] flex items-center">
                        <div className="w-2 h-2 -ml-1 rounded-full bg-[#1a2744] border border-white" />
                      </div>

                      {/* PILLAR FLOWCHART NODE */}
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all ${
                            isBranchMatch && term
                              ? "bg-white border-[#3b5bdb] ring-2 ring-[#3b5bdb]/30 shadow-md"
                              : "bg-white border-[#dde1e7] hover:border-[#3b5bdb] shadow-sm"
                          }`}
                        >
                          {/* Expand/Collapse Toggle */}
                          {(hasLeaves || hasProducts) ? (
                            <button
                              onClick={() => toggleBranch(pil.id)}
                              className="w-5 h-5 rounded bg-[#f1f5f9] hover:bg-[#e2e8f0] text-[#1a2744] flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                              title={isCollapsed ? "Expand branch" : "Collapse branch"}
                            >
                              {isCollapsed ? "+" : "−"}
                            </button>
                          ) : (
                            <span className="w-2 h-2 rounded-full bg-[#94a3b8]" />
                          )}

                          <span className="text-base">{pil.icon}</span>

                          <button
                            onClick={() => navigate(pil.route)}
                            className="font-bold text-sm text-[#1a2744] hover:text-[#3b5bdb] transition-colors cursor-pointer text-left"
                          >
                            {pil.title}
                          </button>

                          {/* Badge */}
                          {hasLeaves && (
                            <span className="text-[10px] font-semibold text-[#64748b] bg-[#f1f5f9] px-2 py-0.5 rounded-full">
                              {pil.leaves!.length} Pages
                            </span>
                          )}
                          {hasProducts && (
                            <span className="text-[10px] font-semibold text-[#0d9488] bg-[#0d9488]/10 px-2 py-0.5 rounded-full">
                              4 Subsites • 25 Pages
                            </span>
                          )}

                          <button
                            onClick={() => navigate(pil.route)}
                            className="text-[11px] font-medium text-[#3b5bdb] hover:underline cursor-pointer ml-1"
                          >
                            Explore →
                          </button>
                        </div>
                      </div>

                      {/* ─── EXPANDED LEAVES OR PRODUCTS FLOW ─── */}
                      {!isCollapsed && hasLeaves && (
                        <div className="relative pl-6 sm:pl-8 ml-4 sm:ml-5 border-l-2 border-[#cbd5e1] mt-3 space-y-2.5">
                          {pil.leaves!.map((leaf, leafIdx) => {
                            const isLastLeaf = leafIdx === pil.leaves!.length - 1;
                            const isMatch =
                              !term ||
                              leaf.label.toLowerCase().includes(term) ||
                              pil.title.toLowerCase().includes(term);

                            return (
                              <div key={leaf.id} className="relative flex items-center gap-2">
                                {/* Connector arm */}
                                <div className="absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2 w-6 sm:w-8 h-0.5 bg-[#cbd5e1] flex items-center">
                                  <div className="w-1.5 h-1.5 -ml-0.5 rounded-full bg-[#94a3b8]" />
                                </div>

                                {/* Leaf Page Node */}
                                <button
                                  onClick={() => navigate(leaf.route)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer flex items-center gap-2 ${
                                    isMatch && term
                                      ? "bg-[#3b5bdb] text-white border-[#3b5bdb] shadow-sm font-semibold"
                                      : "bg-[#f8fafc] hover:bg-white text-[#334155] border-[#dde1e7] hover:border-[#3b5bdb] hover:shadow-sm"
                                  }`}
                                >
                                  <span
                                    className="w-1.5 h-1.5 rounded-full"
                                    style={{ backgroundColor: pil.color }}
                                  />
                                  <span>{leaf.label}</span>
                                  <span className="text-[10px] opacity-40">→</span>
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      )}

                      {/* ─── SPECIAL PRODUCTS SUBSITES ECOSYSTEM FLOW ─── */}
                      {!isCollapsed && hasProducts && (
                        <div className="relative pl-6 sm:pl-8 ml-4 sm:ml-5 border-l-2 border-[#cbd5e1] mt-4 space-y-6">
                          {pil.products!.map((prod) => {
                            const isProdCollapsed = !!collapsedBranches[prod.id];
                            const isMatchProd =
                              !term ||
                              prod.label.toLowerCase().includes(term) ||
                              prod.pages.some((p) => p.label.toLowerCase().includes(term));

                            return (
                              <div key={prod.id} className="relative">
                                {/* Connector Arm to Product Node */}
                                <div className="absolute -left-6 sm:-left-8 top-5 w-6 sm:w-8 h-0.5 bg-[#cbd5e1] flex items-center">
                                  <div className="w-2 h-2 -ml-1 rounded-full bg-[#0d9488]" />
                                </div>

                                {/* Flow Row: Product Node ──→ Independent Product Website */}
                                <div className="flex flex-wrap items-center gap-3">
                                  {/* Product Node */}
                                  <div
                                    className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-white font-bold text-xs shadow-sm transition-all ${
                                      isMatchProd && term ? "ring-2 ring-[#3b5bdb]" : ""
                                    }`}
                                    style={{ backgroundColor: prod.color }}
                                  >
                                    <button
                                      onClick={() => toggleBranch(prod.id)}
                                      className="w-4 h-4 rounded bg-white/20 hover:bg-white/30 text-white flex items-center justify-center text-[10px] font-bold cursor-pointer"
                                      title={isProdCollapsed ? "Expand subsite" : "Collapse subsite"}
                                    >
                                      {isProdCollapsed ? "+" : "−"}
                                    </button>
                                    <span>{prod.icon}</span>
                                    <span>{prod.label}</span>
                                  </div>

                                  {/* Flow Arrow */}
                                  <div className="hidden sm:flex items-center gap-1 text-[#94a3b8]">
                                    <div className="w-4 h-0.5 bg-[#94a3b8]" />
                                    <span className="text-xs font-bold">➔</span>
                                  </div>

                                  {/* Independent Product Website Gateway Node */}
                                  <button
                                    onClick={() =>
                                      navigate({
                                        page: "products",
                                        sub: prod.id,
                                        productPage: "home",
                                      })
                                    }
                                    className="bg-white border-2 border-dashed border-[#0d9488]/40 hover:border-[#0d9488] text-[#1a2744] hover:text-[#0d9488] px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                                  >
                                    <span className="w-2 h-2 rounded-full bg-[#0d9488] animate-pulse" />
                                    <span>Independent Product Website</span>
                                    <span className="text-[10px] bg-[#0d9488]/10 text-[#0d9488] px-1.5 py-0.5 rounded font-mono">
                                      {prod.pages.length} Pages ↗
                                    </span>
                                  </button>
                                </div>

                                {/* Subsite Sub-pages Tree */}
                                {!isProdCollapsed && (
                                  <div className="relative pl-6 sm:pl-8 ml-4 sm:ml-5 border-l-2 border-[#94a3b8]/50 mt-3 space-y-2">
                                    {prod.pages.map((pg) => {
                                      const isPageMatch =
                                        !term ||
                                        prod.label.toLowerCase().includes(term) ||
                                        pg.label.toLowerCase().includes(term);

                                      return (
                                        <div key={pg.id} className="relative flex items-center gap-2">
                                          {/* Sub-branch arm */}
                                          <div className="absolute -left-6 sm:-left-8 top-1/2 -translate-y-1/2 w-6 sm:w-8 h-0.5 bg-[#94a3b8]/50 flex items-center">
                                            <div className="w-1.5 h-1.5 -ml-0.5 rounded-full bg-[#0d9488]" />
                                          </div>

                                          <button
                                            onClick={() => navigate(pg.route)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all cursor-pointer flex items-center gap-2 ${
                                              isPageMatch && term
                                                ? "bg-[#0d9488] text-white border-[#0d9488] shadow-sm font-semibold"
                                                : "bg-white hover:bg-[#f0fdf4] text-[#334155] border-[#dde1e7] hover:border-[#0d9488] hover:shadow-xs"
                                            }`}
                                          >
                                            <span
                                              className="w-1.5 h-1.5 rounded-full"
                                              style={{ backgroundColor: prod.color }}
                                            />
                                            <span>{pg.label}</span>
                                            <span className="text-[10px] opacity-40">→</span>
                                          </button>
                                        </div>
                                      );
                                    })}
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
            /* ─── HORIZONTAL PIPELINE GRAPH VIEW ─── */
            <div className="min-w-[960px] py-4">
              <div className="flex items-start gap-8">
                {/* Column 0: Root Node */}
                <div className="w-52 shrink-0 pt-20">
                  <div
                    onClick={() => navigate({ page: "home" })}
                    className="bg-[#1a2744] text-white p-5 rounded-xl border-2 border-[#3b5bdb] shadow-lg cursor-pointer hover:scale-105 transition-transform"
                  >
                    <div className="text-[10px] font-bold tracking-widest text-[#60a5fa] uppercase mb-1">
                      System Root
                    </div>
                    <div className="font-bold text-base flex items-center gap-2">
                      <span>🌐</span> SHESHI
                    </div>
                    <div className="text-xs text-white/60 mt-1">/ (Home Gateway)</div>
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-white/80">
                      <span>69 Nodes</span>
                      <span className="text-[#60a5fa]">➔</span>
                    </div>
                  </div>
                </div>

                {/* Connector Arrow */}
                <div className="shrink-0 pt-32 flex flex-col items-center">
                  <div className="w-8 h-0.5 bg-[#94a3b8]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#3b5bdb]" />
                </div>

                {/* Column 1: Core Branches & Sub-Pipes */}
                <div className="flex-1 space-y-4">
                  {pillars.map((pil) => (
                    <div
                      key={pil.id}
                      className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-[#dde1e7] shadow-xs hover:border-[#3b5bdb] transition-colors"
                    >
                      <button
                        onClick={() => navigate(pil.route)}
                        className="w-36 shrink-0 text-left px-3 py-2 rounded-lg text-white font-bold text-xs cursor-pointer hover:opacity-90 transition-opacity flex items-center gap-1.5 shadow-xs"
                        style={{ backgroundColor: pil.color }}
                      >
                        <span>{pil.icon}</span> {pil.title} ↗
                      </button>

                      <div className="w-4 h-0.5 bg-[#cbd5e1] shrink-0 mt-3.5" />

                      <div className="flex-1">
                        {pil.leaves && (
                          <div className="flex flex-wrap gap-1.5">
                            {pil.leaves.map((leaf) => (
                              <button
                                key={leaf.id}
                                onClick={() => navigate(leaf.route)}
                                className="px-2.5 py-1 text-xs bg-[#f8fafc] hover:bg-[#3b5bdb] hover:text-white text-[#334155] rounded-md border border-[#dde1e7] hover:border-[#3b5bdb] transition-colors cursor-pointer"
                              >
                                {leaf.label}
                              </button>
                            ))}
                          </div>
                        )}

                        {pil.products && (
                          <div className="space-y-2 w-full">
                            {pil.products.map((prod) => (
                              <div
                                key={prod.id}
                                className="flex items-center gap-2 bg-[#f8fafc] p-2 rounded-lg border border-[#dde1e7]"
                              >
                                <span
                                  className="text-[11px] font-bold text-white px-2 py-0.5 rounded"
                                  style={{ backgroundColor: prod.color }}
                                >
                                  {prod.label}
                                </span>
                                <span className="text-[10px] text-[#64748b] font-mono">
                                  Independent Website:
                                </span>
                                <div className="flex flex-wrap gap-1 flex-1">
                                  {prod.pages.map((pg) => (
                                    <button
                                      key={pg.id}
                                      onClick={() => navigate(pg.route)}
                                      className="px-2 py-0.5 text-[11px] bg-white hover:bg-[#0d9488] hover:text-white text-[#334155] rounded border border-[#dde1e7] hover:border-[#0d9488] transition-colors cursor-pointer"
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

          {/* Flowchart Diagram Legend */}
          <div className="mt-10 pt-6 border-t border-[#dde1e7] flex flex-wrap items-center justify-between gap-4 text-xs text-[#6b7280]">
            <div className="flex items-center gap-6 flex-wrap">
              <span className="font-semibold text-[#1a2744]">Graph Legend:</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1a2744]" />
                <span>Root Platform Gateway (Level 0)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
                <span>Pillar Branch Nodes (Level 1)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0d9488]" />
                <span>Independent Product Subsite (Level 2)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#64748b]" />
                <span>Leaf Page Nodes (Level 2/3)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] bg-[#e8ecf0] text-[#475569] px-2.5 py-1 rounded-md font-medium">
                Click any graph node to jump to wireframe
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomePage({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <div>
      <HeroCentered eyebrow="Financial Intelligence Platform" />
      <LogoStrip />
      <MetricsRow count={5} />

      {/* Products */}
      <div className="bg-white px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <SectionLabel text="Our Products" />
            <div className="space-y-2 max-w-lg mx-auto">
              <Sk w="50%" h="8" className="mx-auto" />
              <Sk w="65%" h="4" className="mx-auto" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRODUCTS.map((p) => (
              <button
                key={p.id}
                onClick={() => navigate({ page: "products", sub: p.id, productPage: "home" })}
                className="text-left bg-white border border-[#dde1e7] rounded-xl p-7 hover:border-[#3b5bdb] transition-all hover:shadow-md group cursor-pointer"
              >
                <div className="w-10 h-10 rounded-lg mb-5" style={{ backgroundColor: ACCENT_COLORS[p.id] + "20" }}>
                  <div className="w-full h-full rounded-lg" style={{ backgroundColor: ACCENT_COLORS[p.id] + "40" }} />
                </div>
                <h3 className="font-bold text-[#1a2744] mb-1 group-hover:text-[#3b5bdb] transition-colors">{p.label}</h3>
                <p className="text-xs text-[#6b7280] mb-4">{p.tagline}</p>
                <span className="text-xs font-semibold text-[#3b5bdb]">Visit product →</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Complete Interactive Site Map */}
      <SiteMapSection navigate={navigate} />

      <ZigzagSection rows={3} />
      <TestimonialBlock />
      <CaseStudyCards />
      <CTABand />
    </div>
  );
}

function ContactPage() {
  const cats = [
    { label: "Sales Enquiries", desc: "Talk to our sales team about pricing and plans." },
    { label: "Partnership Enquiries", desc: "Explore strategic and technology opportunities." },
    { label: "Media Enquiries", desc: "Press, media, and analyst relations." },
    { label: "General Enquiries", desc: "All other questions and feedback." },
  ];
  return (
    <div>
      <HeroSplit eyebrow="Contact Us" />
      <div className="bg-white px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
            {cats.map((c) => (
              <div key={c.label} className="border border-[#dde1e7] rounded-xl p-8">
                <div className="w-9 h-9 rounded-lg bg-[#e8ecf0] mb-5" />
                <h3 className="font-bold text-[#1a2744] mb-2">{c.label}</h3>
                <p className="text-sm text-[#6b7280] mb-6">{c.desc}</p>
                <button className="text-xs font-semibold text-[#3b5bdb] border border-[#3b5bdb] px-4 py-2 rounded-md hover:bg-[#3b5bdb] hover:text-white transition-colors">
                  Send a message
                </button>
              </div>
            ))}
          </div>
          <div className="bg-[#f8f9fb] border border-[#dde1e7] rounded-xl p-10">
            <SectionLabel text="General Contact Form" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {["Full Name", "Email Address", "Company", "Subject"].map((f) => (
                <div key={f}>
                  <p className="text-xs font-semibold text-[#6b7280] mb-1.5">{f}</p>
                  <div className="h-10 bg-white border border-[#dde1e7] rounded-md" />
                </div>
              ))}
              <div className="md:col-span-2">
                <p className="text-xs font-semibold text-[#6b7280] mb-1.5">Message</p>
                <div className="h-28 bg-white border border-[#dde1e7] rounded-md" />
              </div>
            </div>
            <button className="mt-6 bg-[#3b5bdb] text-white px-6 py-2.5 rounded-md text-sm font-semibold">Submit Enquiry</button>
          </div>
        </div>
      </div>
      <CTABand />
    </div>
  );
}

function LegalPage({ doc }: { doc: string }) {
  const titles: Record<string, string> = { privacy: "Privacy Policy", terms: "Terms of Use", cookies: "Cookie Policy", security: "Security Disclosure", sitemap: "Sitemap" };
  return (
    <div>
      <PageHero title={titles[doc] ?? doc} breadcrumb={["Legal", titles[doc] ?? doc]} />
      <div className="max-w-3xl mx-auto px-8 py-14 space-y-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <Sk w="35%" h="5" className="mb-4" />
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, j) => <Sk key={j} w={`${70 + (j * 7) % 30}%`} h="3" />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Per-Product Layouts ──────────────────────────────────────────────────────

const PRODUCT_LAYOUTS: Record<string, {
  homeHero: "split" | "centered";
  darkNav?: boolean;
  homeSections: SectionDef[];
  pageSections: Record<string, SectionDef[]>;
}> = {
  // Quanta: enterprise-grade, data-heavy, dark authoritative feel
  quanta: {
    homeHero: "centered",
    darkNav: true,
    homeSections: [
      { type: "metrics", count: 5 },
      { type: "splitplatform" },
      { type: "zigzag", count: 2 },
      { type: "casestudies" },
      { type: "testimonial", accent: "#1a2744" },
      { type: "ctaband", accent: "#1a2744" },
    ],
    pageSections: {
      platform:     [{ type: "splitplatform" }, { type: "capgrid", count: 9 }, { type: "zigzag", count: 2 }, { type: "ctaband", accent: "#1a2744" }],
      solutions:    [{ type: "zigzag", count: 3 }, { type: "casestudies" }, { type: "testimonial", accent: "#1a2744" }, { type: "ctaband", accent: "#1a2744" }],
      capabilities: [{ type: "capgrid", count: 9 }, { type: "metrics", count: 4 }, { type: "benefitcards", count: 4 }, { type: "ctaband", accent: "#1a2744" }],
      enterprise:   [{ type: "metrics", count: 4 }, { type: "zigzag", count: 2 }, { type: "casestudies" }, { type: "ctaband", accent: "#1a2744" }],
      resources:    [{ type: "featurecards", count: 3 }, { type: "videocards" }, { type: "list", count: 4 }, { type: "ctaband", accent: "#1a2744" }],
      contact:      [{ type: "benefitcards", count: 3 }, { type: "ctaband", accent: "#1a2744" }],
    },
  },

  // Catalyx: startup-energy, benefit-forward, fast & feature-rich
  catalyx: {
    homeHero: "split",
    homeSections: [
      { type: "benefitcards", count: 4 },
      { type: "featurecards", count: 3 },
      { type: "zigzag", count: 2 },
      { type: "logostrip" },
      { type: "testimonial", accent: "#0d6b4e" },
      { type: "ctaband", accent: "#0d6b4e" },
    ],
    pageSections: {
      solutions: [{ type: "featurecards", count: 4, cols: 4 }, { type: "zigzag", count: 2 }, { type: "benefitcards", count: 3 }, { type: "ctaband", accent: "#0d6b4e" }],
      features:  [{ type: "capgrid", count: 9 }, { type: "zigzag", count: 2 }, { type: "testimonial", accent: "#0d6b4e" }, { type: "ctaband", accent: "#0d6b4e" }],
      startups:  [{ type: "metrics", count: 4 }, { type: "featurecards", count: 3 }, { type: "casestudies" }, { type: "faq" }, { type: "ctaband", accent: "#0d6b4e" }],
      resources: [{ type: "videocards" }, { type: "featurecards", count: 3 }, { type: "list", count: 5 }, { type: "ctaband", accent: "#0d6b4e" }],
      contact:   [{ type: "featurecards", count: 3 }, { type: "ctaband", accent: "#0d6b4e" }],
    },
  },

  // ConsultEase: professional, workflow-structured, consultancy tone
  consultease: {
    homeHero: "split",
    homeSections: [
      { type: "splitplatform" },
      { type: "featurecards", count: 3 },
      { type: "zigzag", count: 2 },
      { type: "testimonial", accent: "#7c3aed" },
      { type: "faq" },
      { type: "ctaband", accent: "#7c3aed" },
    ],
    pageSections: {
      solutions: [{ type: "zigzag", count: 3 }, { type: "testimonial", accent: "#7c3aed" }, { type: "casestudies" }, { type: "ctaband", accent: "#7c3aed" }],
      features:  [{ type: "capgrid", count: 9 }, { type: "benefitcards", count: 4 }, { type: "zigzag", count: 2 }, { type: "ctaband", accent: "#7c3aed" }],
      firms:     [{ type: "metrics", count: 4 }, { type: "zigzag", count: 2 }, { type: "casestudies" }, { type: "testimonial", accent: "#7c3aed" }, { type: "ctaband", accent: "#7c3aed" }],
      resources: [{ type: "featurecards", count: 3 }, { type: "videocards" }, { type: "ctaband", accent: "#7c3aed" }],
      contact:   [{ type: "benefitcards", count: 3 }, { type: "faq" }, { type: "ctaband", accent: "#7c3aed" }],
    },
  },

  // Sheshi FR: numbers-forward, reporting-focused, data-dense
  sheshifr: {
    homeHero: "centered",
    homeSections: [
      { type: "metrics", count: 4 },
      { type: "zigzag", count: 3 },
      { type: "integration" },
      { type: "benefitcards", count: 4 },
      { type: "testimonial", accent: "#b45309" },
      { type: "ctaband", accent: "#b45309" },
    ],
    pageSections: {
      features:      [{ type: "capgrid", count: 9 }, { type: "zigzag", count: 2 }, { type: "benefitcards", count: 4 }, { type: "ctaband", accent: "#b45309" }],
      workflows:     [{ type: "splitplatform" }, { type: "zigzag", count: 2 }, { type: "testimonial", accent: "#b45309" }, { type: "ctaband", accent: "#b45309" }],
      professionals: [{ type: "metrics", count: 4 }, { type: "featurecards", count: 3 }, { type: "casestudies" }, { type: "faq" }, { type: "ctaband", accent: "#b45309" }],
      resources:     [{ type: "videocards" }, { type: "featurecards", count: 3 }, { type: "list", count: 5 }, { type: "ctaband", accent: "#b45309" }],
      contact:       [{ type: "integration" }, { type: "ctaband", accent: "#b45309" }],
    },
  },
};

// ─── Product Subsite ──────────────────────────────────────────────────────────

function ProductNavbar({ product, productPage, setProductPage, accent, darkNav, navigate }: {
  product: typeof PRODUCTS[0]; productPage: string; darkNav?: boolean;
  setProductPage: (p: string) => void; accent: string; navigate: (r: Route) => void;
}) {
  const bg = darkNav ? accent : "white";
  const border = darkNav ? "transparent" : "#dde1e7";
  const wordmarkColor = darkNav ? "white" : accent;
  const linkColor = darkNav ? "rgba(255,255,255,0.7)" : "#374151";
  const activeLinkColor = darkNav ? "white" : "#3b5bdb";
  const backBorder = darkNav ? "rgba(255,255,255,0.2)" : "#dde1e7";
  const backColor = darkNav ? "rgba(255,255,255,0.5)" : "#9ca3af";

  return (
    <nav className="sticky top-0 z-50" style={{ backgroundColor: bg, borderBottom: `1px solid ${border}` }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center h-14 gap-2">
        <button onClick={() => setProductPage("home")} className="font-bold text-xl mr-6 tracking-tight" style={{ color: wordmarkColor }}>
          {product.label.toUpperCase()}
        </button>
        <div className="flex items-center flex-1">
          {product.pages.map((p) => (
            <button key={p.id} onClick={() => setProductPage(p.id)}
              className="px-3 py-2 text-sm font-medium rounded-md transition-colors"
              style={{ color: productPage === p.id ? activeLinkColor : linkColor }}>
              {p.label}
            </button>
          ))}
        </div>
        <button onClick={() => navigate({ page: "products" })}
          className="text-xs px-3 py-1.5 rounded-md transition-colors border"
          style={{ color: backColor, borderColor: backBorder }}>
          ← Back to Sheshi
        </button>
        <button className="text-white text-sm font-semibold px-4 py-2 rounded-md ml-2"
          style={{ backgroundColor: darkNav ? "rgba(255,255,255,0.15)" : accent, border: darkNav ? "1px solid rgba(255,255,255,0.3)" : "none" }}>
          Get Started
        </button>
      </div>
    </nav>
  );
}

function ProductFooter({ product, accent, navigate }: { product: typeof PRODUCTS[0]; accent: string; navigate: (r: Route) => void }) {
  return (
    <footer style={{ backgroundColor: accent }} className="text-white">
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="font-bold text-xl mb-2 tracking-tight">{product.label.toUpperCase()}</div>
          <p className="text-white/50 text-sm max-w-xs">{product.tagline}</p>
          <button onClick={() => navigate({ page: "home" })} className="mt-4 text-xs text-white/40 hover:text-white/80 transition-colors">A Sheshi product →</button>
        </div>
        <div>
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">Pages</p>
          <ul className="space-y-2">{product.pages.map((p) => <li key={p.id}><span className="text-sm text-white/60 hover:text-white cursor-pointer transition-colors">{p.label}</span></li>)}</ul>
        </div>
        <div>
          <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-3">Legal</p>
          <ul className="space-y-2">{["Privacy Policy", "Terms of Use", "Cookie Policy"].map((l) => <li key={l}><span className="text-sm text-white/60 hover:text-white cursor-pointer transition-colors">{l}</span></li>)}</ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-8 py-4 max-w-7xl mx-auto">
        <p className="text-xs text-white/30">© 2026 {product.label}. A Sheshi company.</p>
      </div>
    </footer>
  );
}

function ProductSubsite({ productId, productPage, setProductPage, navigate }: {
  productId: string; productPage: string; setProductPage: (p: string) => void; navigate: (r: Route) => void;
}) {
  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return null;
  const accent = ACCENT_COLORS[productId] ?? "#1a2744";
  const layout = PRODUCT_LAYOUTS[productId];

  let content: React.ReactNode;

  if (productPage === "home") {
    const heroEl = layout.homeHero === "centered"
      ? <HeroCentered eyebrow={product.tagline} bg={accent} />
      : <HeroSplit eyebrow={product.tagline} />;
    content = (
      <div>
        {heroEl}
        {layout.homeSections.map((s, i) => renderSection(s, i))}
      </div>
    );
  } else {
    const pageLabel = product.pages.find((p) => p.id === productPage)?.label ?? productPage;
    const sections = layout.pageSections[productPage] ?? [
      { type: "featurecards", count: 3 },
      { type: "zigzag", count: 2 },
      { type: "testimonial", accent },
      { type: "ctaband", accent },
    ];
    content = (
      <div>
        <HeroSplit eyebrow={`${product.label} — ${pageLabel}`} />
        {sections.map((s, i) => renderSection(s, i))}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fb]">
      <ProductNavbar
        product={product} productPage={productPage}
        setProductPage={setProductPage} accent={accent}
        darkNav={layout.darkNav} navigate={navigate}
      />
      <main className="flex-1">{content}</main>
      <ProductFooter product={product} accent={accent} navigate={navigate} />
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ navigate, currentPage }: { navigate: (r: Route) => void; currentPage: string }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  return (
    <nav className="bg-white border-b border-[#dde1e7] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 flex items-center h-14 gap-1">
        <button onClick={() => navigate({ page: "home" })} className="font-bold text-xl text-[#1a2744] mr-6 tracking-tight">SHESHI</button>
        <div className="flex items-center flex-1">
          {NAV.map((item) => (
            <div key={item.page} className="relative"
              onMouseEnter={() => item.children && setOpenMenu(item.page)}
              onMouseLeave={() => setOpenMenu(null)}>
              <button onClick={() => { navigate({ page: item.page }); setOpenMenu(null); }}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${currentPage === item.page ? "text-[#3b5bdb]" : "text-[#374151] hover:text-[#1a2744]"}`}>
                {item.label}{item.children && <span className="ml-1 text-[10px] opacity-50">▾</span>}
              </button>
              {item.children && openMenu === item.page && (
                <div className="absolute top-full left-0 bg-white border border-[#dde1e7] rounded-lg shadow-lg py-2 min-w-48 z-50">
                  {item.children.map((child) => (
                    <button key={child.sub}
                      onClick={() => { navigate({ page: item.page, sub: child.sub, ...(item.page === "products" ? { productPage: "home" } : {}) }); setOpenMenu(null); }}
                      className="block w-full text-left px-4 py-2.5 text-sm text-[#374151] hover:bg-[#f8f9fb]">
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <button className="text-sm font-medium text-[#374151] px-3 py-2 hover:text-[#1a2744]">Log in</button>
          <button className="bg-[#1a2744] text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-[#3b5bdb] transition-colors">Get Started</button>
        </div>
      </div>
    </nav>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer({ navigate }: { navigate: (r: Route) => void }) {
  return (
    <footer className="bg-[#1a2744] text-white">
      <div className="max-w-7xl mx-auto px-8 py-14 grid grid-cols-2 md:grid-cols-5 gap-8">
        <div className="md:col-span-2">
          <div className="font-bold text-xl mb-3 tracking-tight">SHESHI</div>
          <p className="text-[#94a3b8] text-sm max-w-xs">The financial operating system for enterprises, startups, and finance professionals.</p>
        </div>
        {[
          { title: "Company", links: [{ label: "About", route: { page: "company", sub: "about" } }, { label: "Careers", route: { page: "company", sub: "careers" } }, { label: "Contact", route: { page: "contact" } }] },
          { title: "Products", links: PRODUCTS.map((p) => ({ label: p.label, route: { page: "products", sub: p.id, productPage: "home" } })) },
          { title: "Legal", links: [
            { label: "Privacy Policy", route: { page: "legal", sub: "privacy" } },
            { label: "Terms of Use", route: { page: "legal", sub: "terms" } },
            { label: "Cookie Policy", route: { page: "legal", sub: "cookies" } },
            { label: "Security Disclosure", route: { page: "legal", sub: "security" } },
            { label: "Sitemap", route: { page: "legal", sub: "sitemap" } },
          ]},
        ].map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold text-[#94a3b8] uppercase tracking-widest mb-3">{col.title}</p>
            <ul className="space-y-2">{col.links.map((l) => (
              <li key={l.label}><button onClick={() => navigate(l.route)} className="text-sm text-[#cbd5e1] hover:text-white transition-colors">{l.label}</button></li>
            ))}</ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-8 py-5 flex items-center justify-between max-w-7xl mx-auto">
        <p className="text-xs text-[#64748b]">© 2026 Sheshi. All rights reserved.</p>
        <div className="flex gap-5">{["LinkedIn", "Twitter", "GitHub"].map((s) => <span key={s} className="text-xs text-[#64748b] hover:text-white cursor-pointer transition-colors">{s}</span>)}</div>
      </div>
    </footer>
  );
}

// ─── Router ───────────────────────────────────────────────────────────────────

function resolvePageComponent(route: Route, navigate: (r: Route) => void) {
  if (route.page === "home") return <HomePage navigate={navigate} />;
  if (route.page === "contact") return <ContactPage />;
  if (route.page === "legal") return <LegalPage doc={route.sub ?? "privacy"} />;

  if (route.page === "products" && !route.sub) {
    return (
      <div>
        <HeroSplit eyebrow="Our Products" />
        <div className="bg-white px-8 py-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRODUCTS.map((p) => (
              <button key={p.id} onClick={() => navigate({ page: "products", sub: p.id, productPage: "home" })}
                className="text-left bg-white border border-[#dde1e7] rounded-xl p-8 hover:border-[#3b5bdb] transition-colors group">
                <div className="w-12 h-12 rounded-lg mb-5" style={{ backgroundColor: ACCENT_COLORS[p.id] + "20" }} />
                <h3 className="text-xl font-bold text-[#1a2744] mb-1 group-hover:text-[#3b5bdb] transition-colors">{p.label}</h3>
                <p className="text-sm text-[#6b7280] mb-4">{p.tagline}</p>
                <span className="text-xs font-semibold text-[#3b5bdb]">Visit product site →</span>
              </button>
            ))}
          </div>
        </div>
        <CTABand />
      </div>
    );
  }

  const pageData = PAGE_DATA[route.page]?.[route.sub ?? ""];
  if (pageData) {
    return (
      <GenericPage
        title={pageData.title}
        subtitle={pageData.subtitle}
        hero={pageData.hero}
        breadcrumb={[route.page.charAt(0).toUpperCase() + route.page.slice(1), pageData.title]}
        sections={pageData.sections}
      />
    );
  }

  const SECTION_TITLES: Record<string, string> = { company: "Company", solutions: "Solutions", technology: "Technology", resources: "Resources", partners: "Partners" };
  return (
    <div>
      <HeroSplit eyebrow={SECTION_TITLES[route.page] ?? route.page} />
      <CTABand />
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [route, setRoute] = useState<Route>({ page: "home" });

  function navigate(r: Route) { setRoute(r); window.scrollTo({ top: 0, behavior: "smooth" }); }
  function setProductPage(p: string) { setRoute((prev) => ({ ...prev, productPage: p })); window.scrollTo({ top: 0, behavior: "smooth" }); }

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
    <div className="min-h-screen flex flex-col bg-[#f8f9fb]">
      <Navbar navigate={navigate} currentPage={route.page} />
      <main className="flex-1">{resolvePageComponent(route, navigate)}</main>
      <Footer navigate={navigate} />
    </div>
  );
}
