const API_BASE_URL = "http://localhost:3001/api";

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  }

  // Assistant endpoints - All through backend
  async getAssistants() {
    return this.request("/assistants");
  }

  async getAssistant(id) {
    return this.request(`/assistants/${id}`);
  }

  async syncAssistants() {
    return this.request("/assistants/sync", {
      method: "POST",
    });
  }

  // Caller endpoints
  async getCallers(assistantId) {
    return this.request(`/assistants/${assistantId}/callers`);
  }

  async getCaller(id) {
    return this.request(`/callers/${id}`);
  }

  async createCaller(assistantId, callerData) {
    return this.request(`/assistants/${assistantId}/callers`, {
      method: "POST",
      body: JSON.stringify({ caller: callerData }),
    });
  }

  // Call endpoints
  async createCall(callerId) {
    return this.request("/calls", {
      method: "POST",
      body: JSON.stringify({ caller_id: callerId }),
    });
  }

  // Web call recording endpoint
  async recordWebCall(callerId, assistantId, callId) {
    return this.request("/web-calls/record", {
      method: "POST",
      body: JSON.stringify({
        caller_id: callerId,
        assistant_id: assistantId,
        call_id: callId,
      }),
    });
  }

  // Create web call via backend for better real-time performance
  async createWebCall(callData) {
    return this.request("/web-calls/create", {
      method: "POST",
      body: JSON.stringify(callData),
    });
  }
}

export default new ApiService();
