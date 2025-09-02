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
  Monitor,
  Mic,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "./images/logo.png";

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
  { icon: <Workflow size={20} />, label: "Workflows", to: "/workflows" },
  // {
  //   icon: <Monitor size={20} />,
  //   label: "Experience Center",
  //   to: "/experience-center",
  // },
  {
    icon: <Mic size={20} />,
    label: "Experience Center",
    to: "/voice-widget",
  },
  {
    icon: <Users size={20} />,
    label: "Access Management",
    to: "/access-management",
  },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex flex-col justify-between h-screen w-[260px] text-base bg-gradient-to-b from-gray-50 to-gray-100">
      <div>
        <div className="flex items-left justify-left text-base font-bold text-foreground mb-3 pl-10 border-b border-gray-100">
          <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />
        </div>
        <nav className="px-3">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `mx-2 flex items-center px-4 py-2 rounded-xl font-semibold transition-all duration-200 gap-3 text-sm ` +
                    (isActive
                      ? "bg-gray-900 text-white shadow-md transform scale-[1.02]"
                      : "bg-transparent text-gray-600 hover:bg-gray-200 hover:text-gray-900 hover:shadow-sm")
                  }
                >
                  {link.icon}
                  <span className="ml-2 md:inline font-semibold">
                    {link.label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="flex items-center px-6 py-6 border-t border-gray-200">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Harvey"
          className="w-10 h-10 rounded-full mr-3 border-2 border-gray-200 shadow-sm"
        />
        <div className="flex flex-col">
          <span className="text-base font-semibold text-gray-900">Harvey</span>
          <small className="text-gray-500">harvey@example.com</small>
        </div>
      </div>
    </aside>
  );
}
