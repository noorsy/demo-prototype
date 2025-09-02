import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon,
  ComputerDesktopIcon,
  CheckCircleIcon,
  ClockIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import PageHeaderWithTabs from "./components/PageHeaderWithTabs";

const agents = [
  {
    id: "support-bot-001",
    name: "SupportBot",
    desc: "Handles customer support queries 24/7.",
    channels: ["Chat", "Email", "SMS"],
    metrics: { conversations: 1247, satisfaction: 94, responseTime: "2.3s" },
  },
  {
    id: "sales-ai-002",
    name: "SalesAI",
    desc: "Assists with sales inquiries and lead generation.",
    channels: ["Chat", "WhatsApp"],
    metrics: { conversations: 892, satisfaction: 87, responseTime: "1.8s" },
  },
  {
    id: "survey-genie-003",
    name: "SurveyGenie",
    desc: "Conducts automated customer surveys.",
    channels: ["Email", "Web"],
    metrics: { conversations: 567, satisfaction: 91, responseTime: "0.5s" },
  },
  {
    id: "reminder-bot-004",
    name: "ReminderBot",
    desc: "Sends payment and appointment reminders.",
    channels: ["SMS", "Email"],
    metrics: { conversations: 2341, satisfaction: 96, responseTime: "1.2s" },
  },
  {
    id: "onboarding-ai-005",
    name: "OnboardingAI",
    desc: "Guides new users through onboarding steps.",
    channels: ["Chat", "Web"],
    metrics: { conversations: 445, satisfaction: 89, responseTime: "3.1s" },
  },
  {
    id: "feedback-bot-006",
    name: "FeedbackBot",
    desc: "Collects user feedback after interactions.",
    channels: ["Email", "Chat"],
    metrics: { conversations: 678, satisfaction: 92, responseTime: "1.9s" },
  },
];

export default function AIAgents() {
  const [status, setStatus] = useState("All");
  const [channel, setChannel] = useState("All Channel");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const navigate = useNavigate();

  // For demo, all agents are active
  const filteredAgents =
    status === "All" ? agents : status === "Active" ? agents : [];

  const filters = [
    {
      key: "status",
      value: status,
      onClick: () =>
        setStatus(
          status === "All" ? "Active" : status === "Active" ? "Archived" : "All"
        ),
    },
    {
      key: "channel",
      value: channel,
      onClick: () =>
        setChannel(
          channel === "All Channel"
            ? "Voice"
            : channel === "Voice"
            ? "SMS"
            : channel === "SMS"
            ? "Email"
            : "All Channel"
        ),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeaderWithTabs
        title="AI Agents"
        description="Manage your AI agents and their configurations here."
        breadcrumbs={["Home", "AI Agents"]}
        tabs={[]}
        filters={filters}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchPlaceholder="Search agents"
        createButtonText="New Agent"
        onCreateClick={() => navigate("/ai-agents/create")}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent, index) => (
            <div
              key={agent.name}
              className={`group relative rounded-xl p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 ${
                index % 4 === 0
                  ? "bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-blue-200/50"
                  : index % 4 === 1
                  ? "bg-gradient-to-br from-purple-50 via-white to-pink-50 border border-purple-200/50"
                  : index % 4 === 2
                  ? "bg-gradient-to-br from-emerald-50 via-white to-teal-50 border border-emerald-200/50"
                  : "bg-gradient-to-br from-orange-50 via-white to-amber-50 border border-orange-200/50"
              }`}
              onClick={() => navigate(`/ai-agents/${agent.id}`)}
            >
              {/* Subtle Pattern Overlay */}
              <div
                className={`absolute inset-0 rounded-xl opacity-5 ${
                  index % 4 === 0
                    ? "bg-[radial-gradient(circle_at_20%_80%,#3b82f6_0%,transparent_50%)]"
                    : index % 4 === 1
                    ? "bg-[radial-gradient(circle_at_80%_20%,#8b5cf6_0%,transparent_50%)]"
                    : index % 4 === 2
                    ? "bg-[radial-gradient(circle_at_40%_40%,#10b981_0%,transparent_50%)]"
                    : "bg-[radial-gradient(circle_at_60%_60%,#f59e0b_0%,transparent_50%)]"
                }`}
              ></div>
              {/* Status Badge */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                      index % 2 === 0 ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  ></div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center space-x-1 ${
                      index % 2 === 0
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {index % 2 === 0 ? (
                      <>
                        <CheckCircleIcon className="w-3 h-3" />
                        <span>Live</span>
                      </>
                    ) : (
                      <>
                        <ClockIcon className="w-3 h-3" />
                        <span>Draft</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Menu Button */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100">
                    <EllipsisVerticalIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Agent Icon */}
              <div className="mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                    index % 3 === 0
                      ? "bg-gradient-to-br from-blue-500 to-blue-600"
                      : index % 3 === 1
                      ? "bg-gradient-to-br from-purple-500 to-purple-600"
                      : "bg-gradient-to-br from-emerald-500 to-emerald-600"
                  }`}
                >
                  <ComputerDesktopIcon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Agent Name */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                {agent.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {agent.desc}
              </p>

              {/* Channels */}
              <div className="mb-6">
                <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                  Channels
                </p>
                <div className="flex flex-wrap gap-2">
                  {agent.channels.map((channel, channelIndex) => (
                    <span
                      key={channel}
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        channelIndex % 3 === 0
                          ? "bg-blue-100 text-blue-700"
                          : channelIndex % 3 === 1
                          ? "bg-purple-100 text-purple-700"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {channel}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Section */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                    <UserCircleIcon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-500">Owner</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors duration-200">
                  edited 2 days ago
                </span>
              </div>

              {/* Hover Effect Overlay */}
              <div
                className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${
                  index % 4 === 0
                    ? "bg-gradient-to-br from-blue-500/10 to-indigo-500/10"
                    : index % 4 === 1
                    ? "bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                    : index % 4 === 2
                    ? "bg-gradient-to-br from-emerald-500/10 to-teal-500/10"
                    : "bg-gradient-to-br from-orange-500/10 to-amber-500/10"
                }`}
              ></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
