import React, { useState, useEffect } from "react";
import PageHeader from "./PageHeader";
import { useNavigate } from "react-router-dom";
import {
  PlusIcon,
  MessageCircle,
  Mail,
  Smartphone,
  Phone,
  Globe,
  Mic,
  ChevronDown,
  Search,
  Filter,
  Bot,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import apiService from "./services/api";

const channelIcons = {
  phone: <Phone className="w-4 h-4 text-blue-500 mr-1" />,
  web: <Globe className="w-4 h-4 text-green-500 mr-1" />,
  email: <Mail className="w-4 h-4 text-yellow-500 mr-1" />,
  sms: <Smartphone className="w-4 h-4 text-purple-500 mr-1" />,
  voice: <Mic className="w-4 h-4 text-red-500 mr-1" />,
};

const statusOptions = ["All", "active", "inactive"];

export default function ExperienceCenter() {
  const [assistants, setAssistants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [status, setStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAssistants();
  }, []);

  const fetchAssistants = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getAssistants();
      setAssistants(response.assistants || []);
    } catch (error) {
      console.error("Failed to fetch assistants:", error);
      setError("Failed to fetch assistants. Please try again.");
      setAssistants([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncAssistants = async () => {
    try {
      setSyncing(true);
      await apiService.syncAssistants();
      await fetchAssistants(); // Refresh the list
    } catch (error) {
      console.error("Failed to sync assistants:", error);
      setError("Failed to sync assistants from VAPI.");
    } finally {
      setSyncing(false);
    }
  };

  const filteredAssistants = assistants.filter((agent) => {
    const matchesStatus = status === "All" || agent.status === status;
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (agent.description &&
        agent.description.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleAssistantClick = (assistant) => {
    navigate(`/experience-center/${assistant.id}`);
  };

  if (loading) {
    return (
      <div className="text-[14px]">
        <PageHeader title="Experience Center" />
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Bot className="w-16 h-16 mx-auto mb-4 text-muted-foreground animate-pulse" />
              <p className="text-muted-foreground">Loading assistants...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-[14px]">
      <PageHeader title="Experience Center" />
      <div className="p-6">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-800">Error</h3>
                <p className="text-sm text-red-700">{error}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setError(null);
                  fetchAssistants();
                }}
              >
                Retry
              </Button>
            </div>
          </div>
        )}

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Experience Center
              </h1>
              <p className="text-muted-foreground">
                Monitor and manage your AI assistants from VAPI
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleSyncAssistants}
                disabled={syncing}
              >
                <RefreshCw
                  className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`}
                />
                {syncing ? "Syncing..." : "Sync from VAPI"}
              </Button>
              <Button
                className="flex items-center gap-2"
                onClick={() => navigate("/ai-agents/create")}
              >
                <PlusIcon className="w-5 h-5 -ml-1" />
                Create Assistant
              </Button>
            </div>
          </div>

          {/* Filters and Search */}
          {assistants.length > 0 && (
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {/* Status Filter */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="min-w-[120px] flex items-center gap-2"
                    >
                      {status}
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {statusOptions.map((option) => (
                      <DropdownMenuItem
                        key={option}
                        onClick={() => setStatus(option)}
                        className={option === status ? "bg-accent" : ""}
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search assistants..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring w-64"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filters
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Agents Grid - Full Width */}
        {assistants.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAssistants.map((assistant) => (
              <Card
                key={assistant.id}
                className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group"
                onClick={() => handleAssistantClick(assistant)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {assistant.name}
                    </CardTitle>
                    <Badge
                      variant={
                        assistant.status === "active" ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {assistant.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {assistant.description || "No description available"}
                  </div>

                  {/* Channels */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {assistant.channels &&
                      assistant.channels.map((ch) => (
                        <Badge
                          key={ch}
                          variant="secondary"
                          className="flex items-center gap-1 text-xs"
                        >
                          {channelIcons[ch] || null}
                          {ch}
                        </Badge>
                      ))}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold text-foreground">
                        {assistant.conversations_count || 0}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Conversations
                      </div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-lg font-bold text-foreground">
                        {assistant.satisfaction_score || 0}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Satisfaction
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      View Details
                    </Button>
                    <Button variant="outline" size="sm">
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredAssistants.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <Bot className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">
                No assistants found
              </h3>
              <p className="text-sm">
                Try adjusting your filters or search terms
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
