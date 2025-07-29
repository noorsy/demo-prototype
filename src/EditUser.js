import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  Mail,
  User,
  Phone,
  Shield,
  Smartphone,
  Building,
  Save,
  Trash2,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";

const EditUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "Client Agent View",
    otpMethod: "email",
    scope: {},
  });

  const [expandedClients, setExpandedClients] = useState({});

  const roles = [
    {
      value: "Client Agent View",
      label: "Client Agent View",
      description: "External role with view-only access",
    },
    {
      value: "Client Admin",
      label: "Client Admin",
      description: "External role with administrative access",
    },
    {
      value: "Client Admin (Beta)",
      label: "Client Admin (Beta)",
      description: "External role with administrative access (Beta)",
    },
    {
      value: "Campaign Manager",
      label: "Campaign Manager",
      description: "Internal role to manage campaigns",
    },
    {
      value: "Project Manager",
      label: "Project Manager",
      description: "Internal role to manage projects",
    },
    {
      value: "Administrator",
      label: "Administrator",
      description: "Internal role with full system access",
    },
    {
      value: "CUX",
      label: "CUX",
      description: "Internal role for customer experience",
    },
    {
      value: "Sales Viewer",
      label: "Sales Viewer",
      description: "Internal role with sales data access",
    },
  ];

  const otpMethods = [
    { value: "email", label: "Email", description: "Receive OTP via email" },
    { value: "sms", label: "SMS", description: "Receive OTP via SMS" },
    {
      value: "authenticator",
      label: "Authenticator App",
      description: "Use Google Authenticator or similar",
    },
  ];

  const availableScopes = [
    {
      client: "Acme Corp",
      assistants: [
        "All Assistants",
        "Sales Assistant",
        "Support Assistant",
        "Marketing Assistant",
      ],
    },
    {
      client: "Tech Solutions",
      assistants: [
        "All Assistants",
        "Technical Support",
        "Product Assistant",
        "Integration Bot",
      ],
    },
    {
      client: "Global Industries",
      assistants: [
        "All Assistants",
        "Global Support",
        "Regional Assistant",
        "Compliance Bot",
      ],
    },
    {
      client: "Startup Inc",
      assistants: [
        "All Assistants",
        "Growth Assistant",
        "Customer Success Bot",
      ],
    },
    {
      client: "Digital Agency",
      assistants: [
        "All Assistants",
        "Creative Assistant",
        "Project Manager Bot",
        "Client Liaison",
      ],
    },
    {
      client: "Cloud Corp",
      assistants: [
        "All Assistants",
        "Cloud Support",
        "Deployment Assistant",
        "Monitoring Bot",
      ],
    },
    {
      client: "Data Systems",
      assistants: [
        "All Assistants",
        "Data Analyst",
        "Reporting Assistant",
        "ETL Bot",
      ],
    },
    {
      client: "Web Solutions",
      assistants: [
        "All Assistants",
        "Web Support",
        "Development Assistant",
        "QA Bot",
      ],
    },
    {
      client: "Mega Corp",
      assistants: [
        "All Assistants",
        "Enterprise Support",
        "Executive Assistant",
        "HR Bot",
      ],
    },
    {
      client: "Innovation Labs",
      assistants: [
        "All Assistants",
        "Research Assistant",
        "Innovation Bot",
        "Patent Assistant",
      ],
    },
  ];

  useEffect(() => {
    if (user) {
      const [firstName, ...lastNameParts] = user.name.split(" ");
      const lastName = lastNameParts.join(" ");

      // Convert the old scope array format to new object format
      const scopeObject = {};
      if (user.scope && Array.isArray(user.scope)) {
        user.scope.forEach((client) => {
          scopeObject[client] = ["All Assistants"]; // Default to all assistants for existing users
        });
      }

      setFormData({
        firstName: firstName || "",
        lastName: lastName || "",
        email: user.email || "",
        role: user.role || "Client Agent View",
        otpMethod: "email", // Default value
        scope: scopeObject,
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleClientExpansion = (clientName) => {
    setExpandedClients((prev) => ({
      ...prev,
      [clientName]: !prev[clientName],
    }));
  };

  const handleScopeChange = (clientName, assistantName) => {
    setFormData((prev) => {
      const currentClientScope = prev.scope[clientName] || [];

      let newClientScope;
      if (assistantName === "All Assistants") {
        // If "All Assistants" is selected, toggle all assistants for this client
        const allAssistants =
          availableScopes
            .find((s) => s.client === clientName)
            ?.assistants.filter((a) => a !== "All Assistants") || [];
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
          newClientScope = currentClientScope.filter(
            (a) => a !== assistantName && a !== "All Assistants"
          );
        } else {
          // Add this assistant
          newClientScope = [...currentClientScope, assistantName];
        }
      }

      return {
        ...prev,
        scope: {
          ...prev.scope,
          [clientName]: newClientScope,
        },
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
    // Here you would typically update the user
    console.log("Updating user:", formData);
    // Navigate back to access management
    navigate("/access-management");
  };

  if (!user) {
    return (
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              User Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              The user you're trying to edit could not be found.
            </p>
            <button
              onClick={() => navigate("/access-management")}
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
            >
              Back to Access Management
            </button>
          </div>
        </div>
      </div>
    );
  }

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

      <div className="max-w-2xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Edit User</h1>
          <p className="text-gray-600 mt-1">
            Update user information and permissions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  First Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
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
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Last Name
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
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
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
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
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Role
              </label>
              <div className="relative">
                <Shield
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10"
                  size={16}
                />
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    handleInputChange({ target: { name: "role", value } })
                  }
                >
                  <SelectTrigger className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {roles.find((r) => r.value === formData.role)?.description}
              </p>
            </div>

            <div className="mt-4">
              <label
                htmlFor="otpMethod"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                OTP Method
              </label>
              <div className="relative">
                <Smartphone
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 z-10"
                  size={16}
                />
                <Select
                  value={formData.otpMethod}
                  onValueChange={(value) =>
                    handleInputChange({ target: { name: "otpMethod", value } })
                  }
                >
                  <SelectTrigger className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent">
                    <SelectValue placeholder="Select OTP method" />
                  </SelectTrigger>
                  <SelectContent>
                    {otpMethods.map((method) => (
                      <SelectItem key={method.value} value={method.value}>
                        {method.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {
                  otpMethods.find((m) => m.value === formData.otpMethod)
                    ?.description
                }
              </p>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scope (Client Access)
              </label>
              <div className="space-y-3">
                {availableScopes.map((scope) => (
                  <div
                    key={scope.client}
                    className="border border-gray-200 rounded-lg p-3"
                  >
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
                          <label
                            key={assistant}
                            className="flex items-center gap-2 text-sm"
                          >
                            <input
                              type="checkbox"
                              checked={isAssistantSelected(
                                scope.client,
                                assistant
                              )}
                              onChange={() =>
                                handleScopeChange(scope.client, assistant)
                              }
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
                Select clients and their specific assistants this user should
                have access to
              </p>
            </div>
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
              Update User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
