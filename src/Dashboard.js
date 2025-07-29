import React from "react";
import PageHeader from "./PageHeader";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";

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
    <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
      <div
        className="h-2 bg-primary rounded-full transition-all duration-500"
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
          <Card key={m.label} className="p-5 flex flex-col gap-1">
            <div className="text-xs text-muted-foreground font-medium mb-1">
              {m.label}
            </div>
            <div className="text-2xl font-bold text-primary">{m.value}</div>
            <div
              className={
                "text-xs mt-1 " +
                (m.changeType === "up"
                  ? "text-green-600"
                  : m.changeType === "down"
                  ? "text-destructive"
                  : "text-muted-foreground")
              }
            >
              {m.change}
            </div>
          </Card>
        ))}
      </div>
      {/* Tasks & Logs */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="col-span-2 p-5">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base">My Upcoming Tasks</CardTitle>
            <CardDescription>Tasks that require your attention</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="flex flex-col gap-2">
              {tasks.map((t, i) => (
                <li key={i} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-primary">•</span>
                    <span className="text-sm text-foreground">{t.text}</span>
                    {t.badge && (
                      <Badge variant="secondary" className="ml-2">
                        {t.badge}
                      </Badge>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    {t.action}
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="p-5">
          <CardHeader className="p-0 pb-4">
            <CardTitle className="text-base">Activity Logs</CardTitle>
            <CardDescription>Recent system activities</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="flex flex-col gap-2">
              {logs.map((l, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-0.5">→</span>
                  <div>
                    <div className="text-sm text-foreground">{l.text}</div>
                    <div className="text-xs text-muted-foreground">
                      {l.time}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      {/* Immediate Actions Required */}
      <Card className="p-5">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-base">
            Immediate Actions Required
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-destructive font-semibold">
              <span className="w-2 h-2 rounded-full bg-destructive inline-block"></span>
              {immediateAction.title}
            </div>
            <div className="text-xs text-muted-foreground">
              {immediateAction.desc}
            </div>
          </div>
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mt-3 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="destructive">{immediateAction.risk}</Badge>
              <span className="text-destructive font-bold text-sm">
                {immediateAction.count} accounts identified
              </span>
            </div>
            <div className="text-xs text-destructive">
              {immediateAction.message}
            </div>
            <div className="flex gap-2 mt-2">
              <Button size="sm">Review Calls</Button>
              <Button variant="outline" size="sm">
                Sync to my CRM
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Active Campaigns */}
      <Card className="p-5">
        <CardHeader className="p-0 pb-4">
          <CardTitle className="text-base">Active Campaigns</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="flex flex-col gap-6">
            {campaigns.map((c, i) => (
              <div key={i} className="mb-2">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <div className="font-semibold text-foreground">
                      {c.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Targeting {c.targeting}
                    </div>
                    <div className="text-xs text-muted-foreground/70 mt-1">
                      Started: {c.start} &nbsp;|&nbsp; End Date: {c.end}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-muted-foreground">
                      Accounts
                    </span>
                    <span className="font-semibold text-foreground">
                      {c.accounts}
                    </span>
                    <Badge
                      variant="secondary"
                      className="text-green-600 bg-green-50"
                    >
                      {c.status}
                    </Badge>
                  </div>
                </div>
                <ProgressBar percent={c.progress} />
                <div className="text-xs text-muted-foreground mt-1 text-right">
                  {c.progress}%
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
