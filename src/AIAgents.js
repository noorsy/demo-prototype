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
  ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

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
  const navigate = useNavigate();
  // For demo, all agents are active
  const filteredAgents =
    status === "All" ? agents : status === "Active" ? agents : [];

  return (
    <div className="text-[14px]">
      <PageHeader title="AI Agents" />
      <div className="p-2">
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          {/* Proper Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="min-w-[120px] flex items-center gap-2"
              >
                {status}
                <ChevronDownIcon className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {statusOptions.map((option) => (
                <DropdownMenuItem
                  key={option}
                  onClick={() => setStatus(option)}
                  className={option === status ? "bg-accent" : ""}
                >
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            className="flex items-center gap-2"
            onClick={() => navigate("/ai-agents/create")}
          >
            <PlusIcon className="w-5 h-5 -ml-1" />
            Create Assistant
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <Card
              key={agent.name}
              className="cursor-pointer transition-transform transition-shadow hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02] group"
              tabIndex={0}
              onClick={() => navigate(`/ai-agents/${agent.name}`)}
            >
              <CardHeader>
                <CardTitle className="text-lg group-hover:underline">
                  {agent.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-muted-foreground text-sm mb-2 line-clamp-2">
                  {agent.desc}
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {/* Tag: 1st Party - Auto Loan (for demo, always this) */}
                  <Badge variant="default">1st Party - Auto Loan</Badge>
                </div>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {agent.channels.map((ch) => (
                    <Badge
                      key={ch}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {channelIcons[ch] || null}
                      {ch}
                    </Badge>
                  ))}
                </div>
                {/* Divider and footer */}
                <div className="mt-4">
                  <div className="border-t border-border my-2" />
                  <div className="text-xs text-muted-foreground mt-5">
                    Modified by Noor · a few days ago
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
