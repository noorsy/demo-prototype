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
import { getPersonas, sampleSegments } from './Workflows';
import { getVoicemailTemplates } from './data/voicemailTemplates';

// Segments data is now imported from Workflows.js

// Available attributes for conditions
const attributes = [
  "credit_score", "bucket", "nbr_times_15_29", "nbr_times_30_59", "nbr_times_60_89", "nbr_times_90_119",
  "days_past_due", "broken_ptps", "dq_reason", "payment_history", "account_balance", "user_name", 
  "email", "phone", "account_age", "last_payment_date", "total_payments", "account_status", 
  "risk_score", "customer_type", "region"
];

// Available conditions
const conditions = [
  { value: "equals", label: "equals" },
  { value: "not_equals", label: "not equals" },
  { value: "contains", label: "contains" },
  { value: "greater_than", label: "greater than" },
  { value: "greater_than_equal", label: "greater than or equal" },
  { value: "less_than", label: "less than" },
  { value: "less_than_equal", label: "less than or equal" },
  { value: "between", label: "between" },
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

// Email templates
const emailTemplates = [
  { value: 'default', label: 'Default Payment Reminder' },
  { value: 'grace_period', label: 'Grace Period Notice' },
  { value: 'early_stage', label: 'Early Stage Reminder' },
  { value: 'payment_plan', label: 'Payment Plan Offer' },
  { value: 'final_notice', label: 'Final Notice' },
  { value: 'missed_call', label: 'Missed Call Follow-up' },
  { value: 'custom', label: 'Custom Template' }
];

// SMS templates
const smsTemplates = [
  { value: 'default', label: 'Standard Payment Reminder' },
  { value: 'grace_period', label: 'Grace Period Alert' },
  { value: 'urgent', label: 'Urgent Payment Notice' },
  { value: 'payment_plan', label: 'Payment Plan Details' },
  { value: 'confirmation', label: 'Payment Confirmation' },
  { value: 'final_notice', label: 'Final Notice SMS' },
  { value: 'custom', label: 'Custom Message' }
];

// Condition types
const conditionTypes = [
  { value: 'call_answered', label: 'Call Answered' },
  { value: 'email_opened', label: 'Email Opened' },
  { value: 'email_clicked', label: 'Email Link Clicked' },
  { value: 'sms_read', label: 'SMS Read' },
  { value: 'payment_received', label: 'Payment Received' },
  { value: 'payment_promised', label: 'Payment Promised' },
  { value: 'customer_contacted', label: 'Customer Contacted' },
  { value: 'customer_responded', label: 'Customer Responded' },
  { value: 'time_of_day', label: 'Time of Day' }
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
const PropertiesDrawer = ({ isOpen, onClose, selectedNode, nodeProperties, setNodeProperties, nodes, voicemailTemplates, isVoicemailDropEnabled }) => {
  const [localProperties, setLocalProperties] = useState({
    name: '',
    // Voice properties
    persona: personaOptions[0],
    conversationFocus: conversationFocusOptions[0],
    customPrompt: '',
    maxAttempts: 3,
    waitTime: 24,
    voicemailTemplate: '',
    useForAllVoiceBlocks: false,
    // Email properties
    subject: '',
    template: '',
    bodyOverride: '',
    useCustomBody: false,
    // SMS properties
    message: '',
    smsTemplate: '',
    maxLength: 160,
    // Delay properties
    duration: 24,
    durationUnit: 'hours',
    // Condition properties
    conditionType: '',
    conditionValue: ''
  });

  // Update local properties when selectedNode changes
  React.useEffect(() => {
    if (selectedNode) {
      const existingProps = nodeProperties[selectedNode.id] || {};
      setLocalProperties({
        name: existingProps.name || `${selectedNode.type.charAt(0).toUpperCase() + selectedNode.type.slice(1)} Block`,
        // Voice properties
        persona: existingProps.persona || personaOptions[0],
        conversationFocus: existingProps.conversationFocus || conversationFocusOptions[0],
        customPrompt: existingProps.customPrompt || '',
        maxAttempts: existingProps.maxAttempts || 3,
        waitTime: existingProps.waitTime || 24,
        voicemailTemplate: existingProps.voicemailTemplate || '',
        useForAllVoiceBlocks: existingProps.useForAllVoiceBlocks || false,
        // Email properties
        subject: existingProps.subject || '',
        template: existingProps.template || 'default',
        bodyOverride: existingProps.bodyOverride || '',
        useCustomBody: existingProps.useCustomBody || false,
        // SMS properties
        message: existingProps.message || '',
        smsTemplate: existingProps.smsTemplate || 'default',
        maxLength: existingProps.maxLength || 160,
        // Delay properties
        duration: existingProps.duration || 24,
        durationUnit: existingProps.durationUnit || 'hours',
        // Condition properties
        conditionType: existingProps.conditionType || '',
        conditionValue: existingProps.conditionValue || ''
      });
    }
  }, [selectedNode, nodeProperties]);

  const handleSave = () => {
    if (selectedNode) {
      const updatedProperties = { ...localProperties };
      
      // If "use for all voice blocks" is checked and this is the first voice block
      if (localProperties.useForAllVoiceBlocks && selectedNode.type === 'voice') {
        // Find all voice nodes
        const voiceNodes = nodes.filter(n => n.type === 'voice');
        const isFirstVoiceBlock = voiceNodes.length > 0 && voiceNodes[0].id === selectedNode.id;
        
        if (isFirstVoiceBlock) {
          // Apply template to all voice blocks
          voiceNodes.forEach(node => {
            setNodeProperties(prev => ({
              ...prev,
              [node.id]: {
                ...(prev[node.id] || {}),
                voicemailTemplate: localProperties.voicemailTemplate,
              }
            }));
          });
        }
      }
      
      setNodeProperties(prev => ({
        ...prev,
        [selectedNode.id]: updatedProperties
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

              {/* Voice Node Properties */}
              {selectedNode.type === 'voice' && (
                <>
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

                  {/* Call Settings */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">
                        Max Attempts
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={localProperties.maxAttempts}
                        onChange={(e) => setLocalProperties(prev => ({ ...prev, maxAttempts: parseInt(e.target.value) }))}
                        className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">
                        Wait Time (hours)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="168"
                        value={localProperties.waitTime}
                        onChange={(e) => setLocalProperties(prev => ({ ...prev, waitTime: parseInt(e.target.value) }))}
                        className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                      />
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

                  {/* Voicemail Template Selection */}
                  {isVoicemailDropEnabled && voicemailTemplates.length > 0 && (
                    <>
                      <div className="border-t border-zinc-200 pt-4 mt-4">
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                          Voicemail Template
                        </label>
                        <select
                          value={localProperties.voicemailTemplate}
                          onChange={(e) => setLocalProperties(prev => ({ ...prev, voicemailTemplate: e.target.value }))}
                          className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500 text-sm"
                        >
                          <option value="">Select a template...</option>
                          {voicemailTemplates.map((template) => (
                            <option key={template.id} value={template.id}>
                              {template.name} ({template.type === "dynamic" ? "Dynamic" : template.type === "static" ? "Static" : "Recording"})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Use for all voice blocks checkbox - only show for first voice block */}
                      {(() => {
                        const voiceNodes = nodes.filter(n => n.type === 'voice');
                        const isFirstVoiceBlock = voiceNodes.length > 0 && voiceNodes[0].id === selectedNode.id;
                        return isFirstVoiceBlock ? (
                          <div className="mt-4">
                            <label className="flex items-center space-x-2 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={localProperties.useForAllVoiceBlocks}
                                onChange={(e) => setLocalProperties(prev => ({ ...prev, useForAllVoiceBlocks: e.target.checked }))}
                                className="rounded border-zinc-300 focus:ring-zinc-500"
                              />
                              <span className="text-sm text-zinc-700">
                                Use this template for all voice blocks in this journey
                              </span>
                            </label>
                          </div>
                        ) : null;
                      })()}
                    </>
                  )}
                </>
              )}

              {/* Email Node Properties */}
              {selectedNode.type === 'email' && (
                <>
                  {/* Email Template */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Email Template
                    </label>
                    <select
                      value={localProperties.template}
                      onChange={(e) => setLocalProperties(prev => ({ ...prev, template: e.target.value }))}
                      className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                    >
                      {emailTemplates.map(template => (
                        <option key={template.value} value={template.value}>{template.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Subject Line */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Subject Line
                    </label>
                    <input
                      type="text"
                      value={localProperties.subject}
                      onChange={(e) => setLocalProperties(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                      placeholder="Enter email subject line..."
                    />
                  </div>

                  {/* Custom Body Override */}
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <input
                        type="checkbox"
                        id="useCustomBody"
                        checked={localProperties.useCustomBody}
                        onChange={(e) => setLocalProperties(prev => ({ ...prev, useCustomBody: e.target.checked }))}
                        className="rounded border-zinc-300 focus:ring-zinc-500"
                      />
                      <label htmlFor="useCustomBody" className="text-sm font-medium text-zinc-700">
                        Override Email Body
                      </label>
                    </div>
                    {localProperties.useCustomBody && (
                      <textarea
                        value={localProperties.bodyOverride}
                        onChange={(e) => setLocalProperties(prev => ({ ...prev, bodyOverride: e.target.value }))}
                        rows={6}
                        className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                        placeholder="Enter custom email body content..."
                      />
                    )}
                  </div>
                </>
              )}

              {/* SMS Node Properties */}
              {selectedNode.type === 'sms' && (
                <>
                  {/* SMS Template */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      SMS Template
                    </label>
                    <select
                      value={localProperties.smsTemplate}
                      onChange={(e) => setLocalProperties(prev => ({ ...prev, smsTemplate: e.target.value }))}
                      className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                    >
                      {smsTemplates.map(template => (
                        <option key={template.value} value={template.value}>{template.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Custom Message */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Custom Message
                      <span className="text-xs text-zinc-500 ml-2">
                        ({localProperties.message.length}/{localProperties.maxLength} characters)
                      </span>
                    </label>
                    <textarea
                      value={localProperties.message}
                      onChange={(e) => {
                        if (e.target.value.length <= localProperties.maxLength) {
                          setLocalProperties(prev => ({ ...prev, message: e.target.value }));
                        }
                      }}
                      rows={4}
                      className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                      placeholder="Enter custom SMS message..."
                    />
                  </div>

                  {/* Character Limit */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Character Limit
                    </label>
                    <select
                      value={localProperties.maxLength}
                      onChange={(e) => setLocalProperties(prev => ({ ...prev, maxLength: parseInt(e.target.value) }))}
                      className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                    >
                      <option value={160}>160 (Standard SMS)</option>
                      <option value={320}>320 (Extended SMS)</option>
                      <option value={480}>480 (Multi-part SMS)</option>
                    </select>
                  </div>
                </>
              )}

              {/* Delay Node Properties */}
              {selectedNode.type === 'delay' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">
                        Duration
                      </label>
                      <input
                        type="number"
                        min="1"
                        value={localProperties.duration}
                        onChange={(e) => setLocalProperties(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                        className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">
                        Unit
                      </label>
                      <select
                        value={localProperties.durationUnit}
                        onChange={(e) => setLocalProperties(prev => ({ ...prev, durationUnit: e.target.value }))}
                        className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                      >
                        <option value="minutes">Minutes</option>
                        <option value="hours">Hours</option>
                        <option value="days">Days</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Condition Node Properties */}
              {selectedNode.type === 'condition' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Condition Type
                    </label>
                    <select
                      value={localProperties.conditionType}
                      onChange={(e) => setLocalProperties(prev => ({ ...prev, conditionType: e.target.value }))}
                      className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                    >
                      <option value="">Select condition type...</option>
                      {conditionTypes.map(condition => (
                        <option key={condition.value} value={condition.value}>{condition.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">
                      Condition Value
                    </label>
                    <input
                      type="text"
                      value={localProperties.conditionValue}
                      onChange={(e) => setLocalProperties(prev => ({ ...prev, conditionValue: e.target.value }))}
                      className="w-full border border-zinc-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-zinc-500"
                      placeholder="Enter condition value..."
                    />
                  </div>
                </>
              )}

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
  
  // Get voicemail templates (using mock assistant ID - in real app, get from context/props)
  const voicemailTemplates = getVoicemailTemplates("support-bot-001");
  const isVoicemailDropEnabled = true; // In real app, check from assistant config
  
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  // Handle node click to open properties drawer
  const onNodeClick = useCallback((nodeId, nodeType, nodeData) => {
    setSelectedNode({ id: nodeId, type: nodeType, data: nodeData });
    setShowPropertiesDrawer(true);
  }, []);

  // Load existing segment data when editing
  React.useEffect(() => {
    if (isEditing && id) {
      const existingSegment = sampleSegments.find(segment => segment.id === parseInt(id));
      if (existingSegment) {
        // Pre-fill basic information
        setSegmentName(existingSegment.name);
        setSegmentDescription(existingSegment.description);
        
        // Pre-fill conditions - convert to the format expected by the form
        if (existingSegment.conditions && existingSegment.conditions.length > 0) {
          const formattedConditions = existingSegment.conditions.map((condition, index) => ({
            id: index + 1,
            attribute: condition.attribute,
            condition: condition.condition,
            value: condition.value
          }));
          
          setConditionGroups([
            {
              id: 1,
              operator: "AND",
              conditions: formattedConditions
            }
          ]);
        }
        
        // Load journey data if it exists
        if (existingSegment.journey) {
          const nodesWithHandler = existingSegment.journey.nodes.map(node => ({
            ...node,
            data: {
              ...node.data,
              onNodeClick: onNodeClick
            }
          }));
          setNodes(nodesWithHandler);
          setEdges(existingSegment.journey.edges || []);
        }
      }
    }
  }, [isEditing, id, onNodeClick, setNodes, setEdges]);

  // Initialize nodes with onNodeClick handler (only for new segments)
  React.useEffect(() => {
    if (!isEditing) {
      const nodesWithHandler = initialNodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          onNodeClick: onNodeClick
        }
      }));
      setNodes(nodesWithHandler);
    }
  }, [onNodeClick, setNodes, isEditing]);

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
                onClick={() => navigate("/workflows")}
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
        nodes={nodes}
        voicemailTemplates={voicemailTemplates}
        isVoicemailDropEnabled={isVoicemailDropEnabled}
      />
    </div>
  );
} 