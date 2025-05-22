import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "./PageHeader";
import {
  PlusIcon,
  ChatBubbleLeftEllipsisIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  PhoneArrowUpRightIcon,
  GlobeAltIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/solid";

const agents = [
  {
    name: "SupportBot",
    desc: "Handles customer support queries 24/7.",
    channels: ["Chat", "Email", "SMS"],
  },
  {
    name: "SalesAI",
    desc: "Assists with sales inquiries and lead generation.",
    channels: ["Chat", "WhatsApp"],
  },
  {
    name: "SurveyGenie",
    desc: "Conducts automated customer surveys.",
    channels: ["Email", "Web"],
  },
  {
    name: "ReminderBot",
    desc: "Sends payment and appointment reminders.",
    channels: ["SMS", "Email"],
  },
  {
    name: "OnboardingAI",
    desc: "Guides new users through onboarding steps.",
    channels: ["Chat", "Web"],
  },
  {
    name: "FeedbackBot",
    desc: "Collects user feedback after interactions.",
    channels: ["Email", "Chat"],
  },
];

const channelColors = {
  Chat: "bg-blue-100 text-blue-700",
  Email: "bg-green-100 text-green-700",
  SMS: "bg-yellow-100 text-yellow-800",
  WhatsApp: "bg-emerald-100 text-emerald-700",
  Web: "bg-zinc-100 text-zinc-700",
  Voice: "bg-purple-100 text-purple-700",
};

const filterOptions = ["All", "Chat", "Email", "SMS", "WhatsApp", "Web"];
const microSegments = ["Auto Loan", "Mortgage", "Credit Card"];
const channelOptions = ["Voice", "SMS", "Email"];

const attributes = [
  { name: "account_id", desc: "Unique account identifier.", mandatory: true },
  {
    name: "customer_name",
    desc: "Full name of the customer.",
    mandatory: true,
  },
  {
    name: "primary_phone_number",
    desc: "Primary contact number (for Voice/SMS).",
    mandatory: true,
  },
  {
    name: "email_address",
    desc: "Primary email contact (for Email).",
    mandatory: true,
  },
  { name: "dpd", desc: "Days Past Due.", mandatory: true },
  { name: "amount_due", desc: "Current outstanding balance.", mandatory: true },
  {
    name: "product_type",
    desc: "Matches products defined earlier.",
    mandatory: true,
  },
  {
    name: "timezone",
    desc: "Customers timezone (e.g., America/New_York).",
    mandatory: true,
  },
];

const channelIcons = {
  Chat: <ChatBubbleLeftEllipsisIcon className="w-4 h-4 text-blue-500 mr-1" />,
  Email: <EnvelopeIcon className="w-4 h-4 text-green-500 mr-1" />,
  SMS: <DevicePhoneMobileIcon className="w-4 h-4 text-yellow-500 mr-1" />,
  WhatsApp: <PhoneArrowUpRightIcon className="w-4 h-4 text-emerald-500 mr-1" />,
  Web: <GlobeAltIcon className="w-4 h-4 text-zinc-500 mr-1" />,
  Voice: <MicrophoneIcon className="w-4 h-4 text-purple-500 mr-1" />,
};

const statusOptions = ["Active", "Archived", "All"];

export default function AIAgents() {
  const [status, setStatus] = useState("Active");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  // For demo, all agents are active
  const filteredAgents =
    status === "All" ? agents : status === "Active" ? agents : [];

  return (
    <div className="font-inter text-[14px]">
      <PageHeader title="AI Agents" />
      <div className="p-2">
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          {/* Custom Dropdown */}
          <div className="relative">
            <button
              type="button"
              className="px-4 py-2 rounded-md border border-zinc-200 bg-white text-zinc-700 font-medium font-inter focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2 min-w-[120px]"
              onClick={() => setDropdownOpen((v) => !v)}
            >
              {status}
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-full bg-white border border-zinc-200 rounded-md shadow-lg z-20">
                {statusOptions.map((option) => (
                  <button
                    key={option}
                    className={`w-full text-left px-4 py-2 hover:bg-zinc-100 font-inter text-[14px] ${
                      option === status ? "bg-zinc-100 font-semibold" : ""
                    }`}
                    onClick={() => {
                      setStatus(option);
                      setDropdownOpen(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="px-5 py-2 rounded-lg bg-zinc-900 text-white font-inter text-sm font-semibold hover:bg-black transition flex items-center gap-2"
            onClick={() => navigate("/ai-agents/create")}
          >
            <PlusIcon className="w-5 h-5 -ml-1" />
            Create Assistant
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <div
              key={agent.name}
              className="bg-white bg-zinc-100 rounded-xl p-6 flex flex-col gap-3 font-inter text-[14px] cursor-pointer transition-transform transition-shadow hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] group"
              tabIndex={0}
              onClick={() => navigate(`/ai-agents/${agent.name}`)}
            >
              <div className="text-lg font-bold text-zinc-900 mb-1 group-hover:underline">
                {agent.name}
              </div>
              <div className="text-zinc-600 text-sm mb-2 line-clamp-2">
                {agent.desc}
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                {/* Tag: 1st Party - Auto Loan (for demo, always this) */}
                <span className="inline-block bg-zinc-900 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  1st Party - Auto Loan
                </span>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto">
                {agent.channels.map((ch) => (
                  <span
                    key={ch}
                    className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 bg-zinc-100 text-zinc-900 border border-zinc-200`}
                  >
                    {channelIcons[ch] || null}
                    {ch}
                  </span>
                ))}
              </div>
              {/* Divider and footer */}
              <div className="mt-4">
                <div className="border-t border-zinc-200 my-2" />
                <div className="text-xs text-zinc-400 mt-5">
                  Modified by Noor · a few days ago
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
