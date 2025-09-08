import React, { useState } from "react";
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
        createButtonText="Export Data"
        createButtonIcon={ArrowDownTrayIcon}
        onCreateClick={() => {}}
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
    </div>
  );
}
