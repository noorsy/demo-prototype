import React from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

export default function PageHeaderWithTabs({
  title,
  description,
  breadcrumbs = ["Home"],
  tabs = [],
  activeTab,
  onTabChange,
  filters = [],
  showSearch = true,
  searchPlaceholder = "Search",
  createButtonText = "Create",
  createButtonIcon: CreateButtonIcon = PlusIcon,
  onCreateClick,
  searchValue = "",
  onSearchChange,
}) {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-white px-6 py-3 border-b border-gray-100">
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <HomeIcon className="w-4 h-4" />
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span>></span>}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-900">{crumb}</span>
              ) : (
                <button
                  onClick={index === 0 ? handleHomeClick : undefined}
                  className="hover:text-gray-700 transition-colors"
                >
                  {crumb}
                </button>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Main Header */}
      <div className="bg-white px-6 py-4">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>

        {/* Filters, Tabs, Search, and Create Button in One Line */}
        <div className="flex items-center justify-between">
          {/* Filters and Tabs */}
          <div className="flex items-center space-x-4">
            {/* Filters - Now rendered first */}
            {filters.length > 0 && (
              <div className="flex space-x-2">
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={filter.onClick}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center space-x-2 min-w-[120px] justify-between"
                  >
                    <span>{filter.value}</span>
                    <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                  </button>
                ))}
              </div>
            )}
            
            {/* Tabs - Now rendered after filters */}
            {tabs.length > 0 && (
              <div className="flex space-x-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => onTabChange(tab.value)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.value
                        ? "bg-gray-900 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search and Create Button */}
          <div className="flex items-center space-x-4">
            {showSearch && (
              <div className="relative">
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) =>
                    onSearchChange && onSearchChange(e.target.value)
                  }
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            )}
            <button
              className="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center space-x-2"
              onClick={onCreateClick}
            >
              <CreateButtonIcon className="h-4 w-4" />
              <span>{createButtonText}</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
