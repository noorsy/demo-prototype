import React from "react";
import {
  Home,
  Bot,
  BarChart2,
  Layers,
  MessageCircle,
  Database,
  UserCheck,
  Workflow,
  ThumbsUp,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { icon: <Home size={20} />, label: "Dashboard", to: "/" },
  { icon: <Bot size={20} />, label: "AI Agents", to: "/ai-agents" },
  { icon: <Layers size={20} />, label: "Campaigns", to: "/campaigns" },
  {
    icon: <MessageCircle size={20} />,
    label: "Conversations",
    to: "/conversations",
  },
  { icon: <BarChart2 size={20} />, label: "Analytics", to: "/analytics" },
  {
    icon: <ThumbsUp size={20} />,
    label: "Recommendations",
    to: "/recommendations",
  },
  {
    icon: <Database size={20} />,
    label: "Accounts Data",
    to: "/accounts-data",
  },
  { icon: <UserCheck size={20} />, label: "Agent Portal", to: "/agent-portal" },
  { icon: <Workflow size={20} />, label: "Journeys", to: "/journeys" },
  { icon: <Workflow size={20} />, label: "Workflows", to: "/workflows" },
  { icon: <Users size={20} />, label: "Access Management", to: "/access-management" },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex flex-col justify-between h-screen w-[260px] font-inter text-base">
      <div>
        <div className="flex items-center gap-2 text-base font-bold text-black mb-3 pl-5 py-5 border-b border-zinc-200">
          <span className="bg-black text-white rounded-lg w-8 h-8 flex items-center justify-center text-lg font-black">
            G
          </span>
          <span className="hidden md:inline">Acme Inc</span>
        </div>
        <nav>
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `mx-2 flex items-center px-4 py-2 rounded-md font-semibold transition-colors gap-3 text-sm font-inter ` +
                    (isActive
                      ? "bg-zinc-200 text-black"
                      : "bg-transparent text-black hover:bg-zinc-50 hover:text-black")
                  }
                >
                  {link.icon}
                  <span className="ml-2 hidden md:inline font-semibold">
                    {link.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex items-center px-8 py-6 border-t">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Harvey"
          className="w-10 h-10 rounded-full mr-3 border-2 border-black"
        />
        <div className="flex flex-col">
          <span className="text-base font-semibold text-black font-inter">
            Harvey
          </span>
          <small className="text-zinc-500 font-inter">
            harvey@veroscredit.com
          </small>
        </div>
      </div>
    </aside>
  );
}
