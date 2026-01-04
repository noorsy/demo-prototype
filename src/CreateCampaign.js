import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  ArrowDownTrayIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  SparklesIcon,
  PlayIcon,
  EyeIcon,
  CalendarDaysIcon,
  ClockIcon,
  DocumentArrowUpIcon,
  ServerIcon,
  UserIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

const steps = [
  {
    id: 1,
    title: "Campaign Details",
    desc: "Assistant selection and campaign setup",
  },
  {
    id: 2,
    title: "Upload File",
    desc: "Upload or select files to begin processing",
  },
  { id: 3, title: "Map Columns", desc: "Map file and system columns" },
  { id: 4, title: "AI Processing", desc: "AI processing portfolio data" },
  {
    id: 5,
    title: "Preview Segments & Journey",
    desc: "Choose a customer segment and define how you'll reach them",
  },
  {
    id: 6,
    title: "Forecast & Schedule",
    desc: "View campaign forecasts and set schedule",
  },
];

const assistantOptions = [
  { id: "support-bot", name: "SupportBot" },
  { id: "sales-ai", name: "SalesAI" },
  { id: "feedback-bot", name: "FeedbackBot" },
  { id: "survey-genie", name: "SurveyGenie" },
  { id: "reminder-bot", name: "ReminderBot" },
];

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
  "Account ID",
  "Customer Name",
  "Phone",
  "Email",
  "Days Past Due",
  "Balance",
  "Product",
  "Time Zone",
];

const aiTasks = [
  {
    id: 1,
    title: "Portfolio Analysis",
    subtasks: [
      "Analyzing customer data patterns",
      "Processing payment histories",
      "Evaluating risk profiles",
    ],
  },
  {
    id: 2,
    title: "Segment Mapping",
    subtasks: [
      "Creating customer segments",
      "Mapping risk categories",
      "Optimizing segment boundaries",
    ],
  },
  {
    id: 3,
    title: "Journey Optimization",
    subtasks: [
      "Designing communication flows",
      "Optimizing contact strategies",
      "Setting timing preferences",
    ],
  },
  {
    id: 4,
    title: "Forecast Generation",
    subtasks: [
      "Generating recovery predictions",
      "Calculating success rates",
      "Creating timeline estimates",
    ],
  },
];

const sampleSegments = [
  {
    id: 1,
    title: "SEG5: High Risk / Significant Delinquency (Non-PTP Breakers)",
    category: "Early Delinquency",
    accounts: 1200,
    amount: "$1,200,000",
    journey: {
      steps: [
        {
          type: "communication",
          channel: "Voice",
          nodeName: "Voice 1",
          endTime: "6 PM IST",
        },
      ],
    },
  },
  {
    id: 2,
    title: "SEG3: Mid Risk / Moderate Delinquency",
    category: "Mid Delinquency",
    accounts: 850,
    amount: "$850,000",
    journey: {
      steps: [
        {
          type: "communication",
          channel: "SMS",
          nodeName: "SMS 1",
          endTime: "8 PM IST",
        },
      ],
    },
  },
  {
    id: 3,
    title: "SEG1: Low Risk / Early Delinquency",
    category: "Early Delinquency",
    accounts: 650,
    amount: "$650,000",
    journey: {
      steps: [
        {
          type: "communication",
          channel: "Email",
          nodeName: "Email 1",
          endTime: "9 PM IST",
        },
      ],
    },
  },
];

const mockJourneySteps = [
  {
    id: 1,
    user: "John Smith",
    phone: "+1 (555) 123-4567",
    amount: "$2,450",
    step: "Initial Voice Call",
    details: "Personalized greeting with account summary",
    recommendation: "Friendly tone, mention recent payment history",
    reachoutTime: "2:30 PM EST",
    status: "completed",
  },
  {
    id: 2,
    user: "Sarah Johnson",
    phone: "+1 (555) 234-5678",
    amount: "$1,890",
    step: "SMS Follow-up",
    details: "Payment reminder with easy pay link",
    recommendation: "Include payment options and deadline",
    reachoutTime: "4:45 PM EST",
    status: "completed",
  },
  {
    id: 3,
    user: "Mike Davis",
    phone: "+1 (555) 345-6789",
    amount: "$3,200",
    step: "Email Reminder",
    details: "Detailed payment breakdown with options",
    recommendation: "Professional tone, emphasize consequences",
    reachoutTime: "6:15 PM EST",
    status: "in-progress",
  },
  {
    id: 4,
    user: "Lisa Wilson",
    phone: "+1 (555) 456-7890",
    amount: "$1,650",
    step: "Second Voice Call",
    details: "Escalated conversation with payment plans",
    recommendation: "Empathetic approach, offer payment plans",
    reachoutTime: "8:00 PM EST",
    status: "pending",
  },
  {
    id: 5,
    user: "Robert Brown",
    phone: "+1 (555) 567-8901",
    amount: "$2,100",
    step: "Final Notice",
    details: "Last attempt before escalation",
    recommendation: "Urgent tone, clear next steps",
    reachoutTime: "9:30 PM EST",
    status: "pending",
  },
];

export default function CreateCampaign() {
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const [currentStep, setCurrentStep] = useState(1);
  const [stepAnimating, setStepAnimating] = useState(false);
  const [form, setForm] = useState({
    assistant: "SupportBot",
    name: "",
    virtualId: "",
    pacing: "Normal",
    pacingValue: 10, // emails per minute
    campaignType: "standard", // standard or ai-powered
  });

  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const [uploadMethod, setUploadMethod] = useState("csv");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [sftpConfig, setSftpConfig] = useState({
    host: "",
    username: "",
    filePath: "",
  });

  const [columnMappings, setColumnMappings] = useState({});
  const [aiProcessing, setAiProcessing] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [currentSubtaskIndex, setCurrentSubtaskIndex] = useState(0);
  const [selectedSegments, setSelectedSegments] = useState([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewSegment, setPreviewSegment] = useState(null);

  const [scheduleType, setScheduleType] = useState("immediate");
  const [scheduleConfig, setScheduleConfig] = useState({
    startDate: "",
    endDate: "",
    runContinuously: false,
  });

  // Animation effect when step changes
  useEffect(() => {
    setStepAnimating(true);
    const timer = setTimeout(() => setStepAnimating(false), 300);
    return () => clearTimeout(timer);
  }, [currentStep]);

  const handleBack = () => {
    if (currentStep === 1) {
      navigate("/campaigns");
    } else if (currentStep === 4 && aiProcessing) {
      // Don't allow going back during AI processing
      return;
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleNext = () => {
    if (currentStep === 3) {
      // Start AI processing
      setCurrentStep(4);
      setAiProcessing(true);
      setCompletedTasks([]);
      setCurrentTaskIndex(0);
      setCurrentSubtaskIndex(0);

      // Simulate AI tasks completing with subtasks - faster animation
      let taskIndex = 0;
      let subtaskIndex = 0;

      const processNextSubtask = () => {
        if (taskIndex < aiTasks.length) {
          const currentTask = aiTasks[taskIndex];

          if (subtaskIndex < currentTask.subtasks.length) {
            setTimeout(() => {
              setCurrentSubtaskIndex(subtaskIndex + 1);
              subtaskIndex++;
              processNextSubtask();
            }, 800); // Faster: reduced from 1500ms to 800ms
          } else {
            // Task completed
            setTimeout(() => {
              setCompletedTasks((prev) => [...prev, currentTask.id]);
              taskIndex++;
              subtaskIndex = 0;
              setCurrentTaskIndex(taskIndex);
              setCurrentSubtaskIndex(0);

              if (taskIndex < aiTasks.length) {
                processNextSubtask();
              } else {
                // All tasks completed
                setTimeout(() => {
                  setAiProcessing(false);
                }, 500);
              }
            }, 300); // Faster: reduced from 500ms to 300ms
          }
        }
      };

      processNextSubtask();
      return;
    }

    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finish campaign creation
      navigate("/campaigns");
    }
  };

  const handleFileUpload = (file) => {
    setUploadedFile(file);
    // Initialize column mappings
    const mappings = {};
    mockCsvHeaders.forEach((header, index) => {
      if (index < systemColumns.length) {
        mappings[systemColumns[index]] = header;
      }
    });
    setColumnMappings(mappings);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handlePreviewSegment = (segment) => {
    setPreviewSegment(segment);
    setShowPreviewModal(true);
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                  currentStep === step.id
                    ? "bg-gray-900 text-white"
                    : currentStep > step.id
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {currentStep > step.id ? (
                  <CheckCircleIcon className="w-5 h-5" />
                ) : (
                  step.id
                )}
              </div>
              <div className="ml-3 hidden md:block">
                <p
                  className={`text-sm font-medium ${
                    currentStep >= step.id ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {step.title}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 transition-all duration-300 ${
                  currentStep > step.id ? "bg-green-500" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div
      className={`transition-all duration-300 ${
        stepAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Campaign Details
          </h3>
          <p className="text-gray-600">
            Assistant selection and campaign setup
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left side - Form inputs */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700 mb-4">
                Campaign Configuration
              </h4>

              {/* Assistant Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assistant
                </label>
                <div className="relative">
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent appearance-none bg-white text-sm"
                    value={form.assistant}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, assistant: e.target.value }))
                    }
                  >
                    {assistantOptions.map((option) => (
                      <option key={option.id} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Campaign Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Campaign Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm"
                  value={form.name}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, name: e.target.value }))
                  }
                  placeholder="Enter campaign name"
                />
              </div>

              {/* Additional Details - Collapsible */}
              <div className="border border-gray-200 rounded-lg bg-gray-50">
                <button
                  onClick={() =>
                    setShowAdditionalDetails(!showAdditionalDetails)
                  }
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-700">
                    Additional Details
                  </span>
                  <ChevronDownIcon
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      showAdditionalDetails ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showAdditionalDetails && (
                  <div className="border-t border-gray-200 p-3 space-y-3 bg-white">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Virtual ID (Email Address)
                      </label>
                      <input
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm"
                        value={form.virtualId}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, virtualId: e.target.value }))
                        }
                        placeholder="Enter virtual email address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pacing
                      </label>
                      <div className="space-y-3">
                        <div className="relative">
                          <select
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent appearance-none bg-white text-sm"
                            value={form.pacing}
                            onChange={(e) =>
                              setForm((f) => ({ ...f, pacing: e.target.value }))
                            }
                          >
                            <option value="Slow">Slow</option>
                            <option value="Normal">Normal</option>
                            <option value="Fast">Fast</option>
                            <option value="Aggressive">Aggressive</option>
                            <option value="Custom">Custom</option>
                          </select>
                          <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>

                        {form.pacing === "Custom" && (
                          <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                              Emails per minute
                            </label>
                            <div className="flex items-center space-x-2">
                              <input
                                type="number"
                                min="1"
                                max="100"
                                className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent text-sm"
                                value={form.pacingValue}
                                onChange={(e) =>
                                  setForm((f) => ({
                                    ...f,
                                    pacingValue: parseInt(e.target.value) || 1,
                                  }))
                                }
                                placeholder="10"
                              />
                              <span className="text-xs text-gray-500">
                                emails/min
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Recommended: 5-20 emails per minute for optimal
                              deliverability
                            </p>
                          </div>
                        )}

                        {form.pacing !== "Custom" && (
                          <div className="text-xs text-gray-500">
                            {form.pacing === "Slow" && "~5 emails per minute"}
                            {form.pacing === "Normal" &&
                              "~10 emails per minute"}
                            {form.pacing === "Fast" && "~20 emails per minute"}
                            {form.pacing === "Aggressive" &&
                              "~50 emails per minute"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right side - Campaign Type Cards */}
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-gray-700 mb-4">
                Choose Campaign Type
              </h4>

              {/* Standard Campaign Card */}
              <div
                onClick={() =>
                  setForm((f) => ({ ...f, campaignType: "standard" }))
                }
                className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                  form.campaignType === "standard"
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 mt-0.5 ${
                      form.campaignType === "standard"
                        ? "border-gray-900 bg-gray-900"
                        : "border-gray-300"
                    }`}
                  >
                    {form.campaignType === "standard" && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-1">
                      Standard Campaign
                    </h5>
                    <p className="text-xs text-gray-600">
                      Traditional setup with manual configuration.
                    </p>
                  </div>
                </div>
              </div>

              {/* AI Powered Campaign Card */}
              <div
                onClick={() =>
                  setForm((f) => ({ ...f, campaignType: "ai-powered" }))
                }
                className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                  form.campaignType === "ai-powered"
                    ? "border-gray-900 bg-gray-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 mt-0.5 ${
                      form.campaignType === "ai-powered"
                        ? "border-gray-900 bg-gray-900"
                        : "border-gray-300"
                    }`}
                  >
                    {form.campaignType === "ai-powered" && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-medium text-gray-900">
                        AI Powered Campaign
                      </h5>
                      <SparklesIcon className="w-4 h-4 text-blue-500" />
                    </div>
                    <p className="text-xs text-gray-600">
                      Intelligent campaign with AI-driven optimization.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div
      className={`transition-all duration-300 ${
        stepAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      }`}
    >
      <div className="w-full">
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Upload File
          </h3>
          <p className="text-gray-600">
            Upload or select files to begin processing
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8">
          {/* Upload Method Tabs */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1 max-w-md mx-auto">
            <button
              onClick={() => setUploadMethod("csv")}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all ${
                uploadMethod === "csv"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <DocumentArrowUpIcon className="w-5 h-5 mr-2" />
              CSV Upload
            </button>
            <button
              onClick={() => setUploadMethod("sftp")}
              className={`flex-1 flex items-center justify-center py-2 px-4 rounded-md text-sm font-medium transition-all ${
                uploadMethod === "sftp"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <ServerIcon className="w-5 h-5 mr-2" />
              SFTP
            </button>
          </div>

          {uploadMethod === "csv" ? (
            <div className="space-y-6">
              {/* Drag & Drop Area - Full Width */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
                  isDragOver
                    ? "border-gray-400 bg-gray-50"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                  <ArrowDownTrayIcon className="w-8 h-8 text-gray-600" />
                </div>
                <h4 className="text-xl font-medium text-gray-900 mb-3">
                  {uploadedFile ? uploadedFile.name : "Drop your CSV file here"}
                </h4>
                <p className="text-gray-600 mb-6">
                  {uploadedFile
                    ? "File uploaded successfully"
                    : "or click to browse files"}
                </p>
                {uploadedFile && (
                  <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    <CheckCircleIcon className="w-5 h-5 mr-2" />
                    Ready for processing
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={(e) => {
                  if (e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
                className="hidden"
              />

              {/* File Requirements - Better display */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h5 className="text-sm font-medium text-blue-900 mb-3">
                  File Requirements
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>CSV format with headers</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span>Maximum 50MB file size</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                    <span>Required: Account ID, Name, Phone</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Optional: Email, DPD, Product Type</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 max-w-2xl mx-auto">
              {/* SFTP Configuration */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="text-lg font-medium text-gray-900 mb-4">
                  SFTP Configuration
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Host
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      value={sftpConfig.host}
                      onChange={(e) =>
                        setSftpConfig((prev) => ({
                          ...prev,
                          host: e.target.value,
                        }))
                      }
                      placeholder="sftp.example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Username
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      value={sftpConfig.username}
                      onChange={(e) =>
                        setSftpConfig((prev) => ({
                          ...prev,
                          username: e.target.value,
                        }))
                      }
                      placeholder="your-username"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      File Path
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                      value={sftpConfig.filePath}
                      onChange={(e) =>
                        setSftpConfig((prev) => ({
                          ...prev,
                          filePath: e.target.value,
                        }))
                      }
                      placeholder="/path/to/your/file.csv"
                    />
                  </div>
                </div>
              </div>

              {/* Connection Status */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  <span className="text-sm text-yellow-800">
                    Ready to connect when you proceed to next step
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div
      className={`transition-all duration-300 ${
        stepAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      }`}
    >
      <div className="w-full">
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Map Columns
          </h3>
          <p className="text-gray-600">Map file and system columns</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h4 className="text-sm font-medium text-gray-900">
              Column Mapping
            </h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    System Column
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Your File Column
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Required
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {systemColumns.map((column, index) => (
                  <tr key={column} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {column
                        .replace(/_/g, " ")
                        .replace(/\b\w/g, (l) => l.toUpperCase())}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        value={columnMappings[column] || ""}
                        onChange={(e) =>
                          setColumnMappings((prev) => ({
                            ...prev,
                            [column]: e.target.value,
                          }))
                        }
                      >
                        <option value="">Select column...</option>
                        {mockCsvHeaders.map((header) => (
                          <option key={header} value={header}>
                            {header}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {index < 4 ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Required
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          Optional
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div
      className={`transition-all duration-300 ${
        stepAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      }`}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            AI Processing
          </h3>
          <p className="text-gray-600">AI processing portfolio data</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="text-center mb-6">
            <SparklesIcon className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              Our AI is analyzing your data
            </h4>
            <p className="text-gray-600">
              Creating optimized segments and communication strategies
            </p>
          </div>

          <div className="space-y-4">
            {aiTasks.map((task, index) => (
              <div key={task.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                        completedTasks.includes(task.id)
                          ? "bg-green-500"
                          : currentTaskIndex === index
                          ? "bg-blue-500"
                          : "bg-gray-200"
                      }`}
                    >
                      {completedTasks.includes(task.id) ? (
                        <CheckCircleIcon className="w-5 h-5 text-white" />
                      ) : currentTaskIndex === index ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <SparklesIcon className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <h4 className="text-sm font-medium text-gray-900">
                      {task.title}
                    </h4>
                  </div>
                  <div className="text-right">
                    {completedTasks.includes(task.id) ? (
                      <span className="text-sm text-green-600 font-medium">
                        Completed
                      </span>
                    ) : currentTaskIndex === index ? (
                      <span className="text-sm text-blue-600 font-medium">
                        Processing...
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">Pending</span>
                    )}
                  </div>
                </div>

                {/* Show only current subtask, hide completed ones */}
                {currentTaskIndex === index && currentSubtaskIndex > 0 && (
                  <div className="ml-11">
                    <div className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                      <span className="text-xs text-blue-600">
                        {
                          task.subtasks[
                            Math.min(
                              currentSubtaskIndex - 1,
                              task.subtasks.length - 1
                            )
                          ]
                        }
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div
      className={`transition-all duration-300 ${
        stepAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      }`}
    >
      <div className="w-full">
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Preview Segments & Journey
          </h3>
          <p className="text-gray-600">
            Choose a customer segment and define how you'll reach them
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="space-y-6">
            {sampleSegments.map((segment) => (
              <div key={segment.id} className="bg-white rounded-lg border p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {segment.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-4">
                      {segment.category}
                    </p>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center">
                        <span className="text-blue-600 font-semibold">
                          👥 {segment.accounts.toLocaleString()} accounts
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-600 font-semibold">
                          {segment.amount}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handlePreviewSegment(segment)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <EyeIcon className="w-4 h-4 mr-2" />
                    Preview
                  </button>
                </div>

                {/* Journey Preview */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h5 className="text-sm font-medium text-gray-700 mb-3">
                    Journey Preview
                  </h5>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <PlayIcon className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">Start</span>
                    </div>
                    {segment.journey.steps.map((step, index) => (
                      <React.Fragment key={index}>
                        <div className="w-2 h-0.5 bg-gray-300" />
                        <div className="bg-white border rounded-lg px-3 py-2">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                step.channel === "Voice"
                                  ? "bg-blue-500"
                                  : step.channel === "SMS"
                                  ? "bg-green-500"
                                  : "bg-purple-500"
                              }`}
                            />
                            <span className="text-xs font-medium">
                              {step.nodeName}
                            </span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Channel: {step.channel} • End Time: {step.endTime}
                          </div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Unmatched Accounts */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-yellow-900">
                  Unmatched Accounts
                </h4>
                <p className="text-sm text-yellow-700 mt-1">
                  156 accounts couldn't be automatically segmented and will use
                  the default journey
                </p>
              </div>
              <button className="text-sm text-yellow-800 hover:text-yellow-900 font-medium">
                Review →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep6 = () => {
    return (
      <div
        className={`transition-all duration-300 ${
          stepAnimating
            ? "opacity-0 translate-y-4"
            : "opacity-100 translate-y-0"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Forecast & Schedule
            </h3>
            <p className="text-gray-600">
              View campaign forecasts and set schedule
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left side - Campaign Schedule */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Set up your desired start and end time for a seamless schedule
                </h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Campaign Start
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="date"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={scheduleConfig.startDate}
                        onChange={(e) =>
                          setScheduleConfig((prev) => ({
                            ...prev,
                            startDate: e.target.value,
                          }))
                        }
                      />
                      <input
                        type="time"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue="09:00"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <div className="flex items-center space-x-4">
                      <input
                        type="date"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={scheduleConfig.endDate}
                        onChange={(e) =>
                          setScheduleConfig((prev) => ({
                            ...prev,
                            endDate: e.target.value,
                          }))
                        }
                      />
                      <input
                        type="time"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue="17:00"
                      />
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="runContinuously"
                      checked={scheduleConfig.runContinuously}
                      onChange={(e) =>
                        setScheduleConfig((prev) => ({
                          ...prev,
                          runContinuously: e.target.checked,
                        }))
                      }
                      className="mr-2"
                    />
                    <label
                      htmlFor="runContinuously"
                      className="text-sm text-gray-700"
                    >
                      Run Continuously
                    </label>
                  </div>
                  {scheduleConfig.runContinuously && (
                    <p className="text-xs text-gray-500">
                      End date will be ignored when continuous mode is active
                    </p>
                  )}
                </div>
              </div>

              {/* Right side - AI-Powered Campaign Predictions */}
              <div>
                <div className="flex items-center mb-4">
                  <SparklesIcon className="w-5 h-5 text-blue-600 mr-2" />
                  <h4 className="text-lg font-semibold text-gray-900">
                    AI-Powered Campaign Predictions
                  </h4>
                </div>
                <p className="text-sm text-gray-600 mb-6">
                  Preview what will likely happen if this campaign is launched
                  as-is
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        Expected Connectivity
                      </span>
                      <span className="text-sm font-semibold text-green-600">
                        +10.1%
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      78%
                    </div>
                    <div className="text-xs text-gray-500">
                      vs 67.9% baseline
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "78%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        Expected Recovery
                      </span>
                      <span className="text-sm font-semibold text-green-600">
                        +15.2%
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      $13,400
                    </div>
                    <div className="text-xs text-gray-500">vs $11,635</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "65%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        Expected Liquidation Rate
                      </span>
                      <span className="text-sm font-semibold text-green-600">
                        +4.5%
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      32.5%
                    </div>
                    <div className="text-xs text-gray-500">vs 28% previous</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "32%" }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        Expected Agent Transfers
                      </span>
                      <span className="text-sm font-semibold text-green-600">
                        +4.5%
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      14.6%
                    </div>
                    <div className="text-xs text-gray-500">Target: &lt;15%</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "14.6%" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-3 bg-yellow-50 rounded-lg">
                  <h5 className="text-sm font-semibold text-gray-900 mb-1">
                    Disclaimer
                  </h5>
                  <p className="text-xs text-gray-600">
                    Predictions are estimates based on historical data and
                    machine learning models. Actual results may vary due to
                    market conditions, customer behavior changes, and external
                    factors. These forecasts should be used as guidance
                    alongside professional judgment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Similar to ConversationDetail */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-900 rounded-full p-2 hover:bg-gray-100 transition-colors"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-xl font-bold text-gray-900">
                    Create Campaign
                  </h1>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    Step {currentStep} of {steps.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-6 pb-24">
        {renderStepIndicator()}

        <div className="bg-white">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
          {currentStep === 6 && renderStep6()}
        </div>
      </div>

      {/* Sticky Footer Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between">
          <button
            onClick={handleBack}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 1 || (currentStep === 4 && aiProcessing)
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
            disabled={currentStep === 1 || (currentStep === 4 && aiProcessing)}
          >
            {currentStep === 1 ? "Cancel" : "Back"}
          </button>

          <button
            onClick={handleNext}
            disabled={currentStep === 4 && aiProcessing}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 4 && aiProcessing
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            {currentStep === steps.length ? "Launch Campaign" : "Next"}
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreviewModal && previewSegment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Journey Preview: {previewSegment.title}
              </h3>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {mockJourneySteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`border rounded-lg p-4 ${
                      step.status === "completed"
                        ? "bg-green-50 border-green-200"
                        : step.status === "in-progress"
                        ? "bg-blue-50 border-blue-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                            step.status === "completed"
                              ? "bg-green-500"
                              : step.status === "in-progress"
                              ? "bg-blue-500"
                              : "bg-gray-400"
                          }`}
                        >
                          {index + 1}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {step.step}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {step.user} • {step.phone}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {step.amount}
                        </p>
                        <p className="text-xs text-gray-500">
                          {step.reachoutTime}
                        </p>
                      </div>
                    </div>

                    <div className="ml-11 space-y-2">
                      <div>
                        <p className="text-sm text-gray-700">
                          <strong>Details:</strong> {step.details}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-700">
                          <strong>Recommendation:</strong> {step.recommendation}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
