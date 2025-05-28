import React from "react";
import PageHeader from "./PageHeader";
import {
  CheckCircleIcon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
  Cog6ToothIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";

const tasks = [
  {
    label: "Review the onboarding sequence",
    status: "Completed",
  },
  {
    label: "Configure notification preferences",
    status: "Pending",
  },
  {
    label: "Create the first campaign",
    status: "Pending",
  },
  {
    label: "Review bot performance",
    status: "Yet to review",
  },
];

const activityLogs = [
  {
    label: "Compliance review is done",
    time: "Today at 10:30 AM",
    icon: DocumentCheckIcon,
  },
  {
    label: "Strategy review is done",
    time: "Today at 10:15 AM",
    icon: DocumentCheckIcon,
  },
  {
    label: "SFTP folder setup is completed",
    time: "Today at 9:45 AM",
    icon: Cog6ToothIcon,
  },
  {
    label: "Onboarding process started",
    time: "Today at 9:30 AM",
    icon: CheckCircleIcon,
  },
];

export default function Home() {
  return (
    <div className="px-8 py-6 w-full">
      <h1 className="text-2xl font-bold mb-6">Welcome back, Alex</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* My Upcoming Tasks */}
        <div className="bg-white rounded-xl border border-zinc-100 p-6 flex flex-col gap-3 min-h-[260px]">
          <div className="font-semibold text-lg mb-1">My Upcoming Tasks</div>
          <div className="text-xs text-zinc-500 mb-2">
            Tasks that require your attention
          </div>
          <ul className="flex flex-col gap-2">
            {tasks.map((task, idx) => (
              <li key={task.label} className="flex items-center gap-3">
                {task.status === "Completed" ? (
                  <CheckCircleIcon className="w-5 h-5 text-green-500" />
                ) : (
                  <XMarkIcon className="w-5 h-5 text-zinc-400" />
                )}
                <span
                  className={
                    task.status === "Completed"
                      ? "line-through text-zinc-400"
                      : "text-zinc-900"
                  }
                >
                  {task.label}
                </span>
                <span className="ml-auto text-xs font-medium px-3 py-1 rounded-full bg-zinc-100 text-zinc-500 border border-zinc-200">
                  {task.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* Activity Logs */}
        <div className="bg-white rounded-xl border border-zinc-100 p-6 flex flex-col gap-3 min-h-[260px]">
          <div className="font-semibold text-lg mb-1">Activity Logs</div>
          <div className="text-xs text-zinc-500 mb-2">
            Recent system activities
          </div>
          <ul className="flex flex-col gap-2">
            {activityLogs.map((log, idx) => {
              const Icon = log.icon;
              return (
                <li key={log.label} className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-blue-500" />
                  <span className="text-zinc-900 font-medium">{log.label}</span>
                  <span className="ml-auto text-xs text-zinc-500">
                    {log.time}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {/* Immediate Actions Required */}
      <div className="mb-8">
        <div className="font-semibold text-lg mb-2">
          Immediate Actions Required
        </div>
        <div className="bg-white rounded-xl border border-zinc-100 p-8 flex items-center justify-center min-h-[120px]">
          <div className="text-zinc-400 text-center">
            <div className="font-medium mb-1">
              No immediate action required messages
            </div>
            <div className="text-xs">
              You're all caught up! When there are urgent matters requiring your
              attention, they will appear here.
            </div>
          </div>
        </div>
      </div>
      {/* Quick Links */}
      <div className="mb-4">
        <div className="font-semibold text-lg mb-2">Quick Links</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="#"
            className="bg-white rounded-xl border border-zinc-100 p-6 flex flex-col gap-1 hover:bg-zinc-50 transition"
          >
            <div className="font-semibold text-base mb-1">
              View the current strategies
            </div>
            <div className="text-xs text-zinc-500 mb-2">
              Review and manage your collection strategies
            </div>
            <ArrowTopRightOnSquareIcon className="w-4 h-4 text-zinc-400 ml-auto" />
          </a>
          <a
            href="#"
            className="bg-white rounded-xl border border-zinc-100 p-6 flex flex-col gap-1 hover:bg-zinc-50 transition"
          >
            <div className="font-semibold text-base mb-1">
              Trigger your first campaigns
            </div>
            <div className="text-xs text-zinc-500 mb-2">
              Start engaging with your customers
            </div>
            <ArrowTopRightOnSquareIcon className="w-4 h-4 text-zinc-400 ml-auto" />
          </a>
        </div>
      </div>
    </div>
  );
}
