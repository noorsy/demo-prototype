import React from "react";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";
import { createPortal } from "react-dom";
import Settings from "./Settings";
import Home from "./Home";
import Dashboard from "./Dashboard";
import AIAgents from "./AIAgents";
import Campaigns from "./Campaigns";
import Analytics from "./Analytics";
import Conversations from "./Conversations";
import Recommendations from "./Recommendations";
import Workflows from "./Workflows";
import AccountData from "./AccountData";
import Integration from "./Integration";
import AccessManagement from "./AccessManagement";
import ExperienceCenter from "./ExperienceCenter";
import CreateAssistant from "./CreateAssistant";
import CreateCampaign from "./CreateCampaign";
import ConversationDetail from "./ConversationDetail";
import AssistantDetail from "./AssistantDetail";
import CreateSegment from "./CreateSegment";
import DemoPage from "./DemoPage";
import DemoTranscript from "./DemoTranscript";
import InviteUser from "./InviteUser";
import EditUser from "./EditUser";

const Placeholder = ({ title }) => (
  <div className="p-8 text-lg">{title} Page</div>
);

export default function MainLayout({ children }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isSettingsOpen = location.pathname === "/settings";
  const background = location.state?.background || "/";

  const handleCloseSettings = () => {
    if (background && background !== "/settings") {
      navigate(background, { replace: true });
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      {children}
      {/* Render Settings modal as overlay when on /settings route */}
      {isSettingsOpen &&
        createPortal(
          <div style={{ position: "fixed", inset: 0, zIndex: 50 }}>
            <Settings onClose={handleCloseSettings} />
          </div>,
          document.body
        )}
    </>
  );
}

