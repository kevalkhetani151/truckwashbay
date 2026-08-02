"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Mail,
  MapPin,
  Clock3,
  Truck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ArrowUpRight
} from "lucide-react";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  company?: string;
  message?: string;
}

export default function ContactPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    service: "Fleet Foam Wash Allocation",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const goContact = (): void => { router.push("/contact"); };

  useEffect(() => {
    const onScroll = (): void => { setScrolled(window.scrollY > 20); };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    els.forEach((el) => { io.observe(el); });
    return () => { io.disconnect(); };
  }, []);

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim()) errs.lastName = "Required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid format";
    if (!form.company.trim()) errs.company = "Required";
    if (form.message.trim().length < 10) errs.message = "Specification parameters too short";
    return errs;
  };

  // ── API INTEGRATION ADDED HERE ──────────────────────────────────
  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>): Promise<void> => {
    ev.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    
    setSubmitting(true);
    
    try {
      const response = await fetch("/api/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          company: "",
          service: "Fleet Foam Wash Allocation",
          message: "",
        });
      } else {
        console.error("Failed to submit inquiry.");
      }
    } catch (error) {
      console.error("Network error occurred while submitting.", error);
    } finally {
      setSubmitting(false);
    }
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/#services" },
    { label: "About", href: "/#about" },
    { label: "price",    href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <main className="bg-[#f8f9fa] text-[#0d111c] overflow-hidden min-h-screen selection:bg-[#0d111c] selection:text-white font-sans antialiased tracking-tight">
      
      {/* ── STYLESHEET CONFIGURATIONS ────────────────────────────────── */}
      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 1.4s cubic-bezier(0.16, 1, 0.3, 1), transform 1.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .monolith-input-group {
          position: relative;
          border-bottom: 1.5px solid rgba(13, 17, 28, 0.12);
          transition: border-color 0.4s ease;
        }
        .monolith-input-group:focus-within {
          border-color: #0d111c;
        }
        .monolith-input-group::after {
          content: "";
          position: absolute;
          bottom: -1.5px;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #2563eb;
          transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .monolith-input-group:focus-within::after {
          width: 100%;
        }
        .monolith-field {
          width: 100%;
          background: transparent;
          padding: 16px 0;
          color: #0d111c;
          font-size: 16px;
          font-weight: 400;
          outline: none;
          border: none;
        }
        .monolith-field::placeholder {
          color: #94a3b8;
          opacity: 0.85;
        }
        .monolith-error-state {
          border-color: #ef4444 !important;
        }
        .premium-card {
          background: #ffffff;
          border: 1px solid rgba(17, 22, 37, 0.06);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .premium-card:hover {
          border-color: rgba(37, 99, 235, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.02);
        }
      `}</style>

      {/* ── MOBILE SIDEBAR OVERLAY ────────────────────────────────────── */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-[1100] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer Menu */}
    <div
        className={`fixed top-0 right-0 h-full w-[300px] max-w-[85vw] z-[1200] bg-[#0f172a] border-l border-slate-700 flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-6 h-[64px] border-b border-slate-700">
          <a href="/" className="text-white text-[1.2rem] font-black tracking-tight">
            brizzy<span className="text-[#3b82f6]">.</span>
          </a>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-9 h-9 flex flex-col items-center justify-center gap-[5px]"
            aria-label="Close menu"
          >
            <span className="block w-5 h-[2px] bg-white rotate-45 translate-y-[3.5px] transition-all" />
            <span className="block w-5 h-[2px] bg-white -rotate-45 -translate-y-[3.5px] transition-all" />
          </button>
        </div>

        <nav className="flex flex-col px-6 pt-8 gap-1">
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMenuOpen(false)}
              className="text-slate-300 hover:text-white text-[17px] font-semibold py-3 border-b border-slate-800 transition"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="px-6 mt-8 flex flex-col gap-3">
          <button
            onClick={() => { setMenuOpen(false); goContact(); }}
            className="w-full bg-[#3b82f6] hover:bg-[#2563eb] transition text-white py-4 rounded-xl font-bold text-[15px]"
          >
            Book Appointment
          </button>
          <a
            href="http://brizzytruckwash.com.au/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition text-white py-4 rounded-xl font-bold text-[15px]"
          >
            Mobile Wash <ArrowUpRight size={16} />
          </a>
        </div>
      </div>

      {/* ── FIXED SOLID WHITE NAVIGATION BAR ──────────────────────────── */}
      <nav
        className={`fixed top-0 left-0 w-full z-[1000] flex items-center justify-between px-6 md:px-14 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 transition-all duration-400 ${
          scrolled ? "h-[80px] shadow-[0_4px_40px_rgba(0,0,0,0.02)]" : "h-[96px]"
        }`}
      >
        <a href="/" className="flex-shrink-0 transition-opacity hover:opacity-75">
          <Image
            src="/logo3.png"
            alt="Brizzy Logo"
            width={72}
            height={56}
            className="h-auto w-auto mix-blend-multiply"
            priority
          />
        </a>

        <ul className="hidden xl:flex items-center gap-10">
          {navLinks.map(({ label, href }) => (
            <li key={label}>
              <a
                href={href}
                className={`transition-colors duration-300 text-[12px] uppercase tracking-[0.2em] font-bold relative group ${
                  label === "Pricing" ? "text-slate-950" : "text-slate-500 hover:text-slate-950"
                }`}
              >
                {label}
                <span className={`absolute -bottom-2 left-0 h-[1.5px] bg-slate-950 transition-all duration-300 ${
                  label === "Pricing" ? "w-full" : "w-0 group-hover:w-full"
                }`} />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="http://brizzytruckwash.com.au/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-all duration-300 px-5 py-3.5 rounded-xl font-bold text-[11px] tracking-widest uppercase shadow-sm"
          >
            Mobile Wash
            <ArrowUpRight size={14} />
          </a>
          <button
            onClick={goContact}
            className="flex items-center gap-2 bg-slate-950 text-white hover:bg-slate-800 transition-all duration-300 px-6 py-3.5 rounded-xl font-bold text-[11px] tracking-widest uppercase shadow-md shadow-slate-900/10"
          >
            Book Appointment
            <ArrowRight size={14} />
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="xl:hidden flex flex-col gap-[5px] p-3 rounded-xl bg-white border border-slate-200 shadow-sm ml-auto md:ml-4"
        >
          <span className="block w-5 h-[1.5px] bg-slate-950" />
          <span className="block w-4 h-[1.5px] bg-slate-950 self-end" />
        </button>
      </nav>

      {/* ── ASYMMETRICAL EDITORIAL HERO SECTION ────────────────────────── */}
      <section className="relative pt-[200px] pb-24 md:pt-[240px] md:pb-36 bg-gradient-to-b from-white to-[#f8f9fa]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14">
          
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-slate-200 bg-white mb-10 shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600"></span>
            <span className="text-slate-500 uppercase tracking-[0.3em] text-[11px] font-extrabold">
              Corporate Logistics Hub Matrix
            </span>
          </div>

          <h1 className="text-[#0d111c] font-light leading-[0.88] tracking-[-0.05em] text-[clamp(3.2rem,8.5vw,7.2rem)] max-w-[1100px]">
            Contact our <br className="hidden lg:inline" />
            truck washing <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-950 via-slate-800 to-blue-600">specialists.</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-16 pt-12 border-t border-slate-200/70 items-start">
            <p className="lg:col-span-8 text-slate-500 text-lg md:text-xl font-light leading-relaxed max-w-[760px]">
              Industrial truck detailing and commercial fleet washing configurations engineered specifically for modern transport systems, logistics networks, and enterprise fleets across Queensland.
            </p>
            <div className="lg:col-span-4 flex lg:justify-end">
              <button
                onClick={goContact}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-5 rounded-xl text-sm tracking-widest uppercase transition-all shadow-xl shadow-blue-600/10"
              >
                Schedule TruckWash Service
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN INTERACTION STRUCTURAL GRID ───────────────────────────── */}
      <section className="bg-[#f8f9fa] pb-36 relative z-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14 grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          
          {/* TECHNICAL DATA MARGIN (LEFT) */}
          <div className="lg:col-span-5 flex flex-col gap-16 reveal">
            <div>
              <span className="text-blue-600 uppercase tracking-widest text-xs font-black block mb-3">Enterprise Inquiry Desk</span>
              <h2 className="text-slate-950 text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                Built for modern fleet assets.
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  Icon: Truck,
                  title: "Precision Carrier Wash Networks",
                  text: "Turnkey, scheduled onsite foam application pipelines constructed precisely around down-time vectors to negate route frictions."
                },
                {
                  Icon: ShieldCheck,
                  title: "Calibrated Sub-Surfactants",
                  text: "Heavy particulate clearing compounds completely free from standard abrasive minerals, preserving aesthetic asset coats safely."
                },
                {
                  Icon: Sparkles,
                  title: "Technical Compliance Desk",
                  text: "Every operator finishes validation protocols across heavy commercial frame presentation grids and regulatory cabin hygiene steps."
                }
              ].map(({ Icon, title, text }, i) => (
                <div key={i} className="premium-card rounded-2xl p-7 shadow-[0_12px_40px_rgba(0,0,0,0.005)]">
                  <div className="flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-[#f8f9fa] border border-slate-200/60 flex items-center justify-center text-slate-800 shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h4 className="text-slate-900 text-lg font-bold mb-1.5">{title}</h4>
                      <p className="text-slate-500 text-base font-light leading-relaxed">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

       {/* Grid Coordinates Metadata */}
<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 border-t border-slate-200/60 pt-10">
  {[
    { label: "Email Route", val: "Craig@brizzytruckwash.com.au" },
    { label: "Phone Number", val: "0450 273 046" },
    { label: "Sectors Covered", val: "Brisbane, Gold Coast, Ipswich" },
    { label: "Shift Rotations", val: "7 Days • 6am – 8pm" }
  ].map(({ label, val }, i) => (
    <div key={i}>
      <span className="text-[10px] uppercase font-black tracking-widest text-slate-400 block mb-2">
        {label}
      </span>
      <p className="text-slate-800 text-sm font-semibold leading-normal break-words">
        {val}
      </p>
    </div>
  ))}
</div>
          </div>

          {/* EDITORIAL PLATINUM FORM COMPONENT (RIGHT) */}
          <div className="lg:col-span-7 reveal">
            <div className="bg-white border border-slate-200/60 rounded-[32px] p-8 sm:p-14 shadow-[0_50px_100px_rgba(15,23,42,0.015)] relative">
              
              {submitted ? (
                <div className="text-center py-24 max-w-sm mx-auto">
                  <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-6 text-blue-600">
                    <CheckCircle2 size={24} />
                  </div>
                  <h3 className="text-slate-900 text-2xl font-bold tracking-tight mb-2">Vector Ingested</h3>
                  <p className="text-slate-500 text-base font-light leading-relaxed mb-10">
                    Pricing matrix configurations are being matched to your data. A regional coordinator will contact your fleet supervisor within 10 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="bg-slate-950 hover:bg-slate-900 text-white font-bold px-8 py-4 rounded-xl text-xs uppercase tracking-widest transition"
                  >
                    Submit New Framework
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-14">
                    <h3 className="text-slate-950 text-2xl font-bold tracking-tight mb-2">Request Enterprise Quote</h3>
                    <p className="text-slate-500 text-base font-light">Input required operational asset dimensions below.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-0.5">First Name</label>
                        <div className={`monolith-input-group ${errors.firstName ? "monolith-error-state" : ""}`}>
                          <input
                            className="monolith-field"
                            placeholder="John"
                            value={form.firstName}
                            onChange={(e) => setForm(f => ({ ...f, firstName: e.target.value }))}
                          />
                        </div>
                        {errors.firstName && <p className="text-red-500 text-xs font-bold mt-2 uppercase tracking-wide">{errors.firstName}</p>}
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-0.5">Last Name</label>
                        <div className={`monolith-input-group ${errors.lastName ? "monolith-error-state" : ""}`}>
                          <input
                            className="monolith-field"
                            placeholder="Doe"
                            value={form.lastName}
                            onChange={(e) => setForm(f => ({ ...f, lastName: e.target.value }))}
                          />
                        </div>
                        {errors.lastName && <p className="text-red-400 text-xs font-bold mt-2 uppercase tracking-wide">{errors.lastName}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-0.5">Corporate Email</label>
                        <div className={`monolith-input-group ${errors.email ? "monolith-error-state" : ""}`}>
                          <input
                            type="email"
                            className="monolith-field"
                            placeholder="j.doe@company.com.au"
                            value={form.email}
                            onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                          />
                        </div>
                        {errors.email && <p className="text-red-400 text-xs font-bold mt-2 uppercase tracking-wide">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-0.5">Company Entity</label>
                        <div className={`monolith-input-group ${errors.company ? "monolith-error-state" : ""}`}>
                          <input
                            className="monolith-field"
                            placeholder="Logistics Pty Ltd"
                            value={form.company}
                            onChange={(e) => setForm(f => ({ ...f, company: e.target.value }))}
                          />
                        </div>
                        {errors.company && <p className="text-red-400 text-xs font-bold mt-2 uppercase tracking-wide">{errors.company}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-0.5">Target Fleet Pipeline Matrix</label>
                      <div className="monolith-input-group">
                        <select
                          className="monolith-field appearance-none cursor-pointer pr-10"
                          value={form.service}
                          onChange={(e) => setForm(f => ({ ...f, service: e.target.value }))}
                        >
                          <option value="Fleet Foam Wash Allocation">Fleet Foam Wash Allocation</option>
                          <option value="Ceramic Protective Overlay">Ceramic Protective Overlay</option>
                          <option value="Internal Decontamination">Internal Decontamination</option>
                          <option value="Cabin Systems Detailing">Cabin Systems Detailing</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none text-slate-400">
                          <ChevronDown size={15} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 ml-0.5">Operational Parameters Spec</label>
                      <div className={`monolith-input-group ${errors.message ? "monolith-error-state" : ""}`}>
                        <textarea
                          rows={3}
                          className="monolith-field resize-none text-base"
                          placeholder="State estimated prime mover unit capacity configurations, rigid specifications, or cycle loops..."
                          value={form.message}
                          onChange={(e) => setForm(f => ({ ...f, message: e.target.value }))}
                        />
                      </div>
                      {errors.message && <p className="text-red-500 text-[10px] mt-2.5 font-bold tracking-wide uppercase">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-3 h-16 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs tracking-widest uppercase transition-all disabled:opacity-50"
                    >
                      {submitting ? "Ingesting Specifications..." : "Submit Profile Request"}
                      <ArrowRight size={14} />
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── ARCHITECTURAL TELEMETRY MAP CANVAS ─────────────────────────── */}
    <section className="relative z-10 bg-[#f8f9fa] py-24">
  <div className="max-w-[1400px] mx-auto px-6 md:px-14">
    <div className="mb-10 text-center">
      <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-600">
        Visit Our Location
      </span>

      <h2 className="mt-5 text-4xl md:text-5xl font-black tracking-tight text-slate-900">
        Find Us
      </h2>

      <p className="mt-4 max-w-2xl mx-auto text-lg text-slate-600">
        Conveniently located in Brisbane with easy access for commercial
        trucks and heavy vehicles.
      </p>
    </div>

    <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white p-3 shadow-[0_30px_80px_rgba(15,23,42,0.08)]">
      <iframe
        src="https://www.google.com/maps?q=-27.443467,153.119284&z=18&output=embed"
        title="Brizzy Truck Wash Location"
        loading="lazy"
        className="h-[600px] w-full rounded-[24px] border-0 grayscale hover:grayscale-0 transition-all duration-500"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  </div>
</section>
      {/* ── ABOUT US (DEDICATED TRUCK WASH BAY INTEGRATION) ─────────────── */}
   

      {/* ── STANDARD OPERATING VALUE PROP PARAMETERS ───────────────────── */}
      <section className="bg-white py-32 border-y border-slate-200/60 relative">
        <div className="max-w-[1400px] mx-auto px-6 md:px-14">
          
          <div className="max-w-[800px] mb-24 reveal">
            <span className="text-blue-600 uppercase tracking-[0.2em] text-[11px] font-extrabold block mb-3">
              Standardized System Frameworks
            </span>
            <h2 className="text-slate-950 font-light tracking-tight text-4xl md:text-5xl leading-[1.05]">
              Systematized cleaning protocols designed for high-density asset fleets.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[
              { n: "01", title: "Enterprise Workflows", desc: "Every wash cycle runs strictly inside predefined workflow trees ensuring extreme process reliability." },
              { n: "02", title: "Adaptive Time Allocation", desc: "Flexible deployment scheduling calculated completely around long-haul route timelines to prevent idle assets." },
              { n: "03", title: "Validated Technicians", desc: "Detailing specialists complete deep technical exterior infrastructure training parameters successfully." },
              { n: "04", title: "High-Volume Fluid Dynamics", desc: "Industrial high-volume pressure induction systems paired with advanced eco-retention management." },
              { n: "05", title: "Granular Unit Costing", desc: "Transparent variable matrices scaled exactly to specific vehicle variants, dimensions, and regular volumes." },
              { n: "06", title: "Direct Account Telemetry", desc: "Dedicated assignment coordinators provide real-time updates and constant alignment on execution pipelines." },
            ].map((item, index) => (
              <div
                key={index}
                className="premium-card reveal rounded-2xl p-8 cursor-default flex flex-col justify-between min-h-[220px]"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-50 border border-slate-200/80 text-slate-400">{item.n}</span>
                  <span className="text-slate-300 text-sm">✦</span>
                </div>
                <div>
                  <h3 className="text-slate-950 text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-base font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

     
      {/* ── METICULOUS CLEAN LIGHT FOOTER (MATCHES REQ) ───────────────── */}
      <footer className="relative bg-[#0f172a] border-t border-slate-800 overflow-hidden">
        <div className="absolute bottom-[-200px] right-[-120px] w-[420px] h-[420px] rounded-full bg-blue-500/10 blur-[140px]" />

        <div className="relative z-10 max-w-[1300px] mx-auto px-4 sm:px-6 md:px-12 py-14 sm:py-20 md:py-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 md:gap-16 pb-12 sm:pb-16 md:pb-20 border-b border-slate-700">

            {/* BRAND */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center">
                <Image
                  src="/logo3.png"
                  alt="Brizzy"
                  width={140}
                  height={70}
                  className="object-contain"
                  priority
                />
              </div>
              <p className="mt-4 sm:mt-6 text-white/50 leading-[1.8] sm:leading-[1.9] text-[15px] sm:text-[16px] max-w-[320px]">
                Professional truck washing services designed to keep your vehicles clean, presentable, and road-ready.
              </p>
              <div className="flex items-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                {["IG", "TW", "LI"].map((item, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 hover:text-white hover:border-blue-400/50 hover:bg-blue-500/10 transition text-xs sm:text-sm cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* SERVICES */}
            <div>
              <h4 className="text-white font-bold text-[16px] sm:text-lg mb-5 sm:mb-7 md:mb-8">Services</h4>
              <div className="flex flex-col gap-4 sm:gap-5">
                {["Fleet Foam Wash", "Trailer Sanitization", "Interior Detailing"].map((item, i) => (
                  <a key={i} href="/contact" className="text-white/45 hover:text-white transition text-sm">
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* COMPANY */}
            <div>
              <h4 className="text-white font-bold text-[16px] sm:text-lg mb-5 sm:mb-7 md:mb-8">Company</h4>
              <div className="flex flex-col gap-4 sm:gap-5">
                {["About Us", "Enterprise", "Careers"].map((item, i) => (
                  <a key={i} href="/contact" className="text-white/45 hover:text-white transition text-sm">
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* CONTACT */}
            <div>
              <h4 className="text-white font-bold text-[16px] sm:text-lg mb-5 sm:mb-7 md:mb-8">Contact</h4>
              <div className="flex flex-col gap-4 sm:gap-5 text-white/45 text-sm">
                <span>Craig@brizzytruckwash.com.au</span>
                <span>Rear of 1248 Lytton Rd Hemmant QLD 4174</span>
                <span>24/7 Fleet Support</span>
              </div>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="pt-7 sm:pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <p className="text-white/35 text-sm text-center sm:text-left">
              © 2026 brizzy Fleet Wash. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8">
              {["Privacy Policy", "Terms & Conditions", "Fleet Support"].map((item, i) => (
                <a key={i} href="/contact" className="text-white/35 hover:text-white transition text-sm">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}