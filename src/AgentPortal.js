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
  XMarkIcon
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
    assistant: "SupportBot",
    // Call details
    callSummary: "Customer called regarding a billing dispute on their credit card statement. The automated system was unable to resolve the complex issue involving multiple transactions and requested transfer to a human agent for detailed review and resolution.",
    timeline: [
      {
        id: 1,
        timestamp: "14:30:25",
        action: "Call Started",
        description: "Customer called support line",
        status: "completed"
      },
      {
        id: 2,
        timestamp: "14:32:10",
        action: "Bot Interaction",
        description: "Initial greeting and intent detection",
        status: "completed"
      },
      {
        id: 3,
        timestamp: "14:33:45",
        action: "Transfer Request",
        description: "Customer requested human agent",
        status: "completed"
      },
      {
        id: 4,
        timestamp: "14:35:48",
        action: "Transferred",
        description: "Call transferred to agent portal",
        status: "pending"
      }
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
      riskLevel: "Low"
    }
  },
  {
    id: 2,
    recipientId: "+16613086517",
    virtualId: "+18773096472",
    startTime: "2024-01-15 14:25:10",
    transferReason: "Complex billing inquiry",
    recentDisposition: "Pending",
    assistant: "SalesAI",
    callSummary: "Customer contacted regarding a complex billing inquiry involving multiple service charges and promotional discounts. The automated system identified the need for human intervention to properly explain the billing structure and resolve the customer's concerns about unexpected charges.",
    timeline: [
      {
        id: 1,
        timestamp: "14:25:10",
        action: "Call Started",
        description: "Customer called billing support",
        status: "completed"
      },
      {
        id: 2,
        timestamp: "14:27:30",
        action: "Bot Interaction",
        description: "Billing inquiry detected",
        status: "completed"
      },
      {
        id: 3,
        timestamp: "14:30:45",
        action: "Transfer Request",
        description: "Complex billing inquiry requires human agent",
        status: "completed"
      },
      {
        id: 4,
        timestamp: "14:33:25",
        action: "Transferred",
        description: "Call transferred to agent portal",
        status: "pending"
      }
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
      riskLevel: "Medium"
    }
  },
  {
    id: 3,
    recipientId: "+15551234567",
    virtualId: "+18773096473",
    startTime: "2024-01-15 14:20:45",
    transferReason: "Technical support needed",
    recentDisposition: "Attended",
    assistant: "SupportBot",
    callSummary: "Customer reported technical issues with their online banking application, specifically unable to access account statements and transaction history. The automated system attempted basic troubleshooting but the issue required advanced technical support to resolve the authentication and data synchronization problems.",
    timeline: [
      {
        id: 1,
        timestamp: "14:20:45",
        action: "Call Started",
        description: "Customer called technical support",
        status: "completed"
      },
      {
        id: 2,
        timestamp: "14:22:15",
        action: "Bot Interaction",
        description: "Technical issue identified",
        status: "completed"
      },
      {
        id: 3,
        timestamp: "14:25:30",
        action: "Transfer Request",
        description: "Technical support needed",
        status: "completed"
      },
      {
        id: 4,
        timestamp: "14:28:10",
        action: "Transferred",
        description: "Call transferred to agent portal",
        status: "completed"
      },
      {
        id: 5,
        timestamp: "14:33:30",
        action: "Resolved",
        description: "Issue resolved by agent",
        status: "completed"
      }
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
      riskLevel: "Low"
    }
  }
];

// Assistant options
const assistantOptions = [
  { id: "support-bot", name: "SupportBot" },
  { id: "sales-ai", name: "SalesAI" },
  { id: "feedback-bot", name: "FeedbackBot" },
  { id: "survey-genie", name: "SurveyGenie" },
  { id: "reminder-bot", name: "ReminderBot" },
];

export default function AgentPortal() {
  const navigate = useNavigate();
  const [selectedAssistant, setSelectedAssistant] = useState(assistantOptions[0]);
  const [showAssistantDropdown, setShowAssistantDropdown] = useState(false);
  const [lastRefreshTime, setLastRefreshTime] = useState(new Date());
  const [refreshCounter, setRefreshCounter] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);

  // Filter calls based on selected assistant
  const filteredCalls = transferredCallsData.filter(call => 
    call.assistant === selectedAssistant.name
  );

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
      setRefreshCounter(prev => {
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

  const handleMarkAsAttended = (callId) => {
    // Update the call status
    const updatedCalls = transferredCallsData.map(call => 
      call.id === callId 
        ? { ...call, recentDisposition: "Attended" }
        : call
    );
    
    // In a real app, this would make an API call
    console.log(`Marked call ${callId} as attended`);
  };

  const handleLogout = () => {
    // Handle logout logic
    navigate("/");
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
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
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="hidden text-xl font-bold text-gray-900">Skit</div>
            </div>

            {/* Assistant Selector and Logout */}
            <div className="flex items-center space-x-4">
              {/* Assistant Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowAssistantDropdown(!showAssistantDropdown)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center space-x-2 min-w-[140px] justify-between"
                >
                  <span>{selectedAssistant.name}</span>
                  <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                </button>

                {showAssistantDropdown && (
                  <div className="absolute right-0 top-full mt-1 z-50">
                    <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-48">
                      <div className="p-2">
                        <div className="text-xs text-gray-500 px-2 py-1">Assistant</div>
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

      {/* Main Content */}
      <div className="flex h-[calc(100vh-80px)]">
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
                <ArrowPathIcon className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>Next refresh in: {refreshCounter}s</span>
              </div>
            </div>
            
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <ArrowPathIcon className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Now'}</span>
            </Button>
          </div>

          {/* Transferred Calls Table */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm h-[calc(100%-120px)]">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Transferred Calls - {selectedAssistant.name}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {filteredCalls.length} call{filteredCalls.length !== 1 ? 's' : ''} pending attention
              </p>
            </div>

            <div className="overflow-x-auto h-[calc(100%-80px)]">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCalls.map((call) => (
                    <tr 
                      key={call.id} 
                      className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedCall?.id === call.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
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
                          <span className="text-sm text-gray-500">Completed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredCalls.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full py-12">
                <div className="text-center">
                  <PhoneIcon className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-sm font-medium text-gray-900">No transferred calls</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    No calls have been transferred to {selectedAssistant.name} yet.
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

        {/* Right Panel - Call Details */}
        {selectedCall && (
          <div className="w-[500px] bg-white border-l border-gray-200 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Call Details</h3>
              <button
                onClick={() => setSelectedCall(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

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

            {/* Timeline */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                <ClockIcon className="w-4 h-4 mr-2" />
                Timeline
              </h4>
              <div className="space-y-3">
                {selectedCall.timeline.map((event, index) => (
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

            {/* User Attributes */}
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
                <div>
                  <span className="text-sm text-gray-600">Account Number:</span>
                  <div className="text-sm font-medium text-gray-900 font-mono">{selectedCall.userAttributes.accountNumber}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Customer Since:</span>
                  <div className="text-sm font-medium text-gray-900">{selectedCall.userAttributes.customerSince}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Last Interaction:</span>
                  <div className="text-sm font-medium text-gray-900">{selectedCall.userAttributes.lastInteraction}</div>
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
      </div>
    </div>
  );
}
