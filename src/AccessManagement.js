import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "./PageHeader";
import {
  Plus,
  Search,
  MoreVertical,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  Smartphone,
  Mail,
  Phone,
  Building,
} from "lucide-react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";

const AccessManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  // Mock user data
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      status: "Active",
      role: "Administrator",
      avatar: "https://randomuser.me/api/portraits/men/1.jpg",
      scope: {
        "Acme Corp": [
          "All Assistants",
          "Sales Assistant",
          "Support Assistant",
          "Marketing Assistant",
        ],
        "Tech Solutions": [
          "All Assistants",
          "Technical Support",
          "Product Assistant",
          "Integration Bot",
        ],
        "Global Industries": [
          "All Assistants",
          "Global Support",
          "Regional Assistant",
          "Compliance Bot",
        ],
      },
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@company.com",
      status: "Active",
      role: "Client Admin",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      scope: {
        "Acme Corp": [
          "All Assistants",
          "Sales Assistant",
          "Support Assistant",
          "Marketing Assistant",
        ],
      },
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      status: "Inactive",
      role: "Client Agent View",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      scope: {
        "Tech Solutions": ["Technical Support", "Product Assistant"],
        "Startup Inc": [
          "All Assistants",
          "Growth Assistant",
          "Customer Success Bot",
        ],
        "Digital Agency": ["Creative Assistant", "Project Manager Bot"],
        "Cloud Corp": ["Cloud Support", "Deployment Assistant"],
        "Data Systems": ["Data Analyst", "Reporting Assistant"],
        "Web Solutions": ["Web Support", "Development Assistant"],
      },
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@company.com",
      status: "Active",
      role: "Campaign Manager",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      scope: {
        "Global Industries": [
          "All Assistants",
          "Global Support",
          "Regional Assistant",
          "Compliance Bot",
        ],
        "Mega Corp": [
          "All Assistants",
          "Enterprise Support",
          "Executive Assistant",
          "HR Bot",
        ],
      },
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@company.com",
      status: "Pending",
      role: "Sales Viewer",
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      scope: {
        "Acme Corp": ["Sales Assistant"],
        "Tech Solutions": ["Technical Support"],
      },
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-red-100 text-red-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "Administrator":
        return "bg-purple-100 text-purple-800";
      case "Client Admin":
      case "Client Admin (Beta)":
        return "bg-blue-100 text-blue-800";
      case "Campaign Manager":
      case "Project Manager":
        return "bg-orange-100 text-orange-800";
      case "CUX":
        return "bg-green-100 text-green-800";
      case "Sales Viewer":
        return "bg-indigo-100 text-indigo-800";
      case "Client Agent View":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatScope = (scope) => {
    if (!scope || Object.keys(scope).length === 0) {
      return "No access";
    }

    const clientCount = Object.keys(scope).length;
    const firstClient = Object.keys(scope)[0];

    if (clientCount === 1) {
      const assistants = scope[firstClient];
      if (assistants.includes("All Assistants")) {
        return `${firstClient} (All Assistants)`;
      } else {
        return `${firstClient} (${assistants.length} assistants)`;
      }
    } else if (clientCount === 2) {
      return `${firstClient} + 1 more client`;
    } else {
      return `${firstClient} + ${clientCount - 1} more clients`;
    }
  };

  const handleMoreOptions = (userId) => {
    setOpenDropdown(openDropdown === userId ? null : userId);
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      setSuccessMessage("");
    }, 3000);
  };

  const handleResetPassword = (user) => {
    setSelectedUser(user);
    setShowResetModal(true);
    setOpenDropdown(null);
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    console.log(
      `Resetting password for ${selectedUser.name} to: ${newPassword}`
    );
    setShowResetModal(false);
    setNewPassword("");
    setSelectedUser(null);
    showSuccessMessage(`Password reset successfully for ${selectedUser.name}`);
  };

  const handleReset2FA = (user) => {
    console.log(`Resetting 2FA for ${user.name}`);
    setOpenDropdown(null);
    showSuccessMessage(`2FA reset successfully for ${user.name}`);
  };

  const handleUnlockAccount = (user) => {
    console.log(`Unlocking account for ${user.name}`);
    setOpenDropdown(null);
    showSuccessMessage(`Account unlocked successfully for ${user.name}`);
  };

  const handleEditUser = (user) => {
    console.log(`Editing user: ${user.name}`);
    setOpenDropdown(null);
    // Navigate to edit user screen with user data
    navigate("/access-management/edit", { state: { user } });
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
    setOpenDropdown(null);
  };

  const confirmDeleteUser = () => {
    console.log(`Deleting user: ${selectedUser.name}`);
    setShowDeleteModal(false);
    setSelectedUser(null);
    showSuccessMessage(`User ${selectedUser.name} deleted successfully`);
  };

  // Handle clicking outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && !event.target.closest(".dropdown-container")) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-2 z-50">
          <CheckCircle className="text-green-600" size={20} />
          <span className="text-green-800 font-medium">{successMessage}</span>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Access Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage user access and permissions
          </p>
        </div>
        <button
          onClick={() => navigate("/access-management/invite")}
          className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} />
          Invite User
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                {/* Filter button removed as per new_code */}
              </button>
            </div>
            <div className="text-sm text-gray-500">
              {filteredUsers.length} of {users.length} users
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Scope
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.avatar}
                        alt={user.name}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatScope(user.scope)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative dropdown-container">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button
                          onClick={() => handleMoreOptions(user.id)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical size={16} />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => handleResetPassword(user)}
                        >
                          Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleReset2FA(user)}>
                          Reset 2FA
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleUnlockAccount(user)}
                        >
                          Unlock Account
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditUser(user)}>
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteUser(user)}
                          className="text-red-600 focus:text-red-600"
                        >
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reset Password Modal */}
      {showResetModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Reset Password for {selectedUser?.name}
            </h3>
            <form onSubmit={handleResetPasswordSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="newPassword"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
                  placeholder="Enter new password"
                />
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowResetModal(false);
                    setNewPassword("");
                    setSelectedUser(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-red-600" size={24} />
              <h3 className="text-lg font-semibold text-gray-900">
                Delete User
              </h3>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <strong>{selectedUser?.name}</strong>? This action cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedUser(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteUser}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccessManagement;
