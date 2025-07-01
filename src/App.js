import React from "react";
import Sidebar from "./Sidebar";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AIAgents from "./AIAgents";
import CreateAssistant from "./CreateAssistant";
import Campaigns from "./Campaigns";
import CreateCampaign from "./CreateCampaign";
import Analytics from "./Analytics";
import Onboarding from "./Onboarding";
import Dashboard from "./Dashboard";
import Recommendations from "./Recommendations";
import AccessManagement from "./AccessManagement";
import InviteUser from "./InviteUser";
import EditUser from "./EditUser";
import SetupCreditor from "./SetupCreditor";
import "./App.css";

const Placeholder = ({ title }) => (
  <div className="p-8 text-lg font-inter">{title} Page</div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Onboarding route is top-level, no sidebar */}
        <Route path="/ai-agents/onboarding" element={<Onboarding />} />
        {/* Setup Creditor route is also top-level, no sidebar */}
        <Route path="/setup-creditor" element={<SetupCreditor />} />
        {/* All other routes use the main app layout with sidebar */}
        <Route
          path="*"
          element={
            <div className="app-layout font-inter bg-zinc-100 min-h-screen flex">
              <Sidebar />
              <div className="flex-1 flex flex-col p-2">
                <div className="bg-white rounded-xl border flex-1 flex flex-col min-h-0 p-4">
                  <main className="flex-1 flex flex-col min-h-0">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/ai-agents" element={<AIAgents />} />
                      <Route
                        path="/ai-agents/create"
                        element={<CreateAssistant />}
                      />
                      <Route
                        path="/campaigns/create"
                        element={<CreateCampaign />}
                      />
                      <Route path="/campaigns" element={<Campaigns />} />
                      <Route
                        path="/conversations"
                        element={<Placeholder title="Conversations" />}
                      />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route
                        path="/accounts-data"
                        element={<Placeholder title="Accounts Data" />}
                      />
                      <Route
                        path="/agent-portal"
                        element={<Placeholder title="Agent Portal" />}
                      />
                      <Route
                        path="/journeys"
                        element={<Placeholder title="Journeys" />}
                      />
                      <Route
                        path="/workflows"
                        element={<Placeholder title="Workflows" />}
                      />
                      <Route
                        path="/recommendations"
                        element={<Recommendations />}
                      />
                      <Route
                        path="/access-management"
                        element={<AccessManagement />}
                      />
                      <Route
                        path="/access-management/invite"
                        element={<InviteUser />}
                      />
                      <Route
                        path="/access-management/edit"
                        element={<EditUser />}
                      />
                    </Routes>
                  </main>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
