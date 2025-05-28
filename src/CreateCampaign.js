import React, { useState, useRef } from "react";
import PageHeader from "./PageHeader";
import ReactFlow, {
  Background,
  Controls,
  Handle,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { useNavigate } from "react-router-dom";
import {
  CheckCircleIcon,
  CalendarDaysIcon,
  ClockIcon,
  PlusIcon,
  ArrowDownTrayIcon,
  SparklesIcon,
  UserGroupIcon,
  TagIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";

const steps = [
  { title: "Campaign Details", desc: "Name, description, and upload method." },
  {
    title: "Column Mapping",
    desc: "Map your data columns to the required system columns for campaign processing..",
  },
  { title: "", desc: "" },
  { title: "Segments & Journey", desc: "Review segments and journey." },
  { title: "Schedule", desc: "Set campaign schedule." },
];

const primaryBtn =
  "px-5 py-2 rounded-lg bg-zinc-900 text-white font-inter text-sm font-semibold hover:bg-black transition";
const secondaryBtn =
  "px-5 py-2 rounded-lg bg-zinc-200 text-zinc-900 font-inter text-sm font-semibold hover:bg-zinc-300 transition";

const systemColumns = [
  "account_id",
  "customer_name",
  "primary_phone_number",
  "email_address",
  "dpd",
  "amount_due",
  "product_type",
  "timezone",
];
const mockCsvHeaders = [
  "AccountID",
  "Name",
  "Phone",
  "Email",
  "DPD",
  "AmountDue",
  "ProductType",
  "Timezone",
];

const sampleCsvUrl = "/sample-campaign.csv"; // You can provide a real sample file in public/

const aiTasks = [
  {
    id: 1,
    title: "Ingesting Portfolio",
    subtasks: [
      "Loading account and balance details",
      "Spotting duplicates, gaps, and formatting issues",
      "Aligning fields and values with portfolio schema",
      "Analyzing data integrity and completeness",
    ],
  },
  {
    id: 2,
    title: "Understanding Accounts",
    subtasks: [
      "Reviewing core attributes",
      "Spotting clusters by product, geography, and balance",
      "Analyzing the distribution of traits across account groups",
      "Identifying account patterns and relationships",
    ],
  },
  {
    id: 3,
    title: "Analyzing Past Engagements",
    subtasks: [
      "Found 3483 accounts with previous engagement history",
      "Retrieving CRM data for previous engagements",
      "Studying payment gaps, patterns, and broken promises",
      "Extracting historical insights and trends",
    ],
  },
  {
    id: 4,
    title: "Matching with Similar Accounts",
    subtasks: [
      "Identifying newly added or unseen accounts",
      "Matching behavior and risk signals across portfolios",
      "Grouping based on historic response patterns",
      "Establishing similarity metrics and thresholds",
    ],
  },
];

// Helper to normalize column names for matching
function normalize(str) {
  return str.replace(/[_\s]/g, "").toLowerCase();
}

function AIMagic({ tasks, onComplete }) {
  const [currentTask, setCurrentTask] = useState(0);
  const [currentSub, setCurrentSub] = useState(0);
  const [done, setDone] = useState(false);

  // Calculate progress
  const totalSubtasks = tasks.reduce((sum, t) => sum + t.subtasks.length, 0);
  const completedSubtasks =
    tasks.slice(0, currentTask).reduce((sum, t) => sum + t.subtasks.length, 0) +
    currentSub;
  const progress = Math.min((completedSubtasks / totalSubtasks) * 100, 100);

  React.useEffect(() => {
    if (currentTask < tasks.length) {
      if (currentSub < tasks[currentTask].subtasks.length) {
        const timeout = setTimeout(() => setCurrentSub(currentSub + 1), 900);
        return () => clearTimeout(timeout);
      } else {
        if (currentTask < tasks.length - 1) {
          setTimeout(() => {
            setCurrentTask(currentTask + 1);
            setCurrentSub(0);
          }, 1200);
        } else {
          setTimeout(() => setDone(true), 1200);
        }
      }
    }
  }, [currentTask, currentSub, tasks]);
  React.useEffect(() => {
    if (done) setTimeout(onComplete, 1200);
  }, [done, onComplete]);
  return (
    <div className="flex flex-col items-center justify-center py-2 w-full transition-all">
      <div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <SparklesIcon className="w-7 h-7 text-blue-500 animate-pulse drop-shadow-md" />
          <span className="text-xl text-center font-bold text-zinc-900">
            Processing Portfolio Data
          </span>
        </div>
        <div className="text-zinc-500 text-center max-w-xl mb-4">
          Our AI is analyzing your portfolio data to create intelligent segments
          and journeys.
        </div>
        {/* Progress Bar */}
        <div className="w-full max-w-xl mx-auto mb-4">
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
      <div className="w-full max-w-xl flex flex-col gap-6">
        {tasks.map((task, tIdx) => {
          const isDone = tIdx < currentTask || done;
          const isActive = tIdx === currentTask && !done;
          return (
            <div
              key={task.id}
              className={`rounded-2xl border px-8 py-6 shadow-md w-full flex flex-col transition-all duration-500
                ${
                  isDone
                    ? "border-green-200 bg-green-50"
                    : isActive
                    ? "border-blue-400 bg-blue-50"
                    : "border-zinc-100 bg-zinc-50 opacity-60"
                }
              `}
            >
              <div className="flex items-center gap-2">
                {isDone ? (
                  <CheckCircleIcon className="w-5 h-5 text-green-500" />
                ) : isActive ? (
                  <span className="w-5 h-5 flex items-center justify-center">
                    <svg
                      className="animate-spin"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <circle
                        cx="10"
                        cy="10"
                        r="8"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        opacity="0.2"
                      />
                      <path
                        d="M18 10a8 8 0 0 0-8-8"
                        stroke="#3B82F6"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                ) : (
                  <span className="w-5 h-5 flex items-center justify-center rounded-full bg-zinc-200" />
                )}
                <div
                  className={`font-semibold text-base ${
                    isDone
                      ? "text-green-700"
                      : isActive
                      ? "text-blue-900"
                      : "text-zinc-400"
                  }`}
                >
                  {task.title}
                </div>
              </div>
              {isActive && currentSub < task.subtasks.length && (
                <div className="w-full flex flex-col items-start mt-2">
                  <div className="text-sm font-semibold text-blue-700 bg-blue-100 rounded-lg px-4 py-3 shadow-sm animate-fade-in min-h-[2.5rem]">
                    {task.subtasks[currentSub]}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Mock segments and journey for step 4
const mockSegments = [
  { name: "High Value Early", accounts: 1200 },
  { name: "Repeat Early", accounts: 800 },
  { name: "Mid Risk", accounts: 650 },
  { name: "Late Stage", accounts: 300 },
];

// Custom node component for journey
function CommNode({ data, type, selected }) {
  const iconMap = {
    start: (
      <span className="w-7 h-7 flex items-center justify-center rounded-full bg-zinc-900 text-white font-bold">
        S
      </span>
    ),
    voice: (
      <span className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold">
        V
      </span>
    ),
    delay: (
      <span className="w-7 h-7 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-700 font-bold">
        ⏱️
      </span>
    ),
    condition: (
      <span className="w-7 h-7 flex items-center justify-center rounded-full bg-purple-100 text-purple-700 font-bold">
        ?
      </span>
    ),
    sms: (
      <span className="w-7 h-7 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold">
        S
      </span>
    ),
  };
  return (
    <div
      className={`flex flex-col items-center justify-center px-4 py-3 rounded-xl shadow border-2 transition-all ${
        selected ? "border-blue-500 bg-blue-50" : "border-zinc-200 bg-white"
      }`}
      style={{ minWidth: 90, minHeight: 60, position: "relative" }}
    >
      {/* Handles for edge connections */}
      <Handle
        type="target"
        position="top"
        style={{ background: "#000", width: 10, height: 10, borderRadius: 5 }}
      />
      {iconMap[type]}
      <div className="font-semibold text-sm mt-1 text-zinc-900">
        {data.label}
      </div>
      <Handle
        type="source"
        position="bottom"
        style={{ background: "#000", width: 10, height: 10, borderRadius: 5 }}
      />
    </div>
  );
}

const nodeTypes = {
  comm: CommNode,
};

function JourneyCanvas({ onNodeClick, selectedNode }) {
  // Vertical journey with split after CONDITION
  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "start",
      type: "comm",
      position: { x: 200, y: 0 },
      data: { label: "Start", type: "start" },
    },
    {
      id: "voice1",
      type: "comm",
      position: { x: 200, y: 120 },
      data: {
        label: "Voice",
        type: "voice",
        message: "Call script here",
        formality: "Neutral",
        directness: "Balanced",
        urgency: "Medium",
        focus: "Relationship Building",
        content: "Default voice content.",
      },
    },
    {
      id: "condition",
      type: "comm",
      position: { x: 200, y: 240 },
      data: {
        label: "Condition",
        type: "condition",
        rule: "Payment received?",
      },
    },
    {
      id: "voice2",
      type: "comm",
      position: { x: 80, y: 360 },
      data: { label: "Voice", type: "voice", message: "Follow-up call" },
    },
    {
      id: "sms",
      type: "comm",
      position: { x: 320, y: 360 },
      data: { label: "SMS", type: "sms", message: "Send SMS here" },
    },
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([
    {
      id: "e1-2",
      source: "start",
      target: "voice1",
      animated: false,
      type: "straight",
      style: { stroke: "#000", strokeWidth: 3 },
    },
    {
      id: "e2-3",
      source: "voice1",
      target: "condition",
      animated: false,
      type: "straight",
      style: { stroke: "#000", strokeWidth: 3 },
    },
    {
      id: "e3-4",
      source: "condition",
      target: "voice2",
      animated: false,
      type: "straight",
      style: { stroke: "#000", strokeWidth: 3 },
    },
    {
      id: "e3-5",
      source: "condition",
      target: "sms",
      animated: false,
      type: "straight",
      style: { stroke: "#000", strokeWidth: 3 },
    },
  ]);
  return (
    <div
      className="bg-zinc-100 rounded-xl w-full"
      style={{ width: "100%", height: 600 }}
    >
      <ReactFlowProvider>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          panOnDrag={true}
          zoomOnScroll={true}
          zoomOnPinch={true}
          zoomOnDoubleClick={true}
          nodesDraggable={true}
          nodesConnectable={false}
          elementsSelectable={true}
          onNodeClick={(_, node) => onNodeClick(node)}
          selectionKeyCode={null}
          selectNodesOnDrag={false}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          defaultEdgeOptions={{
            type: "straight",
            markerEnd: { type: "arrowclosed", color: "#3B82F6" },
          }}
          style={{ background: "transparent", width: "100%", height: "100%" }}
        >
          <Background color="#F1F5F9" gap={24} />
          <Controls showInteractive={false} />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

function NodePropertiesPanel({ node, onClose }) {
  const [localData, setLocalData] = React.useState({});

  // Update localData when node changes
  React.useEffect(() => {
    if (node) setLocalData({ ...node.data });
  }, [node]);

  React.useEffect(() => {
    if (node && node.data.type === "voice") {
      setLocalData((prev) => ({
        ...prev,
        content: generateContent({
          formality: prev.formality,
          directness: prev.directness,
          urgency: prev.urgency,
          focus: prev.focus || [],
        }),
      }));
    }
    // eslint-disable-next-line
  }, [
    localData.formality,
    localData.directness,
    localData.urgency,
    JSON.stringify(localData.focus),
    node,
  ]);

  if (!node) return null;
  const { data } = node;

  const formalityOptions = ["Casual", "Neutral", "Formal"];
  const directnessOptions = ["Indirect", "Balanced", "Direct"];
  const urgencyOptions = ["Low", "Medium", "High"];
  const focusOptions = [
    "Relationship Building",
    "Payment Request",
    "Reminder",
    "Escalation",
  ];

  // Dummy content generator
  function generateContent({ formality, directness, urgency, focus }) {
    let intro = "";
    if (formality === "Casual") intro = "Hey there,";
    else if (formality === "Neutral") intro = "Hello,";
    else intro = "Dear Customer,";
    let ask = "";
    if (directness === "Indirect")
      ask = "We wanted to gently remind you about your account.";
    else if (directness === "Balanced")
      ask = "This is a reminder regarding your overdue account.";
    else ask = "Your account is overdue. Please make a payment immediately.";
    let urgencyText = "";
    if (urgency === "Low") urgencyText = "There's still time to resolve this.";
    else if (urgency === "Medium")
      urgencyText = "We encourage you to address this soon.";
    else urgencyText = "Immediate action is required.";
    let focusLines = [];
    if (Array.isArray(focus) && focus.length) {
      if (focus.includes("Relationship Building")) {
        focusLines.push(
          "We're here to support you and find the best solution together."
        );
      }
      if (focus.includes("Payment Request")) {
        focusLines.push(
          "Please make a payment at your earliest convenience to avoid further action."
        );
      }
      if (focus.includes("Reminder")) {
        focusLines.push(
          "This is a friendly reminder to help you stay on track with your account."
        );
      }
      if (focus.includes("Escalation")) {
        focusLines.push(
          "If we do not hear from you, your account may be escalated for further review."
        );
      }
    }
    return [intro, ask, urgencyText, ...focusLines].join("\n");
  }

  // Save changes to node (if you want to persist to the journey, you can add a callback)

  return (
    <div className="fixed top-0 right-0 w-full max-w-xs h-full bg-white border-l border-zinc-200 shadow-lg z-50 p-6 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <div className="font-bold text-lg text-zinc-900">
          {data.label} Properties
        </div>
        <button
          className="text-zinc-400 hover:text-zinc-900 text-xl"
          onClick={onClose}
        >
          &times;
        </button>
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <div className="text-sm text-zinc-500">
          Type: <span className="font-semibold text-zinc-900">{data.type}</span>
        </div>
        {data.type === "voice" && (
          <>
            <div className="font-semibold text-zinc-900 mt-2 mb-1">
              Tonality
            </div>
            {/* Formality */}
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <div className="text-xs text-zinc-500">Formality</div>
                <div className="text-xs font-medium text-zinc-900">
                  {localData.formality}
                </div>
              </div>
              <div className="flex gap-1">
                {formalityOptions.map((option) => (
                  <button
                    key={option}
                    className={`flex-1 px-2 py-1 rounded-full text-xs font-semibold border transition-colors ${
                      localData.formality === option
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-zinc-100 text-zinc-900 border-zinc-200 hover:bg-blue-50"
                    }`}
                    onClick={() =>
                      setLocalData((prev) => ({ ...prev, formality: option }))
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            {/* Directness */}
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <div className="text-xs text-zinc-500">Directness</div>
                <div className="text-xs font-medium text-zinc-900">
                  {localData.directness}
                </div>
              </div>
              <div className="flex gap-1">
                {directnessOptions.map((option) => (
                  <button
                    key={option}
                    className={`flex-1 px-2 py-1 rounded-full text-xs font-semibold border transition-colors ${
                      localData.directness === option
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-zinc-100 text-zinc-900 border-zinc-200 hover:bg-blue-50"
                    }`}
                    onClick={() =>
                      setLocalData((prev) => ({ ...prev, directness: option }))
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            {/* Urgency */}
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <div className="text-xs text-zinc-500">Urgency</div>
                <div className="text-xs font-medium text-zinc-900">
                  {localData.urgency}
                </div>
              </div>
              <div className="flex gap-1">
                {urgencyOptions.map((option) => (
                  <button
                    key={option}
                    className={`flex-1 px-2 py-1 rounded-full text-xs font-semibold border transition-colors ${
                      localData.urgency === option
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-zinc-100 text-zinc-900 border-zinc-200 hover:bg-blue-50"
                    }`}
                    onClick={() =>
                      setLocalData((prev) => ({ ...prev, urgency: option }))
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            {/* Conversation Focus */}
            <div className="font-semibold text-zinc-900 mt-2 mb-1">
              Conversation Focus
            </div>
            <div className="flex flex-col gap-1 mb-2">
              {focusOptions.map((option) => (
                <label key={option} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={
                      localData.focus && localData.focus.includes(option)
                    }
                    onChange={() => {
                      setLocalData((prev) => {
                        const focus = prev.focus || [];
                        return {
                          ...prev,
                          focus: focus.includes(option)
                            ? focus.filter((f) => f !== option)
                            : [...focus, option],
                        };
                      });
                    }}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
            {/* Content with AI button */}
            <div className="flex items-center justify-between mt-2 mb-1">
              <div className="font-semibold text-zinc-900">Content</div>
              <button className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold hover:bg-blue-200 transition">
                Improve with AI
              </button>
            </div>
            <textarea
              className="w-full border border-zinc-200 rounded-md p-2 text-sm min-h-[100px]"
              value={localData.content}
              onChange={(e) =>
                setLocalData((prev) => ({ ...prev, content: e.target.value }))
              }
            />
          </>
        )}
        {data.type === "sms" && (
          <div>
            <div className="text-xs text-zinc-500 mb-1">Message</div>
            <textarea
              className="w-full border border-zinc-200 rounded-md p-2 text-sm"
              value={data.message}
              readOnly
            />
          </div>
        )}
        {data.type === "delay" && (
          <div>
            <div className="text-xs text-zinc-500 mb-1">Duration</div>
            <input
              className="w-full border border-zinc-200 rounded-md p-2 text-sm"
              value={data.duration}
              readOnly
            />
          </div>
        )}
        {data.type === "condition" && (
          <div>
            <div className="text-xs text-zinc-500 mb-1">Rule</div>
            <input
              className="w-full border border-zinc-200 rounded-md p-2 text-sm"
              value={data.rule}
              readOnly
            />
          </div>
        )}
      </div>
    </div>
  );
}

const timelineEvents = [
  {
    type: "voice",
    date: "19th March 2025, 10:30AM",
    channel: "Voice",
    label: "Voice Call",
    color: "green",
    summary:
      "Customer acknowledged the reminder and promised to make payment by the due date.",
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

function renderTimelineCard(event) {
  if (event.type === "voice") {
    return (
      <>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-semibold text-green-700 text-base">
            Past Communication
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

export default function CreateCampaign() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    desc: "",
    uploadType: "CSV",
    file: null,
    sftp: { host: "", user: "", path: "" },
  });
  const [columnMap, setColumnMap] = useState(() => {
    // Map system columns to first matching CSV column by default
    const map = {};
    systemColumns.forEach((sysCol) => {
      const match = mockCsvHeaders.find(
        (csvCol) => normalize(csvCol) === normalize(sysCol)
      );
      map[sysCol] = match || "";
    });
    return map;
  });
  const fileInputRef = useRef();
  const [showAIMagic, setShowAIMagic] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  const [scheduleNow, setScheduleNow] = useState(true);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [businessStart, setBusinessStart] = useState("09:00");
  const [businessEnd, setBusinessEnd] = useState("18:00");
  const navigate = useNavigate();
  const [showAccountsModal, setShowAccountsModal] = useState(false);
  const [modalAccounts, setModalAccounts] = useState([]);
  const [modalSegment, setModalSegment] = useState(null);
  const [showInspectModal, setShowInspectModal] = useState(false);
  const [inspectAccount, setInspectAccount] = useState(null);

  function handleNext() {
    if (step === 2) {
      setStep(3);
      setShowAIMagic(true);
    } else if (step === steps.length) {
      navigate("/campaigns");
    } else {
      setStep((s) => Math.min(s + 1, steps.length));
    }
  }
  function handleBack() {
    setStep((s) => Math.max(s - 1, 1));
  }
  function handleDrop(e) {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setForm((f) => ({ ...f, file: e.dataTransfer.files[0] }));
    }
  }
  function handleDragOver(e) {
    e.preventDefault();
  }
  function handleFileChange(e) {
    setForm((f) => ({ ...f, file: e.target.files[0] }));
  }
  function handleRemoveFile() {
    setForm((f) => ({ ...f, file: null }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  // Replace mockAccounts with a larger sample and more attributes
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

  return (
    <div className="min-h-screen font-inter">
      <div className="relative z-10">
        <PageHeader
          title="Create Campaign"
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Campaigns", href: "/campaigns" },
            { label: "Create Campaign" },
          ]}
        />
      </div>
      <div className=" mx-auto bg-white  p-2 min-h-[calc(100vh-64px)] flex flex-col">
        <div className="mb-4">
          <div className="flex items-center gap-4 mb-2">
            <div className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">
              Step {step} of {steps.length}
            </div>
            <div className="h-1 w-32 bg-zinc-200 rounded-full overflow-hidden">
              <div
                className="h-1 bg-zinc-900 rounded-full transition-all"
                style={{ width: `${(step / steps.length) * 100}%` }}
              />
            </div>
          </div>
          <div className="text-2xl font-bold text-zinc-900 mb-1">
            {steps[step - 1].title}
          </div>
          <div className="text-zinc-500 text-sm mb-2">
            {steps[step - 1].desc}
          </div>
        </div>
        <div className="flex-1">
          {step === 1 && (
            <div className="w-full">
              <div className="w-full md:w-1/2">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Campaign Name
                  </label>
                  <input
                    className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm"
                    value={form.name || "Q2 Auto Loan Recovery"}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm"
                    value={
                      form.desc ||
                      "Automated campaign for Q2 auto loan collections."
                    }
                    onChange={(e) =>
                      setForm((f) => ({ ...f, desc: e.target.value }))
                    }
                  />
                </div>
              </div>
              <div className="w-full">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Upload Method
                  </label>
                  <div className="flex gap-4 mb-4">
                    <button
                      className={`px-4 py-2 rounded-lg font-semibold border transition-colors ${
                        form.uploadType === "CSV"
                          ? "bg-zinc-900 text-white border-zinc-900"
                          : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50"
                      }`}
                      onClick={() =>
                        setForm((f) => ({ ...f, uploadType: "CSV" }))
                      }
                    >
                      CSV Upload
                    </button>
                    <button
                      className={`px-4 py-2 rounded-lg font-semibold border transition-colors ${
                        form.uploadType === "SFTP"
                          ? "bg-zinc-900 text-white border-zinc-900"
                          : "bg-white text-zinc-700 border-zinc-200 hover:bg-zinc-50"
                      }`}
                      onClick={() =>
                        setForm((f) => ({ ...f, uploadType: "SFTP" }))
                      }
                    >
                      SFTP
                    </button>
                  </div>
                  {form.uploadType === "CSV" ? (
                    <div className="mb-2">
                      <div
                        className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-300 rounded-xl bg-zinc-50 py-10 cursor-pointer hover:border-zinc-400 transition w-full"
                        style={{ maxWidth: "100%" }}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onClick={() =>
                          fileInputRef.current && fileInputRef.current.click()
                        }
                      >
                        <svg
                          width="36"
                          height="36"
                          fill="none"
                          className="mb-2"
                        >
                          <rect width="36" height="36" rx="8" fill="#F1F5F9" />
                          <path
                            d="M18 10v12m0 0l-4-4m4 4l4-4"
                            stroke="#18181B"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <rect
                            x="10"
                            y="26"
                            width="16"
                            height="2"
                            rx="1"
                            fill="#D4D4D8"
                          />
                        </svg>
                        {form.file ? (
                          <>
                            <div className="text-zinc-900 font-medium mb-1">
                              {form.file.name}
                            </div>
                            <button
                              className="text-xs text-blue-600 hover:underline mt-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFile();
                              }}
                            >
                              Remove
                            </button>
                          </>
                        ) : (
                          <>
                            <div className="text-zinc-700 font-medium">
                              Drag & drop your CSV file here
                            </div>
                            <div className="text-xs text-zinc-400 mt-1">
                              or click to browse
                            </div>
                          </>
                        )}
                        <input
                          type="file"
                          accept=".csv"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>
                      <a
                        href={sampleCsvUrl}
                        download
                        className="inline-block mt-3 text-xs text-blue-600 hover:underline"
                      >
                        Download Sample File
                      </a>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 mt-2">
                      <input
                        className="w-full px-3 py-2 border border-zinc-200 rounded-md font-inter text-sm"
                        placeholder="SFTP Host"
                        value={form.sftp.host}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            sftp: { ...f.sftp, host: e.target.value },
                          }))
                        }
                      />
                      <input
                        className="w-full px-3 py-2 border border-zinc-200 rounded-md font-inter text-sm"
                        placeholder="SFTP User"
                        value={form.sftp.user}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            sftp: { ...f.sftp, user: e.target.value },
                          }))
                        }
                      />
                      <input
                        className="w-full px-3 py-2 border border-zinc-200 rounded-md font-inter text-sm"
                        placeholder="SFTP Path"
                        value={form.sftp.path}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            sftp: { ...f.sftp, path: e.target.value },
                          }))
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-2 bg-white rounded-xl shadow font-inter text-sm">
                  <thead>
                    <tr className="bg-zinc-50 text-zinc-700 text-sm text-left">
                      <th className="px-4 py-2 rounded-tl-xl">System Column</th>
                      <th className="px-4 py-2">Description</th>
                      <th className="px-4 py-2 rounded-tr-xl">CSV Column</th>
                    </tr>
                  </thead>
                  <tbody>
                    {systemColumns.map((col) => (
                      <tr
                        key={col}
                        className="bg-zinc-50 hover:bg-blue-50 transition rounded-xl"
                      >
                        <td className="px-4 py-2 font-medium text-zinc-900 whitespace-nowrap">
                          {col}
                        </td>
                        <td className="px-4 py-2 text-zinc-500">
                          {/* Random/placeholder description for now */}
                          {(() => {
                            switch (col) {
                              case "account_id":
                                return "Unique account identifier.";
                              case "customer_name":
                                return "Full name of the customer.";
                              case "primary_phone_number":
                                return "Primary contact number.";
                              case "email_address":
                                return "Primary email address.";
                              case "dpd":
                                return "Days past due.";
                              case "amount_due":
                                return "Outstanding balance.";
                              case "product_type":
                                return "Type of product/loan.";
                              case "timezone":
                                return "Customer timezone.";
                              default:
                                return "Column description.";
                            }
                          })()}
                        </td>
                        <td className="px-4 py-2">
                          <select
                            className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm"
                            value={columnMap[col]}
                            onChange={(e) =>
                              setColumnMap((prev) => ({
                                ...prev,
                                [col]: e.target.value,
                              }))
                            }
                          >
                            <option value="">Select column</option>
                            {mockCsvHeaders.map((header) => (
                              <option key={header} value={header}>
                                {header}
                              </option>
                            ))}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {step === 3 && showAIMagic && (
            <AIMagic
              tasks={aiTasks}
              onComplete={() => {
                setShowAIMagic(false);
                setStep(4);
              }}
            />
          )}
          {step === 4 && (
            <div className="flex flex-col md:flex-row gap-10 w-full">
              {/* Segments List */}
              <div className="w-full md:w-[30%] flex flex-col gap-4">
                <div className="text-lg font-bold text-zinc-900 mb-2">
                  Segments
                </div>
                {mockSegments.map((seg, idx) => (
                  <div
                    key={seg.name}
                    className="bg-zinc-50 border border-zinc-200 rounded-xl px-5 py-4 shadow-sm flex flex-col gap-2 relative"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <UserGroupIcon className="w-5 h-5 text-blue-500" />
                      <span className="font-semibold text-zinc-800 text-base">
                        {seg.name}
                      </span>
                      <span
                        className="ml-auto inline-flex items-center gap-1 cursor-pointer text-blue-700 hover:underline text-sm font-medium"
                        onClick={() => {
                          setShowAccountsModal(true);
                          setModalAccounts(mockAccounts);
                          setModalSegment(seg);
                        }}
                      >
                        <span>{seg.accounts}</span>
                        <span>accounts</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-700">
                      <CurrencyDollarIcon className="w-4 h-4 text-green-500" />
                      <span>
                        Value: $ {(seg.accounts * 1000).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <TagIcon className="w-4 h-4 text-zinc-400" />
                      <span className="inline-block bg-zinc-200 text-zinc-700 px-2 py-0.5 rounded text-xs font-semibold">
                        DPD: Early Delinquency
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Journey Canvas */}
              <div className="w-full md:w-[70%] flex flex-col items-left">
                <div className="text-lg font-bold text-zinc-900 mb-4">
                  Communication Journey
                </div>
                <JourneyCanvas
                  onNodeClick={setSelectedNode}
                  selectedNode={selectedNode}
                />
                <NodePropertiesPanel
                  node={selectedNode}
                  onClose={() => setSelectedNode(null)}
                />
              </div>
            </div>
          )}
          {step === 5 && (
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Campaign Duration Card */}
              <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-8 flex flex-col">
                <div className="text-xl font-bold text-zinc-900 mb-2 font-inter">
                  Campaign Duration
                </div>
                <div className="text-base text-zinc-500 mb-6 font-inter">
                  Set when your campaign should start and end
                </div>
                <div className="mb-6">
                  <label className="block text-base font-semibold mb-2 font-inter text-zinc-900">
                    Start Date
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                      <svg width="20" height="20" fill="none">
                        <path
                          d="M6 2v2M14 2v2M3 6h14M4 18h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1Z"
                          stroke="#A1A1AA"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <input
                      type="date"
                      className="w-full pl-10 pr-3 py-3 border border-zinc-200 rounded-lg font-inter text-base text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={startTime.split("T")[0]}
                      onChange={(e) =>
                        setStartTime(
                          e.target.value + (endTime.slice(10) || "T08:00")
                        )
                      }
                      placeholder="dd/mm/yyyy"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-base font-semibold mb-2 font-inter text-zinc-900">
                    End Date
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                      <svg width="20" height="20" fill="none">
                        <path
                          d="M6 2v2M14 2v2M3 6h14M4 18h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1Z"
                          stroke="#A1A1AA"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <input
                      type="date"
                      className="w-full pl-10 pr-3 py-3 border border-zinc-200 rounded-lg font-inter text-base text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={endTime.split("T")[0]}
                      onChange={(e) =>
                        setEndTime(
                          e.target.value + (endTime.slice(10) || "T20:00")
                        )
                      }
                      placeholder="dd/mm/yyyy"
                    />
                  </div>
                </div>
              </div>
              {/* Contact Hours Card */}
              <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm p-8 flex flex-col">
                <div className="text-xl font-bold text-zinc-900 mb-2 font-inter">
                  Contact Hours
                </div>
                <div className="text-base text-zinc-500 mb-6 font-inter">
                  Set the hours when contacts can be made
                </div>
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <label className="block text-base font-semibold mb-2 font-inter text-zinc-900">
                      Start Time
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                        <svg width="20" height="20" fill="none">
                          <circle
                            cx="10"
                            cy="10"
                            r="9"
                            stroke="#A1A1AA"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M10 5v5l3 3"
                            stroke="#A1A1AA"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                      <input
                        type="time"
                        className="w-full pl-10 pr-3 py-3 border border-zinc-200 rounded-lg font-inter text-base text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={businessStart}
                        onChange={(e) => setBusinessStart(e.target.value)}
                        placeholder="08:00"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="block text-base font-semibold mb-2 font-inter text-zinc-900">
                      End Time
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
                        <svg width="20" height="20" fill="none">
                          <circle
                            cx="10"
                            cy="10"
                            r="9"
                            stroke="#A1A1AA"
                            strokeWidth="1.5"
                          />
                          <path
                            d="M10 5v5l3 3"
                            stroke="#A1A1AA"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </span>
                      <input
                        type="time"
                        className="w-full pl-10 pr-3 py-3 border border-zinc-200 rounded-lg font-inter text-sm text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={businessEnd}
                        onChange={(e) => setBusinessEnd(e.target.value)}
                        placeholder="20:00"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-2 font-inter font-semibold text-base text-zinc-900">
                  Active Days
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                    (day, idx) => (
                      <button
                        key={day}
                        type="button"
                        className={`px-4 py-2 rounded-xl font-inter text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          (form.activeDays || []).includes(day)
                            ? "bg-blue-600 text-white"
                            : "bg-zinc-100 text-zinc-900 hover:bg-blue-50"
                        }`}
                        onClick={() => {
                          setForm((f) => {
                            const active = f.activeDays || [];
                            return {
                              ...f,
                              activeDays: active.includes(day)
                                ? active.filter((d) => d !== day)
                                : [...active, day],
                            };
                          });
                        }}
                      >
                        {day}
                      </button>
                    )
                  )}
                </div>
                <div className="text-xs text-zinc-500 mt-2">
                  Calls and messages will only be sent during these hours.
                </div>
              </div>
            </div>
          )}
        </div>
        {/* Sticky Next button */}
        <div className="sticky bottom-0 bg-white border-t border-zinc-200 p-4 z-10 -mx-10 rounded-b-xl">
          <div className="flex justify-end gap-2">
            {step > 1 && (
              <button className={secondaryBtn} onClick={handleBack}>
                Back
              </button>
            )}
            <button className={primaryBtn} onClick={handleNext}>
              {step === steps.length ? "Create" : "Next"}
            </button>
          </div>
        </div>
      </div>
      {/* Modal for accounts (root level, always overlays canvas/segments) */}
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
            <div className="text-2xl font-bold mb-6">
              Accounts in {modalSegment?.name}
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-zinc-100 rounded-xl">
                <thead>
                  <tr className="bg-zinc-50 text-zinc-700">
                    <th className="px-4 py-2 text-left">Account ID</th>
                    <th className="px-4 py-2 text-left">Customer Name</th>
                    <th className="px-4 py-2 text-left">Amount Due</th>
                    <th className="px-4 py-2 text-left">DPD</th>
                    <th className="px-4 py-2 text-left">Due Date</th>
                    <th className="px-4 py-2 text-left">Product Name</th>
                    <th className="px-4 py-2 text-left">Pay Off Amount</th>
                    <th className="px-4 py-2 text-left">Missed Installments</th>
                    <th className="px-4 py-2 text-left">Risk Score</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {modalAccounts.map((acc) => (
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
      {/* Inspect modal remains as is, already at z-70 and root level */}
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
