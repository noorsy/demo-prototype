import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircleIcon,
  CalendarDaysIcon,
  FunnelIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import logo from "./images/logo.png";

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

const steps = [
  {
    title: "Welcome",
    desc: "Welcome to Skit.ai",
    icon: "👋",
  },
  {
    title: "Creditor Details",
    desc: "Setup your organization profile",
    icon: "🏢",
  },
  {
    title: "Review Configuration",
    desc: "Review your AI assistant setup",
    icon: "📝",
  },
  {
    title: "AI Processing",
    desc: "AI analyzes and creates intelligent segments",
    icon: "🤖",
  },
  {
    title: "Complete",
    desc: "You're all set to start",
    icon: "✨",
  },
];

// Add the missing tasksList array
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

// Replace initialSegments and DPD logic with the provided actual segment data
const actualSegments = [
  {
    id: "SEG0: Vulnerable / Special Handling",
    logic:
      'Vulnerability_Flag IS TRUE OR account_notes CONTAIN keywords ("hardship", "illness", "dispute bureau", etc.)',
    characteristics:
      "Customer facing significant personal challenges; potential compliance/reputational risk.",
    focus:
      "Understanding, empathy, offering support/options, pausing standard collections.",
  },
  {
    id: "SEG1: High Priority - Broken Promises (PTP Failures)",
    logic:
      "Number_of_Broken_PTPs_Last_6_Months >= 1 AND Days_Since_Last_Broken_PTP <= 7 (or other short timeframe)",
    characteristics:
      "Explicit commitment made and not met recently. Potentially willing but facing new obstacles.",
    focus:
      "Direct, reference broken promise, understand reason, secure new firm commitment, reiterate importance.",
  },
  {
    id: "SEG2: High Potential / Active Engagement",
    logic:
      "Last_Customer_Response_Channel IS NOT NULL AND Days_Since_Last_Customer_Response <= 5 AND Last_Customer_Response_Sentiment IS Positive/Neutral",
    characteristics:
      "Recently engaged with client, potentially showing willingness to resolve.",
    focus:
      "Conversational, reference prior interaction, easy payment options, gratitude for engagement.",
  },
  {
    id: "SEG3: Forgetful / Early Stage Delinquency",
    logic:
      "DPD >= 5 AND DPD <= 30 AND Number_of_Broken_PTPs_Last_12_Months == 0 AND (Payment_History_Shows_Previous_On_Time_Payments OR Client_Risk_Score IS Low OR Client_Risk_Score IS NULL)",
    characteristics:
      "Likely good payers who missed a payment. Low history of delinquency. No recent high-risk flags.",
    focus:
      'Gentle, helpful reminders. "Looks like your payment is overdue. Pay easily here..."',
  },
  {
    id: "SEG4: Repeat Offenders / Consistent Late Payers",
    logic:
      "(DPD > 30) AND (Number_of_Previous_Delinquency_Cycles_Last_12_Months >= 2-3 OR Payment_History_Shows_Sporadic_Payments) OR (Number_of_Broken_PTPs_Last_12_Months >= 2 but not recent)",
    characteristics:
      "History of multiple delinquencies or broken promises over time.",
    focus:
      "More direct about overdue status, consequences (compliant), focus on payment plan or firm PTP.",
  },
  {
    id: "SEG5: High Risk / Significant Delinquency (Non-PTP Breakers)",
    logic: "(Client_Risk_Score IS High OR DPD > 60) AND NOT IN SEG1",
    characteristics:
      "Represents higher risk due to client scoring or prolonged delinquency, without a recent PTP break.",
    focus:
      "Professional, understand situation, negotiate payment plans/settlements, assertiveness based on risk/DPD.",
  },
  {
    id: "SEG6: Long-Term Low Engagement",
    logic:
      "Days_Since_Last_Customer_Response > 60 AND DPD > 120 AND NOT IN SEG0 or SEG1",
    characteristics:
      "Significantly past due with no recent engagement for an extended period.",
    focus:
      "Standard reminder messages; less personalization. Focus on re-engagement.",
  },
  {
    id: "SEG7: General Delinquency (Catch-All)",
    logic:
      "Accounts not fitting other segments AND DPD > Minimum_DPD_for_Action (e.g., 1 day)",
    characteristics:
      "Delinquent but doesn't meet specific criteria of other prioritized segments.",
    focus: "Standard collection messaging, tone adjusted primarily by DPD.",
  },
];

const dpdDisplayNames = {
  "Early Stage": "Early Delinquency",
  "Mid Stage": "Mid Delinquency",
  "Late Stage": "Late Delinquency",
  "Very Late Stage": "Very Late",
  "Pre-Chargeoff": "Pre-Chargeoff",
  "Post-Chargeoff": "Post-Chargeoff",
};

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
const recommendedAttributes = [
  {
    name: "risk_score",
    desc: "Enables risk-based segments (e.g., High/Medium/Low).",
  },
  {
    name: "first_default_date / total_defaults_count",
    desc: "Identifies first-time vs. repeat defaulters.",
  },
  {
    name: "last_payment_date / last_payment_amount",
    desc: "Provides payment history insights.",
  },
  { name: "language_preference", desc: "Enables multilingual outreach." },
];

// Implement the full AIMagicProgress UI
function AIMagicProgress({ tasksList, onComplete }) {
  const [current, setCurrent] = React.useState(0);
  const [subtaskIdx, setSubtaskIdx] = React.useState(0);
  // Calculate progress
  const totalSubtasks = tasksList.reduce(
    (sum, t) => sum + t.subtasks.length,
    0
  );
  const completedSubtasks =
    tasksList.slice(0, current).reduce((sum, t) => sum + t.subtasks.length, 0) +
    subtaskIdx;
  const progress = Math.min((completedSubtasks / totalSubtasks) * 100, 100);

  React.useEffect(() => {
    if (current < tasksList.length) {
      if (subtaskIdx < tasksList[current].subtasks.length - 1) {
        const timeout = setTimeout(() => setSubtaskIdx(subtaskIdx + 1), 900);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setCurrent(current + 1);
          setSubtaskIdx(0);
        }, 1200);
        return () => clearTimeout(timeout);
      }
    } else {
      setTimeout(onComplete, 1200);
    }
  }, [current, subtaskIdx, tasksList, onComplete]);

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
          <div className="text-zinc-500 text-center max-w-base mb-2 text-base">
            Our AI is analyzing your attributes and dpd buckets to create
            intelligent segments for optimized collections.
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
                      <div className="text-xs text-blue-600 mt-1 flex items-center gap-2">
                        <span className="animate-pulse">
                          {task.subtasks[subtaskIdx]}
                        </span>
                        <span className="inline-block w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
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
                    ? `${subtaskIdx + 1}/${task.subtasks.length}`
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

const primaryBtn =
  "px-5 py-2 rounded-lg bg-zinc-900 text-white font-inter text-sm font-semibold hover:bg-black transition";
const secondaryBtn =
  "px-5 py-2 rounded-lg bg-zinc-200 text-zinc-900 font-inter text-sm font-semibold hover:bg-zinc-300 transition";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    creditorName: "NuBank",
    creditorPhone: "+1 555-123-4567",
    creditorEmail: "contact@nubank.com",
    creditorTimezone: "America/New_York",
    segment: "First-party",
    microSegment: "Auto Loan",
    channels: ["Voice", "SMS", "Email"],
    source: "SFTP",
    businessHours: [
      { day: "Monday", start: "09:00", end: "18:00" },
      { day: "Tuesday", start: "09:00", end: "18:00" },
      { day: "Wednesday", start: "09:00", end: "18:00" },
      { day: "Thursday", start: "09:00", end: "18:00" },
      { day: "Friday", start: "09:00", end: "18:00" },
      { day: "Saturday", start: "10:00", end: "14:00" },
      { day: "Sunday", start: "Closed", end: "Closed" },
    ],
  });
  const [showAIMagic, setShowAIMagic] = useState(false);
  const navigate = useNavigate();
  const [segments, setSegments] = useState(actualSegments);
  const [selectedDPD, setSelectedDPD] = useState("Early Stage");

  // Update steps: add Segments step after AI Magic
  const onboardingSteps = [
    ...steps.slice(0, 4),
    { title: "Segments", desc: "Review AI-generated segments", icon: "🔎" },
    steps[4], // Complete
  ];

  function handleNext() {
    if (step === 3) {
      setShowAIMagic(true);
    } else if (step === steps.length) {
      navigate("/dashboard");
    } else {
      setStep(step + 1);
    }
  }

  function handleBack() {
    if (step > 1) setStep(step - 1);
  }

  function handleSkipToDashboard() {
    navigate("/");
  }

  return (
    <div className="min-h-screen font-inter">
      {/* Custom Header for onboarding (not on welcome screen) */}
      {step !== 1 && (
        <header className="w-full flex items-center justify-between px-8 py-4 bg-white border-b border-zinc-100 mb-0 sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-3">
            {/* Logo - use SVG from /images/logo.svg */}
            <img
              src={logo}
              alt="Skit.ai Logo"
              className="w-50 h-5 object-contain block"
            />
          </div>
          <button
            className="text-sm font-semibold text-zinc-600 hover:text-blue-700 px-4 py-2 rounded transition border border-zinc-200 bg-zinc-50 hover:bg-zinc-100"
            onClick={() => (window.location.href = "/logout")}
          >
            Logout
          </button>
        </header>
      )}
      {step === 1 ? (
        // Welcome Screen
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="max-w-2xl mx-auto text-center px-4">
            <div className="text-6xl mb-8">👋</div>
            <h1 className="text-4xl font-bold mb-4">
              Welcome to skit.ai, {form.creditorName || "NuBank"}!
            </h1>
            <div className="text-xl text-gray-600 mb-8">
              We've customized Skit.ai for your needs.
              <br />
              Complete a quick setup to get started — or finish it anytime
              later.
            </div>
            <ul className="text-left text-lg text-gray-600 mb-12 space-y-4">
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Platform customized for you
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Guided setup to match your needs
              </li>
              <li className="flex items-center">
                <span className="mr-2">✓</span>
                Complete now or later from dashboard
              </li>
            </ul>
            <div className="flex items-center justify-center gap-6">
              <button
                onClick={handleNext}
                className={primaryBtn + " text-base px-8 py-3"}
              >
                Start Now
              </button>
              <button
                onClick={handleSkipToDashboard}
                className="text-base font-medium text-gray-600 hover:text-gray-900 underline"
              >
                Skip To Dashboard
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="mx-auto bg-white rounded-xl shadow p-0 flex max-h-[calc(100vh-2rem)] mt-8 overflow-hidden border border-zinc-100"
          style={{ maxWidth: "80vw", marginLeft: "10vw", marginRight: "10vw" }}
        >
          {/* Left: Stepper */}
          <div className="w-1/3 py-8 pl-8 border-r border-zinc-100 bg-zinc-50 rounded-l-xl flex flex-col min-h-full">
            <div className="sticky top-0 h-fit">
              <div className="text-zinc-900 font-semibold text-xl mb-2">
                Let's get you onboarded
              </div>
              <div className="text-zinc-500 text-xs mb-6">
                Complete your organization setup
              </div>
              <ol className="space-y-1">
                {onboardingSteps.map((stepObj, idx) => {
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
                            <CheckCircleIcon className="w-5 h-5 text-green-500" />
                          ) : (
                            <span className="text-lg">{stepObj.icon}</span>
                          )}
                        </div>
                        {idx < onboardingSteps.length - 1 && (
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
          <div className="flex-1 flex flex-col min-h-0 overflow-y-auto max-h-full">
            <div className="flex-1 p-5">
              {showAIMagic ? (
                <AIMagicProgress
                  tasksList={tasksList}
                  onComplete={() => {
                    setShowAIMagic(false);
                    setStep(5);
                  }}
                />
              ) : step === 2 ? (
                <div>
                  <h2 className="text-lg font-semibold mb-1">
                    Creditor Details
                  </h2>
                  <div className="text-zinc-500 text-sm mb-4">
                    Enter your organization's contact information and timezone.
                  </div>
                  <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Creditor Name
                      </label>
                      <input
                        className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm"
                        value={form.creditorName}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            creditorName: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Phone Number
                      </label>
                      <input
                        className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm"
                        value={form.creditorPhone}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            creditorPhone: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm"
                        value={form.creditorEmail}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            creditorEmail: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Timezone
                      </label>
                      <select
                        className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm"
                        value={form.creditorTimezone}
                        onChange={(e) =>
                          setForm((f) => ({
                            ...f,
                            creditorTimezone: e.target.value,
                          }))
                        }
                      >
                        <option value="America/New_York">
                          America/New_York
                        </option>
                        <option value="America/Chicago">America/Chicago</option>
                        <option value="America/Denver">America/Denver</option>
                        <option value="America/Los_Angeles">
                          America/Los_Angeles
                        </option>
                        <option value="Europe/London">Europe/London</option>
                        <option value="Asia/Kolkata">Asia/Kolkata</option>
                        <option value="Asia/Tokyo">Asia/Tokyo</option>
                        <option value="Australia/Sydney">
                          Australia/Sydney
                        </option>
                      </select>
                    </div>
                  </div>
                  {/* Business Hours Section */}
                  <div className="mb-6">
                    <h3 className="text-base font-semibold mb-1">
                      Business Hours
                    </h3>
                    <div className="text-zinc-500 text-xs mb-2">
                      Set your organization's business hours for each day.
                    </div>
                    <table className="min-w-full border-separate border-spacing-y-2 font-inter text-sm">
                      <thead>
                        <tr className="bg-zinc-50 text-zinc-700 text-sm">
                          <th className="px-4 py-2 text-left">Day</th>
                          <th className="px-4 py-2 text-left">Start Time</th>
                          <th className="px-4 py-2 text-left">End Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {form.businessHours.map((row, idx) => (
                          <tr
                            key={row.day}
                            className="bg-zinc-50 hover:bg-blue-50 transition rounded-xl"
                          >
                            <td className="px-4 py-2 font-medium text-zinc-900 whitespace-nowrap">
                              {row.day}
                            </td>
                            <td className="px-4 py-2">
                              <input
                                type={row.start === "Closed" ? "text" : "time"}
                                className="w-28 px-2 py-1 border border-zinc-200 rounded-md text-sm"
                                value={row.start}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setForm((f) => {
                                    const hours = [...f.businessHours];
                                    hours[idx].start = value;
                                    return { ...f, businessHours: hours };
                                  });
                                }}
                                disabled={row.start === "Closed"}
                              />
                            </td>
                            <td className="px-4 py-2">
                              <input
                                type={row.end === "Closed" ? "text" : "time"}
                                className="w-28 px-2 py-1 border border-zinc-200 rounded-md text-sm"
                                value={row.end}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  setForm((f) => {
                                    const hours = [...f.businessHours];
                                    hours[idx].end = value;
                                    return { ...f, businessHours: hours };
                                  });
                                }}
                                disabled={row.end === "Closed"}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {/* Attributes Section */}
                  <div className="mb-6">
                    <h3 className="text-base font-semibold mb-1">
                      Required Attributes
                    </h3>
                    <div className="text-zinc-500 text-xs mb-2">
                      These attributes are required for onboarding your
                      accounts.
                    </div>
                    <table className="min-w-full border-separate border-spacing-y-2 font-inter text-sm mb-4">
                      <thead>
                        <tr className="bg-zinc-50 text-zinc-700 text-sm">
                          <th className="px-4 py-2 text-left">
                            Attribute Name
                          </th>
                          <th className="px-4 py-2 text-left">Description</th>
                          <th className="px-4 py-2 text-left">Mandatory</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attributes.map((attr) => (
                          <tr
                            key={attr.name}
                            className="bg-zinc-50 hover:bg-blue-50 transition rounded-xl"
                          >
                            <td className="px-4 py-2 font-medium text-zinc-900 whitespace-nowrap">
                              {attr.name}
                            </td>
                            <td className="px-4 py-2 text-zinc-600">
                              {attr.desc}
                            </td>
                            <td className="px-4 py-2 text-xs text-zinc-400">
                              Yes
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <h4 className="text-base font-semibold mb-1 mt-6">
                      Recommended Attributes
                    </h4>
                    <div className="text-zinc-500 text-xs mb-2">
                      Adding these attributes will improve segmentation and
                      campaign performance.
                    </div>
                    <table className="min-w-full border-separate border-spacing-y-2 font-inter text-sm">
                      <thead>
                        <tr className="bg-zinc-50 text-zinc-700 text-sm">
                          <th className="px-4 py-2 text-center">Auto-create</th>
                          <th className="px-4 py-2 text-left">
                            Attribute Name
                          </th>
                          <th className="px-4 py-2 text-left">
                            Attribute Description
                          </th>
                          <th className="px-4 py-2 text-center">Mandatory</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recommendedAttributes.map((attr) => (
                          <tr
                            key={attr.name}
                            className="bg-zinc-50 hover:bg-blue-50 transition rounded-xl"
                          >
                            <td className="px-4 py-2 text-center">
                              <input
                                type="checkbox"
                                checked={false}
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
                              <span className="text-xs text-zinc-400">No</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : step === 3 ? (
                <div>
                  <h2 className="text-lg font-semibold mb-1">
                    Review Configuration
                  </h2>
                  <div className="text-zinc-500 text-sm mb-4">
                    Review your AI assistant's configuration before proceeding.
                  </div>

                  <div className="space-y-6">
                    {/* Segment Section - Read Only */}
                    <div className="bg-zinc-50 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Segment</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-zinc-500">
                            Segment
                          </label>
                          <div className="font-medium">{form.segment}</div>
                        </div>
                        <div>
                          <label className="text-sm text-zinc-500">
                            Micro-segment
                          </label>
                          <div className="font-medium">{form.microSegment}</div>
                        </div>
                      </div>
                    </div>

                    {/* Channels Section - Read Only */}
                    <div className="bg-zinc-50 rounded-lg p-4">
                      <h3 className="font-medium mb-2">
                        Communication Channels
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        {channelOptions.map((channel) => (
                          <div
                            key={channel.key}
                            className={`flex items-center p-3 rounded ${
                              form.channels.includes(channel.key)
                                ? "bg-white"
                                : "bg-white"
                            }`}
                          >
                            <span className="text-xl mr-3">{channel.icon}</span>
                            <div>
                              <div className="font-medium">{channel.key}</div>
                              <div className="text-xs text-zinc-500">
                                {channel.desc}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Data Source Section - Read Only */}
                    <div className="bg-zinc-50 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Data Source</h3>
                      <div className="font-medium">{form.source}</div>
                      {form.source === "SFTP" && (
                        <div className="text-sm text-zinc-600 mt-1">
                          <span className="font-semibold">Folder Path:</span>{" "}
                          /acme-corp
                        </div>
                      )}
                    </div>

                    {/* Account Upload Section - Read Only */}
                    <div className="bg-zinc-50 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Uploaded Accounts</h3>
                      <div className="border border-zinc-200 rounded-lg p-4 bg-white flex items-center gap-4">
                        <svg
                          className="w-6 h-6 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div className="flex-1">
                          <div className="text-sm text-zinc-900">
                            accounts_2024_q1.csv
                          </div>
                          <div className="text-xs text-zinc-500">
                            Uploaded on March 10, 2024
                          </div>
                        </div>
                        <div className="text-sm text-zinc-600">
                          <span className="font-semibold">1,234</span> accounts
                        </div>
                      </div>
                    </div>

                    {/* DPD Stages Section - Read Only */}
                    <div className="bg-zinc-50 rounded-lg p-4">
                      <h3 className="font-medium mb-2">DPD Stages</h3>
                      <div className="text-zinc-500 text-xs mb-2">
                        These are the delinquency stages (DPD buckets) for your
                        portfolio.
                      </div>
                      <table className="min-w-full border-separate border-spacing-y-2 font-inter text-sm">
                        <thead>
                          <tr className="bg-zinc-100 text-zinc-700 text-sm">
                            <th className="px-4 py-2 text-left">Stage Name</th>
                            <th className="px-4 py-2 text-left">From (days)</th>
                            <th className="px-4 py-2 text-left">To (days)</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white">
                            <td className="px-4 py-2">Early Stage</td>
                            <td className="px-4 py-2">5</td>
                            <td className="px-4 py-2">20</td>
                          </tr>
                          <tr className="bg-white">
                            <td className="px-4 py-2">Mid Stage</td>
                            <td className="px-4 py-2">21</td>
                            <td className="px-4 py-2">40</td>
                          </tr>
                          <tr className="bg-white">
                            <td className="px-4 py-2">Late Stage</td>
                            <td className="px-4 py-2">41</td>
                            <td className="px-4 py-2">60</td>
                          </tr>
                          <tr className="bg-white">
                            <td className="px-4 py-2">Very Late Stage</td>
                            <td className="px-4 py-2">61</td>
                            <td className="px-4 py-2">90</td>
                          </tr>
                          <tr className="bg-white">
                            <td className="px-4 py-2">Pre-Chargeoff</td>
                            <td className="px-4 py-2">91</td>
                            <td className="px-4 py-2">120</td>
                          </tr>
                          <tr className="bg-white">
                            <td className="px-4 py-2">Post-Chargeoff</td>
                            <td className="px-4 py-2">121</td>
                            <td className="px-4 py-2">180</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : step === 5 ? (
                <div className="h-full flex flex-col">
                  <div className="flex-1 p-5">
                    <div className="mb-2">
                      <h2 className="text-xl font-bold text-zinc-900 mb-1">
                        AI Generated Segments
                      </h2>
                      <div className="text-zinc-500 text-sm mb-4">
                        Review and manage the segments generated by AI for your
                        portfolio.
                      </div>
                    </div>
                    <div className="flex flex-col gap-6">
                      {actualSegments.map((seg, idx) => (
                        <div
                          key={seg.id}
                          className="bg-white border border-zinc-200 rounded-2xl p-6 flex flex-col gap-3 shadow-sm"
                        >
                          <div className="text-lg font-bold text-blue-800 mb-2 truncate">
                            {seg.id}
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-start gap-2">
                              <span className="text-xs font-semibold text-zinc-500 min-w-[120px]">
                                Primary Logic
                              </span>
                              <span className="text-sm text-zinc-700 font-mono bg-blue-50 px-2 py-1 rounded break-words">
                                {seg.logic}
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-xs font-semibold text-zinc-500 min-w-[120px]">
                                Key Characteristics
                              </span>
                              <span className="text-sm text-zinc-700 bg-zinc-50 px-2 py-1 rounded break-words">
                                {seg.characteristics}
                              </span>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-xs font-semibold text-zinc-500 min-w-[120px]">
                                Messaging Focus
                              </span>
                              <span className="text-sm text-zinc-700 bg-green-50 px-2 py-1 rounded break-words">
                                {seg.focus}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Sticky Go to Dashboard button */}
                  <div className="sticky bottom-0 bg-white border-t border-zinc-200 p-4 z-10">
                    <div className="flex justify-end">
                      <button className={primaryBtn} onClick={() => setStep(6)}>
                        Finish Setup
                      </button>
                    </div>
                  </div>
                </div>
              ) : step === 6 ? (
                // Setup Complete screen
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-6">🎉</div>
                    <h2 className="text-2xl font-bold mb-4">Setup Complete!</h2>
                    <p className="text-zinc-600 mb-8">
                      Your AI assistant is ready to start working with your
                      portfolio.
                    </p>
                    <button
                      className={primaryBtn + " px-8 py-3"}
                      onClick={() => navigate("/")}
                    >
                      Go to Dashboard
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
            {/* Navigation Buttons */}
            {!showAIMagic && step !== 1 && step !== 6 && step !== 5 && (
              <div className="sticky bottom-0 bg-white border-t border-zinc-200 p-4">
                <div className="flex justify-between">
                  <button className={secondaryBtn} onClick={handleBack}>
                    Back
                  </button>
                  <button className={primaryBtn} onClick={handleNext}>
                    {step === onboardingSteps.length - 2 ? "Next" : "Next"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
