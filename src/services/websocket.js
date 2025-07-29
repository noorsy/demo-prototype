import ActionCable from "actioncable";

class WebSocketService {
  constructor() {
    this.cable = null;
    this.subscription = null;
    this.callbacks = new Map();
  }

  connect(callId) {
    try {
      // Connect to Rails ActionCable
      this.cable = ActionCable.createConsumer("ws://localhost:3001/cable");

      // Subscribe to voice channel
      this.subscription = this.cable.subscriptions.create(
        { channel: "VoiceChannel", call_id: callId },
        {
          connected: () => {
            console.log("WebSocket connected for call:", callId);
          },
          disconnected: () => {
            console.log("WebSocket disconnected for call:", callId);
          },
          received: (data) => {
            this.handleMessage(data);
          },
        }
      );

      return true;
    } catch (error) {
      console.error("Failed to connect WebSocket:", error);
      return false;
    }
  }

  disconnect() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
    if (this.cable) {
      this.cable.disconnect();
      this.cable = null;
    }
  }

  handleMessage(data) {
    console.log("WebSocket message received:", data);

    // Handle different message types
    switch (data.type) {
      case "transcript":
        this.triggerCallback("transcript", data);
        break;
      case "audio_level":
        this.triggerCallback("audio_level", data);
        break;
      case "network_quality":
        this.triggerCallback("network_quality", data);
        break;
      case "call_status":
        this.triggerCallback("call_status", data);
        break;
      default:
        console.log("Unknown WebSocket message type:", data.type);
    }
  }

  on(event, callback) {
    if (!this.callbacks.has(event)) {
      this.callbacks.set(event, []);
    }
    this.callbacks.get(event).push(callback);
  }

  off(event, callback) {
    if (this.callbacks.has(event)) {
      const callbacks = this.callbacks.get(event);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  triggerCallback(event, data) {
    if (this.callbacks.has(event)) {
      this.callbacks.get(event).forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error("Error in WebSocket callback:", error);
        }
      });
    }
  }

  send(data) {
    if (this.subscription) {
      this.subscription.send(data);
    }
  }
}

export default new WebSocketService();
