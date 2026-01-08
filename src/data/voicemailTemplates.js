// Shared mock data structure for voicemail templates
// Templates are stored per assistant, but can be shared between assistants

let voicemailTemplates = [
  {
    id: "template-1",
    assistantId: "support-bot-001", // Assistant that owns this template
    name: "Detailed Payment Reminder",
    type: "dynamic",
    content: `{% if detailed_voicemail == "true" %}
Leave a detailed voicemail message including the customer's name ({{customer_name}}), account number ({{account_number}}), and balance ({{account_balance}}). Mention the due date ({{due_date}}) and provide a callback number.
{% else %}
Leave a brief voicemail message with the customer's name ({{customer_name}}) and mention they should call back regarding their account.
{% endif %}`,
    variables: ["customer_name", "account_number", "account_balance", "due_date", "detailed_voicemail"],
    sharedWith: [], // Array of { assistantId, clientId, variableMappings, isImported: true }
    isImported: false, // true if this template is imported from another assistant
    importedFrom: null, // { assistantId, templateId } if imported
    isDefault: true, // true if this is the default template for the assistant
    createdAt: new Date().toISOString(),
  },
  {
    id: "template-2",
    assistantId: "support-bot-001",
    name: "Standard Follow-up",
    type: "static",
    content: "Hi, this is Alex from ABC Auto. We were reaching out regarding a personal financial matter. Please call us back when possible.",
    variables: [],
    sharedWith: [],
    isImported: false,
    importedFrom: null,
    isDefault: false,
    createdAt: new Date().toISOString(),
  },
];

// Get raw templates array (for internal use)
export const getRawVoicemailTemplates = () => {
  return voicemailTemplates;
};

// Functions to manage templates
export const getVoicemailTemplates = (assistantId = null) => {
  if (assistantId) {
    // Return templates owned by this assistant or shared with it
    const ownedTemplates = voicemailTemplates.filter((t) => t.assistantId === assistantId);
    const sharedTemplates = voicemailTemplates
      .filter((t) => t.sharedWith.some((s) => s.assistantId === assistantId))
      .map((t) => ({
        ...t,
        isImported: true,
        importedFrom: {
          assistantId: t.assistantId,
          templateId: t.id,
        },
        // Create a copy for the target assistant with their assistantId
        assistantId: assistantId,
        id: `${t.id}-imported-${assistantId}`, // Unique ID for imported template
        isDefault: false, // Imported templates are never default
      }));
    
    const allTemplates = [...ownedTemplates, ...sharedTemplates];
    
    // Auto-set default if only one template exists and none is marked as default
    if (allTemplates.length === 1 && !allTemplates[0].isDefault) {
      const template = allTemplates[0];
      if (!template.isImported) {
        // Only set default for owned templates
        const index = voicemailTemplates.findIndex((t) => t.id === template.id);
        if (index !== -1) {
          voicemailTemplates[index].isDefault = true;
          allTemplates[0].isDefault = true;
        }
      }
    }
    
    return allTemplates;
  }
  return voicemailTemplates;
};

export const addVoicemailTemplate = (template) => {
  // Extract variables from content (for dynamic/static types)
  const variables = extractVariables(template.content || "");
  
  // Check if this is the first template for this assistant
  const assistantTemplates = voicemailTemplates.filter((t) => t.assistantId === template.assistantId);
  const isFirstTemplate = assistantTemplates.length === 0;
  
  const newTemplate = {
    id: `template-${Date.now()}`,
    ...template,
    variables,
    sharedWith: [],
    isImported: false,
    importedFrom: null,
    isDefault: isFirstTemplate, // Auto-set as default if it's the first template
    createdAt: new Date().toISOString(),
  };
  voicemailTemplates.push(newTemplate);
  return newTemplate;
};

// Extract variable names from JINJA template content
const extractVariables = (content) => {
  const variableRegex = /\{\{([^}]+)\}\}/g;
  const variables = [];
  let match;
  while ((match = variableRegex.exec(content)) !== null) {
    const varName = match[1].trim();
    if (varName && !variables.includes(varName)) {
      variables.push(varName);
    }
  }
  return variables;
};

export const updateVoicemailTemplate = (id, updates) => {
  const index = voicemailTemplates.findIndex((t) => t.id === id);
  if (index !== -1) {
    const template = voicemailTemplates[index];
    
    // If setting as default, unset all other defaults for the same assistant
    if (updates.isDefault === true) {
      voicemailTemplates.forEach((t, i) => {
        if (t.assistantId === template.assistantId && i !== index) {
          t.isDefault = false;
        }
      });
    }
    
    voicemailTemplates[index] = { ...template, ...updates };
    return voicemailTemplates[index];
  }
  return null;
};

export const deleteVoicemailTemplate = (id) => {
  const template = voicemailTemplates.find((t) => t.id === id);
  if (template && template.isDefault) {
    // If deleting the default template, set the first remaining template as default
    const remainingTemplates = voicemailTemplates.filter((t) => t.id !== id && t.assistantId === template.assistantId);
    if (remainingTemplates.length > 0) {
      const firstRemaining = voicemailTemplates.find((t) => t.id === remainingTemplates[0].id);
      if (firstRemaining) {
        firstRemaining.isDefault = true;
      }
    }
  }
  voicemailTemplates = voicemailTemplates.filter((t) => t.id !== id);
};

// Get the default template for an assistant
export const getDefaultVoicemailTemplate = (assistantId) => {
  const templates = getVoicemailTemplates(assistantId);
  return templates.find((t) => t.isDefault && !t.isImported) || templates[0] || null;
};

// 30-day preference storage (localStorage simulation)
export const getCampaignVoicemailPreference = (campaignId) => {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(`voicemail-pref-${campaignId}`);
  if (!stored) return null;
  
  const { templateId, timestamp } = JSON.parse(stored);
  const daysSince = (Date.now() - timestamp) / (1000 * 60 * 60 * 24);
  
  if (daysSince > 30) {
    localStorage.removeItem(`voicemail-pref-${campaignId}`);
    return null;
  }
  
  return templateId;
};

export const setCampaignVoicemailPreference = (campaignId, templateId, remember = false) => {
  if (typeof window === "undefined" || !remember) return;
  localStorage.setItem(
    `voicemail-pref-${campaignId}`,
    JSON.stringify({ templateId, timestamp: Date.now() })
  );
};

// Share template with another assistant
export const shareVoicemailTemplate = (templateId, targetAssistantId, targetClientId, variableMappings) => {
  // Find template by ID - handle both original and imported template IDs
  let template = voicemailTemplates.find((t) => t.id === templateId);
  
  // If not found, it might be an imported template ID, try to find by extracting original ID
  if (!template && templateId.includes('-imported-')) {
    const originalId = templateId.split('-imported-')[0];
    template = voicemailTemplates.find((t) => t.id === originalId);
  }
  
  if (!template) {
    console.error('Template not found:', templateId);
    return null;
  }

  // Check if already shared
  const existingShare = template.sharedWith.find(
    (s) => s.assistantId === targetAssistantId && s.clientId === targetClientId
  );

  if (existingShare) {
    existingShare.variableMappings = variableMappings;
  } else {
    template.sharedWith.push({
      assistantId: targetAssistantId,
      clientId: targetClientId,
      variableMappings,
    });
  }

  console.log('Template shared:', {
    templateId: template.id,
    templateName: template.name,
    targetAssistantId,
    sharedWith: template.sharedWith
  });

  return template;
};

// Get mock assistants and clients for sharing
export const getMockAssistants = () => {
  return [
    { id: "support-bot-001", name: "CarMax", clientId: "client-1", clientName: "CarMax Inc" },
    { id: "sales-ai-002", name: "SalesAI", clientId: "client-2", clientName: "Sales Corp" },
    { id: "survey-genie-003", name: "SurveyGenie", clientId: "client-1", clientName: "CarMax Inc" },
  ];
};

export const getMockClients = () => {
  return [
    { id: "client-1", name: "CarMax Inc" },
    { id: "client-2", name: "Sales Corp" },
    { id: "client-3", name: "Tech Solutions" },
  ];
};

// Get variables for a specific assistant (mock data - in real app, this would come from API)
export const getAssistantVariables = (assistantId) => {
  // Mock variable sets for different assistants
  const assistantVariables = {
    "support-bot-001": [
      { name: "user_intent", displayName: "User Intent", dataType: "String", source: "DYNAMIC" },
      { name: "conversation_id", displayName: "Conversation ID", dataType: "String", source: "DYNAMIC" },
      { name: "session_id", displayName: "Session ID", dataType: "String", source: "DYNAMIC" },
      { name: "timestamp", displayName: "Timestamp", dataType: "String", source: "DYNAMIC" },
      { name: "language", displayName: "Language", dataType: "String", source: "DYNAMIC" },
      { name: "timezone", displayName: "Timezone", dataType: "String", source: "DYNAMIC" },
      { name: "device_id", displayName: "Device ID", dataType: "String", source: "DYNAMIC" },
      { name: "customer_name", displayName: "Customer Name", dataType: "String", source: "DYNAMIC" },
      { name: "account_number", displayName: "Account Number", dataType: "String", source: "DYNAMIC" },
      { name: "account_balance", displayName: "Account Balance", dataType: "Number", source: "DYNAMIC" },
      { name: "due_date", displayName: "Due Date", dataType: "String", source: "DYNAMIC" },
      { name: "detailed_voicemail", displayName: "Detailed Voicemail", dataType: "Boolean", source: "DYNAMIC" },
    ],
    "sales-ai-002": [
      { name: "user_intent", displayName: "User Intent", dataType: "String", source: "DYNAMIC" },
      { name: "conversation_id", displayName: "Conversation ID", dataType: "String", source: "DYNAMIC" },
      { name: "session_id", displayName: "Session ID", dataType: "String", source: "DYNAMIC" },
      { name: "timestamp", displayName: "Timestamp", dataType: "String", source: "DYNAMIC" },
      { name: "language", displayName: "Language", dataType: "String", source: "DYNAMIC" },
      { name: "timezone", displayName: "Timezone", dataType: "String", source: "DYNAMIC" },
      { name: "device_id", displayName: "Device ID", dataType: "String", source: "DYNAMIC" },
      { name: "client_name", displayName: "Client Name", dataType: "String", source: "DYNAMIC" },
      { name: "account_id", displayName: "Account ID", dataType: "String", source: "DYNAMIC" },
      { name: "balance_amount", displayName: "Balance Amount", dataType: "Number", source: "DYNAMIC" },
      { name: "payment_due_date", displayName: "Payment Due Date", dataType: "String", source: "DYNAMIC" },
    ],
    "survey-genie-003": [
      { name: "user_intent", displayName: "User Intent", dataType: "String", source: "DYNAMIC" },
      { name: "conversation_id", displayName: "Conversation ID", dataType: "String", source: "DYNAMIC" },
      { name: "session_id", displayName: "Session ID", dataType: "String", source: "DYNAMIC" },
      { name: "timestamp", displayName: "Timestamp", dataType: "String", source: "DYNAMIC" },
      { name: "language", displayName: "Language", dataType: "String", source: "DYNAMIC" },
      { name: "timezone", displayName: "Timezone", dataType: "String", source: "DYNAMIC" },
      { name: "device_id", displayName: "Device ID", dataType: "String", source: "DYNAMIC" },
      { name: "respondent_name", displayName: "Respondent Name", dataType: "String", source: "DYNAMIC" },
      { name: "survey_id", displayName: "Survey ID", dataType: "String", source: "DYNAMIC" },
      { name: "response_count", displayName: "Response Count", dataType: "Number", source: "DYNAMIC" },
    ],
  };

  // Return variables for the assistant, or default set if not found
  return assistantVariables[assistantId] || assistantVariables["support-bot-001"];
};

