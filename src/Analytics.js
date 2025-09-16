import React, { useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import PageHeaderWithTabs from "./components/PageHeaderWithTabs";
import {
  ChevronDownIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChartPieIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  DevicePhoneMobileIcon,
  UserGroupIcon,
  SignalIcon,
  ChatBubbleLeftRightIcon,
  HandThumbUpIcon,
  CheckBadgeIcon,
  BanknotesIcon,
  ClockIcon,
  SpeakerWaveIcon,
  ChatBubbleBottomCenterTextIcon,
  EyeIcon,
  CursorArrowRaysIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  AtSymbolIcon,
  InboxIcon,
  CursorArrowRippleIcon,
  MicrophoneIcon,
  DocumentTextIcon,
  EnvelopeOpenIcon,
  MagnifyingGlassIcon,
  LightBulbIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Cell,
  ComposedChart,
} from "recharts";

const productOptions = ["All Products", "Auto Loan", "Credit Card", "Mortgage"];
const dpdOptions = ["All DPD", "0-30", "31-60", "61-90", "91+"];
const segmentOptions = ["All Segments", "High Value", "Mid Risk", "Late Stage"];
const tabOptions = [
  "Collection Overview",
  "DPD Performance", 
  "Outbound Campaign",
  "Inbound Analysis",
  "User Experience",
  "Compliance",
  // "Engagement",
  // "Voice",
  // "SMS",
  // "Email",
  "Utilization",
];

// Dummy data

function FilterDropdown({ options, value, onChange }) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="w-40 bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 flex items-center justify-between">
          <span>{value}</span>
          <ChevronDownIcon className="w-4 h-4 text-zinc-400 ml-2" />
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border border-zinc-200 rounded-lg shadow-lg">
            {options.map((opt) => (
              <Listbox.Option
                key={opt}
                value={opt}
                className={({ active }) =>
                  `cursor-pointer select-none px-4 py-2 text-sm ${
                    active ? "bg-blue-50 text-blue-900" : "text-zinc-900"
                  }`
                }
              >
                {opt}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

function MetricCard({
  icon,
  label,
  value,
  sublabel,
  color = "bg-white text-zinc-900",
}) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-xl border border-zinc-200 shadow-sm p-5 min-w-[180px] ${color}`}
    >
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-200 text-zinc-700">
          {icon}
        </span>
        <span className="text-xs text-zinc-500 font-medium">{label}</span>
      </div>
      <div className="text-2xl font-bold text-zinc-900">{value}</div>
      {sublabel && <div className="text-xs text-zinc-400">{sublabel}</div>}
    </div>
  );
}

// Sample AI queries for suggestions
const sampleQueries = [
  "How many accounts were fully resolved (cured + paid off) this month?",
  "Which channels (AI voice, SMS, WhatsApp, agents) are generating the highest PTP fulfillment?",
  "Show me early warning signs of compliance risks and violations detected this week",
  "How many cease communication or do-not-call requests were flagged today?",
  "Which accounts have potential wrong party or third-party disclosure issues?",
  "How many debt validation requests have we received this month?",
  "What is our current Cure Rate, and how has it changed over the last 30 days?",
  "Identify any time-barred debt or statute of limitations mentions in conversations",
  "How has our contact rate improved compared to last quarter?",
  "Show me accounts with bankruptcy mentions or attorney representation claims",
  "Which communication channel generates the most collections?",
  "Detect any FDCPA violation claims or harassment complaints this week",
  "Show me potential identity theft or fraud claims requiring investigation",
  "Alert me to any active regulator mentions or CFPB complaints",
];

const exampleQuestions = [
  "What is our current Cure Rate, and how has it changed over the last 30 days?",
  "Show me early warning signs of compliance risks and violations detected this week",
  "Which DPD bucket has the highest conversion rate?",
  "How has our contact rate improved compared to last quarter?",
];

export default function Analytics() {
  const [product, setProduct] = useState(productOptions[0]);
  const [assistant, setAssistant] = useState("SupportBot");  const [dpd, setDpd] = useState(dpdOptions[0]);
  const [segment, setSegment] = useState(segmentOptions[0]);
  const [dateRange, setDateRange] = useState({
    from: "2024-01-01",
    to: "2024-06-30",
  });
  const [tab, setTab] = useState(tabOptions[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  
  // AI Search states
  const [showAiModal, setShowAiModal] = useState(false);
  const [aiQuery, setAiQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isTypingAnimation, setIsTypingAnimation] = useState(false);
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(null);
  const [recentSearches, setRecentSearches] = useState([
    "What is our current Cure Rate, and how has it changed over the last 30 days?",
    "What is the Roll Forward Rate by delinquency stage, and where are we losing accounts?",
    "What's our forecasted vs actual collections this month?",
    "Which customer segments are performing best and worst in terms of recovery?"
  ]);

  // Typing animation effect
  useEffect(() => {
    const question = exampleQuestions[currentExampleIndex];
    let currentIndex = 0;
    setCurrentPlaceholder("");
    
    const timer = setInterval(() => {
      if (currentIndex <= question.length) {
        setCurrentPlaceholder(question.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setCurrentExampleIndex((prev) => (prev + 1) % exampleQuestions.length);
        }, 2000);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [currentExampleIndex]);

  // AI Search handlers
  const handleAiSearch = () => {
    if (!aiQuery.trim()) return;
    
    setIsSearching(true);
    setShowSuggestions(false);
    
    // Add to recent searches if not already there
    if (!recentSearches.includes(aiQuery)) {
      setRecentSearches(prev => [aiQuery, ...prev.slice(0, 3)]);
    }
    
    // Simulate AI search with different responses based on query type
    setTimeout(() => {
      let response;
      
      // Check if the query is compliance-related
      if (aiQuery.toLowerCase().includes('compliance') || 
          aiQuery.toLowerCase().includes('violation') || 
          aiQuery.toLowerCase().includes('early warning') ||
          aiQuery.toLowerCase().includes('cease communication') ||
          aiQuery.toLowerCase().includes('do-not-call') ||
          aiQuery.toLowerCase().includes('fdcpa') ||
          aiQuery.toLowerCase().includes('bankruptcy') ||
          aiQuery.toLowerCase().includes('debt validation')) {
        
        response = {
          query: aiQuery,
          answer: "Early Warning Dashboard detected 20 compliance risk indicators this week across all communication channels. All flagged conversations have been automatically escalated to legal compliance team for immediate review and action.",
          complianceCards: [
            {
              name: "Robert Johnson",
              avatar: "RJ",
              time: "00:41:10",
              type: "Cease Communication",
              description: "'Stop calling me', 'Remove my number', Do-Not-Call Request, Opt-out Violation, TCPA Risk",
              severity: "high",
              color: "bg-red-500",
              callId: "CALL-2024-001789",
              recordingUrl: "#"
            },
            {
              name: "Maria Gonzalez",
              avatar: "MG",
              time: "00:35:22",
              type: "Wrong Party Contact",
              description: "'You have the wrong number', Third-party Disclosure, 'This isn't [name]', Privacy Violation",
              severity: "high",
              color: "bg-red-500",
              callId: "CALL-2024-001823",
              recordingUrl: "#"
            },
            {
              name: "David Chen",
              avatar: "DC",
              time: "00:28:45",
              type: "Debt Validation",
              description: "'Send validation', 'Prove I owe this', Original Creditor Request, FDCPA Section 809",
              severity: "high",
              color: "bg-red-500",
              callId: "CALL-2024-001756",
              recordingUrl: "#"
            },
            {
              name: "Jennifer Williams",
              avatar: "JW",
              time: "00:52:18",
              type: "FDCPA Violation",
              description: "'You're harassing me', Excessive Calling, Threatening Language, Unfair Practice",
              severity: "high",
              color: "bg-red-500",
              callId: "CALL-2024-001902",
              recordingUrl: "#"
            },
            {
              name: "Michael Brown",
              avatar: "MB",
              time: "00:19:33",
              type: "Time-Barred Debt",
              description: "'This is too old', Statute of Limitations, 'Last payment was 2018', SOL Defense",
              severity: "high",
              color: "bg-red-500",
              callId: "CALL-2024-001634",
              recordingUrl: "#"
            },
            {
              name: "Sarah Davis",
              avatar: "SD",
              time: "00:44:07",
              type: "Bankruptcy Filed",
              description: "'I filed Chapter 7', Automatic Stay, 'Talk to my trustee', Bankruptcy Protection",
              severity: "medium",
              color: "bg-yellow-500",
              callId: "CALL-2024-001845",
              recordingUrl: "#"
            },
            {
              name: "James Wilson",
              avatar: "JW",
              time: "00:31:55",
              type: "Attorney Representation",
              description: "'Speak to my lawyer', Power of Attorney, Legal Representation, Cease & Desist",
              severity: "medium",
              color: "bg-yellow-500",
              callId: "CALL-2024-001734",
              recordingUrl: "#"
            },
            {
              name: "Lisa Anderson",
              avatar: "LA",
              time: "00:26:12",
              type: "Recording Consent",
              description: "'I don't consent to recording', Two-party Consent State, Privacy Rights Violation",
              severity: "medium",
              color: "bg-yellow-500",
              callId: "CALL-2024-001678",
              recordingUrl: "#"
            },
            {
              name: "Kevin Taylor",
              avatar: "KT",
              time: "00:38:41",
              type: "Identity Theft",
              description: "'Not my account', 'Someone opened this', FTC Report Filed, Fraud Claim",
              severity: "low",
              color: "bg-green-500",
              callId: "CALL-2024-001812",
              recordingUrl: "#"
            },
            {
              name: "Amanda Martinez",
              avatar: "AM",
              time: "00:15:29",
              type: "CFPB Complaint",
              description: "'I filed CFPB complaint', Regulator Mention, 'Going to the news', Media Threat",
              severity: "low",
              color: "bg-green-500",
              callId: "CALL-2024-001567",
              recordingUrl: "#"
            },
            {
              name: "Thomas Lee",
              avatar: "TL",
              time: "00:47:16",
              type: "Deceased Consumer",
              description: "'Account holder passed away', Estate/Probate, Death Certificate Required",
              severity: "low",
              color: "bg-green-500",
              callId: "CALL-2024-001889",
              recordingUrl: "#"
            }
          ],
        };
      } else {
        // Default response for other queries
        response = {
          query: aiQuery,
          answer: "Based on your data from the last 30 days, your current Cure Rate is 14.8%, which represents a +2.3% increase compared to the previous period. This improvement indicates enhanced collection effectiveness.",
          metrics: [
            { label: "Current Cure Rate", value: "14.8%", trend: "+2.3%" },
            { label: "Previous Period", value: "12.5%", trend: "" },
            { label: "Accounts Cured", value: "6,689", trend: "+185" },
          ],
        };
      }
      
      setSearchResults(response);
      setIsSearching(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion) => {
    setAiQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleViewCall = (card) => {
    // In a real app, this would navigate to a call detail page or open a call player modal
    const callDetails = {
      callId: card.callId,
      customerName: card.name,
      complianceType: card.type,
      duration: card.time,
      riskLevel: card.severity,
      transcript: `Customer: ${card.description.split(',')[0]}\nAgent: I understand your concern...\nCustomer: ${card.description.split(',')[1] || 'Additional compliance issue mentioned'}`,
      timestamp: new Date().toLocaleString(),
      recordingUrl: `/recordings/${card.callId}.mp3`
    };
    
    // For demo purposes, show detailed call information
    alert(`📞 Call Recording Details\n\n` +
          `Call ID: ${callDetails.callId}\n` +
          `Customer: ${callDetails.customerName}\n` +
          `Compliance Risk: ${callDetails.complianceType}\n` +
          `Duration: ${callDetails.duration}\n` +
          `Risk Level: ${callDetails.riskLevel.toUpperCase()}\n` +
          `Timestamp: ${callDetails.timestamp}\n\n` +
          `🎵 Recording URL: ${callDetails.recordingUrl}\n\n` +
          `📝 Transcript Preview:\n${callDetails.transcript}\n\n` +
          `⚠️  This call has been flagged for legal review.`);
  };

  const filteredSuggestions = sampleQueries.filter(query =>
    query.toLowerCase().includes(aiQuery.toLowerCase())
  );

  const filters = [
    {
      key: "assistant",
      value: assistant,
      onClick: () => {
        const assistantOptions = ["SupportBot", "SalesAI", "FeedbackBot", "SurveyGenie", "ReminderBot"];
        const currentIndex = assistantOptions.indexOf(assistant);
        const nextIndex = (currentIndex + 1) % assistantOptions.length;
        setAssistant(assistantOptions[nextIndex]);
      },
    },
    {
      key: "product",
      value: product,
      onClick: () => {
        const currentIndex = productOptions.indexOf(product);
        const nextIndex = (currentIndex + 1) % productOptions.length;
        setProduct(productOptions[nextIndex]);
      },
    },
    {
      key: "dpd",
      value: dpd,
      onClick: () => {
        const currentIndex = dpdOptions.indexOf(dpd);
        const nextIndex = (currentIndex + 1) % dpdOptions.length;
        setDpd(dpdOptions[nextIndex]);
      },
    },
    {
      key: "segment",
      value: segment,
      onClick: () => {
        const currentIndex = segmentOptions.indexOf(segment);
        const nextIndex = (currentIndex + 1) % segmentOptions.length;
        setSegment(segmentOptions[nextIndex]);
      },
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <PageHeaderWithTabs
        title="Analytics"
        description="View and analyze your performance metrics and data here."
        breadcrumbs={["Home", "Analytics"]}
        tabs={[]}
        filters={filters}
        showSearch={false}
        createButtonText="AI Analytics"
        createButtonIcon={SparklesIcon}
        onCreateClick={() => setShowAiModal(true)}
      />



      {/* Tab Navigation */}
      <div className="sticky top-[72px] z-10 bg-white px-6  flex gap-0 py-0">
        {tabOptions.map((t) => (
          <button
            key={t}
            className={`px-5 py-3 -mb-px border-b-2 font-semibold text-sm transition-colors
              ${
                tab === t
                  ? "border-blue-600 text-blue-700 bg-white"
                  : "border-transparent text-zinc-500 bg-white hover:text-blue-700 hover:border-blue-200"
              }
            `}
            style={{ borderRadius: 0 }}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Filters Header Section */}
      {tab === "Collection Overview" && (
        <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h4 className="text-sm font-semibold text-gray-900">Advance Filters</h4>
              <span className="text-xs text-gray-500">Default selected period to last 7 days</span>
            </div>
            <button 
              onClick={() => setShowMoreFilters(!showMoreFilters)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              {showMoreFilters ? "Hide filters" : "Show filters"}
            </button>
          </div>

          {/* All Filters - Collapsible */}
          {showMoreFilters && (
            <div className="mt-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Months</label>
                  <FilterDropdown options={["Last 7 days", "Last 30 days", "Last 90 days", "Custom"]} value="Last 7 days" onChange={() => {}} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">DPD buckets</label>
                  <FilterDropdown options={["All DPD", "0-30", "31-60", "61-90", "91+"]} value="All DPD" onChange={() => {}} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Customer Income segment</label>
                  <FilterDropdown options={["All Segments", "High Income", "Mid Income", "Low Income"]} value="All Segments" onChange={() => {}} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Communication channel</label>
                  <FilterDropdown options={["All Channels", "Phone", "SMS", "Email", "WhatsApp"]} value="All Channels" onChange={() => {}} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Total Loan amount buckets</label>
                  <FilterDropdown options={["All Amounts", "$0-5K", "$5K-15K", "$15K-30K", "$30K+"]} value="All Amounts" onChange={() => {}} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Customer credit score bucket</label>
                  <FilterDropdown options={["All Scores", "Excellent", "Good", "Fair", "Poor"]} value="All Scores" onChange={() => {}} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Number of Prior missed payments</label>
                  <FilterDropdown options={["All", "0", "1-2", "3-5", "6+"]} value="All" onChange={() => {}} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Geography</label>
                  <FilterDropdown options={["All Regions", "North", "South", "East", "West"]} value="All Regions" onChange={() => {}} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Pending Due Buckets</label>
                  <FilterDropdown options={["All Buckets", "$0-100", "$100-500", "$500-1K", "$1K+"]} value="All Buckets" onChange={() => {}} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Customer lifetime (months)</label>
                  <FilterDropdown options={["All", "0-6", "6-12", "12-24", "24+"]} value="All" onChange={() => {}} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Loan lengths</label>
                  <FilterDropdown options={["All Terms", "12 months", "24 months", "36 months", "48+ months"]} value="All Terms" onChange={() => {}} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Car Value</label>
                  <FilterDropdown options={["All Values", "$0-15K", "$15K-30K", "$30K-50K", "$50K+"]} value="All Values" onChange={() => {}} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Customer Income</label>
                  <FilterDropdown options={["All Income", "$0-40K", "$40K-70K", "$70K-100K", "$100K+"]} value="All Income" onChange={() => {}} />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <button className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800">Apply Filters</button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-50">Reset</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab Content */}
      <div className="max-w-8xl mx-auto p-8">
        {tab === "Collection Overview" && (
          <>
            <div className="text-2xl font-bold text-zinc-900 mb-4">
              Collection Overview
            </div>
            
            {/* KPI Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <MetricCard
                icon={<CurrencyDollarIcon className="w-5 h-5" />}
                label="Total Collections"
                value="$2,847,392"
                sublabel="↗ +12.5% vs last period"
              />
              <MetricCard
                icon={<CheckCircleIcon className="w-5 h-5" />}
                label="Cure Rate"
                value="14.8%"
                sublabel="↗ +2.3% vs last period"
              />
              <MetricCard
                icon={<PhoneIcon className="w-5 h-5" />}
                label="Contact Rate"
                value="68.2%"
                sublabel="↗ +5.1% vs last period"
              />
              <MetricCard
                icon={<UserGroupIcon className="w-5 h-5" />}
                label="Accounts Contacted"
                value="45,267"
                sublabel="↗ +8.7% vs last period"
              />
            </div>

            {/* Second Row KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <MetricCard
                icon={<ArrowTrendingUpIcon className="w-5 h-5" />}
                label="Collection Rate"
                value="18.3%"
                sublabel="↗ +4.2% vs last period"
              />
              <MetricCard
                icon={<HandThumbUpIcon className="w-5 h-5" />}
                label="PTP Rate"
                value="24.6%"
                sublabel="↗ +1.8% vs last period"
              />
              <MetricCard
                icon={<ClockIcon className="w-5 h-5" />}
                label="Avg Handle Time"
                value="3:42"
                sublabel="↓ -8s vs last period"
              />
              <MetricCard
                icon={<ChartBarIcon className="w-5 h-5" />}
                label="Portfolio Penetration"
                value="89.4%"
                sublabel="↗ +2.1% vs last period"
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Daily Collections Trend */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Daily Collections Trend
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Amount collected (bar) · Cost per Dollar collected (line)
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <ComposedChart
                    data={[
                      { day: "Mon", amount: 185000, cost: 0.12 },
                      { day: "Tue", amount: 220000, cost: 0.11 },
                      { day: "Wed", amount: 195000, cost: 0.13 },
                      { day: "Thu", amount: 250000, cost: 0.10 },
                      { day: "Fri", amount: 285000, cost: 0.09 },
                      { day: "Sat", amount: 165000, cost: 0.14 },
                      { day: "Sun", amount: 145000, cost: 0.15 },
                    ]}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `$${v.toFixed(2)}`} />
                    <Tooltip 
                      formatter={(v, name) => 
                        name === "amount" ? `$${v.toLocaleString()}` : `$${v.toFixed(2)}`
                      } 
                    />
                    <Bar yAxisId="left" dataKey="amount" fill="#2563eb" name="Amount Collected" />
                    <Line yAxisId="right" type="monotone" dataKey="cost" stroke="#ef4444" strokeWidth={2} name="Cost per $" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* Monthly Collections Trend ($) */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Monthly Collections Trend ($)
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Amount ($) - Bars · Cure Rate - Line
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <ComposedChart
                    data={[
                      { month: "Jan", amount: 2800000, cureRate: 12.5 },
                      { month: "Feb", amount: 3200000, cureRate: 13.2 },
                      { month: "Mar", amount: 2950000, cureRate: 11.8 },
                      { month: "Apr", amount: 3400000, cureRate: 14.1 },
                      { month: "May", amount: 3650000, cureRate: 15.2 },
                      { month: "Jun", amount: 3100000, cureRate: 13.8 },
                    ]}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                    <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${v}%`} />
                    <Tooltip 
                      formatter={(v, name) => 
                        name === "amount" ? `$${(v / 1000000).toFixed(2)}M` : `${v}%`
                      } 
                    />
                    <Bar yAxisId="left" dataKey="amount" fill="#22c55e" name="Collections" />
                    <Line yAxisId="right" type="monotone" dataKey="cureRate" stroke="#f59e0b" strokeWidth={2} name="Cure Rate" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* Transfer rate (last 7days) */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Transfer rate (last 7days)
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Agent Transfers (%) · Avg. Time to agent transfer
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <ComposedChart
                    data={[
                      { day: "Mon", transferRate: 8.5, avgTime: 142 },
                      { day: "Tue", transferRate: 12.2, avgTime: 156 },
                      { day: "Wed", transferRate: 15.8, avgTime: 168 },
                      { day: "Thu", transferRate: 18.4, avgTime: 145 },
                      { day: "Fri", transferRate: 22.1, avgTime: 139 },
                      { day: "Sat", transferRate: 16.7, avgTime: 162 },
                      { day: "Sun", transferRate: 11.3, avgTime: 171 },
                    ]}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" tickFormatter={(v) => `${v}%`} />
                    <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${v}s`} />
                    <Tooltip 
                      formatter={(v, name) => 
                        name === "transferRate" ? `${v}%` : `${v}s`
                      } 
                    />
                    <Bar yAxisId="left" dataKey="transferRate" fill="#8b5cf6" name="Transfer Rate" />
                    <Line yAxisId="right" type="monotone" dataKey="avgTime" stroke="#ec4899" strokeWidth={2} name="Avg Time" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Second Charts Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Conversion Funnel */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Conversion Funnel
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Calls Connected → RPC → Due communicated → Promise to Pay → Cured
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Calls Connected</span>
                    <span className="font-medium">45,267</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "100%" }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>RPC</span>
                    <span className="font-medium">30,882</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "68%" }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Due communicated</span>
                    <span className="font-medium">22,634</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{ width: "50%" }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Promise to Pay</span>
                    <span className="font-medium">11,136</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-300 h-2 rounded-full" style={{ width: "25%" }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span>Cured</span>
                    <span className="font-medium">6,689</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-200 h-2 rounded-full" style={{ width: "15%" }}></div>
                  </div>
                </div>
              </div>

              {/* Conversion trend */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Conversion trend
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Paid - Promise to pay - RPC
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart
                    data={[
                      { day: "Mon", paid: 12.5, ptp: 18.2, rpc: 65.4 },
                      { day: "Tue", paid: 14.8, ptp: 22.1, rpc: 68.7 },
                      { day: "Wed", paid: 13.2, ptp: 19.5, rpc: 66.2 },
                      { day: "Thu", paid: 16.1, ptp: 24.3, rpc: 71.2 },
                      { day: "Fri", paid: 15.4, ptp: 23.8, rpc: 69.8 },
                      { day: "Sat", paid: 11.7, ptp: 17.2, rpc: 62.3 },
                      { day: "Sun", paid: 10.8, ptp: 15.9, rpc: 58.7 },
                    ]}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis tickFormatter={(v) => `${v}%`} />
                    <Tooltip formatter={(v) => `${v}%`} />
                    <Legend />
                    <Line type="monotone" dataKey="paid" stroke="#22c55e" strokeWidth={2} name="Paid" />
                    <Line type="monotone" dataKey="ptp" stroke="#f59e0b" strokeWidth={2} name="Promise to pay" />
                    <Line type="monotone" dataKey="rpc" stroke="#2563eb" strokeWidth={2} name="RPC" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Collections per $ Spent */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Collections per $ Spent
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  $ collected per $ spent
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart
                    data={[
                      { day: "Mon", ratio: 4.2 },
                      { day: "Tue", ratio: 5.1 },
                      { day: "Wed", ratio: 3.8 },
                      { day: "Thu", ratio: 5.7 },
                      { day: "Fri", ratio: 6.2 },
                      { day: "Sat", ratio: 3.5 },
                      { day: "Sun", ratio: 2.9 },
                    ]}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis tickFormatter={(v) => `$${v}`} />
                    <Tooltip formatter={(v) => `$${v}`} />
                    <Bar dataKey="ratio" fill="#10b981" name="Collections per $ Spent" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Third Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Cured trend */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Cured trend
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Portfolio connected ($) Bar · Share of connected Portfolio cured (%) - (Line) · Selected period (Daily)
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <ComposedChart
                    data={[
                      { day: "Mon", portfolio: 4200000, curedRate: 12.5 },
                      { day: "Tue", portfolio: 4800000, curedRate: 13.2 },
                      { day: "Wed", portfolio: 4350000, curedRate: 11.8 },
                      { day: "Thu", portfolio: 5100000, curedRate: 14.1 },
                      { day: "Fri", portfolio: 5400000, curedRate: 15.2 },
                      { day: "Sat", portfolio: 3900000, curedRate: 13.8 },
                      { day: "Sun", portfolio: 3600000, curedRate: 16.1 },
                    ]}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" tickFormatter={(v) => `$${(v / 1000000).toFixed(1)}M`} />
                    <YAxis yAxisId="right" orientation="right" tickFormatter={(v) => `${v}%`} />
                    <Tooltip 
                      formatter={(v, name) => 
                        name === "portfolio" ? `$${(v / 1000000).toFixed(2)}M` : `${v}%`
                      } 
                    />
                    <Bar yAxisId="left" dataKey="portfolio" fill="#6366f1" name="Portfolio Connected" />
                    <Line yAxisId="right" type="monotone" dataKey="curedRate" stroke="#22c55e" strokeWidth={2} name="Cured Rate" />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>

              {/* AHT by Outcome */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  AHT by Outcome
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Average Handle Time by call outcome
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart
                    data={[
                      { outcome: "Pre-RPC", time: 45 },
                      { outcome: "RPC", time: 142 },
                      { outcome: "Due Comm", time: 186 },
                      { outcome: "PTP", time: 234 },
                      { outcome: "Cured", time: 278 },
                      { outcome: "Others", time: 89 },
                    ]}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="outcome" />
                    <YAxis tickFormatter={(v) => `${v}s`} />
                    <Tooltip formatter={(v) => `${v} seconds`} />
                    <Bar dataKey="time" fill="#f59e0b" name="Avg Handle Time" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}
        {tab === "DPD Performance" && (
          <>
            <div className="text-2xl font-bold text-zinc-900 mb-4">
              DPD Performance
            </div>
            
            {/* Top Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Collections heat map */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Collections heat map
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Cured% by DPD bucket
                </div>
                <div className="flex items-center justify-center h-[220px] text-zinc-400 bg-zinc-50 rounded-lg border border-dashed border-zinc-200">
                  <div className="text-center">
                    <div className="text-sm font-medium">DPD Heat Map</div>
                    <div className="text-xs mt-1">Visual representation of cure rates across DPD buckets</div>
                  </div>
                </div>
              </div>

              {/* Top 3 Factors impacting Collection Success */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Top 3 Factors impacting Collection Success by DPD bucket
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Table · DPD bucket - Period selected
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-4 gap-2 text-xs font-medium text-zinc-700 border-b pb-2">
                    <span>Factor</span>
                    <span>0-30 DPD</span>
                    <span>31-60 DPD</span>
                    <span>61+ DPD</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <span className="font-medium">Contact Rate</span>
                    <span className="text-green-600">85%</span>
                    <span className="text-yellow-600">72%</span>
                    <span className="text-red-600">58%</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <span className="font-medium">Response Rate</span>
                    <span className="text-green-600">68%</span>
                    <span className="text-yellow-600">52%</span>
                    <span className="text-red-600">35%</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-sm">
                    <span className="font-medium">PTP Conversion</span>
                    <span className="text-green-600">45%</span>
                    <span className="text-yellow-600">32%</span>
                    <span className="text-red-600">18%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Collections by DPD Bucket - Stacked column */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Collections by DPD Bucket
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Stacked column chart · DPD portfolio · DPD collected · Period selected
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={[
                      { period: "Week 1", "0-30": 180000, "31-60": 120000, "61-90": 80000, "90+": 45000 },
                      { period: "Week 2", "0-30": 195000, "31-60": 135000, "61-90": 75000, "90+": 42000 },
                      { period: "Week 3", "0-30": 210000, "31-60": 128000, "61-90": 85000, "90+": 48000 },
                      { period: "Week 4", "0-30": 225000, "31-60": 142000, "61-90": 78000, "90+": 38000 },
                      { period: "Week 5", "0-30": 240000, "31-60": 155000, "61-90": 92000, "90+": 52000 },
                    ]}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="0-30" stackId="a" fill="#22c55e" name="0-30 DPD" />
                    <Bar dataKey="31-60" stackId="a" fill="#f59e42" name="31-60 DPD" />
                    <Bar dataKey="61-90" stackId="a" fill="#ef4444" name="61-90 DPD" />
                    <Bar dataKey="90+" stackId="a" fill="#991b1b" name="90+ DPD" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Cure-rate by DPD Bucket */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Cure-rate by DPD Bucket
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Line chart · Period selected
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart
                    data={[
                      { week: "Week 1", "0-30": 18.5, "31-60": 12.8, "61-90": 8.2, "90+": 4.5 },
                      { week: "Week 2", "0-30": 19.2, "31-60": 13.1, "61-90": 8.8, "90+": 4.2 },
                      { week: "Week 3", "0-30": 18.8, "31-60": 12.5, "61-90": 8.5, "90+": 4.8 },
                      { week: "Week 4", "0-30": 20.1, "31-60": 14.2, "61-90": 9.1, "90+": 3.8 },
                      { week: "Week 5", "0-30": 21.3, "31-60": 15.4, "61-90": 10.2, "90+": 5.1 },
                    ]}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis tickFormatter={(v) => v + "%"} />
                    <Tooltip formatter={(v) => v + "%"} />
                    <Legend />
                    <Line type="monotone" dataKey="0-30" stroke="#22c55e" strokeWidth={2} name="0-30 DPD" />
                    <Line type="monotone" dataKey="31-60" stroke="#f59e42" strokeWidth={2} name="31-60 DPD" />
                    <Line type="monotone" dataKey="61-90" stroke="#ef4444" strokeWidth={2} name="61-90 DPD" />
                    <Line type="monotone" dataKey="90+" stroke="#991b1b" strokeWidth={2} name="90+ DPD" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Row 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Collections by DPD Bucket - Grouped column */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Collections by DPD Bucket
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Grouped column chart · Weeks (13 by default)
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={[
                      { week: "W1", "0-30": 185000, "31-60": 125000, "61-90": 82000, "90+": 47000 },
                      { week: "W2", "0-30": 192000, "31-60": 132000, "61-90": 78000, "90+": 44000 },
                      { week: "W3", "0-30": 203000, "31-60": 128000, "61-90": 85000, "90+": 49000 },
                      { week: "W4", "0-30": 218000, "31-60": 145000, "61-90": 79000, "90+": 41000 },
                      { week: "W5", "0-30": 235000, "31-60": 152000, "61-90": 88000, "90+": 53000 },
                    ]}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="0-30" fill="#22c55e" name="0-30 DPD" />
                    <Bar dataKey="31-60" fill="#f59e42" name="31-60 DPD" />
                    <Bar dataKey="61-90" fill="#ef4444" name="61-90 DPD" />
                    <Bar dataKey="90+" fill="#991b1b" name="90+ DPD" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Collections by Channel by DPD buckets */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Collections by Channel by DPD buckets
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Grouped column chart · DPD Bucket - period selected
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={[
                      { channel: "Voice", "0-30": 85000, "31-60": 65000, "61-90": 45000, "90+": 25000 },
                      { channel: "SMS", "0-30": 45000, "31-60": 35000, "61-90": 20000, "90+": 8000 },
                      { channel: "Email", "0-30": 35000, "31-60": 22000, "61-90": 12000, "90+": 5000 },
                      { channel: "WhatsApp", "0-30": 25000, "31-60": 18000, "61-90": 8000, "90+": 2000 },
                    ]}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="channel" />
                    <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="0-30" fill="#22c55e" name="0-30 DPD" />
                    <Bar dataKey="31-60" fill="#f59e42" name="31-60 DPD" />
                    <Bar dataKey="61-90" fill="#ef4444" name="61-90 DPD" />
                    <Bar dataKey="90+" fill="#991b1b" name="90+ DPD" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Row 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Collections by Channel */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Collections by Channel
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Stacked column chart · Weeks (13 by default)
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart
                    data={[
                      { week: "W1", Voice: 220000, SMS: 108000, Email: 74000, WhatsApp: 53000 },
                      { week: "W2", Voice: 235000, SMS: 115000, Email: 82000, WhatsApp: 58000 },
                      { week: "W3", Voice: 248000, SMS: 122000, Email: 89000, WhatsApp: 61000 },
                      { week: "W4", Voice: 265000, SMS: 135000, Email: 95000, WhatsApp: 68000 },
                      { week: "W5", Voice: 285000, SMS: 142000, Email: 102000, WhatsApp: 73000 },
                    ]}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="Voice" stackId="a" fill="#2563eb" name="Voice" />
                    <Bar dataKey="SMS" stackId="a" fill="#22c55e" name="SMS" />
                    <Bar dataKey="Email" stackId="a" fill="#f59e42" name="Email" />
                    <Bar dataKey="WhatsApp" stackId="a" fill="#8b5cf6" name="WhatsApp" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Collections per $ spent by DPD Buckets */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Collections per $ spent by DPD Buckets
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Line chart · Weeks (13 by default)
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart
                    data={[
                      { week: "W1", "0-30": 4.2, "31-60": 3.8, "61-90": 2.9, "90+": 1.8 },
                      { week: "W2", "0-30": 4.5, "31-60": 4.1, "61-90": 3.2, "90+": 2.1 },
                      { week: "W3", "0-30": 4.3, "31-60": 3.9, "61-90": 3.0, "90+": 1.9 },
                      { week: "W4", "0-30": 4.8, "31-60": 4.4, "61-90": 3.5, "90+": 2.3 },
                      { week: "W5", "0-30": 5.1, "31-60": 4.7, "61-90": 3.8, "90+": 2.5 },
                    ]}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis tickFormatter={(v) => `$${v.toFixed(1)}`} />
                    <Tooltip formatter={(v) => `$${v.toFixed(2)}`} />
                    <Legend />
                    <Line type="monotone" dataKey="0-30" stroke="#22c55e" strokeWidth={2} name="0-30 DPD" />
                    <Line type="monotone" dataKey="31-60" stroke="#f59e42" strokeWidth={2} name="31-60 DPD" />
                    <Line type="monotone" dataKey="61-90" stroke="#ef4444" strokeWidth={2} name="61-90 DPD" />
                    <Line type="monotone" dataKey="90+" stroke="#991b1b" strokeWidth={2} name="90+ DPD" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Row 5 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Collections per $ spent by channel */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Collections per $ spent by channel
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Line chart · Channels (SMS, Email, Outbound call, inbound call) · Weeks (13 by default)
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart
                    data={[
                      { week: "W1", SMS: 13.5, Email: 20.0, "Outbound": 8.3, "Inbound": 11.2 },
                      { week: "W2", SMS: 13.8, Email: 21.5, "Outbound": 8.7, "Inbound": 11.8 },
                      { week: "W3", SMS: 14.2, Email: 19.8, "Outbound": 8.9, "Inbound": 12.1 },
                      { week: "W4", SMS: 14.5, Email: 22.3, "Outbound": 9.2, "Inbound": 12.5 },
                      { week: "W5", SMS: 15.1, Email: 23.1, "Outbound": 9.8, "Inbound": 13.2 },
                    ]}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis tickFormatter={(v) => `$${v.toFixed(1)}`} />
                    <Tooltip formatter={(v) => `$${v.toFixed(2)}`} />
                    <Legend />
                    <Line type="monotone" dataKey="SMS" stroke="#22c55e" strokeWidth={2} name="SMS" />
                    <Line type="monotone" dataKey="Email" stroke="#f59e42" strokeWidth={2} name="Email" />
                    <Line type="monotone" dataKey="Outbound" stroke="#2563eb" strokeWidth={2} name="Outbound call" />
                    <Line type="monotone" dataKey="Inbound" stroke="#8b5cf6" strokeWidth={2} name="Inbound call" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Spend by Channel */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Spend by Channel
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Line chart · Channels (SMS, Email, Outbound call, inbound call) · Weeks (13 by default)
                </div>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart
                    data={[
                      { week: "W1", SMS: 8000, Email: 3700, "Outbound": 26500, "Inbound": 9400 },
                      { week: "W2", SMS: 8300, Email: 3800, "Outbound": 27000, "Inbound": 9800 },
                      { week: "W3", SMS: 8600, Email: 4500, "Outbound": 27800, "Inbound": 10100 },
                      { week: "W4", SMS: 9300, Email: 4300, "Outbound": 28800, "Inbound": 10900 },
                      { week: "W5", SMS: 9400, Email: 4400, "Outbound": 29100, "Inbound": 11200 },
                    ]}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                    <Legend />
                    <Line type="monotone" dataKey="SMS" stroke="#22c55e" strokeWidth={2} name="SMS" />
                    <Line type="monotone" dataKey="Email" stroke="#f59e42" strokeWidth={2} name="Email" />
                    <Line type="monotone" dataKey="Outbound" stroke="#2563eb" strokeWidth={2} name="Outbound call" />
                    <Line type="monotone" dataKey="Inbound" stroke="#8b5cf6" strokeWidth={2} name="Inbound call" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {tab === "Outbound Campaign" && (
          <>
            <div className="text-2xl font-bold text-zinc-900 mb-6">
              Outbound Campaign analysis
            </div>

            {/* Campaign Selection */}
            <div className="mb-6">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-zinc-700">Select Campaigns</label>
                <div className="flex-1 max-w-md">
                  <select className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Campaigns</option>
                    <option>Q4 Collections Drive</option>
                    <option>Early Stage Outreach</option>
                    <option>Late Stage Recovery</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Top KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
              <MetricCard
                icon={<CurrencyDollarIcon className="w-5 h-5" />}
                label="Total Campaign Portfolio ($)"
                value="$2.4M"
                sublabel="trend & number"
              />
              <MetricCard
                icon={<UserGroupIcon className="w-5 h-5" />}
                label="No. of Delinquent accounts"
                value="15,240"
                sublabel="trend & number"
              />
              <MetricCard
                icon={<PhoneIcon className="w-5 h-5" />}
                label="Calls connected"
                value="68.5%"
                sublabel="no of accounts (%)"
              />
              <MetricCard
                icon={<ChatBubbleLeftRightIcon className="w-5 h-5" />}
                label="Messages sent"
                value="12,450"
                sublabel="no of accounts (%)"
              />
              <MetricCard
                icon={<ClockIcon className="w-5 h-5" />}
                label="Average Handle time"
                value="178s"
                sublabel=""
              />
              <MetricCard
                icon={<ExclamationTriangleIcon className="w-5 h-5" />}
                label="Call Abandonment Rate"
                value="7.2%"
                sublabel=""
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Collections by campaign */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Collections by campaign($)
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  % connected, % Cured
                </div>
                <div className="text-center text-zinc-400 py-8">
                  <ChartBarIcon className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-sm">Bar and line chart</div>
                  <div className="text-xs mt-2">Campaign</div>
                </div>
              </div>

              {/* Conversion across Campaign Funnel chart */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Conversion across Campaign Funnel chart
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Calls Connected → RPC → Due communicated → Promise to Pay → Cured
                </div>
                <div className="text-center text-zinc-400 py-8">
                  <ChartPieIcon className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-sm">Funnel chart</div>
                  <div className="text-xs mt-2">All selected campaigns Campaign</div>
                </div>
              </div>

              {/* Campaign Spend */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Campaign Spend ($)
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Collection per $ spent
                </div>
                <div className="text-center text-zinc-400 py-8">
                  <ChartBarIcon className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-sm">Bar chart</div>
                  <div className="text-xs mt-2">Campaign</div>
                </div>
              </div>

              {/* Convertion by Campaign */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Convertion by Campaign
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Grouped column
                </div>
                <div className="text-center text-zinc-400 py-8">
                  <ChartBarIcon className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-sm">RPC, Promise to pay, Cured (%)</div>
                  <div className="text-xs mt-2">Campaign</div>
                </div>
              </div>

              {/* Campaign Engagement */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Campaign Engagement
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  share of calls by duration bucket
                </div>
                <div className="text-center text-zinc-400 py-8">
                  <ChartBarIcon className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-sm">Stacked column chart</div>
                  <div className="text-xs mt-2">Campaign</div>
                </div>
              </div>

              {/* Collections by Channel by campaign */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Collections by Channel by campaign
                </div>
                <div className="text-xs text-zinc-500 mb-4"></div>
                <div className="text-center text-zinc-400 py-8">
                  <ChartBarIcon className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-sm">Stacked column chart</div>
                  <div className="text-xs mt-2">Campaign</div>
                </div>
              </div>
            </div>
          </>
        )}
        {tab === "Inbound Analysis" && (
          <>
            <div className="text-2xl font-bold text-zinc-900 mb-6">
              Inbound analysis
            </div>

            {/* Days Selection */}
            <div className="mb-6">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-zinc-700">Select Days</label>
                <div className="flex-1 max-w-md">
                  <select className="w-full px-3 py-2 border border-zinc-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last 90 Days</option>
                    <option>Custom Range</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Top KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
              <MetricCard
                icon={<CurrencyDollarIcon className="w-5 h-5" />}
                label="Total Portfolio ($) of inbound calls"
                value="$3.2M"
                sublabel="trend & number"
              />
              <MetricCard
                icon={<UserGroupIcon className="w-5 h-5" />}
                label="No. of Delinquent accounts"
                value="18,450"
                sublabel="trend & number"
              />
              <MetricCard
                icon={<PhoneIcon className="w-5 h-5" />}
                label="Calls handled"
                value="85.2%"
                sublabel="no of accounts (%)"
              />
              <MetricCard
                icon={<CheckCircleIcon className="w-5 h-5" />}
                label="Cure Rate"
                value="12.8%"
                sublabel="no of accounts (%)"
              />
              <MetricCard
                icon={<ClockIcon className="w-5 h-5" />}
                label="Average Handle time"
                value="245s"
                sublabel=""
              />
              <MetricCard
                icon={<ExclamationTriangleIcon className="w-5 h-5" />}
                label="Call Abandonment Rate"
                value="4.3%"
                sublabel=""
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Daily Collections */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Daily Collections ($)
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  % PTP,% Cured
                </div>
                <div className="text-center text-zinc-400 py-8">
                  <ChartBarIcon className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-sm">Bar chart</div>
                  <div className="text-xs mt-2">Selected period (daily)</div>
                </div>
              </div>

              {/* Conversion across Campaign Funnel chart */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Conversion across Campaign Funnel chart
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Calls Connected → RPC → Due communicated → Promise to Pay → Cured
                </div>
                <div className="text-center text-zinc-400 py-8">
                  <ChartPieIcon className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-sm">Funnel chart</div>
                  <div className="text-xs mt-2">Selected period</div>
                </div>
              </div>

              {/* Collection effectiveness */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Collection effectiveness ($)
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Collection per $ spent
                </div>
                <div className="text-center text-zinc-400 py-8">
                  <ChartBarIcon className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-sm">Bar chart</div>
                  <div className="text-xs mt-2">Selected period (daily)</div>
                </div>
              </div>

              {/* Convertion rate */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Convertion rate
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  RPC, Promise to pay, Cured, Extension (%)
                </div>
                <div className="text-center text-zinc-400 py-8">
                  <ChartBarIcon className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-sm">Line chart</div>
                  <div className="text-xs mt-2">Selected period (daily)</div>
                </div>
              </div>

              {/* Top 3 Drivers for inbound connects */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Top 3 Drivers for inbound connects
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Reason | Share of calls
                </div>
                <div className="text-center text-zinc-400 py-8">
                  <DocumentTextIcon className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-sm">Table</div>
                  <div className="text-xs mt-2">others</div>
                </div>
              </div>

              {/* Agent Transfer Trend */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Agent Transfer Trend
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Agent Transfer (%)
                </div>
                <div className="text-center text-zinc-400 py-8">
                  <ChartBarIcon className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-sm">Bar chart</div>
                  <div className="text-xs mt-2">Selected period (daily)</div>
                </div>
              </div>
            </div>

            {/* Bottom Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Repeat Contacts - 7 days */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Repeat Contacts - 7 days
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  number | % of calls
                </div>
                <div className="text-center text-zinc-400 py-8">
                  <DocumentTextIcon className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-sm">Table</div>
                  <div className="text-xs mt-2">Campaign</div>
                </div>
              </div>

              {/* Previous connect Outcome - Repeat contacts */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Previous connect Outcome - Repeat contacts
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Agent Transfer, PTP, RPC w/o PTP, Cured, Partial Payment, Extension, others
                </div>
                <div className="text-center text-zinc-400 py-8">
                  <ChartPieIcon className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-sm">pie-chart</div>
                  <div className="text-xs mt-2">Campaign</div>
                </div>
              </div>
            </div>
          </>
        )}
        {tab === "User Experience" && (
          <>
            <div className="text-2xl font-bold text-zinc-900 mb-6">
              User Experience
            </div>

            {/* Note */}
            <div className="mb-6">
              <div className="text-sm text-zinc-600">
                * based on 10% of audited calls
              </div>
            </div>

            {/* Top Section - Word Cloud */}
            <div className="mb-8">
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="text-center text-zinc-400 py-16">
                  <div className="text-lg font-medium mb-4">Word Cloud</div>
                  <div className="text-sm">Interactive word cloud visualization would appear here</div>
                </div>
              </div>
            </div>

            {/* Middle Section - 4 Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Average Latency */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Average Latency
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Average Latency (ms)
                </div>
                <div className="text-center text-zinc-400 py-8">
                  <ChartBarIcon className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-sm">Area chart</div>
                  <div className="text-xs mt-2">Selected period</div>
                </div>
              </div>

              {/* Share of calls with Errors */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Share of calls with Errors (as identified by customer)
                </div>
                <div className="text-xs text-zinc-500 mb-4"></div>
                <div className="text-center text-zinc-400 py-8">
                  <ChartBarIcon className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-sm">Bar chart</div>
                  <div className="text-xs mt-2">Selected period (Weekly)</div>
                </div>
              </div>

              {/* Share of calls where client had to repeat themselves */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Share of calls where client had to repeat themselves (as identified by customer)
                </div>
                <div className="text-xs text-zinc-500 mb-4"></div>
                <div className="text-center text-zinc-400 py-8">
                  <ChartBarIcon className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-sm">Bar chart</div>
                  <div className="text-xs mt-2">Selected period (Weekly)</div>
                </div>
              </div>

              {/* Average Handling time by Outcome */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Average Handling time by Outcome
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Collection | Promise to pay | Agent Transfer | FAQs | Other
                </div>
                <div className="text-center text-zinc-400 py-8">
                  <ChartBarIcon className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-sm">Area chart</div>
                  <div className="text-xs mt-2">Selected period (weekly)</div>
                </div>
              </div>
            </div>

            {/* Bottom Section - 3 Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Average Handling time by Sentiment */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Average Handling time by Sentiment
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Collection | Promise to pay | Agent Transfer | FAQs | Other
                </div>
                <div className="text-center text-zinc-400 py-8">
                  <ChartBarIcon className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-sm">Area chart</div>
                  <div className="text-xs mt-2">Selected period (weekly)</div>
                </div>
              </div>

              {/* Word cloud - negative sentiment calls */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Word cloud - negative sentiment calls
                </div>
                <div className="text-xs text-zinc-500 mb-4"></div>
                <div className="text-center text-zinc-400 py-8">
                  <div className="text-lg font-medium mb-4">Word Cloud</div>
                  <div className="text-sm">Negative sentiment word cloud would appear here</div>
                </div>
              </div>

              {/* Call Experience by Intent - Full Width */}
              <div className="lg:col-span-2 bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Call Experience by Intent (to be modified)
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Call Driver Sentiment
                </div>
                
                {/* Sentiment Chart Placeholder */}
                <div className="mb-6">
                  <div className="text-center text-zinc-400 py-8">
                    <ChartBarIcon className="w-12 h-12 mx-auto mb-2" />
                    <div className="text-sm">Horizontal Bar Chart</div>
                    <div className="text-xs mt-2">Sentiment analysis by call intent</div>
                  </div>
                </div>

                {/* Distribution Chart */}
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-white text-sm font-medium mb-4">
                    Distribution of Customer Sentiment
                  </div>
                  <div className="text-center text-zinc-400 py-8">
                    <ChartBarIcon className="w-12 h-12 mx-auto mb-2 text-orange-400" />
                    <div className="text-sm text-white">Histogram Chart</div>
                    <div className="text-xs mt-2 text-gray-300">Sentiment distribution visualization</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
        {tab === "Compliance" && (
          <>
            <div className="text-2xl font-bold text-zinc-900 mb-6">
              Compliance
            </div>

            {/* Digital Agent Containment Analysis */}
            <div className="mb-8">
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="text-lg font-semibold text-zinc-900 mb-6">
                  Digital Agent Containment Analysis
                </div>
                
                {/* Containment Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  {/* Full Containment */}
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">87.2%</div>
                    <div className="text-sm font-medium text-zinc-900 mb-1">Full Containment</div>
                    <div className="text-xs text-zinc-500 mb-1">31,392 interactions</div>
                    <div className="text-xs text-zinc-400">Complete digital resolution</div>
                  </div>
                  
                  {/* Partial Containment */}
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">7.8%</div>
                    <div className="text-sm font-medium text-zinc-900 mb-1">Partial Containment</div>
                    <div className="text-xs text-zinc-500 mb-1">2,808 interactions</div>
                    <div className="text-xs text-zinc-400">Digital + minimal human touch</div>
                  </div>
                  
                  {/* Human Escalation */}
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">4.8%</div>
                    <div className="text-sm font-medium text-zinc-900 mb-1">Human Escalation</div>
                    <div className="text-xs text-zinc-500 mb-1">1,728 interactions</div>
                    <div className="text-xs text-zinc-400">Required human intervention</div>
                  </div>
                  
                  {/* System Issues */}
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">0.2%</div>
                    <div className="text-sm font-medium text-zinc-900 mb-1">System Issues</div>
                    <div className="text-xs text-zinc-500 mb-1">72 interactions</div>
                    <div className="text-xs text-zinc-400">Technical resolution needed</div>
                  </div>
                </div>

                {/* Overall Adherence */}
                <div className="text-center mb-8">
                  <div className="text-6xl font-bold text-zinc-700 mb-2">99.98%</div>
                  <div className="text-sm text-zinc-600">Overall Adherence</div>
                </div>

                {/* Call Analysis Report */}
                <div className="mb-6">
                  <div className="text-lg font-semibold text-zinc-900 mb-4">
                    Call Analysis - Report
                  </div>
                  
                  {/* Parameters Table */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="font-medium text-zinc-700">Parameter</div>
                      <div className="font-medium text-zinc-700 text-center">Weight (out of 100)</div>
                      <div className="font-medium text-zinc-700 text-right">Adherence (%)</div>
                    </div>
                    
                    <div className="mt-4 space-y-3">
                      {[
                        { name: "Identify Company", weight: 12, adherence: 100 },
                        { name: "Identify Self", weight: 12, adherence: 100 },
                        { name: "Mini Miranda", weight: 12, adherence: 100 },
                        { name: "Call Recording Disclosure", weight: 12, adherence: 100 },
                        { name: "Dignity Enquiry Beginning", weight: 10, adherence: 100 },
                        { name: "RTP Due", weight: 9, adherence: 100 },
                        { name: "No Excessive Silence (> 5 Sec)", weight: 6, adherence: 99.7 },
                        { name: "Digital Enquiry Ending", weight: 9, adherence: 100 },
                        { name: "Consent to Call", weight: 9, adherence: 100 },
                        { name: "Further Assistance", weight: 9, adherence: 100 }
                      ].map((item, index) => (
                        <div key={index} className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-zinc-700">{item.name}</div>
                          <div className="text-center text-zinc-600">{item.weight}</div>
                          <div className="text-right">
                            <div className="flex items-center justify-end">
                              <span className="text-zinc-700 mr-2">{item.adherence}</span>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-600 h-2 rounded-full" 
                                  style={{ width: `${item.adherence}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interaction Audit Log */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
              <div className="text-lg font-semibold text-zinc-900 mb-6">
                Interaction Audit Log
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-zinc-700">Account ID</th>
                      <th className="text-left py-3 px-4 font-medium text-zinc-700">Date/Time</th>
                      <th className="text-left py-3 px-4 font-medium text-zinc-700">Channels Used</th>
                      <th className="text-left py-3 px-4 font-medium text-zinc-700">Duration</th>
                      <th className="text-left py-3 px-4 font-medium text-zinc-700">Final Outcome</th>
                      <th className="text-left py-3 px-4 font-medium text-zinc-700">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-zinc-700">Recording/Transcript</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="text-blue-600 font-medium">ACC001234</span>
                      </td>
                      <td className="py-3 px-4 text-zinc-700">6/28 2:34 PM</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <PhoneIcon className="w-4 h-4 text-blue-600 mr-1" />
                          <span className="text-zinc-700">Voice</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-zinc-700">00:02:45</td>
                      <td className="py-3 px-4 text-zinc-700">PTP Secured</td>
                      <td className="py-3 px-4 text-zinc-700">$245</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-xs">▶ Listen</button>
                          <button className="text-blue-600 hover:text-blue-800 text-xs">📄 View Call</button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="text-blue-600 font-medium">ACC005678</span>
                      </td>
                      <td className="py-3 px-4 text-zinc-700">6/28 3:15 PM</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1">
                          <ChatBubbleLeftRightIcon className="w-4 h-4 text-green-600" />
                          <span className="text-zinc-700">SMS→Voice</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-zinc-700">00:01:32</td>
                      <td className="py-3 px-4 text-zinc-700">Self-Pay Complete</td>
                      <td className="py-3 px-4 text-zinc-700">$180</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-xs">▶ Listen</button>
                          <button className="text-blue-600 hover:text-blue-800 text-xs">📄 View Call</button>
                          <button className="text-purple-600 hover:text-purple-800 text-xs">📱 View SMS</button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="text-blue-600 font-medium">ACC009876</span>
                      </td>
                      <td className="py-3 px-4 text-zinc-700">6/28 4:22 PM</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <EnvelopeIcon className="w-4 h-4 text-purple-600 mr-1" />
                          <span className="text-zinc-700">SMS Only</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-zinc-700">N/A</td>
                      <td className="py-3 px-4 text-zinc-700">Payment Link Sent</td>
                      <td className="py-3 px-4 text-zinc-700">$0</td>
                      <td className="py-3 px-4">
                        <button className="text-purple-600 hover:text-purple-800 text-xs">📱 View SMS</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="text-blue-600 font-medium">ACC002468</span>
                      </td>
                      <td className="py-3 px-4 text-zinc-700">6/28 1:18 PM</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <PhoneIcon className="w-4 h-4 text-blue-600 mr-1" />
                          <span className="text-zinc-700">Voice</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-zinc-700">00:04:12</td>
                      <td className="py-3 px-4 text-zinc-700">Escalated - Dispute</td>
                      <td className="py-3 px-4 text-zinc-700">$0</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-xs">▶ Listen</button>
                          <button className="text-blue-600 hover:text-blue-800 text-xs">📄 View Call</button>
                        </div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="text-blue-600 font-medium">ACC003579</span>
                      </td>
                      <td className="py-3 px-4 text-zinc-700">6/28 5:45 PM</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <EnvelopeIcon className="w-4 h-4 text-purple-600 mr-1" />
                          <span className="text-zinc-700">SMS Only</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-zinc-700">N/A</td>
                      <td className="py-3 px-4 text-zinc-700">Account Info Request</td>
                      <td className="py-3 px-4 text-zinc-700">$0</td>
                      <td className="py-3 px-4">
                        <button className="text-purple-600 hover:text-purple-800 text-xs">📱 View SMS</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <span className="text-blue-600 font-medium">ACC004680</span>
                      </td>
                      <td className="py-3 px-4 text-zinc-700">6/28 11:22 AM</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-1">
                          <PhoneIcon className="w-4 h-4 text-blue-600" />
                          <span className="text-zinc-700">Voice→SMS</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-zinc-700">00:03:18</td>
                      <td className="py-3 px-4 text-zinc-700">Payment Plan Setup</td>
                      <td className="py-3 px-4 text-zinc-700">$125</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-800 text-xs">▶ Listen</button>
                          <button className="text-blue-600 hover:text-blue-800 text-xs">📄 View Call</button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        {tab === "Utilization" && (
          <>
            <div className="text-2xl font-bold text-zinc-900 mb-4">
              Utilization
            </div>
            {/* Utilization KPIs Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <MetricCard
                icon={<MicrophoneIcon className="w-5 h-5" />}
                label="Total Voice Minutes"
                value="35,700"
                sublabel={"Last 30 days\n+3.2% from previous period"}
              />
              <MetricCard
                icon={<DocumentTextIcon className="w-5 h-5" />}
                label="Total SMS Segments"
                value="90,100"
                sublabel={"Last 30 days\n+5.7% from previous period"}
              />
              <MetricCard
                icon={<EnvelopeOpenIcon className="w-5 h-5" />}
                label="Total Emails Sent"
                value="44,600"
                sublabel={"Last 30 days\n+2.1% from previous period"}
              />
            </div>

            {/* Utilization Charts Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Voice Minutes Over Time */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Voice Minutes Over Time
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart
                    data={[
                      { date: "2023-10-01", total: 4500 },
                      { date: "2023-10-02", total: 4700 },
                      { date: "2023-10-03", total: 4300 },
                      { date: "2023-10-04", total: 4800 },
                      { date: "2023-10-05", total: 5000 },
                      { date: "2023-10-06", total: 5200 },
                      { date: "2023-10-07", total: 5400 },
                    ]}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(v) => v + " mins"} />
                    <Tooltip formatter={(v) => v + " mins"} />
                    <Line
                      type="monotone"
                      dataKey="total"
                      name="total"
                      stroke="#2563eb"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* Voice Minutes by Type */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Voice Minutes by Type
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart
                    data={[
                      { date: "2023-10-01", inbound: 2000, outbound: 2500 },
                      { date: "2023-10-02", inbound: 2100, outbound: 2600 },
                      { date: "2023-10-03", inbound: 1900, outbound: 2400 },
                      { date: "2023-10-04", inbound: 2200, outbound: 2600 },
                      { date: "2023-10-05", inbound: 2300, outbound: 2700 },
                      { date: "2023-10-06", inbound: 2400, outbound: 2800 },
                      { date: "2023-10-07", inbound: 2500, outbound: 2900 },
                    ]}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(v) => v + " mins"} />
                    <Tooltip formatter={(v) => v + " mins"} />
                    <Legend />
                    <Bar dataKey="inbound" name="inbound" fill="#2563eb" />
                    <Bar dataKey="outbound" name="outbound" fill="#60a5fa" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Utilization Charts Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* SMS Segments Sent Over Time */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  SMS Segments Sent Over Time
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart
                    data={[
                      { date: "2023-10-01", segments: 12000 },
                      { date: "2023-10-02", segments: 13000 },
                      { date: "2023-10-03", segments: 11000 },
                      { date: "2023-10-04", segments: 12500 },
                      { date: "2023-10-05", segments: 11500 },
                      { date: "2023-10-06", segments: 13500 },
                      { date: "2023-10-07", segments: 14000 },
                    ]}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(v) => v} />
                    <Tooltip formatter={(v) => v} />
                    <Line
                      type="monotone"
                      dataKey="segments"
                      name="segments"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* Emails Sent Over Time */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Emails Sent Over Time
                </div>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart
                    data={[
                      { date: "2023-10-01", emails: 6000 },
                      { date: "2023-10-02", emails: 6500 },
                      { date: "2023-10-03", emails: 6200 },
                      { date: "2023-10-04", emails: 7000 },
                      { date: "2023-10-05", emails: 6800 },
                      { date: "2023-10-06", emails: 7500 },
                      { date: "2023-10-07", emails: 8000 },
                    ]}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis tickFormatter={(v) => v} />
                    <Tooltip formatter={(v) => v} />
                    <Line
                      type="monotone"
                      dataKey="emails"
                      name="emails"
                      stroke="#a78bfa"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Channel Cost Analysis Table */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
              <div className="font-semibold text-zinc-900 mb-2">
                Channel Cost Analysis
              </div>
              <div className="text-xs text-zinc-500 mb-4">
                Cost breakdown by communication channel
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border-separate border-spacing-y-2">
                  <thead>
                    <tr className="bg-zinc-50 text-zinc-700">
                      <th className="px-4 py-2 text-left">Channel</th>
                      <th className="px-4 py-2 text-left">Usage</th>
                      <th className="px-4 py-2 text-left">Cost Per Unit</th>
                      <th className="px-4 py-2 text-left">Total Cost</th>
                      <th className="px-4 py-2 text-left">Time Range</th>
                      <th className="px-4 py-2 text-left">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-4 py-2 font-medium text-zinc-900">
                        Voice
                      </td>
                      <td className="px-4 py-2">35,700 minutes</td>
                      <td className="px-4 py-2">$0.10/minute</td>
                      <td className="px-4 py-2">$3,570</td>
                      <td className="px-4 py-2">Oct 1–31, 2023</td>
                      <td className="px-4 py-2 text-green-600">+3.2%</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-2 font-medium text-zinc-900">
                        SMS
                      </td>
                      <td className="px-4 py-2">90,100 segments</td>
                      <td className="px-4 py-2">$0.03/segment</td>
                      <td className="px-4 py-2">$2,703</td>
                      <td className="px-4 py-2">Oct 1–31, 2023</td>
                      <td className="px-4 py-2 text-green-600">+5.7%</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-2 font-medium text-zinc-900">
                        Email
                      </td>
                      <td className="px-4 py-2">44,600 emails</td>
                      <td className="px-4 py-2">$0.01/email</td>
                      <td className="px-4 py-2">$446</td>
                      <td className="px-4 py-2">Oct 1–31, 2023</td>
                      <td className="px-4 py-2 text-green-600">+2.1%</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-2 font-medium text-zinc-900">
                        WhatsApp
                      </td>
                      <td className="px-4 py-2">12,500 messages</td>
                      <td className="px-4 py-2">$0.05/message</td>
                      <td className="px-4 py-2">$625</td>
                      <td className="px-4 py-2">Oct 1–31, 2023</td>
                      <td className="px-4 py-2 text-green-600">+8.3%</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-2 font-medium text-zinc-900">
                        API Calls
                      </td>
                      <td className="px-4 py-2">450,000 calls</td>
                      <td className="px-4 py-2">$0.002/call</td>
                      <td className="px-4 py-2">$900</td>
                      <td className="px-4 py-2">Oct 1–31, 2023</td>
                      <td className="px-4 py-2 text-green-600">+4.5%</td>
                    </tr>
                    <tr className="bg-white font-bold">
                      <td className="px-4 py-2 font-medium text-zinc-900">
                        Total
                      </td>
                      <td className="px-4 py-2"></td>
                      <td className="px-4 py-2"></td>
                      <td className="px-4 py-2">$8,244</td>
                      <td className="px-4 py-2"></td>
                      <td className="px-4 py-2 text-green-600">+4.7%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>

      {/* AI Analytics Modal */}
      {showAiModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center">
                <SparklesIcon className="w-6 h-6 text-blue-600 mr-2" />
                <h2 className="text-2xl font-bold text-gray-900">Ask Analytics AI</h2>
                <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  Beta
                </span>
              </div>
              <button
                onClick={() => {
                  setShowAiModal(false);
                  setSearchResults(null);
                  setShowSuggestions(false);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="text-center mb-6">
                <p className="text-gray-600 text-lg">
                  Get instant insights from your collection data using natural language queries
                </p>
              </div>

              {/* Example Questions */}
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <LightBulbIcon className="w-5 h-5 text-yellow-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Try asking:</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exampleQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setAiQuery(question);
                        setShowSuggestions(false);
                      }}
                      className="text-left p-3 bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-sm text-gray-700"
                    >
                      "{question}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Search Input */}
              <div className="relative max-w-4xl mx-auto">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
                  <input
                    type="text"
                    value={aiQuery}
                    onChange={(e) => {
                      setAiQuery(e.target.value);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    onBlur={() => {
                      // Delay hiding to allow clicking on suggestions
                      setTimeout(() => setShowSuggestions(false), 200);
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && handleAiSearch()}
                    placeholder={currentPlaceholder || "Type your question here..."}
                    className="w-full pl-12 pr-32 py-4 text-lg border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                  <button
                    onClick={handleAiSearch}
                    disabled={!aiQuery.trim() || isSearching}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    {isSearching ? (
                      <div className="flex items-center">
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                        Searching...
                      </div>
                    ) : (
                      "Search"
                    )}
                  </button>
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-50 max-h-96 overflow-y-auto">
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                      <div className="border-b border-gray-100">
                        <div className="flex items-center px-4 py-3 border-b border-gray-100">
                          <div className="w-4 h-4 mr-3 text-gray-400">
                            <svg fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-sm font-medium text-gray-700">Recent Searches</span>
                        </div>
                        {recentSearches.map((search, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(search)}
                            className="w-full text-left px-4 py-3 text-sm text-gray-900 hover:bg-gray-50"
                          >
                            {search}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Suggested Queries */}
                    <div>
                      <div className="flex items-center px-4 py-3 border-b border-gray-100">
                        <div className="w-4 h-4 mr-3 text-gray-400">
                          <svg fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-700">Suggested Queries</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 p-2">
                        {sampleQueries.slice(0, 6).map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="text-left p-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg flex items-start"
                          >
                            <div className="w-4 h-4 mr-3 mt-0.5 text-gray-400 flex-shrink-0">
                              <svg fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                              </svg>
                            </div>
                            <span>{suggestion}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Search Results */}
              {searchResults && (
                <div className="mt-6">
                  <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-6">
                    <div className="flex items-start mb-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <SparklesIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">AI Analysis</h3>
                        <p className="text-gray-700 leading-relaxed">{searchResults.answer}</p>
                      </div>
                    </div>

                    {/* Compliance Cards or Regular Metrics */}
                    {searchResults.complianceCards ? (
                      <div className="mt-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-900">📊 Early Warning Dashboard (20)</h4>
                          <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </button>
                        </div>
                        
                                                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                           {searchResults.complianceCards.map((card, index) => {
                             return (
                             <div key={index} className={`${card.color} rounded-lg p-4 text-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1`}>
                               {/* Card Header */}
                               <div className="flex items-center justify-between mb-3">
                                 <div className="flex items-center">
                                   <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-2">
                                     <span className="text-xs font-bold text-white">{card.avatar}</span>
                                   </div>
                                   <div>
                                     <div className="font-semibold text-sm">{card.name}</div>
                                   </div>
                                 </div>
                                 <div className="text-xs font-mono bg-white bg-opacity-20 px-2 py-1 rounded">
                                   {card.time}
                                 </div>
                               </div>
                               
                               {/* Card Content */}
                               <div className="mb-4">
                                 <div className="font-semibold text-sm mb-2">{card.type}</div>
                                 <div className="text-xs leading-relaxed opacity-90">
                                   {card.description}
                                 </div>
                               </div>

                                                              {/* Call Information & Actions */}
                               <div className="border-t border-white border-opacity-20 pt-3 mt-3">
                                 <div className="flex items-center justify-between mb-2">
                                   <div className="text-xs opacity-90 font-mono">
                                     ID: {card.callId}
                                   </div>
                                   <div className="text-xs opacity-75">
                                     🔴 Recorded
                                   </div>
                                 </div>
                                 <div className="flex items-center justify-between">
                                   <div className="text-xs opacity-75">
                                     Risk: {card.severity.toUpperCase()}
                                   </div>
                                   <button
                                     onClick={() => handleViewCall(card)}
                                     className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 transition-all duration-200 hover:scale-105"
                                   >
                                     <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                     </svg>
                                     View Call
                                   </button>
                                 </div>
                               </div>
                             </div>
                             );
                           })}
                         </div>
                        
                        {/* Summary Statistics */}
                      
                      </div>
                    ) : (
                      /* Regular Metrics */
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        {searchResults.metrics && searchResults.metrics.map((metric, index) => (
                          <div key={index} className="bg-white rounded-lg p-4 text-center border border-gray-200">
                            <div className="text-sm text-gray-600 mb-1">{metric.label}</div>
                            <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                            {metric.trend && (
                              <div className={`text-sm mt-1 font-medium ${
                                metric.trend.includes('🚨') || metric.trend.includes('High Risk') || metric.trend.includes('Immediate') 
                                  ? 'text-red-600' 
                                  : metric.trend.includes('Action') || metric.trend.includes('Required') || metric.trend.includes('Stop')
                                  ? 'text-orange-600'
                                  : metric.trend.includes('Review') || metric.trend.includes('Documentation') || metric.trend.includes('Verify')
                                  ? 'text-yellow-600'
                                  : 'text-green-600'
                              }`}>
                                {metric.trend}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
