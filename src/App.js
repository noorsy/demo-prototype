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
import ExperienceCenter from "./ExperienceCenter";
import AssistantDetail from "./AssistantDetail";

const Placeholder = ({ title }) => (
  <div className="p-8 text-lg">{title} Page</div>
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
            <div className="min-h-screen bg-background flex from-gray-50 to-gray-100 bg-gradient-to-b">
              <Sidebar />
              <div className="flex-1 flex flex-col p-2">
                <div className="bg-card rounded-lg border flex-1 flex flex-col min-h-0 p-4">
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
                        path="/experience-center"
                        element={<ExperienceCenter />}
                      />
                      <Route
                        path="/experience-center/:id"
                        element={<AssistantDetail />}
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
