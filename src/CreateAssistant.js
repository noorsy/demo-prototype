import React, { useState } from "react";
import PageHeader from "./PageHeader";
import { useNavigate } from "react-router-dom";
import {
  CheckCircleIcon,
  PlusIcon,
  CalendarDaysIcon,
  ClockIcon,
  InformationCircleIcon,
  FunnelIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

const microSegments = ["Auto Loan", "Mortgage", "Credit Card"];
const channelOptions = [
  {
    key: "Voice",
    icon: "🔊",
    desc: "Automated or live voice calls.",
  },
  {
    key: "SMS",
    icon: "💬",
    desc: "Text messaging for quick alerts.",
  },
  {
    key: "Email",
    icon: "✉️",
    desc: "Send detailed information via email.",
  },
  {
    key: "Web Chat",
    icon: "💻",
    desc: "Chat with users on your website.",
  },
];
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
const sources = [
  {
    key: "SFTP",
    icon: "📁",
    desc: "Secure File Transfer Protocol for batch uploads.",
  },
  { key: "API", icon: "🔗", desc: "Real-time integration with your systems." },
];
const segmentOptions = [
  {
    key: "manual",
    title: "Manual Segment",
    desc: "Define segments and rules yourself.",
  },
  {
    key: "ai",
    title: "AI-driven Segment",
    desc: "Let AI analyze and create segments for you.",
  },
];

const steps = [
  {
    title: "Assistant Details",
    desc: "Name, description, segment, and channels.",
    icon: "📝",
  },
  {
    title: "Attributes & Data Source",
    desc: "Configure attributes, data source and segmentation.",
    icon: "📄",
  },
  {
    title: "AI Processing",
    desc: "AI analyzes and creates intelligent segments.",
    icon: "🤖",
  },
  {
    title: "Segmentation",
    desc: "Review and manage AI-generated segments.",
    icon: "🔎",
  },
];

const tasksList = [
  {
    id: 1,
    title: "Segmenting Accounts",
    icon: FunnelIcon,
    subtasks: [
      "Dividing accounts into primary behavioral groups",
      "Applying propensity scoring to each segment",
      "Identifying high-value recovery opportunities",
      "Creating smart segment boundaries 📊",
    ],
  },
  {
    id: 2,
    title: "Optimizing Treatment Strategies",
    icon: ChatBubbleLeftRightIcon,
    subtasks: [
      "Matching communication approaches to segments",
      "Calculating optimal contact timing windows",
      "Personalizing message content by segment",
      "Fine-tuning approach sensitivity 🎯",
    ],
  },
  {
    id: 3,
    title: "Defining Segment Characteristics",
    icon: UserCircleIcon,
    subtasks: [
      "Analyzing segment behavioral patterns",
      "Identifying segment communication preferences",
      "Determining segment risk profiles",
      "Mapping segment response tendencies 📊",
    ],
  },
  {
    id: 4,
    title: "Building Journey Mapping",
    icon: CalendarDaysIcon,
    subtasks: [
      "Creating communication sequence flows",
      "Setting up channel-specific touchpoints",
      "Establishing decision points and branches",
      "Optimizing timing between touchpoints ⏱️",
    ],
  },
];

// Add mock segments data for demonstration
const initialSegments = {
  "Early Stage": [
    {
      name: "High Value Early",
      rules: "DPD 5-10 AND Amount > $5,000",
      characteristics: "High balance, first-time delinquent",
      focus: "Empathy, payment plan options",
    },
    {
      name: "Repeat Early",
      rules: "DPD 5-10 AND Repeat delinquents",
      characteristics: "Multiple past dues, moderate balance",
      focus: "Reminder, urgency messaging",
    },
  ],
  "Mid Stage": [
    {
      name: "Mid Risk",
      rules: "DPD 21-30, Amount $1,000-$5,000",
      characteristics: "Medium risk, some prior contact",
      focus: "Escalation, offer settlement",
    },
  ],
  "Late Stage": [],
  "Very Late Stage": [],
  "Pre-Chargeoff": [],
  "Post-Chargeoff": [],
};

// Map DPD names to display names for tabs
const dpdDisplayNames = {
  "Early Stage": "Early Delinquency",
  "Mid Stage": "Mid Delinquency",
  "Late Stage": "Late Delinquency",
  "Very Late Stage": "Very Late",
  "Pre-Chargeoff": "Pre-Chargeoff",
  "Post-Chargeoff": "Post-Chargeoff",
};

function AIMagicProgress({ tasksList, onComplete }) {
  const [current, setCurrent] = React.useState(0);
  // Calculate progress
  const totalSubtasks = tasksList.reduce(
    (sum, t) => sum + t.subtasks.length,
    0
  );
  const completedSubtasks =
    tasksList.slice(0, current).reduce((sum, t) => sum + t.subtasks.length, 0) +
    (current < tasksList.length
      ? 0
      : tasksList[tasksList.length - 1].subtasks.length);
  const progress = Math.min((completedSubtasks / totalSubtasks) * 100, 100);

  React.useEffect(() => {
    if (current < tasksList.length) {
      const timeout = setTimeout(() => setCurrent(current + 1), 1200);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(onComplete, 1200);
    }
  }, [current, tasksList.length, onComplete]);
  return (
    <div className="h-full w-full flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-lg flex flex-col items-center">
        <div className="mb-4 flex flex-col items-center">
          <div className="mb-2 animate-pulse">
            {/* Smaller glowing brain icon */}
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#6366F1" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#EEF4FF" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="20" cy="20" r="20" fill="url(#glow)" />
              <circle cx="20" cy="20" r="15" fill="#EEF4FF" />
              <path
                d="M15 26c-2 0-3.3-1.7-3.3-3.7 0-1.2.4-2.1 1.3-2.8C13 18.5 13 17.8 13 17c0-3.1 2.5-5.6 5.6-5.6 1.2 0 2.1.4 2.8 1.3C22.5 13 23.2 13 24 13c3.1 0 5.6 2.5 5.6 5.6 0 .8-.4 1.5-1.3 2.2.9.7 1.3 1.6 1.3 2.8 0 2-1.3 3.7-3.3 3.7"
                stroke="#6366F1"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-xl font-extrabold text-zinc-900 text-center tracking-tight mb-1">
            AI Magic in Progress
          </div>
          <div className="text-zinc-500 text-center max-w-xs mb-2 text-base">
            Our AI is analyzing your portfolio data to create intelligent
            segments for optimized collections.
          </div>
          {/* Progress Bar */}
          <div className="w-full max-w-lg mx-auto mt-2 mb-2">
            <div className="h-3 bg-zinc-200 rounded-full overflow-hidden">
              <div
                className="h-3 bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-xs text-zinc-500 mt-1 text-right font-inter">
              {Math.round(progress)}% Complete
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          {tasksList.map((task, idx) => {
            const Icon = task.icon;
            let state = "pending";
            if (idx < current) state = "done";
            else if (idx === current) state = "active";
            return (
              <div
                key={task.id}
                className={
                  state === "done"
                    ? "flex items-center justify-between rounded-xl border border-black-100 bg-black-50 px-5 py-3 shadow-sm"
                    : state === "active"
                    ? "flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 shadow-sm animate-pulse"
                    : "flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50 px-5 py-3 shadow-sm opacity-70"
                }
              >
                <div className="flex items-center gap-4">
                  <span
                    className={
                      state === "done"
                        ? "bg-black-100 text-black-600 rounded-full p-1"
                        : state === "active"
                        ? "bg-blue-100 text-blue-600 rounded-full p-1"
                        : "bg-zinc-100 text-zinc-400 rounded-full p-1"
                    }
                  >
                    {state === "done" ? (
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    ) : (
                      <Icon className="w-5 h-5 text-blue-500" />
                    )}
                  </span>
                  <div>
                    <div className="font-medium text-zinc-900 text-base">
                      {task.title}
                    </div>
                    {state === "active" && (
                      <div className="text-xs text-blue-600 mt-1">
                        {idx === 1 ? "Finalizing..." : "In Progress..."}
                      </div>
                    )}
                    {state === "done" && (
                      <div className="text-xs text-black-600 mt-1">
                        Completed
                      </div>
                    )}
                    {state === "pending" && (
                      <div className="text-xs text-zinc-400 mt-1">Pending</div>
                    )}
                  </div>
                </div>
                <div className="text-xs font-medium text-right">
                  {state === "active"
                    ? "100%"
                    : state === "done"
                    ? "Completed"
                    : "Pending"}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Button style classes for consistency
const primaryBtn =
  "px-5 py-2 rounded-lg bg-zinc-900 text-white font-inter text-sm font-semibold hover:bg-black transition";
const secondaryBtn =
  "px-5 py-2 rounded-lg bg-zinc-200 text-zinc-900 font-inter text-sm font-semibold hover:bg-zinc-300 transition";

export default function CreateAssistant() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    desc: "",
    segment: "First-party",
    microSegment: "Auto Loan",
    channels: [],
    attributes: attributes.map((attr) => ({
      ...attr,
      autoCreate: false,
      mandatory: attr.mandatory,
    })),
    source: "SFTP",
    segmentType: "manual",
    dpds: [
      { name: "Early Stage", from: 5, to: 20 },
      { name: "Mid Stage", from: 21, to: 40 },
      { name: "Late Stage", from: 41, to: 60 },
      { name: "Very Late Stage", from: 61, to: 90 },
      { name: "Pre-Chargeoff", from: 91, to: 120 },
      { name: "Post-Chargeoff", from: 121, to: 180 },
    ],
  });
  const [aiMagic, setAiMagic] = useState(false);
  const [showAIMagic, setShowAIMagic] = useState(false);
  const navigate = useNavigate();
  const [selectedDPD, setSelectedDPD] = useState(
    form.dpds[0]?.name || "Early Stage"
  );
  const [segments, setSegments] = useState(initialSegments);

  function toggleChannel(channel) {
    setForm((prev) => ({
      ...prev,
      channels: prev.channels.includes(channel)
        ? prev.channels.filter((ch) => ch !== channel)
        : [...prev.channels, channel],
    }));
  }
  function handleAttrChange(idx, key, value) {
    setForm((prev) => {
      const updated = [...prev.attributes];
      updated[idx][key] = value;
      return { ...prev, attributes: updated };
    });
  }
  function handleDpdChange(idx, key, value) {
    setForm((prev) => {
      const updated = [...prev.dpds];
      updated[idx][key] = value;
      return { ...prev, dpds: updated };
    });
  }
  function addDpd() {
    setForm((prev) => ({
      ...prev,
      dpds: [...prev.dpds, { name: "", from: "", to: "" }],
    }));
  }
  function removeDpd(idx) {
    setForm((prev) => ({
      ...prev,
      dpds: prev.dpds.filter((_, i) => i !== idx),
    }));
  }
  function handleNext() {
    if (step === 2) {
      setShowAIMagic(true);
    } else if (step === 5) {
      setAiMagic(true);
      setTimeout(() => {
        navigate("/segments");
      }, 2200);
    } else {
      setStep(step + 1);
    }
  }
  function handleBack() {
    if (step > 1) setStep(step - 1);
  }

  return (
    <div className="min-h-screen font-inter text-sm">
      <PageHeader
        title="Create Assistant"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "AI Agents", href: "/ai-agents" },
          { label: "Create Assistant" },
        ]}
      />
      <div
        className="max-w-6xl mx-auto bg-white rounded-xl shadow p-0 flex min-h-[calc(100vh-64px)]"
        style={{ minHeight: "calc(100vh - 64px)" }}
      >
        {/* Left: Stepper */}
        <div className="w-1/3 py-8 pl-8 border-r border-zinc-100 bg-zinc-50 rounded-l-xl flex flex-col gap-8 min-h-full">
          <div>
            <div className="text-zinc-900 font-semibold text-xl mb-2">
              Onboarding
            </div>
            <div className="text-zinc-500 text-xs mb-6">
              to setup your assistant profile
            </div>
            <ol className="space-y-8">
              {steps.map((stepObj, idx) => {
                const isCompleted = step > idx + 1;
                const isCurrent = step === idx + 1;
                return (
                  <li key={stepObj.title} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 flex items-center justify-center rounded-lg mb-2 transition-all border-2 ${
                          isCompleted
                            ? "bg-green-100 text-green-700 border-green-300"
                            : isCurrent
                            ? "bg-blue-50 text-blue-600 border-blue-400"
                            : "bg-zinc-50 text-zinc-400 border-zinc-200"
                        }`}
                      >
                        {isCompleted ? (
                          <svg width="22" height="22" fill="none">
                            <circle cx="11" cy="11" r="11" fill="#22C55E" />
                            <path
                              d="M7 12l3 3 5-5"
                              stroke="#fff"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        ) : (
                          <span className="text-lg">{stepObj.icon}</span>
                        )}
                      </div>
                      {idx < steps.length - 1 && (
                        <div
                          className={`w-0.5 h-12 ${
                            isCompleted ? "bg-green-200" : "bg-zinc-200"
                          }`}
                        />
                      )}
                    </div>
                    <div>
                      <div
                        className={`font-medium text-sm ${
                          isCurrent
                            ? "text-blue-600 font-bold"
                            : isCompleted
                            ? "text-green-700 font-bold"
                            : "text-zinc-400"
                        }`}
                      >
                        {stepObj.title}
                      </div>
                      <div className="text-xs text-zinc-400 mt-1 max-w-[180px]">
                        {stepObj.desc}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
        {/* Right: Step Content */}
        <div className="flex-1 flex flex-col min-h-full">
          <div className="flex-1 p-5">
            {showAIMagic ? (
              <div className="h-full w-full flex items-center justify-center overflow-hidden">
                <AIMagicProgress
                  tasksList={tasksList}
                  onComplete={() => {
                    setShowAIMagic(false);
                    setStep(4);
                  }}
                />
              </div>
            ) : step === 1 ? (
              <div>
                <h2 className="text-lg font-semibold mb-1">
                  Assistant Details
                </h2>
                <div className="text-zinc-500 text-sm mb-4">
                  Set up your assistant's name, description, segment, and
                  communication channels.
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Assistant Name
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Assistant Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm"
                    value={form.desc}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, desc: e.target.value }))
                    }
                  />
                </div>
                <div className="mb-4 flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-1">
                      Segment
                    </label>
                    <select
                      className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm"
                      value={form.segment}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, segment: e.target.value }))
                      }
                    >
                      <option value="First-party">First-party</option>
                      <option value="Third-party">Third-party</option>
                    </select>
                  </div>
                  {form.segment === "First-party" && (
                    <div className="flex-1">
                      <label className="block text-sm font-medium mb-1">
                        Micro-segment
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm"
                        value={form.microSegment}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            microSegment: e.target.value,
                          }))
                        }
                      >
                        {microSegments.map((seg) => (
                          <option key={seg} value={seg}>
                            {seg}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-base font-medium mb-2">
                    Channels
                  </label>
                  <div className="text-zinc-500 text-xs mb-2">
                    Select the communication channels your assistant will use to
                    reach customers.
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    {channelOptions.map((channel) => (
                      <label
                        key={channel.key}
                        className={`flex items-center border rounded-lg p-4 w-full cursor-pointer transition-colors font-inter text-sm
                          ${
                            form.channels.includes(channel.key)
                              ? "border-blue-600 bg-blue-50"
                              : "border-zinc-200 bg-white hover:bg-zinc-50"
                          }`}
                      >
                        <input
                          type="checkbox"
                          checked={form.channels.includes(channel.key)}
                          onChange={() => toggleChannel(channel.key)}
                          className="mr-3 accent-blue-600"
                        />
                        <div className="flex flex-col">
                          <span className="text-xl mb-1">{channel.icon}</span>
                          <span className="font-medium text-zinc-900">
                            {channel.key}
                          </span>
                          <span className="text-xs text-zinc-500 text-left mt-1">
                            {channel.desc}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button className={primaryBtn} onClick={handleNext}>
                    Next
                  </button>
                </div>
              </div>
            ) : step === 2 ? (
              <div>
                <h2 className="text-lg font-semibold mb-1">
                  Attributes & Data Source
                </h2>
                <div className="text-zinc-500 text-sm mb-4">
                  Review required data attributes and select your data source
                  and segmentation method.
                </div>
                <div className="overflow-x-auto mb-8">
                  <table className="min-w-full border-separate border-spacing-y-2 bg-white rounded-xl shadow font-inter text-sm">
                    <thead>
                      <tr className="bg-zinc-50 text-zinc-700 text-sm">
                        <th className="px-4 py-2 rounded-tl-xl">Auto-create</th>
                        <th className="px-4 py-2">Attribute Name</th>
                        <th className="px-4 py-2">Attribute Description</th>
                        <th className="px-4 py-2 rounded-tr-xl">Mandatory</th>
                      </tr>
                    </thead>
                    <tbody>
                      {form.attributes.map((attr, idx) => (
                        <tr
                          key={attr.name}
                          className="bg-zinc-50 hover:bg-blue-50 transition rounded-xl"
                        >
                          <td className="px-4 py-2 text-center">
                            <input
                              type="checkbox"
                              checked={true}
                              readOnly
                              className="accent-blue-600"
                            />
                          </td>
                          <td className="px-4 py-2 font-medium text-zinc-900">
                            {attr.name}
                          </td>
                          <td className="px-4 py-2 text-zinc-600">
                            {attr.desc}
                          </td>
                          <td className="px-4 py-2 text-center">
                            <span className="text-xs text-zinc-400">Yes</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <h3 className="text-base font-semibold mb-1">Data Source</h3>
                <div className="text-zinc-500 text-xs mb-2">
                  Choose how you'll provide account data for the assistant.
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 w-full">
                  {sources.map((src) => (
                    <label
                      key={src.key}
                      className={`flex items-center border rounded-lg p-6 w-full cursor-pointer transition-colors font-inter text-sm
                        ${
                          form.source === src.key
                            ? "border-blue-600 bg-blue-50"
                            : "border-zinc-200 bg-white hover:bg-zinc-50"
                        }`}
                    >
                      <input
                        type="radio"
                        name="source"
                        checked={form.source === src.key}
                        onChange={() =>
                          setForm((f) => ({ ...f, source: src.key }))
                        }
                        className="mr-4 accent-blue-600"
                      />
                      <span className="text-2xl mr-3">{src.icon}</span>
                      <div>
                        <span className="font-medium text-zinc-900">
                          {src.key}
                        </span>
                        <div className="text-xs text-zinc-500 mt-1">
                          {src.desc}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                <h3 className="text-base font-semibold mb-1">Segmentation</h3>
                <div className="text-zinc-500 text-xs mb-2">
                  Select how segments will be defined for your accounts.
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6 w-full">
                  {segmentOptions.map((seg) => (
                    <label
                      key={seg.key}
                      className={`flex items-center border rounded-lg p-6 w-full cursor-pointer transition-colors font-inter text-sm
                        ${
                          form.segmentType === seg.key
                            ? "border-blue-600 bg-blue-50"
                            : "border-zinc-200 bg-white hover:bg-zinc-50"
                        }`}
                    >
                      <input
                        type="radio"
                        name="segmentType"
                        checked={form.segmentType === seg.key}
                        onChange={() =>
                          setForm((f) => ({ ...f, segmentType: seg.key }))
                        }
                        className="mr-4 accent-blue-600"
                      />
                      <div>
                        <span className="font-medium text-zinc-900">
                          {seg.title}
                        </span>
                        <div className="text-xs text-zinc-500 mt-1">
                          {seg.desc}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                <h3 className="text-base font-semibold mb-1">DPD Stages</h3>
                <div className="text-zinc-500 text-xs mb-2">
                  Define the delinquency stages (DPD buckets) for your
                  portfolio.
                </div>
                <div className="mb-6">
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-separate border-spacing-y-3 font-inter text-sm">
                      <thead>
                        <tr className="bg-zinc-50 text-zinc-700 text-sm">
                          <th className="px-4 py-2 text-left">Stage Name</th>
                          <th className="px-4 py-2 text-left">From (days)</th>
                          <th className="px-4 py-2 text-left">To (days)</th>
                          <th className="px-4 py-2 text-center"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {form.dpds.map((dpd, idx) => (
                          <tr
                            key={idx}
                            className="bg-zinc-50 hover:bg-blue-50 transition rounded-xl shadow-sm"
                          >
                            <td className="px-4 py-2">
                              <input
                                className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm bg-white"
                                value={dpd.name}
                                onChange={(e) =>
                                  handleDpdChange(idx, "name", e.target.value)
                                }
                                placeholder="e.g. Early Stage"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <input
                                type="number"
                                className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm bg-white"
                                value={dpd.from}
                                onChange={(e) =>
                                  handleDpdChange(idx, "from", e.target.value)
                                }
                                placeholder="From"
                              />
                            </td>
                            <td className="px-4 py-2">
                              <input
                                type="number"
                                className="w-full px-3 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm bg-white"
                                value={dpd.to}
                                onChange={(e) =>
                                  handleDpdChange(idx, "to", e.target.value)
                                }
                                placeholder="To"
                              />
                            </td>
                            <td className="px-4 py-2 text-center">
                              <span className="relative group">
                                <button
                                  className="p-2 rounded-full hover:bg-red-100 transition"
                                  onClick={() => removeDpd(idx)}
                                  disabled={form.dpds.length === 1}
                                  aria-label="Remove DPD Stage"
                                >
                                  <svg width="20" height="20" fill="none">
                                    <circle
                                      cx="10"
                                      cy="10"
                                      r="10"
                                      fill="#D1FADF"
                                    />
                                    <path
                                      d="M6 10.5l3 3 5-5"
                                      stroke="#12B76A"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </button>
                                <span className="absolute left-8 top-1/2 -translate-y-1/2 bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition pointer-events-none z-30 whitespace-nowrap shadow-lg">
                                  Remove DPD Stage
                                </span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <button
                    className="mt-4 px-4 py-2 rounded-md bg-blue-50 text-blue-600 font-medium hover:bg-blue-100 font-inter text-sm border border-blue-100"
                    onClick={addDpd}
                  >
                    + Add DPD Stage
                  </button>
                </div>
              </div>
            ) : step === 4 ? (
              <div className="h-full flex flex-col">
                <div className="flex-1 p-5">
                  <div className="mb-2">
                    <h2 className="text-xl font-bold text-zinc-900 mb-1">
                      AI Generated Segments
                    </h2>
                    <div className="text-zinc-500 text-sm mb-4">
                      Review and manage the segments generated by AI for each
                      DPD stage.
                    </div>
                  </div>
                  {/* DPD Tabs - standard horizontal tabs */}
                  <div className="flex border-b border-zinc-200 mb-8">
                    {form.dpds.map((dpd) => (
                      <button
                        key={dpd.name}
                        onClick={() => setSelectedDPD(dpd.name)}
                        className={`px-4 py-2 -mb-px font-semibold text-sm border-b-2 transition focus:outline-none ${
                          selectedDPD === dpd.name
                            ? "border-black text-black"
                            : "border-transparent text-zinc-500 hover:text-black"
                        }`}
                        style={{ minWidth: 120 }}
                      >
                        {dpdDisplayNames[dpd.name] || dpd.name}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="text-lg font-semibold text-black">
                      Segments for {dpdDisplayNames[selectedDPD] || selectedDPD}
                    </div>
                  </div>
                  {segments[selectedDPD] && segments[selectedDPD].length > 0 ? (
                    <div className="flex flex-col gap-6">
                      {segments[selectedDPD].map((seg, idx) => (
                        <div
                          key={idx}
                          className="bg-white border border-zinc-200 rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="text-lg font-bold text-zinc-900 mb-2 truncate">
                              {seg.name}
                            </div>
                            {/* Conditions as black/grey pills */}
                            <div className="flex flex-wrap gap-2 mb-2">
                              {seg.rules.split(" and ").map((cond, i) => (
                                <span
                                  key={i}
                                  className="inline-block bg-zinc-900 text-white px-3 py-1 rounded-full text-xs font-semibold"
                                >
                                  {cond.trim()}
                                </span>
                              ))}
                            </div>
                            {/* Characteristics as subtle badges or comma list */}
                            <div className="flex flex-wrap gap-2 items-center mb-2">
                              <span className="text-xs text-zinc-500 font-medium">
                                Characteristics:
                              </span>
                              {Array.isArray(seg.characteristics) ? (
                                seg.characteristics.map((c, i) => (
                                  <span
                                    key={i}
                                    className="inline-block bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded text-xs border border-zinc-200"
                                  >
                                    {c}
                                  </span>
                                ))
                              ) : (
                                <span className="inline-block bg-zinc-100 text-zinc-700 px-2 py-0.5 rounded text-xs border border-zinc-200">
                                  {seg.characteristics}
                                </span>
                              )}
                            </div>
                            {/* Messaging Focus */}
                            <div className="text-xs text-zinc-500">
                              <span className="font-medium">
                                Messaging Focus:
                              </span>{" "}
                              <span className="text-zinc-700">{seg.focus}</span>
                            </div>
                          </div>
                          {/* Actions */}
                          <div className="flex flex-row gap-3 md:flex-col md:gap-2 md:items-end">
                            <button className={primaryBtn}>Edit</button>
                            <button className={secondaryBtn}>
                              Go to Journey
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-zinc-400 italic mt-8">
                      No segments yet for this DPD bucket.
                    </div>
                  )}
                </div>
                {/* Sticky Go to Dashboard button */}
                <div className="sticky bottom-0 bg-white border-t border-zinc-200 p-4 z-10">
                  <div className="flex justify-end">
                    <button
                      className={primaryBtn}
                      onClick={() => navigate("/dashboard")}
                    >
                      Go to Dashboard
                    </button>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
          {/* Sticky button within content area */}
          {!showAIMagic && step === 2 && (
            <div className="sticky bottom-0 bg-white border-t border-zinc-200 p-4">
              <div className="flex justify-end">
                <button className={primaryBtn} onClick={handleNext}>
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
