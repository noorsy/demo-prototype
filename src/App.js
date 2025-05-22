import React from "react";
import Sidebar from "./Sidebar";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AIAgents from "./AIAgents";
import CreateAssistant from "./CreateAssistant";
import Campaigns from "./Campaigns";
import CreateCampaign from "./CreateCampaign";
import Analytics from "./Analytics";
import "./App.css";

const Placeholder = ({ title }) => (
  <div className="p-8 text-lg font-inter">{title} Page</div>
);

function App() {
  return (
    <Router>
      <div className="app-layout font-inter bg-zinc-100 min-h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col p-2">
          <div className="bg-white rounded-xl border border-zinc-200 flex-1 flex flex-col min-h-0 shadow-sm p-4">
            <main className="flex-1 flex flex-col min-h-0">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/ai-agents" element={<AIAgents />} />
                <Route path="/ai-agents/create" element={<CreateAssistant />} />
                <Route path="/campaigns/create" element={<CreateCampaign />} />
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
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
