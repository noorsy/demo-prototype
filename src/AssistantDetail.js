import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageHeader from "./PageHeader";
import VapiClient from "@vapi-ai/web";
import {
  ArrowLeft,
  Phone,
  Plus,
  Search,
  Filter,
  ChevronDown,
  User,
  Mail,
  Building,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Globe,
  Check,
  MapPin,
  Mic,
  Volume2,
  Wifi,
  X,
  Settings,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import apiService from "./services/api";
import websocketService from "./services/websocket";

export default function AssistantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assistant, setAssistant] = useState(null);
  const [callers, setCallers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [callersLoading, setCallersLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCaller, setSelectedCaller] = useState(null);
  const [makingCall, setMakingCall] = useState(false);
  const [showAddCaller, setShowAddCaller] = useState(false);
  const [vapiInstance, setVapiInstance] = useState(null);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showCallInterface, setShowCallInterface] = useState(false);
  const [currentCall, setCurrentCall] = useState(null);
  const [transcripts, setTranscripts] = useState([]);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isAssistantSpeaking, setIsAssistantSpeaking] = useState(false);
  const [audioDevices, setAudioDevices] = useState({
    microphones: [],
    speakers: [],
  });
  const [audioDevicesLoading, setAudioDevicesLoading] = useState(true);
  const [selectedDevices, setSelectedDevices] = useState({
    microphone: "",
    speaker: "",
  });
  const [microphoneLevel, setMicrophoneLevel] = useState(0);
  const [wifiStrength, setWifiStrength] = useState(0);
  const [audioStream, setAudioStream] = useState(null);
  const [vapiMessageListener, setVapiMessageListener] = useState(null);
  const transcriptContainerRef = useRef(null);
  const [partialTranscripts, setPartialTranscripts] = useState({});
  const [networkQuality, setNetworkQuality] = useState("good");
  const [isUserSpeaking, setIsUserSpeaking] = useState(false);
  const [connectionQuality, setConnectionQuality] = useState("good");
  const [reconnectionAttempts, setReconnectionAttempts] = useState(0);
  const [latency, setLatency] = useState(0);
  const [newCaller, setNewCaller] = useState({
    name: "",
    phone_number: "",
    email: "",
    company: "",
    zip_code: "",
    address: "",
    notes: "",
  });

  useEffect(() => {
    fetchAssistant();
    fetchCallers();
    initializeVapi();
    getAudioDevices();
    checkWifiStrength();
  }, [id]);

  // Cleanup audio stream and VAPI listeners on unmount
  useEffect(() => {
    return () => {
      if (audioStream) {
        audioStream.getTracks().forEach((track) => track.stop());
      }
      if (
        vapiInstance &&
        typeof vapiInstance.off === "function" &&
        vapiMessageListener
      ) {
        vapiInstance.off("message", vapiMessageListener);
      }
    };
  }, [audioStream, vapiInstance, vapiMessageListener]);

  // Keyboard shortcut to end call (Escape key)
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Escape" && showCallInterface) {
        console.log("Escape key pressed - ending call");
        endCall();
      }
    };

    if (showCallInterface) {
      document.addEventListener("keydown", handleKeyPress);
      return () => {
        document.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [showCallInterface]);

  // Auto-scroll to latest transcript
  useEffect(() => {
    if (transcriptContainerRef.current && transcripts.length > 0) {
      transcriptContainerRef.current.scrollTop =
        transcriptContainerRef.current.scrollHeight;
    }
  }, [transcripts]);

  const checkWifiStrength = async () => {
    try {
      if ("connection" in navigator) {
        const connection = navigator.connection;
        if (connection.effectiveType) {
          // Convert connection type to strength (0-100)
          const strengthMap = {
            "slow-2g": 20,
            "2g": 40,
            "3g": 60,
            "4g": 80,
            "5g": 100,
          };
          setWifiStrength(strengthMap[connection.effectiveType] || 50);
        }
      } else {
        // Fallback: try to measure network speed
        const startTime = performance.now();
        try {
          await fetch("https://www.google.com/favicon.ico", {
            mode: "no-cors",
            cache: "no-cache",
          });
          const endTime = performance.now();
          const duration = endTime - startTime;
          // Convert response time to strength (faster = stronger)
          const strength = Math.max(0, 100 - duration / 10);
          setWifiStrength(Math.min(100, strength));
        } catch {
          setWifiStrength(30); // Low strength if fetch fails
        }
      }
    } catch (error) {
      console.error("Error checking WiFi strength:", error);
      setWifiStrength(50); // Default strength
    }
  };

  const getAudioDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();

      // Filter out devices with empty deviceId and ensure valid devices
      const microphones = devices
        .filter(
          (device) =>
            device.kind === "audioinput" &&
            device.deviceId &&
            device.deviceId.trim() !== ""
        )
        .map((device) => ({
          ...device,
          deviceId: device.deviceId || `mic-${Date.now()}-${Math.random()}`,
          label:
            device.label ||
            `Microphone ${device.deviceId?.slice(0, 8) || "Unknown"}`,
        }));

      const speakers = devices
        .filter(
          (device) =>
            device.kind === "audiooutput" &&
            device.deviceId &&
            device.deviceId.trim() !== ""
        )
        .map((device) => ({
          ...device,
          deviceId: device.deviceId || `speaker-${Date.now()}-${Math.random()}`,
          label:
            device.label ||
            `Speaker ${device.deviceId?.slice(0, 8) || "Unknown"}`,
        }));

      console.log("Available microphones:", microphones);
      console.log("Available speakers:", speakers);

      setAudioDevices({ microphones, speakers });
      setAudioDevicesLoading(false);

      // Set default devices only if we have valid devices
      if (microphones.length > 0) {
        setSelectedDevices((prev) => ({
          ...prev,
          microphone: microphones[0].deviceId,
        }));
      }
      if (speakers.length > 0) {
        setSelectedDevices((prev) => ({
          ...prev,
          speaker: speakers[0].deviceId,
        }));
      }
    } catch (error) {
      console.error("Error getting audio devices:", error);
      // Set empty arrays to prevent errors
      setAudioDevices({ microphones: [], speakers: [] });
      setAudioDevicesLoading(false);
    }
  };

  const requestMicrophoneAccess = async () => {
    try {
      console.log("Requesting microphone access...");

      // First try to get any audio device without specifying deviceId
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      setAudioStream(stream);
      console.log("Microphone access granted:", stream);

      // Set up audio level monitoring
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();
      analyser.fftSize = 256;
      source.connect(analyser);

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateMicrophoneLevel = () => {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / dataArray.length;
        const level = (average / 255) * 100;
        setMicrophoneLevel(level);
        requestAnimationFrame(updateMicrophoneLevel);
      };

      updateMicrophoneLevel();

      // Now refresh devices after permission is granted
      await getAudioDevices();
      return true;
    } catch (error) {
      console.error("Microphone access denied:", error);

      // Show a more helpful error message
      if (error.name === "NotAllowedError") {
        alert(
          "Microphone access was denied. Please:\n\n1. Click the microphone icon in your browser's address bar\n2. Select 'Allow' for microphone access\n3. Refresh the page and try again"
        );
      } else {
        alert(
          "Microphone access is required for web calls. Please allow microphone access and try again."
        );
      }
      return false;
    }
  };

  const initializeVapi = () => {
    const vapiKey = process.env.REACT_APP_VAPI_API_KEY;
    console.log("VAPI Key available:", !!vapiKey);
    console.log(
      "VAPI Key value:",
      vapiKey ? vapiKey.substring(0, 10) + "..." : "Not set"
    );

    if (vapiKey && vapiKey !== "your_vapi_api_key_here") {
      try {
        // Create VAPI instance with minimal configuration
        const vapi = new VapiClient(vapiKey);
        setVapiInstance(vapi);
        console.log("VAPI instance initialized with real-time optimizations");
        console.log("VAPI instance:", vapi);

        // Test the VAPI connection
        setTimeout(() => {
          console.log("VAPI instance after initialization:", vapi);
          console.log("VAPI started status:", vapi.started);
        }, 1000);
      } catch (error) {
        console.error("Failed to initialize VAPI:", error);
      }
    } else {
      console.error("VAPI API key not configured properly");
    }
  };

  const fetchAssistant = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAssistant(id);
      console.log("Assistant response:", response);
      setAssistant(response.assistant);
    } catch (error) {
      console.error("Failed to fetch assistant:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCallers = async () => {
    try {
      setCallersLoading(true);
      const response = await apiService.getCallers(id);
      setCallers(response.callers || []);
    } catch (error) {
      console.error("Failed to fetch callers:", error);
      setCallers([]);
    } finally {
      setCallersLoading(false);
    }
  };

  const handleMakeCall = async (callerId) => {
    try {
      setMakingCall(true);
      await apiService.createCall(callerId);
      alert("Phone call initiated successfully!");
    } catch (error) {
      console.error("Failed to make call:", error);
      alert("Failed to make call. Please try again.");
    } finally {
      setMakingCall(false);
    }
  };

  const handleWebCall = async (caller) => {
    if (!vapiInstance) {
      alert(
        "VAPI not configured. Please add your VAPI API key to the environment variables."
      );
      return;
    }

    setSelectedCaller(caller);
    setShowConfigModal(true);

    // Request microphone access when modal opens
    await requestMicrophoneAccess();
  };

  const startCall = async () => {
    if (!selectedCaller) return;

    try {
      console.log("Starting VAPI web call...");
      console.log("Assistant ID:", assistant.vapi_id);
      console.log("Caller data:", selectedCaller);

      setShowConfigModal(false);
      setShowCallInterface(true);
      setMakingCall(true);

      // Clear all previous transcripts and reset states
      setTranscripts([]);
      setPartialTranscripts({});
      setIsCallActive(false); // Start as false, will be set to true when call connects
      setIsAssistantSpeaking(false);
      setCurrentCall(null);

      // Clear any existing message listener
      if (
        vapiMessageListener &&
        vapiInstance &&
        typeof vapiInstance.off === "function"
      ) {
        vapiInstance.off("message", vapiMessageListener);
        setVapiMessageListener(null);
      }

      // Create web call using VAPI client SDK
      const callPayload = {
        assistant_id: assistant.vapi_id,
        user: {
          name: selectedCaller.name,
          phone_number: selectedCaller.phone_number,
          email: selectedCaller.email,
        },
        metadata: {
          caller_id: selectedCaller.id,
          assistant_id: assistant.id,
          company: selectedCaller.company,
          zip_code: selectedCaller.zip_code,
          address: selectedCaller.address,
          notes: selectedCaller.notes,
        },
      };

      console.log("VAPI call payload:", JSON.stringify(callPayload, null, 2));
      console.log("Assistant VAPI ID:", assistant.vapi_id);
      console.log("Assistant data:", assistant);
      console.log("VAPI Instance:", vapiInstance);
      console.log(
        "VAPI Instance methods:",
        Object.getOwnPropertyNames(Object.getPrototypeOf(vapiInstance))
      );

      // Start the call - this returns a call object that we can use
      let call;
      try {
        // Check if assistant has vapi_id
        if (!assistant.vapi_id) {
          throw new Error("Assistant does not have a VAPI ID");
        }

        // Validate assistant ID format (should be a UUID)
        const uuidRegex =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(assistant.vapi_id)) {
          console.warn(
            "Assistant VAPI ID does not match UUID format:",
            assistant.vapi_id
          );
        }

        console.log("VAPI instance started status:", vapiInstance.started);
        console.log("VAPI instance call status:", vapiInstance.call);
        console.log("VAPI instance properties:", Object.keys(vapiInstance));

        // Try to start the call using the VAPI SDK
        try {
          console.log(
            "Starting VAPI call with assistant ID:",
            assistant.vapi_id
          );

          // First, let's test if the assistant exists by making a simple API call
          console.log("Testing VAPI connection...");

          // Method 1: Simple start with assistant ID
          call = await vapiInstance.start(assistant.vapi_id);
          console.log("VAPI call result:", call);

          if (!call) {
            throw new Error(
              "VAPI start returned null - assistant may not exist or API key may be invalid"
            );
          }
        } catch (error) {
          console.error("VAPI start error:", error);

          // Try alternative approach - check if we need to use a different method
          try {
            console.log("Trying alternative approach with configuration");
            call = await vapiInstance.start({
              assistantId: assistant.vapi_id,
              user: {
                name: selectedCaller.name,
                phone_number: selectedCaller.phone_number,
                email: selectedCaller.email,
              },
            });
            console.log("Alternative approach result:", call);
          } catch (altError) {
            console.error("Alternative approach also failed:", altError);
            throw new Error(
              `VAPI call failed: ${error.message}. Assistant ID: ${assistant.vapi_id}`
            );
          }
        }
        console.log("VAPI call created successfully:", call);
      } catch (error) {
        console.error("VAPI start error:", error);
        console.error("Error details:", {
          message: error.message,
          code: error.code,
          stack: error.stack,
          assistantId: assistant.vapi_id,
          assistantData: assistant,
          callerId: selectedCaller.id,
          vapiInstance: vapiInstance,
        });
        throw error;
      }
      // Check if call was created successfully
      if (!call) {
        throw new Error("VAPI call creation failed - no call object returned");
      }

      setCurrentCall(call);

      // Connect to WebSocket for real-time communication
      const callId = call.id || `call_${Date.now()}`;
      console.log("Using call ID for WebSocket:", callId);
      websocketService.connect(callId);

      // Set up WebSocket event listeners
      websocketService.on("transcript", (data) => {
        console.log("WebSocket transcript:", data);
        // Handle real-time transcript updates
        setTranscripts((prev) => [
          ...prev,
          {
            role: data.role,
            transcript: data.transcript,
            timestamp: data.timestamp,
            isPartial: false,
            isFinal: true,
          },
        ]);
      });

      websocketService.on("audio_level", (data) => {
        console.log("WebSocket audio level:", data);
        if (data.role === "user") {
          setMicrophoneLevel(Math.min(100, data.level * 100 * 5));
        }
      });

      websocketService.on("network_quality", (data) => {
        console.log("WebSocket network quality:", data);
        setNetworkQuality(data.quality);
        setConnectionQuality(data.quality);
      });

      websocketService.on("call_status", (data) => {
        console.log("WebSocket call status:", data);
        if (data.status === "connected") {
          setIsCallActive(true);
        } else if (data.status === "disconnected") {
          setIsCallActive(false);
        }
      });

      // Optimize audio settings for real-time voice communication
      try {
        // Update send settings for real-time performance
        if (typeof vapiInstance.updateSendSettings === "function") {
          vapiInstance.updateSendSettings({
            audio: {
              bitrate: 32000, // Lower bitrate for lower latency
              sampleRate: 16000, // Lower sample rate for faster processing
              channels: 1, // Mono for voice calls
              codec: "opus", // Use Opus codec for better real-time performance
            },
          });
        }

        // Update receive settings for real-time performance
        if (typeof vapiInstance.updateReceiveSettings === "function") {
          vapiInstance.updateReceiveSettings({
            audio: {
              bitrate: 32000,
              sampleRate: 16000,
              channels: 1,
              codec: "opus",
            },
          });
        }

        // Update input settings for real-time performance
        if (typeof vapiInstance.updateInputSettings === "function") {
          vapiInstance.updateInputSettings({
            audio: {
              echoCancellation: true,
              noiseSuppression: true,
              autoGainControl: true,
              // Real-time optimizations
              latency: 0.01, // 10ms latency target
              jitterBuffer: 0.02, // 20ms jitter buffer
              packetLoss: 0.01, // 1% packet loss tolerance
            },
          });
        }

        console.log(
          "Audio settings optimized for real-time voice communication"
        );
      } catch (error) {
        console.warn("Could not optimize audio settings:", error);
      }

      // Set up VAPI event listeners for live transcripts and network monitoring
      const messageListener = (message) => {
        console.log("VAPI message received:", message);

        // Handle null or undefined messages
        if (!message) {
          console.log("Received null/undefined message from VAPI");
          return;
        }

        // Handle different message types
        switch (message.type) {
          case "call-start":
            console.log("Call started successfully");
            setIsCallActive(true);
            setMakingCall(false);
            break;

          case "transcript":
            console.log(
              `${message.role}: ${message.transcript} (${message.transcriptType})`
            );

            if (message.transcriptType === "partial") {
              // Store partial transcript for this role
              setPartialTranscripts((prev) => ({
                ...prev,
                [message.role]: {
                  text: message.transcript,
                  timestamp: Date.now(),
                  isPartial: true,
                },
              }));

              // Update or create a partial message in transcripts
              setTranscripts((prev) => {
                const lastMessage = prev[prev.length - 1];

                // If the last message is from the same role and is partial, update it
                if (
                  lastMessage &&
                  lastMessage.role === message.role &&
                  lastMessage.isPartial
                ) {
                  const updatedTranscripts = [...prev];
                  updatedTranscripts[updatedTranscripts.length - 1] = {
                    ...lastMessage,
                    text: message.transcript,
                    timestamp: Date.now(),
                  };
                  return updatedTranscripts;
                } else {
                  // Create new partial message
                  const newPartialMessage = {
                    role: message.role,
                    text: message.transcript,
                    timestamp: Date.now(),
                    isPartial: true,
                    isFinal: false,
                    id: `${message.role}-partial-${Date.now()}`,
                  };
                  return [...prev, newPartialMessage];
                }
              });
            } else if (message.transcriptType === "final") {
              // Final transcript - replace the partial with final
              setPartialTranscripts((prev) => {
                const newPartial = { ...prev };
                delete newPartial[message.role];
                return newPartial;
              });

              setTranscripts((prev) => {
                const lastMessage = prev[prev.length - 1];

                // If the last message is from the same role and is partial, replace it with final
                if (
                  lastMessage &&
                  lastMessage.role === message.role &&
                  lastMessage.isPartial
                ) {
                  const updatedTranscripts = [...prev];
                  updatedTranscripts[updatedTranscripts.length - 1] = {
                    ...lastMessage,
                    text: message.transcript,
                    timestamp: Date.now(),
                    isPartial: false,
                    isFinal: true,
                  };
                  return updatedTranscripts;
                } else {
                  // Check if this final transcript is a duplicate
                  const isDuplicate = prev.some(
                    (t) =>
                      t.role === message.role &&
                      t.text === message.transcript &&
                      t.isFinal
                  );

                  if (isDuplicate) {
                    console.log(
                      "Skipping duplicate final transcript:",
                      message.transcript
                    );
                    return prev;
                  }

                  // Add new final message
                  const newFinalMessage = {
                    role: message.role,
                    text: message.transcript,
                    timestamp: Date.now(),
                    isPartial: false,
                    isFinal: true,
                    id: `${message.role}-final-${Date.now()}`,
                  };
                  return [...prev, newFinalMessage];
                }
              });
            }
            break;

          case "conversation-update":
            console.log("Conversation updated:", {
              conversationLength: message.conversation?.length,
              messagesLength: message.messages?.length,
              conversation: message.conversation,
              messages: message.messages,
            });

            // Log conversation progress for debugging
            if (message.conversation && message.conversation.length > 0) {
              const lastConversationItem =
                message.conversation[message.conversation.length - 1];
              console.log("Latest conversation item:", lastConversationItem);
            }
            break;

          case "model-output":
            console.log("Model output received:", message.output);
            // Handle model output - this is the AI's response being generated
            if (message.output && typeof message.output === "string") {
              setTranscripts((prev) => {
                const lastMessage = prev[prev.length - 1];

                // If the last message is from assistant and is partial, update it
                if (
                  lastMessage &&
                  lastMessage.role === "assistant" &&
                  lastMessage.isPartial
                ) {
                  const updatedTranscripts = [...prev];
                  updatedTranscripts[updatedTranscripts.length - 1] = {
                    ...lastMessage,
                    text: lastMessage.text + message.output,
                    timestamp: Date.now(),
                  };
                  return updatedTranscripts;
                } else {
                  // Create new partial assistant message
                  const newPartialMessage = {
                    role: "assistant",
                    text: message.output,
                    timestamp: Date.now(),
                    isPartial: true,
                    isFinal: false,
                    id: `assistant-model-output-${Date.now()}`,
                  };
                  return [...prev, newPartialMessage];
                }
              });

              // Set assistant as speaking when we receive model output
              setIsAssistantSpeaking(true);
            }
            break;

          case "speech-update":
            console.log("Speech update:", {
              status: message.status,
              role: message.role,
              turn: message.turn,
            });

            // Handle speech status changes
            if (message.role === "assistant") {
              if (message.status === "started") {
                setIsAssistantSpeaking(true);
                console.log("Assistant started speaking");
              } else if (message.status === "stopped") {
                setIsAssistantSpeaking(false);
                console.log("Assistant finished speaking");

                // When assistant stops speaking, mark the last partial message as final
                setTranscripts((prev) => {
                  const lastMessage = prev[prev.length - 1];
                  if (
                    lastMessage &&
                    lastMessage.role === "assistant" &&
                    lastMessage.isPartial
                  ) {
                    const updatedTranscripts = [...prev];
                    updatedTranscripts[updatedTranscripts.length - 1] = {
                      ...lastMessage,
                      isPartial: false,
                      isFinal: true,
                      timestamp: Date.now(),
                    };
                    return updatedTranscripts;
                  }
                  return prev;
                });
              }
            } else if (message.role === "user") {
              // Handle user speech updates
              if (message.status === "started") {
                setIsUserSpeaking(true);
                console.log("User started speaking");
              } else if (message.status === "stopped") {
                setIsUserSpeaking(false);
                console.log("User finished speaking");
              }
            }
            break;

          case "call-end":
            console.log("Call ended via VAPI message");
            setIsCallActive(false);
            setMakingCall(false);
            // Record the call in our backend for history
            apiService
              .recordWebCall(
                selectedCaller.id,
                assistant.vapi_id,
                call?.id || "unknown"
              )
              .catch((error) =>
                console.error("Failed to record call in backend:", error)
              );
            break;

          case "error":
            console.error("VAPI error message:", message);
            setIsCallActive(false);
            setMakingCall(false);
            alert("Call ended with an error. Please try again.");
            break;

          case "status-update":
            console.log("Status update received:", message);
            if (message.status === "ended") {
              console.log("Call ended with reason:", message.endedReason);
              setIsCallActive(false);
              setMakingCall(false);
              // Auto-hide call interface after a short delay
              setTimeout(() => {
                setShowCallInterface(false);
                setCurrentCall(null);
                setTranscripts([]);
                setPartialTranscripts({});
              }, 2000);
            } else if (message.status === "connected") {
              setIsCallActive(true);
              setMakingCall(false);
            }
            break;

          default:
            // Log any other message types for debugging
            console.log("Unknown message type:", message.type, message);
            break;
        }
      };

      // Set up network quality monitoring
      const networkQualityListener = (event) => {
        console.log("Network quality changed:", event);
        // Ensure we always set a valid string value
        const quality =
          typeof event.quality === "string" ? event.quality : "good";
        setNetworkQuality(quality);
        setConnectionQuality(quality);

        // Handle poor network quality
        if (quality === "poor") {
          console.warn("Poor network quality detected - voice may be affected");
          // Try to optimize connection
          if (
            vapiInstance &&
            typeof vapiInstance.updateSendSettings === "function"
          ) {
            try {
              vapiInstance.updateSendSettings({
                audio: {
                  bitrate: 16000, // Further reduce bitrate for poor connections
                  sampleRate: 8000, // Lower sample rate
                  channels: 1,
                },
              });
              console.log("Reduced audio quality for poor network connection");
            } catch (error) {
              console.warn(
                "Could not adjust audio settings for poor network:",
                error
              );
            }
          }
        }
      };

      const networkConnectionListener = (event) => {
        console.log("Network connection status:", event);

        // Handle connection issues
        if (event.status === "disconnected" || event.status === "failed") {
          console.warn("Network connection lost, attempting to reconnect...");
          setConnectionQuality("poor");

          // Attempt automatic reconnection
          if (reconnectionAttempts < 3) {
            setTimeout(() => {
              console.log(`Reconnection attempt ${reconnectionAttempts + 1}/3`);
              setReconnectionAttempts((prev) => prev + 1);

              // Try to restart the call
              if (vapiInstance && isCallActive) {
                try {
                  console.log("Attempting to restart call...");
                  // The VAPI instance should handle reconnection automatically
                } catch (error) {
                  console.error("Failed to reconnect:", error);
                }
              }
            }, 2000); // Wait 2 seconds before reconnection attempt
          } else {
            console.error("Max reconnection attempts reached");
            alert("Connection lost. Please try starting a new call.");
          }
        } else if (event.status === "connected") {
          console.log("Network connection restored");
          setConnectionQuality("good");
          setReconnectionAttempts(0);
        }
      };

      // Set up audio level monitoring for better voice quality
      const volumeLevelListener = (event) => {
        console.log("Volume level:", event);
        // Update microphone level display with better sensitivity
        if (event.role === "user") {
          // Convert to percentage and apply some amplification for better visibility
          const level = Math.min(100, event.level * 100 * 5); // Amplify by 5x for better visibility
          setMicrophoneLevel(level);

          // Log if volume is consistently very low (potential microphone issue)
          if (event.level < 0.01) {
            console.warn(
              "Very low microphone level detected. Check microphone settings or permissions."
            );
          }
        }
      };

      // Monitor latency for real-time performance
      const latencyMonitor = () => {
        if (isCallActive) {
          const startTime = performance.now();
          // Send a ping-like message to measure latency
          if (vapiInstance && typeof vapiInstance.send === "function") {
            try {
              vapiInstance.send({ type: "ping", timestamp: startTime });
            } catch (error) {
              // Ignore ping errors, just measure what we can
            }
          }

          // Update latency periodically
          setTimeout(() => {
            const endTime = performance.now();
            const currentLatency = endTime - startTime;
            setLatency(Math.round(currentLatency));

            // Warn if latency is too high
            if (currentLatency > 200) {
              console.warn(
                `High latency detected: ${Math.round(currentLatency)}ms`
              );
            }
          }, 100);
        }
      };

      // Start latency monitoring
      const latencyInterval = setInterval(latencyMonitor, 5000); // Check every 5 seconds

      // Remove any existing listener before adding a new one
      if (
        vapiMessageListener &&
        vapiInstance &&
        typeof vapiInstance.off === "function"
      ) {
        vapiInstance.off("message", vapiMessageListener);
      }

      setVapiMessageListener(messageListener);

      // Add all event listeners with error handling
      try {
        vapiInstance.on("message", messageListener);
        vapiInstance.on("network-quality-change", networkQualityListener);
        vapiInstance.on("network-connection", networkConnectionListener);
        vapiInstance.on("volume-level", volumeLevelListener);

        console.log("VAPI event listeners added successfully");

        // Also log all available VAPI events for debugging
        console.log(
          "Available VAPI events:",
          Object.getOwnPropertyNames(vapiInstance)
        );
        console.log(
          "VAPI instance methods:",
          Object.getOwnPropertyNames(Object.getPrototypeOf(vapiInstance))
        );
      } catch (error) {
        console.error("Failed to add VAPI event listeners:", error);
        // Continue without the listeners rather than failing the call
      }

      // Also set up call-specific event listeners if available
      if (call && typeof call.on === "function") {
        call.on("transcript", (transcript) => {
          console.log("Call transcript received:", transcript);
          setTranscripts((prev) => [...prev, transcript]);
        });

        call.on("call-end", (data) => {
          console.log("Call ended:", data);
          setIsCallActive(false);
          setMakingCall(false);
          // Record the call in our backend for history
          apiService
            .recordWebCall(
              selectedCaller.id,
              assistant.vapi_id,
              call?.id || "unknown"
            )
            .catch((error) =>
              console.error("Failed to record call in backend:", error)
            );
        });

        call.on("error", (error) => {
          console.error("VAPI call error:", error);
          console.error("Error details:", {
            message: error.message,
            code: error.code,
            stack: error.stack,
            callId: call?.id,
            assistantId: assistant.vapi_id,
            callerId: selectedCaller.id,
          });
          setIsCallActive(false);
          setMakingCall(false);
          alert("Call ended with an error. Please try again.");
        });
      } else {
        console.log(
          "Call object does not have .on method, using VAPI instance events"
        );
        console.log("Call object:", call);

        // Mark as active since we're using VAPI instance events
        setIsCallActive(true);
        setMakingCall(false);
      }
    } catch (error) {
      console.error("Failed to create web call:", error);
      console.error("Error details:", {
        message: error.message,
        code: error.code,
        stack: error.stack,
        assistantId: assistant.vapi_id,
        callerId: selectedCaller.id,
        vapiInstance: !!vapiInstance,
        apiKey: process.env.REACT_APP_VAPI_API_KEY ? "Set" : "Not set",
      });
      alert("Failed to create web call. Please try again.");
      setMakingCall(false);
      setShowCallInterface(false);
    }
  };

  const endCall = () => {
    console.log("endCall function called");
    console.log("Current call object:", currentCall);
    console.log("VAPI instance:", vapiInstance);
    console.log("Show call interface:", showCallInterface);

    // Disconnect WebSocket for real-time communication
    websocketService.disconnect();

    // Based on logs: VAPI instance has 'stop' method, call object is null
    // Use vapiInstance.stop() to end the call

    // Stop the call using VAPI instance
    if (vapiInstance) {
      console.log("VAPI instance has stop method, using it to end call...");

      // Use the stop method directly since we confirmed it exists
      try {
        vapiInstance.stop();
        console.log("Call stopped successfully via vapiInstance.stop()");
      } catch (error) {
        console.error("Error stopping call via vapiInstance.stop():", error);
      }
    } else if (currentCall) {
      console.log(
        "VAPI instance not available, trying call object as fallback..."
      );
      // Fallback: try call object methods if VAPI instance is not available
      if (typeof currentCall.stop === "function") {
        try {
          currentCall.stop();
          console.log("Call stopped successfully via currentCall.stop()");
        } catch (error) {
          console.error("Error stopping call via currentCall.stop():", error);
        }
      } else {
        console.log("No stop method found on call object");
      }
    }

    // Remove VAPI event listeners
    if (
      vapiInstance &&
      typeof vapiInstance.off === "function" &&
      vapiMessageListener
    ) {
      console.log("Removing VAPI message listener...");
      vapiInstance.off("message", vapiMessageListener);
      setVapiMessageListener(null);
    }

    // Stop audio stream
    if (audioStream) {
      console.log("Stopping audio stream...");
      audioStream.getTracks().forEach((track) => track.stop());
      setAudioStream(null);
    }

    // Reset all states
    console.log("Resetting call states...");
    setShowCallInterface(false);
    setCurrentCall(null);
    setIsCallActive(false);
    setIsAssistantSpeaking(false);
    setMakingCall(false);
    setTranscripts([]);
    setPartialTranscripts({});
    setMicrophoneLevel(0);

    console.log("Call ended successfully");
  };

  const handleAddCaller = async () => {
    try {
      await apiService.createCaller(id, newCaller);
      setNewCaller({
        name: "",
        phone_number: "",
        email: "",
        company: "",
        zip_code: "",
        address: "",
        notes: "",
      });
      setShowAddCaller(false);
      fetchCallers(); // Refresh the list
    } catch (error) {
      console.error("Failed to add caller:", error);
      alert("Failed to add caller. Please try again.");
    }
  };

  const filteredCallers = callers.filter(
    (caller) =>
      caller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caller.phone_number.includes(searchTerm) ||
      (caller.email &&
        caller.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="text-[14px]">
        <PageHeader title="Assistant Details" />
        <div className="p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">
                Loading assistant details...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!assistant) {
    return (
      <div className="text-[14px]">
        <PageHeader title="Assistant Not Found" />
        <div className="p-6">
          <div className="text-center">
            <p className="text-muted-foreground">Assistant not found.</p>
            <Button
              onClick={() => navigate("/experience-center")}
              className="mt-4"
            >
              Back to Experience Center
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Configuration Modal
  if (showConfigModal) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Configuration</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowConfigModal(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2 mb-4 text-sm text-gray-600">
            <Wifi className="w-4 h-4" />
            <span>
              Use a stable internet connection for the best experience.
            </span>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-xs">WiFi:</span>
              <div className="w-16 h-2 bg-gray-200 rounded">
                <div
                  className={`h-2 rounded ${
                    wifiStrength > 70
                      ? "bg-green-500"
                      : wifiStrength > 40
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${wifiStrength}%` }}
                ></div>
              </div>
              <span className="text-xs">{Math.round(wifiStrength)}%</span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Microphone
              </label>
              <Select
                value={selectedDevices.microphone}
                onValueChange={(value) =>
                  setSelectedDevices((prev) => ({ ...prev, microphone: value }))
                }
                disabled={audioDevicesLoading}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      audioDevicesLoading ? "Loading..." : "Select microphone"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {audioDevices.microphones.length > 0 ? (
                    audioDevices.microphones.map((device) => (
                      <SelectItem key={device.deviceId} value={device.deviceId}>
                        <div className="flex items-center gap-2">
                          <Mic className="w-4 h-4" />
                          {device.label}
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-devices" disabled>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Mic className="w-4 h-4" />
                        No microphones available
                      </div>
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <div className="mt-2 h-1 bg-gray-200 rounded">
                <div
                  className={`h-1 rounded ${
                    microphoneLevel > 70
                      ? "bg-green-500"
                      : microphoneLevel > 30
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${microphoneLevel}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 mt-1">
                <span>Microphone Level</span>
                <div className="flex items-center gap-2">
                  <span>{Math.round(microphoneLevel)}%</span>
                  {microphoneLevel === 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={requestMicrophoneAccess}
                      className="h-6 px-2 text-xs"
                    >
                      Refresh
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Speaker</label>
              <Select
                value={selectedDevices.speaker}
                onValueChange={(value) =>
                  setSelectedDevices((prev) => ({ ...prev, speaker: value }))
                }
                disabled={audioDevicesLoading}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      audioDevicesLoading ? "Loading..." : "Select speaker"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {audioDevices.speakers.length > 0 ? (
                    audioDevices.speakers.map((device) => (
                      <SelectItem key={device.deviceId} value={device.deviceId}>
                        <div className="flex items-center gap-2">
                          <Volume2 className="w-4 h-4" />
                          {device.label}
                        </div>
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="no-speakers" disabled>
                      <div className="flex items-center gap-2 text-gray-500">
                        <Volume2 className="w-4 h-4" />
                        No speakers available
                      </div>
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowConfigModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={startCall}
              disabled={makingCall}
              className="flex-1 bg-black hover:bg-gray-800"
            >
              {makingCall ? "Starting..." : "Get Started"}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Call Interface
  if (showCallInterface) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex z-50">
        {/* Left Sidebar - User Details */}
        <div className="w-80 bg-white/95 backdrop-blur-sm border-r border-gray-200 flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3 mb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  console.log("Back button clicked");
                  endCall();
                }}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h2 className="font-semibold text-gray-900">Call Details</h2>
            </div>

            {/* Assistant Info */}
            <div className="bg-blue-50 rounded-lg p-4 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900">
                    {assistant.name}
                  </h3>
                  <p className="text-sm text-blue-700">AI Assistant</p>
                </div>
              </div>
              <p className="text-sm text-blue-800">
                {assistant.description || "No description available"}
              </p>
            </div>

            {/* Caller Info */}
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-900">
                    {selectedCaller?.name}
                  </h3>
                  <p className="text-sm text-green-700">Caller</p>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-600" />
                  <span className="text-green-800">
                    {selectedCaller?.phone_number}
                  </span>
                </div>
                {selectedCaller?.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-green-600" />
                    <span className="text-green-800">
                      {selectedCaller.email}
                    </span>
                  </div>
                )}
                {selectedCaller?.company && (
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-green-600" />
                    <span className="text-green-800">
                      {selectedCaller.company}
                    </span>
                  </div>
                )}
                {(selectedCaller?.zip_code || selectedCaller?.address) && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span className="text-green-800">
                      {selectedCaller.zip_code && selectedCaller.address
                        ? `${selectedCaller.zip_code}, ${selectedCaller.address}`
                        : selectedCaller.zip_code || selectedCaller.address}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Call Status */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="font-medium text-gray-900 mb-3">Call Status</h3>
            <div className="space-y-3">
              {/* Connection Status */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Connection</span>
                <div className="flex items-center gap-2">
                  {isCallActive ? (
                    <div className="flex items-center gap-1 text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Live</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Connecting...</span>
                  )}
                </div>
              </div>

              {/* Signal Strength */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Signal</span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
                    <div
                      className={`w-1 h-4 rounded-full ${
                        wifiStrength > 20 ? "bg-gray-400" : "bg-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`w-1 h-5 rounded-full ${
                        wifiStrength > 40 ? "bg-gray-500" : "bg-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`w-1 h-6 rounded-full ${
                        wifiStrength > 60 ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                    <div
                      className={`w-1 h-7 rounded-full ${
                        wifiStrength > 80 ? "bg-green-600" : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 font-medium">
                    {Math.round(wifiStrength)}%
                  </span>
                </div>
              </div>

              {/* Network Quality */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Network</span>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      networkQuality === "excellent"
                        ? "bg-green-500"
                        : networkQuality === "good"
                        ? "bg-green-400"
                        : networkQuality === "fair"
                        ? "bg-yellow-500"
                        : networkQuality === "poor"
                        ? "bg-red-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <span
                    className={`text-xs font-medium ${
                      networkQuality === "excellent"
                        ? "text-green-600"
                        : networkQuality === "good"
                        ? "text-green-500"
                        : networkQuality === "fair"
                        ? "text-yellow-600"
                        : networkQuality === "poor"
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    {typeof networkQuality === "string" &&
                    networkQuality.length > 0
                      ? networkQuality.charAt(0).toUpperCase() +
                        networkQuality.slice(1)
                      : "Good"}
                  </span>
                </div>
              </div>

              {/* Connection Quality */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Connection</span>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      connectionQuality === "excellent"
                        ? "bg-green-500"
                        : connectionQuality === "good"
                        ? "bg-green-400"
                        : connectionQuality === "fair"
                        ? "bg-yellow-500"
                        : connectionQuality === "poor"
                        ? "bg-red-500"
                        : "bg-gray-300"
                    }`}
                  ></div>
                  <span
                    className={`text-xs font-medium ${
                      connectionQuality === "excellent"
                        ? "text-green-600"
                        : connectionQuality === "good"
                        ? "text-green-500"
                        : connectionQuality === "fair"
                        ? "text-yellow-600"
                        : connectionQuality === "poor"
                        ? "text-red-600"
                        : "text-gray-500"
                    }`}
                  >
                    {connectionQuality.charAt(0).toUpperCase() +
                      connectionQuality.slice(1)}
                    {reconnectionAttempts > 0 && (
                      <span className="text-orange-600 ml-1">
                        ({reconnectionAttempts}/3)
                      </span>
                    )}
                  </span>
                </div>
              </div>

              {/* Assistant Speaking */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Assistant</span>
                <div className="flex items-center gap-2">
                  {isAssistantSpeaking ? (
                    <div className="flex items-center gap-1 text-blue-600">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Speaking</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Listening</span>
                  )}
                </div>
              </div>

              {/* User Speaking */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">You</span>
                <div className="flex items-center gap-2">
                  {isUserSpeaking ? (
                    <div className="flex items-center gap-1 text-green-600">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Speaking</span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">Silent</span>
                  )}
                </div>
              </div>

              {/* Call Duration */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Duration</span>
                <span className="text-sm text-gray-900 font-medium">
                  {isCallActive ? "Active" : "Starting..."}
                </span>
              </div>

              {/* Latency */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Latency</span>
                <span
                  className={`text-sm font-medium ${
                    latency < 100
                      ? "text-green-600"
                      : latency < 200
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {latency}ms
                </span>
              </div>
            </div>
          </div>

          {/* Call Controls */}
          <div className="p-6 mt-auto">
            <div className="space-y-3">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  console.log("Mute button clicked");
                  // TODO: Implement mute functionality
                }}
                className="w-full border-gray-300 hover:bg-gray-50"
              >
                <Mic className="w-5 h-5 mr-2" />
                Mute
              </Button>

              <Button
                variant="destructive"
                size="lg"
                onClick={() => {
                  console.log("End Call button clicked");
                  endCall();
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                End Call
              </Button>
            </div>

            {/* Keyboard shortcut hint */}
            <div className="text-center mt-4">
              <p className="text-xs text-gray-500">
                Press{" "}
                <kbd className="px-2 py-1 bg-gray-100 rounded text-xs font-mono">
                  Esc
                </kbd>{" "}
                to end call
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Transcript */}
        <div className="flex-1 flex flex-col">
          {/* Transcript Header */}
          <div className="bg-white/95 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">Live Transcript</h2>
                <p className="text-sm text-gray-600">
                  Call ID: {currentCall?.id || "Unknown"} • Messages:{" "}
                  {transcripts.length}
                </p>
              </div>
            </div>
          </div>

          {/* Transcripts */}
          <div
            ref={transcriptContainerRef}
            className="flex-1 overflow-y-auto p-6"
          >
            <div className="max-w-4xl mx-auto space-y-6">
              {transcripts.length === 0 ? (
                <div className="text-center text-gray-400 mt-20">
                  <div className="animate-pulse">
                    <div className="w-20 h-20 bg-gray-700 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <MessageSquare className="w-10 h-10 text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      Connecting to assistant...
                    </h3>
                    <p className="text-sm">
                      Please wait while we establish the connection
                    </p>
                  </div>
                </div>
              ) : (
                transcripts.map((transcript) => (
                  <div
                    key={
                      transcript.id ||
                      `${transcript.role}-${transcript.timestamp}`
                    }
                    className={`flex gap-4 ${
                      transcript.role === "user"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    {/* Bot Message */}
                    {transcript.role === "assistant" && (
                      <div className="flex items-start gap-3 max-w-[80%]">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <MessageSquare className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-white rounded-2xl rounded-tl-md px-6 py-4 shadow-sm border border-gray-100">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                              AI Assistant
                            </span>
                            {isAssistantSpeaking &&
                              transcript ===
                                transcripts[transcripts.length - 1] && (
                                <div className="flex items-center gap-1">
                                  <div className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"></div>
                                  <div
                                    className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"
                                    style={{ animationDelay: "0.2s" }}
                                  ></div>
                                  <div
                                    className="w-1 h-1 bg-blue-500 rounded-full animate-pulse"
                                    style={{ animationDelay: "0.4s" }}
                                  ></div>
                                </div>
                              )}
                          </div>
                          <p className="text-gray-900 leading-relaxed">
                            {transcript.text}
                            {transcript.isPartial && (
                              <span className="inline-block w-1 h-4 bg-blue-500 ml-1 animate-pulse"></span>
                            )}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* User Message */}
                    {transcript.role === "user" && (
                      <div className="flex items-start gap-3 max-w-[80%] flex-row-reverse">
                        <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <User className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-green-600 rounded-2xl rounded-tr-md px-6 py-4 shadow-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-medium text-green-100 bg-green-700/30 px-2 py-1 rounded-full">
                              You
                            </span>
                          </div>
                          <p className="text-white leading-relaxed">
                            {transcript.text}
                            {transcript.isPartial && (
                              <span className="inline-block w-1 h-4 bg-green-300 ml-1 animate-pulse"></span>
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}

              {/* Typing indicator when assistant is speaking */}
              {isAssistantSpeaking && transcripts.length > 0 && (
                <div className="flex items-start gap-3 max-w-[80%]">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-md px-6 py-4 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        AI Assistant
                      </span>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <div
                          className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                    <p className="text-gray-400 italic">
                      Assistant is speaking...
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="text-[14px]">
      <PageHeader title="Assistant Details" />
      <div className="p-6">
        {/* Assistant Info */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">{assistant.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {assistant.description || "No description available"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant={
                    assistant.status === "active" ? "default" : "secondary"
                  }
                >
                  {assistant.status}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate("/experience-center")}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  {assistant.conversations_count || 0} conversations
                </span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  {assistant.satisfaction_score || "N/A"} satisfaction
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">
                  {assistant.channel_list || "Web"}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Callers Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Callers</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Manage callers for this assistant
                </p>
              </div>
              <Button onClick={() => setShowAddCaller(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Caller
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filter */}
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search callers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>All Callers</DropdownMenuItem>
                  <DropdownMenuItem>Recent</DropdownMenuItem>
                  <DropdownMenuItem>With Calls</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Callers Table */}
            {callersLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : filteredCallers.length === 0 ? (
              <div className="text-center py-8">
                <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">
                  {searchTerm
                    ? "No callers found matching your search."
                    : "No callers added yet."}
                </p>
                <Button onClick={() => setShowAddCaller(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Caller
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredCallers.map((caller) => (
                  <div
                    key={caller.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">{caller.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {caller.phone_number}
                          </span>
                          {caller.email && (
                            <span className="flex items-center gap-1">
                              <Mail className="w-3 h-3" />
                              {caller.email}
                            </span>
                          )}
                          {caller.company && (
                            <span className="flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              {caller.company}
                            </span>
                          )}
                        </div>
                        {(caller.zip_code || caller.address) && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                            <MapPin className="w-3 h-3" />
                            {caller.zip_code && caller.address
                              ? `${caller.zip_code}, ${caller.address}`
                              : caller.zip_code || caller.address}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleWebCall(caller)}
                        disabled={makingCall}
                        className="bg-black hover:bg-gray-800"
                      >
                        <Globe className="w-4 h-4 mr-2" />
                        {makingCall ? "Creating..." : "Web Call"}
                      </Button>
                      <Button
                        onClick={() => handleMakeCall(caller.id)}
                        disabled={makingCall}
                        variant="outline"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        Phone Call
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add Caller Modal */}
        {showAddCaller && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Add New Caller</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddCaller(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={newCaller.name}
                    onChange={(e) =>
                      setNewCaller({ ...newCaller, name: e.target.value })
                    }
                    className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter caller name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={newCaller.phone_number}
                    onChange={(e) =>
                      setNewCaller({
                        ...newCaller,
                        phone_number: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={newCaller.email}
                    onChange={(e) =>
                      setNewCaller({ ...newCaller, email: e.target.value })
                    }
                    className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    value={newCaller.company}
                    onChange={(e) =>
                      setNewCaller({ ...newCaller, company: e.target.value })
                    }
                    className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={newCaller.zip_code}
                    onChange={(e) =>
                      setNewCaller({ ...newCaller, zip_code: e.target.value })
                    }
                    className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter ZIP code"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Address
                  </label>
                  <textarea
                    value={newCaller.address}
                    onChange={(e) =>
                      setNewCaller({ ...newCaller, address: e.target.value })
                    }
                    className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter address"
                    rows={3}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Notes
                  </label>
                  <textarea
                    value={newCaller.notes}
                    onChange={(e) =>
                      setNewCaller({ ...newCaller, notes: e.target.value })
                    }
                    className="w-full p-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                    placeholder="Enter any additional notes"
                    rows={3}
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setShowAddCaller(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddCaller}
                  disabled={!newCaller.name || !newCaller.phone_number}
                  className="flex-1 bg-black hover:bg-gray-800"
                >
                  Add Caller
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* VAPI Configuration Warning */}
        {!process.env.REACT_APP_VAPI_API_KEY ||
        process.env.REACT_APP_VAPI_API_KEY === "your_vapi_api_key_here" ? (
          <Card className="mt-6 border-yellow-200 bg-yellow-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-yellow-800">
                <Settings className="w-4 h-4" />
                <span className="font-medium">VAPI Not Configured</span>
              </div>
              <p className="text-sm text-yellow-700 mt-2">
                To use web calls, please add your VAPI API key to the
                environment variables:
              </p>
              <code className="block bg-yellow-100 p-2 rounded mt-2 text-xs">
                REACT_APP_VAPI_API_KEY=your_actual_vapi_api_key
              </code>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  );
}
