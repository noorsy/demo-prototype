import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { 
  PhoneIcon, 
  MicrophoneIcon, 
  ArrowRightIcon,
  PlayIcon,
  ClockIcon,
  UserIcon,
  PencilIcon,
  ExclamationTriangleIcon,
  ChevronDownIcon,
  ArrowLeftIcon,
  ChevronUpIcon,
  EyeIcon,
  UserPlusIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon
} from "@heroicons/react/24/outline";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./components/ui/dropdown-menu";

const DemoPage = () => {
  const { demoId } = useParams();
  const navigate = useNavigate();
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState("");
  const [customPhoneNumber, setCustomPhoneNumber] = useState("");
  const [showPreCheck, setShowPreCheck] = useState(false);
  const [showIncomingCalls, setShowIncomingCalls] = useState(false);
  const [showCallsList, setShowCallsList] = useState(false);

  // Demo data
  const demo = {
    id: demoId,
    title: "3P Demo - Medical",
    subtitle: "Medical Debt Collection Demo - English",
    phoneNumber: "+1 (555) 123-4567",
    description: "Experience our AI-powered medical debt collection system with compliance checks and natural conversation flow.",
    features: [
      "FDCPA Compliance Checks",
      "Mini-Miranda Disclosure",
      "Payment Plan Options",
      "Dispute Handling"
    ]
  };

  const sampleQuestions = [
    "I can't afford to pay this amount right now",
    "I want to dispute this debt",
    "Can I set up a payment plan?",
    "What are my rights as a consumer?",
    "I need more time to pay this"
  ];

  const phoneNumbers = [
    { label: "Primary", number: "+1 (555) 123-4567" },
    { label: "Secondary", number: "+1 (555) 987-6543" },
    { label: "Custom", number: "custom" }
  ];

  const incomingCalls = [
    { id: 1, caller: "John Smith", number: "+1 (555) 123-4567", time: "2:30 PM", duration: "0:45", status: "live" },
    { id: 2, caller: "Sarah Johnson", number: "+1 (555) 234-5678", time: "2:15 PM", duration: "1:23", status: "live" },
    { id: 3, caller: "Mike Wilson", number: "+1 (555) 345-6789", time: "1:45 PM", duration: "0:32", status: "completed" },
    { id: 4, caller: "Lisa Brown", number: "+1 (555) 456-7890", time: "1:20 PM", duration: "2:15", status: "live" },
    { id: 5, caller: "David Lee", number: "+1 (555) 567-8901", time: "12:55 PM", duration: "0:18", status: "completed" }
  ];

  const handleBack = () => {
    navigate("/experience-center");
  };

  const handleWebCall = () => {
    navigate(`/demo-transcript/${demoId}`);
  };

  const handlePhoneModal = () => {
    setShowPhoneModal(true);
  };

  const handleIncomingCalls = () => {
    setShowIncomingCalls(true);
    setShowCallsList(false);
    
    // Show calls list after 1 second
    setTimeout(() => {
      setShowCallsList(true);
    }, 1000);
  };

  const handlePhoneCall = () => {
    setShowPhoneModal(false);
    setShowPreCheck(true);
    
    // Simulate pre-check process
    setTimeout(() => {
      setShowPreCheck(false);
      navigate(`/demo-transcript/${demoId}`);
    }, 3000);
  };

  const handlePhoneNumberSelect = (number) => {
    if (number === "custom") {
      setSelectedPhoneNumber("custom");
    } else {
      setSelectedPhoneNumber(number);
      setCustomPhoneNumber("");
    }
  };

  if (showIncomingCalls) {
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
                  onClick={() => setShowIncomingCalls(false)}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 rounded-full p-2"
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                </Button>
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-gray-100 rounded-xl">
                    <PhoneIcon className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <h1 className="text-xl font-semibold text-gray-900">Incoming Calls</h1>
                    <p className="text-gray-600 font-medium">Live call monitoring and management</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Side - Phone Number and QR Code */}
            <div className="text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Call This Number</h3>
                <div className="text-3xl font-mono font-bold text-gray-900 mb-4">{demo.phoneNumber}</div>
                <div className="w-48 h-48 mx-auto bg-white rounded-lg flex items-center justify-center border-2 border-gray-200">
                  <div className="text-center text-gray-500">
<img src="/images/qr_code.svg" alt="QR Code" className="w-32 h-32 mx-auto" />
                    <div className="text-sm">QR Code</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side - Live Calls List */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Calls</h3>
              {!showCallsList ? (
                <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl">
                  <div className="text-gray-500 text-lg">No incoming calls yet</div>
                  <div className="text-gray-400 text-sm mt-2">Call the number to see calls appear here</div>
                </div>
              ) : (
                <div className="space-y-3">
                  {incomingCalls.map((call) => (
                    <div 
                      key={call.id} 
                      className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/demo-transcript/${demoId}`)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <PhoneIcon className="h-5 w-5 text-gray-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{call.caller}</div>
                            <div className="text-sm text-gray-500">{call.number}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{call.time}</div>
                          <div className="text-xs text-gray-500">{call.duration}</div>
                          <Badge 
                            variant={call.status === "completed" ? "default" : call.status === "live" ? "destructive" : "secondary"}
                            className="text-xs mt-1"
                          >
                            {call.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showPreCheck) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md border-0 bg-white/80 backdrop-blur-sm shadow-lg rounded-3xl overflow-hidden">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-gray-600 mx-auto mb-6"></div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Pre-Call Checks</h2>
            <p className="text-gray-600 mb-4">Running compliance and system checks...</p>
            <div className="space-y-2 text-sm text-gray-500">
              <div>✓ FDCPA Compliance Check</div>
              <div>✓ Call Time Verification</div>
              <div>✓ System Status Check</div>
            </div>
          </CardContent>
        </Card>
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
                  <MicrophoneIcon className="h-5 w-5 text-gray-700" />
                </div>
                <div className="flex items-center space-x-4">
                  <h1 className="text-xl font-semibold text-gray-900">{demo.title}</h1>
                  <p className="text-gray-600 font-medium">{demo.subtitle}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowUserDetails(!showUserDetails)}
                className="ml-auto flex items-center space-x-2 rounded-full bg-white/80 hover:bg-white border-gray-200"
              >
                <UserIcon className="h-4 w-4" />
                <span>Show Details</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Main Content */}
        <div className={`flex-1 p-6 ${!showUserDetails ? 'flex justify-center' : ''}`}>
          <div className={`${!showUserDetails ? 'w-full max-w-4xl' : 'w-full'}`}>
            {/* Navigation Buttons */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2 rounded-full bg-white/80 hover:bg-white border-gray-200">
                    <UserIcon className="h-4 w-4 text-gray-700" />
                    <span>Personalise and Share</span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <EyeIcon className="h-4 w-4 text-gray-700" />
                    <span>View Prospects</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex items-center space-x-3 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <UserPlusIcon className="h-4 w-4 text-gray-700" />
                    <span>Add Prospects</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button variant="outline" className="flex items-center space-x-2 rounded-full bg-white/80 hover:bg-white border-gray-200">
                <ChatBubbleLeftRightIcon className="h-4 w-4 text-gray-700" />
                <span>Conversations</span>
              </Button>
              
              <Button variant="outline" className="flex items-center space-x-2 rounded-full bg-white/80 hover:bg-white border-gray-200">
                <ChartBarIcon className="h-4 w-4 text-gray-700" />
                <span>Analytics</span>
              </Button>
            </div>

            {/* Experience Cards */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
              {/* Phone Experience */}
              <Card className="group border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-4 bg-gradient-to-br from-gray-600 to-gray-700 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <PhoneIcon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex items-center space-x-4">
                      <CardTitle className="text-lg font-semibold text-gray-900">Phone Experience</CardTitle>
                      <p className="text-gray-600 font-medium">Call the demo number to experience the conversation</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Call Options */}
                  <div className="space-y-4">
                    <Button
                      onClick={handlePhoneModal}
                      className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white rounded-2xl py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <PhoneIcon className="h-6 w-6 mr-3" />
                      Start Phone Call
                    </Button>
                    
                    <div className="flex items-center justify-between bg-white/60 rounded-2xl p-4">
                      <span className="text-sm text-gray-600 font-medium">or dial <span className="font-mono font-bold text-gray-900">{demo.phoneNumber}</span> directly</span>
                      <button
                        onClick={handleIncomingCalls}
                        className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium transition-colors"
                      >
                        5 incoming calls
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Web Experience */}
              <Card className="group border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-2xl rounded-3xl overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl group-hover:scale-110 transition-transform duration-300">
                      <MicrophoneIcon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex items-center space-x-4">
                      <CardTitle className="text-lg font-semibold text-gray-900">Web Experience</CardTitle>
                      <p className="text-gray-600 font-medium">Try the conversation in your browser</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button
                    onClick={handleWebCall}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-2xl py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <PlayIcon className="h-6 w-6 mr-3" />
                    Start Web Call
                  </Button>
                  
                  <div className="flex items-center justify-center bg-white/60 rounded-2xl p-4 mt-4">
                    <span className="text-sm text-gray-600 font-medium">Please ensure your microphone permissions are enabled</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sample Questions */}
            <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-lg rounded-3xl overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl">
                    <ChatBubbleLeftRightIcon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Sample Questions to Try</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {sampleQuestions.map((question, index) => (
                    <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl border border-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-300 cursor-pointer group">
                      <p className="text-gray-700 font-medium group-hover:text-gray-800 transition-colors">
                        "{question}"
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* User Details Sidebar - Only show when toggled */}
        {showUserDetails && (
          <div className="w-96 bg-white/90 backdrop-blur-sm border-l border-gray-200/50 p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">User Details</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUserDetails(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <ChevronUpIcon className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Customer Information</h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Name:</span>
                    <span className="text-sm font-medium text-gray-900">John Smith</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Phone:</span>
                    <span className="text-sm font-medium text-gray-900">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Account:</span>
                    <span className="text-sm font-medium text-gray-900">#ACC-789123</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Balance:</span>
                    <span className="text-sm font-medium text-gray-900">$2,450.00</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Call History</h4>
                <div className="space-y-2">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Previous Call</p>
                        <p className="text-xs text-gray-600">2 days ago</p>
                      </div>
                      <Badge variant="outline" className="text-xs">No Answer</Badge>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-gray-900">Initial Contact</p>
                        <p className="text-xs text-gray-600">1 week ago</p>
                      </div>
                      <Badge variant="outline" className="text-xs">Left Message</Badge>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Payment Options</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-sm">
                    <span className="font-mono">$245.00</span>
                    <span className="ml-2">Monthly Payment</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm">
                    <span className="font-mono">$1,225.00</span>
                    <span className="ml-2">50% Settlement</span>
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm">
                    <span className="font-mono">$1,960.00</span>
                    <span className="ml-2">20% Settlement</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Phone Number Selection Modal */}
      {showPhoneModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md border-0 bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">Select Phone Number</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPhoneModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {phoneNumbers.map((option, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => handlePhoneNumberSelect(option.number)}>
                    <span className="font-medium text-gray-700">{option.label}:</span> <span className="font-mono">{option.number}</span>
                  </div>
                ))}
              </div>
              
              {selectedPhoneNumber === "custom" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Custom Phone Number</label>
                  <Input
                    type="tel"
                    placeholder="Enter phone number"
                    value={customPhoneNumber}
                    onChange={(e) => setCustomPhoneNumber(e.target.value)}
                    className="w-full rounded-2xl border-gray-200 focus:border-gray-500 focus:ring-gray-500"
                  />
                </div>
              )}
              
              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowPhoneModal(false)}
                  className="flex-1 rounded-2xl"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePhoneCall}
                  className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 rounded-2xl"
                >
                  Start Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DemoPage;
