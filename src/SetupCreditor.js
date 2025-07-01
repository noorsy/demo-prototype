import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SetupCreditor() {
  const [name, setName] = useState( localStorage.getItem("creditorName") || "" );
  const [email, setEmail] = useState( localStorage.getItem("creditorEmail") || "" );
  const navigate = useNavigate();

  // Auto-generate email when name changes
  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    if (newName.trim()) {
      const generatedEmail = `contact@${newName.toLowerCase().replace(/\s+/g, '')}.com`;
      setEmail(generatedEmail);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (name.trim()) {
      localStorage.setItem("creditorName", name.trim());
      localStorage.setItem("creditorEmail", email.trim());
      navigate("/dashboard");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full border border-zinc-200"
      >
        <h1 className="text-2xl font-bold mb-4 text-center">Set Creditor Details</h1>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Creditor Name</label>
          <input
            className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm"
            value={name}
            onChange={handleNameChange}
            placeholder="e.g. NuBank"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <input
            className="w-full px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-inter text-sm"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="contact@nubank.com"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Auto-generated from creditor name. You can edit if needed.
          </p>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
        >
          Save & Continue
        </button>
      </form>
    </div>
  );
} 