"use client";

import { useMemo, useState } from "react";

const vehicleSizes = ["Coupe", "Sedan", "SUV", "Truck", "Van"];

const services = {
  "Interior Detail": ["Basic", "Premium"],
  "Exterior Detail": ["Exterior"],
  "Full Detail": ["Basic", "Premium"],
};

const addOns = [
  "Pet hair removal",
  "Seat shampoo",
  "Carpet shampoo",
  "Engine bay wipe-down",
  "Odor treatment",
  "Leather conditioning",
  "Headlight restoration",
  "Salt removal",
];

function FieldLabel({ children }) {
  return <label className="mb-2 block text-sm font-semibold text-white">{children}</label>;
}

function Input(props) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-400"
    />
  );
}

function Select(props) {
  return (
    <select
      {...props}
      className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition focus:border-yellow-400"
    />
  );
}

export default function BookingPage() {
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [service, setService] = useState("Interior Detail");
  const [packageTier, setPackageTier] = useState("Basic");
  const [selectedAddOns, setSelectedAddOns] = useState([]);

  const serviceOptions = useMemo(() => services[service] || [], [service]);

  const toggleAddOn = (addOn) => {
    setSelectedAddOns((current) =>
      current.includes(addOn)
        ? current.filter((item) => item !== addOn)
        : [...current, addOn]
    );
  };

  const handleServiceChange = (value) => {
    setService(value);
    setPackageTier(services[value][0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      formData.set("booking_type", "Full Booking Request");
      formData.set("selected_addons", selectedAddOns.join(", ") || "None");

      const response = await fetch("https://formspree.io/f/mqegzbpg", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Booking request failed");
      }

      form.reset();
      setSelectedAddOns([]);
      setService("Interior Detail");
      setPackageTier("Basic");
      setBookingSuccess(true);

      setTimeout(() => {
        setBookingSuccess(false);
      }, 3500);
    } catch (error) {
      alert("Something went wrong sending your booking request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-yellow-500/20 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.12),transparent_28%),radial-gradient(circle_at_left,rgba(250,204,21,0.08),transparent_24%)]">
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-10 md:py-24">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-yellow-400">Book Your Detail</p>
            <h1 className="text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
              Reserve your <span className="text-yellow-400">mobile detail</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">
              Tell us where the vehicle is located, what you drive, the service you want, and any add-ons you need. This gives us everything we need to review your booking properly.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:px-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="rounded-[2rem] border border-yellow-500/20 bg-zinc-950 p-6 md:p-8">
            {bookingSuccess && (
              <div className="mb-6 rounded-2xl border border-yellow-500/30 bg-yellow-400/10 px-4 py-3">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-yellow-400">Booking Request Sent</p>
                <p className="mt-1 text-sm text-zinc-200">
                  Thanks — your booking request was sent successfully. We’ll contact you shortly to confirm details.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.22em] text-yellow-400">1. Location</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <FieldLabel>Street Address</FieldLabel>
                    <Input name="address" type="text" placeholder="123 Main Street" required />
                  </div>
                  <div>
                    <FieldLabel>City</FieldLabel>
                    <Input name="city" type="text" placeholder="Hamilton" required />
                  </div>
                  <div>
                    <FieldLabel>Postal Code</FieldLabel>
                    <Input name="postal_code" type="text" placeholder="L8L 1A1" required />
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.22em] text-yellow-400">2. Vehicle Details</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <FieldLabel>Vehicle Size</FieldLabel>
                    <Select name="vehicle_size" required defaultValue="">
                      <option value="" disabled>Select vehicle size</option>
                      {vehicleSizes.map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>Vehicle Year</FieldLabel>
                    <Input name="vehicle_year" type="text" inputMode="numeric" placeholder="2020" required />
                  </div>
                  <div>
                    <FieldLabel>Make</FieldLabel>
                    <Input name="vehicle_make" type="text" placeholder="Honda" required />
                  </div>
                  <div>
                    <FieldLabel>Model</FieldLabel>
                    <Input name="vehicle_model" type="text" placeholder="Civic" required />
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.22em] text-yellow-400">3. Service Selection</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <FieldLabel>Main Service</FieldLabel>
                    <Select
                      name="service"
                      value={service}
                      onChange={(e) => handleServiceChange(e.target.value)}
                    >
                      {Object.keys(services).map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <FieldLabel>Package</FieldLabel>
                    <Select
                      name="package_tier"
                      value={packageTier}
                      onChange={(e) => setPackageTier(e.target.value)}
                    >
                      {serviceOptions.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.22em] text-yellow-400">4. Add-Ons</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {addOns.map((addOn) => {
                    const checked = selectedAddOns.includes(addOn);
                    return (
                      <label
                        key={addOn}
                        className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 transition ${checked ? "border-yellow-400 bg-yellow-400/10" : "border-zinc-800 bg-black hover:border-yellow-500/30"}`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleAddOn(addOn)}
                          className="h-4 w-4 accent-yellow-400"
                        />
                        <span className="text-sm text-zinc-200">{addOn}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="mb-4 text-xs uppercase tracking-[0.22em] text-yellow-400">5. Final Notes</p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <FieldLabel>Preferred Date</FieldLabel>
                    <Input name="preferred_date" type="text" placeholder="Example: Friday or June 12" />
                  </div>
                  <div>
                    <FieldLabel>Preferred Time</FieldLabel>
                    <Input name="preferred_time" type="text" placeholder="Morning / Afternoon" />
                  </div>
                  <div className="md:col-span-2">
                    <FieldLabel>Booking Notes</FieldLabel>
                    <textarea
                      name="booking_notes"
                      rows="6"
                      placeholder="Tell us anything important about the vehicle, condition, parking, or services you want added."
                      className="w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-yellow-400"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-2xl bg-yellow-400 px-6 py-4 text-base font-bold text-black transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Submit Booking Request"}
                </button>
                <a
                  href="/"
                  className="rounded-2xl border border-zinc-700 px-6 py-4 text-center text-base text-white transition hover:bg-zinc-900"
                >
                  Back to Home
                </a>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-yellow-500/20 bg-zinc-950 p-6 md:p-8">
              <p className="mb-3 text-xs uppercase tracking-[0.22em] text-yellow-400">Booking Summary</p>
              <h2 className="text-2xl font-black uppercase leading-tight text-white md:text-3xl">
                Ready to reserve your detail?
              </h2>
              <p className="mt-4 text-zinc-400">
                The more complete your booking request is, the easier it is for us to confirm pricing, travel, and service recommendations.
              </p>

              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-white/5 bg-black p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Selected Service</p>
                  <p className="mt-1 text-lg font-bold text-white">{service}</p>
                  <p className="text-sm text-zinc-400">Package: {packageTier}</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-black p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">Add-Ons</p>
                  <p className="mt-1 text-sm text-zinc-300">
                    {selectedAddOns.length ? selectedAddOns.join(", ") : "No add-ons selected yet."}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-yellow-500/20 bg-gradient-to-br from-yellow-400 to-yellow-300 p-6 text-black md:p-8">
              <p className="mb-3 text-xs uppercase tracking-[0.22em]">Before You Submit</p>
              <div className="space-y-3">
                {[
                  "Make sure your address and postal code are correct.",
                  "Choose the right vehicle size for accurate quoting.",
                  "Include any heavy soiling, pet hair, or special requests in the notes.",
                  "Add-ons help us understand the full scope before confirming your booking.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-0.5">★</span>
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
