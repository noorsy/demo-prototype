import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  Settings,
  User,
  MapPin,
  ChevronDown,
  LogOut,
  Shield,
  Bell,
  HelpCircle,
  Plug,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "./images/logo.png";
import monogram from "./images/monogram.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

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
  { icon: <Workflow size={20} />, label: "Workflows", to: "/workflows" },
  {
    icon: <Database size={20} />,
    label: "Accounts Data",
    to: "/accounts-data",
  },
  { icon: <UserCheck size={20} />, label: "Agent Portal", to: "/agent-portal" },
  {
    icon: <Mic size={20} />,
    label: "Experience Center",
    to: "/experience-center",
  },
  {
    icon: <Users size={20} />,
    label: "Access Management",
    to: "/access-management",
  },
  {
    icon: <Plug size={20} />,
    label: "Integrations",
    to: "/integrations",
  },
];

const countries = [
  { flag: "🇺🇸", name: "United States", code: "US" },
  { flag: "🇮🇳", name: "India", code: "IN" },
  { flag: "🇬🇧", name: "United Kingdom", code: "GB" },
  { flag: "🇨🇦", name: "Canada", code: "CA" },
  { flag: "🇦🇺", name: "Australia", code: "AU" },
  { flag: "🇩🇪", name: "Germany", code: "DE" },
  { flag: "🇫🇷", name: "France", code: "FR" },
  { flag: "🇯🇵", name: "Japan", code: "JP" },
  { flag: "🇸🇬", name: "Singapore", code: "SG" },
  { flag: "🇳🇱", name: "Netherlands", code: "NL" },
  { flag: "🇧🇷", name: "Brazil", code: "BR" },
  { flag: "🇲🇽", name: "Mexico", code: "MX" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };

  return (
    <aside className="sticky top-0 flex flex-col justify-between h-screen w-[260px] text-base bg-gradient-to-b from-gray-50 to-gray-100">
      <div>
        {/* Header with Monogram and Dropdown */}
        <div className="flex items-center justify-between text-base font-bold text-foreground mb-3 px-4 py-3 border-b border-gray-200">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <img
                  src={monogram}
                  alt="Monogram"
                  className="w-5 h-5 object-contain"
                />
                <span className="text-xs">CarMax</span>
                <ChevronDown size={16} className="text-gray-400" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" side="right" align="start">
              <DropdownMenuLabel>Organization</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <div className="flex items-center gap-3">
                  <img
                    src={monogram}
                    alt="CarMax"
                    className="w-6 h-6 object-contain"
                  />
                  <div>
                    <div className="font-medium">CarMax</div>
                    <div className="text-xs text-gray-500">
                      Current Organization
                    </div>
                  </div>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/settings", { state: { background: window.location.pathname } })}>
                <Settings className="mr-2 h-4 w-4" />
                <span>Organization Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Users className="mr-2 h-4 w-4" />
                <span>Manage Users</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Shield className="mr-2 h-4 w-4" />
                <span>Security & Permissions</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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

      {/* Improved Footer */}
      <div className="p-4 border-t border-gray-200">
        {/* User Dropdown with integrated region */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-200/30 hover:bg-gray-200/50 transition-all duration-200 hover:shadow-sm group">
              <div className="relative">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Harvey"
                  className="w-10 h-10 rounded-full border-2 border-gray-200 shadow-sm"
                />
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-semibold text-gray-900">
                  Harvey
                </div>
                <div className="text-xs text-gray-500">harvey@example.com</div>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs">{selectedCountry.flag}</span>
                  <span className="text-xs text-gray-500">
                    {selectedCountry.name}
                  </span>
                </div>
              </div>
              <ChevronDown
                size={16}
                className="text-gray-400 group-hover:text-gray-600 transition-colors"
              />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 mb-2"
            side="top"
            align="start"
            sideOffset={8}
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">Harvey</p>
                <p className="text-xs leading-none text-muted-foreground">
                  harvey@example.com
                </p>
                <div className="flex items-center gap-1 mt-1">
                  <span className="text-xs">{selectedCountry.flag}</span>
                  <span className="text-xs text-muted-foreground">
                    {selectedCountry.name}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {/* Region Selection */}
            <DropdownMenuLabel className="text-xs font-medium text-gray-500 px-2 py-1">
              Change Region
            </DropdownMenuLabel>
            {countries.map((country) => (
              <DropdownMenuItem
                key={country.code}
                className="cursor-pointer text-xs"
                onClick={() => handleCountryChange(country)}
              >
                <span className="mr-2">{country.flag}</span>
                <span>{country.name}</span>
                {selectedCountry.code === country.code && (
                  <span className="ml-auto text-xs text-gray-500">✓</span>
                )}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/settings", { state: { background: window.location.pathname } })}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Shield className="mr-2 h-4 w-4" />
              <span>Security</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help & Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}
