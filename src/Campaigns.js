import React, { useState } from "react";
import PageHeader from "./PageHeader";
import { useNavigate } from "react-router-dom";
import {
  UserGroupIcon,
  CurrencyDollarIcon,
  TagIcon,
} from "@heroicons/react/24/solid";

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

// Mock accounts and timeline events (copied from CreateCampaign.js)
const mockAccounts = Array.from({ length: 60 }, (_, i) => ({
  account_id: `A${(1000 + i).toString()}`,
  customer_name:
    [
      "John Doe",
      "Jane Smith",
      "Sam Patel",
      "Alex Kim",
      "Priya Singh",
      "Maria Garcia",
      "Chen Wei",
      "Ahmed Ali",
      "Emily Clark",
      "David Lee",
    ][i % 10] + ` ${i}`,
  amount_due: Math.floor(Math.random() * 5000) + 500,
  dpd: Math.floor(Math.random() * 120) + 1,
  due_date: `2025-03-${(10 + (i % 20)).toString().padStart(2, "0")}`,
  product_name: ["Auto Loan", "Mortgage", "Credit Card"][i % 3],
  pay_off_amount: Math.floor(Math.random() * 7000) + 1000,
  missed_installments: Math.floor(Math.random() * 6),
  risk_score: ["Low", "Medium", "High"][i % 3],
}));

const timelineEvents = [
  {
    type: "scheduler",
    date: "10th March 2025, 08:30AM",
    channel: "Scheduler",
    label: "Scheduler",
    color: "green",
    summary: "Scheduled at: 10:30PM at 12 March 2025",
    decider: "AI Collection Intelligence",
    planned: false,
  },
  {
    type: "voice",
    date: "12th March 2025, 10:30AM",
    channel: "Voice",
    label: "Voice Call",
    color: "green",
    summary:
      "Consumer answered, sounded weak and unwell, stated they had the flu and asked to be called back next week noon. AI expressed get well wishes.",
    intent: "sick",
    sentiment: "Negative (-0.7)",
    planned: false,
  },
  {
    type: "scheduler",
    date: "10th March 2025, 10:30AM",
    channel: "Scheduler",
    label: "Scheduler",
    color: "green",
    summary: "Scheduled at: 01:30PM at 12 March 2025",
    decider: "User Preference",
    planned: false,
  },
  {
    type: "scheduler",
    date: "19th March 2025, 01:30PM",
    channel: "Voice",
    label: "Scheduler",
    color: "green",
    summary:
      "AI called back as scheduled. Consumer confirmed they are feeling much better. Discussed the outstanding amount. Consumer agreed to make the payment now and requested the payment link be sent via SMS.",
    intent: "Promise to Pay",
    sentiment: "Positive",
    planned: false,
  },
  {
    type: "sms",
    date: "19th March 2025, 10:40AM",
    channel: "SMS",
    label: "SMS / Text",
    color: "yellow",
    planned: true,
    plannedContent:
      "Hi Sarah, thanks for your chat and for your commitment to pay. Glad you're feeling up to it! Payment link: [Payment Link] You'll receive a confirmation once the payment is processed.",
    tonality: "Warmly Appreciative",
    focus: "Payment_Link_Delivery",
    aiRecommended: true,
  },
];

function getInitial(name) {
  if (!name) return "?";
  return name[0].toUpperCase();
}

function renderTimelineCard(event) {
  if (event.type === "voice") {
    return (
      <>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-green-700 text-base">
            Summary
          </span>
          <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold">
            {event.channel}
          </span>
        </div>
        <div className="text-sm text-zinc-700 mb-2">{event.summary}</div>
        <div className="flex gap-4 mt-2">
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3"
              />
            </svg>
            Intent: <span className="font-semibold ml-1">{event.intent}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2a4 4 0 014-4h4"
              />
            </svg>
            Sentiment:{" "}
            <span className="font-semibold ml-1">{event.sentiment}</span>
          </div>
        </div>
      </>
    );
  } else if (event.type === "scheduler") {
    return (
      <>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-blue-700 text-base">
            Scheduled Communication
          </span>
          <span className="ml-2 bg-blue-200 text-blue-800 px-2 py-0.5 rounded-full text-xs font-semibold">
            {event.channel}
          </span>
        </div>
        <div className="text-sm text-zinc-700 mb-2">{event.summary}</div>
        <div className="flex gap-4 mt-2">
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3"
              />
            </svg>
            Decider: <span className="font-semibold ml-1">{event.decider}</span>
          </div>
        </div>
      </>
    );
  } else if (event.type === "sms" && event.planned) {
    return (
      <>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-yellow-700 text-base">
            Planned Communication
          </span>
          <span className="ml-2 bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-semibold">
            {event.channel}
          </span>
        </div>
        <div className="text-sm text-zinc-700 mb-2">
          <span className="font-semibold">Content:</span> {event.plannedContent}
        </div>
        <div className="flex gap-4 mt-2">
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3"
              />
            </svg>
            Tonality:{" "}
            <span className="font-semibold ml-1">{event.tonality}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 17v-2a4 4 0 014-4h4"
              />
            </svg>
            Focus: <span className="font-semibold ml-1">{event.focus}</span>
          </div>
        </div>
      </>
    );
  }
  return null;
}

export default function Campaigns() {
  const navigate = useNavigate();
  const [showAccountsModal, setShowAccountsModal] = useState(false);
  const [showInspectModal, setShowInspectModal] = useState(false);
  const [inspectAccount, setInspectAccount] = useState(null);

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
                  <td className="px-4 py-4 text-right whitespace-nowrap flex gap-2 justify-end">
                    <button className={primaryBtn}>View</button>
                    <button
                      className="px-5 py-2 rounded-lg bg-blue-100 text-blue-900 font-inter text-sm font-semibold hover:bg-blue-200 border border-blue-200 transition"
                      onClick={() => setShowAccountsModal(true)}
                    >
                      View Accounts
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal for accounts */}
      {showAccountsModal && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full h-full max-w-7xl max-h-[95vh] overflow-auto relative flex flex-col">
            <button
              className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-900 text-3xl"
              onClick={() => setShowAccountsModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="text-2xl font-bold mb-6">Accounts</div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-zinc-100 rounded-xl">
                <thead>
                  <tr className="bg-zinc-50 text-zinc-700">
                    <th className="px-4 py-2">Account ID</th>
                    <th className="px-4 py-2">Customer Name</th>
                    <th className="px-4 py-2">Amount Due</th>
                    <th className="px-4 py-2">DPD</th>
                    <th className="px-4 py-2">Due Date</th>
                    <th className="px-4 py-2">Product Name</th>
                    <th className="px-4 py-2">Pay Off Amount</th>
                    <th className="px-4 py-2">Missed Installments</th>
                    <th className="px-4 py-2">Risk Score</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mockAccounts.map((acc) => (
                    <tr key={acc.account_id} className="even:bg-zinc-50">
                      <td className="px-4 py-2">{acc.account_id}</td>
                      <td className="px-4 py-2">{acc.customer_name}</td>
                      <td className="px-4 py-2">
                        ${acc.amount_due.toLocaleString()}
                      </td>
                      <td className="px-4 py-2">{acc.dpd}</td>
                      <td className="px-4 py-2">{acc.due_date}</td>
                      <td className="px-4 py-2">{acc.product_name}</td>
                      <td className="px-4 py-2">
                        ${acc.pay_off_amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-2">{acc.missed_installments}</td>
                      <td className="px-4 py-2">{acc.risk_score}</td>
                      <td className="px-4 py-2">
                        <button
                          className="flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 border border-blue-200 text-xs font-semibold"
                          onClick={() => {
                            setInspectAccount(acc);
                            setShowInspectModal(true);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          Inspect
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
      {/* Inspect modal */}
      {showInspectModal && inspectAccount && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full h-full max-w-3xl max-h-[95vh] overflow-auto relative flex flex-col">
            <button
              className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-900 text-3xl"
              onClick={() => setShowInspectModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <div className="text-2xl font-bold mb-6">
              Account Timeline: {inspectAccount.account_id} -{" "}
              {inspectAccount.customer_name}
            </div>
            {timelineEvents.map((event, idx) => (
              <div key={idx} className="flex items-stretch relative">
                {/* Left: Dot, line, and label */}
                <div className="flex flex-col items-center w-28 min-w-[7rem] pr-2 relative">
                  {/* Dot */}
                  <span
                    className={`w-4 h-4 rounded-full border-4 ${
                      event.color === "green"
                        ? "bg-green-500 border-green-200"
                        : "bg-yellow-400 border-yellow-100"
                    } z-10`}
                  ></span>
                  {/* Vertical line connecting dots */}
                  {idx < timelineEvents.length - 1 && (
                    <span
                      className={`w-1 h-full bg-zinc-200 absolute left-1/2 top-4 z-0`}
                    ></span>
                  )}
                  {/* Label */}
                  <span className="mt-2 text-xs font-semibold text-zinc-500 text-center">
                    {event.label}
                  </span>
                  {/* Channel icon */}
                  <span className="mt-1">
                    {event.channel === "Voice" && (
                      <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                        <svg
                          className="inline w-4 h-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.05 5.05a7 7 0 01.9 9.19l-1.41 1.41a2 2 0 01-2.83 0l-2.12-2.12a2 2 0 010-2.83l1.41-1.41a7 7 0 019.19-.9z"
                          />
                        </svg>
                        Voice
                      </span>
                    )}
                    {event.channel === "SMS" && (
                      <span className="inline-block bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                        <svg
                          className="inline w-4 h-4 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"
                          />
                        </svg>
                        SMS
                      </span>
                    )}
                  </span>
                </div>
                {/* Right: Card */}
                <div
                  className={`flex-1 ml-2 mb-8 rounded-2xl shadow-lg border border-zinc-100 bg-white p-6 transition-all ${
                    event.color === "green"
                      ? "border-green-200 bg-green-50"
                      : "border-yellow-200 bg-yellow-50"
                  }`}
                  style={{ minWidth: 0 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-zinc-400 font-semibold">
                      {event.date}
                    </span>
                    {event.aiRecommended && (
                      <span className="ml-auto bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-semibold">
                        AI Recommended
                      </span>
                    )}
                  </div>
                  {renderTimelineCard(event)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
