import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PageHeaderWithTabs from "./components/PageHeaderWithTabs";
import { 
  ArrowDownTrayIcon, 
  ChevronDownIcon, 
  PhoneIcon,
  Cog6ToothIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ViewColumnsIcon,
  LinkIcon,
  StarIcon,
  EllipsisHorizontalIcon
} from "@heroicons/react/24/outline";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";

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
    channel: "Voice",
    starred: false
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
    channel: "Voice",
    starred: true
  },
  {
    id: 3,
    recipient: "+15551234567",
    virtualId: "+18773096471",
    createdAt: "August 27, 2025, 18:15 PM",
    duration: "89.12",
    status: "COMPLETED",
    campaign: "Q2 Auto Recovery",
    agent: "Susan",
    assistant: "SupportBot",
    type: "outbound",
    channel: "SMS",
    starred: false
  },
  {
    id: 4,
    recipient: "+14445678901",
    virtualId: "+18773096471",
    createdAt: "August 27, 2025, 17:48 PM",
    duration: "23.67",
    status: "HANGUP",
    campaign: "Q2 Auto Recovery",
    agent: "Scarlett",
    assistant: "FeedbackBot",
    type: "inbound",
    channel: "Voice",
    starred: false
  },
  {
    id: 5,
    recipient: "+18887654321",
    virtualId: "+18773096471",
    createdAt: "August 27, 2025, 16:22 PM",
    duration: "156.89",
    status: "COMPLETED",
    campaign: "Q2 Auto Recovery",
    agent: "Marcus",
    assistant: "SalesAI",
    type: "outbound",
    channel: "Email",
    starred: false
  },
  {
    id: 6,
    recipient: "+17778889990",
    virtualId: "+18773096471",
    createdAt: "August 27, 2025, 15:33 PM",
    duration: "78.45",
    status: "COMPLETED",
    campaign: "Q2 Auto Recovery",
    agent: "Susan",
    assistant: "SupportBot",
    type: "inbound",
    channel: "Voice",
    starred: true
  },
  {
    id: 7,
    recipient: "+19990001112",
    virtualId: "+18773096471",
    createdAt: "August 27, 2025, 14:21 PM",
    duration: "34.12",
    status: "HANGUP",
    campaign: "Q2 Auto Recovery",
    agent: "Jean",
    assistant: "SurveyGenie",
    type: "outbound",
    channel: "SMS",
    starred: false
  },
  {
    id: 8,
    recipient: "+12223334445",
    virtualId: "+18773096471",
    createdAt: "August 27, 2025, 13:15 PM",
    duration: "92.78",
    status: "COMPLETED",
    campaign: "Q2 Auto Recovery",
    agent: "Parker",
    assistant: "ReminderBot",
    type: "inbound",
    channel: "Voice",
    starred: false
  },
  {
    id: 9,
    recipient: "+15556667778",
    virtualId: "+18773096471",
    createdAt: "August 27, 2025, 12:08 PM",
    duration: "45.23",
    status: "USER_HANGUP",
    campaign: "Q2 Auto Recovery",
    agent: "Clark",
    assistant: "SupportBot",
    type: "outbound",
    channel: "Email",
    starred: false
  },
  {
    id: 10,
    recipient: "+18889990001",
    virtualId: "+18773096471",
    createdAt: "August 27, 2025, 11:42 AM",
    duration: "123.67",
    status: "COMPLETED",
    campaign: "Q2 Auto Recovery",
    agent: "Susan",
    assistant: "SupportBot",
    type: "inbound",
    channel: "Voice",
    starred: false
  },
  {
    id: 11,
    recipient: "+14445556667",
    virtualId: "+18773096471",
    createdAt: "August 27, 2025, 10:35 AM",
    duration: "67.89",
    status: "HANGUP",
    campaign: "Q2 Auto Recovery",
    agent: "Marcus",
    assistant: "SalesAI",
    type: "outbound",
    channel: "SMS",
    starred: false
  },
  {
    id: 12,
    recipient: "+17778889992",
    virtualId: "+18773096471",
    createdAt: "August 27, 2025, 09:28 AM",
    duration: "89.45",
    status: "COMPLETED",
    campaign: "Q2 Auto Recovery",
    agent: "Scarlett",
    assistant: "FeedbackBot",
    type: "inbound",
    channel: "Voice",
    starred: false
  },
];

// Mock assistant options
const assistantOptions = [
  { id: "support-bot", name: "SupportBot" },
  { id: "sales-ai", name: "SalesAI" },
  { id: "feedback-bot", name: "FeedbackBot" },
  { id: "survey-genie", name: "SurveyGenie" },
  { id: "reminder-bot", name: "ReminderBot" },
];

// Mock channel options
const channelOptions = [
  { id: "voice", name: "Voice" },
  { id: "sms", name: "SMS" },
  { id: "email", name: "Email" },
];

export default function Conversations() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("Live");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Live");
  const [selectedAssistant, setSelectedAssistant] = useState(assistantOptions[0]);
  const [selectedChannel, setSelectedChannel] = useState(channelOptions[0]);
  const [showAssistantDropdown, setShowAssistantDropdown] = useState(false);
  const [showChannelDropdown, setShowChannelDropdown] = useState(false);
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [openActionDropdown, setOpenActionDropdown] = useState(null);
  
  // Column visibility state - add actions column
  const [visibleColumns, setVisibleColumns] = useState({
    recipient: true,
    virtualId: true,
    type: true,
    createdAt: true,
    duration: true,
    status: true,
    actions: true
  });
  
  // Inline filter states
  const [recipientFilter, setRecipientFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // Filter conversations based on search query, selected assistant, and channel
  const filteredConversations = useMemo(() => {
    let filtered = conversationsData;

    // Filter by assistant
    filtered = filtered.filter(conversation => 
      conversation.assistant === selectedAssistant.name
    );

    // Filter by channel
    filtered = filtered.filter(conversation => 
      conversation.channel === selectedChannel.name
    );

    // Filter by search query (phone numbers or UUID)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (conversation) =>
          conversation.recipient.toLowerCase().includes(query) ||
          conversation.virtualId.toLowerCase().includes(query) ||
          `conv-${conversation.id}`.toLowerCase().includes(query)
      );
    }

    // Inline filters
    if (recipientFilter.trim()) {
      filtered = filtered.filter(conversation =>
        conversation.recipient.toLowerCase().includes(recipientFilter.toLowerCase())
      );
    }

    if (statusFilter.trim()) {
      filtered = filtered.filter(conversation =>
        conversation.status.toLowerCase().includes(statusFilter.toLowerCase())
      );
    }

    if (typeFilter.trim()) {
      filtered = filtered.filter(conversation =>
        conversation.type.toLowerCase().includes(typeFilter.toLowerCase())
      );
    }

    return filtered;
  }, [searchQuery, selectedAssistant, selectedChannel, recipientFilter, statusFilter, typeFilter]);

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

  const toggleColumn = (columnKey) => {
    setVisibleColumns(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }));
  };

  const handleCopyCallLink = async (conversationId, event) => {
    event.stopPropagation(); // Prevent row click
    const callLink = `${window.location.origin}/conversations/${conversationId}`;
    try {
      await navigator.clipboard.writeText(callLink);
      console.log('Call link copied to clipboard');
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy call link:', err);
    }
  };

  const handleToggleStar = (conversationId, event) => {
    event.stopPropagation(); // Prevent row click
    // In a real app, this would update the backend
    console.log(`Toggling star for conversation ${conversationId}`);
    // You could update local state or make an API call here
  };

  const handleActionDropdown = (conversationId, event) => {
    event.stopPropagation(); // Prevent row click
    setOpenActionDropdown(openActionDropdown === conversationId ? null : conversationId);
  };

  const tabs = [
    { value: "Live", label: "Live (0)" },
    { value: "Test", label: "Test (0)" },
  ];

  // Create filters array for PageHeaderWithTabs
  const filters = [
    {
      key: "assistant",
      value: selectedAssistant.name,
      onClick: () => setShowAssistantDropdown(!showAssistantDropdown),
    },
    {
      key: "channel",
      value: selectedChannel.name,
      onClick: () => setShowChannelDropdown(!showChannelDropdown),
    },
  ];

  const handleConversationClick = (conversationId) => {
    navigate(`/conversations/${conversationId}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <PageHeaderWithTabs
        title="Conversations"
        description="Manage your conversations and their configurations here."
        breadcrumbs={["Home", "Conversations"]}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        filters={filters}
        searchPlaceholder="Search by phone or call UUID..."
        createButtonText=""
        createButtonIcon={ViewColumnsIcon}
        onCreateClick={() => setShowColumnSelector(!showColumnSelector)}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Column Selector Dropdown */}
      {showColumnSelector && (
        <div className="relative">
          <div className="absolute top-0 right-6 z-50">
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-48">
              <div className="p-3">
                <div className="text-sm font-medium text-gray-900 mb-2">Show Columns</div>
                <div className="space-y-2">
                  {Object.entries(visibleColumns).map(([key, visible]) => (
                    <label key={key} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={visible}
                        onChange={() => toggleColumn(key)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 capitalize">
                        {key === 'virtualId' ? 'Virtual ID' : 
                         key === 'createdAt' ? 'Created At' : key}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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

      {/* Channel Dropdown */}
      {showChannelDropdown && (
        <div className="relative">
          <div className="absolute top-0 left-52 z-50">
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg w-48">
              <div className="p-2">
                <div className="text-xs text-gray-500 px-2 py-1">Channel</div>
                <div className="border-b border-gray-100 mb-1"></div>
                {channelOptions.map((channel) => (
                  <button
                    key={channel.id}
                    className="w-full text-left px-2 py-1.5 text-sm hover:bg-gray-50 rounded flex items-center justify-between"
                    onClick={() => {
                      setSelectedChannel(channel);
                      setShowChannelDropdown(false);
                    }}
                  >
                    <span>{channel.name}</span>
                    {selectedChannel.id === channel.id && (
                      <span className="text-xs text-gray-500">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {/* Enhanced Conversations Table */}
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          {/* Inline Filters Bar */}
          <div className="bg-gray-50 border-b border-gray-200 p-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <FunnelIcon className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Quick Filters:</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Input
                    placeholder="Filter by recipient..."
                    value={recipientFilter}
                    onChange={(e) => setRecipientFilter(e.target.value)}
                    className="w-40 h-8 text-xs"
                  />
                </div>
                <div className="relative">
                  <Input
                    placeholder="Filter by status..."
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-36 h-8 text-xs"
                  />
                </div>
                <div className="relative">
                  <Input
                    placeholder="Filter by type..."
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-32 h-8 text-xs"
                  />
                </div>
                {(recipientFilter || statusFilter || typeFilter) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setRecipientFilter("");
                      setStatusFilter("");
                      setTypeFilter("");
                    }}
                    className="h-8 px-2 text-xs text-gray-500 hover:text-gray-700"
                  >
                    Clear all
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  {visibleColumns.recipient && (
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider border-b-2 border-gray-100">
                      Recipient
                    </th>
                  )}
                  {visibleColumns.virtualId && (
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider border-b-2 border-gray-100">
                      Virtual ID
                    </th>
                  )}
                  {visibleColumns.type && (
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider border-b-2 border-gray-100">
                      Type
                    </th>
                  )}
                  {visibleColumns.createdAt && (
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider border-b-2 border-gray-100">
                      Created At
                    </th>
                  )}
                  {visibleColumns.duration && (
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider border-b-2 border-gray-100">
                      Duration
                    </th>
                  )}
                  {visibleColumns.status && (
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider border-b-2 border-gray-100">
                      Status
                    </th>
                  )}
                  {visibleColumns.actions && (
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider border-b-2 border-gray-100">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {filteredConversations.slice(0, 8).map((conversation, index) => (
                  <tr
                    key={conversation.id}
                    className={`hover:bg-blue-50 cursor-pointer transition-all duration-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                    }`}
                    onClick={() => handleConversationClick(conversation.id)}
                  >
                    {visibleColumns.recipient && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <PhoneIcon className="w-4 h-4 text-blue-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900 font-mono">
                            {conversation.recipient}
                          </span>
                        </div>
                      </td>
                    )}
                    {visibleColumns.virtualId && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600 font-mono">
                          {conversation.virtualId}
                        </span>
                      </td>
                    )}
                    {visibleColumns.type && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getTypeColor(
                            conversation.type
                          )}`}
                        >
                          {conversation.type}
                        </span>
                      </td>
                    )}
                    {visibleColumns.createdAt && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">
                          {conversation.createdAt}
                        </span>
                      </td>
                    )}
                    {visibleColumns.duration && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600 font-medium">
                          {conversation.duration}s
                        </span>
                      </td>
                    )}
                    {visibleColumns.status && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                            conversation.status
                          )}`}
                        >
                          {conversation.status}
                        </span>
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {/* Copy Link Button */}
                          <button
                            onClick={(e) => handleCopyCallLink(conversation.id, e)}
                            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                            title="Copy call link"
                          >
                            <LinkIcon className="h-4 w-4" />
                          </button>
                          
                          {/* Star Button */}
                          <button
                            onClick={(e) => handleToggleStar(conversation.id, e)}
                            className="p-1.5 text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-full transition-colors"
                            title={conversation.starred ? "Remove from starred" : "Add to starred"}
                          >
                            {conversation.starred ? (
                              <StarIconSolid className="h-4 w-4 text-yellow-500" />
                            ) : (
                              <StarIcon className="h-4 w-4" />
                            )}
                          </button>
                          
                          {/* Three Dots Menu */}
                          <div className="relative">
                            <button
                              onClick={(e) => handleActionDropdown(conversation.id, e)}
                              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors"
                              title="More actions"
                            >
                              <EllipsisHorizontalIcon className="h-4 w-4" />
                            </button>
                            
                            {/* Action Dropdown */}
                            {openActionDropdown === conversation.id && (
                              <div className="absolute right-0 top-8 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                <div className="py-1">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleCopyCallLink(conversation.id, e);
                                      setOpenActionDropdown(null);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                  >
                                    <LinkIcon className="h-4 w-4" />
                                    <span>Copy call link</span>
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleToggleStar(conversation.id, e);
                                      setOpenActionDropdown(null);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2"
                                  >
                                    {conversation.starred ? (
                                      <>
                                        <StarIconSolid className="h-4 w-4 text-yellow-500" />
                                        <span>Remove from starred</span>
                                      </>
                                    ) : (
                                      <>
                                        <StarIcon className="h-4 w-4" />
                                        <span>Mark as starred</span>
                                      </>
                                    )}
                                  </button>
                                  <div className="border-t border-gray-100 my-1"></div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      navigate(`/conversations/${conversation.id}`);
                                      setOpenActionDropdown(null);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                  >
                                    View details
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      console.log('Download transcript for', conversation.id);
                                      setOpenActionDropdown(null);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                  >
                                    Download transcript
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enhanced Results Summary */}
        <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <span>
              Showing {Math.min(filteredConversations.length, 8)} of{" "}
              {filteredConversations.length} conversations
              {filteredConversations.length > 8 && ` (showing first 8)`}
            </span>
            {(recipientFilter || statusFilter || typeFilter) && (
              <span className="text-blue-600 font-medium">
                • Filters applied
              </span>
            )}
          </div>
          <div className="flex items-center space-x-4">
            <span>Tab: {selectedTab}</span>
            {searchQuery && <span>Search: "{searchQuery}"</span>}
            <span>Assistant: {selectedAssistant.name}</span>
            <span>Channel: {selectedChannel.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
