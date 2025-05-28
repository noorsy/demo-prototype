import React, { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import PageHeader from "./PageHeader";
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
    <div className="min-h-screen bg-zinc-100 font-inter">
      <PageHeader
        title="Analytics"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Analytics" }]}
      />
      {/* Sticky Global Filters */}
      <div className="sticky top-0 z-20 bg-white border-b border-zinc-200 px-6 py-4 flex flex-row gap-4 items-center justify-end shadow-sm">
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
        <div className="flex gap-2 items-center">
          <input
            type="date"
            className="px-3 py-2 border border-zinc-200 rounded-lg text-sm text-zinc-900 bg-white"
            value={dateRange.from}
            onChange={(e) =>
              setDateRange((r) => ({ ...r, from: e.target.value }))
            }
          />
          <span className="text-zinc-400">to</span>
          <input
            type="date"
            className="px-3 py-2 border border-zinc-200 rounded-lg text-sm text-zinc-900 bg-white"
            value={dateRange.to}
            onChange={(e) =>
              setDateRange((r) => ({ ...r, to: e.target.value }))
            }
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-[72px] z-10 bg-white px-6 border-b border-zinc-200 flex gap-2 py-2">
        {tabOptions.map((t) => (
          <button
            key={t}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
              tab === t
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
            }`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto p-8">
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
        {/* ...other tabs... */}
      </div>
    </div>
  );
}
