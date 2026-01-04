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
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  ClipboardDocumentIcon,
  EnvelopeIcon,
  MapPinIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  BookOpenIcon,
  WrenchScrewdriverIcon,
  InformationCircleIcon,
  ChartBarIcon,
  LightBulbIcon
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
    recipientId: "+919876543210",
    virtualId: "+919876543211",
    startTime: "2025-11-12 14:30:25",
    transferReason: "Network connectivity issue",
    recentDisposition: "Pending",
    assistant: "Vi",
    // Call details
    callSummary: "Customer called regarding network connectivity issues. The customer is experiencing poor call quality and intermittent service. The automated system was unable to resolve the technical issue and requested transfer to a human agent for network troubleshooting and resolution.",
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
        description: "Initial greeting and network issue detection",
        status: "completed"
        description: "Initial greeting and intent detection",
        status: "completed",
      },
      {
        id: 3,
        timestamp: "14:33:45",
        action: "Transfer Request",
        description: "Network connectivity issue requires human agent",
        status: "completed"
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
      name: "Rajesh Kumar",
      phone: "+919876543210",
      email: "rajesh.kumar@email.com",
      accountNumber: "ACC-789456123",
      customerSince: "2022-03-15",
      lastInteraction: "2024-01-10",
      preferredLanguage: "English, Hindi",
      accountType: "Premium",
      riskLevel: "Low",
      location: "Mumbai, India",
      totalCalls: 47,
      accountBalance: "₹1,245"
    },
    conversation: [
      {
        id: 1,
        speaker: "virtual",
        message: "Hello! Thank you for calling Vi. I'm your virtual assistant. How may I help you today?",
        timestamp: "14:30:25",
        sentiment: "Neutral",
        intent: "greeting",
        aiRecommendation: null
      },
      {
        id: 2,
        speaker: "customer",
        message: "Hi, this is Rajesh. I'm having network issues - my calls keep dropping and internet is very slow. I need help.",
        timestamp: "14:30:45",
        sentiment: "Frustrated",
        intent: "network issue inquiry",
        aiRecommendation: null
      },
      {
        id: 3,
        speaker: "virtual",
        message: "I understand your concern about network connectivity, Mr. Rajesh. Let me check your account details. I can see you're a premium member. For network troubleshooting, I'll need to transfer you to our technical support team who can check for outages in your area.",
        timestamp: "14:31:10",
        sentiment: "Neutral",
        intent: "Transfer Preparation",
        aiRecommendation: null
      },
      {
        id: 4,
        speaker: "customer",
        message: "Yes, please transfer me quickly. This has been going on for two days and it's affecting my work.",
        timestamp: "14:31:30",
        sentiment: "Urgent",
        intent: "urgency request",
        aiRecommendation: null
      },
      {
        id: 5,
        speaker: "agent",
        message: "Hello, this is Pooja from Vi customer support. I understand you're experiencing network issues. Can you hear me clearly?",
        timestamp: "14:35:50",
        sentiment: "Neutral",
        intent: "greeting",
        aiRecommendation: null
      },
      {
        id: 6,
        speaker: "customer",
        message: "Hello? Can you hear me? The connection is very bad... *static* ...I can barely... *static*",
        timestamp: "14:36:05",
        sentiment: "Frustrated",
        intent: "connection quality",
        aiRecommendation: null
      },
      {
        id: 7,
        speaker: "agent",
        message: "I can hear you, though the connection is a bit choppy. Can you tell me what network issues you're experiencing?",
        timestamp: "14:36:20",
        sentiment: "Neutral",
        intent: "information gathering",
        aiRecommendation: null
      },
      {
        id: 8,
        speaker: "customer",
        message: "Yes... *static* ...my calls keep dropping and the internet is very slow... *static* ...been like this for two days now.",
        timestamp: "14:36:45",
        sentiment: "Frustrated",
        intent: "problem description",
        aiRecommendation: null
      },
      {
        id: 9,
        speaker: "agent",
        message: "I understand how frustrating that must be. To help me check for any network issues in your area, could you please provide your PIN code?",
        timestamp: "14:37:00",
        sentiment: "Neutral",
        intent: "information gathering",
        aiRecommendation: null
      },
      {
        id: 10,
        speaker: "customer",
        message: "Yes... *static* ...it's 110001... *static* ...did you get that?",
        timestamp: "14:37:25",
        sentiment: "Frustrated but Patient",
        intent: "providing information",
        aiRecommendation: null
      },
      {
        id: 11,
        speaker: "agent",
        message: "Yes, I got it - 110001. Let me check the system for any network outages or maintenance in your area.",
        timestamp: "14:37:40",
        sentiment: "Neutral",
        intent: "checking system",
        aiRecommendation: "System data shows network lines are down in customer's area (PIN 110001). Multiple reports of connectivity issues. Network maintenance team is working on it and the issue is expected to be resolved within 4-6 hours. Inform the customer about the outage and estimated resolution time."
      }
    ]
      riskLevel: "Low",
    },
  },
  {
    id: 2,
    recipientId: "+919876543212",
    virtualId: "+919876543213",
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
      phone: "+919876543212",
      email: "sarah.j@email.com",
      accountNumber: "ACC-456789123",
      customerSince: "2021-08-22",
      lastInteraction: "2024-01-12",
      preferredLanguage: "English",
      accountType: "Standard",
      riskLevel: "Medium"
    },
    conversation: [
      {
        id: 1,
        speaker: "agent",
        message: "Hello, this is Michael from billing support. I understand you have questions about your recent billing statement. How can I assist you today?",
        timestamp: "14:33:30",
        aiRecommendation: null
      },
      {
        id: 2,
        speaker: "customer",
        message: "Yes, I'm confused about several charges on my bill. There are service charges and some promotional discounts that don't make sense to me.",
        timestamp: "14:33:55",
        aiRecommendation: null
      },
      {
        id: 3,
        speaker: "agent",
        message: "I'd be happy to help clarify your billing statement. Let me pull up your account details so I can explain each charge and discount.",
        timestamp: "14:34:10",
        aiRecommendation: "Good approach. Consider breaking down the billing structure step by step, starting with the base charges, then explaining any service fees, and finally showing how promotional discounts were applied."
      }
    ]
      riskLevel: "Medium",
    },
  },
  {
    id: 3,
    recipientId: "+919876543214",
    virtualId: "+919876543215",
    startTime: "2025-11-12 14:20:45",
    transferReason: "Technical support needed",
    recentDisposition: "Attended",
    assistant: "Vi",
    callSummary: "Customer reported technical issues with their online banking application, specifically unable to access account statements and transaction history. The automated system attempted basic troubleshooting but the issue required advanced technical support to resolve the authentication and data synchronization problems.",
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
      phone: "+919876543214",
      email: "mike.davis@email.com",
      accountNumber: "ACC-123456789",
      customerSince: "2020-11-05",
      lastInteraction: "2024-01-15",
      preferredLanguage: "English",
      accountType: "Premium",
      riskLevel: "Low"
    },
    conversation: [
      {
        id: 1,
        speaker: "agent",
        message: "Hello, this is Jennifer from technical support. I understand you're experiencing issues with your online banking application. Can you tell me more about what's happening?",
        timestamp: "14:28:15",
        aiRecommendation: null
      },
      {
        id: 2,
        speaker: "customer",
        message: "Yes, I can't access my account statements or transaction history. Every time I try, I get an error message.",
        timestamp: "14:28:40",
        aiRecommendation: null
      },
      {
        id: 3,
        speaker: "agent",
        message: "I'm sorry to hear you're experiencing this issue. Let me help troubleshoot this. First, can you tell me what error message you're seeing?",
        timestamp: "14:28:55",
        aiRecommendation: "Good troubleshooting start. Also consider asking about the device/browser they're using, and whether they've tried clearing cache or using a different browser."
      },
      {
        id: 4,
        speaker: "customer",
        message: "It says 'Authentication failed' even though I'm entering the correct password.",
        timestamp: "14:29:15",
        aiRecommendation: null
      },
      {
        id: 5,
        speaker: "agent",
        message: "I see. This could be related to a session timeout or account lockout. Let me check your account status and help you reset your access.",
        timestamp: "14:29:30",
        aiRecommendation: "Good diagnosis. Consider offering to verify their identity and then guide them through a password reset or account unlock process if needed."
      }
    ]
  }
      riskLevel: "Low",
    },
  },
];

// Assistant options
const assistantOptions = [
  { id: "support-bot", name: "Vi" },
  { id: "sales-ai", name: "SalesAI" },
  { id: "feedback-bot", name: "FeedbackBot" },
  { id: "survey-genie", name: "SurveyGenie" },
  { id: "reminder-bot", name: "ReminderBot" },
];

// Channel options
const channelOptions = [
  { id: "voice", name: "Voice", icon: PhoneIcon },
  { id: "sms", name: "SMS", icon: ChatBubbleLeftRightIcon },
  { id: "email", name: "Email", icon: EnvelopeIcon },
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
  const [selectedChannel, setSelectedChannel] = useState(channelOptions[0]);
  const [showChannelDropdown, setShowChannelDropdown] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState(new Date());
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);
  const [activeTab, setActiveTab] = useState("details");
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

            {/* Assistant Selector, Channel Selector and Logout */}
            <div className="flex items-center space-x-4">
              {/* Assistant Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowAssistantDropdown(!showAssistantDropdown);
                    setShowChannelDropdown(false);
                  }}
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

              {/* Channel Dropdown */}
              <div className="relative">
                <button
                  onClick={() => {
                    setShowChannelDropdown(!showChannelDropdown);
                    setShowAssistantDropdown(false);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center space-x-2 min-w-[120px] justify-between"
                >
                  <div className="flex items-center space-x-2">
                    {(() => {
                      const IconComponent = selectedChannel.icon;
                      return IconComponent ? <IconComponent className="w-4 h-4" /> : null;
                    })()}
                    <span>{selectedChannel.name}</span>
                  </div>
                  <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                </button>

                {showChannelDropdown && (
                  <div className="absolute right-0 top-full mt-1 z-50">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-48">
                      <div className="p-2">
                        <div className="text-xs text-gray-500 px-2 py-1">Channel</div>
                        <div className="border-b border-gray-100 mb-1"></div>
                        {channelOptions.map((channel) => {
                          const IconComponent = channel.icon;
                          return (
                            <button
                              key={channel.id}
                              className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-50 rounded flex items-center justify-between"
                              onClick={() => {
                                setSelectedChannel(channel);
                                setShowChannelDropdown(false);
                              }}
                            >
                              <div className="flex items-center space-x-2">
                                {IconComponent && <IconComponent className="w-4 h-4" />}
                                <span>{channel.name}</span>
                              </div>
                              {selectedChannel.id === channel.id && (
                                <span className="text-xs text-gray-500">✓</span>
                              )}
                            </button>
                          );
                        })}
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
        <div className="flex-1 min-w-0 p-6">
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
                  {filteredCalls.map((call) => (
                    <tr 
                      key={call.id} 
                      className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedCall?.id === call.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                      }`}
                      onClick={() => {
                        setSelectedCall(call);
                        setActiveTab("details");
                      }}
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
                          <span className="text-sm text-gray-500">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))}
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

        {/* Two Column Layout when call is selected */}
        {selectedCall && (
          <>
            {/* Left Panel - Tabs with Content */}
            <div className="flex-1 min-w-0 bg-white border-l border-gray-200 flex flex-col h-full overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Call Details</h3>
                <button
                  onClick={() => setSelectedCall(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
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

              {/* Tabs */}
              <div className="flex border-b border-gray-200 px-6">
                <button
                  onClick={() => setActiveTab("details")}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "details"
                      ? "border-gray-900 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <DocumentTextIcon className="w-4 h-4" />
                    <span>Call Details</span>
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab("conversation")}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === "conversation"
                      ? "border-gray-900 text-gray-900"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <ChatBubbleLeftRightIcon className="w-4 h-4" />
                    <span>Conversation</span>
                  </div>
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-1 flex flex-col overflow-hidden">
                {activeTab === "details" && (
                  <div className="flex-1 overflow-y-auto p-6">
                    {/* Call Summary */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                        <DocumentTextIcon className="w-4 h-4 mr-2" />
                        Call Summary
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {selectedCall.callSummary}
                        </p>
                      </div>
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
                        {selectedCall.timeline.map((event) => (
                          <div key={event.id} className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              event.status === 'completed' ? 'bg-green-500' : 
                              event.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'
                            }`}></div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium text-gray-900">{event.action}</span>
                                <span className="text-xs text-gray-500">{event.timestamp}</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full mt-1 ${getTimelineStatusColor(event.status)}`}>
                                {event.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
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

                    {/* Customer Information */}
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                        <UserIcon className="w-4 h-4 mr-2" />
                        Customer Information
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                        <div>
                          <span className="text-sm text-gray-600">Name:</span>
                          <div className="text-sm font-medium text-gray-900">{selectedCall.userAttributes.name}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Phone:</span>
                          <div className="text-sm font-medium text-gray-900 font-mono">{selectedCall.userAttributes.phone}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Email:</span>
                          <div className="text-sm font-medium text-gray-900">{selectedCall.userAttributes.email}</div>
                        </div>
                        {selectedCall.userAttributes.location && (
                          <div>
                            <span className="text-sm text-gray-600">Location:</span>
                            <div className="text-sm font-medium text-gray-900">{selectedCall.userAttributes.location}</div>
                          </div>
                        )}
                        <div>
                          <span className="text-sm text-gray-600">Account Number:</span>
                          <div className="text-sm font-medium text-gray-900 font-mono">{selectedCall.userAttributes.accountNumber}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Customer Since:</span>
                          <div className="text-sm font-medium text-gray-900">{selectedCall.userAttributes.customerSince}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Preferred Language:</span>
                          <div className="text-sm font-medium text-gray-900">{selectedCall.userAttributes.preferredLanguage}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Account Type:</span>
                          <div className="text-sm font-medium text-gray-900">{selectedCall.userAttributes.accountType}</div>
                        </div>
                        <div>
                          <span className="text-sm text-gray-600">Risk Level:</span>
                          <div className={`text-sm font-medium ${
                            selectedCall.userAttributes.riskLevel === 'Low' ? 'text-green-600' :
                            selectedCall.userAttributes.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {selectedCall.userAttributes.riskLevel}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "conversation" && (
                  <div className="flex-1 overflow-y-auto p-4">
                    {selectedCall.conversation && selectedCall.conversation.length > 0 ? (
                      <div className="space-y-4">
                        {selectedCall.conversation.map((message) => (
                          <div key={message.id} className="space-y-1">
                            <div className={`flex ${message.speaker === "agent" || message.speaker === "virtual" ? "justify-start" : "justify-end"}`}>
                              <div className={`max-w-[75%] rounded-lg p-3 ${
                                message.speaker === "agent" || message.speaker === "virtual"
                                  ? "bg-gray-100 text-gray-900"
                                  : "bg-gray-900 text-white"
                              }`}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs font-semibold">
                                    {message.speaker === "agent" ? "Agent" : message.speaker === "virtual" ? "Virtual Assistant" : "Customer"}
                                  </span>
                                  <span className={`text-xs ml-2 ${
                                    message.speaker === "agent" || message.speaker === "virtual" ? "text-gray-500" : "text-gray-300"
                                  }`}>
                                    {message.timestamp}
                                  </span>
                                </div>
                                <p className="text-sm leading-relaxed">{message.message}</p>
                                {(message.sentiment || message.intent) && (
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {message.sentiment && (
                                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                                        message.sentiment === "Urgent" ? "bg-red-100 text-red-800" :
                                        message.sentiment === "Frustrated" ? "bg-yellow-100 text-yellow-800" :
                                        message.sentiment === "Frustrated but Patient" ? "bg-yellow-100 text-yellow-800" :
                                        "bg-gray-100 text-gray-800"
                                      }`}>
                                        {message.sentiment}
                                      </span>
                                    )}
                                    {message.intent && (
                                      <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                                        Intent: {message.intent}
                                      </span>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No conversation data</h3>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - Quick Actions & AI Insights (only show on Conversation tab) */}
            {activeTab === "conversation" && (
              <div className="w-[400px] flex-shrink-0 bg-white border-l border-gray-200 flex flex-col h-full overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Sentiment Meter */}
                {(() => {
                  if (!selectedCall.conversation || selectedCall.conversation.length === 0) return null;
                  
                  // Calculate overall sentiment from customer messages only
                  const customerMessages = selectedCall.conversation.filter(msg => msg.speaker === "customer");
                  if (customerMessages.length === 0) return null;
                  
                  // Get the most recent customer sentiment
                  const recentCustomerMessage = customerMessages[customerMessages.length - 1];
                  let currentSentiment = recentCustomerMessage?.sentiment || "Neutral";
                  
                  // Normalize sentiment to one of the three states
                  if (currentSentiment === "Frustrated but Patient" || currentSentiment === "Frustrated" || currentSentiment === "Urgent" || currentSentiment === "Angry") {
                    currentSentiment = "Frustrated";
                  } else if (currentSentiment === "Positive" || currentSentiment === "Satisfied" || currentSentiment === "Happy") {
                    currentSentiment = "Happy";
                  } else {
                    currentSentiment = "Neutral";
                  }
                  
                  // Calculate needle angle: Frustrated = -90deg (left), Neutral = 0deg (center), Happy = 90deg (right)
                  let needleAngle = 0;
                  if (currentSentiment === "Frustrated") {
                    needleAngle = -90;
                  } else if (currentSentiment === "Happy") {
                    needleAngle = 90;
                  } else {
                    needleAngle = 0;
                  }
                  
                  return (
                    <div className="border-b border-gray-200 pb-6">
                      <h4 className="text-sm font-semibold text-gray-900 mb-4">Customer Sentiment</h4>
                      
                      {/* Sentiment Meter - Horizontal Bar Style */}
                      <div className="relative w-full">
                        {/* Emoji faces above the bar */}
                        <div className="flex justify-between items-start mb-2 px-2">
                          {/* Negative emoji */}
                          <div className="flex flex-col items-center" style={{ width: '33.33%' }}>
                            <div className="text-4xl mb-1">😞</div>
                            <div className="text-xs font-medium text-gray-700">Negative</div>
                          </div>
                          
                          {/* Neutral emoji */}
                          <div className="flex flex-col items-center" style={{ width: '33.33%' }}>
                            <div className="text-4xl mb-1">😐</div>
                            <div className="text-xs font-medium text-gray-700">Neutral</div>
                          </div>
                          
                          {/* Positive emoji */}
                          <div className="flex flex-col items-center" style={{ width: '33.33%' }}>
                            <div className="text-4xl mb-1">😄</div>
                            <div className="text-xs font-medium text-gray-700">Positive</div>
                          </div>
                        </div>
                        
                        {/* Horizontal gradient bar */}
                        <div className="relative h-8 rounded-full overflow-hidden" style={{ background: 'linear-gradient(to right, #ef4444 0%, #ef4444 33.33%, #f59e0b 33.33%, #f59e0b 66.66%, #10b981 66.66%, #10b981 100%)' }}>
                          {/* Pointer indicator */}
                          <div 
                            className="absolute top-0 bottom-0 flex flex-col items-center"
                            style={{ 
                              left: currentSentiment === "Frustrated" ? '16.66%' : currentSentiment === "Neutral" ? '50%' : '83.33%',
                              transform: 'translateX(-50%)',
                              transition: 'left 0.3s ease-in-out'
                            }}
                          >
                            {/* Pointer triangle */}
                            <div 
                              className="w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-gray-800"
                              style={{ marginTop: '-6px' }}
                            />
                            {/* Pointer line */}
                            <div className="w-0.5 h-full bg-gray-800" />
                          </div>
                        </div>
                        
                        {/* Labels below the bar */}
                        <div className="flex justify-between mt-2 px-2">
                          <div className="text-xs font-medium text-gray-600" style={{ width: '33.33%', textAlign: 'left' }}>Negative</div>
                          <div className="text-xs font-medium text-gray-600" style={{ width: '33.33%', textAlign: 'center' }}>Neutral</div>
                          <div className="text-xs font-medium text-gray-600" style={{ width: '33.33%', textAlign: 'right' }}>Positive</div>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* AI Suggestion */}
                {(() => {
                  const latestRecommendation = selectedCall.conversation && [...selectedCall.conversation]
                    .reverse()
                    .find(msg => msg.aiRecommendation);
                  
                  return latestRecommendation ? (
                    <div className="border-b border-gray-200 pb-6">
                      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl border border-indigo-200 shadow-sm overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-4 py-3 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                              <LightBulbIcon className="w-5 h-5 text-white" />
                            </div>
                            <h4 className="text-sm font-semibold text-white">AI Suggestion</h4>
                          </div>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(latestRecommendation.aiRecommendation);
                            }}
                            className="text-white/80 hover:text-white hover:bg-white/20 rounded-lg p-1.5 transition-colors"
                            title="Copy suggestion"
                          >
                            <ClipboardDocumentIcon className="w-4 h-4" />
                          </button>
                        </div>
                        
                        {/* Content */}
                        <div className="p-4">
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-0.5">
                              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                <SparklesIcon className="w-5 h-5 text-indigo-600" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-gray-800 leading-relaxed">
                                {latestRecommendation.aiRecommendation}
                              </p>
                              <div className="mt-3 flex items-center text-xs text-gray-500">
                                <ClockIcon className="w-3 h-3 mr-1" />
                                <span>{latestRecommendation.timestamp}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })()}

                {/* Quick Actions */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h4>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50"
                      onClick={() => window.open('https://kb.vi.com/network-troubleshooting', '_blank')}
                    >
                      <BookOpenIcon className="w-4 h-4 mr-2" />
                      Network Troubleshooting Guide
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50"
                      onClick={() => window.open('https://kb.vi.com/outage-status', '_blank')}
                    >
                      <ChartBarIcon className="w-4 h-4 mr-2" />
                      Check Network Outage Status
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50"
                      onClick={() => window.open('https://kb.vi.com/escalation-procedures', '_blank')}
                    >
                      <WrenchScrewdriverIcon className="w-4 h-4 mr-2" />
                      Escalation Procedures
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start border-gray-300 text-gray-700 hover:bg-gray-50"
                      onClick={() => window.open('https://kb.vi.com/pin-code-coverage', '_blank')}
                    >
                      <InformationCircleIcon className="w-4 h-4 mr-2" />
                      PIN Code Coverage Map
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            )}
          </>
        )}
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
