import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  UserGroupIcon,
  CurrencyDollarIcon,
  TagIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import PageHeaderWithTabs from "./components/PageHeaderWithTabs";

const campaigns = [
  {
    id: 1,
    name: "Q2 Auto Loan Recovery",
    status: "Active",
    createdBy: "Noor",
    start: "2024-04-01 09:00",
    end: "2024-06-30 18:00",
    assistant: "SupportBot",
  },
  {
    id: 2,
    name: "Credit Card Winback",
    status: "Paused",
    createdBy: "Alex",
    start: "2024-03-15 10:00",
    end: "2024-05-31 17:00",
    assistant: "SalesAI",
  },
  {
    id: 3,
    name: "Mortgage Early DPD",
    status: "Draft",
    createdBy: "Samira",
    start: "2024-02-20 08:30",
    end: "2024-04-15 16:00",
    assistant: "FeedbackBot",
  },
  {
    id: 4,
    name: "Personal Loan Follow-up",
    status: "Active",
    createdBy: "David",
    start: "2024-01-10 09:15",
    end: "2024-03-31 17:30",
    assistant: "SurveyGenie",
  },
  {
    id: 5,
    name: "Business Account Recovery",
    status: "Completed",
    createdBy: "Lisa",
    start: "2023-12-01 08:00",
    end: "2024-02-29 18:00",
    assistant: "ReminderBot",
  },
  {
    id: 6,
    name: "Student Loan Outreach",
    status: "Active",
    createdBy: "Mike",
    start: "2024-03-01 09:00",
    end: "2024-05-31 18:00",
    assistant: "SupportBot",
  },
  {
    id: 7,
    name: "Credit Line Increase",
    status: "Paused",
    createdBy: "Sarah",
    start: "2024-02-15 10:00",
    end: "2024-04-30 17:00",
    assistant: "SalesAI",
  },
  {
    id: 8,
    name: "Overdraft Protection",
    status: "Draft",
    createdBy: "John",
    start: "2024-01-20 08:30",
    end: "2024-03-15 16:00",
    assistant: "FeedbackBot",
  },
  {
    id: 9,
    name: "Home Equity Follow-up",
    status: "Active",
    createdBy: "Emma",
    start: "2024-02-10 09:15",
    end: "2024-04-30 17:30",
    assistant: "SurveyGenie",
  },
  {
    id: 10,
    name: "Investment Account Recovery",
    status: "Completed",
    createdBy: "Tom",
    start: "2023-11-01 08:00",
    end: "2024-01-31 18:00",
    assistant: "ReminderBot",
  },
];

const assistantOptions = [
  { id: "support-bot", name: "SupportBot" },
  { id: "sales-ai", name: "SalesAI" },
  { id: "feedback-bot", name: "FeedbackBot" },
  { id: "survey-genie", name: "SurveyGenie" },
  { id: "reminder-bot", name: "ReminderBot" },
];

export default function Campaigns() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("Active");
  const [selectedCampaign, setSelectedCampaign] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("Active");
  const [selectedAssistant, setSelectedAssistant] = useState(assistantOptions[0]);
  const [showAssistantDropdown, setShowAssistantDropdown] = useState(false);

  // Filter campaigns based on search query and selected assistant
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = searchQuery.trim() === "" || 
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.assistant.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesAssistant = campaign.assistant === selectedAssistant.name;
    
    return matchesSearch && matchesAssistant;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 border-green-200";
      case "Paused":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Draft":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "Completed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const tabs = [
    { value: "Active", label: "Active (3)" },
    { value: "Paused", label: "Paused (2)" },
    { value: "Draft", label: "Draft (2)" },
    { value: "Completed", label: "Completed (2)" },
  ];

  // Create filters array for PageHeaderWithTabs - Assistant filter first
  const filters = [
    {
      key: "assistant",
      value: selectedAssistant.name,
      onClick: () => setShowAssistantDropdown(!showAssistantDropdown),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeaderWithTabs
        title="Campaigns"
        description="Manage your campaigns and their configurations here."
        breadcrumbs={["Home", "Campaigns"]}
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        filters={filters}
        searchPlaceholder="Search campaigns..."
        createButtonText="Create Campaign"
        createButtonIcon={UserGroupIcon}
        onCreateClick={() => navigate("/create-campaign")}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Assistant Dropdown - positioned relative to the header */}
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

      {/* Main Content Area */}
      <div className="flex-1 p-6">
        {/* Campaigns Table - Made scrollable with fixed height */}
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto max-h-[calc(100vh-300px)] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Campaign Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assistant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCampaigns.map((campaign) => (
                  <tr
                    key={campaign.id}
                    className={`hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${
                      selectedCampaign === campaign.id
                        ? "bg-blue-50 border-l-4 border-l-blue-500"
                        : ""
                    }`}
                    onClick={() => setSelectedCampaign(campaign.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {campaign.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 font-medium">
                        {campaign.assistant}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                          campaign.status
                        )}`}
                      >
                        {campaign.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {campaign.createdBy}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {campaign.start}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {campaign.end}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/campaigns/${campaign.id}`);
                          }}
                        >
                          View
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <ChevronDownIcon className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/campaigns/${campaign.id}/edit`);
                              }}
                            >
                              Edit Campaign
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle duplicate
                              }}
                            >
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle pause/resume
                              }}
                            >
                              {campaign.status === "Active" ? "Pause" : "Resume"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                // Handle delete
                              }}
                              className="text-red-600"
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
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
            Showing {filteredCampaigns.length} of {campaigns.length} campaigns
          </div>
          <div className="flex items-center space-x-4">
            <span>Tab: {selectedTab}</span>
            {searchQuery && <span>Search: "${searchQuery}"</span>}
            <span>Assistant: {selectedAssistant.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
