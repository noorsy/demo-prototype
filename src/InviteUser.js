import React, { useState } from "react";
import { ArrowLeft, Mail, User, Shield, Smartphone, Building } from "lucide-react";
import { useNavigate } from "react-router-dom";

const InviteUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "Client Agent View",
    otpMethod: "email",
    scope: {}
  });

  const [expandedClients, setExpandedClients] = useState({});

  const roles = [
    { value: "Client Agent View", label: "Client Agent View", description: "External role with view-only access" },
    { value: "Client Admin", label: "Client Admin", description: "External role with administrative access" },
    { value: "Client Admin (Beta)", label: "Client Admin (Beta)", description: "External role with administrative access (Beta)" },
    { value: "Campaign Manager", label: "Campaign Manager", description: "Internal role to manage campaigns" },
    { value: "Project Manager", label: "Project Manager", description: "Internal role to manage projects" },
    { value: "Administrator", label: "Administrator", description: "Internal role with full system access" },
    { value: "CUX", label: "CUX", description: "Internal role for customer experience" },
    { value: "Sales Viewer", label: "Sales Viewer", description: "Internal role with sales data access" }
  ];

  const otpMethods = [
    { value: "email", label: "Email", description: "Receive OTP via email" },
    { value: "sms", label: "SMS", description: "Receive OTP via SMS" },
    { value: "authenticator", label: "Authenticator App", description: "Use Google Authenticator or similar" }
  ];

  const availableScopes = [
    {
      client: "Acme Corp",
      assistants: ["All Assistants", "Sales Assistant", "Support Assistant", "Marketing Assistant"]
    },
    {
      client: "Tech Solutions",
      assistants: ["All Assistants", "Technical Support", "Product Assistant", "Integration Bot"]
    },
    {
      client: "Global Industries",
      assistants: ["All Assistants", "Global Support", "Regional Assistant", "Compliance Bot"]
    },
    {
      client: "Startup Inc",
      assistants: ["All Assistants", "Growth Assistant", "Customer Success Bot"]
    },
    {
      client: "Digital Agency",
      assistants: ["All Assistants", "Creative Assistant", "Project Manager Bot", "Client Liaison"]
    },
    {
      client: "Cloud Corp",
      assistants: ["All Assistants", "Cloud Support", "Deployment Assistant", "Monitoring Bot"]
    },
    {
      client: "Data Systems",
      assistants: ["All Assistants", "Data Analyst", "Reporting Assistant", "ETL Bot"]
    },
    {
      client: "Web Solutions",
      assistants: ["All Assistants", "Web Support", "Development Assistant", "QA Bot"]
    },
    {
      client: "Mega Corp",
      assistants: ["All Assistants", "Enterprise Support", "Executive Assistant", "HR Bot"]
    },
    {
      client: "Innovation Labs",
      assistants: ["All Assistants", "Research Assistant", "Innovation Bot", "Patent Assistant"]
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleClientExpansion = (clientName) => {
    setExpandedClients(prev => ({
      ...prev,
      [clientName]: !prev[clientName]
    }));
  };

  const handleScopeChange = (clientName, assistantName) => {
    setFormData(prev => {
      const currentClientScope = prev.scope[clientName] || [];
      
      let newClientScope;
      if (assistantName === "All Assistants") {
        // If "All Assistants" is selected, toggle all assistants for this client
        const allAssistants = availableScopes.find(s => s.client === clientName)?.assistants.filter(a => a !== "All Assistants") || [];
        if (currentClientScope.includes("All Assistants")) {
          // Remove all assistants
          newClientScope = [];
        } else {
          // Add all assistants
          newClientScope = ["All Assistants", ...allAssistants];
        }
      } else {
        // Handle individual assistant selection
        if (currentClientScope.includes(assistantName)) {
          // Remove this assistant and "All Assistants" if it was selected
          newClientScope = currentClientScope.filter(a => a !== assistantName && a !== "All Assistants");
        } else {
          // Add this assistant
          newClientScope = [...currentClientScope, assistantName];
        }
      }

      return {
        ...prev,
        scope: {
          ...prev.scope,
          [clientName]: newClientScope
        }
      };
    });
  };

  const isClientSelected = (clientName) => {
    const clientScope = formData.scope[clientName] || [];
    return clientScope.length > 0;
  };

  const isAssistantSelected = (clientName, assistantName) => {
    const clientScope = formData.scope[clientName] || [];
    return clientScope.includes(assistantName);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the invitation
    console.log("Inviting user:", formData);
    // Navigate back to access management
    navigate("/access-management");
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate("/access-management")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          Back to Access Management
        </button>
      </div>

      <div className="flex gap-6">
        {/* Main Form */}
        <div className="flex-1 max-w-2xl">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Invite User</h1>
            <p className="text-gray-600 mt-1">Send an invitation to join your team</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter first name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                    placeholder="Enter email address"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {roles.find(r => r.value === formData.role)?.description}
                </p>
              </div>

              <div className="mt-4">
                <label htmlFor="otpMethod" className="block text-sm font-medium text-gray-700 mb-2">
                  OTP Method
                </label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <select
                    id="otpMethod"
                    name="otpMethod"
                    value={formData.otpMethod}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    {otpMethods.map((method) => (
                      <option key={method.value} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {otpMethods.find(m => m.value === formData.otpMethod)?.description}
                </p>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scope (Client Access)
                </label>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {availableScopes.map((scope) => (
                    <div key={scope.client} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <label className="flex items-center gap-2 text-sm font-medium">
                          <input
                            type="checkbox"
                            checked={isClientSelected(scope.client)}
                            onChange={() => toggleClientExpansion(scope.client)}
                            className="rounded border-gray-300 text-black focus:ring-black"
                          />
                          <span className="text-gray-900">{scope.client}</span>
                        </label>
                        <button
                          type="button"
                          onClick={() => toggleClientExpansion(scope.client)}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          {expandedClients[scope.client] ? "−" : "+"}
                        </button>
                      </div>
                      
                      {expandedClients[scope.client] && (
                        <div className="ml-6 mt-2 space-y-2">
                          {scope.assistants.map((assistant) => (
                            <label key={assistant} className="flex items-center gap-2 text-sm">
                              <input
                                type="checkbox"
                                checked={isAssistantSelected(scope.client, assistant)}
                                onChange={() => handleScopeChange(scope.client, assistant)}
                                className="rounded border-gray-300 text-black focus:ring-black"
                              />
                              <span className="text-gray-700">{assistant}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Select clients and their specific assistants this user should have access to
                </p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2">What happens next?</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• An invitation email will be sent to the user</li>
                <li>• The user will receive a link to set up their account</li>
                <li>• They'll be able to choose their password and complete their profile</li>
                <li>• Once activated, they'll have access based on their assigned role and scope</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => navigate("/access-management")}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Send Invitation
              </button>
            </div>
          </form>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 space-y-6">
          {/* Quick Stats */}
          {/* <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Total Users</span>
                <span className="text-sm font-semibold text-gray-900">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Active Users</span>
                <span className="text-sm font-semibold text-green-600">21</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Pending Invitations</span>
                <span className="text-sm font-semibold text-yellow-600">3</span>
              </div>
            </div>
          </div> */}

          {/* Recent Invitations */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Recent Invitations</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">JD</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                  <p className="text-xs text-gray-500 truncate">john.doe@company.com</p>
                </div>
                <span className="text-xs text-yellow-600 font-medium">Pending</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">JS</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Jane Smith</p>
                  <p className="text-xs text-gray-500 truncate">jane.smith@company.com</p>
                </div>
                <span className="text-xs text-green-600 font-medium">Active</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">MJ</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">Mike Johnson</p>
                  <p className="text-xs text-gray-500 truncate">mike.johnson@company.com</p>
                </div>
                <span className="text-xs text-yellow-600 font-medium">Pending</span>
              </div>
            </div>
          </div>

          {/* Role Guidelines */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Role Guidelines</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-medium text-gray-700 mb-1">External Roles</h4>
                <p className="text-xs text-gray-600">For client users with limited access</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-gray-700 mb-1">Internal Roles</h4>
                <p className="text-xs text-gray-600">For team members with full access</p>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  <strong>Tip:</strong> Start with minimal access and expand as needed
                </p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
            <div className="space-y-2">
              <button
                onClick={() => navigate("/access-management")}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                View All Users
              </button>
              <button
                onClick={() => navigate("/access-management")}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                Manage Roles
              </button>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteUser; 