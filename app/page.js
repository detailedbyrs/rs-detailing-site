"use client";

import { useState } from "react";

function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50);

  const updateSlider = (clientX, rect) => {
    const x = clientX - rect.left;
    const percent = (x / rect.width) * 100;
    setSliderPosition(Math.max(0, Math.min(100, percent)));
  };

  const handleMouseMove = (e) => {
    if (e.buttons !== 1) return;
    const rect = e.currentTarget.getBoundingClientRect();
    updateSlider(e.clientX, rect);
  };

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    updateSlider(e.clientX, rect);
  };

  const handleTouchMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    updateSlider(e.touches[0].clientX, rect);
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="relative overflow-hidden rounded-[2rem] border border-yellow-500/20 bg-zinc-950 shadow-2xl shadow-yellow-500/10">
        <div
          className="relative aspect-[16/9] w-full overflow-hidden cursor-ew-resize select-none touch-none"
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          onTouchMove={handleTouchMove}
          onTouchStart={handleTouchMove}
        >
          <img
            src="/after.jpg"
            alt="After detailing"
            className="absolute inset-0 h-full w-full object-cover"
            draggable="false"
          />

          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${sliderPosition}%` }}
          >
            <img
              src="/before.jpg"
              alt="Before detailing"
              className="h-full w-full max-w-none object-cover"
              draggable="false"
            />
          </div>

          <div
            className="absolute inset-y-0 z-20 w-1 bg-yellow-400"
            style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
          >
            <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-black bg-yellow-400 text-black shadow-lg">
              ↔
            </div>
          </div>

          <div className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white">
            Before
          </div>
          <div className="absolute right-4 top-4 rounded-full bg-black/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white">
            After
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [quoteSubmitting, setQuoteSubmitting] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const openQuoteModal = (serviceName = "") => {
    setSelectedService(serviceName);
    setShowQuoteModal(true);
  };

  const handleQuoteSubmit = async (event) => {
    event.preventDefault();
    setQuoteSubmitting(true);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);

      const response = await fetch("https://formspree.io/f/mqegzbpg", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();
      setQuoteSuccess(true);

      setTimeout(() => {
        setShowQuoteModal(false);
        setQuoteSuccess(false);
        setSelectedService("");
      }, 2200);
    } catch (error) {
      alert("Something went wrong sending your quote request. Please try again.");
    } finally {
      setQuoteSubmitting(false);
    }
  };

  const services = [
    {
      title: "Interior Detail",
      packages: [
        {
          name: "Basic",
          price: "From $129",
          bullets: ["Vacuum + wipe down", "Dash & console clean", "Glass cleaned"],
        },
        {
          name: "Premium",
          price: "From $179",
          bullets: ["Deep vacuum + blowout", "Full interior detail", "Stain attention", "Detail dressings"],
        },
      ],
    },
    {
      title: "Exterior Detail",
      packages: [
        {
          name: "Exterior",
          price: "From $129",
          bullets: ["Foam wash", "Wheels + tires", "Tire shine", "Gloss finish"],
          note:
            "Pricing may vary based on vehicle size, condition, and any additional services requested.",
        },
      ],
    },
    {
      title: "Full Detail",
      packages: [
        {
          name: "Basic",
          price: "From $199",
          bullets: ["Interior + exterior", "Basic clean", "Quick reset"],
        },
        {
          name: "Premium",
          price: "From $259",
          bullets: ["Deep full detail", "Crevice cleaning", "Full finish", "Best results"],
        },
      ],
    },
  ];

  const reasons = [
    {
      title: "Professional mobile setup",
      desc: "Built for convenient on-site service at your home or workplace with a smooth, premium customer experience.",
    },
    {
      title: "Clear, honest service",
      desc: "No inflated promises—just quality detailing, dependable communication, and results that match the booking.",
    },
    {
      title: "Respectful property care",
      desc: "We work clean, organized, and efficiently while using your water and power with care.",
    },
    {
      title: "Future-ready brand",
      desc: "Paint correction and ceramic coating are planned for the future, but only when offered at the right standard.",
    },
  ];

  const faqs = [
    {
      q: "Do you bring your own water and power?",
      a: "At this time, service requires access to the customer’s outdoor water connection and electrical outlet. This helps us deliver a proper, professional mobile detail without compromising quality.",
    },
    {
      q: "Do you offer ceramic coating or paint correction?",
      a: "Not yet. Those services are planned for the future, but right now the focus is premium maintenance and full detailing services done to a high standard.",
    },
    {
      q: "How long does a detail take?",
      a: "Most appointments take between 2 and 5 hours depending on the vehicle size, condition, and package selected.",
    },
    {
      q: "Can you detail at my work or condo?",
      a: "Yes, as long as the location allows detailing and there is safe access to both water and power where the vehicle is parked.",
    },
    {
      q: "What vehicles do you service?",
      a: "Sedans, coupes, SUVs, trucks, vans, and most daily-driven vehicles. Larger or heavily soiled vehicles may be quoted separately.",
    },
  ];

  const reasonIcons = [
    (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 16.5V14a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2.5" />
        <circle cx="8.5" cy="8" r="2.5" />
        <path d="M20 8h-4" />
        <path d="M18 6v4" />
      </svg>
    ),
    (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 6 9 17l-5-5" />
      </svg>
    ),
    (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 11.5 12 4l9 7.5" />
        <path d="M5 10.5V20h14v-9.5" />
        <path d="M9 20v-5h6v5" />
      </svg>
    ),
    (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" />
      </svg>
    ),
  ];

  return (
    <>
      <main className="min-h-screen bg-black text-white">
        <section className="relative overflow-hidden border-b border-yellow-500/20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.18),transparent_30%),radial-gradient(circle_at_left,rgba(250,204,21,0.08),transparent_25%)]" />
          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:42px_42px]" />

          <div className="relative mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
            <div className="flex items-center gap-4">
              <img src="/logo.png" alt="RS Detailing Logo" className="h-16 w-auto md:h-20" />
              <div className="hidden sm:block">
                <div className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 md:text-xs">
                  Mobile Auto Detailing
                </div>
              </div>
            </div>

            <nav className="hidden items-center gap-10 text-sm text-zinc-300 md:flex">
              <a href="#services" className="transition hover:text-yellow-400">Services</a>
              <a href="#about" className="transition hover:text-yellow-400">Why Us</a>
              <a href="#faq" className="transition hover:text-yellow-400">FAQ</a>
              <a href="#contact" className="transition hover:text-yellow-400">Contact</a>
            </nav>

            <a href="/book"
                className="rounded-2xl bg-yellow-400 px-6 py-3 text-sm font-bold text-black shadow-lg shadow-yellow-400/20 transition hover:bg-yellow-300 hover:scale-105"
            >
               Book Now
            </a>
          </div>

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-10 md:px-10 md:pb-28 md:pt-20 lg:grid-cols-2">
            <div className="space-y-7">
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-yellow-400 px-4 py-1 text-sm font-semibold text-black">
                  Professional Mobile Detailing
                </span>
                <span className="rounded-full border border-yellow-400/40 px-4 py-1 text-sm font-semibold text-yellow-300">
                  Water + Power Required On Site
                </span>
              </div>

              <h1 className="text-5xl font-black uppercase leading-[0.95] tracking-tight md:text-7xl">
                Precision-level <span className="text-yellow-400">care</span>, delivered.
              </h1>

              <p className="max-w-xl text-lg leading-relaxed text-zinc-300 md:text-xl">
                Premium mobile detailing for owners who want their vehicle cleaned with precision, consistency, and real pride in the work.
              </p>

              <div className="grid max-w-2xl gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-yellow-500/20 bg-zinc-950/85 p-4">
                  <p className="mb-1 text-sm font-bold">🚗 Convenient</p>
                  <p className="text-sm text-zinc-400">We come to you</p>
                </div>
                <div className="rounded-2xl border border-yellow-500/20 bg-zinc-950/85 p-4">
                  <p className="mb-1 text-sm font-bold">💧 Water Access</p>
                  <p className="text-sm text-zinc-400">Required at service location</p>
                </div>
                <div className="rounded-2xl border border-yellow-500/20 bg-zinc-950/85 p-4">
                  <p className="mb-1 text-sm font-bold">⚡ Power Access</p>
                  <p className="text-sm text-zinc-400">Required at service location</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-2 sm:flex-row">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openQuoteModal();
                  }}
                  className="rounded-2xl bg-yellow-400 px-7 py-4 text-center text-base font-bold text-black transition hover:bg-yellow-300"
                >
                  Get a Quote
                </a>
                <a href="#services" className="rounded-2xl border border-zinc-700 px-7 py-4 text-center text-base text-white transition hover:bg-zinc-900">
                  View Services
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-yellow-400/10 blur-3xl" />
              <div className="relative rounded-[2rem] border border-yellow-500/30 bg-zinc-950 p-3 shadow-2xl shadow-yellow-500/10">
                <div className="flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[1.5rem] border border-white/5 bg-[linear-gradient(135deg,#0a0a0a,#1b1b1b)]">
                  <div className="h-[52%] w-full overflow-hidden border-b border-white/5">
                    <img src="/hero-car.jpg" alt="Detailed car" className="h-full w-full object-cover object-center" />
                  </div>

                  <div className="w-full p-8 md:p-10">
                    <div className="mb-5 grid grid-cols-2 gap-4">
                      <div className="rounded-2xl border border-yellow-500/20 bg-black/60 p-4">
                        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-zinc-500">Packages</p>
                        <p className="text-2xl font-black">Interior / Exterior - Basic or Premium</p>
                      </div>
                      <div className="rounded-2xl border border-yellow-500/20 bg-black/60 p-4">
                        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-zinc-500">Service Style</p>
                        <p className="text-2xl font-black">Mobile</p>
                      </div>
                    </div>
                    <div className="rounded-3xl border border-yellow-500/20 bg-black/60 p-6">
                      <p className="mb-3 text-sm uppercase tracking-[0.25em] text-yellow-400">Brand promise</p>
                      <p className="text-2xl font-black uppercase leading-tight md:text-3xl">
                        Clean cars. Sharp presentation. No rushed work.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-yellow-400">Built for serious vehicle owners</p>
              <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-white md:text-5xl">
                Your vehicle is an <span className="text-yellow-400">investment</span>
              </h2>
              <p className="mt-4 text-base text-zinc-400 md:text-lg">
                A premium-looking detailing brand without pretending to offer services that are not live yet.
              </p>
            </div>

            <div className="grid items-stretch gap-8 lg:grid-cols-2">
              <div className="grid gap-5 sm:grid-cols-2">
                {reasons.map((item, index) => (
                  <div key={item.title} className="h-full rounded-3xl border border-zinc-800 bg-zinc-950 p-6 transition-colors hover:border-yellow-500/40">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-yellow-500/30 bg-yellow-400/10 text-yellow-400">
                      {reasonIcons[index]}
                    </div>
                    <h3 className="mb-3 text-xl font-black uppercase">{item.title}</h3>
                    <p className="leading-relaxed text-zinc-400">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col justify-between rounded-[2rem] border border-yellow-500/20 bg-zinc-950 p-8 md:p-10">
                <div>
                  <span className="mb-4 inline-block rounded-full bg-yellow-400 px-4 py-1 text-sm font-semibold text-black">
                    Coming Later
                  </span>
                  <h3 className="text-3xl font-black uppercase leading-tight md:text-4xl">
                    Ceramic coatings and paint correction are planned for the future.
                  </h3>
                  <p className="mt-5 text-lg leading-relaxed text-zinc-400">
                    For now, the focus is on delivering premium detailing services the right way—clean interiors, sharp exteriors, strong maintenance results, and a polished customer experience.
                  </p>
                </div>
                <div className="mt-8 rounded-3xl border border-white/5 bg-black p-6">
                  <p className="mb-3 text-sm uppercase tracking-[0.22em] text-zinc-500">Current service standard</p>
                  <div className="space-y-3">
                    {[
                      "Interior detailing",
                      "Exterior detailing",
                      "Full detailing packages",
                      "Professional mobile service requiring on-site water and power",
                    ].map((text) => (
                      <div key={text} className="flex items-start gap-3">
                        <span className="mt-0.5 text-yellow-400">✓</span>
                        <span className="text-zinc-200">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-yellow-500/10 bg-zinc-950/70 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-yellow-400">See Us In Action</p>
              <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-white md:text-5xl">
                Watch the <span className="text-yellow-400">process</span>
              </h2>
              <p className="mt-4 text-base text-zinc-400 md:text-lg">
                Add a real detailing video here so customers can see the quality, care, and attention that goes into every job.
              </p>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-yellow-500/20 bg-black p-4 md:p-6">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-white/5 bg-zinc-950">
                <video className="aspect-video w-full object-cover" controls poster="/hero-car.jpg">
                  <source src="/detailing-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.22em] text-yellow-400">Real Work. Real Results.</p>
                  <p className="mt-1 text-sm text-zinc-400">
                    Replace this with your own wash, interior, or before-and-after detailing footage.
                  </p>
                </div>
                <p className="text-xs uppercase tracking-[0.22em] text-zinc-500">
                  Video file path: public/detailing-video.mp4
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-yellow-500/10 bg-black py-20 md:py-28">
  <div className="mx-auto max-w-7xl px-6 md:px-10">
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-white md:text-5xl">
        See The <span className="text-yellow-400">Transformation</span>
      </h2>
      <p className="mt-4 text-base text-zinc-400 md:text-lg">
        Drag the line to reveal before & after
      </p>
    </div>

    <BeforeAfterSlider />
  </div>
</section>

        <section id="services" className="border-y border-yellow-500/10 bg-zinc-950/70 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-yellow-400">Master-grade services</p>
              <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-white md:text-5xl">
                Detailing packages <span className="text-yellow-400">that sell trust</span>
              </h2>
              <p className="mt-4 text-base text-zinc-400 md:text-lg">
                Interior and full detail each come in basic and premium options, while exterior is offered as one clean package.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {services.map((service) => (
                <div key={service.title} className="h-full rounded-[2rem] border border-zinc-800 bg-black p-7 transition-all duration-300 hover:-translate-y-1 hover:border-yellow-500/40">
                  <h3 className="mb-6 text-2xl font-black uppercase">{service.title}</h3>

                  <div className="space-y-5">
                    {service.packages.map((pkg) => (
                      <div
                        key={pkg.name}
                        className={`rounded-2xl border border-yellow-500/20 bg-zinc-950 p-5 flex flex-col ${service.packages.length === 1 ? "max-w-xs mx-auto" : ""}`}
                      >
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <p className="text-sm font-bold uppercase text-yellow-400">{pkg.name}</p>
                          <p className="font-bold text-white">{pkg.price}</p>
                        </div>

                        <div className="mb-4 space-y-2">
                          {pkg.bullets.map((bullet) => (
                            <div key={bullet} className="flex items-start gap-2 text-sm">
                              <span className="text-yellow-400">✓</span>
                              <span className="text-zinc-300">{bullet}</span>
                            </div>
                          ))}
                        </div>

                        {pkg.note ? (
                          <div className="mb-4 rounded-xl border border-yellow-500/30 bg-yellow-400/10 p-3">
                            <p className="mb-1 text-xs font-bold uppercase tracking-wide text-yellow-400">Please Note</p>
                            <p className="text-xs leading-relaxed text-zinc-300">{pkg.note}</p>
                          </div>
                        ) : null}

                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            openQuoteModal(`${service.title} - ${pkg.name}`);
                          }}
                          className={`block w-full rounded-xl bg-yellow-400 px-4 py-2 text-center text-sm font-bold text-black transition hover:bg-yellow-300 ${service.packages.length > 1 ? "mt-auto" : "mt-2"}`}
                        >
                          Select
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-yellow-500/10 bg-zinc-950/70 py-20 md:py-28">
  <div className="mx-auto max-w-7xl px-6 md:px-10">

    {/* Heading */}
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-white md:text-5xl">
        Proudly Serving <span className="text-yellow-400">The GTA</span>
      </h2>
      <p className="mt-4 text-base text-zinc-400 md:text-lg">
        Our mobile units will come to you if you are in the following:
      </p>
    </div>

    {/* City Cards */}
    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
      {[
        "Hamilton",
        "Ancaster",
        "Burlington",
        "Oakville",
        "Waterdown",
        "Mount Hope",
        "Caledonia",
        "Brantford"
      ].map((city) => (
        <div
          key={city}
          className="rounded-2xl border border-zinc-800 bg-black p-5 text-center transition hover:border-yellow-500/40 hover:-translate-y-1"
        >
          <p className="text-lg font-bold text-white">{city}</p>
        </div>
      ))}
    </div>

  </div>
</section>

        <section id="faq" className="py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6 md:px-10">
            <div className="mx-auto mb-12 max-w-3xl text-center">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-yellow-400">Questions customers ask</p>
              <h2 className="text-3xl font-black uppercase leading-none tracking-tight text-white md:text-5xl">
                Mobile detailing <span className="text-yellow-400">FAQ</span>
              </h2>
              <p className="mt-4 text-base text-zinc-400 md:text-lg">
                Clear answers help reduce friction before someone books.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((item, index) => (
                <details key={index} className="rounded-2xl border border-zinc-800 bg-zinc-950 px-6 py-5">
                  <summary className="cursor-pointer list-none pr-4 text-left text-lg font-bold">
                    {item.q}
                  </summary>
                  <p className="pt-4 text-base leading-relaxed text-zinc-400">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-yellow-500/10 py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="grid items-center gap-8 rounded-[2rem] border border-yellow-500/20 bg-gradient-to-r from-zinc-950 via-black to-zinc-950 p-8 md:p-12 lg:grid-cols-2">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.25em] text-yellow-400">Ready to book?</p>
                <h3 className="text-3xl font-black uppercase leading-none md:text-5xl">Make your vehicle look sharp again.</h3>
                <p className="mt-5 max-w-xl text-lg text-zinc-400">
                  Join the hundreds of GTA drivers who trust RS for a flawless, detailed service.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-zinc-800 bg-black p-6">
                  <p className="mb-4 text-yellow-400">☎</p>
                  <p className="mb-2 text-sm uppercase tracking-[0.22em] text-zinc-500">Phone</p>
                  <p className="text-xl font-black">(905) 978-2212</p>
                </div>

                <div className="rounded-3xl border border-zinc-800 bg-black p-6">
                  <p className="mb-4 text-yellow-400">⌂</p>
                  <p className="mb-2 text-sm uppercase tracking-[0.22em] text-zinc-500">Service Area</p>
                  <p className="text-xl font-black">Hamilton + Surrounding Areas</p>
                </div>

                <div className="mt-2 flex flex-col gap-4 sm:col-span-2 sm:flex-row">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      openQuoteModal();
                    }}
                    className="flex-1 rounded-2xl bg-yellow-400 px-5 py-4 text-center text-base font-bold text-black transition hover:bg-yellow-300"
                  >
                    Request a Quote
                  </a>
                  <a href="#services" className="flex-1 rounded-2xl border border-zinc-700 px-5 py-4 text-center text-base text-white transition hover:bg-zinc-900">
                    See Packages
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-zinc-900 py-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-zinc-500 md:flex-row md:px-10">
            <p>© 2026 RS Mobile Detailing. All rights reserved.</p>
            <p>@detailedbyrs on Instagram, Tiktok & Facebook.</p>
          </div>
        </footer>
      </main>

      {showQuoteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 py-8">
          <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] border border-yellow-500/20 bg-zinc-950 p-6 shadow-2xl shadow-yellow-500/10 md:p-8">
            <button
              type="button"
              onClick={() => {
                setShowQuoteModal(false);
                setQuoteSuccess(false);
                setSelectedService("");
              }}
              className="absolute right-4 top-4 rounded-full border border-zinc-700 px-3 py-1 text-sm text-zinc-300 transition hover:border-yellow-400 hover:text-yellow-400"
            >
              Close
            </button>

            <div className="mb-8 pr-16">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-yellow-400">Get a Quote</p>
              <h2 className="text-3xl font-black uppercase leading-none text-white md:text-4xl">
                Tell us about your vehicle
              </h2>
              <p className="mt-4 text-zinc-400">
                Fill out the form below and we’ll review your vehicle details and service request.
              </p>
            </div>

            {quoteSuccess && (
              <div className="mb-6 rounded-2xl border border-yellow-500/30 bg-yellow-400/10 px-4 py-3">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-400">Success</p>
                <p className="mt-1 text-sm text-zinc-200">
                  Thanks — your quote request was sent. We’ll be in touch shortly.
                </p>
              </div>
            )}

            <form onSubmit={handleQuoteSubmit} className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-1">
                <label className="mb-2 block text-sm font-semibold text-white">Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-400"
                />
              </div>

              <div className="md:col-span-1">
                <label className="mb-2 block text-sm font-semibold text-white">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-400"
                />
              </div>

              <div className="md:col-span-1">
                <label className="mb-2 block text-sm font-semibold text-white">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="Your phone number"
                  className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-400"
                />
              </div>

              <div className="md:col-span-1">
                <label className="mb-2 block text-sm font-semibold text-white">Car Make</label>
                <input
                  name="make"
                  type="text"
                  placeholder="Example: Honda"
                  className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-400"
                />
              </div>

              <div className="md:col-span-1">
                <label className="mb-2 block text-sm font-semibold text-white">Car Model</label>
                <input
                  name="model"
                  type="text"
                  placeholder="Example: Civic"
                  className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-400"
                />
              </div>

              <div className="md:col-span-1">
                <label className="mb-2 block text-sm font-semibold text-white">Car Year</label>
                <input
                  name="year"
                  type="text"
                  placeholder="Example: 2020"
                  className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-400"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-white">Service Notes</label>
                <textarea
                  name="notes"
                  rows="5"
                  defaultValue={selectedService ? `Interested in: ${selectedService}` : ""}
                  placeholder="What service are you interested in? Any details we should know?"
                  className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-400"
                />
              </div>

              <div className="md:col-span-2 flex flex-col gap-3 pt-2 sm:flex-row">
                <button
                  type="submit"
                  disabled={quoteSubmitting}
                  className="rounded-2xl bg-yellow-400 px-6 py-4 text-base font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {quoteSubmitting ? "Sending..." : "Submit Quote Request"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowQuoteModal(false);
                    setQuoteSuccess(false);
                    setSelectedService("");
                  }}
                  className="rounded-2xl border border-zinc-700 px-6 py-4 text-base text-white transition hover:bg-zinc-900"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
