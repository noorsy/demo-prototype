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

const steps = [
  {
    title: "Assistant Details",
    desc: "Update your assistant information with name and phone",
    icon: CpuChipIcon,
  },
  {
    title: "Data Attributes",
    desc: "Select which fields to use for AI-powered customer segmentation",
    icon: Cog6ToothIcon,
  },
  {
    title: "Knowledge and Inputs",
    desc: "Upload documents and configure knowledge sources and guardrails",
    icon: CpuChipIcon,
  },
  {
    title: "Segmentation",
    desc: "Build smart customer segments using rule-based logic",
    icon: PresentationChartLineIcon,
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
    if (step < 4) {
      setStep(step + 1);
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
    if (step === 1) return "25%";
    if (step === 2) return "50%";
    if (step === 3) return "75%";
    if (step === 4) return "100%";
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

            {/* Choose Your Voice Assistant Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Choose Your Voice Assistant
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Select the perfect voice personality for your AI assistant
              </p>

              <div className="grid grid-cols-2 gap-4">
                {voiceAssistants.map((voice) => (
                  <div
                    key={voice.name}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      form.selectedVoice === voice.name
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() =>
                      setForm((f) => ({ ...f, selectedVoice: voice.name }))
                    }
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <UserIcon className="w-6 h-6 text-gray-600" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-gray-900">
                            {voice.name}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <button className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                              <PlayIcon className="w-4 h-4 text-white" />
                            </button>
                            {form.selectedVoice === voice.name ? (
                              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                <CheckIcon className="w-3 h-3 text-white" />
                              </div>
                            ) : (
                              <div className="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {voice.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
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

            {/* Knowledge and Inputs Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Knowledge and Inputs
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Upload documents and configure knowledge sources for your AI
                assistant
              </p>

              {/* Knowledge Sources */}
              <div className="mb-8">
                <h4 className="text-md font-semibold text-gray-900 mb-2">
                  Knowledge Sources
                </h4>
                <p className="text-gray-600 text-sm mb-6">
                  What knowledge sources should the AI Agent use to answer
                  questions for your chosen topics and use-cases
                </p>

                {/* Search Bar */}
                <div className="mb-6">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search your web site"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Add Knowledge Sources */}
                <div className="mb-6">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                        />
                      </svg>
                      <span>Add URL</span>
                    </button>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors">
                      <DocumentIcon className="w-4 h-4" />
                      <span>Add Document</span>
                    </button>
                  </div>
                </div>

                {/* Sample Knowledge Sources */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <GlobeAltIcon className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-mono text-gray-900">
                        https://www.boostmobile.ai/billing
                      </span>
                    </div>
                    <button className="text-red-500 hover:text-red-700">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <DocumentIcon className="w-5 h-5 text-gray-500" />
                      <span className="text-sm font-mono text-gray-900">
                        Payment procedures.pdf
                      </span>
                    </div>
                    <button className="text-red-500 hover:text-red-700">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* GuardRails Section */}
              <div className="mb-8">
                <h4 className="text-md font-semibold text-gray-900 mb-2">
                  Guardrails
                </h4>
                <p className="text-gray-600 text-sm mb-6">
                  Configure safety measures and business rules for your AI
                  assistant
                </p>

                {/* System GuardRails */}
                <div className="mb-6">
                  <h5 className="text-md font-medium text-gray-900 mb-3">
                    System Guardrails
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-900">
                            Hallucination
                          </span>
                          <span className="text-xs text-gray-500">
                            Type: System guardrail
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          2
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Content: I unfor...
                        </span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                          </svg>
                        </button>
                        <button className="text-gray-300 cursor-not-allowed">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button className="text-gray-300 cursor-not-allowed">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-900">
                            Moderation API
                          </span>
                          <span className="text-xs text-gray-500">
                            Type: System guardrail
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          2
                        </span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                          </svg>
                        </button>
                        <button className="text-gray-300 cursor-not-allowed">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button className="text-gray-300 cursor-not-allowed">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Custom GuardRails */}
                <div className="mb-6">
                  <h5 className="text-md font-medium text-gray-900 mb-3">
                    Custom GuardRails
                  </h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-900">
                            Bad User
                          </span>
                          <span className="text-xs text-gray-500">
                            Type: Custom
                          </span>
                          <span className="text-xs text-gray-500">
                            Model: gpt-4o
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          3
                        </span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                          </svg>
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-gray-900">
                            Competitors
                          </span>
                          <span className="text-xs text-gray-500">
                            Type: Custom
                          </span>
                          <span className="text-xs text-gray-500">
                            Model: gpt-4o
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          1
                        </span>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                            />
                          </svg>
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add Custom GuardRail Button */}
                <div className="flex justify-center">
                  <button className="flex items-center space-x-2 px-6 py-3 border-2 border-dashed border-gray-300 text-gray-600 rounded-lg hover:border-gray-400 hover:text-gray-700 transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span>Add Custom GuardRail</span>
                  </button>
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
        ) : step === 4 ? (
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

            {/* Segmentation Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Build Smart Customer Segments
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Use rule-based logic to create intelligent customer segments for
                targeted outreach
              </p>

              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Create New Segment
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Segment Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., High-Value Customers"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Segment Rules
                      </label>
                      <textarea
                        placeholder="Define your segment rules here..."
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                      />
                    </div>
                    <button className="px-6 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
                      Create Segment
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-4">
                    Existing Segments
                  </h4>
                  <p className="text-gray-600 text-sm mb-4">
                    No segments created yet. Create your first segment above.
                  </p>
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
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                onClick={() => navigate("/")}
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
