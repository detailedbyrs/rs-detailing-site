"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("/api/book")
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch(() => setBookings([]));
  }, []);

  return (
    <main className="min-h-screen bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black uppercase mb-8">
          Admin <span className="text-yellow-400">Dashboard</span>
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border border-zinc-800">
            <thead className="bg-zinc-900">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Vehicle</th>
                <th className="p-3 text-left">Service</th>
                <th className="p-3 text-left">Add-ons</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Payment</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b, i) => (
                <tr key={i} className="border-t border-zinc-800">
                  <td className="p-3">{b.name || "-"}</td>
                  <td className="p-3">
                    {b.vehicle_year} {b.vehicle_make} {b.vehicle_model}
                  </td>
                  <td className="p-3">{b.service} ({b.package_tier})</td>
                  <td className="p-3">{b.selected_addons}</td>
                  <td className="p-3 text-yellow-400">{b.status}</td>
                  <td className="p-3 text-green-400">{b.payment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
