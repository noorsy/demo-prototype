import React, { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import PageHeader from "./PageHeader";
import {
  ChevronDownIcon,
  UsersIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CheckCircleIcon,
  TrendingUpIcon,
  ShieldCheckIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChartPieIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/solid";

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

function FilterDropdown({ label, options, value, onChange }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-zinc-500 font-medium mb-1">{label}</span>
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
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  sublabel,
  color = "bg-zinc-100 text-zinc-900",
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
      <div className="sticky top-0 z-20 bg-white border-b border-zinc-200 px-6 py-4 flex flex-wrap gap-6 items-end shadow-sm">
        <FilterDropdown
          label="Product"
          options={productOptions}
          value={product}
          onChange={setProduct}
        />
        <FilterDropdown
          label="DPD Bucket"
          options={dpdOptions}
          value={dpd}
          onChange={setDpd}
        />
        <FilterDropdown
          label="Segment/Cohort"
          options={segmentOptions}
          value={segment}
          onChange={setSegment}
        />
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500 font-medium mb-1">
            Date Range
          </span>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <MetricCard
                icon={<ChartBarIcon className="w-5 h-5" />}
                label="Recovery Rate Over Time"
                value="Trend"
              />
              <MetricCard
                icon={<ChartPieIcon className="w-5 h-5" />}
                label="Portfolio Flow Analysis"
                value="See Chart"
              />
              <MetricCard
                icon={<ChartBarIcon className="w-5 h-5" />}
                label="Recovery by DPD Bucket"
                value="See Chart"
              />
              <MetricCard
                icon={<CurrencyDollarIcon className="w-5 h-5" />}
                label="Recovery Amount (Trend)"
                value="See Chart"
              />
              <MetricCard
                icon={<ChartPieIcon className="w-5 h-5" />}
                label="DPD Bucket Breakdown"
                value="See Chart"
              />
              <MetricCard
                icon={<ShieldCheckIcon className="w-5 h-5" />}
                label="Risk Metrics"
                value="See Details"
              />
            </div>
          </>
        )}
        {tab === "Engagement" && (
          <>
            <div className="text-2xl font-bold text-zinc-900 mb-4">
              Engagement Analytics
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <MetricCard
                icon={<UsersIcon className="w-5 h-5" />}
                label="Accounts Reached"
                value="9,200"
              />
              <MetricCard
                icon={<ArrowTrendingUpIcon className="w-5 h-5" />}
                label="Connectivity %"
                value="74%"
              />
              <MetricCard
                icon={<CheckCircleIcon className="w-5 h-5" />}
                label="RPC Rate %"
                value="62%"
              />
              <MetricCard
                icon={<CheckCircleIcon className="w-5 h-5" />}
                label="PTP Rate %"
                value="41%"
              />
              <MetricCard
                icon={<CheckCircleIcon className="w-5 h-5" />}
                label="Resolution Rate %"
                value="35%"
              />
              <MetricCard
                icon={<CurrencyDollarIcon className="w-5 h-5" />}
                label="Collection Rate %"
                value="29%"
              />
              <MetricCard
                icon={<ChartBarIcon className="w-5 h-5" />}
                label="Engagement Rates Over Time"
                value="Trend"
              />
              <MetricCard
                icon={<ChartPieIcon className="w-5 h-5" />}
                label="Engagement Funnel"
                value="See Funnel"
              />
              <MetricCard
                icon={<ChartBarIcon className="w-5 h-5" />}
                label="Channel Performance"
                value="Compare"
              />
              <MetricCard
                icon={<ChartPieIcon className="w-5 h-5" />}
                label="Campaign Summary"
                value="See All"
              />
            </div>
          </>
        )}
        {tab === "Compliance" && (
          <>
            <div className="text-2xl font-bold text-zinc-900 mb-4">
              Compliance Analytics
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <MetricCard
                icon={<ShieldCheckIcon className="w-5 h-5" />}
                label="Overall Compliance Rate"
                value="98%"
              />
              <MetricCard
                icon={<CheckCircleIcon className="w-5 h-5" />}
                label="Reachability Compliance %"
                value="99%"
              />
              <MetricCard
                icon={<CheckCircleIcon className="w-5 h-5" />}
                label="Conversational Compliance %"
                value="97%"
              />
              <MetricCard
                icon={
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                }
                label="Complaint Rate %"
                value="0.8%"
              />
              <MetricCard
                icon={<ChartBarIcon className="w-5 h-5" />}
                label="Compliance Rate Over Time"
                value="Trend"
              />
              <MetricCard
                icon={<ChartPieIcon className="w-5 h-5" />}
                label="Complaint Log"
                value="See Log"
              />
            </div>
          </>
        )}
        {tab === "Voice" && (
          <>
            <div className="text-2xl font-bold text-zinc-900 mb-4">
              Voice Channel Analytics
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <MetricCard
                icon={<PhoneIcon className="w-5 h-5" />}
                label="Total Calls"
                value="18,000"
              />
              <MetricCard
                icon={<ArrowTrendingUpIcon className="w-5 h-5" />}
                label="Connectivity % (Voice)"
                value="71%"
              />
              <MetricCard
                icon={<ChartBarIcon className="w-5 h-5" />}
                label="Avg Handle Time (AHT)"
                value="4:12"
                sublabel="min:sec"
              />
              <MetricCard
                icon={<CheckCircleIcon className="w-5 h-5" />}
                label="Containment Rate %"
                value="82%"
              />
              <MetricCard
                icon={<CurrencyDollarIcon className="w-5 h-5" />}
                label="$ Recovered (Voice)"
                value="$1,200,000"
              />
              <MetricCard
                icon={<ChartBarIcon className="w-5 h-5" />}
                label="AHT & Containment Trend"
                value="Trend"
              />
              <MetricCard
                icon={<ChartPieIcon className="w-5 h-5" />}
                label="Transfer Reasons"
                value="See Breakdown"
              />
              <MetricCard
                icon={<ChartPieIcon className="w-5 h-5" />}
                label="Voice Engagement Funnel"
                value="See Funnel"
              />
              <MetricCard
                icon={<ChartBarIcon className="w-5 h-5" />}
                label="Bot Performance Trend"
                value="Trend"
              />
            </div>
          </>
        )}
        {tab === "SMS" && (
          <>
            <div className="text-2xl font-bold text-zinc-900 mb-4">
              SMS Channel Analytics
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <MetricCard
                icon={<DevicePhoneMobileIcon className="w-5 h-5" />}
                label="Total SMS Sent"
                value="32,000"
              />
              <MetricCard
                icon={<ArrowTrendingUpIcon className="w-5 h-5" />}
                label="Delivery Rate %"
                value="93%"
              />
              <MetricCard
                icon={<ArrowTrendingUpIcon className="w-5 h-5" />}
                label="Click-Through Rate (CTR) %"
                value="18%"
              />
              <MetricCard
                icon={<CheckCircleIcon className="w-5 h-5" />}
                label="Response Rate %"
                value="22%"
              />
              <MetricCard
                icon={<CheckCircleIcon className="w-5 h-5" />}
                label="PTP Rate % (SMS)"
                value="11%"
              />
              <MetricCard
                icon={<CurrencyDollarIcon className="w-5 h-5" />}
                label="$ Recovered (SMS)"
                value="$320,000"
              />
              <MetricCard
                icon={<ChartBarIcon className="w-5 h-5" />}
                label="SMS Performance Trend"
                value="Trend"
              />
              <MetricCard
                icon={<ChartBarIcon className="w-5 h-5" />}
                label="Delivery & CTR Trend"
                value="Trend"
              />
              <MetricCard
                icon={
                  <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                }
                label="Opt-out Rate %"
                value="2.1%"
              />
            </div>
          </>
        )}
        {tab === "Email" && (
          <>
            <div className="text-2xl font-bold text-zinc-900 mb-4">
              Email Channel Analytics
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <MetricCard
                icon={<EnvelopeIcon className="w-5 h-5" />}
                label="Total Emails Sent"
                value="41,000"
              />
              <MetricCard
                icon={<ArrowTrendingUpIcon className="w-5 h-5" />}
                label="Delivery Rate %"
                value="96%"
              />
              <MetricCard
                icon={<ArrowTrendingUpIcon className="w-5 h-5" />}
                label="Open Rate %"
                value="44%"
              />
              <MetricCard
                icon={<ArrowTrendingUpIcon className="w-5 h-5" />}
                label="Click-Through Rate (CTR) %"
                value="13%"
              />
              <MetricCard
                icon={<ChartBarIcon className="w-5 h-5" />}
                label="Email Performance Trend"
                value="Trend"
              />
              <MetricCard
                icon={<ChartPieIcon className="w-5 h-5" />}
                label="Email Engagement Funnel"
                value="See Funnel"
              />
              <MetricCard
                icon={<ChartPieIcon className="w-5 h-5" />}
                label="Engagement Map"
                value="See Map"
              />
            </div>
          </>
        )}
        {tab === "Utilization" && (
          <>
            <div className="text-2xl font-bold text-zinc-900 mb-4">
              Channel Utilization & Cost
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <MetricCard
                icon={<PhoneIcon className="w-5 h-5" />}
                label="Total Voice Minutes"
                value="8,900"
                sublabel="min"
              />
              <MetricCard
                icon={<DevicePhoneMobileIcon className="w-5 h-5" />}
                label="Total SMS Segments"
                value="29,000"
              />
              <MetricCard
                icon={<EnvelopeIcon className="w-5 h-5" />}
                label="Total Emails Sent"
                value="41,000"
              />
              <MetricCard
                icon={<ChartBarIcon className="w-5 h-5" />}
                label="Voice Minutes Over Time"
                value="Trend"
              />
              <MetricCard
                icon={<ChartPieIcon className="w-5 h-5" />}
                label="Voice Minutes by Type"
                value="See Breakdown"
              />
              <MetricCard
                icon={<ChartBarIcon className="w-5 h-5" />}
                label="SMS Segments Trend"
                value="Trend"
              />
              <MetricCard
                icon={<ChartBarIcon className="w-5 h-5" />}
                label="Emails Sent Trend"
                value="Trend"
              />
              <MetricCard
                icon={<CurrencyDollarIcon className="w-5 h-5" />}
                label="Channel Cost Analysis"
                value="See Cost"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
