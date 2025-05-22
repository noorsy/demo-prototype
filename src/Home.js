import React from "react";
import PageHeader from "./PageHeader";

const stats = [
  { label: "Total Accounts", value: "12,543", change: "+2.5% from last month" },
  { label: "Money Moved", value: "$1.2M", change: "+15.3% from last month" },
  { label: "Recovery Rate", value: "68.7%", change: "+5.1% from last month" },
  {
    label: "Accounts Resolved",
    value: "4,721",
    change: "+12.3% from last month",
  },
];

const tasks = [
  {
    title: "Approve Journey Changes",
    desc: "Early Delinquency Segment",
    priority: "High",
  },
  {
    title: "Manual Review Required",
    desc: "12 accounts flagged by AI",
    priority: "Medium",
  },
  {
    title: "Campaign Approval",
    desc: "Q2 Credit Card Recovery",
    priority: "High",
  },
  {
    title: "Review Compliance Report",
    desc: "Monthly compliance check",
    priority: "Low",
  },
];

const badgeColor = {
  High: "bg-red-100 text-red-700",
  Medium: "bg-yellow-100 text-yellow-800",
  Low: "bg-green-100 text-green-700",
};

export default function Home() {
  return (
    <div>
      <PageHeader />
      <div className="px-8">
        <div className="flex gap-6 mb-8 flex-wrap">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex-1 min-w-[220px] bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <div className="text-gray-500 text-sm font-medium mb-2">
                {stat.label}
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-xs text-gray-400 mt-1">{stat.change}</div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="text-lg font-semibold">My Upcoming Tasks</div>
            <button className="text-sm px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50">
              View All Tasks
            </button>
          </div>
          <ul className="divide-y divide-gray-100">
            {tasks.map((task) => (
              <li
                key={task.title}
                className="flex items-center justify-between px-6 py-4"
              >
                <div>
                  <div className="font-medium text-gray-900">{task.title}</div>
                  <div className="text-sm text-gray-500">{task.desc}</div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    badgeColor[task.priority]
                  }`}
                >
                  {task.priority}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
