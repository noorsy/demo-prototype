import React, { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  UsersIcon,
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
} from "recharts";

const productOptions = ["All Products", "Auto Loan", "Credit Card", "Mortgage"];
const dpdOptions = ["All DPD", "0-30", "31-60", "61-90", "91+"];
const segmentOptions = ["All Segments", "High Value", "Mid Risk", "Late Stage"];
const tabOptions = [
  "Overview",
  "Engagement",
  "Compliance",
  "Voice",
  "SMS",
  "Email",
  "Utilization",
];

// Dummy data
const recoveryRateData = [
  { name: "Oct 1", "Recovery Rate": 12.5 },
  { name: "Oct 8", "Recovery Rate": 13.2 },
  { name: "Oct 15", "Recovery Rate": 14.8 },
  { name: "Oct 22", "Recovery Rate": 15.3 },
  { name: "Oct 29", "Recovery Rate": 14.5 },
];
const amountRecoveredData = [
  { name: "Oct 1", "Amount Recovered": 125000 },
  { name: "Oct 8", "Amount Recovered": 132000 },
  { name: "Oct 15", "Amount Recovered": 148000 },
  { name: "Oct 22", "Amount Recovered": 153000 },
  { name: "Oct 29", "Amount Recovered": 145000 },
];
const recoveryRateByBucketData = [
  { name: "Pre-due", "Recovery Rate": 18.5 },
  { name: "Grace Period", "Recovery Rate": 15.2 },
  { name: "Early Delinquency", "Recovery Rate": 12.8 },
  { name: "Late Delinquency", "Recovery Rate": 8.4 },
];
const dpdBucketData = [
  {
    bucket: "Pre-due",
    totalAccounts: 12500,
    totalValue: "$6,250,000",
    newInflows: 2500,
    newInflowsAmount: "$1,250,000",
    cured: 1875,
    curedAmount: "$937,500",
    rolledForward: 1250,
    rolledForwardAmount: "$625,000",
    recoveredAmount: "$1,156,250",
    resolvedAccounts: 11875,
  },
  {
    bucket: "Grace Period",
    totalAccounts: 8750,
    totalValue: "$4,375,000",
    newInflows: 1250,
    newInflowsAmount: "$625,000",
    cured: 1312,
    curedAmount: "$656,250",
    rolledForward: 875,
    rolledForwardAmount: "$437,500",
    recoveredAmount: "$665,000",
    resolvedAccounts: 7813,
  },
  {
    bucket: "Early Delinquency",
    totalAccounts: 6250,
    totalValue: "$3,125,000",
    newInflows: 875,
    newInflowsAmount: "$437,500",
    cured: 625,
    curedAmount: "$312,500",
    rolledForward: 625,
    rolledForwardAmount: "$312,500",
    recoveredAmount: "$400,000",
    resolvedAccounts: 5875,
  },
  {
    bucket: "Late Delinquency",
    totalAccounts: 3750,
    totalValue: "$1,875,000",
    newInflows: 625,
    newInflowsAmount: "$312,500",
    cured: 187,
    curedAmount: "$93,750",
    rolledForward: 0,
    rolledForwardAmount: "$0",
    recoveredAmount: "$157,500",
    resolvedAccounts: 4188,
  },
];
const riskMetricsData = [
  {
    riskType: "Straw Purchase Risk",
    accounts: 28,
    value: "$1,400,000",
    impactMetric: "Rollforward Rate",
    impactValue: "+2.5%",
    trend: "up",
  },
  {
    riskType: "Bankruptcy Filings",
    accounts: 15,
    value: "$750,000",
    impactMetric: "Charge-off Rate",
    impactValue: "+1.8%",
    trend: "up",
  },
  {
    riskType: "Nearing Charge-off",
    accounts: 42,
    value: "$2,100,000",
    impactMetric: "Recovery Rate",
    impactValue: "-3.2%",
    trend: "down",
  },
  {
    riskType: "Multiple Complaints",
    accounts: 23,
    value: "$1,150,000",
    impactMetric: "Regulatory Risk",
    impactValue: "High",
    trend: "neutral",
  },
  {
    riskType: "Cease & Desist Requests",
    accounts: 18,
    value: "$900,000",
    impactMetric: "Contact Rate",
    impactValue: "-2.1%",
    trend: "down",
  },
];

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
  const [dpd, setDpd] = useState(dpdOptions[0]);
  const [segment, setSegment] = useState(segmentOptions[0]);
  const [dateRange, setDateRange] = useState({
    from: "2024-01-01",
    to: "2024-06-30",
  });
  const [tab, setTab] = useState(tabOptions[0]);

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header matching the AI Agents/Conversations design */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        </div>
      </div>
      {/* Sticky Global Filters */}
      <div className="sticky top-0 z-20  px-6 py-4 flex flex-row gap-4 items-center justify-end shadow-sm">
        <FilterDropdown
          options={productOptions}
          value={product}
          onChange={setProduct}
        />
        <FilterDropdown options={dpdOptions} value={dpd} onChange={setDpd} />
        <FilterDropdown
          options={segmentOptions}
          value={segment}
          onChange={setSegment}
        />
        <input
          type="date"
          className="px-3 py-2 border border-zinc-200 rounded-lg text-sm text-zinc-900 bg-white"
          value={dateRange.to}
          onChange={(e) => setDateRange((r) => ({ ...r, to: e.target.value }))}
        />
      </div>

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

      {/* Tab Content */}
      <div className="max-w-8xl mx-auto p-8">
        {tab === "Overview" && (
          <>
            <div className="text-2xl font-bold text-zinc-900 mb-4">
              Overview (Portfolio Health)
            </div>
            {/* KPI Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <MetricCard
                icon={<UsersIcon className="w-5 h-5" />}
                label="Total Accounts"
                value="12,340"
              />
              <MetricCard
                icon={<CurrencyDollarIcon className="w-5 h-5" />}
                label="Money Moved"
                value="$2,340,000"
              />
              <MetricCard
                icon={<ArrowTrendingUpIcon className="w-5 h-5" />}
                label="Recovery Rate"
                value="68%"
                sublabel="$1,591,200"
              />
              <MetricCard
                icon={<CheckCircleIcon className="w-5 h-5" />}
                label="Accounts Resolved"
                value="7,800"
              />
            </div>
            {/* Charts Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Recovery Rate Over Time */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Recovery Rate Over Time
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart
                    data={recoveryRateData}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                      domain={[0, "auto"]}
                      tickFormatter={(v) => v + "%"}
                    />
                    <Tooltip formatter={(v) => v + "%"} />
                    <Line
                      type="monotone"
                      dataKey="Recovery Rate"
                      stroke="#2563eb"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* Recovery Amount (Trend) */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Recovery Amount (Trend)
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart
                    data={amountRecoveredData}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                      tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                    <Line
                      type="monotone"
                      dataKey="Amount Recovered"
                      stroke="#059669"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Recovery Rate by DPD Bucket & DPD Bucket Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Recovery Rate by DPD Bucket */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  Recovery Rate by DPD Bucket
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart
                    data={recoveryRateByBucketData}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis
                      domain={[0, "auto"]}
                      tickFormatter={(v) => v + "%"}
                    />
                    <Tooltip formatter={(v) => v + "%"} />
                    <Bar
                      dataKey="Recovery Rate"
                      fill="#6366f1"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* DPD Bucket Breakdown */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  DPD Bucket Breakdown
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart
                    data={dpdBucketData}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="bucket" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="totalAccounts"
                      fill="#2563eb"
                      name="Total Accounts"
                    />
                    <Bar dataKey="cured" fill="#059669" name="Cured" />
                    <Bar
                      dataKey="rolledForward"
                      fill="#f59e42"
                      name="Rolled Forward"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Risk Metrics */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
              <div className="font-semibold text-zinc-900 mb-2">
                Risk Metrics
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border-separate border-spacing-y-2">
                  <thead>
                    <tr className="bg-zinc-50 text-zinc-700">
                      <th className="px-4 py-2 text-left">Risk Type</th>
                      <th className="px-4 py-2 text-left">Accounts</th>
                      <th className="px-4 py-2 text-left">Value</th>
                      <th className="px-4 py-2 text-left">Impact Metric</th>
                      <th className="px-4 py-2 text-left">Impact Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riskMetricsData.map((risk) => (
                      <tr key={risk.riskType} className="bg-white">
                        <td className="px-4 py-2 font-medium text-zinc-900">
                          {risk.riskType}
                        </td>
                        <td className="px-4 py-2">{risk.accounts}</td>
                        <td className="px-4 py-2">{risk.value}</td>
                        <td className="px-4 py-2">{risk.impactMetric}</td>
                        <td className="px-4 py-2">
                          <span
                            className={
                              risk.trend === "up"
                                ? "text-green-600"
                                : risk.trend === "down"
                                ? "text-red-600"
                                : "text-zinc-700"
                            }
                          >
                            {risk.impactValue}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        {tab === "Engagement" && (
          <>
            <div className="text-2xl font-bold text-zinc-900 mb-4">
              Engagement
            </div>
            {/* Engagement Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
              <MetricCard
                icon={<UserGroupIcon className="w-5 h-5" />}
                label="Accounts Reached"
                value="62,500"
                sublabel={"+8.5% from last month"}
              />
              <MetricCard
                icon={<SignalIcon className="w-5 h-5" />}
                label="Connectivity %"
                value="78.5%"
                sublabel={"+2.3% from last month"}
              />
              <MetricCard
                icon={<ChatBubbleLeftRightIcon className="w-5 h-5" />}
                label="RPC Rate"
                value="42.1%"
                sublabel={"+1.5% from last month"}
              />
              <MetricCard
                icon={<HandThumbUpIcon className="w-5 h-5" />}
                label="PTP Rate"
                value="19.3%"
                sublabel={"+2.5% from last month"}
              />
              <MetricCard
                icon={<CheckBadgeIcon className="w-5 h-5" />}
                label="Resolution Rate"
                value="12.5%"
                sublabel={"+1.8% from last month"}
              />
            </div>

            {/* Engagement Rates Chart */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 mb-8">
              <div className="font-semibold text-zinc-900 mb-2">
                Engagement Rates
              </div>
              <div className="text-xs text-zinc-500 mb-4">
                Connectivity, RPC, PTP, and Resolution rates over time
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart
                  data={[
                    {
                      date: "2023-10-01",
                      connectivity: 78.5,
                      rpc: 42.1,
                      ptp: 19.3,
                      resolution: 12.5,
                    },
                    {
                      date: "2023-10-02",
                      connectivity: 78.7,
                      rpc: 42.3,
                      ptp: 19.4,
                      resolution: 12.6,
                    },
                    {
                      date: "2023-10-03",
                      connectivity: 78.9,
                      rpc: 42.5,
                      ptp: 19.5,
                      resolution: 12.7,
                    },
                    {
                      date: "2023-10-04",
                      connectivity: 79.0,
                      rpc: 42.7,
                      ptp: 19.6,
                      resolution: 12.8,
                    },
                    {
                      date: "2023-10-05",
                      connectivity: 79.2,
                      rpc: 42.9,
                      ptp: 19.7,
                      resolution: 12.9,
                    },
                    {
                      date: "2023-10-06",
                      connectivity: 79.3,
                      rpc: 43.0,
                      ptp: 19.8,
                      resolution: 13.0,
                    },
                    {
                      date: "2023-10-07",
                      connectivity: 79.5,
                      rpc: 43.2,
                      ptp: 19.9,
                      resolution: 13.1,
                    },
                  ]}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} tickFormatter={(v) => v + "%"} />
                  <Tooltip formatter={(v) => v + "%"} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="connectivity"
                    name="connectivity"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="rpc"
                    name="rpc"
                    stroke="#06b6d4"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="ptp"
                    name="ptp"
                    stroke="#f59e42"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="resolution"
                    name="resolution"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Customer Engagement Funnel */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 mb-8">
              <div className="font-semibold text-zinc-900 mb-2">
                Customer Engagement Funnel
              </div>
              <div className="text-xs text-zinc-500 mb-4">
                Conversion rates through the engagement process
              </div>
              <div className="flex flex-col gap-2">
                <div className="bg-blue-600 text-white font-semibold rounded-md px-4 py-2 w-full max-w-xl">
                  Accounts Reached: 62,500
                </div>
                <div className="bg-blue-500 text-white font-semibold rounded-md px-4 py-2 w-11/12 max-w-lg">
                  Connected: 49,063 (78.5%)
                </div>
                <div className="bg-blue-400 text-white font-semibold rounded-md px-4 py-2 w-9/12 max-w-md">
                  Right Party Contact: 26,314 (42.1%)
                </div>
                <div className="bg-blue-300 text-white font-semibold rounded-md px-4 py-2 w-7/12 max-w-sm">
                  Promise to Pay: 5,067 (19.3% of RPCs)
                </div>
                <div className="bg-blue-200 text-blue-900 font-semibold rounded-md px-4 py-2 w-6/12 max-w-xs">
                  PTP Kept: 4,145 (15.8% of RPCs)
                </div>
                <div className="bg-blue-100 text-blue-900 font-semibold rounded-md px-4 py-2 w-5/12 max-w-xs">
                  Resolution: 3,281 (12.5% of RPCs)
                </div>
              </div>
            </div>

            {/* Channel Performance Table */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 mb-8">
              <div className="font-semibold text-zinc-900 mb-2">
                Channel Performance
              </div>
              <div className="text-xs text-zinc-500 mb-4">
                Engagement metrics by communication channel
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border-separate border-spacing-y-2">
                  <thead>
                    <tr className="bg-zinc-50 text-zinc-700">
                      <th className="px-4 py-2 text-left">Channel</th>
                      <th className="px-4 py-2 text-left">Accounts Reached</th>
                      <th className="px-4 py-2 text-left">Connectivity %</th>
                      <th className="px-4 py-2 text-left">RPCs</th>
                      <th className="px-4 py-2 text-left">RPC Rate %</th>
                      <th className="px-4 py-2 text-left">PTPs</th>
                      <th className="px-4 py-2 text-left">PTP Rate %</th>
                      <th className="px-4 py-2 text-left">PTP Kept %</th>
                      <th className="px-4 py-2 text-left">$ Recovered</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-4 py-2 font-medium text-zinc-900">
                        Voice
                      </td>
                      <td className="px-4 py-2">25,000</td>
                      <td className="px-4 py-2">68.5%</td>
                      <td className="px-4 py-2">17,125</td>
                      <td className="px-4 py-2">68.5%</td>
                      <td className="px-4 py-2">3,425</td>
                      <td className="px-4 py-2">20%</td>
                      <td className="px-4 py-2">82.5%</td>
                      <td className="px-4 py-2">$1,370,000</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-2 font-medium text-zinc-900">
                        SMS
                      </td>
                      <td className="px-4 py-2">18,750</td>
                      <td className="px-4 py-2">92.5%</td>
                      <td className="px-4 py-2">4,688</td>
                      <td className="px-4 py-2">25%</td>
                      <td className="px-4 py-2">844</td>
                      <td className="px-4 py-2">18%</td>
                      <td className="px-4 py-2">80.2%</td>
                      <td className="px-4 py-2">$337,600</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-2 font-medium text-zinc-900">
                        Email
                      </td>
                      <td className="px-4 py-2">12,500</td>
                      <td className="px-4 py-2">72.5%</td>
                      <td className="px-4 py-2">2,813</td>
                      <td className="px-4 py-2">22.5%</td>
                      <td className="px-4 py-2">479</td>
                      <td className="px-4 py-2">17%</td>
                      <td className="px-4 py-2">78.5%</td>
                      <td className="px-4 py-2">$191,200</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-2 font-medium text-zinc-900">
                        WhatsApp
                      </td>
                      <td className="px-4 py-2">6,250</td>
                      <td className="px-4 py-2">90%</td>
                      <td className="px-4 py-2">1,688</td>
                      <td className="px-4 py-2">27%</td>
                      <td className="px-4 py-2">320</td>
                      <td className="px-4 py-2">19%</td>
                      <td className="px-4 py-2">81%</td>
                      <td className="px-4 py-2">$128,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Campaign Summary Table */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
              <div className="font-semibold text-zinc-900 mb-2">
                Campaign Summary
              </div>
              <div className="text-xs text-zinc-500 mb-4">
                Overview of all collection campaigns
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border-separate border-spacing-y-2">
                  <thead>
                    <tr className="bg-zinc-50 text-zinc-700">
                      <th className="px-4 py-2 text-left">Campaign</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Accounts</th>
                      <th className="px-4 py-2 text-left">Outstanding $</th>
                      <th className="px-4 py-2 text-left">Connectivity %</th>
                      <th className="px-4 py-2 text-left">RPC %</th>
                      <th className="px-4 py-2 text-left">PTP %</th>
                      <th className="px-4 py-2 text-left">Recovered $</th>
                      <th className="px-4 py-2 text-left">Recovery %</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-4 py-2 font-medium text-zinc-900">
                        Campaign 1<br />
                        <span className="text-xs text-zinc-400">CAM-001</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                          Active
                        </span>
                      </td>
                      <td className="px-4 py-2">12,500</td>
                      <td className="px-4 py-2">$6,250,000</td>
                      <td className="px-4 py-2">72.5%</td>
                      <td className="px-4 py-2">45.2%</td>
                      <td className="px-4 py-2">21.5%</td>
                      <td className="px-4 py-2">$843,750</td>
                      <td className="px-4 py-2">13.5%</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-2 font-medium text-zinc-900">
                        Campaign 2<br />
                        <span className="text-xs text-zinc-400">CAM-002</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                          Active
                        </span>
                      </td>
                      <td className="px-4 py-2">8,750</td>
                      <td className="px-4 py-2">$4,375,000</td>
                      <td className="px-4 py-2">68.2%</td>
                      <td className="px-4 py-2">42.8%</td>
                      <td className="px-4 py-2">18.7%</td>
                      <td className="px-4 py-2">$525,000</td>
                      <td className="px-4 py-2">12%</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-2 font-medium text-zinc-900">
                        Campaign 3<br />
                        <span className="text-xs text-zinc-400">CAM-003</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="inline-block bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                          Completed
                        </span>
                      </td>
                      <td className="px-4 py-2">6,250</td>
                      <td className="px-4 py-2">$3,125,000</td>
                      <td className="px-4 py-2">75.8%</td>
                      <td className="px-4 py-2">48.5%</td>
                      <td className="px-4 py-2">23.2%</td>
                      <td className="px-4 py-2">$468,750</td>
                      <td className="px-4 py-2">15%</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-2 font-medium text-zinc-900">
                        Campaign 4<br />
                        <span className="text-xs text-zinc-400">CAM-004</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="inline-block bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                          Paused
                        </span>
                      </td>
                      <td className="px-4 py-2">4,500</td>
                      <td className="px-4 py-2">$2,250,000</td>
                      <td className="px-4 py-2">65.5%</td>
                      <td className="px-4 py-2">40.2%</td>
                      <td className="px-4 py-2">16.8%</td>
                      <td className="px-4 py-2">$247,500</td>
                      <td className="px-4 py-2">11%</td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-2 font-medium text-zinc-900">
                        Campaign 5<br />
                        <span className="text-xs text-zinc-400">CAM-005</span>
                      </td>
                      <td className="px-4 py-2">
                        <span className="inline-block bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-semibold">
                          Active
                        </span>
                      </td>
                      <td className="px-4 py-2">15,000</td>
                      <td className="px-4 py-2">$7,500,000</td>
                      <td className="px-4 py-2">78.2%</td>
                      <td className="px-4 py-2">25.6%</td>
                      <td className="px-4 py-2">25.8%</td>
                      <td className="px-4 py-2">$675,000</td>
                      <td className="px-4 py-2">9%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        {tab === "Compliance" && (
          <>
            <div className="text-2xl font-bold text-zinc-900 mb-4">
              Compliance
            </div>
            {/* Compliance KPIs Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <MetricCard
                icon={<ShieldCheckIcon className="w-5 h-5" />}
                label="Overall Compliance"
                value="99.2%"
                sublabel={"+0.3% from last month"}
              />
              <MetricCard
                icon={<SignalIcon className="w-5 h-5" />}
                label="Reachability Compliance"
                value="98.7%"
                sublabel={"+0.2% from last month"}
              />
              <MetricCard
                icon={<ChatBubbleLeftRightIcon className="w-5 h-5" />}
                label="Conversational Compliance"
                value="99.5%"
                sublabel={"+0.4% from last month"}
              />
              <MetricCard
                icon={<ExclamationTriangleIcon className="w-5 h-5" />}
                label="Complaint Rate"
                value="0.31%"
                sublabel={"-0.05% from last month"}
              />
            </div>

            {/* Compliance Rate Chart */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 mb-8">
              <div className="font-semibold text-zinc-900 mb-2">
                Compliance Rate
              </div>
              <div className="text-xs text-zinc-500 mb-4">
                Compliance rate over time
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart
                  data={[
                    { date: "2023-10-01", compliance: 99.2 },
                    { date: "2023-10-02", compliance: 99.2 },
                    { date: "2023-10-03", compliance: 99.2 },
                    { date: "2023-10-04", compliance: 99.2 },
                    { date: "2023-10-05", compliance: 99.2 },
                    { date: "2023-10-06", compliance: 99.2 },
                    { date: "2023-10-07", compliance: 99.2 },
                  ]}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} tickFormatter={(v) => v + "%"} />
                  <Tooltip formatter={(v) => v + "%"} />
                  <Line
                    type="monotone"
                    dataKey="compliance"
                    name="compliance"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Complaint Log Table */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
              <div className="font-semibold text-zinc-900 mb-2">
                Complaint Log
              </div>
              <div className="text-xs text-zinc-500 mb-4">
                Detailed record of customer complaints
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border-separate border-spacing-y-2">
                  <thead>
                    <tr className="bg-zinc-50 text-zinc-700">
                      <th className="px-4 py-2 text-left">Complaint ID</th>
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Account ID</th>
                      <th className="px-4 py-2 text-left">Channel</th>
                      <th className="px-4 py-2 text-left">Reason</th>
                      <th className="px-4 py-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="bg-white">
                      <td className="px-4 py-2 font-medium text-zinc-900">
                        COMP-001
                      </td>
                      <td className="px-4 py-2">Oct 25, 2023</td>
                      <td className="px-4 py-2">ACC-12345</td>
                      <td className="px-4 py-2">Voice</td>
                      <td className="px-4 py-2">Excessive Contact</td>
                      <td className="px-4 py-2">
                        Customer complained about receiving too many calls in a
                        short period.
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-2 font-medium text-zinc-900">
                        COMP-002
                      </td>
                      <td className="px-4 py-2">Oct 23, 2023</td>
                      <td className="px-4 py-2">ACC-23456</td>
                      <td className="px-4 py-2">SMS</td>
                      <td className="px-4 py-2">Disputed Debt</td>
                      <td className="px-4 py-2">
                        Customer claims they have already paid the debt in
                        question.
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-2 font-medium text-zinc-900">
                        COMP-003
                      </td>
                      <td className="px-4 py-2">Oct 22, 2023</td>
                      <td className="px-4 py-2">ACC-34567</td>
                      <td className="px-4 py-2">Email</td>
                      <td className="px-4 py-2">Payment Issues</td>
                      <td className="px-4 py-2">
                        Customer unable to make payment through the provided
                        link.
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-2 font-medium text-zinc-900">
                        COMP-004
                      </td>
                      <td className="px-4 py-2">Oct 20, 2023</td>
                      <td className="px-4 py-2">ACC-45678</td>
                      <td className="px-4 py-2">Voice</td>
                      <td className="px-4 py-2">Rude Agent/Bot</td>
                      <td className="px-4 py-2">
                        Customer felt the bot was not understanding or was rude.
                      </td>
                    </tr>
                    <tr className="bg-white">
                      <td className="px-4 py-2 font-medium text-zinc-900">
                        COMP-005
                      </td>
                      <td className="px-4 py-2">Oct 18, 2023</td>
                      <td className="px-4 py-2">ACC-56789</td>
                      <td className="px-4 py-2">Voice</td>
                      <td className="px-4 py-2">Wrong Party Contact</td>
                      <td className="px-4 py-2">
                        Person contacted claims they are not the debtor.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        {tab === "Voice" && (
          <>
            <div className="text-2xl font-bold text-zinc-900 mb-4">Voice</div>
            {/* Voice KPIs Row */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
              <MetricCard
                icon={<PhoneIcon className="w-5 h-5" />}
                label="Total Calls"
                value="41,800"
                sublabel={"+12.5% from last month"}
              />
              <MetricCard
                icon={<SignalIcon className="w-5 h-5" />}
                label="Connectivity %"
                value="68.5%"
                sublabel={"+2.4% from last month"}
              />
              <MetricCard
                icon={<ClockIcon className="w-5 h-5" />}
                label="Avg Handle Time"
                value="178s"
                sublabel={"-5.3% from last month"}
              />
              <MetricCard
                icon={<SpeakerWaveIcon className="w-5 h-5" />}
                label="Containment Rate"
                value="74.2%"
                sublabel={"+4.5% from last month"}
              />
              <MetricCard
                icon={<BanknotesIcon className="w-5 h-5" />}
                label="$ Recovered"
                value="$2.09M"
                sublabel={"+15.1% from last month"}
              />
            </div>

            {/* AHT and Containment Rate + Transfer Reasons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* AHT and Containment Rate Chart */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
                <div className="font-semibold text-zinc-900 mb-2">
                  AHT and Containment Rate
                </div>
                <div className="text-xs text-zinc-500 mb-4">
                  Average handle time and bot containment rate over time
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart
                    data={[
                      { date: "Oct 1", aht: 200, containment: 70 },
                      { date: "Oct 8", aht: 190, containment: 72 },
                      { date: "Oct 15", aht: 185, containment: 73 },
                      { date: "Oct 22", aht: 180, containment: 74 },
                      { date: "Oct 29", aht: 178, containment: 74.2 },
                    ]}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis
                      yAxisId="left"
                      domain={[0, 220]}
                      tickFormatter={(v) => v + "s"}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      domain={[0, 100]}
                      tickFormatter={(v) => v + "%"}
                    />
                    <Tooltip
                      formatter={(v, n) => (n === "aht" ? v + "s" : v + "%")}
                    />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="aht"
                      name="AHT (seconds)"
                      stroke="#6366f1"
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="containment"
                      name="Containment Rate"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* Transfer Reasons Bar Chart */}
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 flex flex-col justify-between">
                <div>
                  <div className="font-semibold text-zinc-900 mb-2">
                    Transfer Reasons
                  </div>
                  <div className="text-xs text-zinc-500 mb-4">
                    Reasons for transfers from bot to human agent
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
                    <span className="text-sm text-zinc-700 flex-1">
                      Complex Question: 35%
                    </span>
                    <span className="text-xs text-zinc-400">35</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500 inline-block"></span>
                    <span className="text-sm text-zinc-700 flex-1">
                      Payment Arrangement: 28%
                    </span>
                    <span className="text-xs text-zinc-400">28</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
                    <span className="text-sm text-zinc-700 flex-1">
                      Dispute: 22%
                    </span>
                    <span className="text-xs text-zinc-400">22</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
                    <span className="text-sm text-zinc-700 flex-1">
                      Technical Issue: 15%
                    </span>
                    <span className="text-xs text-zinc-400">15</span>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex h-3 w-full rounded-full overflow-hidden bg-zinc-200">
                    <div
                      className="bg-blue-500 h-full"
                      style={{ width: "35%" }}
                    ></div>
                    <div
                      className="bg-green-500 h-full"
                      style={{ width: "28%" }}
                    ></div>
                    <div
                      className="bg-yellow-400 h-full"
                      style={{ width: "22%" }}
                    ></div>
                    <div
                      className="bg-red-500 h-full"
                      style={{ width: "15%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Voice Engagement Funnel */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 mb-8">
              <div className="font-semibold text-zinc-900 mb-2">
                Voice Engagement Funnel
              </div>
              <div className="text-xs text-zinc-500 mb-4">
                Conversion rates through the voice engagement process
              </div>
              <div className="flex flex-col gap-2">
                <div className="bg-blue-600 text-white font-semibold rounded-md px-4 py-2 w-full max-w-2xl">
                  Total Calls: 41,800
                </div>
                <div className="bg-blue-500 text-white font-semibold rounded-md px-4 py-2 w-11/12 max-w-xl">
                  Connected: 28,633 (68.5%)
                </div>
                <div className="bg-blue-400 text-white font-semibold rounded-md px-4 py-2 w-9/12 max-w-lg">
                  Right Party Contact: 18,894 (45.2% of total)
                </div>
                <div className="bg-blue-300 text-white font-semibold rounded-md px-4 py-2 w-7/12 max-w-md">
                  Promise to Pay: 8,569 (20.5% of total)
                </div>
                <div className="bg-blue-200 text-blue-900 font-semibold rounded-md px-4 py-2 w-6/12 max-w-sm">
                  PTP Kept: 7,022 (16.8% of total)
                </div>
                <div className="bg-blue-100 text-blue-900 font-semibold rounded-md px-4 py-2 w-5/12 max-w-xs">
                  Resolution/Recovery: 5,225 (12.5% of total)
                </div>
              </div>
            </div>

            {/* Voice Bot Performance Chart */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
              <div className="font-semibold text-zinc-900 mb-2">
                Voice Bot Performance
              </div>
              <div className="text-xs text-zinc-500 mb-4">
                Success, transfer, and abandon rates over time
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart
                  data={[
                    {
                      date: "2023-10-01",
                      success: 74.2,
                      transfer: 18.5,
                      abandon: 7.3,
                    },
                    {
                      date: "2023-10-02",
                      success: 74.5,
                      transfer: 18.3,
                      abandon: 7.2,
                    },
                    {
                      date: "2023-10-03",
                      success: 74.8,
                      transfer: 18.1,
                      abandon: 7.1,
                    },
                    {
                      date: "2023-10-04",
                      success: 75.0,
                      transfer: 18.0,
                      abandon: 7.0,
                    },
                    {
                      date: "2023-10-05",
                      success: 75.2,
                      transfer: 17.8,
                      abandon: 7.0,
                    },
                    {
                      date: "2023-10-06",
                      success: 75.5,
                      transfer: 17.6,
                      abandon: 6.9,
                    },
                    {
                      date: "2023-10-07",
                      success: 75.7,
                      transfer: 17.5,
                      abandon: 6.8,
                    },
                  ]}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} tickFormatter={(v) => v + "%"} />
                  <Tooltip formatter={(v) => v + "%"} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="success"
                    name="success"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="transfer"
                    name="transfer"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="abandon"
                    name="abandon"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
        {tab === "SMS" && (
          <>
            <div className="text-2xl font-bold text-zinc-900 mb-4">SMS</div>
            {/* SMS KPIs Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
              <MetricCard
                icon={<ChatBubbleBottomCenterTextIcon className="w-5 h-5" />}
                label="Total SMS Sent"
                value="41,800"
                sublabel={"+12.5% from last month"}
              />
              <MetricCard
                icon={<CheckCircleIcon className="w-5 h-5" />}
                label="Delivery Rate"
                value="98.7%"
                sublabel={"+0.2% from last month"}
              />
              <MetricCard
                icon={<CursorArrowRaysIcon className="w-5 h-5" />}
                label="Click-Through Rate"
                value="14.1%"
                sublabel={"+1.8% from last month"}
              />
              <MetricCard
                icon={<ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />}
                label="Response Rate"
                value="10.0%"
                sublabel={"+1.2% from last month"}
              />
              <MetricCard
                icon={<BanknotesIcon className="w-5 h-5" />}
                label="$ Recovered"
                value="$1.20M"
                sublabel={"+18.5% from last month"}
              />
            </div>

            {/* SMS Performance Chart */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 mb-8">
              <div className="font-semibold text-zinc-900 mb-2">
                SMS Performance
              </div>
              <div className="text-xs text-zinc-500 mb-4">
                Delivery and response rates over time
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart
                  data={[
                    { date: "2023-10-01", delivery: 98.7, response: 10.0 },
                    { date: "2023-10-02", delivery: 98.8, response: 10.1 },
                    { date: "2023-10-03", delivery: 98.9, response: 10.2 },
                    { date: "2023-10-04", delivery: 99.0, response: 10.3 },
                    { date: "2023-10-05", delivery: 99.1, response: 10.4 },
                    { date: "2023-10-06", delivery: 99.2, response: 10.5 },
                    { date: "2023-10-07", delivery: 99.3, response: 10.6 },
                  ]}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} tickFormatter={(v) => v + "%"} />
                  <Tooltip formatter={(v) => v + "%"} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="delivery"
                    name="delivery"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="response"
                    name="response"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* SMS Delivery Rate and CTR Chart */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 mb-8">
              <div className="font-semibold text-zinc-900 mb-2">
                SMS Delivery Rate and CTR
              </div>
              <div className="text-xs text-zinc-500 mb-4">
                Delivery and click-through rates over time
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart
                  data={[
                    { date: "Oct 1", delivery: 98.7, ctr: 14.1 },
                    { date: "Oct 8", delivery: 98.8, ctr: 14.2 },
                    { date: "Oct 15", delivery: 98.9, ctr: 14.3 },
                    { date: "Oct 22", delivery: 99.0, ctr: 14.4 },
                    { date: "Oct 29", delivery: 99.1, ctr: 14.5 },
                  ]}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} tickFormatter={(v) => v + "%"} />
                  <Tooltip formatter={(v) => v + "%"} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="delivery"
                    name="Delivery Rate"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="ctr"
                    name="CTR"
                    stroke="#6366f1"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* SMS Opt-out Rate Chart */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
              <div className="font-semibold text-zinc-900 mb-2">
                SMS Opt-out Rate
              </div>
              <div className="text-xs text-zinc-500 mb-4">
                Percentage of recipients who opted out over time
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart
                  data={[
                    { date: "Oct 1", optout: 0.85 },
                    { date: "Oct 8", optout: 0.88 },
                    { date: "Oct 15", optout: 0.92 },
                    { date: "Oct 22", optout: 0.89 },
                    { date: "Oct 29", optout: 0.84 },
                  ]}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis
                    domain={[0, 1]}
                    tickFormatter={(v) => (v * 100).toFixed(2) + "%"}
                  />
                  <Tooltip formatter={(v) => (v * 100).toFixed(2) + "%"} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="optout"
                    name="Opt-out Rate"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
        {tab === "Email" && (
          <>
            <div className="text-2xl font-bold text-zinc-900 mb-4">Email</div>
            {/* Email KPIs Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <MetricCard
                icon={<EnvelopeIcon className="w-5 h-5" />}
                label="Total Emails Sent"
                value="43,500"
                sublabel={"Last 30 days\n+5.2% from previous period"}
              />
              <MetricCard
                icon={<CheckCircleIcon className="w-5 h-5" />}
                label="Email Delivery Rate"
                value="97.0%"
                sublabel={"Last 30 days\n+0.5% from previous period"}
              />
              <MetricCard
                icon={<EyeIcon className="w-5 h-5" />}
                label="Email Open Rate"
                value="42.3%"
                sublabel={"Last 30 days\n+1.8% from previous period"}
              />
              <MetricCard
                icon={<CursorArrowRaysIcon className="w-5 h-5" />}
                label="Email Click-Through Rate"
                value="9.7%"
                sublabel={"Last 30 days\n+0.3% from previous period"}
              />
            </div>

            {/* Email Performance Chart */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 mb-8">
              <div className="font-semibold text-zinc-900 mb-2">
                Email Performance
              </div>
              <div className="text-xs text-zinc-500 mb-4">
                Delivery, open, and click rates over time
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <LineChart
                  data={[
                    {
                      date: "2023-10-01",
                      delivery: 97.0,
                      open: 42.3,
                      click: 9.7,
                    },
                    {
                      date: "2023-10-02",
                      delivery: 97.1,
                      open: 42.4,
                      click: 9.8,
                    },
                    {
                      date: "2023-10-03",
                      delivery: 97.2,
                      open: 42.5,
                      click: 9.9,
                    },
                    {
                      date: "2023-10-04",
                      delivery: 97.3,
                      open: 42.6,
                      click: 10.0,
                    },
                    {
                      date: "2023-10-05",
                      delivery: 97.4,
                      open: 42.7,
                      click: 10.1,
                    },
                    {
                      date: "2023-10-06",
                      delivery: 97.5,
                      open: 42.8,
                      click: 10.2,
                    },
                    {
                      date: "2023-10-07",
                      delivery: 97.6,
                      open: 42.9,
                      click: 10.3,
                    },
                  ]}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} tickFormatter={(v) => v + "%"} />
                  <Tooltip formatter={(v) => v + "%"} />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="delivery"
                    name="delivery"
                    stroke="#2563eb"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="open"
                    name="open"
                    stroke="#f59e42"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="click"
                    name="click"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Email Engagement Funnel */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6 mb-8">
              <div className="font-semibold text-zinc-900 mb-2">
                Email Engagement Funnel
              </div>
              <div className="text-xs text-zinc-500 mb-4">
                Conversion through the email engagement process
              </div>
              <div className="flex flex-col gap-2">
                <div className="bg-blue-600 text-white font-semibold rounded-md px-4 py-2 w-full max-w-2xl">
                  Sent: 43,500 (100%)
                </div>
                <div className="bg-blue-500 text-white font-semibold rounded-md px-4 py-2 w-11/12 max-w-xl">
                  Delivered: 42,195 (97%)
                </div>
                <div className="bg-blue-400 text-white font-semibold rounded-md px-4 py-2 w-9/12 max-w-lg">
                  Opened: 17,680 (42.3%)
                </div>
                <div className="bg-blue-300 text-white font-semibold rounded-md px-4 py-2 w-7/12 max-w-md">
                  Clicked: 4,220 (10%)
                </div>
                {/* Add more steps if needed */}
              </div>
            </div>

            {/* Email Engagement Map */}
            <div className="bg-white rounded-xl border border-zinc-200 shadow-sm p-6">
              <div className="font-semibold text-zinc-900 mb-2">
                Email Engagement Map
              </div>
              <div className="text-xs text-zinc-500 mb-4">
                Geographical distribution of email engagement
              </div>
              <div className="flex flex-row gap-8 items-start">
                <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 text-sm min-w-[200px]">
                  <div className="font-semibold text-zinc-700 mb-2">
                    Engagement by Region
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                      <span>North America</span>
                      <span>48.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Europe</span>
                      <span>32.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Asia Pacific</span>
                      <span>13.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Latin America</span>
                      <span>4.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Other</span>
                      <span>2.2%</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex items-center justify-center min-h-[180px] text-zinc-400 bg-zinc-100 rounded-lg border border-dashed border-zinc-200">
                  World Map Visualization
                  <br />
                  <span className="text-xs">
                    Geographic distribution of email engagement would appear
                    here
                  </span>
                </div>
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
