import React, { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  ArrowLeftIcon, 
  PlusIcon, 
  TrashIcon, 
  PlayIcon,
  PauseIcon,
  ClockIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon
} from "@heroicons/react/24/outline";
import ReactFlow, { 
  MiniMap, 
  Controls, 
  Background, 
  useNodesState, 
  useEdgesState, 
  addEdge,
  ConnectionLineType,
  MarkerType,
  ReactFlowProvider,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import { getPersonas } from './Workflows';

// Available attributes for conditions
const attributes = [
  "user_name", "email", "phone", "account_balance", "payment_history", 
  "dpd_bucket", "account_age", "last_payment_date", "total_payments",
  "account_status", "risk_score", "customer_type", "region"
];

// Available conditions
const conditions = [
  { value: "equals", label: "equals" },
  { value: "not_equals", label: "not equals" },
  { value: "contains", label: "contains" },
  { value: "greater_than", label: "greater than" },
  { value: "less_than", label: "less than" },
  { value: "in", label: "is in" },
  { value: "not_in", label: "is not in" }
];

// Get personas from Workflows component
const personaOptions = getPersonas();

// Conversation focus options
const conversationFocusOptions = [
  "Relationship Building",
  "Problem Resolution", 
  "Information Gathering",
  "Payment Collection",
  "Account Status Update",
  "Reminder & Follow-up"
];

// Initial nodes for the journey canvas
const initialNodes = [
  {
    id: 'start',
    type: 'input',
    position: { x: 250, y: 25 },
    data: { label: 'Start Journey' },
    style: { background: '#22c55e', color: 'white', border: '1px solid #16a34a' }
  }
];

const initialEdges = [];

// Custom node types for different journey actions
const nodeTypes = {
  voice: ({ data, id }) => (
    <div 
      className="px-4 py-2 shadow-md rounded-md bg-blue-50 border-2 border-blue-200 cursor-pointer hover:border-blue-400 transition-colors"
      onClick={() => data.onNodeClick && data.onNodeClick(id, 'voice', data)}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center">
        <PhoneIcon className="w-4 h-4 mr-2 text-blue-600" />
        <div className="ml-2">
          <div className="text-sm font-bold text-blue-900">Voice Call</div>
          <div className="text-xs text-blue-700">{data.label}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  ),
  sms: ({ data, id }) => (
    <div 
      className="px-4 py-2 shadow-md rounded-md bg-green-50 border-2 border-green-200 cursor-pointer hover:border-green-400 transition-colors"
      onClick={() => data.onNodeClick && data.onNodeClick(id, 'sms', data)}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center">
        <ChatBubbleLeftRightIcon className="w-4 h-4 mr-2 text-green-600" />
        <div className="ml-2">
          <div className="text-sm font-bold text-green-900">SMS</div>
          <div className="text-xs text-green-700">{data.label}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  ),
  email: ({ data, id }) => (
    <div 
      className="px-4 py-2 shadow-md rounded-md bg-purple-50 border-2 border-purple-200 cursor-pointer hover:border-purple-400 transition-colors"
      onClick={() => data.onNodeClick && data.onNodeClick(id, 'email', data)}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center">
        <EnvelopeIcon className="w-4 h-4 mr-2 text-purple-600" />
        <div className="ml-2">
          <div className="text-sm font-bold text-purple-900">Email</div>
          <div className="text-xs text-purple-700">{data.label}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  ),
  delay: ({ data, id }) => (
    <div 
      className="px-4 py-2 shadow-md rounded-md bg-yellow-50 border-2 border-yellow-200 cursor-pointer hover:border-yellow-400 transition-colors"
      onClick={() => data.onNodeClick && data.onNodeClick(id, 'delay', data)}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center">
        <ClockIcon className="w-4 h-4 mr-2 text-yellow-600" />
        <div className="ml-2">
          <div className="text-sm font-bold text-yellow-900">Delay</div>
          <div className="text-xs text-yellow-700">{data.label}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  ),
  condition: ({ data, id }) => (
    <div 
      className="px-4 py-2 shadow-md rounded-md bg-orange-50 border-2 border-orange-200 cursor-pointer hover:border-orange-400 transition-colors"
      onClick={() => data.onNodeClick && data.onNodeClick(id, 'condition', data)}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex items-center">
        <div className="ml-2">
          <div className="text-sm font-bold text-orange-900">Condition</div>
          <div className="text-xs text-orange-700">{data.label}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  )
};

// Draggable node component for the sidebar
const DraggableNode = ({ type, label, icon, color }) => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className={`cursor-grab px-4 py-3 mb-2 rounded-lg border-2 border-dashed ${color} transition-colors hover:bg-opacity-80`}
      onDragStart={(event) => onDragStart(event, type)}
      draggable
    >
      <div className="flex items-center">
        {icon}
        <span className="ml-2 text-sm font-medium">{label}</span>
      </div>
    </div>
  );
};

// Properties drawer component
const PropertiesDrawer = ({ isOpen, onClose, selectedNode, nodeProperties, setNodeProperties }) => {
  const [localProperties, setLocalProperties] = useState({
    name: '',
    persona: personaOptions[0],
    conversationFocus: conversationFocusOptions[0],
    customPrompt: ''
  });

  // Update local properties when selectedNode changes
  React.useEffect(() => {
    if (selectedNode) {
      const existingProps = nodeProperties[selectedNode.id] || {};
      setLocalProperties({
        name: existingProps.name || `${selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1)} Block`,
        persona: existingProps.persona || personaOptions[0],
        conversationFocus: existingProps.conversationFocus || conversationFocusOptions[0],
        customPrompt: existingProps.customPrompt || ''
      });
    }
  }, [selectedNode, nodeProperties]);

  const handleSave = () => {
    if (selectedNode) {
      setNodeProperties(prev => ({
        ...prev,
        [selectedNode.id]: localProperties
      }));
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-25" onClick={onClose} />
      
      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl border-l border-zinc-200 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-zinc-900">Block Properties</h3>
            <button
              onClick={onClose}
              className="text-zinc-400 hover:text-zinc-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {selectedNode && (
            <div className="space-y-6">
              {/* Block Name */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Block Name
                </label>
                <input
                  type="text"
                  value={localProperties.name}
                  onChange={(e) => setLocalProperties(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                  placeholder="Enter block name"
                />
              </div>

              {/* Persona Selection */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Persona
                </label>
                <div className="space-y-3">
                  {personaOptions.map((persona) => (
                    <div key={persona.id} className={`border rounded-lg p-3 cursor-pointer transition-colors ${
                      localProperties.persona.id === persona.id 
                        ? 'border-zinc-900 bg-zinc-50' 
                        : 'border-zinc-200 hover:border-zinc-300'
                    }`}>
                      <div className="flex items-start space-x-3">
                        <input
                          type="radio"
                          id={`persona-${persona.id}`}
                          name="persona"
                          checked={localProperties.persona.id === persona.id}
                          onChange={() => setLocalProperties(prev => ({ ...prev, persona }))}
                          className="mt-1"
                        />
                        <label htmlFor={`persona-${persona.id}`} className="flex-1 cursor-pointer">
                          <div className="font-medium text-zinc-900">{persona.name}</div>
                          <div className="text-sm text-zinc-500 mb-2">{persona.description}</div>
                          
                          {/* DPD Recommendation */}
                          <div className="mb-2">
                            <div className="flex flex-wrap gap-1 mb-1">
                              {persona.recommendedFor.map((stage, index) => (
                                <span key={index} className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                  stage.includes("Pre-Due") || stage.includes("Early") ? 'bg-green-100 text-green-800' :
                                  stage.includes("Mid") || stage.includes("Late Stage") ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {stage}
                                </span>
                              ))}
                            </div>
                            <div className="text-xs text-zinc-600 bg-zinc-100 p-2 rounded">
                              {persona.dpdRecommendation}
                            </div>
                          </div>
                          
                          {/* Tonality */}
                          <div className="text-xs text-zinc-400">
                            Formality: {persona.tonality.formality} • 
                            Directness: {persona.tonality.directness} • 
                            Urgency: {persona.tonality.urgency}
                          </div>
                          
                          {/* TTS Info */}
                          <div className="text-xs text-zinc-500 mt-1">
                            Voice: {persona.ttsSettings.voiceName} ({persona.ttsSettings.providerName})
                          </div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conversation Focus */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Conversation Focus
                </label>
                <select
                  value={localProperties.conversationFocus}
                  onChange={(e) => setLocalProperties(prev => ({ ...prev, conversationFocus: e.target.value }))}
                  className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                >
                  {conversationFocusOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>

              {/* Custom First Prompt */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Custom First Prompt
                </label>
                <textarea
                  value={localProperties.customPrompt}
                  onChange={(e) => setLocalProperties(prev => ({ ...prev, customPrompt: e.target.value }))}
                  rows={4}
                  className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                  placeholder="Enter a custom prompt that will be used to start the conversation..."
                />
              </div>

              {/* Save Button */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-zinc-200">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-zinc-300 rounded-md text-sm font-medium text-zinc-700 bg-white hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800"
                >
                  Save Properties
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function CreateSegment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  
  // Step management
  const [currentStep, setCurrentStep] = useState(1);
  
  // Segment data
  const [segmentName, setSegmentName] = useState("");
  const [segmentDescription, setSegmentDescription] = useState("");
  
  // Conditions state
  const [conditionGroups, setConditionGroups] = useState([
    {
      id: 1,
      operator: "AND",
      conditions: [
        { id: 1, attribute: "", condition: "", value: "" }
      ]
    }
  ]);
  
  // Journey canvas state  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  // Side drawer state
  const [selectedNode, setSelectedNode] = useState(null);
  const [showPropertiesDrawer, setShowPropertiesDrawer] = useState(false);
  
  // Node properties state
  const [nodeProperties, setNodeProperties] = useState({});
  
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  // Handle node click to open properties drawer
  const onNodeClick = useCallback((nodeId, nodeType, nodeData) => {
    setSelectedNode({ id: nodeId, type: nodeType, data: nodeData });
    setShowPropertiesDrawer(true);
  }, []);

  // Initialize nodes with onNodeClick handler
  React.useEffect(() => {
    const nodesWithHandler = initialNodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        onNodeClick: onNodeClick
      }
    }));
    setNodes(nodesWithHandler);
  }, [onNodeClick, setNodes]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = event.target.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // Check if the dropped element is a valid node type
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // Calculate position relative to the React Flow canvas
      const position = {
        x: event.clientX - reactFlowBounds.left - 50, // Offset for better positioning
        y: event.clientY - reactFlowBounds.top - 25,
      };

      const newNode = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { 
          label: `${type.charAt(0).toUpperCase() + type.slice(1)} Action`,
          onNodeClick: onNodeClick
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  // Add condition to a group
  const addCondition = (groupId) => {
    setConditionGroups(groups => 
      groups.map(group => 
        group.id === groupId 
          ? { 
              ...group, 
              conditions: [
                ...group.conditions, 
                { id: Date.now(), attribute: "", condition: "", value: "" }
              ]
            }
          : group
      )
    );
  };

  // Remove condition from a group
  const removeCondition = (groupId, conditionId) => {
    setConditionGroups(groups => 
      groups.map(group => 
        group.id === groupId 
          ? { 
              ...group, 
              conditions: group.conditions.filter(c => c.id !== conditionId)
            }
          : group
      )
    );
  };

  // Update condition
  const updateCondition = (groupId, conditionId, field, value) => {
    setConditionGroups(groups => 
      groups.map(group => 
        group.id === groupId 
          ? { 
              ...group, 
              conditions: group.conditions.map(c => 
                c.id === conditionId ? { ...c, [field]: value } : c
              )
            }
          : group
      )
    );
  };

  // Add condition group
  const addConditionGroup = () => {
    setConditionGroups([
      ...conditionGroups,
      {
        id: Date.now(),
        operator: "AND",
        conditions: [
          { id: Date.now() + 1, attribute: "", condition: "", value: "" }
        ]
      }
    ]);
  };



  const handleSave = () => {
    const segmentData = {
      name: segmentName,
      description: segmentDescription,
      conditions: conditionGroups,
      journey: { nodes, edges }
    };
    
    console.log("Saving segment:", segmentData);
    // Here you would typically save to your backend
    
    navigate("/workflows");
  };

  const handleClosePropertiesDrawer = () => {
    setShowPropertiesDrawer(false);
    setSelectedNode(null);
  };

  const renderStepContent = () => {
    if (currentStep === 1) {
      return (
        <div className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white p-6 rounded-lg border border-zinc-200">
            <h3 className="text-lg font-medium text-zinc-900 mb-4">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Segment Name
                </label>
                <input
                  type="text"
                  value={segmentName}
                  onChange={(e) => setSegmentName(e.target.value)}
                  className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                  placeholder="Enter segment name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Description
                </label>
                <textarea
                  value={segmentDescription}
                  onChange={(e) => setSegmentDescription(e.target.value)}
                  rows={3}
                  className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-transparent"
                  placeholder="Describe this segment's characteristics"
                />
              </div>
            </div>
          </div>

          {/* Conditions */}
          <div className="bg-white p-6 rounded-lg border border-zinc-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-zinc-900">Segment Conditions</h3>
              <button
                onClick={addConditionGroup}
                className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-zinc-700 bg-zinc-100 hover:bg-zinc-200"
              >
                <PlusIcon className="w-4 h-4 mr-1" />
                Add Group
              </button>
            </div>

            {conditionGroups.map((group, groupIndex) => (
              <div key={group.id} className="mb-6 p-4 border border-zinc-200 rounded-lg">
                {groupIndex > 0 && (
                  <div className="text-center mb-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      OR
                    </span>
                  </div>
                )}
                
                {group.conditions.map((condition, conditionIndex) => (
                  <div key={condition.id} className="flex items-center space-x-3 mb-3">
                    {conditionIndex > 0 && (
                      <span className="text-sm font-medium text-zinc-500 w-12">AND</span>
                    )}
                    
                    <select
                      value={condition.attribute}
                      onChange={(e) => updateCondition(group.id, condition.id, 'attribute', e.target.value)}
                      className="border border-zinc-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
                    >
                      <option value="">Select attribute</option>
                      {attributes.map(attr => (
                        <option key={attr} value={attr}>{attr}</option>
                      ))}
                    </select>

                    <select
                      value={condition.condition}
                      onChange={(e) => updateCondition(group.id, condition.id, 'condition', e.target.value)}
                      className="border border-zinc-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
                    >
                      <option value="">Select condition</option>
                      {conditions.map(cond => (
                        <option key={cond.value} value={cond.value}>{cond.label}</option>
                      ))}
                    </select>

                    <input
                      type="text"
                      value={condition.value}
                      onChange={(e) => updateCondition(group.id, condition.id, 'value', e.target.value)}
                      placeholder="Value"
                      className="border border-zinc-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500"
                    />

                    <button
                      onClick={() => removeCondition(group.id, condition.id)}
                      className="text-red-600 hover:text-red-800 p-1"
                      disabled={group.conditions.length === 1}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => addCondition(group.id)}
                  className="inline-flex items-center px-2 py-1 text-sm text-zinc-600 hover:text-zinc-800"
                >
                  <PlusIcon className="w-4 h-4 mr-1" />
                  Add Condition
                </button>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (currentStep === 2) {
      return (
        <ReactFlowProvider>
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-zinc-200 overflow-hidden">
              <div className="p-6 border-b border-zinc-200">
                <h3 className="text-lg font-medium text-zinc-900">Journey Canvas</h3>
                <p className="text-sm text-zinc-600 mt-1">
                  Drag and drop blocks from the left panel to design your customer journey.
                </p>
              </div>

              <div className="flex h-96">
                {/* Left Sidebar - Draggable Blocks */}
                <div className="w-64 p-4 bg-zinc-50 border-r border-zinc-200 overflow-y-auto">
                  <h4 className="text-sm font-medium text-zinc-700 mb-3">Journey Blocks</h4>
                  
                  <DraggableNode
                    type="voice"
                    label="Voice Call"
                    icon={<PhoneIcon className="w-4 h-4 text-blue-600" />}
                    color="border-blue-300 bg-blue-50 text-blue-700"
                  />
                  
                  <DraggableNode
                    type="sms"
                    label="SMS"
                    icon={<ChatBubbleLeftRightIcon className="w-4 h-4 text-green-600" />}
                    color="border-green-300 bg-green-50 text-green-700"
                  />
                  
                  <DraggableNode
                    type="email"
                    label="Email"
                    icon={<EnvelopeIcon className="w-4 h-4 text-purple-600" />}
                    color="border-purple-300 bg-purple-50 text-purple-700"
                  />
                  
                  <DraggableNode
                    type="delay"
                    label="Delay"
                    icon={<ClockIcon className="w-4 h-4 text-yellow-600" />}
                    color="border-yellow-300 bg-yellow-50 text-yellow-700"
                  />
                  
                  <DraggableNode
                    type="condition"
                    label="Conditional"
                    icon={<div className="w-4 h-4 bg-orange-600 rounded-sm" />}
                    color="border-orange-300 bg-orange-50 text-orange-700"
                  />

                  <div className="mt-6 p-3 bg-zinc-100 rounded-lg">
                    <p className="text-xs text-zinc-600">
                      💡 <strong>Tip:</strong> Drag blocks onto the canvas and connect them to create your journey flow.
                    </p>
                  </div>
                </div>

                {/* React Flow Canvas */}
                <div className="flex-1">
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    nodeTypes={nodeTypes}
                    connectionLineType={ConnectionLineType.SmoothStep}
                    defaultEdgeOptions={{
                      type: 'smoothstep',
                      markerEnd: { type: MarkerType.Arrow }
                    }}
                    fitView
                    className="bg-zinc-25"
                  >
                    <Background />
                    <Controls />
                    <MiniMap />
                  </ReactFlow>
                </div>
              </div>
            </div>
          </div>
        </ReactFlowProvider>
      );
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <div className="bg-white border-b border-zinc-200">
        <div className="max-w-8xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/segments")}
                className="text-zinc-600 hover:text-zinc-900"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-zinc-900">
                  {isEditing ? "Edit Segment" : "Create Segment"}
                </h1>
                <p className="text-sm text-zinc-600">
                  {currentStep === 1 ? "Define segment conditions" : "Design customer journey"}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {currentStep === 2 && (
                <button
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 border border-zinc-300 rounded-md text-sm font-medium text-zinc-700 bg-white hover:bg-zinc-50"
                >
                  Back
                </button>
              )}
              
              {currentStep === 1 ? (
                <button
                  onClick={() => setCurrentStep(2)}
                  disabled={!segmentName}
                  className="px-4 py-2 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800 disabled:bg-zinc-400"
                >
                  Next: Journey
                </button>
              ) : (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800"
                >
                  Save Segment
                </button>
              )}
            </div>
          </div>
          
          {/* Step Indicator */}
          <div className="mt-6">
            <div className="flex items-center">
              <div className={`flex items-center ${currentStep >= 1 ? 'text-zinc-900' : 'text-zinc-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= 1 ? 'bg-zinc-900 text-white' : 'bg-zinc-200'}`}>
                  1
                </div>
                <span className="ml-2 text-sm font-medium">Conditions</span>
              </div>
              <div className={`mx-4 h-0.5 w-16 ${currentStep > 1 ? 'bg-zinc-900' : 'bg-zinc-200'}`} />
              <div className={`flex items-center ${currentStep >= 2 ? 'text-zinc-900' : 'text-zinc-400'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${currentStep >= 2 ? 'bg-zinc-900 text-white' : 'bg-zinc-200'}`}>
                  2
                </div>
                <span className="ml-2 text-sm font-medium">Journey</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-8xl mx-auto px-8 py-8">
        {renderStepContent()}
      </div>

      {/* Properties Drawer */}
      <PropertiesDrawer
        isOpen={showPropertiesDrawer}
        onClose={handleClosePropertiesDrawer}
        selectedNode={selectedNode}
        nodeProperties={nodeProperties}
        setNodeProperties={setNodeProperties}
      />
    </div>
  );
} 