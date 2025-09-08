import React, { useState } from "react";
import PageHeaderWithTabs from "./components/PageHeaderWithTabs";
import { PlusIcon, PencilIcon, TrashIcon, UsersIcon, ClockIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

// Assistant options
const assistantOptions = [
  { id: "support-bot", name: "SupportBot" },
  { id: "sales-ai", name: "SalesAI" },
  { id: "feedback-bot", name: "FeedbackBot" },
  { id: "survey-genie", name: "SurveyGenie" },
  { id: "reminder-bot", name: "ReminderBot" },
];

// Sample segments data
const sampleSegments = [
  {
    id: 1,
    name: "High Risk Customers",
    description: "Customers with payment history issues",
    assistant: "SupportBot",
    conditions: [
      { attribute: "payment_history", condition: "equals", value: "poor" },
      { attribute: "dpd_bucket", condition: "greater_than", value: "60" }
    ],
    customerCount: 1250,
    lastUpdated: "2024-01-15",
    status: "active",
    isAIGenerated: false,
    aiRecommendation: {
      type: "condition_update",
      title: "Optimize segment conditions",
      description: "AI suggests adding income_level filter to improve targeting accuracy by 28%",
      suggestedConditions: [
        { attribute: "payment_history", condition: "equals", value: "poor" },
        { attribute: "dpd_bucket", condition: "greater_than", value: "60" },
        { attribute: "income_level", condition: "less_than", value: "40000" }
      ],
      expectedImpact: "+28% targeting accuracy, +15% conversion rate"
    }
  },
  {
    id: 2,
    name: "New Customers",
    description: "Recently onboarded customers",
    assistant: "SalesAI",
    conditions: [
      { attribute: "account_age", condition: "less_than", value: "30" },
      { attribute: "status", condition: "equals", value: "active" }
    ],
    customerCount: 450,
    lastUpdated: "2024-01-14",
    status: "active",
    isAIGenerated: true,
    aiRecommendation: null
  },
  {
    id: 3,
    name: "VIP Customers",
    description: "High value customers with excellent payment history",
    assistant: "SupportBot",
    conditions: [
      { attribute: "account_balance", condition: "greater_than", value: "10000" },
      { attribute: "payment_history", condition: "equals", value: "excellent" }
    ],
    customerCount: 180,
    lastUpdated: "2024-01-12",
    status: "active",
    isAIGenerated: false,
    aiRecommendation: {
      type: "journey_update",
      title: "Enhanced VIP journey",
      description: "AI recommends personalized email sequence for VIP customers to increase engagement",
      suggestedJourney: "Personalized Email → 1 Day Delay → Premium Voice Call → Thank You SMS",
      expectedImpact: "+35% engagement rate, +20% satisfaction score"
    }
  },
  {
    id: 4,
    name: "Late Payment Follow-up",
    description: "Customers requiring payment reminders",
    assistant: "ReminderBot",
    conditions: [
      { attribute: "dpd_bucket", condition: "greater_than", value: "30" },
      { attribute: "last_contact", condition: "greater_than", value: "7" }
    ],
    customerCount: 890,
    lastUpdated: "2024-01-13",
    status: "active",
    isAIGenerated: true,
    aiRecommendation: null
  }
];

export default function Workflows() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Segments");
  const [segments, setSegments] = useState(sampleSegments);
  const [selectedAssistant, setSelectedAssistant] = useState(assistantOptions[0]);
  const [showAssistantDropdown, setShowAssistantDropdown] = useState(false);
  const [showAIRecommendation, setShowAIRecommendation] = useState({});
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [showCreateStage, setShowCreateStage] = useState(false);
  const [showCreateDropdown, setShowCreateDropdown] = useState(false);
  const [dpdStages, setDpdStages] = useState([
    {
      id: 0,
      name: "Pre-Due",
      description: "Proactive contact before payment due date to ensure customer awareness",
      color: "blue",
      fromDays: -5,
      toDays: 0
    },
    {
      id: 1,
      name: "Early Stage",
      description: "Initial contact to remind customers of their overdue payment",
      color: "green",
      fromDays: 1,
      toDays: 15
    },
    {
      id: 2,
      name: "Mid Stage", 
      description: "A follow-up notice to urge payment while the account is moderately overdue.",
      color: "orange",
      fromDays: 16,
      toDays: 30
    },
    {
      id: 3,
      name: "Late Stage",
      description: "A firm reminder indicating increasing delinquency and encouraging immediate action.",
      color: "red",
      fromDays: 31,
      toDays: 60
    },
    {
      id: 4,
      name: "Very Late Stage",
      description: "Final warning before the account enters serious delinquency or charge-off.",
      color: "purple",
      fromDays: 61,
      toDays: 90
    },
    {
      id: 5,
      name: "Pre-Chargeoff",
      description: "Critical notice sent before the account is charged off, urging last-minute resolution.",
      color: "gray",
      fromDays: 91,
      toDays: 120
    },
    {
      id: 6,
      name: "Post-Chargeoff",
      description: "Contact attempt after charge-off to inform customers of collection or recovery steps.",
      color: "black",
      fromDays: 121,
      toDays: 999
    }
  ]);

  const filteredSegments = segments.filter(segment => {
    const matchesAssistant = segment.assistant === selectedAssistant.name;
    return matchesAssistant;
  });

  const handleDeleteSegment = (id) => {
    setSegments(segments.filter(segment => segment.id !== id));
  };

  const getStatusBadge = (status) => {
    const baseClasses = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    if (status === "active") {
      return `${baseClasses} bg-green-100 text-green-800`;
    }
    return `${baseClasses} bg-gray-100 text-gray-800`;
  };

  const formatConditions = (conditions) => {
    return conditions.map(condition => 
      `${condition.attribute} ${condition.condition} ${condition.value}`
    ).join(", ");
  };

    // Create filters array for PageHeaderWithTabs
  const filters = activeTab === "Segments" ? [
    {
      key: "assistant",
      value: selectedAssistant.name,
      onClick: () => setShowAssistantDropdown(!showAssistantDropdown),
    },
  ] : [];

  // Tab configuration
  const tabs = [
    { value: "Segments", label: "Segments" },
    { value: "DPD Configuration", label: "DPD Configuration" },
    { value: "Persona", label: "Persona" }
  ];

  // AI Generate Segment handler
  const handleAIGenerateSegment = async () => {
    setIsGeneratingAI(true);
    setShowCreateDropdown(false);
    // Simulate AI generation
    setTimeout(() => {
      const newAISegment = {
        id: Date.now(),
        name: "AI-Generated: High Conversion Prospects",
        description: "AI-identified customers with high likelihood of payment completion",
        assistant: "SalesAI",
        conditions: [
          { attribute: "payment_history", condition: "equals", value: "good" },
          { attribute: "income_stability", condition: "equals", value: "high" },
          { attribute: "contact_responsiveness", condition: "greater_than", value: "70" }
        ],
        customerCount: 2340,
        lastUpdated: new Date().toISOString().split('T')[0],
        status: "active",
        isAIGenerated: true,
        aiRecommendation: null
      };
      setSegments(prev => [newAISegment, ...prev]);
      setIsGeneratingAI(false);
    }, 2000);
  };

  // Handle manual segment creation
  const handleCreateManually = () => {
    setShowCreateDropdown(false);
    navigate("/workflows/segments/create");
  };

  // Handle AI recommendation actions
  const handleAcceptRecommendation = (segmentId) => {
    setSegments(prev => prev.map(segment => 
      segment.id === segmentId 
        ? { ...segment, aiRecommendation: null, lastUpdated: new Date().toISOString().split('T')[0] }
        : segment
    ));
    setShowAIRecommendation(prev => ({ ...prev, [segmentId]: false }));
  };

  const handleRejectRecommendation = (segmentId) => {
    setSegments(prev => prev.map(segment => 
      segment.id === segmentId 
        ? { ...segment, aiRecommendation: null }
        : segment
    ));
    setShowAIRecommendation(prev => ({ ...prev, [segmentId]: false }));
  };

  const toggleRecommendation = (segmentId) => {
    setShowAIRecommendation(prev => ({ 
      ...prev, 
      [segmentId]: !prev[segmentId] 
    }));
  };

  // Custom create button with dropdown for Segments
  const renderCreateButton = () => {
    if (activeTab !== "Segments") {
      return {
        text: activeTab === "DPD Configuration" ? "Create Stage" : "Create Persona",
        icon: PlusIcon,
        onClick: () => {
          if (activeTab === "DPD Configuration") setShowCreateStage(true);
          else navigate("/workflows/persona/create");
        }
      };
    }

    return {
      text: isGeneratingAI ? "Generating..." : "AI Generate Segment",
      icon: "✨",
      onClick: handleAIGenerateSegment,
      disabled: isGeneratingAI,
      loading: isGeneratingAI,
      dropdown: {
        show: showCreateDropdown,
        onToggle: () => setShowCreateDropdown(!showCreateDropdown),
        items: [
          {
            text: "Create Manually",
            icon: PlusIcon,
            onClick: handleCreateManually
          }
        ]
      }
    };
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeaderWithTabs
        title="Workflows"
        description="Manage customer segments, journeys, and persona configurations"
        breadcrumbs={["Home", "Workflows"]}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        filters={filters}
        showSearch={false}
        createButton={renderCreateButton()}
      />

      {/* Assistant Dropdown */}
      {showAssistantDropdown && (
        <div className="relative">
          <div className="absolute top-0 left-6 z-50">
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
        </div>
      )}

      {/* Create Dropdown for Segments */}
      {showCreateDropdown && activeTab === "Segments" && (
        <div className="relative">
          <div className="absolute top-0 right-6 z-50">
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-48">
              <div className="p-2">
                <button
                  onClick={handleCreateManually}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded flex items-center"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Create Manually
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content */}
      <div className="max-w-8xl mx-auto p-8">
        {activeTab === "Segments" && (
          <div className="bg-white rounded-xl border border-zinc-200 shadow-sm">
          {filteredSegments.length === 0 ? (
            <div className="text-center py-12">
              <UsersIcon className="mx-auto h-12 w-12 text-zinc-400" />
              <h3 className="mt-2 text-sm font-medium text-zinc-900">No segments found</h3>
              <p className="mt-1 text-sm text-zinc-500">
                Get started by creating your first segment.
              </p>
              <div className="mt-6">
                <button
                  onClick={() => navigate("/segments/create")}
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-zinc-900 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
                >
                  <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                  Create Segment
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-hidden">
              <table className="min-w-full divide-y divide-zinc-200">
                <thead className="bg-zinc-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Segment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-zinc-200">
                  {filteredSegments.map((segment) => (
                    <React.Fragment key={segment.id}>
                      <tr className="hover:bg-zinc-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-zinc-900">
                            {segment.name}
                            {segment.aiRecommendation && (
                              <button
                                onClick={() => toggleRecommendation(segment.id)}
                                className="ml-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
                              >
                                ✨ AI Upgrade Available
                              </button>
                            )}
                          </div>
                          <div className="text-sm text-zinc-500">
                            {segment.description}
                          </div>
                        </div>
                      </td>
                                             <td className="px-6 py-4 whitespace-nowrap">
                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                           segment.isAIGenerated 
                             ? 'bg-purple-100 text-purple-800' 
                             : 'bg-gray-100 text-gray-800'
                         }`}>
                           {segment.isAIGenerated ? '🤖 AI Generated' : '👤 Manual'}
                         </span>
                       </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getStatusBadge(segment.status)}>
                          {segment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-zinc-500">
                          <ClockIcon className="h-4 w-4 mr-1" />
                          {new Date(segment.lastUpdated).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => navigate(`/segments/${segment.id}/edit`)}
                            className="text-zinc-600 hover:text-zinc-900 p-1 hover:bg-zinc-100 rounded"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSegment(segment.id)}
                            className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {/* AI Recommendation Row */}
                    {showAIRecommendation[segment.id] && segment.aiRecommendation && (
                                             <tr className="bg-blue-50">
                         <td colSpan="5" className="px-6 py-4">
                          <div className="bg-white rounded-lg border border-blue-200 p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center mb-2">
                                  <span className="text-lg">🤖</span>
                                  <h4 className="ml-2 text-sm font-semibold text-blue-900">
                                    {segment.aiRecommendation.title}
                                  </h4>
                                </div>
                                <p className="text-sm text-blue-800 mb-3">
                                  {segment.aiRecommendation.description}
                                </p>
                                
                                {segment.aiRecommendation.type === 'condition_update' && (
                                  <div className="mb-3">
                                    <h5 className="text-xs font-medium text-blue-700 mb-2">Suggested Conditions:</h5>
                                    <div className="bg-blue-50 p-2 rounded text-xs text-blue-800">
                                      {formatConditions(segment.aiRecommendation.suggestedConditions)}
                                    </div>
                                  </div>
                                )}
                                
                                {segment.aiRecommendation.type === 'journey_update' && (
                                  <div className="mb-3">
                                    <h5 className="text-xs font-medium text-blue-700 mb-2">Suggested Journey:</h5>
                                    <div className="bg-blue-50 p-2 rounded text-xs text-blue-800">
                                      {segment.aiRecommendation.suggestedJourney}
                                    </div>
                                  </div>
                                )}
                                
                                <div className="text-xs text-green-700 bg-green-50 px-2 py-1 rounded inline-block">
                                  Expected Impact: {segment.aiRecommendation.expectedImpact}
                                </div>
                              </div>
                              
                              <div className="flex space-x-2 ml-4">
                                <button
                                  onClick={() => handleAcceptRecommendation(segment.id)}
                                  className="px-3 py-1.5 bg-blue-600 text-white text-xs font-medium rounded hover:bg-blue-700 transition-colors"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => handleRejectRecommendation(segment.id)}
                                  className="px-3 py-1.5 bg-gray-200 text-gray-700 text-xs font-medium rounded hover:bg-gray-300 transition-colors"
                                >
                                  Reject
                                </button>
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                                         )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          </div>
        )}

        {activeTab === "DPD Configuration" && (
          <DPDConfiguration 
            dpdStages={dpdStages}
            setDpdStages={setDpdStages}
            showCreateStage={showCreateStage}
            setShowCreateStage={setShowCreateStage}
          />
        )}

        {activeTab === "Persona" && (
          <PersonaManagement />
        )}
      </div>
    </div>
  );
}

// DPD Configuration Component
const DPDConfiguration = ({ dpdStages, setDpdStages, showCreateStage, setShowCreateStage }) => {
  const [editingStage, setEditingStage] = useState(null);
  const [newStage, setNewStage] = useState({
    name: "Pre-Due",
    description: "",
    color: "blue",
    fromDays: -5,
    toDays: 0
  });

  const getColorClasses = (color) => {
    const colorMap = {
      blue: "border-blue-200 bg-blue-50",
      green: "border-green-200 bg-green-50",
      orange: "border-orange-200 bg-orange-50", 
      red: "border-red-200 bg-red-50",
      purple: "border-purple-200 bg-purple-50",
      gray: "border-gray-200 bg-gray-50",
      black: "border-gray-800 bg-gray-100"
    };
    return colorMap[color] || colorMap.green;
  };

  const getColorDot = (color) => {
    const colorMap = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      orange: "bg-orange-500",
      red: "bg-red-500", 
      purple: "bg-purple-500",
      gray: "bg-gray-500",
      black: "bg-gray-800"
    };
    return colorMap[color] || colorMap.green;
  };

  const handleEditStage = (stage) => {
    setEditingStage(stage);
    setNewStage(stage);
    setShowCreateStage(true);
  };

  const handleDeleteStage = (stageId) => {
    setDpdStages(prev => prev.filter(stage => stage.id !== stageId));
  };

  const handleCreateStage = () => {
    if (editingStage) {
      setDpdStages(prev => prev.map(stage => 
        stage.id === editingStage.id ? { ...newStage, id: editingStage.id } : stage
      ));
    } else {
      setDpdStages(prev => [...prev, { ...newStage, id: Date.now() }]);
    }
    setShowCreateStage(false);
    setEditingStage(null);
    setNewStage({
      name: "Pre-Due",
      description: "",
      color: "blue", 
      fromDays: -5,
      toDays: 0
    });
  };

  const handleCancelCreate = () => {
    setShowCreateStage(false);
    setEditingStage(null);
    setNewStage({
      name: "Pre-Due",
      description: "",
      color: "blue",
      fromDays: -5,
      toDays: 0
    });
  };

  return (
    <div className="space-y-6">
      {/* CSV Upload Section */}
  

      {/* DPD Stages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dpdStages.map((stage) => (
          <div key={stage.id} className={`rounded-xl border-2 border-dashed p-6 ${getColorClasses(stage.color)}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${getColorDot(stage.color)}`}></div>
                <h3 className="text-lg font-semibold text-gray-900">{stage.name}</h3>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEditStage(stage)}
                  className="text-gray-600 hover:text-gray-900 p-1 hover:bg-white rounded"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDeleteStage(stage.id)}
                  className="text-red-600 hover:text-red-900 p-1 hover:bg-white rounded"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-700 mb-4">{stage.description}</p>
            
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <span className="text-gray-600">From</span>
                <span className="mx-2 font-medium">{stage.fromDays}</span>
                <span className="text-gray-500">days</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-600">To</span>
                <span className="mx-2 font-medium">{stage.toDays}</span>
                <span className="text-gray-500">days</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create New Stage Modal */}
      {showCreateStage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-25" onClick={handleCancelCreate}></div>
          <div className="relative bg-white rounded-xl border-2 border-dashed border-gray-300 p-6 w-96 mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingStage ? "Edit Stage" : "Create New Stage"}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stage Name</label>
                <select
                  value={newStage.name}
                  onChange={(e) => setNewStage(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Pre-Due">Pre-Due</option>
                  <option value="Early Stage">Early Stage</option>
                  <option value="Mid Stage">Mid Stage</option>
                  <option value="Late Stage">Late Stage</option>
                  <option value="Very Late Stage">Very Late Stage</option>
                  <option value="Pre-Chargeoff">Pre-Chargeoff</option>
                  <option value="Post-Chargeoff">Post-Chargeoff</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newStage.description}
                  onChange={(e) => setNewStage(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter stage description..."
                />
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={newStage.fromDays}
                      onChange={(e) => setNewStage(prev => ({ ...prev, fromDays: parseInt(e.target.value) || 0 }))}
                      className="w-20 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-500">days</span>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      value={newStage.toDays}
                      onChange={(e) => setNewStage(prev => ({ ...prev, toDays: parseInt(e.target.value) || 0 }))}
                      className="w-20 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-500">days</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={handleCancelCreate}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateStage}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
              >
                {editingStage ? "Update Stage" : "Create Stage"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Persona Management Component
const PersonaManagement = () => {
  const [personas, setPersonas] = useState([
    {
      id: 1,
      name: "Professional Collector",
      description: "Formal and business-focused communication for high-value accounts",
      tonality: { formality: "high", directness: "medium", urgency: "low" },
      ttsSettings: {
        provider: "cartesia",
        providerName: "Cartesia",
        voice: "en-US-AriaNeural",
        voiceName: "Aria (Professional)",
        speed: 1.0,
        pitch: 0.0,
        volume: 0.8
      },
      conversationFocus: "Payment Collection",
      recommendedFor: ["Late Stage", "Very Late Stage"],
      dpdRecommendation: "Best for 30+ DPD accounts requiring firm but professional approach"
    },
    {
      id: 2,
      name: "Empathetic Support",
      description: "Understanding and supportive approach for sensitive situations",
      tonality: { formality: "low", directness: "low", urgency: "low" },
      ttsSettings: {
        provider: "elevenlabs",
        providerName: "ElevenLabs",
        voice: "en-US-JennyNeural",
        voiceName: "Jenny (Empathetic)",
        speed: 0.9,
        pitch: 0.1,
        volume: 0.7
      },
      conversationFocus: "Relationship Building",
      recommendedFor: ["Pre-Due", "Early Stage"],
      dpdRecommendation: "Ideal for pre-due and early stage accounts to maintain customer relationships"
    },
    {
      id: 3,
      name: "Urgent Collector",
      description: "Direct and assertive approach for critical situations",
      tonality: { formality: "medium", directness: "high", urgency: "high" },
      ttsSettings: {
        provider: "cartesia",
        providerName: "Cartesia",
        voice: "en-US-DavisNeural",
        voiceName: "Davis (Assertive)",
        speed: 1.1,
        pitch: -0.1,
        volume: 0.9
      },
      conversationFocus: "Immediate Action",
      recommendedFor: ["Very Late Stage", "Pre-Chargeoff"],
      dpdRecommendation: "Perfect for 60+ DPD accounts requiring immediate payment action"
    },
    {
      id: 4,
      name: "Friendly Reminder",
      description: "Warm and approachable for routine follow-ups",
      tonality: { formality: "low", directness: "medium", urgency: "low" },
      ttsSettings: {
        provider: "elevenlabs",
        providerName: "ElevenLabs",
        voice: "en-US-SarahNeural",
        voiceName: "Sarah (Friendly)",
        speed: 0.95,
        pitch: 0.2,
        volume: 0.75
      },
      conversationFocus: "Gentle Reminders",
      recommendedFor: ["Pre-Due", "Early Stage", "Mid Stage"],
      dpdRecommendation: "Great for 0-30 DPD accounts with gentle payment reminders"
    },
    {
      id: 5,
      name: "Solution Focused",
      description: "Problem-solving approach for complex payment situations",
      tonality: { formality: "medium", directness: "medium", urgency: "medium" },
      ttsSettings: {
        provider: "cartesia",
        providerName: "Cartesia",
        voice: "en-US-AlexNeural",
        voiceName: "Alex (Solution-Oriented)",
        speed: 1.0,
        pitch: 0.0,
        volume: 0.8
      },
      conversationFocus: "Payment Solutions",
      recommendedFor: ["Mid Stage", "Late Stage"],
      dpdRecommendation: "Excellent for 15-60 DPD accounts needing payment plan discussions"
    },
    {
      id: 6,
      name: "Final Notice",
      description: "Serious and authoritative for pre-legal situations",
      tonality: { formality: "high", directness: "high", urgency: "high" },
      ttsSettings: {
        provider: "elevenlabs",
        providerName: "ElevenLabs",
        voice: "en-US-MichaelNeural",
        voiceName: "Michael (Authoritative)",
        speed: 0.9,
        pitch: -0.2,
        volume: 0.85
      },
      conversationFocus: "Legal Consequences",
      recommendedFor: ["Pre-Chargeoff", "Post-Chargeoff"],
      dpdRecommendation: "Essential for 90+ DPD accounts before legal action"
    }
  ]);

  const [editingPersona, setEditingPersona] = useState(null);
  const [isTalking, setIsTalking] = useState({});

  const handleTalkToPersona = (personaId) => {
    setIsTalking(prev => ({ ...prev, [personaId]: true }));
    // Simulate conversation start
    setTimeout(() => {
      setIsTalking(prev => ({ ...prev, [personaId]: false }));
      alert(`Started conversation with ${personas.find(p => p.id === personaId)?.name}`);
    }, 2000);
  };

  const handleEditPersona = (persona) => {
    setEditingPersona(persona);
  };

  const handleDeletePersona = (personaId) => {
    setPersonas(prev => prev.filter(p => p.id !== personaId));
  };

  const getDPDRecommendationColor = (recommendedFor) => {
    if (recommendedFor.includes("Pre-Due") || recommendedFor.includes("Early Stage")) {
      return "bg-green-100 text-green-800";
    } else if (recommendedFor.includes("Mid Stage") || recommendedFor.includes("Late Stage")) {
      return "bg-yellow-100 text-yellow-800";
    } else if (recommendedFor.includes("Very Late Stage") || recommendedFor.includes("Pre-Chargeoff")) {
      return "bg-red-100 text-red-800";
    }
    return "bg-gray-100 text-gray-800";
  };

  return (
    <div className="space-y-6">
      {/* Persona Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((persona) => (
          <div key={persona.id} className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-zinc-900">{persona.name}</h3>
                <p className="text-sm text-zinc-600 mt-1">{persona.description}</p>
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEditPersona(persona)}
                  className="text-zinc-600 hover:text-zinc-900 p-1 hover:bg-zinc-100 rounded"
                >
                  <PencilIcon className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => handleDeletePersona(persona.id)}
                  className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* DPD Recommendation */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-zinc-700 mb-2">Recommended for</h4>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {persona.recommendedFor.map((stage, index) => (
                    <span key={index} className={`px-2 py-1 rounded-full text-xs font-medium ${getDPDRecommendationColor(persona.recommendedFor)}`}>
                      {stage}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-zinc-600 bg-zinc-50 p-2 rounded">
                  {persona.dpdRecommendation}
                </p>
              </div>
            </div>

            {/* Talk to Persona Button */}
            <div className="mb-4">
              <button
                onClick={() => handleTalkToPersona(persona.id)}
                disabled={isTalking[persona.id]}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isTalking[persona.id] ? (
                  <>
                    <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Connecting...
                  </>
                ) : (
                  <>
                    <span className="mr-2">💬</span>
                    Talk to Persona
                  </>
                )}
              </button>
            </div>

            {/* Tonality */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-zinc-700 mb-2">Tonality</h4>
              <div className="flex space-x-2 text-xs flex-wrap gap-1">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">
                  Formality: {persona.tonality.formality}
                </span>
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                  Directness: {persona.tonality.directness}
                </span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                  Urgency: {persona.tonality.urgency}
                </span>
              </div>
            </div>

            {/* TTS Settings */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-zinc-700 mb-2">TTS Configuration</h4>
              <div className="bg-zinc-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white mr-2 ${
                      persona.ttsSettings.provider === 'cartesia' ? 'bg-purple-600' : 'bg-blue-600'
                    }`}>
                      {persona.ttsSettings.provider === 'cartesia' ? 'C' : 'E'}
                    </div>
                    <span className="text-sm font-medium text-zinc-700">
                      {persona.ttsSettings.providerName}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-zinc-600">
                  <div>Voice: {persona.ttsSettings.voiceName}</div>
                  <div>Speed: {persona.ttsSettings.speed}x</div>
                  <div>Pitch: {persona.ttsSettings.pitch > 0 ? '+' : ''}{persona.ttsSettings.pitch}</div>
                  <div>Volume: {Math.round(persona.ttsSettings.volume * 100)}%</div>
                </div>
              </div>
            </div>

            {/* Conversation Focus */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-zinc-700 mb-1">Focus</h4>
              <span className="inline-block px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                {persona.conversationFocus}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State for New Personas */}
      <div className="bg-white rounded-xl border-2 border-dashed border-zinc-300 p-8 text-center">
        <div className="mx-auto w-12 h-12 bg-zinc-100 rounded-full flex items-center justify-center mb-4">
          <PlusIcon className="w-6 h-6 text-zinc-600" />
        </div>
        <h3 className="text-lg font-medium text-zinc-900 mb-2">Create New Persona</h3>
        <p className="text-zinc-600 mb-4">
          Add a new persona with custom TTS settings and conversation styles
        </p>
        <button className="inline-flex items-center px-4 py-2 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800">
          <PlusIcon className="w-4 h-4 mr-2" />
          Create Persona
        </button>
      </div>
    </div>
  );
};

// Export personas for use in other components
export const getPersonas = () => [
  {
    id: 1,
    name: "Professional Collector",
    description: "Formal and business-focused communication for high-value accounts",
    tonality: { formality: "high", directness: "medium", urgency: "low" },
    ttsSettings: {
      provider: "cartesia",
      providerName: "Cartesia",
      voice: "en-US-AriaNeural",
      voiceName: "Aria (Professional)",
      speed: 1.0,
      pitch: 0.0,
      volume: 0.8
    },
    conversationFocus: "Payment Collection",
    recommendedFor: ["Late Stage", "Very Late Stage"],
    dpdRecommendation: "Best for 30+ DPD accounts requiring firm but professional approach"
  },
  {
    id: 2,
    name: "Empathetic Support",
    description: "Understanding and supportive approach for sensitive situations",
    tonality: { formality: "low", directness: "low", urgency: "low" },
    ttsSettings: {
      provider: "elevenlabs",
      providerName: "ElevenLabs",
      voice: "en-US-JennyNeural",
      voiceName: "Jenny (Empathetic)",
      speed: 0.9,
      pitch: 0.1,
      volume: 0.7
    },
    conversationFocus: "Relationship Building",
    recommendedFor: ["Pre-Due", "Early Stage"],
    dpdRecommendation: "Ideal for pre-due and early stage accounts to maintain customer relationships"
  },
  {
    id: 3,
    name: "Urgent Collector",
    description: "Direct and assertive approach for critical situations",
    tonality: { formality: "medium", directness: "high", urgency: "high" },
    ttsSettings: {
      provider: "cartesia",
      providerName: "Cartesia",
      voice: "en-US-DavisNeural",
      voiceName: "Davis (Assertive)",
      speed: 1.1,
      pitch: -0.1,
      volume: 0.9
    },
    conversationFocus: "Immediate Action",
    recommendedFor: ["Very Late Stage", "Pre-Chargeoff"],
    dpdRecommendation: "Perfect for 60+ DPD accounts requiring immediate payment action"
  },
  {
    id: 4,
    name: "Friendly Reminder",
    description: "Warm and approachable for routine follow-ups",
    tonality: { formality: "low", directness: "medium", urgency: "low" },
    ttsSettings: {
      provider: "elevenlabs",
      providerName: "ElevenLabs",
      voice: "en-US-SarahNeural",
      voiceName: "Sarah (Friendly)",
      speed: 0.95,
      pitch: 0.2,
      volume: 0.75
    },
    conversationFocus: "Gentle Reminders",
    recommendedFor: ["Pre-Due", "Early Stage", "Mid Stage"],
    dpdRecommendation: "Great for 0-30 DPD accounts with gentle payment reminders"
  },
  {
    id: 5,
    name: "Solution Focused",
    description: "Problem-solving approach for complex payment situations",
    tonality: { formality: "medium", directness: "medium", urgency: "medium" },
    ttsSettings: {
      provider: "cartesia",
      providerName: "Cartesia",
      voice: "en-US-AlexNeural",
      voiceName: "Alex (Solution-Oriented)",
      speed: 1.0,
      pitch: 0.0,
      volume: 0.8
    },
    conversationFocus: "Payment Solutions",
    recommendedFor: ["Mid Stage", "Late Stage"],
    dpdRecommendation: "Excellent for 15-60 DPD accounts needing payment plan discussions"
  },
  {
    id: 6,
    name: "Final Notice",
    description: "Serious and authoritative for pre-legal situations",
    tonality: { formality: "high", directness: "high", urgency: "high" },
    ttsSettings: {
      provider: "elevenlabs",
      providerName: "ElevenLabs",
      voice: "en-US-MichaelNeural",
      voiceName: "Michael (Authoritative)",
      speed: 0.9,
      pitch: -0.2,
      volume: 0.85
    },
    conversationFocus: "Legal Consequences",
    recommendedFor: ["Pre-Chargeoff", "Post-Chargeoff"],
    dpdRecommendation: "Essential for 90+ DPD accounts before legal action"
  }
]; 