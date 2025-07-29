import React from "react";
import PageHeader from "./PageHeader";
import {
  CheckCircleIcon,
  XMarkIcon,
  ArrowTopRightOnSquareIcon,
  Cog6ToothIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Badge } from "./components/ui/badge";

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
        <Card className="flex flex-col gap-3 min-h-[260px]">
          <CardHeader>
            <CardTitle>My Upcoming Tasks</CardTitle>
            <CardDescription>Tasks that require your attention</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              {tasks.map((task, idx) => (
                <li key={task.label} className="flex items-center gap-3">
                  {task.status === "Completed" ? (
                    <CheckCircleIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <XMarkIcon className="w-5 h-5 text-muted-foreground" />
                  )}
                  <span
                    className={
                      task.status === "Completed"
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                    }
                  >
                    {task.label}
                  </span>
                  <Badge variant="secondary" className="ml-auto">
                    {task.status}
                  </Badge>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        {/* Activity Logs */}
        <Card className="flex flex-col gap-3 min-h-[260px]">
          <CardHeader>
            <CardTitle>Activity Logs</CardTitle>
            <CardDescription>Recent system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-2">
              {activityLogs.map((log, idx) => {
                const Icon = log.icon;
                return (
                  <li key={log.label} className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-foreground font-sm">{log.label}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {log.time}
                    </span>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>
      </div>
      {/* Immediate Actions Required */}
      <div className="mb-8">
        <div className="font-semibold text-lg mb-2">
          Immediate Actions Required
        </div>
        <Card className="p-8 flex items-center justify-center min-h-[120px]">
          <div className="text-muted-foreground text-center">
            <div className="font-medium mb-1">
              No immediate action required messages
            </div>
            <div className="text-xs">
              You're all caught up! When there are urgent matters requiring your
              attention, they will appear here.
            </div>
          </div>
        </Card>
      </div>
      {/* Quick Links */}
      <div className="mb-4">
        <div className="font-semibold text-lg mb-2">Quick Links</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-6 flex flex-col gap-1 hover:bg-accent transition-colors cursor-pointer">
            <div className="font-semibold text-base mb-1">
              View the current strategies
            </div>
            <div className="text-xs text-muted-foreground mb-2">
              Review and manage your collection strategies
            </div>
            <ArrowTopRightOnSquareIcon className="w-4 h-4 text-muted-foreground ml-auto" />
          </Card>
          <Card className="p-6 flex flex-col gap-1 hover:bg-accent transition-colors cursor-pointer">
            <div className="font-semibold text-base mb-1">
              Trigger your first campaigns
            </div>
            <div className="text-xs text-muted-foreground mb-2">
              Start engaging with your customers
            </div>
            <ArrowTopRightOnSquareIcon className="w-4 h-4 text-muted-foreground ml-auto" />
          </Card>
        </div>
      </div>
    </div>
  );
}
