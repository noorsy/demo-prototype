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
  createButton = null, // New prop to replace createButtonText, createButtonIcon, onCreateClick
  // Legacy props for backward compatibility
  createButtonText = "Create",
  createButtonIcon: CreateButtonIcon = PlusIcon,
  onCreateClick,
  searchValue = "",
  onSearchChange,
  additionalButton = null,
}) {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  // Use new createButton prop if provided, otherwise fall back to legacy props
  const buttonConfig = createButton || {
    text: createButtonText,
    icon: CreateButtonIcon,
    onClick: onCreateClick
  };

  return (
    <>
      {/* Breadcrumbs */}
      <div className="bg-white px-6 py-3 border-b border-gray-100">
        <nav className="flex items-center space-x-2 text-sm text-gray-500">
          <HomeIcon className="w-4 h-4" />
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <span>&gt;</span>}
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
            {additionalButton && (
              <button
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={additionalButton.onClick}
                disabled={additionalButton.disabled}
              >
                {additionalButton.loading ? (
                  <>
                    <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    <span>{additionalButton.loadingText}</span>
                  </>
                ) : (
                  <>
                    <span>{additionalButton.icon}</span>
                    <span>{additionalButton.text}</span>
                  </>
                )}
              </button>
            )}
            
            {/* Create Button with optional dropdown */}
            {buttonConfig && (
              <div className="relative">
                <button
                  className={`bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                    buttonConfig.dropdown ? 'pr-8' : ''
                  }`}
                  onClick={buttonConfig.onClick}
                  disabled={buttonConfig.disabled}
                >
                  {buttonConfig.loading ? (
                    <>
                      <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>{buttonConfig.text}</span>
                    </>
                  ) : (
                    <>
                      {typeof buttonConfig.icon === 'string' ? (
                        <span>{buttonConfig.icon}</span>
                      ) : (
                        <buttonConfig.icon className="h-4 w-4" />
                      )}
                      <span>{buttonConfig.text}</span>
                    </>
                  )}
                  {buttonConfig.dropdown && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        buttonConfig.dropdown.onToggle();
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-0.5 hover:bg-gray-700 rounded"
                    >
                      <ChevronDownIcon className="h-3 w-3" />
                    </button>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
