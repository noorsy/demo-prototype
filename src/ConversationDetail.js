import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { 
  ArrowLeftIcon,
  PhoneIcon,
  ClockIcon,
  UserIcon,
  MicrophoneIcon,
  ChartBarIcon,
  DocumentTextIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ArrowDownTrayIcon,
  LinkIcon
} from "@heroicons/react/24/outline";

// Mock conversation data
const conversationsData = [
  {
    id: 1,
    recipient: "+13366924145",
    virtualId: "+18773096471",
    createdAt: "August 27, 2025, 20:47 PM",
    duration: "43.20",
    status: "HANGUP",
    campaign: "Q2 Auto Recovery",
    agent: "Susan",
    assistant: "SupportBot",
    type: "outbound",
    channel: "Voice"
  },
  {
    id: 2,
    recipient: "+16613086517",
    virtualId: "+18773096471",
    createdAt: "August 27, 2025, 19:32 PM",
    duration: "67.45",
    status: "USER_HANGUP",
    campaign: "Q2 Auto Recovery",
    agent: "Marcus",
    assistant: "SalesAI",
    type: "inbound",
    channel: "Voice"
  }
];

// Mock transcript data
const transcriptData = {
  1: [
    { id: 1, speaker: "agent", message: "Hello, this is Sarah from MedCollect. I'm calling regarding your medical account. How are you today?", timestamp: "14:32:15" },
    { id: 2, speaker: "customer", message: "Hi, I'm doing okay. What is this about?", timestamp: "14:32:28" },
    { id: 3, speaker: "agent", message: "I'm calling about your outstanding medical bill of $2,450.00 from City General Hospital.", timestamp: "14:32:45" },
    { id: 4, speaker: "customer", message: "I can't afford to pay that much right now.", timestamp: "14:33:12" },
    { id: 5, speaker: "agent", message: "I understand. We have several payment options available. Would you be interested in setting up a payment plan?", timestamp: "14:33:28" }
  ],
  2: [
    { id: 1, speaker: "agent", message: "Good afternoon, this is Marcus from AutoRecovery Solutions. I'm calling about your vehicle loan.", timestamp: "15:22:10" },
    { id: 2, speaker: "customer", message: "What do you want?", timestamp: "15:22:25" },
    { id: 3, speaker: "agent", message: "I'm here to help you avoid repossession. Can we discuss your payment options?", timestamp: "15:22:40" },
    { id: 4, speaker: "customer", message: "I lost my job last month. I can't make the payments.", timestamp: "15:23:05" },
    { id: 5, speaker: "agent", message: "I'm sorry to hear that. Let me see what hardship programs we have available.", timestamp: "15:23:20" }
  ]
};

// Mock metadata
const metadataData = {
  1: {
    rawData: {
      conversationId: "uuid-xxxx-xxxxx--xxxxx",
      sessionId: "sess-1456",
      startTime: "2025-08-27T20:47:00Z",
      endTime: "2025-08-27T20:47:43Z",
      duration: 43.2,
      status: "HANGUP",
      audioQuality: 0.94,
      transcriptionConfidence: 0.89,
      sentimentScore: -0.2,
      intentDetected: ["payment_plan", "financial_hardship"],
      server: "us-east-1",
      mediaCodec: "G.711",
      bandwidth: "64kbps"
    },
    preCallAPI: {
      endpoint: "/api/v1/conversations/start",
      method: "POST",
      timestamp: "2025-08-27T20:46:58Z",
      request: {
        phoneNumber: "+13366924145",
        campaignId: "camp-123",
        assistantId: "support-bot-v2"
      },
      response: {
        conversationId: "uuid-xxxx-xxxxx--xxxxx",
        sessionId: "sess-1456",
        status: "initiated"
      }
    },
    postCallAPI: {
      endpoint: "/api/v1/conversations/complete",
      method: "POST",
      timestamp: "2025-08-27T20:47:45Z",
      request: {
        conversationId: "uuid-xxxx-xxxxx--xxxxx",
        endReason: "HANGUP",
        finalStatus: "incomplete"
      },
      response: {
        saved: true,
        transcriptId: "trans-789",
        audioFileId: "audio-456"
      }
    },
    compliance: {
      tcpa: {
        status: "COMPLIANT",
        consentObtained: true,
        consentTimestamp: "2025-08-27T20:46:45Z",
        consentMethod: "verbal_confirmation",
        optOutRequested: false,
        miniMirandaRead: true,
        miniMirandaTimestamp: "2025-08-27T20:47:05Z"
      },
      fdcpa: {
        status: "COMPLIANT",
        disclosureProvided: true,
        disclosureTimestamp: "2025-08-27T20:47:03Z",
        debtValidationOffered: true,
        disputeRightsExplained: true,
        inappropriateLanguage: false,
        harassmentDetected: false
      },
      businessHours: {
        status: "COMPLIANT",
        callStartTime: "20:47:00",
        callEndTime: "20:47:43",
        timezone: "EST",
        withinPermittedHours: true,
        permittedHoursStart: "08:00",
        permittedHoursEnd: "21:00"
      },
      doNotCall: {
        status: "COMPLIANT",
        numberChecked: true,
        onDncList: false,
        lastChecked: "2025-08-27T20:46:50Z",
        internalDncCheck: true,
        federalDncCheck: true
      }
    }
  }
};

// Mock conversation summary data
const conversationSummary = {
  summary: "This was a successful debt collection call where the customer acknowledged their outstanding debt of $2,847.50 and was cooperative throughout the conversation. The customer agreed to a payment plan of $200 per month starting next week and provided updated contact information and employment status. The customer expressed willingness to resolve the account and maintained a positive attitude during the discussion. A follow-up email with payment confirmation details will be sent, and the account has been tagged for monitoring."
};

export default function ConversationDetail() {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const [showMetadataModal, setShowMetadataModal] = useState(false);
  const [metadataTab, setMetadataTab] = useState("rawData");
  const [isConversationInfoCollapsed, setIsConversationInfoCollapsed] = useState(false);
  const [isConversationSummaryCollapsed, setIsConversationSummaryCollapsed] = useState(false);

  const conversation = conversationsData.find(conv => conv.id === parseInt(conversationId));
  const transcript = transcriptData[parseInt(conversationId)] || [];
  const metadata = metadataData[parseInt(conversationId)] || null;

  const getStatusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-800 border-green-200";
      case "HANGUP":
        return "bg-red-100 text-red-800 border-red-200";
      case "USER_HANGUP":
        return "bg-orange-100 text-orange-800 border-orange-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "inbound":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "outbound":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleBack = () => {
    navigate("/conversations");
  };

  const openGrafanaLogs = () => {
    // In a real app, this would open Grafana logs in a new tab
    console.log('Opening Grafana logs for conversation', conversationId);
    // Example: window.open(`https://grafana.company.com/logs?conversationId=${conversationId}`, '_blank');
  };

  const openTraces = () => {
    // In a real app, this would open traces in a new tab
    console.log('Opening traces for conversation', conversationId);
    // Example: window.open(`https://traces.company.com/trace?conversationId=${conversationId}`, '_blank');
  };

  const toggleConversationInfo = () => {
    setIsConversationInfoCollapsed(!isConversationInfoCollapsed);
  };

  const toggleConversationSummary = () => {
    setIsConversationSummaryCollapsed(!isConversationSummaryCollapsed);
  };

  const handleDownloadTranscript = () => {
    // In a real app, this would trigger transcript download
    console.log('Downloading transcript for conversation', conversationId);
    // Example: window.open(`/api/conversations/${conversationId}/transcript/download`, '_blank');
  };

  const handleCopyCallLink = async () => {
    // In a real app, this would copy the call link to clipboard
    const callLink = `${window.location.origin}/conversations/${conversationId}`;
    try {
      await navigator.clipboard.writeText(callLink);
      // You could add a toast notification here
      console.log('Call link copied to clipboard');
    } catch (err) {
      console.error('Failed to copy call link:', err);
    }
  };

  const renderMetadataContent = () => {
    const currentMetadata = metadataData[parseInt(conversationId)];
    
    if (!currentMetadata) {
      return (
        <div className="text-center py-8 text-gray-500">
          <p>No metadata available for this conversation</p>
        </div>
      );
    }

    switch (metadataTab) {
      case "rawData":
        return (
          <div className="bg-gray-50 rounded-lg p-4">
            <pre className="font-mono text-xs text-gray-700 whitespace-pre-wrap overflow-auto">
              {JSON.stringify(currentMetadata.rawData, null, 2)}
            </pre>
          </div>
        );
      
      case "preCallAPI":
        if (!currentMetadata.preCallAPI) {
          return (
            <div className="text-center py-8 text-gray-500">
              <p>No pre-call API data available</p>
            </div>
          );
        }
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-3">API Request</h4>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="font-medium w-20">Endpoint:</span>
                  <span className="text-gray-700">{currentMetadata.preCallAPI.endpoint}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-20">Method:</span>
                  <span className="text-gray-700">{currentMetadata.preCallAPI.method}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-20">Time:</span>
                  <span className="text-gray-700">{currentMetadata.preCallAPI.timestamp}</span>
                </div>
              </div>
              <div className="mt-3 bg-white rounded p-3">
                <pre className="font-mono text-xs text-gray-600">
                  {JSON.stringify(currentMetadata.preCallAPI.request, null, 2)}
                </pre>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-3">API Response</h4>
              <div className="bg-white rounded p-3">
                <pre className="font-mono text-xs text-gray-600">
                  {JSON.stringify(currentMetadata.preCallAPI.response, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        );
      
      case "postCallAPI":
        if (!currentMetadata.postCallAPI) {
          return (
            <div className="text-center py-8 text-gray-500">
              <p>No post-call API data available</p>
            </div>
          );
        }
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-3">API Request</h4>
              <div className="space-y-2 text-sm">
                <div className="flex">
                  <span className="font-medium w-20">Endpoint:</span>
                  <span className="text-gray-700">{currentMetadata.postCallAPI.endpoint}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-20">Method:</span>
                  <span className="text-gray-700">{currentMetadata.postCallAPI.method}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-20">Time:</span>
                  <span className="text-gray-700">{currentMetadata.postCallAPI.timestamp}</span>
                </div>
              </div>
              <div className="mt-3 bg-white rounded p-3">
                <pre className="font-mono text-xs text-gray-600">
                  {JSON.stringify(currentMetadata.postCallAPI.request, null, 2)}
                </pre>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-3">API Response</h4>
              <div className="bg-white rounded p-3">
                <pre className="font-mono text-xs text-gray-600">
                  {JSON.stringify(currentMetadata.postCallAPI.response, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        );
      
      case "compliance":
        if (!currentMetadata.compliance) {
          return (
            <div className="text-center py-8 text-gray-500">
              <p>No compliance data available</p>
            </div>
          );
        }
        return (
          <div className="space-y-4">
            {/* TCPA */}
            {currentMetadata.compliance.tcpa && (
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">TCPA Compliance</h4>
                  <Badge className={`${
                    currentMetadata.compliance.tcpa.status === 'COMPLIANT' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {currentMetadata.compliance.tcpa.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Consent Obtained:</span>
                    <span className="ml-2 font-medium">
                      {currentMetadata.compliance.tcpa.consentObtained ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Mini-Miranda Read:</span>
                    <span className="ml-2 font-medium">
                      {currentMetadata.compliance.tcpa.miniMirandaRead ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* FDCPA */}
            {currentMetadata.compliance.fdcpa && (
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">FDCPA Compliance</h4>
                  <Badge className={`${
                    currentMetadata.compliance.fdcpa.status === 'COMPLIANT' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {currentMetadata.compliance.fdcpa.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Disclosure Provided:</span>
                    <span className="ml-2 font-medium">
                      {currentMetadata.compliance.fdcpa.disclosureProvided ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Debt Validation Offered:</span>
                    <span className="ml-2 font-medium">
                      {currentMetadata.compliance.fdcpa.debtValidationOffered ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Business Hours */}
            {currentMetadata.compliance.businessHours && (
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">Business Hours</h4>
                  <Badge className={`${
                    currentMetadata.compliance.businessHours.status === 'COMPLIANT' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {currentMetadata.compliance.businessHours.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Call Time:</span>
                    <span className="ml-2 font-medium">{currentMetadata.compliance.businessHours.callStartTime}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Within Hours:</span>
                    <span className="ml-2 font-medium">
                      {currentMetadata.compliance.businessHours.withinPermittedHours ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Do Not Call */}
            {currentMetadata.compliance.doNotCall && (
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">Do Not Call</h4>
                  <Badge className={`${
                    currentMetadata.compliance.doNotCall.status === 'COMPLIANT' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {currentMetadata.compliance.doNotCall.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Number Checked:</span>
                    <span className="ml-2 font-medium">
                      {currentMetadata.compliance.doNotCall.numberChecked ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">On DNC List:</span>
                    <span className="ml-2 font-medium">
                      {currentMetadata.compliance.doNotCall.onDncList ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      default:
        return (
          <div className="text-center py-8 text-gray-500">
            <p>Select a tab to view metadata</p>
          </div>
        );
    }
  };

  if (!conversation) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Conversation Not Found</h1>
          <p className="text-gray-600 mb-4">The requested conversation could not be found.</p>
          <Button onClick={handleBack}>
            Back to Conversations
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header - AI Agent Details Style */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="text-gray-600 hover:text-gray-900 rounded-full p-2"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </Button>
              <div>
                <div className="flex items-center space-x-3">
                  <h1 className="text-xl font-bold text-gray-900">
                    Conversation Details
                  </h1>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    uuid-xxxx-xxxxx--xxxxx
                  </span>
                </div>
                
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadTranscript}
                className="flex items-center space-x-2"
              >
                <ArrowDownTrayIcon className="h-4 w-4" />
                <span>Download Transcript</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyCallLink}
                className="flex items-center space-x-2"
              >
                <LinkIcon className="h-4 w-4" />
                <span>Copy Call Link</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Call Details */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Conversation Information */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <span>Conversation Information</span>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleConversationInfo}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {isConversationInfoCollapsed ? (
                      <ChevronDownIcon className="h-4 w-4" />
                    ) : (
                      <ChevronUpIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              {!isConversationInfoCollapsed && (
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                        From
                      </div>
                      <div className="text-sm text-gray-900">
                        {conversation.recipient}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                        To
                      </div>
                      <div className="text-sm text-gray-900">
                        {conversation.virtualId}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                        Duration
                      </div>
                      <div className="text-sm text-gray-900">
                        {conversation.duration}s
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                        Status
                      </div>
                      <Badge className={`${getStatusColor(conversation.status)} text-xs`}>
                        {conversation.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                        Type
                      </div>
                      <Badge className={`${getTypeColor(conversation.type)} text-xs`}>
                        {conversation.type}
                      </Badge>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                        Channel
                      </div>
                      <div className="text-sm text-gray-900">
                        {conversation.channel}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100">
                    <div className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                      Created
                    </div>
                    <div className="text-sm text-gray-900">
                      {conversation.createdAt}
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>

            {/* Advanced Options */}
            <div className="space-y-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setMetadataTab('rawData'); // Reset to first tab
                  setShowMetadataModal(true);
                }}
                className="w-full flex items-center justify-center space-x-2"
              >
                <DocumentTextIcon className="h-4 w-4" />
                <span>View Metadata</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={openGrafanaLogs}
                className="w-full flex items-center justify-center space-x-2"
              >
                <ChartBarIcon className="h-4 w-4" />
                <span>Logs</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={openTraces}
                className="w-full flex items-center justify-center space-x-2"
              >
                <ChartBarIcon className="h-4 w-4" />
                <span>Open Traces</span>
              </Button>
            </div>
          </div>

          {/* Right Column - Transcript */}
          <div className="lg:col-span-2">
            
            {/* Conversation Summary */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <DocumentTextIcon className="h-5 w-5 text-blue-600" />
                    <span>Conversation Summary</span>
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleConversationSummary}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {isConversationSummaryCollapsed ? (
                      <ChevronDownIcon className="h-4 w-4" />
                    ) : (
                      <ChevronUpIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              {!isConversationSummaryCollapsed && (
                <CardContent>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {conversationSummary.summary}
                  </p>
                </CardContent>
              )}
            </Card>

            {/* Conversation Transcript */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <MicrophoneIcon className="h-5 w-5 text-gray-700" />
                    <span>Conversation Transcript</span>
                  </CardTitle>
                  {/* Audio Player moved here */}
                  <div className="flex items-center space-x-3">
                    <div className="text-xs text-gray-500 font-medium">
                      {conversation.duration}s
                    </div>
                    <audio 
                      controls 
                      className="h-8"
                      preload="metadata"
                    >
                      <source src={`/api/audio/conversation-${conversationId}.mp3`} type="audio/mpeg" />
                      <source src={`/api/audio/conversation-${conversationId}.wav`} type="audio/wav" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {transcript.length > 0 ? (
                    transcript.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.speaker === 'agent' ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-[75%] px-6 py-4 rounded-2xl shadow-sm ${
                            message.speaker === 'agent'
                              ? 'bg-gray-600 text-white'
                              : 'bg-white text-gray-900 border border-gray-200'
                          }`}
                        >
                          <div className="flex items-center space-x-3 mb-2">
                            <div className={`p-1 rounded-full ${
                              message.speaker === 'agent' ? 'bg-white/20' : 'bg-gray-100'
                            }`}>
                              {message.speaker === 'agent' ? (
                                <MicrophoneIcon className="h-4 w-4 text-white" />
                              ) : (
                                <UserIcon className="h-4 w-4 text-gray-600" />
                              )}
                            </div>
                            <span className="text-sm font-medium">
                              {message.speaker === 'agent' ? 'AI Agent' : 'Customer'}
                            </span>
                            <span className={`text-xs ${
                              message.speaker === 'agent' ? 'text-gray-200' : 'text-gray-500'
                            }`}>
                              {message.timestamp}
                            </span>
                          </div>
                          <p className="text-sm leading-relaxed">{message.message}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <MicrophoneIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-medium mb-2">No Transcript Available</h3>
                      <p>The transcript for this conversation is not available.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Metadata Modal - Redesigned */}
      {showMetadataModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Conversation Metadata</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMetadataModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Modal Body */}
            <div className="flex-1 overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-gray-200 px-6">
                <button
                  onClick={() => setMetadataTab("rawData")}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    metadataTab === "rawData"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Raw Data
                </button>
                <button
                  onClick={() => setMetadataTab("preCallAPI")}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    metadataTab === "preCallAPI"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Pre-call API
                </button>
                <button
                  onClick={() => setMetadataTab("postCallAPI")}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    metadataTab === "postCallAPI"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Post-call API
                </button>
                <button
                  onClick={() => setMetadataTab("compliance")}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    metadataTab === "compliance"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Compliance
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
                {renderMetadataContent()}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 