import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckIcon,
  ChevronDownIcon,
  PlusIcon,
  TrashIcon,
  DocumentIcon,
  UserIcon,
  GlobeAltIcon,
  Cog6ToothIcon,
  CpuChipIcon,
  PresentationChartLineIcon,
  ArrowLeftIcon,
  PlayIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChatBubbleLeftRightIcon,
  UserCircleIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";

const voiceAssistants = [
  {
    name: "Susan",
    description:
      "A friendly 30 year old AI Assistant with a warm, approachable tone",
    selected: true,
  },
  {
    name: "Marcus",
    description:
      "A friendly 30 year old AI Assistant with a warm, approachable tone",
    selected: false,
  },
  {
    name: "Scarlett",
    description:
      "A friendly 30 year old AI Assistant with a warm, approachable tone",
    selected: false,
  },
  {
    name: "Jean",
    description:
      "A friendly 30 year old AI Assistant with a warm, approachable tone",
    selected: false,
  },
  {
    name: "Parker",
    description:
      "A friendly 30 year old AI Assistant with a warm, approachable tone",
    selected: false,
  },
  {
    name: "Clark",
    description:
      "A friendly 30 year old AI Assistant with a warm, approachable tone",
    selected: false,
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

// AIMagicProgress Component
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
            Our AI is analyzing your portfolio data to create intelligent segments for optimized collections.
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
                    ? "flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-5 py-3 shadow-sm"
                    : state === "active"
                    ? "flex items-center justify-between rounded-xl border border-blue-200 bg-blue-50 px-5 py-3 shadow-sm animate-pulse"
                    : "flex items-center justify-between rounded-xl border border-zinc-100 bg-zinc-50 px-5 py-3 shadow-sm opacity-70"
                }
              >
                <div className="flex items-center gap-4">
                  <span
                    className={
                      state === "done"
                        ? "bg-gray-100 text-gray-600 rounded-full p-1"
                        : state === "active"
                        ? "bg-blue-100 text-blue-600 rounded-full p-1"
                        : "bg-zinc-100 text-zinc-400 rounded-full p-1"
                    }
                  >
                    {state === "done" ? (
                      <CheckIcon className="w-5 h-5 text-green-500" />
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
                      <div className="text-xs text-gray-600 mt-1">
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

// Sample segments that will be shown after AI processing
const generatedSegments = [
  {
    id: "SEG1: High Priority - Broken Promises (PTP Failures)",
    logic: "Number_of_Broken_PTPs_Last_6_Months >= 1 AND Days_Since_Last_Broken_PTP <= 7",
    characteristics: "Explicit commitment made and not met recently. Potentially willing but facing new obstacles.",
    focus: "Direct, reference broken promise, understand reason, secure new firm commitment, reiterate importance.",
    accounts: 1247
  },
  {
    id: "SEG2: High Potential / Active Engagement", 
    logic: "Last_Customer_Response_Channel IS NOT NULL AND Days_Since_Last_Customer_Response <= 5",
    characteristics: "Recently engaged with client, potentially showing willingness to resolve.",
    focus: "Conversational, reference prior interaction, easy payment options, gratitude for engagement.",
    accounts: 892
  },
  {
    id: "SEG3: Forgetful / Early Stage Delinquency",
    logic: "DPD >= 5 AND DPD <= 30 AND Number_of_Broken_PTPs_Last_12_Months == 0",
    characteristics: "Likely good payers who missed a payment. Low history of delinquency.",
    focus: "Gentle, helpful reminders. \"Looks like your payment is overdue. Pay easily here...\"",
    accounts: 2156
  },
  {
    id: "SEG4: Repeat Offenders / Consistent Late Payers",
    logic: "(DPD > 30) AND (Number_of_Previous_Delinquency_Cycles_Last_12_Months >= 2-3)",
    characteristics: "History of multiple delinquencies or broken promises over time.",
    focus: "More direct about overdue status, consequences (compliant), focus on payment plan or firm PTP.",
    accounts: 743
  }
];

const steps = [
  {
    title: "Assistant Details",
    desc: "Configure your assistant information and settings",
    icon: CpuChipIcon,
  },
  {
    title: "Data Attributes & Workflow",
    desc: "Configure data fields, workflow instructions, and knowledge base",
    icon: Cog6ToothIcon,
  },
  {
    title: "Input Collection",
    desc: "Upload training data and configure portfolio modeling",
    icon: DocumentIcon,
  },
  {
    title: "AI Processing",
    desc: "AI analysis and segment generation",
    icon: PresentationChartLineIcon,
  },
  {
    title: "Generated Segments",
    desc: "Review AI-generated customer segments",
    icon: FunnelIcon,
  },
];

export default function CreateAssistant() {
  const [step, setStep] = useState(0); // Start at 0 for welcome page
  const [form, setForm] = useState({
    name: "Q2 Auto Loan Recovery",
    desc: "Automated campaign for Q2 auto loan collections.",
    creditorName: "",
    creditorPhone: "+1 555-123-4567",
    creditorEmail: "contact@nubank.com",
    creditorTimezone: "America/New_York",
    segment: "First Party",
    microSegment: "Auto Loan",
    selectedVoice: "Susan",
  });
  const [collapsedSections, setCollapsedSections] = useState({
    mandatory: false,
    aiRecommended: true,
    custom: true,
  });
  const [showCustomFields, setShowCustomFields] = useState(false);
  const [customFields, setCustomFields] = useState([]);
  const [newCustomField, setNewCustomField] = useState({
    name: "",
    description: "",
  });
  
  // Build Workflow states
  const [workflowInstructions, setWorkflowInstructions] = useState("");
  const [uploadedRecordings, setUploadedRecordings] = useState([]);
  const [modelingChoice, setModelingChoice] = useState(""); // "manual" or "ai"
  
  // Portfolio Modeling states
  const [uploadedCSV, setUploadedCSV] = useState(null);
  const [showPortfolioAI, setShowPortfolioAI] = useState(false);
  const [portfolioProcessingComplete, setPortfolioProcessingComplete] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem("creditorName");
    const storedEmail = localStorage.getItem("creditorEmail");
    if (storedName) {
      setForm((f) => ({
        ...f,
        creditorName: storedName,
        creditorEmail:
          storedEmail ||
          `contact@${storedName.toLowerCase().replace(/\s+/g, "")}.com`,
      }));
    } else {
      window.location.href = "/setup-creditor";
    }
  }, []);

  function handleNext() {
    if (step === 3 && modelingChoice) {
      // Start portfolio modeling AI processing
      setShowPortfolioAI(true);
    } else if (step < 4) {
      setStep(step + 1);
    } else if (step === 4) {
      // Complete setup and redirect to home
      navigate("/");
    }
  }

  function handleBack() {
    if (step > 0) {
      setStep(step - 1);
    }
  }

  function handleStartSetup() {
    setStep(1);
  }

  function handleDoLater() {
    navigate("/");
  }

  // Helper function to get current step display number
  const getCurrentStepNumber = () => {
    if (step === 0) return 0;
    return step;
  };

  // Helper function to get progress bar width
  const getProgressWidth = () => {
    if (step === 0) return "0%";
    if (step === 1) return "20%";
    if (step === 2) return "40%";
    if (step === 3) return "60%";
    if (step === 4) return "80%";
    if (step === 5) return "100%";
    return "0%";
  };

  // Helper function to toggle section collapse
  const toggleSection = (section) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Helper function to add custom field
  const addCustomField = () => {
    if (newCustomField.name.trim() && newCustomField.description.trim()) {
      setCustomFields((prev) => [
        ...prev,
        { ...newCustomField, id: Date.now() },
      ]);
      setNewCustomField({ name: "", description: "" });
      setShowCustomFields(false);
    }
  };

  // Helper function to remove custom field
  const removeCustomField = (id) => {
    setCustomFields((prev) => prev.filter((field) => field.id !== id));
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left: Stepper - Only show when not on welcome page */}
      {step > 0 && (
        <div className="w-1/3 py-8 pl-8 border-r border-gray-200 bg-white flex flex-col min-h-full">
          <div className="sticky top-0 h-fit">
            {/* Logo */}
            <div className="mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg font-bold">S</span>
                </div>
                <span className="text-xl font-bold text-gray-900">skit.ai</span>
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-6">
                Let's get your onboarded
              </h1>
              <ol className="space-y-6">
                {steps.map((stepObj, idx) => {
                  const isCompleted = step > idx + 1;
                  const isCurrent = step === idx + 1;
                  return (
                    <li key={stepObj.title} className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-8 h-8 flex items-center justify-center rounded-full mb-2 transition-all border-2 ${
                            isCompleted
                              ? "bg-green-100 text-green-700 border-green-300"
                              : isCurrent
                              ? "bg-blue-100 text-blue-600 border-blue-400"
                              : "bg-gray-100 text-gray-400 border-gray-200"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckIcon className="w-5 h-5 text-green-700" />
                          ) : (
                            <stepObj.icon className="w-5 h-5" />
                          )}
                        </div>
                        {idx < steps.length - 1 && (
                          <div
                            className={`w-0.5 h-16 ${
                              isCompleted ? "bg-green-200" : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>
                      <div>
                        <div
                          className={`font-medium text-base ${
                            isCurrent
                              ? "text-blue-600 font-semibold"
                              : isCompleted
                              ? "text-green-700 font-semibold"
                              : "text-gray-400"
                          }`}
                        >
                          {stepObj.title}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 max-w-[200px] leading-relaxed">
                          {stepObj.desc}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>

              {/* Back to Homepage button */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="flex items-center text-gray-600 hover:text-gray-900 transition-colors">
                  <ArrowLeftIcon className="w-4 h-4 mr-2" />
                  Back to Homepage
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Right: Content Area */}
      <div className={`${step > 0 ? "flex-1" : "w-full"} p-8`}>
        {step === 0 ? (
          // Welcome Page
          <div className="max-w-4xl mx-auto text-center">
            {/* Logo */}
            <div className="mb-8 flex justify-center">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">S</span>
                </div>
                <span className="text-3xl font-bold text-gray-900">
                  skit.ai
                </span>
              </div>
            </div>

            {/* Welcome Content */}
            <div className="mb-12">
              <div className="text-6xl mb-6">👋</div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to skit.ai, {form.creditorName || "Acme Auto"}!
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                We've customized Skit.ai for your needs.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Complete a quick setup to get started — or finish it anytime
                later.
              </p>
            </div>

            {/* Key Features */}
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Platform customized for you
                  </h3>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Guided setup to match your needs
                  </h3>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Complete now or later from dashboard
                  </h3>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="px-6 py-4 bg-gray-900 text-white rounded-lg font-base hover:bg-gray-800 transition-colors text-lg"
                onClick={handleStartSetup}
              >
                Start Setup
              </button>
              <button
                className="px-6 py-4 border border-gray-300 text-gray-700 rounded-lg font-base hover:bg-gray-50 transition-colors text-lg"
                onClick={handleDoLater}
              >
                I'll do it later
              </button>
            </div>
          </div>
        ) : step === 1 ? (
          <div>
            {/* Step Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Step {getCurrentStepNumber()} of 4
              </h2>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: getProgressWidth() }}
                ></div>
              </div>
            </div>

            {/* Assistant Details Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Assistant Details
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Set up your assistant's name, description, and communication
                preferences
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assistant name
                  </label>
                  <input
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    placeholder="Enter assistant name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assistant Description
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    value={form.desc}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, desc: e.target.value }))
                    }
                    rows={3}
                    placeholder="Enter assistant description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Segment
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      value={form.segment}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, segment: e.target.value }))
                      }
                    >
                      <option value="First Party">First Party</option>
                      <option value="Third Party">Third Party</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Micro Segment
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      value={form.microSegment}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          microSegment: e.target.value,
                        }))
                      }
                    >
                      <option value="Auto Loan">Auto Loan</option>
                      <option value="Mortgage">Mortgage</option>
                      <option value="Credit Card">Credit Card</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>



            {/* Action Buttons */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                onClick={handleNext}
              >
                Save & Continue →
              </button>
            </div>
          </div>
        ) : step === 2 ? (
          <div>
            {/* Step Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Step {getCurrentStepNumber()} of 4
              </h2>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: getProgressWidth() }}
                ></div>
              </div>
            </div>

            {/* \Data Attributes Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Data Attributes
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Select which fields to use for AI-powered customer segmentation
                and personalization.
              </p>

              {/* Pro Tip Box */}
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-purple-900 mb-1">
                      💡 Pro Tip: More Attributes = Better AI Predictions
                    </h4>
                    <p className="text-sm text-purple-700">
                      Additional customer data helps our AI create more
                      personalized and effective outreach strategies.
                    </p>
                  </div>
                </div>
              </div>

              {/* Attributes Summary */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-gray-600">
                  <strong>10</strong> Total Attributes Selected
                </span>
                <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                  Explore 200+ Additional Attributes
                </button>
              </div>

              {/* Mandatory Fields Section */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection("mandatory")}
                  className="flex items-center justify-between w-full text-left mb-4 group"
                >
                  <div className="flex items-center space-x-3">
                    <h4 className="text-md font-semibold text-gray-900">
                      Mandatory Fields
                    </h4>
                    <span className="text-xs text-gray-500">
                      These fields are essential for core functionality and
                      personalization
                    </span>
                  </div>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      collapsedSections.mandatory ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {!collapsedSections.mandatory && (
                  <div className="space-y-3">
                    {[
                      {
                        name: "account_id",
                        desc: "Unique identifier for each customer account",
                      },
                      {
                        name: "customer_name",
                        desc: "Full legal name for personalized communications",
                      },
                      {
                        name: "phone_number",
                        desc: "Primary contact phone number",
                      },
                      {
                        name: "account_balance",
                        desc: "Current outstanding balance",
                      },
                      { name: "email_address", desc: "Primary email contact" },
                      { name: "account_due", desc: "Amount currently due" },
                    ].map((field) => (
                      <div
                        key={field.name}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                              Mandatory
                            </span>
                            <code className="text-sm font-mono text-gray-900">
                              {field.name}
                            </code>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {field.desc}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <svg
                            className="w-5 h-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* AI-Recommended Fields Section */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection("aiRecommended")}
                  className="flex items-center justify-between w-full text-left mb-4 group"
                >
                  <div className="flex items-center space-x-3">
                    <h4 className="text-md font-semibold text-gray-900">
                      AI-Recommended Fields
                    </h4>
                    <span className="text-xs text-gray-500">
                      Select additional fields you plan to provide. These unlock
                      enhanced segmentation
                    </span>
                  </div>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      collapsedSections.aiRecommended ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {!collapsedSections.aiRecommended && (
                  <div className="space-y-3">
                    {[
                      {
                        name: "risk_score",
                        desc: "Credit risk assessment score (High/Medium/Low)",
                      },
                      {
                        name: "payment_history",
                        desc: "Historical payment patterns and behavioral trends",
                      },
                      {
                        name: "income_verification",
                        desc: "Verified income information for payment capacity",
                      },
                      {
                        name: "last_payment_date",
                        desc: "Date of most recent payment",
                      },
                      {
                        name: "employment_status",
                        desc: "Current employment status",
                      },
                      {
                        name: "debt_to_income_ratio",
                        desc: "Monthly debt payments to income ratio",
                      },
                    ].map((field) => (
                      <div
                        key={field.name}
                        className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
                      >
                        <div className="flex-1">
                          <code className="text-sm font-mono text-gray-900">
                            {field.name}
                          </code>
                          <p className="text-sm text-gray-600 mt-1">
                            {field.desc}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Custom Fields Section */}
              <div className="mb-6">
                <button
                  onClick={() => toggleSection("custom")}
                  className="flex items-center justify-between w-full text-left mb-4 group"
                >
                  <div className="flex items-center space-x-3">
                    <h4 className="text-md font-semibold text-gray-900">
                      Custom Fields
                    </h4>
                    <span className="text-xs text-gray-500">
                      Create custom data fields for enhanced segmentation
                    </span>
                  </div>
                  <ChevronDownIcon
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                      collapsedSections.custom ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {!collapsedSections.custom && (
                  <div>
                    {customFields.length === 0 && !showCustomFields ? (
                      // Empty State
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <PlusIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <h5 className="text-sm font-medium text-gray-900 mb-2">
                          No custom fields yet
                        </h5>
                        <p className="text-sm text-gray-500 mb-4">
                          Create custom data fields to enhance your segmentation
                          capabilities
                        </p>
                        <button
                          onClick={() => setShowCustomFields(true)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                        >
                          Create Custom Field
                        </button>
                      </div>
                    ) : showCustomFields ? (
                      // Create Custom Field Form
                      <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                        <h5 className="text-sm font-medium text-gray-900">
                          Create Custom Field
                        </h5>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Field Name
                            </label>
                            <input
                              type="text"
                              placeholder="e.g., Vehicle Type"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              value={newCustomField.name}
                              onChange={(e) =>
                                setNewCustomField((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <input
                              type="text"
                              placeholder="Brief description of the field"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              value={newCustomField.description}
                              onChange={(e) =>
                                setNewCustomField((prev) => ({
                                  ...prev,
                                  description: e.target.value,
                                }))
                              }
                            />
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={addCustomField}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
                          >
                            Add Field
                          </button>
                          <button
                            onClick={() => {
                              setShowCustomFields(false);
                              setNewCustomField({ name: "", description: "" });
                            }}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Display Custom Fields
                      <div className="space-y-3">
                        {customFields.map((field) => (
                          <div
                            key={field.id}
                            className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200"
                          >
                            <div className="flex-1">
                              <code className="text-sm font-mono text-gray-900">
                                {field.name}
                              </code>
                              <p className="text-sm text-gray-600 mt-1">
                                {field.description}
                              </p>
                            </div>
                            <button
                              onClick={() => removeCustomField(field.id)}
                              className="text-red-500 hover:text-red-700 transition-colors"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => setShowCustomFields(true)}
                          className="w-full px-4 py-2 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg text-sm font-medium hover:border-gray-400 hover:text-gray-700 transition-colors"
                        >
                          + Add Another Custom Field
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Build Workflow Section */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Build Workflow
                </h3>
                <p className="text-gray-600 text-sm mb-6">
                  Configure workflow instructions, knowledge base, and policies
                </p>

                {/* Instructions Section */}
                <div className="mb-8">
                  <h4 className="text-md font-semibold text-gray-900 mb-2">
                    Workflow Instructions
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Provide detailed instructions for your AI assistant's workflow and behavior
                  </p>
                  
                  <div className="mb-6">
                    <textarea
                      value={workflowInstructions}
                      onChange={(e) => setWorkflowInstructions(e.target.value)}
                      placeholder="Enter detailed instructions for your AI assistant's workflow, including conversation flow, compliance requirements, escalation procedures, and any specific guidelines..."
                      className="w-full h-40 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical"
                    />
                  </div>
                </div>

                {/* Knowledge Base & Policies */}
                <div className="mb-8">
                  <h4 className="text-md font-semibold text-gray-900 mb-2">
                    Knowledge Base & Policies
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Upload knowledge base documents, policies, and guardrails
                  </p>
                  
                  <div className="mb-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-sm text-gray-600 mb-2">
                          Drop documents here or click to browse
                        </p>
                        <p className="text-xs text-gray-500">
                          Supports PDF, DOC, DOCX, TXT files up to 25MB each
                        </p>
                        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                          Choose Files
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Guardrails Section */}
                <div className="mb-8">
                  <h4 className="text-md font-semibold text-gray-900 mb-2">
                    Compliance Guardrails
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    Upload compliance documents and guardrails to ensure regulatory adherence
                  </p>
                  
                  <div className="mb-6">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <p className="text-sm text-gray-600 mb-2">
                          Drop compliance documents here or click to browse
                        </p>
                        <p className="text-xs text-gray-500">
                          Supports PDF, DOC, DOCX, TXT files up to 25MB each
                        </p>
                        <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                          Choose Files
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-200">
                <button
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  onClick={handleBack}
                >
                  ← Back
                </button>
                <button
                  className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  onClick={handleNext}
                >
                  Save & Continue →
                </button>
              </div>
            </div>
          </div>
        ) : step === 3 ? (
          <div className="relative">
            {/* AI Processing Overlay */}
            {showPortfolioAI && (
              <div className="absolute inset-0 bg-white z-10 flex items-center justify-center">
                <AIMagicProgress
                  tasksList={tasksList}
                  onComplete={() => {
                    setShowPortfolioAI(false);
                    setPortfolioProcessingComplete(true);
                    setStep(4);
                  }}
                />
              </div>
            )}
            
            {/* Step Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Step {getCurrentStepNumber()} of 4
              </h2>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: getProgressWidth() }}
                ></div>
              </div>
            </div>

            {/* Input Collection Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Input Collection
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Upload training data and configure portfolio modeling to setup and train your assistant
              </p>

              {/* Account Details Upload */}
              <div className="mb-8">
                <h4 className="text-md font-semibold text-gray-900 mb-2">
                  Account Details Upload
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Upload your customer account details for portfolio analysis
                </p>
                
                <div className="mb-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h5 className="text-sm font-semibold text-blue-900 mb-1">Sample CSV Format</h5>
                        <p className="text-sm text-blue-800 mb-2">Download sample CSV template with required fields:</p>
                        <button className="text-sm text-blue-600 hover:text-blue-800 underline">
                          Download Sample CSV Template
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div 
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      uploadedCSV 
                        ? 'border-green-300 bg-green-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {uploadedCSV ? (
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 text-green-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm font-medium text-green-900 mb-1">
                          {uploadedCSV.name}
                        </p>
                        <p className="text-xs text-green-700 mb-4">
                          {uploadedCSV.records} records • {uploadedCSV.size}
                        </p>
                        <button 
                          onClick={() => setUploadedCSV(null)}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-gray-600 mb-2">
                          Drop your account CSV file here or click to browse
                        </p>
                        <p className="text-xs text-gray-500 mb-4">
                          CSV format, Account ID required for data correlation
                        </p>
                        <button 
                          onClick={() => {
                            // Simulate file upload
                            setUploadedCSV({
                              name: "account_details.csv",
                              records: "5,847",
                              size: "3.2 MB"
                            });
                          }}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Choose File
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Call Recordings Upload */}
              <div className="mb-8">
                <h4 className="text-md font-semibold text-gray-900 mb-2">
                  Call Recordings for Training
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Upload sample call recordings to train the LLM for better conversations
                </p>
                
                <div className="mb-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <div className="flex flex-col items-center">
                      <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                      <p className="text-sm text-gray-600 mb-2">
                        Drop audio files here or click to browse
                      </p>
                      <p className="text-xs text-gray-500">
                        Supports MP3, WAV, M4A files up to 50MB each
                      </p>
                      <button className="mt-4 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                        Choose Files
                      </button>
                    </div>
                  </div>
                </div>

                {/* Uploaded Recordings List */}
                {uploadedRecordings.length > 0 && (
                  <div className="space-y-3">
                    {uploadedRecordings.map((recording, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-center space-x-3">
                          <PlayIcon className="w-5 h-5 text-purple-500" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{recording.name}</div>
                            <div className="text-xs text-gray-500">{recording.duration} • {recording.size}</div>
                          </div>
                        </div>
                        <button 
                          onClick={() => setUploadedRecordings(uploadedRecordings.filter((_, i) => i !== index))}
                          className="text-red-500 hover:text-red-700"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Portfolio Modeling Choice */}
              <div className="mb-8">
                <h4 className="text-md font-semibold text-gray-900 mb-2">
                  Portfolio Modeling Approach
                </h4>
                <p className="text-gray-600 text-sm mb-6">
                  Choose how you want to create customer segments for your portfolio
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div 
                    className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      modelingChoice === 'manual' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setModelingChoice('manual')}
                  >
                    <div className="flex items-center mb-3">
                      <UserIcon className="w-6 h-6 text-blue-600 mr-3" />
                      <h5 className="text-lg font-semibold text-gray-900">Manual Setup</h5>
                    </div>
                    <p className="text-sm text-gray-600">
                      Manually configure segments and rules based on your business logic and experience
                    </p>
                  </div>
                  
                  <div 
                    className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      modelingChoice === 'ai' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setModelingChoice('ai')}
                  >
                    <div className="flex items-center mb-3">
                      <CpuChipIcon className="w-6 h-6 text-purple-600 mr-3" />
                      <h5 className="text-lg font-semibold text-gray-900">AI-Powered</h5>
                    </div>
                    <p className="text-sm text-gray-600">
                      Let AI analyze your portfolio data and automatically create optimized segments
                    </p>
                  </div>
                </div>
              </div>

              {/* AI-Powered Additional Data */}
              {modelingChoice === 'ai' && (
                <div className="mb-8 bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h4 className="text-md font-semibold text-purple-900 mb-2">
                    Additional Data for AI Analysis
                  </h4>
                  <p className="text-purple-800 text-sm mb-4">
                    Upload the following data to enhance AI-powered portfolio modeling (ensure Account ID correlation)
                  </p>
                  
                  <div className="space-y-4">
                    {/* Baseline Account Data */}
                    <div>
                      <label className="block text-sm font-medium text-purple-900 mb-2">
                        Baseline Account Data (Last 3 Months)
                      </label>
                      <p className="text-xs text-purple-700 mb-3">
                        Average agent data: Attempts, RPC, PTP, Kept-PTP, liquidation/cure by DPD, AHT/containment
                      </p>
                      <div className="border-2 border-dashed border-purple-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                        <svg className="w-8 h-8 text-purple-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <p className="text-sm text-purple-600">Upload baseline data CSV</p>
                        <button className="mt-2 px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600">
                          Choose File
                        </button>
                      </div>
                    </div>

                    {/* CRM Notes & Communications */}
                    <div>
                      <label className="block text-sm font-medium text-purple-900 mb-2">
                        CRM Notes & Prior Communications History
                      </label>
                      <p className="text-xs text-purple-700 mb-3">
                        Account notes, prior outcomes (PTP broken/kept), dispute/cease-and-desist records
                      </p>
                      <div className="border-2 border-dashed border-purple-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                        <svg className="w-8 h-8 text-purple-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="text-sm text-purple-600">Upload CRM communications CSV</p>
                        <button className="mt-2 px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600">
                          Choose File
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                onClick={handleBack}
              >
                ← Back
              </button>
              <button
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  modelingChoice && uploadedCSV
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handleNext}
                disabled={!modelingChoice || !uploadedCSV}
              >
                {modelingChoice && uploadedCSV ? 'Start AI Processing →' : 'Complete Requirements First'}
              </button>
            </div>
          </div>
        ) : step === 4 ? (
          <div className="relative">
            {/* AI Processing Overlay */}
            {showPortfolioAI && (
              <div className="absolute inset-0 bg-white z-10 flex items-center justify-center">
                <AIMagicProgress
                  tasksList={tasksList}
                  onComplete={() => {
                    setShowPortfolioAI(false);
                    setPortfolioProcessingComplete(true);
                    setStep(5);
                  }}
                />
              </div>
            )}
            
            {/* Step Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Step {getCurrentStepNumber()} of 5
              </h2>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: getProgressWidth() }}
                ></div>
              </div>
            </div>

            {/* Portfolio Modeling Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Portfolio Modeling
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Upload your portfolio data and choose your modeling approach
              </p>
              
              {/* Portfolio Modeling Choice */}
              <div className="mb-8">
                <h4 className="text-md font-semibold text-gray-900 mb-2">
                  Modeling Approach
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Choose how you want to create customer segments for your portfolio
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div 
                    className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      modelingChoice === 'manual' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setModelingChoice('manual')}
                  >
                    <div className="flex items-center mb-3">
                      <UserIcon className="w-6 h-6 text-blue-600 mr-3" />
                      <h5 className="text-lg font-semibold text-gray-900">Manual Setup</h5>
                    </div>
                    <p className="text-sm text-gray-600">
                      Manually configure segments and rules based on your business logic and experience
                    </p>
                  </div>
                  
                  <div 
                    className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      modelingChoice === 'ai' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setModelingChoice('ai')}
                  >
                    <div className="flex items-center mb-3">
                      <CpuChipIcon className="w-6 h-6 text-purple-600 mr-3" />
                      <h5 className="text-lg font-semibold text-gray-900">AI-Powered</h5>
                    </div>
                    <p className="text-sm text-gray-600">
                      Let AI analyze your portfolio data and automatically create optimized segments
                    </p>
                  </div>
                </div>
              </div>

              {/* CSV Upload Section */}
              <div className="mb-8">
                <h4 className="text-md font-semibold text-gray-900 mb-2">
                  Portfolio Data Upload
                </h4>
                <p className="text-gray-600 text-sm mb-4">
                  Upload your portfolio CSV file with customer data for analysis
                </p>
                
                {/* Upload Instructions */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h5 className="text-sm font-semibold text-blue-900 mb-1">Upload Requirements</h5>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Maximum 5,000 records</li>
                        <li>• CSV format only</li>
                        <li>• Include customer ID, name, phone, email, DPD, amount due</li>
                        <li>• File size limit: 10MB</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* File Upload Area */}
                <div className="mb-6">
                  <div 
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      uploadedCSV 
                        ? 'border-green-300 bg-green-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {uploadedCSV ? (
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 text-green-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm font-medium text-green-900 mb-1">
                          {uploadedCSV.name}
                        </p>
                        <p className="text-xs text-green-700 mb-4">
                          {uploadedCSV.records} records • {uploadedCSV.size}
                        </p>
                        <button 
                          onClick={() => setUploadedCSV(null)}
                          className="text-sm text-red-600 hover:text-red-800"
                        >
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <p className="text-sm text-gray-600 mb-2">
                          Drop your CSV file here or click to browse
                        </p>
                        <p className="text-xs text-gray-500 mb-4">
                          CSV files up to 10MB, maximum 5,000 records
                        </p>
                        <button 
                          onClick={() => {
                            // Simulate file upload
                            setUploadedCSV({
                              name: "portfolio_data.csv",
                              records: "4,238",
                              size: "2.1 MB"
                            });
                          }}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                          Choose File
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                onClick={handleBack}
              >
                ← Back
              </button>
              <button
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  modelingChoice && uploadedCSV
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handleNext}
                disabled={!modelingChoice || !uploadedCSV}
              >
                {modelingChoice && uploadedCSV ? 'Start Processing →' : 'Complete Requirements First'}
              </button>
            </div>
          </div>
        ) : step === 5 ? (
          <div>
            {/* Step Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Step {getCurrentStepNumber()} of 5
              </h2>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: getProgressWidth() }}
                ></div>
              </div>
            </div>
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI Generated Segments
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Review the intelligent segments created by AI for your portfolio
              </p>
              
              <div className="space-y-4">
                {generatedSegments.map((segment, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-blue-800 mb-2">
                          {segment.id}
                        </h4>
                        <div className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Accounts:</span> {segment.accounts.toLocaleString()}
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Logic</span>
                        <div className="text-sm text-gray-700 bg-blue-50 px-3 py-2 rounded mt-1 font-mono">
                          {segment.logic}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Characteristics</span>
                        <div className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded mt-1">
                          {segment.characteristics}
                        </div>
                      </div>
                      
                      <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Messaging Focus</span>
                        <div className="text-sm text-gray-700 bg-green-50 px-3 py-2 rounded mt-1">
                          {segment.focus}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>



            {/* Action Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                onClick={handleBack}
              >
                ← Back
              </button>
              <button
                className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                  modelingChoice && uploadedCSV
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                onClick={handleNext}
                disabled={!modelingChoice || !uploadedCSV}
              >
                {modelingChoice && uploadedCSV ? 'Start Processing →' : 'Complete Requirements First'}
              </button>
            </div>
          </div>
        ) : step === 5 ? (
          <div>
            {/* Step Header */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Step {getCurrentStepNumber()} of 5
              </h2>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: getProgressWidth() }}
                ></div>
              </div>
            </div>

            {/* Generated Segments Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                AI Generated Segments
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Review the intelligent segments created by AI for your portfolio
              </p>
              
              <div className="space-y-4">
                {generatedSegments.map((segment, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-semibold text-gray-900">
                            {segment.id}
                          </h4>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Early Stage
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          {segment.characteristics}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-gray-500">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                          </svg>
                          <span className="font-medium">4 Rules Applied</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span>John Doe</span>
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                          View Journey
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => navigate(`/workflows/segments/${segment.id.toLowerCase().replace(/[^a-z0-9]/g, '-')}/edit`)}
                          className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit Segment
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Completion Message */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckIcon className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Setup Complete!
              </h3>
              <p className="text-gray-600">
                Your AI assistant has been successfully configured with intelligent segments and workflow instructions.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between pt-6 border-t border-gray-200">
              <button
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                onClick={handleBack}
              >
                ← Back
              </button>
              <button
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                onClick={handleNext}
              >
                Complete Setup →
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
