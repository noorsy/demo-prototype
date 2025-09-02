import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserGroupIcon,
  CurrencyDollarIcon,
  TagIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";

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
  const [status, setStatus] = useState("All");
  const [channel, setChannel] = useState("All Channel");

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header matching the AI Agents design */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Campaigns</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <button
              className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center space-x-2"
              onClick={() => navigate("/campaigns/create")}
            >
              <PlusIcon className="h-4 w-4" />
              <span>New Campaign</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white px-6 py-4 border-gray-100">
        <div className="flex items-center space-x-4">
          {/* Status Dropdown */}
          <div className="relative">
            <button
              onClick={() =>
                setStatus(
                  status === "All"
                    ? "Active"
                    : status === "Active"
                    ? "Paused"
                    : status === "Paused"
                    ? "Draft"
                    : "All"
                )
              }
              className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center space-x-2 min-w-[120px] justify-between"
            >
              <span>{status}</span>
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Channel Dropdown */}
          <div className="relative">
            <button
              onClick={() =>
                setChannel(
                  channel === "All Channel"
                    ? "Voice"
                    : channel === "Voice"
                    ? "SMS"
                    : channel === "SMS"
                    ? "Email"
                    : "All Channel"
                )
              }
              className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center space-x-2 min-w-[140px] justify-between"
            >
              <span>{channel}</span>
              <ChevronDownIcon className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <Card className="overflow-x-auto">
          <CardContent className="p-0">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-muted/50 text-muted-foreground">
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
                  <th className="px-4 py-3 text-left font-semibold">
                    End Time
                  </th>
                  <th className="px-4 py-3 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c, idx) => (
                  <tr
                    key={c.id}
                    className={
                      idx % 2 === 0
                        ? "bg-background hover:bg-muted/50 transition"
                        : "bg-muted/30 hover:bg-muted transition"
                    }
                  >
                    <td className="px-6 py-4 font-bold text-foreground whitespace-nowrap">
                      {c.name}
                    </td>
                    <td className="px-4 py-4">
                      <Badge
                        variant={
                          c.status === "Active"
                            ? "default"
                            : c.status === "Paused"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {c.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground font-bold text-sm">
                        {getInitial(c.createdBy)}
                      </span>
                      <span className="text-foreground font-medium">
                        {c.createdBy}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-muted-foreground whitespace-nowrap">
                      {c.start}
                    </td>
                    <td className="px-4 py-4 text-muted-foreground whitespace-nowrap">
                      {c.end}
                    </td>
                    <td className="px-4 py-4 text-right whitespace-nowrap flex gap-2 justify-end">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setShowAccountsModal(true)}
                      >
                        View Accounts
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
      {/* Modal for accounts */}
      {showAccountsModal && (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card className="w-full h-full max-w-7xl max-h-[95vh] overflow-auto relative flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Accounts</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAccountsModal(false)}
                  className="h-8 w-8 p-0"
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              <table className="min-w-full text-sm border border-border rounded-lg">
                <thead>
                  <tr className="bg-muted/50 text-muted-foreground">
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
                    <tr key={acc.account_id} className="even:bg-muted/30">
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setInspectAccount(acc);
                            setShowInspectModal(true);
                          }}
                          className="flex items-center gap-1"
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
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </div>
      )}
      {/* Inspect modal */}
      {showInspectModal && inspectAccount && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card className="w-full h-full max-w-3xl max-h-[95vh] overflow-auto relative flex flex-col">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>
                  Account Timeline: {inspectAccount.account_id} -{" "}
                  {inspectAccount.customer_name}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowInspectModal(false)}
                  className="h-8 w-8 p-0"
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
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
                        className={`w-1 h-full bg-border absolute left-1/2 top-4 z-0`}
                      ></span>
                    )}
                    {/* Label */}
                    <span className="mt-2 text-xs font-semibold text-muted-foreground text-center">
                      {event.label}
                    </span>
                    {/* Channel icon */}
                    <span className="mt-1">
                      {event.channel === "Voice" && (
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-700"
                        >
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
                        </Badge>
                      )}
                      {event.channel === "SMS" && (
                        <Badge
                          variant="secondary"
                          className="bg-yellow-100 text-yellow-700"
                        >
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
                        </Badge>
                      )}
                    </span>
                  </div>
                  {/* Right: Card */}
                  <Card
                    className={`flex-1 ml-2 mb-8 transition-all ${
                      event.color === "green"
                        ? "border-green-200 bg-green-50"
                        : "border-yellow-200 bg-yellow-50"
                    }`}
                    style={{ minWidth: 0 }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-muted-foreground font-semibold">
                          {event.date}
                        </span>
                        {event.aiRecommended && (
                          <Badge
                            variant="secondary"
                            className="ml-auto bg-yellow-100 text-yellow-700"
                          >
                            AI Recommended
                          </Badge>
                        )}
                      </div>
                      {renderTimelineCard(event)}
                    </CardContent>
                  </Card>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
