import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDownIcon,
  ArrowPathIcon,
  ArrowRightOnRectangleIcon,
  ClockIcon,
  PhoneIcon,
  UserIcon,
  CalendarIcon,
  DocumentTextIcon,
  XMarkIcon,
  EnvelopeIcon,
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { Button } from "./components/ui/button";

// Mock transferred calls data
const transferredCallsData = [
  {
    id: 1,
    recipientId: "+13366924145",
    virtualId: "+18773096471",
    startTime: "2024-01-15 14:30:25",
    transferReason: "Customer requested human agent",
    recentDisposition: "Pending",
    assistant: "CarMax",
    // Call details
    callSummary:
      "Customer called regarding a billing dispute on their credit card statement. The automated system was unable to resolve the complex issue involving multiple transactions and requested transfer to a human agent for detailed review and resolution.",
    timeline: [
      {
        id: 1,
        timestamp: "14:30:25",
        action: "Call Started",
        description: "Customer called support line",
        status: "completed",
      },
      {
        id: 2,
        timestamp: "14:32:10",
        action: "Bot Interaction",
        description: "Initial greeting and intent detection",
        status: "completed",
      },
      {
        id: 3,
        timestamp: "14:33:45",
        action: "Transfer Request",
        description: "Customer requested human agent",
        status: "completed",
      },
      {
        id: 4,
        timestamp: "14:35:48",
        action: "Transferred",
        description: "Call transferred to agent portal",
        status: "pending",
      },
    ],
    userAttributes: {
      name: "John Smith",
      phone: "+13366924145",
      email: "john.smith@email.com",
      accountNumber: "ACC-789456123",
      customerSince: "2022-03-15",
      lastInteraction: "2024-01-10",
      preferredLanguage: "English",
      accountType: "Premium",
      riskLevel: "Low",
    },
  },
  {
    id: 2,
    recipientId: "+16613086517",
    virtualId: "+18773096472",
    startTime: "2024-01-15 14:25:10",
    transferReason: "Complex billing inquiry",
    recentDisposition: "Pending",
    assistant: "SalesAI",
    callSummary:
      "Customer contacted regarding a complex billing inquiry involving multiple service charges and promotional discounts. The automated system identified the need for human intervention to properly explain the billing structure and resolve the customer's concerns about unexpected charges.",
    timeline: [
      {
        id: 1,
        timestamp: "14:25:10",
        action: "Call Started",
        description: "Customer called billing support",
        status: "completed",
      },
      {
        id: 2,
        timestamp: "14:27:30",
        action: "Bot Interaction",
        description: "Billing inquiry detected",
        status: "completed",
      },
      {
        id: 3,
        timestamp: "14:30:45",
        action: "Transfer Request",
        description: "Complex billing inquiry requires human agent",
        status: "completed",
      },
      {
        id: 4,
        timestamp: "14:33:25",
        action: "Transferred",
        description: "Call transferred to agent portal",
        status: "pending",
      },
    ],
    userAttributes: {
      name: "Sarah Johnson",
      phone: "+16613086517",
      email: "sarah.j@email.com",
      accountNumber: "ACC-456789123",
      customerSince: "2021-08-22",
      lastInteraction: "2024-01-12",
      preferredLanguage: "English",
      accountType: "Standard",
      riskLevel: "Medium",
    },
  },
  {
    id: 3,
    recipientId: "+15551234567",
    virtualId: "+18773096473",
    startTime: "2024-01-15 14:20:45",
    transferReason: "Technical support needed",
    recentDisposition: "Attended",
    assistant: "CarMax",
    callSummary:
      "Customer reported technical issues with their online banking application, specifically unable to access account statements and transaction history. The automated system attempted basic troubleshooting but the issue required advanced technical support to resolve the authentication and data synchronization problems.",
    timeline: [
      {
        id: 1,
        timestamp: "14:20:45",
        action: "Call Started",
        description: "Customer called technical support",
        status: "completed",
      },
      {
        id: 2,
        timestamp: "14:22:15",
        action: "Bot Interaction",
        description: "Technical issue identified",
        status: "completed",
      },
      {
        id: 3,
        timestamp: "14:25:30",
        action: "Transfer Request",
        description: "Technical support needed",
        status: "completed",
      },
      {
        id: 4,
        timestamp: "14:28:10",
        action: "Transferred",
        description: "Call transferred to agent portal",
        status: "completed",
      },
      {
        id: 5,
        timestamp: "14:33:30",
        action: "Resolved",
        description: "Issue resolved by agent",
        status: "completed",
      },
    ],
    userAttributes: {
      name: "Mike Davis",
      phone: "+15551234567",
      email: "mike.davis@email.com",
      accountNumber: "ACC-123456789",
      customerSince: "2020-11-05",
      lastInteraction: "2024-01-15",
      preferredLanguage: "English",
      accountType: "Premium",
      riskLevel: "Low",
    },
  },
];

// Assistant options
const assistantOptions = [
  { id: "support-bot", name: "CarMax" },
  { id: "sales-ai", name: "SalesAI" },
  { id: "feedback-bot", name: "FeedbackBot" },
  { id: "survey-genie", name: "SurveyGenie" },
  { id: "reminder-bot", name: "ReminderBot" },
];

// Channel options
const channelOptions = [
  { id: "voice", name: "Voice", icon: PhoneIcon },
  { id: "email", name: "Email", icon: EnvelopeIcon },
  { id: "chat", name: "Chat", icon: ChatBubbleLeftRightIcon },
];

// Mock email data
const emailData = [
  {
    id: 1,
    recipientEmail: "john.smith@email.com",
    virtualId: "support@carmax.com",
    subject: "Payment Reminder - Account ACC-789456123",
    receivedTime: "2024-01-15 14:30:25",
    status: "Pending",
    assistant: "CarMax",
    emailSummary:
      "Customer received automated payment reminder email but has questions about the payment amount and due date. The email system detected customer confusion and flagged for human agent review.",
    timeline: [
      {
        id: 1,
        timestamp: "14:30:25",
        action: "Email Sent",
        description: "Automated payment reminder sent",
        status: "completed",
      },
      {
        id: 2,
        timestamp: "14:32:10",
        action: "Email Opened",
        description: "Customer opened the email",
        status: "completed",
      },
      {
        id: 3,
        timestamp: "14:33:45",
        action: "Reply Received",
        description: "Customer replied with questions",
        status: "completed",
      },
      {
        id: 4,
        timestamp: "14:35:48",
        action: "Flagged for Review",
        description: "Email flagged for human agent review",
        status: "pending",
      },
    ],
    userAttributes: {
      name: "John Smith",
      phone: "+13366924145",
      email: "john.smith@email.com",
      accountNumber: "ACC-789456123",
      customerSince: "2022-03-15",
      lastInteraction: "2024-01-10",
      preferredLanguage: "English",
      accountType: "Premium",
      riskLevel: "Low",
    },
    emailContent: {
      subject: "Payment Reminder - Account ACC-789456123",
      body: `Dear John Smith,

This is a friendly reminder that your payment of $1,250.00 is due on March 15, 2024.

Account Number: ACC-789456123
Current Balance: $1,250.00
Due Date: March 15, 2024

Please make your payment as soon as possible to avoid any late fees.

If you have already made a payment, please disregard this notice.

Thank you for your prompt attention to this matter.

Best regards,
CarMax Customer Service Team`,
      reply: `Hi,

I received your payment reminder, but I'm confused about the amount. I thought I only owed $1,000.00, not $1,250.00. Can someone please explain this discrepancy?

Also, I'm not sure if I can make the full payment by March 15th. Are there any payment plan options available?

Thanks,
John Smith`,
    },
  },
  {
    id: 2,
    recipientEmail: "sarah.j@email.com",
    virtualId: "billing@carmax.com",
    subject: "Billing Inquiry - Account ACC-456789123",
    receivedTime: "2024-01-15 14:25:10",
    status: "Attended",
    assistant: "SalesAI",
    emailSummary:
      "Customer sent email regarding billing inquiry about multiple service charges. The automated system was unable to provide detailed explanation and transferred to human agent for comprehensive billing review.",
    timeline: [
      {
        id: 1,
        timestamp: "14:25:10",
        action: "Email Received",
        description: "Customer sent billing inquiry email",
        status: "completed",
      },
      {
        id: 2,
        timestamp: "14:27:30",
        action: "Auto-Response Sent",
        description: "Automated acknowledgment sent",
        status: "completed",
      },
      {
        id: 3,
        timestamp: "14:30:45",
        action: "Flagged for Review",
        description: "Complex billing inquiry requires human agent",
        status: "completed",
      },
      {
        id: 4,
        timestamp: "14:33:25",
        action: "Agent Response",
        description: "Human agent provided detailed billing explanation",
        status: "completed",
      },
    ],
    userAttributes: {
      name: "Sarah Johnson",
      phone: "+16613086517",
      email: "sarah.j@email.com",
      accountNumber: "ACC-456789123",
      customerSince: "2021-08-22",
      lastInteraction: "2024-01-12",
      preferredLanguage: "English",
      accountType: "Standard",
      riskLevel: "Medium",
    },
    emailContent: {
      subject: "Billing Inquiry - Account ACC-456789123",
      body: `Dear Sarah Johnson,

Thank you for contacting us regarding your billing inquiry.

We have reviewed your account and can explain the charges as follows:

1. Monthly Service Fee: $25.00
2. Late Payment Fee: $35.00
3. Interest Charges: $15.00
4. Total Amount Due: $1,250.00

If you have any further questions, please don't hesitate to contact us.

Best regards,
CarMax Billing Team`,
      reply: `Hi,

I'm still confused about the late payment fee. I made my payment on time according to my records. Can you please double-check this?

Also, I'd like to know if there are any ways to reduce these charges.

Thanks,
Sarah Johnson`,
    },
  },
];

export default function AgentPortal() {
  const navigate = useNavigate();
  const [selectedAssistant, setSelectedAssistant] = useState(
    assistantOptions[0]
  );
  const [activeTab, setActiveTab] = useState("voice");
  const [showAssistantDropdown, setShowAssistantDropdown] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState(new Date());
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [replyText, setReplyText] = useState("");

  // Filter data based on selected assistant
  const filteredCalls = transferredCallsData.filter(
    (call) => call.assistant === selectedAssistant.name
  );

  const filteredEmails = emailData.filter(
    (email) => email.assistant === selectedAssistant.name
  );

  // Get current data based on active tab
  const getCurrentData = () => {
    switch (activeTab) {
      case "voice":
        return filteredCalls;
      case "email":
        return filteredEmails;
      case "chat":
        return []; // No chat data yet
      default:
        return filteredCalls;
    }
  };

  const currentData = getCurrentData();

  // Count pending items for notification badges
  const pendingCalls = filteredCalls.filter(
    (call) => call.recentDisposition === "Pending"
  ).length;
  const pendingEmails = filteredEmails.filter(
    (email) => email.status === "Pending"
  ).length;
  const pendingChats = 0; // No chat data yet

  // Tab configuration with notification counts
  const tabs = [
    { id: "voice", name: "Voice", icon: PhoneIcon, count: pendingCalls },
    { id: "email", name: "Email", icon: EnvelopeIcon, count: pendingEmails },
    {
      id: "chat",
      name: "Chat",
      icon: ChatBubbleLeftRightIcon,
      count: pendingChats,
    },
  ];

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, 30000); // 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Countdown timer for next refresh
  useEffect(() => {
    const timer = setInterval(() => {
      setRefreshCounter((prev) => {
        if (prev <= 1) {
          return 30; // Reset to 30 seconds
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setLastRefreshTime(new Date());
    setRefreshCounter(30);

    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleMarkAsAttended = (itemId) => {
    // Update the status for both calls and emails
    if (activeTab === "voice") {
      const updatedCalls = transferredCallsData.map((call) =>
        call.id === itemId ? { ...call, recentDisposition: "Attended" } : call
      );
      console.log(`Marked call ${itemId} as attended`);
    } else if (activeTab === "email") {
      const updatedEmails = emailData.map((email) =>
        email.id === itemId ? { ...email, status: "Attended" } : email
      );
      console.log(`Marked email ${itemId} as attended`);
    }
  };

  const handleSendReply = () => {
    if (selectedEmail && replyText.trim()) {
      // In a real app, this would send the reply via API
      console.log(`Sending reply to email ${selectedEmail.id}:`, replyText);

      // Add reply to timeline
      const newReply = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
        action: "Agent Reply Sent",
        description: `Agent replied: "${replyText.substring(0, 50)}${
          replyText.length > 50 ? "..." : ""
        }"`,
        status: "completed",
      };

      // Update the selected email's timeline
      setSelectedEmail((prev) => ({
        ...prev,
        timeline: [...prev.timeline, newReply],
      }));

      // Clear reply text
      setReplyText("");
    }
  };

  const handleLogout = () => {
    // Handle logout logic
    navigate("/");
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const getDispositionColor = (disposition) => {
    switch (disposition) {
      case "Attended":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTimelineStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Skit Logo */}
            <div className="flex items-center">
              <img
                src="/logo.png"
                alt="Skit Logo"
                className="h-6 w-auto"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "block";
                }}
              />
              <div className="hidden text-xl font-bold text-gray-900">Skit</div>
            </div>

            {/* Assistant Selector and Logout */}
            <div className="flex items-center space-x-4">
              {/* Assistant Dropdown */}
              <div className="relative">
                <button
                  onClick={() =>
                    setShowAssistantDropdown(!showAssistantDropdown)
                  }
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center space-x-2 min-w-[140px] justify-between"
                >
                  <span>{selectedAssistant.name}</span>
                  <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                </button>

                {showAssistantDropdown && (
                  <div className="absolute right-0 top-full mt-1 z-50">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-48">
                      <div className="p-2">
                        <div className="text-xs text-gray-500 px-2 py-1">
                          Assistant
                        </div>
                        <div className="border-b border-gray-100 mb-1"></div>
                        {assistantOptions.map((assistant) => (
                          <button
                            key={assistant.id}
                            className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-50 rounded flex items-center justify-between"
                            onClick={() => {
                              setSelectedAssistant(assistant);
                              setShowAssistantDropdown(false);
                            }}
                          >
                            <span>{assistant.name}</span>
                            {selectedAssistant.id === assistant.id && (
                              <span className="text-xs text-gray-500">✓</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex items-center space-x-2"
              >
                <ArrowRightOnRectangleIcon className="w-4 h-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    // Clear selected items when switching tabs
                    setSelectedCall(null);
                    setSelectedEmail(null);
                  }}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? "border-gray-900 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                  {tab.count > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100vh-120px)]">
        {/* Left Panel - Calls List */}
        <div className="flex-1 p-6">
          {/* Refresh Status */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ClockIcon className="w-4 h-4" />
                <span>Last refreshed: {formatTime(lastRefreshTime)}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <ArrowPathIcon
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                <span>Next refresh in: {refreshCounter}s</span>
              </div>
            </div>

            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ArrowPathIcon
                className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span>{isRefreshing ? "Refreshing..." : "Refresh Now"}</span>
            </Button>
          </div>

          {/* Data Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm h-[calc(100%-120px)]">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {activeTab === "voice"
                  ? "Transferred Calls"
                  : activeTab === "email"
                  ? "Email Communications"
                  : "Chat Messages"}{" "}
                - {selectedAssistant.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {currentData.length}{" "}
                {tabs.find((tab) => tab.id === activeTab)?.name.toLowerCase()}
                {currentData.length !== 1 ? "s" : ""} pending attention
              </p>
            </div>

            <div className="overflow-x-auto h-[calc(100%-80px)]">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    {activeTab === "voice" ? (
                      <>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Recipient ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Virtual ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Start Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Transfer Reason
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Recent Disposition
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </>
                    ) : activeTab === "email" ? (
                      <>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Recipient Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Virtual ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Subject
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Received Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </>
                    ) : (
                      <>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          No Data
                        </th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {activeTab === "voice" &&
                    currentData.map((call) => (
                      <tr
                        key={call.id}
                        className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedCall?.id === call.id
                            ? "bg-blue-50 border-l-4 border-l-blue-500"
                            : ""
                        }`}
                        onClick={() => setSelectedCall(call)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 font-mono">
                            {call.recipientId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600 font-mono">
                            {call.virtualId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {call.startTime}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {call.transferReason}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getDispositionColor(
                              call.recentDisposition
                            )}`}
                          >
                            {call.recentDisposition}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {call.recentDisposition === "Pending" ? (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkAsAttended(call.id);
                              }}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              Mark as Attended
                            </Button>
                          ) : (
                            <span className="text-sm text-gray-500">
                              Completed
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}

                  {activeTab === "email" &&
                    currentData.map((email) => (
                      <tr
                        key={email.id}
                        className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedEmail?.id === email.id
                            ? "bg-blue-50 border-l-4 border-l-blue-500"
                            : ""
                        }`}
                        onClick={() => setSelectedEmail(email)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {email.recipientEmail}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {email.virtualId}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 font-medium max-w-xs truncate">
                            {email.subject}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {email.receivedTime}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getDispositionColor(
                              email.status
                            )}`}
                          >
                            {email.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {email.status === "Pending" ? (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkAsAttended(email.id);
                              }}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              Mark as Attended
                            </Button>
                          ) : (
                            <span className="text-sm text-gray-500">
                              Completed
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {currentData.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <div className="text-center">
                  {activeTab === "voice" ? (
                    <PhoneIcon className="mx-auto h-12 w-12 text-gray-400" />
                  ) : activeTab === "email" ? (
                    <EnvelopeIcon className="mx-auto h-12 w-12 text-gray-400" />
                  ) : (
                    <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-gray-400" />
                  )}
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No{" "}
                    {tabs
                      .find((tab) => tab.id === activeTab)
                      ?.name.toLowerCase()}{" "}
                    communications
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No{" "}
                    {tabs
                      .find((tab) => tab.id === activeTab)
                      ?.name.toLowerCase()}{" "}
                    communications have been transferred to{" "}
                    {selectedAssistant.name} yet.
                  </p>
                  <div className="mt-6">
                    <Button
                      onClick={handleRefresh}
                      variant="outline"
                      className="flex items-center space-x-2"
                    >
                      <ArrowPathIcon className="w-4 h-4" />
                      <span>Refresh</span>
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Details */}
        {(selectedCall || selectedEmail) && (
          <div className="w-[500px] bg-white border-l border-gray-200 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedCall ? "Call Details" : "Email Details"}
              </h3>
              <button
                onClick={() => {
                  setSelectedCall(null);
                  setSelectedEmail(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Summary */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <DocumentTextIcon className="w-4 h-4 mr-2" />
                {selectedCall ? "Call Summary" : "Email Summary"}
              </h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {selectedCall
                    ? selectedCall.callSummary
                    : selectedEmail?.emailSummary}
                </p>
              </div>
            </div>

            {/* Email Content - Only for emails */}
            {selectedEmail && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                  <EnvelopeIcon className="w-4 h-4 mr-2" />
                  Email Conversation
                </h4>
                <div className="space-y-4">
                  {/* Original Email */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    <h5 className="text-xs font-semibold text-blue-900 mb-2">
                      Original Email
                    </h5>
                    <div className="text-xs text-blue-800 mb-2">
                      <strong>Subject:</strong>{" "}
                      {selectedEmail.emailContent.subject}
                    </div>
                    <div className="text-xs text-blue-800 whitespace-pre-wrap">
                      {selectedEmail.emailContent.body}
                    </div>
                  </div>

                  {/* Customer Reply */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <h5 className="text-xs font-semibold text-green-900 mb-2">
                      Customer Reply
                    </h5>
                    <div className="text-xs text-green-800 whitespace-pre-wrap">
                      {selectedEmail.emailContent.reply}
                    </div>
                  </div>

                  {/* Agent Reply Section */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h5 className="text-xs font-semibold text-gray-900 mb-3">
                      Send Reply
                    </h5>
                    <div className="space-y-3">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply here..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
                        rows={4}
                      />
                      <div className="flex justify-end">
                        <Button
                          onClick={handleSendReply}
                          disabled={!replyText.trim()}
                          size="sm"
                          className="bg-gray-900 hover:bg-gray-800 text-white flex items-center space-x-2"
                        >
                          <PaperAirplaneIcon className="w-4 h-4" />
                          <span>Send Reply</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <ClockIcon className="w-4 h-4 mr-2" />
                Timeline
              </h4>
              <div className="space-y-3">
                {(selectedCall?.timeline || selectedEmail?.timeline || []).map(
                  (event, index) => (
                    <div key={event.id} className="flex items-start space-x-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 ${
                          event.status === "completed"
                            ? "bg-green-500"
                            : event.status === "pending"
                            ? "bg-yellow-500"
                            : "bg-gray-400"
                        }`}
                      ></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-900">
                            {event.action}
                          </span>
                          <span className="text-xs text-gray-500">
                            {event.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {event.description}
                        </p>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1 ${getTimelineStatusColor(
                            event.status
                          )}`}
                        >
                          {event.status}
                        </span>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* User Attributes */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <UserIcon className="w-4 h-4 mr-2" />
                Customer Information
              </h4>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Name:</span>
                  <div className="text-sm font-medium text-gray-900">
                    {(selectedCall || selectedEmail)?.userAttributes.name}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Phone:</span>
                  <div className="text-sm font-medium text-gray-900 font-mono">
                    {(selectedCall || selectedEmail)?.userAttributes.phone}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Email:</span>
                  <div className="text-sm font-medium text-gray-900">
                    {(selectedCall || selectedEmail)?.userAttributes.email}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Account Number:</span>
                  <div className="text-sm font-medium text-gray-900 font-mono">
                    {
                      (selectedCall || selectedEmail)?.userAttributes
                        .accountNumber
                    }
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Customer Since:</span>
                  <div className="text-sm font-medium text-gray-900">
                    {
                      (selectedCall || selectedEmail)?.userAttributes
                        .customerSince
                    }
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">
                    Last Interaction:
                  </span>
                  <div className="text-sm font-medium text-gray-900">
                    {
                      (selectedCall || selectedEmail)?.userAttributes
                        .lastInteraction
                    }
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">
                    Preferred Language:
                  </span>
                  <div className="text-sm font-medium text-gray-900">
                    {
                      (selectedCall || selectedEmail)?.userAttributes
                        .preferredLanguage
                    }
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Account Type:</span>
                  <div className="text-sm font-medium text-gray-900">
                    {
                      (selectedCall || selectedEmail)?.userAttributes
                        .accountType
                    }
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Risk Level:</span>
                  <div
                    className={`text-sm font-medium ${
                      (selectedCall || selectedEmail)?.userAttributes
                        .riskLevel === "Low"
                        ? "text-green-600"
                        : (selectedCall || selectedEmail)?.userAttributes
                            .riskLevel === "Medium"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {(selectedCall || selectedEmail)?.userAttributes.riskLevel}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
