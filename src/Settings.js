import React, { useState } from "react";
import {
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import {
  getVoicemailTemplates,
  addVoicemailTemplate,
  updateVoicemailTemplate,
  deleteVoicemailTemplate,
} from "./data/voicemailTemplates";

export default function Settings({ onClose }) {
  const [activeTab, setActiveTab] = useState("Organization");
  const [templates, setTemplates] = useState(getVoicemailTemplates());
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "dynamic",
    content: "",
    recording: null,
    recordingName: "",
  });

  // Refresh templates when modal closes or when templates are updated
  const refreshTemplates = () => {
    setTemplates(getVoicemailTemplates());
  };

  const handleCreateTemplate = () => {
    setEditingTemplate(null);
    setFormData({
      name: "",
      type: "dynamic",
      content: "",
      recording: null,
      recordingName: "",
    });
    setShowCreateModal(true);
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      type: template.type,
      content: template.content || "",
      recording: template.type === "recording" ? { name: template.name } : null,
      recordingName: template.type === "recording" ? template.name : "",
    });
    setShowCreateModal(true);
  };

  const handleDeleteTemplate = (id) => {
    if (window.confirm("Are you sure you want to delete this template?")) {
      deleteVoicemailTemplate(id);
      refreshTemplates();
    }
  };

  const handleSaveTemplate = () => {
    if (!formData.name.trim()) {
      alert("Please enter a template name");
      return;
    }

    if (formData.type === "dynamic" || formData.type === "static") {
      if (!formData.content.trim()) {
        alert("Please enter template content");
        return;
      }
    }

    if (formData.type === "recording" && !formData.recording) {
      alert("Please upload a recording");
      return;
    }

    const templateData = {
      name: formData.name,
      type: formData.type,
      content:
        formData.type === "recording"
          ? formData.recordingName
          : formData.content,
    };

    if (editingTemplate) {
      updateVoicemailTemplate(editingTemplate.id, templateData);
    } else {
      addVoicemailTemplate(templateData);
    }

    refreshTemplates();
    setShowCreateModal(false);
    setFormData({
      name: "",
      type: "dynamic",
      content: "",
      recording: null,
      recordingName: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gray-800 text-white px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Settings modal</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("Organization")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "Organization"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Organization
            </button>
            <button
              onClick={() => setActiveTab("User")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "User"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              User
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === "Organization" && (
            <div className="space-y-6">
              {/* Organization Info Section */}
              <div className="space-y-4">
                {/* Avatar */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl">🏢</span>
                  </div>
                </div>

                {/* Organization Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization name
                  </label>
                  <input
                    type="text"
                    defaultValue="Airbnb"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  />
                </div>

                {/* Organization ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization ID
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-900">ID 123</span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Primary Contact Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Contact Email
                  </label>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-900">kavyani.parwal@skit.ai</span>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </button>
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      Change Email
                    </button>
                  </div>
                </div>

                {/* Dashboard Configuration */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Dashboard configuration
                    </label>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                  <textarea
                    defaultValue="[]"
                    className="w-full h-24 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono"
                  />
                </div>
              </div>

              {/* Voicemail Templates Section */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Voicemail Templates
                    </h3>
                    <p className="text-sm text-gray-600">
                      Create and manage voicemail templates for your organization.
                      These templates can be used across assistants and campaigns.
                    </p>
                  </div>
                  <button
                    onClick={handleCreateTemplate}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                  >
                    <PlusIcon className="w-4 h-4" />
                    <span>Create Template</span>
                  </button>
                </div>

                {/* Templates List */}
                {templates.length === 0 ? (
                  <div className="text-center py-12 border border-gray-200 rounded-lg">
                    <p className="text-gray-500 mb-4">
                      No templates created yet
                    </p>
                    <button
                      onClick={handleCreateTemplate}
                      className="text-blue-600 hover:text-blue-700 font-medium"
                    >
                      Create your first template
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h4 className="text-sm font-medium text-gray-900">
                                {template.name}
                              </h4>
                              <span className="px-2 py-0.5 text-xs font-medium rounded bg-blue-100 text-blue-700">
                                {template.type === "dynamic"
                                  ? "Dynamic"
                                  : template.type === "static"
                                  ? "Static"
                                  : "Recording"}
                              </span>
                            </div>
                            {template.type !== "recording" && (
                              <p className="text-xs text-gray-500 line-clamp-2">
                                {template.content.substring(0, 100)}
                                {template.content.length > 100 ? "..." : ""}
                              </p>
                            )}
                            {template.type === "recording" && (
                              <p className="text-xs text-gray-500">
                                Recording file
                              </p>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => handleEditTemplate(template)}
                              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              <PencilIcon className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteTemplate(template.id)}
                              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <TrashIcon className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Save Button for Organization */}
              <div className="flex justify-start pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    // Handle save organization settings
                    alert("Organization settings saved");
                  }}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {activeTab === "User" && (
            <div className="space-y-6">
              {/* User Settings Content - Placeholder based on Figma */}
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      User Settings
                    </h3>
                    <p className="text-sm text-gray-600">
                      Manage your personal account settings
                    </p>
                  </div>
                </div>
                {/* Add user settings content here if needed */}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit Template Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingTemplate ? "Edit Template" : "Create Template"}
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Template Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Enter template name"
                />
              </div>

              {/* Template Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Template Type
                </label>
                <div className="space-y-3">
                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="template-type"
                      value="dynamic"
                      checked={formData.type === "dynamic"}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      className="mt-1 h-4 w-4 text-blue-600"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        Dynamic Messages
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Use JINJA templates for dynamic voicemail messages
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="template-type"
                      value="static"
                      checked={formData.type === "static"}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      className="mt-1 h-4 w-4 text-blue-600"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        Static Messages
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Use Skit's TTS for static messages
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="template-type"
                      value="recording"
                      checked={formData.type === "recording"}
                      onChange={(e) =>
                        setFormData({ ...formData, type: e.target.value })
                      }
                      className="mt-1 h-4 w-4 text-blue-600"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-900">
                        Static Recordings
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        Upload a static recording file
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Dynamic/Static Content */}
              {(formData.type === "dynamic" || formData.type === "static") && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {formData.type === "dynamic"
                      ? "Instructions (JINJA Template)"
                      : "Static Message"}
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    className="w-full h-40 p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono"
                    placeholder={
                      formData.type === "dynamic"
                        ? `{% if detailed_voicemail == "true" %}
Leave a detailed voicemail message...
{% else %}
Leave a brief voicemail message...
{% endif %}`
                        : "Hi, this is Alex from ABC Auto..."
                    }
                  />
                  {formData.type === "dynamic" && (
                    <p className="mt-2 text-xs text-gray-500">
                      Use JINJA2 syntax for conditional logic and variables
                    </p>
                  )}
                </div>
              )}

              {/* Recording Upload */}
              {formData.type === "recording" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Recording
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {formData.recording ? (
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700">
                          {formData.recordingName || formData.recording.name}
                        </p>
                        <button
                          onClick={() =>
                            setFormData({
                              ...formData,
                              recording: null,
                              recordingName: "",
                            })
                          }
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <input
                          type="file"
                          accept="audio/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setFormData({
                                ...formData,
                                recording: file,
                                recordingName: file.name,
                              });
                            }
                          }}
                          className="hidden"
                          id="recording-upload"
                        />
                        <label
                          htmlFor="recording-upload"
                          className="cursor-pointer"
                        >
                          <div className="text-gray-400 mb-2">
                            <svg
                              className="mx-auto h-12 w-12"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <span className="text-sm text-blue-600 hover:text-blue-800">
                            Click to upload
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            Audio files only
                          </p>
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveTemplate}
                className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
              >
                {editingTemplate ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

