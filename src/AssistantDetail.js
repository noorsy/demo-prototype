import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  RocketLaunchIcon,
  EyeIcon,
  PlusIcon,
  PlayIcon,
  TrashIcon,
  Cog6ToothIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  ArrowLeftIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

// Mock data for different assistants - in a real app this would come from an API
const assistantData = {
  "support-bot-001": {
    name: "CarMax",
    type: "VOICE",
    version: "Version 3",
    status: "Live",
  },
  "sales-ai-002": {
    name: "SalesAI",
    type: "VOICE",
    version: "Version 2",
    status: "Draft",
  },
  "survey-genie-003": {
    name: "SurveyGenie",
    type: "VOICE",
    version: "Version 1",
    status: "Live",
  },
  "reminder-bot-004": {
    name: "ReminderBot",
    type: "VOICE",
    version: "Version 5",
    status: "Live",
  },
  "onboarding-ai-005": {
    name: "OnboardingAI",
    type: "VOICE",
    version: "Version 2",
    status: "Draft",
  },
  "feedback-bot-006": {
    name: "FeedbackBot",
    type: "VOICE",
    version: "Version 4",
    status: "Live",
  },
};

// Mock data for selectors
const botOptions = [
  { id: "support-bot-001", name: "CarMax", type: "VOICE" },
  { id: "sales-ai-002", name: "SalesAI", type: "VOICE" },
  { id: "survey-genie-003", name: "SurveyGenie", type: "VOICE" },
  { id: "reminder-bot-004", name: "ReminderBot", type: "VOICE" },
  { id: "onboarding-ai-005", name: "OnboardingAI", type: "VOICE" },
  { id: "feedback-bot-006", name: "FeedbackBot", type: "VOICE" },
];

const channelOptions = [
  { id: "voice", name: "Voice", icon: "🎤" },
  { id: "chat", name: "Chat", icon: "💬" },
  { id: "email", name: "Email", icon: "📧" },
  { id: "sms", name: "SMS", icon: "📱" },
];

const versionOptions = [
  { id: "v1", name: "Version 1", status: "Live" },
  { id: "v2", name: "Version 2", status: "Draft" },
  { id: "v3", name: "Version 3", status: "Live" },
  { id: "v4", name: "Version 4", status: "Live" },
  { id: "v5", name: "Version 5", status: "Draft" },
  { id: "v9", name: "Version 9", status: "Draft" },
];

export default function AssistantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Build");
  const [assistant, setAssistant] = useState({
    name: "Customer Intelligence",
    type: "VOICE",
    version: "Version 9",
    status: "Draft",
  });

  // Selector states
  const [selectedBot, setSelectedBot] = useState(botOptions[0]);
  const [selectedChannel, setSelectedChannel] = useState(channelOptions[0]);
  const [selectedVersion, setSelectedVersion] = useState(versionOptions[5]);

  const tabs = [
    "Build",
    "Variables",
    "Model Configurations",
    "Settings",
    "Integrations",
    "Compliance",
    "Virtual IDs",
  ];

  const [generalInstructions, setGeneralInstructions] =
    useState(`{# Define a macro to spell out each digit of a number string; Usage: spell_digits(var1) #}
{% macro spell_digits(number) -%}
{% set digit_map = {
  '0':'zero','1':'one','2':'two','3':'three','4':'four',
  '5':'five','6':'six','7':'seven','8':'eight','9':'nine'
} -%}
{#- remove spaces; you could chain more replace() calls for other unwanted chars -#}
{% set clean = number|string|replace(' ', '') -%}

{% for ch in clean -%}
  {{ digit_map[ch] }}{% if not loop.last %} {% endif %}
{% endfor -%}
{% endmacro %}

{# Define a macro to find the ceiling of a number; Usage: ceil_number(value) #}
{% macro ceil_number(value) %}
{% set str_val = value|string -%}
{% set parts = str_val.split('.') %}
Use / to get suggestions`);

  useEffect(() => {
    // Set assistant data based on ID
    if (id && assistantData[id]) {
      setAssistant(assistantData[id]);
      // Find and set the corresponding bot option
      const botOption = botOptions.find((bot) => bot.id === id);
      if (botOption) {
        setSelectedBot(botOption);
      }
    } else {
      // Default fallback
      setAssistant({
        name: "Customer Intelligence",
        type: "VOICE",
        version: "Version 9",
        status: "Draft",
      });
    }
    console.log("Loading assistant:", id);
  }, [id]);

  const handleSave = () => {
    console.log("Saving assistant configuration...");
    // Implement save logic
  };

  const handleTryItOut = () => {
    console.log("Trying out assistant...");
    // Implement try it out logic
  };

  const handlePublish = () => {
    console.log("Publishing assistant...");
    // Implement publish logic
  };

  const handleBuildVoiceFlow = () => {
    console.log("Building voice flow...");
    // Implement voice flow builder
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  // ... rest of the component state and functions remain the same ...
  const [backgroundNoiseEnabled, setBackgroundNoiseEnabled] = useState(false);
  const [selectedNoise, setSelectedNoise] = useState(null);
  const [customNoiseUrl, setCustomNoiseUrl] = useState("");
  const [customNoiseName, setCustomNoiseName] = useState("");
  const [customNoiseDescription, setCustomNoiseDescription] = useState("");
  const [noiseVolume, setNoiseVolume] = useState(50);
  const [customNoises, setCustomNoises] = useState([]);

  const [bargeInEnabled, setBargeInEnabled] = useState(false);
  const [speechConfidence, setSpeechConfidence] = useState(0.5);
  const [maxListeningDuration, setMaxListeningDuration] = useState(5);
  const [minListeningDuration, setMinListeningDuration] = useState(0.5);
  const [silenceThreshold, setSilenceThreshold] = useState(0.3);

  const [idleDetectionEnabled, setIdleDetectionEnabled] = useState(false);
  const [idleDetectionTime, setIdleDetectionTime] = useState(30);
  const [retries, setRetries] = useState(3);
  const [interDigitTimeout, setInterDigitTimeout] = useState(1);

  // Section collapse states - only Background Noise is open by default
  // Inbound/Outbound Configuration State
  const [callDirection, setCallDirection] = useState("outbound"); // 'inbound' or 'outbound'
  const [outboundOption, setOutboundOption] = useState("speak_static"); // 'speak_static', 'wait_user', 'speak_dynamic'
  const [inboundOption, setInboundOption] = useState("speak_static"); // 'speak_static', 'wait_user', 'speak_dynamic'
  const [outboundStaticMessage, setOutboundStaticMessage] = useState("");
  const [inboundStaticMessage, setInboundStaticMessage] = useState("");

  // Email-specific state variables
  const [outboundEmailSubject, setOutboundEmailSubject] = useState("");
  const [inboundEmailSubject, setInboundEmailSubject] = useState("");
  const [outboundEmailBody, setOutboundEmailBody] = useState("");
  const [inboundEmailBody, setInboundEmailBody] = useState("");

  // Email preview state
  const [showOutboundPreview, setShowOutboundPreview] = useState(false);
  const [showInboundPreview, setShowInboundPreview] = useState(false);

  // New email configuration state
  const [emailBodyType, setEmailBodyType] = useState("static"); // "static" or "html"
  const [showDragDropBuilder, setShowDragDropBuilder] = useState(false);

  // Footer content state
  const [footerContentType, setFooterContentType] = useState("static"); // "static" or "html"
  const [footerContent, setFooterContent] = useState("");
  const [hasUnsubscribeLink, setHasUnsubscribeLink] = useState(false);

  // Function to render email preview with sample data
  const renderEmailPreview = (htmlContent, isOutbound = true) => {
    const sampleData = isOutbound
      ? {
          customer_name: "John Smith",
          action_link: "https://example.com/action",
          account_balance: "$1,250.00",
        }
      : {
          customer_name: "Sarah Johnson",
          support_link: "https://example.com/support",
          ticket_number: "TKT-2024-001234",
        };

    let processedHtml = htmlContent;
    Object.entries(sampleData).forEach(([key, value]) => {
      const regex = new RegExp(`\\{\\{${key}\\}\\}`, "g");
      processedHtml = processedHtml.replace(regex, value);
    });

    return processedHtml;
  };

  const [collapsedSections, setCollapsedSections] = useState({
    llmConfig: true,
    languages: true,
    bargeIn: true,
    idleDetection: true,
  });

  const predefinedNoises = [
    {
      id: "rain",
      name: "Rain",
      description:
        "Gentle rainfall with distant thunder for a soothing, natural atmosphere",
      url: "https://example.com/rain.mp3",
    },
    {
      id: "wind",
      name: "Wind",
      description:
        "Soft breeze through trees and gentle wind chimes for outdoor ambiance",
      url: "https://example.com/wind.mp3",
    },
    {
      id: "forest",
      name: "Forest",
      description:
        "Birds chirping, leaves rustling, and distant wildlife for nature immersion",
      url: "https://example.com/forest.mp3",
    },
    {
      id: "city",
      name: "City",
      description:
        "Distant traffic, people talking, and urban life sounds for metropolitan feel",
      url: "https://example.com/city.mp3",
    },
    {
      id: "office",
      name: "Office",
      description:
        "Subtle office ambiance with distant typing, soft conversations, and air conditioning",
      url: "https://example.com/office.mp3",
    },
  ];

  const playNoise = (url) => {
    console.log(`Playing noise from URL: ${url}`);
    // In a real app, you would use an audio player library to play the sound
    // For now, we'll just log the URL
  };

  const addCustomNoise = () => {
    if (customNoiseUrl.trim() && customNoiseName.trim()) {
      const newNoise = {
        id: `custom-${Date.now()}`,
        name: customNoiseName.trim(),
        description: customNoiseDescription.trim() || "Custom background noise",
        url: customNoiseUrl.trim(),
      };
      setCustomNoises([...customNoises, newNoise]);
      setCustomNoiseUrl("");
      setCustomNoiseName("");
      setCustomNoiseDescription("");
    }
  };

  const deleteCustomNoise = (noiseId) => {
    setCustomNoises(customNoises.filter((noise) => noise.id !== noiseId));
    if (selectedNoise === noiseId) {
      setSelectedNoise(null);
    }
  };

  const toggleSection = (sectionName) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const systemVariables = [
    {
      name: "user_intent",
      displayName: "User Intent",
      dataType: "String",
      source: "DYNAMIC",
    },
    {
      name: "conversation_id",
      displayName: "Conversation ID",
      dataType: "String",
      source: "DYNAMIC",
    },
    {
      name: "session_id",
      displayName: "Session ID",
      dataType: "String",
      source: "DYNAMIC",
    },
    {
      name: "timestamp",
      displayName: "Timestamp",
      dataType: "String",
      source: "DYNAMIC",
    },
    {
      name: "language",
      displayName: "Language",
      dataType: "String",
      source: "DYNAMIC",
    },
    {
      name: "timezone",
      displayName: "Timezone",
      dataType: "String",
      source: "DYNAMIC",
    },
    {
      name: "device_id",
      displayName: "Device ID",
      dataType: "String",
      source: "DYNAMIC",
    },
  ];

  return (
    <div className="min-h-screen">
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #1f2937;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #1f2937;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
      {/* Top Header Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Back Button */}
            <button
              onClick={handleBackClick}
              className="flex items-center space-x-2 px-2 py-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors bg-gray-50"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </button>

            {/* Simple Bot Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors bg-gray-50">
                  <span className="font-medium">{selectedBot.name}</span>
                  <ChevronDownIcon className="w-3 h-3 text-gray-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="start">
                <DropdownMenuLabel className="text-xs text-gray-500">
                  Bot
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {botOptions.map((bot) => (
                  <DropdownMenuItem
                    key={bot.id}
                    className="cursor-pointer text-sm"
                    onClick={() => setSelectedBot(bot)}
                  >
                    <span>{bot.name}</span>
                    {selectedBot.id === bot.id && (
                      <CheckIcon className="w-3 h-3 ml-auto text-gray-500" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Simple Channel Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors bg-gray-50">
                  <span>{selectedChannel.icon}</span>
                  <span className="font-medium">{selectedChannel.name}</span>
                  <ChevronDownIcon className="w-3 h-3 text-gray-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuLabel className="text-xs text-gray-500">
                  Channel
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {channelOptions.map((channel) => (
                  <DropdownMenuItem
                    key={channel.id}
                    className="cursor-pointer text-sm"
                    onClick={() => setSelectedChannel(channel)}
                  >
                    <span className="mr-2">{channel.icon}</span>
                    <span>{channel.name}</span>
                    {selectedChannel.id === channel.id && (
                      <CheckIcon className="w-3 h-3 ml-auto text-gray-500" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Simple Version Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 px-3 py-1.5 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors bg-gray-50">
                  <span className="font-medium">{selectedVersion.name}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-xs ${
                      selectedVersion.status === "Live"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {selectedVersion.status}
                  </span>
                  <ChevronDownIcon className="w-3 h-3 text-gray-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48" align="start">
                <DropdownMenuLabel className="text-xs text-gray-500">
                  Version
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {versionOptions.map((version) => (
                  <DropdownMenuItem
                    key={version.id}
                    className="cursor-pointer text-sm"
                    onClick={() => setSelectedVersion(version)}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span>{version.name}</span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-xs ${
                          version.status === "Live"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {version.status}
                      </span>
                    </div>
                    {selectedVersion.id === version.id && (
                      <CheckIcon className="w-3 h-3 ml-auto text-gray-500" />
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleTryItOut}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              <RocketLaunchIcon className="w-4 h-4" />
              <span>Try it out</span>
            </button>
            <button
              onClick={handlePublish}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
            >
              <RocketLaunchIcon className="w-4 h-4" />
              <span>Publish</span>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 px-6">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area - Rest of the component remains the same */}
      <div className="flex-1 p-6">
        {activeTab === "Build" && (
          <div className="max-w-8xl mx-auto">
            {/* First Turn Configuration */}
            <div className="mb-8">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  First Turn Configuration
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  Configure how the assistant handles the first turn in calls
                  and email communications.
                </p>

                {/* Call Type Selector - Only show for voice channel */}
                {selectedChannel.id === "voice" && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Conversation Type
                    </label>
                    <div className="relative inline-flex bg-gray-100 rounded-xl p-1">
                      <button
                        onClick={() => setCallDirection("outbound")}
                        className={`relative px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          callDirection === "outbound"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        📞 Outbound
                      </button>
                      <button
                        onClick={() => setCallDirection("inbound")}
                        className={`relative px-6 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                          callDirection === "inbound"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        📲 Inbound
                      </button>
                    </div>
                  </div>
                )}

                {/* Email Channel Configuration */}
                {selectedChannel.id === "email" && (
                  <div className="space-y-6">
                    <div className="border-t border-gray-200 pt-6">
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Email Configuration
                      </label>
                    </div>

                    {/* Email Subject Line */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject Line
                      </label>
                      <input
                        type="text"
                        value={outboundEmailSubject}
                        onChange={(e) =>
                          setOutboundEmailSubject(e.target.value)
                        }
                        className="w-full p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Payment Reminder - Account {{account_number}} | {{customer_name}}"
                      />
                      <div className="mt-1 text-xs text-gray-500">
                        Use Jinja2 syntax for dynamic variables:{" "}
                        {"{{customer_name}}"}, {"{{account_balance}}"},{" "}
                        {"{{due_date}}"}, etc.
                      </div>
                    </div>

                    {/* Email Body Type Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-4">
                        Email Body Type
                      </label>
                      <div className="flex space-x-4">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="email-body-type"
                            value="static"
                            checked={emailBodyType === "static"}
                            onChange={(e) => setEmailBodyType(e.target.value)}
                            className="h-4 w-4 text-blue-600"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            Static (Plain Text)
                          </span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="email-body-type"
                            value="html"
                            checked={emailBodyType === "html"}
                            onChange={(e) => setEmailBodyType(e.target.value)}
                            className="h-4 w-4 text-blue-600"
                          />
                          <span className="ml-2 text-sm text-gray-700">
                            HTML (Drag & Drop Builder)
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Static Email Body */}
                    {emailBodyType === "static" && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Body (Plain Text)
                        </label>
                        <textarea
                          value={outboundEmailBody}
                          onChange={(e) => setOutboundEmailBody(e.target.value)}
                          className="w-full h-40 p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder={`Dear {{customer_name}},

This is a friendly reminder that your payment of $1,250.00 is due on March 15, 2024.

Account Number: ACC-12345
Current Balance: $1,250.00
Due Date: March 15, 2024

Please make your payment as soon as possible to avoid any late fees.

If you have already made a payment, please disregard this notice.

Thank you for your prompt attention to this matter.

Best regards,
{{creditor_name}}`}
                        />
                        <div className="mt-2 text-xs text-gray-500">
                          Use Jinja2 syntax for dynamic variables:{" "}
                          {"{{customer_name}}"}, {"{{account_balance}}"},{" "}
                          {"{{due_date}}"}, etc.
                        </div>
                      </div>
                    )}

                    {/* HTML Email Body */}
                    {emailBodyType === "html" && (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Email Body (HTML Builder)
                          </label>
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              onClick={() =>
                                setShowOutboundPreview(!showOutboundPreview)
                              }
                              className="flex items-center space-x-1 px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                            >
                              <EyeIcon className="w-3 h-3" />
                              <span>
                                {showOutboundPreview
                                  ? "Hide Preview"
                                  : "Quick Preview"}
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setShowDragDropBuilder(!showDragDropBuilder)
                              }
                              className="flex items-center space-x-1 px-3 py-1 text-xs bg-green-100 text-green-700 rounded-md hover:bg-green-200 transition-colors"
                            >
                              <span>🎨</span>
                              <span>
                                {showDragDropBuilder
                                  ? "HTML Editor"
                                  : "Drag & Drop Builder"}
                              </span>
                            </button>
                          </div>
                        </div>

                        {showOutboundPreview && outboundEmailBody && (
                          <div className="mb-4 border border-gray-200 rounded-lg">
                            <div className="bg-gray-50 px-3 py-2 border-b border-gray-200 text-xs font-medium text-gray-700">
                              Email Preview - Subject:{" "}
                              {outboundEmailSubject || "No subject"}
                            </div>
                            <div
                              className="p-4 bg-white max-h-60 overflow-y-auto"
                              dangerouslySetInnerHTML={{
                                __html: renderEmailPreview(
                                  outboundEmailBody,
                                  true
                                ),
                              }}
                            />
                          </div>
                        )}

                        {showDragDropBuilder ? (
                          <div className="border border-gray-300 rounded-lg">
                            {/* Drag & Drop Builder Interface */}
                            <div className="bg-gray-50 px-4 py-3 border-b border-gray-300">
                              <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-gray-700">
                                  Drag & Drop Email Builder
                                </h4>
                                <div className="flex space-x-2">
                                  <button className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50">
                                    Undo
                                  </button>
                                  <button className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-50">
                                    Redo
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="flex h-96">
                              {/* Component Palette */}
                              <div className="w-1/4 bg-gray-50 border-r border-gray-300 p-3">
                                <h5 className="text-xs font-medium text-gray-700 mb-3">
                                  Components
                                </h5>
                                <div className="space-y-2">
                                  <div className="p-2 bg-white border border-gray-200 rounded cursor-move text-xs">
                                    📝 Text Block
                                  </div>
                                  <div className="p-2 bg-white border border-gray-200 rounded cursor-move text-xs">
                                    🔗 Button
                                  </div>
                                  <div className="p-2 bg-white border border-gray-200 rounded cursor-move text-xs">
                                    🖼️ Image
                                  </div>
                                  <div className="p-2 bg-white border border-gray-200 rounded cursor-move text-xs">
                                    📊 Table
                                  </div>
                                  <div className="p-2 bg-white border border-gray-200 rounded cursor-move text-xs">
                                    📋 Divider
                                  </div>
                                  <div className="p-2 bg-white border border-gray-200 rounded cursor-move text-xs">
                                    📧 Footer
                                  </div>
                                </div>
                              </div>

                              {/* Canvas Area */}
                              <div className="flex-1 p-4 bg-white">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg h-full flex items-center justify-center">
                                  <div className="text-center text-gray-500">
                                    <div className="text-2xl mb-2">📧</div>
                                    <p className="text-sm">
                                      Drag components here to build your email
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">
                                      Start with a text block or button
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Properties Panel */}
                              <div className="w-1/4 bg-gray-50 border-l border-gray-300 p-3">
                                <h5 className="text-xs font-medium text-gray-700 mb-3">
                                  Properties
                                </h5>
                                <div className="space-y-3">
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">
                                      Text Content
                                    </label>
                                    <textarea
                                      className="w-full p-2 text-xs border border-gray-300 rounded"
                                      rows={3}
                                      placeholder="Enter text content..."
                                    />
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">
                                      Font Size
                                    </label>
                                    <select className="w-full p-2 text-xs border border-gray-300 rounded">
                                      <option>Small</option>
                                      <option>Medium</option>
                                      <option>Large</option>
                                    </select>
                                  </div>
                                  <div>
                                    <label className="block text-xs text-gray-600 mb-1">
                                      Color
                                    </label>
                                    <input
                                      type="color"
                                      className="w-full h-8 border border-gray-300 rounded"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="border border-gray-300 rounded-md">
                            <div className="bg-gray-50 px-3 py-2 border-b border-gray-300 flex items-center space-x-2 text-xs">
                              <button
                                type="button"
                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                title="Bold"
                              >
                                <strong>B</strong>
                              </button>
                              <button
                                type="button"
                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                title="Italic"
                              >
                                <em>I</em>
                              </button>
                              <button
                                type="button"
                                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                title="Link"
                              >
                                🔗
                              </button>
                              <span className="text-gray-500 ml-auto">
                                HTML Editor
                              </span>
                            </div>
                            <textarea
                              value={outboundEmailBody}
                              onChange={(e) =>
                                setOutboundEmailBody(e.target.value)
                              }
                              className="w-full h-40 p-3 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono"
                              placeholder={`<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #2c3e50;">Hello {{customer_name}}</h1>
    <p>This is a friendly reminder about your account balance.</p>
    <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
      <p><strong>Account Number:</strong> {{account_number}}</p>
        <p><strong>Current Balance:</strong> $1,250.00</p>
      <p><strong>Due Date:</strong> {{due_date}}</p>
    </div>
    <a href="{{payment_link}}" style="background-color: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
      Make Payment
    </a>
  </div>
</body>
</html>`}
                            />
                          </div>
                        )}

                        <div className="mt-2 text-xs text-gray-500">
                          Use HTML tags for formatting. Variables:{" "}
                          {"{{customer_name}}"}, {"{{account_balance}}"},{" "}
                          {"{{due_date}}"}, {"{{payment_link}}"}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Voice Channel Configuration */}
                {selectedChannel.id === "voice" && (
                  <>
                    {/* Outbound Options */}
                    {callDirection === "outbound" && (
                      <div className="space-y-4">
                        <div className="border-t border-gray-200 pt-6">
                          <label className="block text-sm font-medium text-gray-700 mb-4">
                            How should the assistant start outbound calls?
                          </label>
                        </div>

                        <div className="space-y-3">
                          <label className="flex items-start space-x-3">
                            <input
                              type="radio"
                              name="outbound-option"
                              value="speak_static"
                              checked={outboundOption === "speak_static"}
                              onChange={(e) =>
                                setOutboundOption(e.target.value)
                              }
                              className="mt-1 h-4 w-4 text-blue-600"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-900">
                                  Bot starts with a static message.
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                The assistant will always start with the same
                                scripted message
                              </p>
                              {outboundOption === "speak_static" && (
                                <div className="mt-2">
                                  <textarea
                                    value={outboundStaticMessage}
                                    onChange={(e) =>
                                      setOutboundStaticMessage(e.target.value)
                                    }
                                    className="w-full h-24 p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter the static message the assistant will speak..."
                                  />
                                </div>
                              )}
                            </div>
                          </label>

                          <label className="flex items-start space-x-3">
                            <input
                              type="radio"
                              name="outbound-option"
                              value="wait_user"
                              checked={outboundOption === "wait_user"}
                              onChange={(e) =>
                                setOutboundOption(e.target.value)
                              }
                              className="mt-1 h-4 w-4 text-blue-600"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-900">
                                  Let user start the conversation
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                The assistant will listen and wait for the
                                customer to initiate
                              </p>
                            </div>
                          </label>

                          <label className="flex items-start space-x-3">
                            <input
                              type="radio"
                              name="outbound-option"
                              value="speak_dynamic"
                              checked={outboundOption === "speak_dynamic"}
                              onChange={(e) =>
                                setOutboundOption(e.target.value)
                              }
                              className="mt-1 h-4 w-4 text-blue-600"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-900">
                                  Start with dynamic message generated by AI
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                AI will create a personalized greeting based on
                                customer data
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Inbound Options */}
                    {callDirection === "inbound" && (
                      <div className="space-y-4">
                        <div className="border-t border-gray-200 pt-6">
                          <label className="block text-sm font-medium text-gray-700 mb-4">
                            How should the assistant respond to inbound calls?
                          </label>
                        </div>

                        <div className="space-y-3">
                          <label className="flex items-start space-x-3">
                            <input
                              type="radio"
                              name="inbound-option"
                              value="speak_static"
                              checked={inboundOption === "speak_static"}
                              onChange={(e) => setInboundOption(e.target.value)}
                              className="mt-1 h-4 w-4 text-blue-600"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-900">
                                  Bot starts with a static message.
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                The assistant will answer with the same scripted
                                greeting
                              </p>
                              {inboundOption === "speak_static" && (
                                <div className="mt-2">
                                  <textarea
                                    value={inboundStaticMessage}
                                    onChange={(e) =>
                                      setInboundStaticMessage(e.target.value)
                                    }
                                    className="w-full h-24 p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter the static message the assistant will speak..."
                                  />
                                </div>
                              )}
                            </div>
                          </label>

                          <label className="flex items-start space-x-3">
                            <input
                              type="radio"
                              name="inbound-option"
                              value="wait_user"
                              checked={inboundOption === "wait_user"}
                              onChange={(e) => setInboundOption(e.target.value)}
                              className="mt-1 h-4 w-4 text-blue-600"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-900">
                                  Let user start the conversation
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                The assistant will listen and wait for the
                                customer to start
                              </p>
                            </div>
                          </label>

                          <label className="flex items-start space-x-3">
                            <input
                              type="radio"
                              name="inbound-option"
                              value="speak_dynamic"
                              checked={inboundOption === "speak_dynamic"}
                              onChange={(e) => setInboundOption(e.target.value)}
                              className="mt-1 h-4 w-4 text-blue-600"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-gray-900">
                                  Start with dynamic message generated by AI
                                </span>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                AI will create a personalized greeting based on
                                call context
                              </p>
                            </div>
                          </label>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Header and Action Button on Same Line */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  General Instructions
                </h2>
                <p className="text-sm text-gray-600">
                  A universal prompt setting the agent's role and conversation
                  style across all states.
                </p>
              </div>

              <button
                onClick={handleBuildVoiceFlow}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                <EyeIcon className="w-4 h-4" />
                <span>Build Voice Flow</span>
              </button>
            </div>

            {/* General Instructions Section */}
            <div className="mb-8">
              {/* Code Editor/Configuration Panel */}
              <div className="bg-white border border-gray-300 rounded-lg p-4">
                <textarea
                  value={generalInstructions}
                  onChange={(e) => setGeneralInstructions(e.target.value)}
                  className="w-full h-64 p-4 font-mono text-sm text-gray-800 bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Enter your general instructions here..."
                />
                <div className="mt-2 text-xs text-gray-500">
                  Use / to get suggestions
                </div>
              </div>
            </div>

            {/* Additional Configuration Sections */}
            <div className="space-y-6">
              {/* Conversation Flow */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">
                  Conversation Flow
                </h3>
                <div className="text-sm text-gray-600">
                  Configure how the assistant handles different conversation
                  states and transitions.
                </div>
              </div>

              {/* Response Templates */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">
                  Response Templates
                </h3>
                <div className="text-sm text-gray-600">
                  Define standard response patterns for common scenarios.
                </div>
              </div>

              {/* Error Handling */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-md font-semibold text-gray-900 mb-4">
                  Error Handling
                </h3>
                <div className="text-sm text-gray-600">
                  Configure fallback responses and error recovery mechanisms.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rest of the tabs content remains the same - truncated for brevity */}
        {activeTab === "Variables" && (
          <div className="max-w-8xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Variables (Total: 7)
                  </h2>
                  <p className="text-sm text-gray-600">System</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search variables name..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <MagnifyingGlassIcon className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  </div>
                  <button className="flex items-center space-x-2 px-3 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                    <PlusIcon className="w-4 h-4" />
                    <span>Create New Variable</span>
                  </button>
                </div>
              </div>

              {/* Variables Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">
                        Display Name
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">
                        Data Type
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">
                        Default Value
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">
                        Source
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-900">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {systemVariables.map((variable, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                            <span className="text-sm font-mono text-gray-900">
                              {variable.name}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-900">
                            {variable.displayName}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-600">
                            {variable.dataType}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-sm text-gray-400">-</span>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                              variable.source === "DYNAMIC"
                                ? "bg-orange-100 text-orange-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {variable.source}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-600">
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs content would go here - truncated for brevity */}
        {activeTab === "Model Configurations" && (
          <div className="max-w-8xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Model Configuration
              </h2>
              <div className="text-sm text-gray-600">
                Configure model parameters and audio processing settings.
              </div>
            </div>
          </div>
        )}

        {activeTab === "Settings" && (
          <div className="max-w-8xl mx-auto space-y-6">
            {/* General Settings */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                General Settings
              </h2>
              <div className="text-sm text-gray-600">
                Configure general assistant settings and preferences.
              </div>
            </div>

            {/* Email Footer Configuration - Only show for email channel */}
            {selectedChannel.id === "email" && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Email Footer Configuration
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  Configure footer content for your email communications. An
                  unsubscribe link is required for compliance.
                </p>

                {/* Footer Content Type Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Footer Content Type
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="footer-content-type"
                        value="static"
                        checked={footerContentType === "static"}
                        onChange={(e) => setFooterContentType(e.target.value)}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Static (Plain Text)
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="footer-content-type"
                        value="html"
                        checked={footerContentType === "html"}
                        onChange={(e) => setFooterContentType(e.target.value)}
                        className="h-4 w-4 text-blue-600"
                      />
                      <span className="ml-2 text-sm text-gray-700">HTML</span>
                    </label>
                  </div>
                </div>

                {/* Footer Content Editor */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Footer Content
                  </label>
                  {footerContentType === "static" ? (
                    <textarea
                      value={
                        'If you no longer wish to receive these emails, please <a href="UNSUB">unsubscribe here</a>.'
                      }
                      onChange={(e) => {
                        setFooterContent(e.target.value);
                        // Check if unsubscribe link is present
                        setHasUnsubscribeLink(e.target.value.includes("UNSUB"));
                      }}
                      className="w-full h-12 p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder={`If you no longer wish to receive these emails, please <a href="UNSUB">unsubscribe here</a>.`}
                    />
                  ) : (
                    <div className="border border-gray-300 rounded-md">
                      <div className="bg-gray-50 px-3 py-2 border-b border-gray-300 flex items-center space-x-2 text-xs">
                        <button
                          type="button"
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          title="Bold"
                        >
                          <strong>B</strong>
                        </button>
                        <button
                          type="button"
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          title="Italic"
                        >
                          <em>I</em>
                        </button>
                        <button
                          type="button"
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          title="Link"
                        >
                          🔗
                        </button>
                        <span className="text-gray-500 ml-auto">
                          HTML Editor
                        </span>
                      </div>
                      <textarea
                        value={footerContent}
                        onChange={(e) => {
                          setFooterContent(e.target.value);
                          // Check if unsubscribe link is present
                          setHasUnsubscribeLink(
                            e.target.value.includes("UNSUB")
                          );
                        }}
                        className="w-full h-32 p-3 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono"
                        placeholder={`<div style="margin-top: 30px; padding: 20px; background-color: #f8f9fa; border-top: 1px solid #e9ecef;">
  <p style="margin: 0 0 10px 0; font-size: 12px; color: #6c757d;">
    Thank you for your business.
  </p>
  <p style="margin: 0 0 10px 0; font-size: 12px; color: #6c757d;">
    If you no longer wish to receive these emails, please 
    <a href="UNSUB" style="color: #007bff; text-decoration: none;">unsubscribe here</a>.
  </p>
  <p style="margin: 0; font-size: 12px; color: #6c757d;">
    Your Company Name<br>
    123 Business Street<br>
    City, State 12345
  </p>
</div>`}
                      />
                    </div>
                  )}

                  {/* Unsubscribe Link Validation */}
                  <div className="mt-2">
                    {hasUnsubscribeLink ? (
                      <div className="flex items-center text-green-600 text-xs">
                        <CheckIcon className="w-4 h-4 mr-1" />
                        Unsubscribe link detected - Footer is compliant
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600 text-xs">
                        <span className="w-4 h-4 mr-1 text-red-600">⚠</span>
                        Unsubscribe link required - Add &lt;a
                        href="UNSUB"&gt;Unsubscribe&lt;/a&gt; to your footer
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Preview */}
                {footerContent && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Footer Preview
                    </label>
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      {footerContentType === "html" ? (
                        <div
                          className="text-sm"
                          dangerouslySetInnerHTML={{ __html: footerContent }}
                        />
                      ) : (
                        <div className="text-sm whitespace-pre-wrap">
                          {footerContent}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    disabled={!hasUnsubscribeLink}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      hasUnsubscribeLink
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {hasUnsubscribeLink
                      ? "Save Footer Configuration"
                      : "Add Unsubscribe Link to Save"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "Integrations" && (
          <div className="max-w-8xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                External Integrations
              </h2>
              <div className="text-sm text-gray-600">
                Connect your assistant to external services and APIs.
              </div>
            </div>
          </div>
        )}

        {activeTab === "Compliance" && (
          <div className="max-w-8xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Compliance & Security
              </h2>
              <div className="text-sm text-gray-600">
                Configure compliance settings and security measures.
              </div>
            </div>
          </div>
        )}

        {activeTab === "Virtual IDs" && (
          <div className="max-w-8xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Virtual Phone Numbers
              </h2>
              <div className="text-sm text-gray-600">
                Manage virtual phone numbers and routing configurations.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Button - Bottom of Content */}
      <div className="p-6 border-t border-gray-200 bg-white">
        <div className="max-w-8xl mx-auto flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
