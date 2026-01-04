import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowDownTrayIcon,
  PlusIcon,
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  PhoneIcon,
  EnvelopeIcon,
  CalendarIcon,
  CheckIcon,
  RocketLaunchIcon,
  CursorArrowRaysIcon,
  ClockIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import PageHeaderWithTabs from "./components/PageHeaderWithTabs";

function AccountData() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRisk, setFilterRisk] = useState("all");
  const [showColumnSelector, setShowColumnSelector] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("journey");

  // Column visibility state
  const [visibleColumns, setVisibleColumns] = useState({
    id: true,
    name: true,
    journeyMode: true,
    phone: true,
    email: true,
    balance: true,
    dpd: true,
    riskScore: true,
    lastContact: false,
    actions: true,
  });

  // Column definitions
  const columnOptions = [
    { key: "id", label: "Account ID", required: true },
    { key: "name", label: "Debtor Name", required: true },
    { key: "journeyMode", label: "Journey Mode", required: false },
    { key: "phone", label: "Phone", required: false },
    { key: "email", label: "Email", required: false },
    { key: "balance", label: "Balance Due", required: true },
    { key: "dpd", label: "DPD", required: true },
    { key: "riskScore", label: "Risk Score", required: false },
    { key: "lastContact", label: "Last Contact", required: false },
    { key: "actions", label: "Actions", required: true },
  ];

  // Helper function to get journey mode from account ID
  const getJourneyMode = (accountId) => {
    const hash = accountId
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return hash % 2 === 0 ? "auto-pilot" : "co-pilot";
  };

  // Sample communication timeline data
  const getCommunicationTimeline = (accountId) => {
    const baseTimeline = [
      {
        id: 1,
        type: "Scheduler",
        subType: "scheduled",
        date: "2025-03-10T08:30:00Z",
        title: "Scheduled Communication",
        description: "Scheduled at: 10:30PM at 12 March 2025",
        decider: "AI Collection Intelligence",
        badge: "Scheduler",
        status: "scheduled",
        icon: "●",
      },
      {
        id: 2,
        type: "Voice Call",
        subType: "voice",
        date: "2025-03-12T10:30:00Z",
        title: "Summary",
        description:
          "Consumer answered, sounded weak and unwell, stated they had the flu and asked to be called back next week noon. AI expressed get well wishes.",
        intent: "sick",
        sentiment: "Negative (-0.7)",
        badge: "Voice",
        status: "completed",
        icon: "●",
      },
      {
        id: 3,
        type: "Scheduler",
        subType: "scheduled",
        date: "2025-03-10T10:30:00Z",
        title: "Scheduled Communication",
        description: "Scheduled at: 01:30PM at 12 March 2025",
        decider: "User Preference",
        badge: "Scheduler",
        status: "scheduled",
        icon: "●",
      },
      {
        id: 4,
        type: "Scheduler",
        subType: "voice_scheduled",
        date: "2025-03-19T01:30:00Z",
        title: "Scheduled Communication",
        description:
          "AI called back as scheduled. Consumer confirmed they are feeling much better. Discussed the outstanding amount. Consumer agreed to make the payment now and requested the payment link be sent via SMS.",
        decider: "",
        badge: "Voice",
        status: "completed",
        icon: "●",
      },
      {
        id: 5,
        type: "SMS / Text",
        subType: "planned",
        date: "2025-03-19T10:40:00Z",
        title: "Planned Communication",
        description:
          "Hi Sarah, thanks for your chat and for your commitment to pay. Glad you're feeling up to it! Payment link: [Payment Link] You'll receive a confirmation once the payment is processed.",
        tonality: "Warmly Appreciative",
        focus: "Payment_Link_Delivery",
        campaign: "CarMax Campaign",
        segment: "Cooperative Payment Arrangers",
        badge: "SMS",
        status: "ai_recommended",
        icon: "●",
      },
    ];

    return baseTimeline;
  };

  // Journey data for Auto-pilot and Co-pilot modes
  const getJourneyData = (accountId) => {
    // Use accountId to create deterministic random assignment
    const hash = accountId
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const isAutoPilot = hash % 2 === 0;

    const channels = ["Voice Call", "SMS", "Email", "WhatsApp", "Voice Call"];
    const tonalities = [
      "Empathetic & Understanding",
      "Professional & Firm",
      "Friendly & Supportive",
      "Urgent & Direct",
      "Warmly Appreciative",
    ];
    const focuses = [
      "Payment Reminder",
      "Payment Arrangement",
      "Follow-up",
      "Escalation Warning",
      "Payment Confirmation",
    ];

    const journeyNames = [
      "Early Stage Recovery",
      "Mid-Cycle Engagement",
      "Payment Plan Follow-up",
      "Final Notice Journey",
      "Re-engagement Campaign",
    ];

    // Generate 5 planned communications
    const baseDate = new Date();
    const communications = [];
    let delayDays = 0;

    for (let i = 0; i < 5; i++) {
      const commDate = new Date(baseDate);
      delayDays += [1, 2, 3, 2, 4][i]; // Variable delays
      commDate.setDate(commDate.getDate() + delayDays);

      communications.push({
        id: i + 1,
        scheduledDate: commDate.toISOString(),
        channel: channels[i],
        tonality: tonalities[i],
        focus: focuses[i],
        delay: [1, 2, 3, 2, 4][i],
        status: i === 0 ? "next" : "upcoming",
        message:
          i === 0
            ? "Ready to execute - awaiting scheduled time"
            : `Scheduled ${delayDays} days from now`,
      });
    }

    return {
      mode: isAutoPilot ? "auto-pilot" : "co-pilot",
      journeyName: journeyNames[hash % journeyNames.length],
      description: isAutoPilot
        ? "AI is autonomously managing communication for this account based on behavioral signals and optimal timing."
        : "AI recommends actions for human approval. Review and approve each communication before it's sent.",
      communications,
    };
  };

  // Handle account click
  const handleAccountClick = (account) => {
    setSelectedAccount(account);
    setIsDrawerOpen(true);
    setShowColumnSelector(false); // Close column selector when opening drawer
  };

  // Handle column toggle
  const toggleColumn = (columnKey) => {
    const column = columnOptions.find((col) => col.key === columnKey);
    if (column?.required) return; // Don't allow toggling required columns

    setVisibleColumns((prev) => ({
      ...prev,
      [columnKey]: !prev[columnKey],
    }));
  };

  // Sample debtor data
  const accountsData = [
    {
      id: "ACC_12345",
      name: "John Smith",
      phone: "+1 (555) 123-4567",
      email: "john.smith@email.com",
      balance: 2500.0,
      dpd: 15,
      riskScore: "Medium",
      lastContact: "2 days ago",
      status: "active",
    },
    {
      id: "ACC_67890",
      name: "Sarah Johnson",
      phone: "+1 (555) 987-6543",
      email: "sarah.johnson@email.com",
      balance: 1750.25,
      dpd: 45,
      riskScore: "High",
      lastContact: "5 days ago",
      status: "active",
    },
    {
      id: "ACC_11223",
      name: "Michael Davis",
      phone: "+1 (555) 456-7890",
      email: "m.davis@email.com",
      balance: 3200.5,
      dpd: 5,
      riskScore: "Low",
      lastContact: "1 day ago",
      status: "active",
    },
    {
      id: "ACC_44567",
      name: "Emily Rodriguez",
      phone: "+1 (555) 234-5678",
      email: "emily.rodriguez@email.com",
      balance: 950.75,
      dpd: 30,
      riskScore: "Medium",
      lastContact: "3 days ago",
      status: "active",
    },
    {
      id: "ACC_78901",
      name: "Robert Wilson",
      phone: "+1 (555) 345-6789",
      email: "robert.wilson@email.com",
      balance: 4125.0,
      dpd: 75,
      riskScore: "High",
      lastContact: "7 days ago",
      status: "active",
    },
    {
      id: "ACC_99234",
      name: "Lisa Chen",
      phone: "+1 (555) 567-8901",
      email: "lisa.chen@email.com",
      balance: 1825.4,
      dpd: 22,
      riskScore: "Medium",
      lastContact: "4 days ago",
      status: "active",
    },
    {
      id: "ACC_55678",
      name: "David Thompson",
      phone: "+1 (555) 678-9012",
      email: "david.thompson@email.com",
      balance: 2750.8,
      dpd: 60,
      riskScore: "High",
      lastContact: "10 days ago",
      status: "active",
    },
    {
      id: "ACC_33445",
      name: "Amanda Martinez",
      phone: "+1 (555) 789-0123",
      email: "amanda.martinez@email.com",
      balance: 1320.6,
      dpd: 8,
      riskScore: "Low",
      lastContact: "1 day ago",
      status: "active",
    },
  ];

  const getDpdBadgeColor = (dpd) => {
    if (dpd <= 10) return "bg-green-100 text-green-800";
    if (dpd <= 25) return "bg-yellow-100 text-yellow-800";
    if (dpd <= 40) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

  const filteredAccounts = accountsData.filter((account) => {
    const matchesSearch =
      account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRisk =
      filterRisk === "all" || account.riskScore.toLowerCase() === filterRisk;

    return matchesSearch && matchesRisk;
  });

  return (
    <div className="min-h-screen" onClick={() => setShowColumnSelector(false)}>
      <PageHeaderWithTabs
        title="Account Data"
        description="Manage and view all account holder details and contact information"
        breadcrumbs={["Home", "Account Data"]}
        searchPlaceholder="Search by name, account ID, or email..."
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        filters={[
          {
            key: "risk",
            value:
              filterRisk === "all"
                ? "All Risk Levels"
                : `${filterRisk.charAt(0).toUpperCase()}${filterRisk.slice(
                    1
                  )} Risk`,
            onClick: () => {
              // Toggle through risk filter options
              const options = ["all", "low", "medium", "high"];
              const currentIndex = options.indexOf(filterRisk);
              const nextIndex = (currentIndex + 1) % options.length;
              setFilterRisk(options[nextIndex]);
            },
          },
        ]}
        additionalButton={{
          text: "Columns",
          icon: <AdjustmentsHorizontalIcon className="w-4 h-4" />,
          onClick: (e) => {
            e.stopPropagation();
            setShowColumnSelector(!showColumnSelector);
          },
        }}
        createButton={{
          text: "Add Account",
          icon: PlusIcon,
          onClick: () => {
            // Handle add account
            console.log("Add account clicked");
          },
        }}
      />

      <div className="max-w-8xl mx-auto sm:px-6 lg:px-8 py-4">
        {/* Summary Stats */}

        {/* Main Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {/* Table Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Accounts
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Showing {filteredAccounts.length} of 5,847 accounts
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
                  Export CSV
                </button>
              </div>
            </div>
          </div>

          {/* Column Selector Dropdown */}
          {showColumnSelector && (
            <div className="relative">
              <div
                className="absolute right-6 top-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-30"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    Select Columns
                  </h3>
                  <div className="space-y-2">
                    {columnOptions.map((column) => (
                      <label key={column.key} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={visibleColumns[column.key]}
                          onChange={() => toggleColumn(column.key)}
                          disabled={column.required}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span
                          className={`ml-2 text-sm ${
                            column.required ? "text-gray-400" : "text-gray-700"
                          }`}
                        >
                          {column.label}
                          {column.required && " (Required)"}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="overflow-hidden">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {visibleColumns.id && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                      Account ID
                    </th>
                  )}
                  {visibleColumns.name && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Debtor Name
                    </th>
                  )}
                  {visibleColumns.journeyMode && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-28">
                      Journey Mode
                    </th>
                  )}
                  {visibleColumns.phone && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      Phone
                    </th>
                  )}
                  {visibleColumns.email && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                  )}
                  {visibleColumns.balance && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-28">
                      Balance Due
                    </th>
                  )}
                  {visibleColumns.dpd && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                      DPD
                    </th>
                  )}
                  {visibleColumns.riskScore && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-24">
                      Risk Score
                    </th>
                  )}
                  {visibleColumns.lastContact && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-28">
                      Last Contact
                    </th>
                  )}
                  {visibleColumns.actions && (
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAccounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-50">
                    {visibleColumns.id && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleAccountClick(account)}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {account.id}
                        </button>
                      </td>
                    )}
                    {visibleColumns.name && (
                      <td className="px-4 py-3 text-sm text-gray-900 max-w-0">
                        <div className="truncate">{account.name}</div>
                      </td>
                    )}
                    {visibleColumns.journeyMode && (
                      <td className="px-4 py-3 whitespace-nowrap">
                        {(() => {
                          const mode = getJourneyMode(account.id);
                          return (
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                                mode === "auto-pilot"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {mode === "auto-pilot"
                                ? "🚀 Auto-pilot"
                                : "🎯 Co-pilot"}
                            </span>
                          );
                        })()}
                      </td>
                    )}
                    {visibleColumns.phone && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {account.phone}
                      </td>
                    )}
                    {visibleColumns.email && (
                      <td className="px-4 py-3 text-sm text-gray-500 max-w-0">
                        <div className="truncate">{account.email}</div>
                      </td>
                    )}
                    {visibleColumns.balance && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-medium">
                        $
                        {account.balance.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                    )}
                    {visibleColumns.dpd && (
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDpdBadgeColor(
                            account.dpd
                          )}`}
                        >
                          {account.dpd}d
                        </span>
                      </td>
                    )}
                    {visibleColumns.riskScore && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {account.riskScore}
                      </td>
                    )}
                    {visibleColumns.lastContact && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {account.lastContact}
                      </td>
                    )}
                    {visibleColumns.actions && (
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <button className="text-blue-600 hover:text-blue-800 mr-2 font-medium">
                          Edit
                        </button>
                        <button className="text-green-600 hover:text-green-800 font-medium">
                          Contact
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Showing {filteredAccounts.length} of 5,847 accounts</span>
              <div className="flex items-center space-x-2">
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Previous
                </button>
                <span>•</span>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Next
                </button>
                <span>•</span>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  View All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Account Details Drawer */}
      {isDrawerOpen && selectedAccount && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsDrawerOpen(false)}
          />

          {/* Drawer - Made Much Bigger */}
          <div className="absolute right-0 top-0 h-full w-[800px] flex flex-col bg-white shadow-xl z-10">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Account Timeline: {selectedAccount.id} -{" "}
                    {selectedAccount.name}
                  </h2>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="rounded-md p-2 text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Conversation Highlights Summary */}
            <div className="px-6 py-4 bg-blue-50 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Conversation Highlights
              </h3>
              <div className="flex gap-4 text-sm">
                <div className="w-[30%] bg-white rounded-lg p-3 border">
                  <div className="text-gray-500 text-xs mb-1">Last Contact</div>
                  <div className="font-medium text-gray-900">
                    March 19, 2025
                  </div>
                  <div className="text-xs text-gray-600">
                    Voice call - Payment arrangement
                  </div>
                </div>
                <div className="w-[70%] bg-white rounded-lg p-4 border">
                  <div className="text-gray-500 text-xs mb-2">
                    Conversation Summary
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Positive
                    </span>
                    <span className="text-xs text-gray-600">
                      Cooperative & committed to pay
                    </span>
                  </div>
                  <div className="text-sm text-gray-900 mb-2">
                    Customer acknowledged debt and requested payment plan.
                    Agreed to $500 monthly payments starting next week.
                  </div>
                  <div className="text-xs text-blue-600 font-medium">
                    Next: SMS Payment Link (AI recommended - ready to send)
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="px-6 border-b border-gray-200">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("journey")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "journey"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Journey
                </button>
                <button
                  onClick={() => setActiveTab("communication")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "communication"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Communication Timeline
                </button>
                <button
                  onClick={() => setActiveTab("details")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "details"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  User Details
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-hidden bg-gray-50">
              {activeTab === "journey" && (
                <div className="h-full overflow-y-auto px-6 py-6">
                  {(() => {
                    const journeyData = getJourneyData(selectedAccount.id);
                    const isAutoPilot = journeyData.mode === "auto-pilot";

                    return (
                      <div className="space-y-6">
                        {/* Journey Mode Header */}
                        <div
                          className={`rounded-xl p-6 border-2 ${
                            isAutoPilot
                              ? "bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200"
                              : "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                              <div
                                className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                                  isAutoPilot ? "bg-purple-100" : "bg-amber-100"
                                }`}
                              >
                                {isAutoPilot ? (
                                  <RocketLaunchIcon
                                    className={`w-8 h-8 ${
                                      isAutoPilot
                                        ? "text-purple-600"
                                        : "text-amber-600"
                                    }`}
                                  />
                                ) : (
                                  <CursorArrowRaysIcon className="w-8 h-8 text-amber-600" />
                                )}
                              </div>
                              <div>
                                <div className="flex items-center space-x-3">
                                  <h3
                                    className={`text-xl font-bold ${
                                      isAutoPilot
                                        ? "text-purple-900"
                                        : "text-amber-900"
                                    }`}
                                  >
                                    {isAutoPilot
                                      ? "Auto-pilot Mode"
                                      : "Co-pilot Mode"}
                                  </h3>
                                  <span
                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                      isAutoPilot
                                        ? "bg-purple-200 text-purple-800"
                                        : "bg-amber-200 text-amber-800"
                                    }`}
                                  >
                                    {isAutoPilot ? "AUTONOMOUS" : "ASSISTED"}
                                  </span>
                                </div>
                                <p
                                  className={`mt-1 text-sm ${
                                    isAutoPilot
                                      ? "text-purple-700"
                                      : "text-amber-700"
                                  }`}
                                >
                                  {journeyData.description}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Journey Name for Co-pilot */}
                          {!isAutoPilot && (
                            <div className="mt-4 pt-4 border-t border-amber-200">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium text-amber-800">
                                  Active Journey:
                                </span>
                                <span className="px-3 py-1 bg-white rounded-lg text-sm font-semibold text-amber-900 border border-amber-300">
                                  {journeyData.journeyName}
                                </span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Next 5 Communications */}
                        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                            <h4 className="text-lg font-semibold text-gray-900">
                              Next 5 Planned Communications
                            </h4>
                            <p className="text-sm text-gray-600 mt-1">
                              {isAutoPilot
                                ? "These communications will be executed automatically at scheduled times"
                                : "Review and approve each communication before execution"}
                            </p>
                          </div>

                          <div className="p-6">
                            <div className="relative">
                              {journeyData.communications.map((comm, index) => (
                                <div key={comm.id} className="relative">
                                  {/* Connection Line */}
                                  {index <
                                    journeyData.communications.length - 1 && (
                                    <div className="absolute left-6 top-16 h-24 w-0.5 bg-gray-200" />
                                  )}

                                  {/* Delay Indicator */}
                                  {index > 0 && (
                                    <div className="flex items-center justify-center py-3">
                                      <div className="flex items-center space-x-2 px-3 py-1 bg-gray-100 rounded-full">
                                        <ClockIcon className="w-4 h-4 text-gray-500" />
                                        <span className="text-xs font-medium text-gray-600">
                                          {comm.delay} day
                                          {comm.delay > 1 ? "s" : ""} delay
                                        </span>
                                        <ArrowRightIcon className="w-3 h-3 text-gray-400" />
                                      </div>
                                    </div>
                                  )}

                                  {/* Communication Card */}
                                  <div
                                    className={`relative flex items-start space-x-4 p-4 rounded-xl border-2 transition-all ${
                                      comm.status === "next"
                                        ? "bg-blue-50 border-blue-300 shadow-md"
                                        : "bg-white border-gray-200 hover:border-gray-300"
                                    }`}
                                  >
                                    {/* Step Number */}
                                    <div
                                      className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                                        comm.status === "next"
                                          ? "bg-blue-500 text-white"
                                          : "bg-gray-100 text-gray-600"
                                      }`}
                                    >
                                      {comm.id}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-start justify-between">
                                        <div>
                                          <div className="flex items-center space-x-2">
                                            <span
                                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                                                comm.channel === "Voice Call"
                                                  ? "bg-blue-100 text-blue-800"
                                                  : comm.channel === "SMS"
                                                  ? "bg-yellow-100 text-yellow-800"
                                                  : comm.channel === "Email"
                                                  ? "bg-green-100 text-green-800"
                                                  : comm.channel === "WhatsApp"
                                                  ? "bg-emerald-100 text-emerald-800"
                                                  : "bg-gray-100 text-gray-800"
                                              }`}
                                            >
                                              {comm.channel}
                                            </span>
                                            {comm.status === "next" && (
                                              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-500 text-white animate-pulse">
                                                NEXT UP
                                              </span>
                                            )}
                                          </div>
                                          <h5 className="mt-2 text-sm font-semibold text-gray-900">
                                            {comm.focus}
                                          </h5>
                                        </div>
                                        <div className="text-right">
                                          <div className="text-sm font-medium text-gray-900">
                                            {new Date(
                                              comm.scheduledDate
                                            ).toLocaleDateString("en-US", {
                                              month: "short",
                                              day: "numeric",
                                              year: "numeric",
                                            })}
                                          </div>
                                          <div className="text-xs text-gray-500">
                                            {new Date(
                                              comm.scheduledDate
                                            ).toLocaleTimeString("en-US", {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                            })}
                                          </div>
                                        </div>
                                      </div>

                                      {/* Details Grid */}
                                      <div className="mt-3 grid grid-cols-2 gap-3">
                                        <div className="flex items-center space-x-2">
                                          <span className="text-xs text-gray-500">
                                            Tonality:
                                          </span>
                                          <span className="text-xs font-medium text-gray-800 bg-gray-100 px-2 py-0.5 rounded">
                                            {comm.tonality}
                                          </span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                          <span className="text-xs text-gray-500">
                                            Status:
                                          </span>
                                          <span
                                            className={`text-xs font-medium px-2 py-0.5 rounded ${
                                              comm.status === "next"
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-gray-100 text-gray-600"
                                            }`}
                                          >
                                            {comm.message}
                                          </span>
                                        </div>
                                      </div>

                                      {/* Co-pilot Skip Button */}
                                      {!isAutoPilot &&
                                        comm.status === "next" && (
                                          <div className="mt-4 flex items-center">
                                            <button className="px-4 py-2 text-red-600 text-sm font-medium border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                                              Skip
                                            </button>
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Journey Summary Stats */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-white rounded-xl border border-gray-200 p-4">
                            <div className="text-sm text-gray-500">
                              Total Communications
                            </div>
                            <div className="mt-1 text-2xl font-bold text-gray-900">
                              5
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Planned in journey
                            </div>
                          </div>
                          <div className="bg-white rounded-xl border border-gray-200 p-4">
                            <div className="text-sm text-gray-500">
                              Journey Duration
                            </div>
                            <div className="mt-1 text-2xl font-bold text-gray-900">
                              12 days
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              Total timeline
                            </div>
                          </div>
                          <div className="bg-white rounded-xl border border-gray-200 p-4">
                            <div className="text-sm text-gray-500">
                              Next Action
                            </div>
                            <div className="mt-1 text-2xl font-bold text-blue-600">
                              Tomorrow
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {journeyData.communications[0].channel}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {activeTab === "communication" && (
                <div className="h-full overflow-y-auto px-6 py-6">
                  <div className="space-y-4">
                    {getCommunicationTimeline(selectedAccount.id).map(
                      (item, index) => (
                        <div key={item.id} className="relative">
                          {/* Timeline line */}
                          {index <
                            getCommunicationTimeline(selectedAccount.id)
                              .length -
                              1 && (
                            <div className="absolute left-4 top-12 bottom-0 w-0.5 bg-gray-200" />
                          )}

                          {/* Timeline item */}
                          <div className="flex items-start space-x-4">
                            {/* Timeline dot */}
                            <div
                              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-medium mt-1 ${
                                item.type === "Scheduler"
                                  ? "bg-green-500"
                                  : item.type === "Voice Call"
                                  ? "bg-blue-500"
                                  : item.type === "SMS / Text"
                                  ? "bg-yellow-500"
                                  : "bg-gray-500"
                              }`}
                            >
                              ●
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                {/* Header */}
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-center space-x-2">
                                    <span className="text-sm font-medium text-gray-700">
                                      {item.type}
                                    </span>
                                    {item.status === "ai_recommended" && (
                                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                                        AI Recommended
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-right">
                                    <div className="text-sm text-gray-500">
                                      {new Date(item.date).toLocaleDateString(
                                        "en-US",
                                        {
                                          month: "short",
                                          day: "numeric",
                                          year: "numeric",
                                        }
                                      )}
                                      ,{" "}
                                      {new Date(item.date).toLocaleTimeString(
                                        [],
                                        { hour: "2-digit", minute: "2-digit" }
                                      )}
                                    </div>
                                    <span
                                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                                        item.badge === "Scheduler"
                                          ? "bg-green-100 text-green-800"
                                          : item.badge === "Voice"
                                          ? "bg-blue-100 text-blue-800"
                                          : item.badge === "SMS"
                                          ? "bg-yellow-100 text-yellow-800"
                                          : "bg-gray-100 text-gray-800"
                                      }`}
                                    >
                                      {item.badge}
                                    </span>
                                  </div>
                                </div>

                                {/* Title */}
                                <h4 className="text-blue-600 font-medium mb-2">
                                  {item.title}
                                </h4>

                                {/* Description */}
                                <p className="text-sm text-gray-700 mb-3">
                                  {item.description}
                                </p>

                                {/* Additional Details */}
                                <div className="space-y-2 text-xs text-gray-600">
                                  {item.decider && (
                                    <div className="flex items-center">
                                      <span className="mr-2">⚡</span>
                                      <span>Decider: {item.decider}</span>
                                    </div>
                                  )}
                                  {item.intent && (
                                    <div className="flex items-center">
                                      <span className="mr-2">🎯</span>
                                      <span>Intent: {item.intent}</span>
                                    </div>
                                  )}
                                  {item.sentiment && (
                                    <div className="flex items-center">
                                      <span className="mr-2">📊</span>
                                      <span>Sentiment: {item.sentiment}</span>
                                    </div>
                                  )}
                                  {item.tonality && (
                                    <div className="flex items-center">
                                      <span className="mr-2">🗣️</span>
                                      <span>Tonality: {item.tonality}</span>
                                    </div>
                                  )}
                                  {item.focus && (
                                    <div className="flex items-center">
                                      <span className="mr-2">🎯</span>
                                      <span>Focus: {item.focus}</span>
                                    </div>
                                  )}
                                  {item.campaign && (
                                    <div className="flex items-center">
                                      <span className="mr-2">📋</span>
                                      <span>Campaign: {item.campaign}</span>
                                    </div>
                                  )}
                                  {item.segment && (
                                    <div className="flex items-center">
                                      <span className="mr-2">👥</span>
                                      <span>Segment: {item.segment}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {activeTab === "details" && (
                <div className="h-full overflow-y-auto px-6 py-6">
                  <div className="space-y-6">
                    {/* Personal Information */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Full Name
                          </label>
                          <div className="mt-1 text-sm text-gray-900">
                            {selectedAccount.name}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Account ID
                          </label>
                          <div className="mt-1 text-sm text-gray-900">
                            {selectedAccount.id}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Phone Number
                          </label>
                          <div className="mt-1 text-sm text-gray-900">
                            {selectedAccount.phone}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Email Address
                          </label>
                          <div className="mt-1 text-sm text-gray-900">
                            {selectedAccount.email}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Risk Score
                          </label>
                          <div className="mt-1 text-sm text-gray-900">
                            {selectedAccount.riskScore}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Last Contact
                          </label>
                          <div className="mt-1 text-sm text-gray-900">
                            {selectedAccount.lastContact}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Account Information */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Account Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Balance Due
                          </label>
                          <div className="mt-1 text-lg font-semibold text-red-600">
                            $
                            {selectedAccount.balance.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                            })}
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Days Past Due
                          </label>
                          <div className="mt-1">
                            <span
                              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDpdBadgeColor(
                                selectedAccount.dpd
                              )}`}
                            >
                              {selectedAccount.dpd} days
                            </span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Account Status
                          </label>
                          <div className="mt-1 text-sm text-gray-900">
                            Active
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Original Amount
                          </label>
                          <div className="mt-1 text-sm text-gray-900">
                            $
                            {(selectedAccount.balance * 1.15).toLocaleString(
                              "en-US",
                              { minimumFractionDigits: 2 }
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Communication Preferences */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Communication Preferences
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Preferred Contact Method
                          </label>
                          <div className="mt-1 text-sm text-gray-900">
                            Phone Call
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Best Time to Call
                          </label>
                          <div className="mt-1 text-sm text-gray-900">
                            Weekdays 10AM - 2PM
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Language Preference
                          </label>
                          <div className="mt-1 text-sm text-gray-900">
                            English
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">
                            Time Zone
                          </label>
                          <div className="mt-1 text-sm text-gray-900">
                            EST (UTC-5)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer Actions */}
            <div className="border-t border-gray-200 px-6 py-4">
              <div className="flex space-x-3">
                <button className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <PhoneIcon className="w-4 h-4 mr-2" />
                  Schedule Call
                </button>
                <button className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
                  <EnvelopeIcon className="w-4 h-4 mr-2" />
                  Send Email
                </button>
                <button className="flex-1 inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700">
                  💬 Send SMS
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccountData;
