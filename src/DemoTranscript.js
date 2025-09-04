import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { 
  PhoneIcon, 
  MicrophoneIcon, 
  ArrowLeftIcon,
  ClockIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  CodeBracketIcon,
  ShieldCheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon
} from "@heroicons/react/24/outline";

const demoData = {
  "3p-medical": {
    title: "3P Demo - Medical",
    phoneNumber: "+18668310489"
  },
  "1p-medical": {
    title: "1P Medical Self Pay Demo",
    phoneNumber: "+18668310490"
  },
  "credit-card": {
    title: "Credit Card Recovery",
    phoneNumber: "+18668310491"
  },
  "auto-loan": {
    title: "Auto Loan Recovery",
    phoneNumber: "+18668310492"
  },
  "student-loan": {
    title: "Student Loan Assistance",
    phoneNumber: "+18668310493"
  },
  "mortgage": {
    title: "Mortgage Assistance",
    phoneNumber: "+18668310494"
  }
};

// Mock conversation data
const conversationData = [
  {
    id: 1,
    speaker: "agent",
    message: "Hello, this is Sarah from MedCollect. I'm calling regarding your medical account. How are you today?",
    timestamp: "14:32:15"
  },
  {
    id: 2,
    speaker: "customer",
    message: "Hi, I'm doing okay. What is this about?",
    timestamp: "14:32:28"
  },
  {
    id: 3,
    speaker: "agent",
    message: "I'm calling about your outstanding medical bill of $2,450.00 from City General Hospital. I'd like to help you resolve this today. Are you able to make a payment?",
    timestamp: "14:32:45"
  },
  {
    id: 4,
    speaker: "customer",
    message: "I can't afford to pay that much right now. I'm having some financial difficulties.",
    timestamp: "14:33:12"
  },
  {
    id: 5,
    speaker: "agent",
    message: "I understand, and I'm here to help. We have several payment options available. Would you be interested in setting up a payment plan?",
    timestamp: "14:33:28"
  },
  {
    id: 6,
    speaker: "customer",
    message: "What kind of payment plan options do you have?",
    timestamp: "14:33:45"
  },
  {
    id: 7,
    speaker: "agent",
    message: "We can set up a monthly payment plan starting as low as $50 per month. This would help make the payments more manageable for you. Would you like to proceed with this option?",
    timestamp: "14:34:02"
  },
  {
    id: 8,
    speaker: "customer",
    message: "That sounds reasonable. How do I set this up?",
    timestamp: "14:34:18"
  },
  {
    id: 9,
    speaker: "agent",
    message: "Great! I can set this up for you right now. I'll need to verify some information first. Can you confirm your date of birth?",
    timestamp: "14:34:35"
  },
  {
    id: 10,
    speaker: "customer",
    message: "Sure, it's March 15th, 1985.",
    timestamp: "14:34:52"
  }
];

// Mock logs data with different types
const logsData = [
  {
    id: 1,
    timestamp: "14:32:10",
    type: "api",
    method: "GET",
    action: "fetch_user",
    request: {
      url: "/api/users/12345",
      headers: {
        "Authorization": "Bearer token123",
        "Content-Type": "application/json"
      }
    },
    response: {
      status: 200,
      data: {
        id: 12345,
        name: "John Smith",
        phone: "+15551234567",
        email: "john.smith@email.com",
        accountNumber: "ACC-789456123",
        balance: 2450.00,
        lastPayment: "2024-01-15"
      }
    },
    duration: "45ms"
  },
  {
    id: 2,
    timestamp: "14:32:12",
    type: "compliance",
    action: "mini_miranda",
    description: "Mini-Miranda disclosure read",
    status: "completed",
    duration: "120ms"
  },
  {
    id: 3,
    timestamp: "14:32:15",
    type: "api",
    method: "POST",
    action: "start_conversation",
    request: {
      url: "/api/conversations/start",
      body: {
        userId: 12345,
        campaignId: "med-001",
        phoneNumber: "+15551234567"
      },
      headers: {
        "Authorization": "Bearer token123",
        "Content-Type": "application/json"
      }
    },
    response: {
      status: 201,
      data: {
        conversationId: "conv-789",
        sessionId: "sess-456",
        status: "active"
      }
    },
    duration: "89ms"
  },
  {
    id: 4,
    timestamp: "14:32:28",
    type: "api",
    method: "POST",
    action: "process_speech",
    request: {
      url: "/api/speech/process",
      body: {
        audioData: "base64_encoded_audio",
        conversationId: "conv-789"
      },
      headers: {
        "Authorization": "Bearer token123",
        "Content-Type": "application/json"
      }
    },
    response: {
      status: 200,
      data: {
        transcript: "Hi, I'm doing okay. What is this about?",
        confidence: 0.95,
        intent: "greeting_response"
      }
    },
    duration: "156ms"
  },
  {
    id: 5,
    timestamp: "14:32:45",
    type: "api",
    method: "GET",
    action: "fetch_account",
    request: {
      url: "/api/accounts/ACC-789456123",
      headers: {
        "Authorization": "Bearer token123",
        "Content-Type": "application/json"
      }
    },
    response: {
      status: 200,
      data: {
        accountNumber: "ACC-789456123",
        balance: 2450.00,
        dueDate: "2024-02-15",
        lastPayment: "2024-01-15",
        paymentHistory: [
          { date: "2024-01-15", amount: 100.00 },
          { date: "2023-12-15", amount: 150.00 }
        ]
      }
    },
    duration: "67ms"
  },
  {
    id: 6,
    timestamp: "14:33:12",
    type: "api",
    method: "POST",
    action: "process_speech",
    request: {
      url: "/api/speech/process",
      body: {
        audioData: "base64_encoded_audio",
        conversationId: "conv-789"
      },
      headers: {
        "Authorization": "Bearer token123",
        "Content-Type": "application/json"
      }
    },
    response: {
      status: 200,
      data: {
        transcript: "I can't afford to pay that much right now. I'm having some financial difficulties.",
        confidence: 0.92,
        intent: "financial_hardship"
      }
    },
    duration: "134ms"
  },
  {
    id: 7,
    timestamp: "14:33:28",
    type: "api",
    method: "GET",
    action: "get_payment_options",
    request: {
      url: "/api/payment-options/user/12345",
      headers: {
        "Authorization": "Bearer token123",
        "Content-Type": "application/json"
      }
    },
    response: {
      status: 200,
      data: {
        options: [
          { type: "payment_plan", minAmount: 50, maxAmount: 200 },
          { type: "settlement", discount: 0.2, minAmount: 1960 },
          { type: "deferred", months: 3 }
        ]
      }
    },
    duration: "78ms"
  },
  {
    id: 8,
    timestamp: "14:33:45",
    type: "compliance",
    action: "fdpa_check",
    description: "FDCPA compliance verification",
    status: "passed",
    duration: "95ms"
  },
  {
    id: 9,
    timestamp: "14:34:02",
    type: "api",
    method: "POST",
    action: "calculate_payment_plan",
    request: {
      url: "/api/payment-plans/calculate",
      body: {
        userId: 12345,
        balance: 2450.00,
        preferredAmount: 50
      },
      headers: {
        "Authorization": "Bearer token123",
        "Content-Type": "application/json"
      }
    },
    response: {
      status: 200,
      data: {
        monthlyPayment: 50,
        totalMonths: 49,
        totalInterest: 0,
        firstPaymentDate: "2024-03-15"
      }
    },
    duration: "95ms"
  },
  {
    id: 10,
    timestamp: "14:34:18",
    type: "api",
    method: "POST",
    action: "process_speech",
    request: {
      url: "/api/speech/process",
      body: {
        audioData: "base64_encoded_audio",
        conversationId: "conv-789"
      },
      headers: {
        "Authorization": "Bearer token123",
        "Content-Type": "application/json"
      }
    },
    response: {
      status: 200,
      data: {
        transcript: "That sounds reasonable. How do I set this up?",
        confidence: 0.94,
        intent: "agreement"
      }
    },
    duration: "128ms"
  },
  {
    id: 11,
    timestamp: "14:34:35",
    type: "compliance",
    action: "identity_verification",
    description: "Identity verification initiated",
    status: "in_progress",
    duration: "203ms"
  },
  {
    id: 12,
    timestamp: "14:34:52",
    type: "api",
    method: "POST",
    action: "process_speech",
    request: {
      url: "/api/speech/process",
      body: {
        audioData: "base64_encoded_audio",
        conversationId: "conv-789"
      },
      headers: {
        "Authorization": "Bearer token123",
        "Content-Type": "application/json"
      }
    },
    response: {
      status: 200,
      data: {
        transcript: "Sure, it's March 15th, 1985.",
        confidence: 0.96,
        intent: "dob_provided"
      }
    },
    duration: "145ms"
  }
];

export default function DemoTranscript() {
  const { demoId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(0);
  const [currentLog, setCurrentLog] = useState(0);
  const [isDrawerCollapsed, setIsDrawerCollapsed] = useState(false);
  const [expandedLogs, setExpandedLogs] = useState({});

  const demo = demoData[demoId];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentMessage(prev => {
          if (prev < conversationData.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
        
        setCurrentLog(prev => {
          if (prev < logsData.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleBack = () => {
    navigate(`/experience-center/${demoId}`);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const resetConversation = () => {
    setCurrentMessage(0);
    setCurrentLog(0);
    setIsPlaying(false);
  };

  const toggleLogExpansion = (logId) => {
    setExpandedLogs(prev => ({
      ...prev,
      [logId]: !prev[logId]
    }));
  };

  const renderLogContent = (log) => {
    if (log.type === "api") {
      return (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Badge 
              variant={log.method === "GET" ? "default" : "secondary"}
              className={`text-xs ${
                log.method === "GET" 
                  ? "bg-gray-100 text-gray-800" 
                  : "bg-green-100 text-green-800"
              }`}
            >
              {log.method}
            </Badge>
            <span className="text-sm font-mono text-gray-800">{log.action}</span>
          </div>
          
          {expandedLogs[log.id] && (
            <div className="space-y-3 mt-3">
              <div>
                <div className="text-xs font-medium text-gray-600 mb-1">Request:</div>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                  {JSON.stringify(log.request, null, 2)}
                </pre>
              </div>
              <div>
                <div className="text-xs font-medium text-gray-600 mb-1">Response:</div>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">
                  {JSON.stringify(log.response, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      );
    } else if (log.type === "compliance") {
      return (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <ShieldCheckIcon className="h-4 w-4 text-green-600" />
            <span className="text-sm font-mono text-gray-800">{log.action}</span>
            <Badge 
              variant="outline"
              className={`text-xs ${
                log.status === "completed" || log.status === "passed"
                  ? "bg-green-100 text-green-800 border-green-200"
                  : log.status === "in_progress"
                  ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                  : "bg-red-100 text-red-800 border-red-200"
              }`}
            >
              {log.status}
            </Badge>
          </div>
          <div className="text-xs text-gray-600">{log.description}</div>
        </div>
      );
    }
  };

  if (!demo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Demo Not Found</h1>
          <p className="text-gray-600 mb-4">The requested demo could not be found.</p>
          <Button onClick={() => navigate("/experience-center")}>
            Back to Experience Center
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 shadow-sm">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-full p-2"
              >
                <ArrowLeftIcon className="h-5 w-5" />

              </Button>
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-gray-100 rounded-xl">
                  <ChatBubbleLeftRightIcon className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">{demo.title}</h1>
                  <p className="text-gray-600 font-medium">Live Call Transcript</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Main Content - Transcript */}
        <div className="flex-1 flex flex-col">
          {/* Controls */}
          <div className="bg-white/60 backdrop-blur-sm border-b border-gray-200/50 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                  <span className="text-base font-medium text-gray-700">Live Call</span>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <PhoneIcon className="h-5 w-5" />
                  <span className="font-medium">{demo.phoneNumber}</span>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsDrawerCollapsed(!isDrawerCollapsed)}
                  className="flex items-center space-x-2 bg-white/80 hover:bg-white border-gray-200/50 rounded-full px-4"
                >
                  <CodeBracketIcon className="h-4 w-4" />
                  <span>{isDrawerCollapsed ? "Show Logs" : "Hide Logs"}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={togglePlay}
                  className="flex items-center space-x-2 bg-white/80 hover:bg-white border-gray-200/50 rounded-full px-4"
                >
                  {isPlaying ? (
                    <PauseIcon className="h-4 w-4" />
                  ) : (
                    <PlayIcon className="h-4 w-4" />
                  )}
                  <span>{isPlaying ? "Pause" : "Play"}</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetConversation}
                  className="flex items-center space-x-2 bg-white/80 hover:bg-white border-gray-200/50 rounded-full px-4"
                >
                  <StopIcon className="h-4 w-4" />
                  <span>Reset</span>
                </Button>
              </div>
            </div>
          </div>

          {/* Conversation */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="max-w-4xl mx-auto space-y-6">
              {conversationData.slice(0, currentMessage + 1).map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.speaker === 'agent' ? 'justify-start' : 'justify-end'} animate-fade-in`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`max-w-3xl px-6 py-4 rounded-3xl shadow-lg ${
                      message.speaker === 'agent'
                        ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white'
                        : 'bg-white text-gray-900 border border-gray-200'
                    }`}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`p-1 rounded-full ${
                        message.speaker === 'agent' 
                          ? 'bg-white/20' 
                          : 'bg-gray-100'
                      }`}>
                        {message.speaker === 'agent' ? (
                          <MicrophoneIcon className="h-4 w-4 text-white" />
                        ) : (
                          <UserIcon className="h-4 w-4 text-gray-700" />
                        )}
                      </div>
                      <span className="text-sm font-semibold">
                        {message.speaker === 'agent' ? 'AI Agent' : 'Customer'}
                      </span>
                      <span className={`text-xs ${
                        message.speaker === 'agent' ? 'text-gray-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{message.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Logs Sidebar - Only show when not collapsed */}
        {!isDrawerCollapsed && (
          <div className="w-96 bg-white/90 backdrop-blur-sm border-l border-gray-200/50 flex flex-col shadow-xl">
            <div className="p-6 border-b border-gray-200/50">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-xl">
                  <CodeBracketIcon className="h-5 w-5 text-gray-700" />
                </div>
                <span>Call Logs</span>
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                {logsData.slice(0, currentLog + 1).map((log, index) => (
                  <div
                    key={log.id}
                    className={`rounded-2xl p-4 border-l-4 shadow-sm transition-all duration-300 animate-fade-in ${
                      log.type === "api" 
                        ? "border-gray-500 bg-gray-50/50" 
                        : "border-green-500 bg-green-50/50"
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-gray-500 bg-white/60 px-2 py-1 rounded-full">
                        {log.timestamp}
                      </span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs bg-white/80">
                          {log.duration}
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleLogExpansion(log.id)}
                          className="h-6 w-6 p-0 rounded-full hover:bg-white/80"
                        >
                          {expandedLogs[log.id] ? (
                            <ChevronUpIcon className="h-3 w-3" />
                          ) : (
                            <ChevronDownIcon className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </div>
                    {renderLogContent(log)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
