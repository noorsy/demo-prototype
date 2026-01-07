import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "./Home";
import Dashboard from "./Dashboard";
import AIAgents from "./AIAgents";
import CreateAssistant from "./CreateAssistant";
import Campaigns from "./Campaigns";
import CreateCampaign from "./CreateCampaign";
import Analytics from "./Analytics";
import Conversations from "./Conversations";
import ConversationDetail from "./ConversationDetail";
import Recommendations from "./Recommendations";
import Workflows from "./Workflows";
import AccountData from "./AccountData";
import Integration from "./Integration";
import AccessManagement from "./AccessManagement";
import ExperienceCenter from "./ExperienceCenter";
import AssistantDetail from "./AssistantDetail";
import CreateSegment from "./CreateSegment";
import DemoPage from "./DemoPage";
import DemoTranscript from "./DemoTranscript";
import InviteUser from "./InviteUser";
import EditUser from "./EditUser";

const Placeholder = ({ title }) => (
  <div className="p-8 text-lg">{title} Page</div>
);

export default function SettingsRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background || "/";

  // Render the background page component directly based on path
  const renderBackgroundPage = () => {
    switch (background) {
      case "/":
        return <Home />;
      case "/dashboard":
        return <Dashboard />;
      case "/ai-agents":
        return <AIAgents />;
      case "/campaigns":
        return <Campaigns />;
      case "/conversations":
        return <Conversations />;
      case "/analytics":
        return <Analytics />;
      case "/accounts-data":
        return <AccountData />;
      case "/workflows":
        return <Workflows />;
      case "/recommendations":
        return <Recommendations />;
      case "/experience-center":
        return <ExperienceCenter />;
      case "/access-management":
        return <AccessManagement />;
      case "/integrations":
        return <Integration />;
      default:
        // Handle dynamic routes
        if (background.startsWith("/ai-agents/")) {
          const id = background.split("/ai-agents/")[1];
          return <AssistantDetail />;
        }
        if (background.startsWith("/campaigns/create")) {
          return <CreateCampaign />;
        }
        if (background.startsWith("/conversations/")) {
          return <ConversationDetail />;
        }
        return <Home />;
    }
  };

  return <div>{renderBackgroundPage()}</div>;
}

