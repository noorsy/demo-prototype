import React from "react";
import PageHeader from "./PageHeader";

const recommendations = [
  {
    id: 1,
    category: "Conversational Experience",
    suggestion: "Approve Directly",
    title:
      "Enable Digital Agent to Handle 'Confirm Existing Payment Arrangement' Intent",
    targets: "All Digital Agent Users",
    description:
      "Chat log analysis indicates ~15% of chats and ~25% of agent transfers are simple requests to confirm existing PTP/plan details, which the digital agent currently doesn't handle.",
    kpis: [
      { label: "Transfer Rate", direction: "down", color: "red" },
      { label: "Agent Handle Time", direction: "down", color: "red" },
      { label: "User Satisfaction", direction: "up", color: "green" },
      { label: "PTP Kept Rate", direction: "up", color: "green" },
    ],
    date: "May 8, 2025",
    actions: ["Decline", "View Details", "Approve Intent"],
  },
  {
    id: 2,
    category: "Segmentation",
    suggestion: "Approve Directly",
    title:
      "Consolidate '1-15 DPD - First Time Delinquent' and '1-15 DPD - Repeat Delinquent (Cured > 6mo ago)' Segments",
    targets:
      "1-15 DPD - First Time Delinquent, 1-15 DPD - Repeat Delinquent (Cured > 6mo ago)",
    description:
      "Analysis shows these segments exhibit statistically similar performance (Contact Rate, PTP Rate, Cure Rate within 2-3% variance) and respond identically to the current 'Early Gentle Reminder' journey.",
    kpis: [
      { label: "Operational Efficiency", direction: "up", color: "green" },
      { label: "Cure Rate", direction: "neutral", color: "gray" },
      { label: "PTP Rate", direction: "neutral", color: "gray" },
    ],
    date: "May 1, 2025",
    actions: ["Decline", "View Details", "Approve Merge"],
  },
  {
    id: 3,
    category: "Journey Strategy",
    suggestion: "Run A/B Test",
    title:
      "A/B Test: Proactive Payment Plan Offer vs. Standard Reminder for 'Mid Stage (31-60 DPD) - Medium Risk'",
    targets: "Mid Stage (31-60 DPD) - Medium Risk Score",
    description:
      "This segment shows a drop in Cure Rate (~40% Roll Forward) despite reasonable Contact Rates. Hypothesis: Offering payment plans proactively may improve cure rates vs. standard reminders demanding full payment.",
    kpis: [
      { label: "Cure Rate", direction: "up", color: "green" },
      { label: "Roll Forward Rate", direction: "down", color: "red" },
      { label: "PTP Rate", direction: "up", color: "green" },
      { label: "Collections", direction: "down", color: "red" },
      { label: "Liquidation", direction: "up", color: "green" },
    ],
    date: "May 5, 2025",
    actions: ["Decline", "View Details", "Setup A/B Test"],
  },
  {
    id: 4,
    category: "Journey Strategy",
    suggestion: "Approve Directly",
    title:
      "Increase Call Attempt Priority for 'High PTP Kept Rate History' Segment During Peak Hours",
    targets: "Accounts with History of >80% PTP Kept Rate",
    description:
      "Data shows accounts with a strong history of keeping payment promises have a high likelihood of making and keeping new PTPs once contacted. Prioritizing calls to them leverages this reliability.",
    kpis: [
      { label: "RPC Rate", direction: "up", color: "green" },
      { label: "PTP Kept Rate", direction: "up", color: "green" },
      { label: "Collections", direction: "up", color: "green" },
      { label: "Liquidation", direction: "up", color: "green" },
    ],
    date: "May 10, 2025",
    actions: ["Decline", "View Details", "Approve Priority Change"],
  },
];

function Arrow({ direction, color }) {
  if (direction === "up")
    return (
      <span style={{ color: color === "green" ? "#22c55e" : "#000" }}>↑</span>
    );
  if (direction === "down")
    return (
      <span style={{ color: color === "red" ? "#ef4444" : "#000" }}>↓</span>
    );
  return null;
}

function AiAvatar() {
  return (
    <span className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
      <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="16" fill="#fff" fillOpacity="0.2" />
        <path
          d="M10 22c-1.5 0-2.5-1.3-2.5-2.8 0-.9.3-1.6 1-2.1C9 16.2 9 15.7 9 15.2c0-2.3 1.8-4.1 4.1-4.1.9 0 1.6.3 2.1 1 .6-.7 1.3-1 2.1-1 2.3 0 4.1 1.8 4.1 4.1 0 .5-.2 1-.7 1.4.7.5 1 1.2 1 2.1 0 1.5-1 2.8-2.5 2.8"
          stroke="#6366F1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function Recommendations() {
  return (
    <div>
      <div className="w-full mx-auto mb-6 px-6">
        <PageHeader
          title="Recommendations"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Recommendations" },
          ]}
        />
        <div className="flex items-center gap-2 mt-4 mb-4">
          <AiAvatar />
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold tracking-wide">
            AI Suggestion
          </span>
        </div>
        <div className="flex flex-wrap gap-2 items-center mb-4">
          <select className="border rounded px-3 py-2 text-sm">
            <option>All Categories</option>
            <option>Segmentation</option>
            <option>Journey Strategy</option>
            <option>Conversational Experience</option>
          </select>
          <select className="border rounded px-3 py-2 text-sm">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>All Time</option>
          </select>
          <button className="border rounded px-3 py-2 text-sm bg-white">
            Sort
          </button>
          <button className="border rounded px-3 py-2 text-sm bg-white">
            Export
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col gap-8 px-6">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="relative bg-white rounded-2xl shadow-xl border-l-8 border-blue-500 flex flex-col md:flex-row items-start p-8 gap-6 hover:shadow-2xl transition-all"
          >
            <div className="flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded ${
                    rec.category === "Segmentation"
                      ? "bg-blue-100 text-blue-700"
                      : rec.category === "Journey Strategy"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {rec.category}
                </span>
                <span className="text-xs text-zinc-400">
                  Suggestion: {rec.suggestion}
                </span>
              </div>
              <div className="text-2xl font-bold text-zinc-900 mb-2">
                {rec.title}
              </div>
              <div className="text-xs text-zinc-500 mb-2">
                <span className="font-semibold text-zinc-700">Targets:</span>{" "}
                {rec.targets}
              </div>
              <div className="text-base text-zinc-700 mb-4 leading-relaxed">
                {rec.description}
              </div>
              <div className="flex flex-wrap gap-2 items-center mb-4">
                <span className="text-xs text-zinc-500 font-semibold">
                  Expected Influence on KPIs:
                </span>
                {rec.kpis.map((kpi, idx) => (
                  <span
                    key={idx}
                    className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 ${
                      kpi.color === "green"
                        ? "bg-green-50 text-green-700"
                        : kpi.color === "red"
                        ? "bg-red-50 text-red-700"
                        : "bg-zinc-100 text-zinc-700"
                    }`}
                  >
                    <Arrow direction={kpi.direction} color={kpi.color} />{" "}
                    {kpi.label}
                  </span>
                ))}
              </div>
              <div className="text-xs text-zinc-400 mb-4">
                Generated on {rec.date}
              </div>
              <div className="flex gap-3 mt-2">
                {rec.actions.map((action, idx) => (
                  <button
                    key={idx}
                    className={
                      action.toLowerCase().includes("approve")
                        ? "bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold text-base shadow hover:bg-blue-700"
                        : action.toLowerCase().includes("view")
                        ? "bg-white border border-zinc-200 text-zinc-900 px-6 py-2 rounded-lg font-semibold text-base hover:bg-zinc-50"
                        : "bg-white text-red-600 px-6 py-2 rounded-lg font-semibold text-base hover:bg-red-50 border border-red-100"
                    }
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
            <div className="hidden md:block absolute right-8 top-8">
              <AiAvatar />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
