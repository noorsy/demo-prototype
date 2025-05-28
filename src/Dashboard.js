import React from "react";
import PageHeader from "./PageHeader";

const metrics = [
  {
    label: "Today's Collection",
    value: "$42,850",
    change: "+12% from yesterday",
    changeType: "up",
  },
  {
    label: "Today's Balance Moved",
    value: "$68,320",
    change: "+8% from yesterday",
    changeType: "up",
  },
  {
    label: "Today's Collection Forecasting",
    value: "$51,200",
    change: "Based on current trends",
    changeType: "neutral",
  },
  {
    label: "Today's Cure Rate",
    value: "18.7%",
    change: "-3.2% from yesterday",
    changeType: "down",
  },
];

const tasks = [
  {
    text: "Review calls where agents didn't get the resolution they wanted",
    action: "View Calls",
  },
  {
    text: "Review calls from frustrated users with negative sentiments",
    action: "View Calls",
  },
  {
    text: "Review the strategy for 'First-Time Delinquent' has been changed",
    action: "Reviews & Approve",
    badge: "Pro New",
  },
  {
    text: "We have updated the email copy for cohort 'Payment History Good'",
    action: "Reviews & Approve",
  },
];

const logs = [
  {
    text: "Strategy 'Payment History Good' updated",
    time: "Today at 2:45 PM",
    icon: "arrow-up-right",
  },
  {
    text: "New AI model deployed for call analysis",
    time: "Today at 11:30 AM",
    icon: "star",
  },
  {
    text: "Email template for 'Early DPD' updated",
    time: "Today at 10:10 AM",
    icon: "mail",
  },
  {
    text: "Daily data sync completed",
    time: "Today at 9:00 AM",
    icon: "refresh",
  },
  {
    text: "Weekly performance report generated",
    time: "Yesterday at 5:00 PM",
    icon: "bar-chart",
  },
];

const immediateAction = {
  title: "Charge-off Breach Forecast",
  desc: "Accounts at 120+ DPD at risk of charge-off",
  risk: "High Risk",
  count: 42,
  message:
    "These accounts require immediate intervention to prevent charge-off within the next 7 days.",
};

const campaigns = [
  {
    name: "Early DPD Payment Reminder",
    targeting: "2-70 DPD accounts",
    start: "Apr 18, 2025",
    end: "Apr 30, 2025",
    progress: 49,
    accounts: "1,245 / 2,500",
    status: "Running",
  },
  {
    name: "Payment History Good - Courtesy Reminder",
    targeting: "recurring payers",
    start: "Apr 20, 2025",
    end: "Apr 27, 2025",
    progress: 58,
    accounts: "876 / 1,500",
    status: "Running",
  },
  {
    name: "Late Stage Recovery",
    targeting: "40-60 DPD accounts",
    start: "Apr 15, 2025",
    end: "May 1, 2025",
    progress: 76,
    accounts: "342 / 450",
    status: "Running",
  },
];

function ProgressBar({ percent }) {
  return (
    <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden">
      <div
        className="h-2 bg-blue-600 rounded-full transition-all duration-500"
        style={{ width: percent + "%" }}
      />
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Welcome back, Alex" />
      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="bg-white rounded-xl border border-zinc-200 p-5 flex flex-col gap-1 shadow-sm"
          >
            <div className="text-xs text-zinc-500 font-medium mb-1">
              {m.label}
            </div>
            <div className="text-2xl font-bold text-blue-900">{m.value}</div>
            <div
              className={
                "text-xs mt-1 " +
                (m.changeType === "up"
                  ? "text-green-600"
                  : m.changeType === "down"
                  ? "text-red-600"
                  : "text-zinc-400")
              }
            >
              {m.change}
            </div>
          </div>
        ))}
      </div>
      {/* Tasks & Logs */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-xl border border-zinc-200 p-5 shadow-sm">
          <div className="font-semibold text-base mb-2">My Upcoming Tasks</div>
          <div className="text-xs text-zinc-500 mb-2">
            Tasks that require your attention
          </div>
          <ul className="flex flex-col gap-2">
            {tasks.map((t, i) => (
              <li key={i} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">•</span>
                  <span className="text-sm text-zinc-700">{t.text}</span>
                  {t.badge && (
                    <span className="ml-2 bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded font-semibold">
                      {t.badge}
                    </span>
                  )}
                </div>
                <button className="px-3 py-1 bg-zinc-100 border border-zinc-200 rounded text-xs font-medium text-zinc-700 hover:bg-blue-50">
                  {t.action}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-sm">
          <div className="font-semibold text-base mb-2">Activity Logs</div>
          <div className="text-xs text-zinc-500 mb-2">
            Recent system activities
          </div>
          <ul className="flex flex-col gap-2">
            {logs.map((l, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-blue-600 mt-0.5">→</span>
                <div>
                  <div className="text-sm text-zinc-700">{l.text}</div>
                  <div className="text-xs text-zinc-400">{l.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Immediate Actions Required */}
      <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-sm">
        <div className="font-semibold text-base mb-2">
          Immediate Actions Required
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-red-600 font-semibold">
            <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
            {immediateAction.title}
          </div>
          <div className="text-xs text-zinc-500">{immediateAction.desc}</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-3 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded font-semibold">
              {immediateAction.risk}
            </span>
            <span className="text-red-700 font-bold text-sm">
              {immediateAction.count} accounts identified
            </span>
          </div>
          <div className="text-xs text-red-700">{immediateAction.message}</div>
          <div className="flex gap-2 mt-2">
            <button className="px-4 py-1 bg-blue-600 text-white rounded font-semibold text-xs hover:bg-blue-700">
              Review Calls
            </button>
            <button className="px-4 py-1 bg-zinc-100 border border-zinc-200 rounded font-semibold text-xs text-zinc-700 hover:bg-blue-50">
              Sync to my CRM
            </button>
          </div>
        </div>
      </div>
      {/* Active Campaigns */}
      <div className="bg-white rounded-xl border border-zinc-200 p-5 shadow-sm">
        <div className="font-semibold text-base mb-4">Active Campaigns</div>
        <div className="flex flex-col gap-6">
          {campaigns.map((c, i) => (
            <div key={i} className="mb-2">
              <div className="flex items-center justify-between mb-1">
                <div>
                  <div className="font-semibold text-zinc-900">{c.name}</div>
                  <div className="text-xs text-zinc-500">
                    Targeting {c.targeting}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1">
                    Started: {c.start} &nbsp;|&nbsp; End Date: {c.end}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-xs text-zinc-500">Accounts</span>
                  <span className="font-semibold text-zinc-900">
                    {c.accounts}
                  </span>
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">
                    {c.status}
                  </span>
                </div>
              </div>
              <ProgressBar percent={c.progress} />
              <div className="text-xs text-zinc-400 mt-1 text-right">
                {c.progress}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
