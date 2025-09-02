import React, { useState, useMemo } from "react";
import PageHeaderWithTabs from "./components/PageHeaderWithTabs";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

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
  },
];

export default function Conversations() {
  const [selectedTab, setSelectedTab] = useState("Live");
  const [selectedConversation, setSelectedConversation] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Live");

  // Filter conversations based on search query
  const filteredConversations = useMemo(() => {
    if (!searchQuery.trim()) return conversationsData;

    const query = searchQuery.toLowerCase();
    return conversationsData.filter(
      (conversation) =>
        conversation.recipient.toLowerCase().includes(query) ||
        conversation.virtualId.toLowerCase().includes(query) ||
        conversation.status.toLowerCase().includes(query)
    );
  }, [searchQuery]);

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

  const tabs = [
    { value: "Live", label: "Live (0)" },
    { value: "Test", label: "Test (0)" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeaderWithTabs
        title="Conversations"
        description="Manage your conversations and their configurations here."
        breadcrumbs={["Home", "Conversations"]}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        searchPlaceholder="Search conversations..."
        createButtonText="Download Bulk Recordings"
        createButtonIcon={ArrowDownTrayIcon}
        onCreateClick={() => {}}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {/* Conversations Table */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recipient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Virtual ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredConversations.slice(0, 8).map((conversation) => (
                  <tr
                    key={conversation.id}
                    className={`hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${
                      selectedConversation === conversation.id
                        ? "bg-blue-50 border-l-4 border-l-blue-500"
                        : ""
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                          <svg
                            className="w-4 h-4 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-900 font-mono">
                          {conversation.recipient}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 font-mono">
                        {conversation.virtualId}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {conversation.createdAt}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 font-medium">
                        {conversation.duration}s
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                          conversation.status
                        )}`}
                      >
                        {conversation.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
          <div>
            Showing {Math.min(filteredConversations.length, 8)} of{" "}
            {filteredConversations.length} conversations
            {filteredConversations.length > 8 && ` (showing first 8)`}
          </div>
          <div className="flex items-center space-x-4">
            <span>Tab: {selectedTab}</span>
            {searchQuery && <span>Search: "{searchQuery}"</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
