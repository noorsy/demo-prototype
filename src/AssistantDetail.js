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
} from "@heroicons/react/24/outline";

// Mock data for different assistants - in a real app this would come from an API
const assistantData = {
  "support-bot-001": {
    name: "SupportBot",
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
          <div className="flex items-center space-x-6">
            {/* Left Arrow for Sidebar */}
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
            </button>

            {/* Assistant Title with Dropdown */}
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-semibold text-gray-900">
                {assistant.name}
              </h1>
              <ChevronDownIcon className="w-4 h-4 text-gray-500" />
            </div>

            {/* Assistant Type */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                {assistant.type}
              </span>
              <ChevronDownIcon className="w-4 h-4 text-gray-500" />
            </div>

            {/* Version */}
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">
                {assistant.version}
              </span>
              <ChevronDownIcon className="w-4 h-4 text-gray-500" />
            </div>

            {/* Status Badge */}
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                assistant.status === "Live"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {assistant.status}
            </span>
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

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {activeTab === "Build" && (
          <div className="max-w-8xl mx-auto">
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

        {activeTab === "Model Configurations" && (
          <div className="max-w-8xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Model Configuration
              </h2>

              {/* Background Noise Configuration */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-md font-medium text-gray-900">
                      Background Noise Addition
                    </h3>
                    <p className="text-sm text-gray-600">
                      Add ambient background noise to make it sound realistic
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={backgroundNoiseEnabled}
                      onChange={(e) =>
                        setBackgroundNoiseEnabled(e.target.checked)
                      }
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                  </label>
                </div>

                {backgroundNoiseEnabled && (
                  <div className="space-y-4">
                    {/* Predefined Background Noises */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        Predefined Background Noises
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {predefinedNoises.map((noise, index) => (
                          <div
                            key={index}
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                              selectedNoise === noise.id
                                ? "border-gray-900 bg-gray-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => setSelectedNoise(noise.id)}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="font-medium text-sm text-gray-900">
                                  {noise.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {noise.description}
                                </div>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  playNoise(noise.url);
                                }}
                                className="ml-2 p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                                title="Play sound"
                              >
                                <PlayIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Custom Background Noises Display */}
                    {customNoises.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                          Custom Background Noises
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {customNoises.map((noise) => (
                            <div
                              key={noise.id}
                              className={`p-3 border rounded-lg transition-colors ${
                                selectedNoise === noise.id
                                  ? "border-gray-900 bg-gray-50"
                                  : "border-gray-200"
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div
                                  className="flex-1 cursor-pointer"
                                  onClick={() => setSelectedNoise(noise.id)}
                                >
                                  <div className="font-medium text-sm text-gray-900">
                                    {noise.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {noise.description}
                                  </div>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <button
                                    onClick={() => playNoise(noise.url)}
                                    className="p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                                    title="Play sound"
                                  >
                                    <PlayIcon className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => deleteCustomNoise(noise.id)}
                                    className="p-1.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
                                    title="Delete noise"
                                  >
                                    <TrashIcon className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Custom Background Noise URL */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        Custom Background Noise
                      </h4>
                      <div className="flex space-x-3 items-end">
                        <input
                          type="text"
                          placeholder="Noise Name"
                          value={customNoiseName}
                          onChange={(e) => setCustomNoiseName(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent flex-1"
                        />
                        <input
                          type="text"
                          placeholder="Noise Description (optional)"
                          value={customNoiseDescription}
                          onChange={(e) =>
                            setCustomNoiseDescription(e.target.value)
                          }
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent flex-1"
                        />
                        <input
                          type="url"
                          placeholder="Enter audio file URL (MP3, WAV, etc.)"
                          value={customNoiseUrl}
                          onChange={(e) => setCustomNoiseUrl(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent flex-1"
                        />
                        <button
                          onClick={addCustomNoise}
                          disabled={
                            !customNoiseUrl.trim() || !customNoiseName.trim()
                          }
                          className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 whitespace-nowrap"
                        >
                          <PlusIcon className="w-4 h-4" />
                          <span>Add</span>
                        </button>
                      </div>
                    </div>

                    {/* Volume Control */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        Background Noise Volume
                      </h4>
                      <div className="flex items-center space-x-3">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={noiseVolume}
                          onChange={(e) => setNoiseVolume(e.target.value)}
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <span className="text-sm text-gray-600 w-12 text-right">
                          {noiseVolume}%
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="text-sm text-gray-600">
                Configure model parameters and audio processing settings.
              </div>
            </div>

            {/* LLM Provider-Model Configuration */}
            <div className="mt-8 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-md font-medium text-gray-900">
                    LLM Provider-Model Configuration
                  </h3>
                  <p className="text-sm text-gray-600">
                    Choose the LLM provider you want to use for your assistant.
                  </p>
                </div>
                <button
                  onClick={() => toggleSection("llmConfig")}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-transform duration-200"
                >
                  {collapsedSections.llmConfig ? (
                    <ChevronDownIcon className="w-5 h-5" />
                  ) : (
                    <ChevronUpIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              {!collapsedSections.llmConfig && (
                <>
                  <div className="space-y-6">
                    {/* Primary Provider */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900">
                          Primary Provider
                        </h4>
                        <span className="text-xs text-gray-500">Required</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Your main language model that will handle all requests.
                        This is the default provider used for processing queries
                        and generating responses.
                      </p>
                      <div className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg bg-gray-50">
                        <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                          O
                        </div>
                        <span className="text-sm font-medium">gpt-4o</span>
                        <button className="ml-auto p-1 text-gray-400 hover:text-gray-600">
                          <ChevronDownIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Secondary Provider */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-gray-900">
                          Secondary Provider
                        </h4>
                        <span className="text-xs text-gray-500">Optional</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Backup language model that automatically takes over when
                        the primary provider fails, experiences downtime, or
                        reaches rate limits. Ensures uninterrupted service.
                      </p>
                      <div className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg">
                        <span className="text-sm text-gray-400">
                          Select secondary model
                        </span>
                        <button className="ml-auto p-1 text-gray-400 hover:text-gray-600">
                          <ChevronDownIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                      Save LLM Configuration
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Languages */}
            <div className="mt-8 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-md font-medium text-gray-900">
                    Languages
                  </h3>
                  <p className="text-sm text-gray-600">
                    Choose the languages you want to use for your assistant.
                  </p>
                </div>
                <button
                  onClick={() => toggleSection("languages")}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-transform duration-200"
                >
                  {collapsedSections.languages ? (
                    <ChevronDownIcon className="w-5 h-5" />
                  ) : (
                    <ChevronUpIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              {!collapsedSections.languages && (
                <div className="space-y-4">
                  {/* Language Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* English */}
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">
                            🇺🇸
                          </div>
                          <span className="text-sm font-medium">
                            English (United States)
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Primary
                          </span>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Cog6ToothIcon className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-xs">
                        <span className="font-medium text-gray-900">
                          DEEPGRAM
                        </span>
                        <span className="text-gray-500 ml-1">
                          nova-2-general
                        </span>
                      </div>
                    </div>

                    {/* Malayalam */}
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 bg-orange-600 rounded text-white text-xs flex items-center justify-center">
                            🇮🇳
                          </div>
                          <span className="text-sm font-medium">
                            Malayalam (India)
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Cog6ToothIcon className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-xs">
                        <span className="font-medium text-gray-900">
                          GOOGLE
                        </span>
                        <span className="text-gray-500 ml-1">long</span>
                      </div>
                    </div>

                    {/* Tamil */}
                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="w-5 h-5 bg-orange-600 rounded text-white text-xs flex items-center justify-center">
                            🇮🇳
                          </div>
                          <span className="text-sm font-medium">
                            Tamil (India)
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <Cog6ToothIcon className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="text-xs">
                        <span className="font-medium text-gray-900">
                          GOOGLE
                        </span>
                        <span className="text-gray-500 ml-1">long</span>
                      </div>
                    </div>
                  </div>

                  {/* Add Language Button */}
                  <div className="text-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <PlusIcon className="w-6 h-6 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 mb-1">
                          Add New Language
                        </h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Add more languages to localize your experience and
                          reach a wider audience.
                        </p>
                      </div>
                      <button className="px-6 py-3 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2 shadow-sm">
                        <PlusIcon className="w-5 h-5" />
                        <span>Add Language</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Barge-in Detection */}
            <div className="mt-8 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-md font-medium text-gray-900">
                    Barge-in Detection
                  </h3>
                  <p className="text-sm text-gray-600">
                    Configure voice activity detection settings for barge-in
                    functionality.
                  </p>
                </div>
                <button
                  onClick={() => toggleSection("bargeIn")}
                  className="p-2 hover:text-gray-600 transition-transform duration-200"
                >
                  {collapsedSections.bargeIn ? (
                    <ChevronDownIcon className="w-5 h-5" />
                  ) : (
                    <ChevronUpIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              {!collapsedSections.bargeIn && (
                <div className="space-y-4">
                  {/* Enable Toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      Enable Barge-in Detection
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={bargeInEnabled}
                        onChange={(e) => setBargeInEnabled(e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                    </label>
                  </div>

                  {/* Configuration Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <label className="text-sm font-medium text-gray-900">
                            Speech Detection Confidence
                          </label>
                          <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-600">
                            i
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          Voice Activity Detection confidence threshold
                        </p>
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            value={speechConfidence}
                            onChange={(e) =>
                              setSpeechConfidence(e.target.value)
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            step="0.01"
                            min="0"
                            max="1"
                          />
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <ChevronUpIcon className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <ChevronDownIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <label className="text-sm font-medium text-gray-900">
                            Maximum listening duration (s)
                          </label>
                          <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-600">
                            i
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          Time to wait before stopping voice detection
                        </p>
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            value={maxListeningDuration}
                            onChange={(e) =>
                              setMaxListeningDuration(e.target.value)
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            step="0.1"
                            min="0"
                          />
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <ChevronUpIcon className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <ChevronDownIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <label className="text-sm font-medium text-gray-900">
                            Minimum listening duration (s)
                          </label>
                          <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-600">
                            i
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          Time to wait before starting voice detection
                        </p>
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            value={minListeningDuration}
                            onChange={(e) =>
                              setMinListeningDuration(e.target.value)
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            step="0.01"
                            min="0"
                          />
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <ChevronUpIcon className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <ChevronDownIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <label className="text-sm font-medium text-gray-900">
                            Silence detection volume threshold
                          </label>
                          <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-600">
                            i
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          Minimum volume threshold for voice detection
                        </p>
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            value={silenceThreshold}
                            onChange={(e) =>
                              setSilenceThreshold(e.target.value)
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            step="0.1"
                            min="0"
                            max="1"
                          />
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <ChevronUpIcon className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <ChevronDownIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Idle Detection */}
            <div className="mt-8 border border-gray-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-md font-medium text-gray-900">
                    User Idle Detection
                  </h3>
                  <p className="text-sm text-gray-600">
                    The duration of inactivity before the system considers the
                    user to be idle. Measured in seconds.
                  </p>
                </div>
                <button
                  onClick={() => toggleSection("idleDetection")}
                  className="p-2 hover:text-gray-600 transition-transform duration-200"
                >
                  {collapsedSections.idleDetection ? (
                    <ChevronDownIcon className="w-5 h-5" />
                  ) : (
                    <ChevronUpIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              {!collapsedSections.idleDetection && (
                <div className="space-y-6">
                  {/* Enable Toggle */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900">
                      Enable User Idle Detection
                    </span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={idleDetectionEnabled}
                        onChange={(e) =>
                          setIdleDetectionEnabled(e.target.checked)
                        }
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gray-900"></div>
                    </label>
                  </div>

                  {/* Voice Configuration */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      Voice Configuration
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <label className="text-sm font-medium text-gray-900">
                            Idle Detection Time (s)
                          </label>
                          <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-600">
                            i
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          Time to wait before considering user as idle
                        </p>
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            value={idleDetectionTime}
                            onChange={(e) =>
                              setIdleDetectionTime(e.target.value)
                            }
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            min="1"
                          />
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <ChevronUpIcon className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <ChevronDownIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <label className="text-sm font-medium text-gray-900">
                            Retries
                          </label>
                          <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-600">
                            i
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 mb-2">
                          Number of times to retry before ending conversation
                        </p>
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            value={retries}
                            onChange={(e) => setRetries(e.target.value)}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            min="0"
                          />
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <ChevronUpIcon className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-gray-400 hover:text-gray-600">
                            <ChevronDownIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DTMF Configuration */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-gray-900">
                      DTMF Configuration
                    </h4>

                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <label className="text-sm font-medium text-gray-900">
                          Inter-Digit Timeout (s)
                        </label>
                        <div className="w-4 h-4 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-600">
                          i
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-2">
                        Time to wait between digit presses
                      </p>
                      <div className="flex items-center space-x-2">
                        <input
                          type="number"
                          value={interDigitTimeout}
                          onChange={(e) => setInterDigitTimeout(e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          min="1"
                        />
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <ChevronUpIcon className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <ChevronDownIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "Settings" && (
          <div className="max-w-8xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                General Settings
              </h2>
              <div className="text-sm text-gray-600">
                Configure general assistant settings and preferences.
              </div>
            </div>
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
