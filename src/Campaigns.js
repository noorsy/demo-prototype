import React from "react";
import PageHeader from "./PageHeader";
import { useNavigate } from "react-router-dom";

const campaigns = [
  {
    id: 1,
    name: "Q2 Auto Loan Recovery",
    status: "Active",
    createdBy: "Noor",
    start: "2024-04-01 09:00",
    end: "2024-06-30 18:00",
    description: "Automated campaign for Q2 auto loan collections.",
  },
  {
    id: 2,
    name: "Credit Card Winback",
    status: "Paused",
    createdBy: "Alex",
    start: "2024-03-15 10:00",
    end: "2024-05-31 17:00",
    description: "Targeting lapsed credit card customers.",
  },
  {
    id: 3,
    name: "Mortgage Early DPD",
    status: "Draft",
    createdBy: "Samira",
    start: "2024-02-20 08:30",
    end: "2024-04-15 16:00",
    description: "Early intervention for mortgage delinquencies.",
  },
];

const primaryBtn =
  "px-5 py-2 rounded-lg bg-zinc-900 text-white font-inter text-sm font-semibold hover:bg-black transition";

function getInitial(name) {
  if (!name) return "?";
  return name[0].toUpperCase();
}

export default function Campaigns() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen font-inter text-sm">
      <PageHeader
        title="Campaigns"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Campaigns" }]}
      />
      <div className=" mx-auto p-2">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-zinc-900">All Campaigns</h2>
          <button
            className={primaryBtn}
            onClick={() => navigate("/campaigns/create")}
          >
            + Create Campaign
          </button>
        </div>
        <div className="overflow-x-auto bg-white rounded-xl border border-zinc-200 shadow-sm">
          <table className="min-w-full font-inter text-sm">
            <thead>
              <tr className="bg-zinc-50 text-zinc-700">
                <th className="px-6 py-3 text-left font-semibold">
                  Campaign Name
                </th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">
                  Created By
                </th>
                <th className="px-4 py-3 text-left font-semibold">
                  Start Time
                </th>
                <th className="px-4 py-3 text-left font-semibold">End Time</th>
                <th className="px-4 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, idx) => (
                <tr
                  key={c.id}
                  className={
                    idx % 2 === 0
                      ? "bg-white hover:bg-zinc-50 transition"
                      : "bg-zinc-50 hover:bg-zinc-100 transition"
                  }
                >
                  <td className="px-6 py-4 font-bold text-zinc-900 whitespace-nowrap">
                    {c.name}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold ${
                        c.status === "Active"
                          ? "bg-zinc-900 text-white"
                          : c.status === "Paused"
                          ? "bg-zinc-200 text-zinc-900"
                          : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-zinc-200 text-zinc-700 font-bold text-sm">
                      {getInitial(c.createdBy)}
                    </span>
                    <span className="text-zinc-900 font-medium">
                      {c.createdBy}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-zinc-700 whitespace-nowrap">
                    {c.start}
                  </td>
                  <td className="px-4 py-4 text-zinc-700 whitespace-nowrap">
                    {c.end}
                  </td>
                  <td className="px-4 py-4 text-right whitespace-nowrap">
                    <button className={primaryBtn}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
