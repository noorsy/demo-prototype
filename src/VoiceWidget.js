import React, { useEffect } from "react";

const VoiceWidget = () => {
  useEffect(() => {
    // Custom CSS to override Vapi widget styles and handle transcript window
    const customWidgetStyles = `
      /* Center the initial widget button in the middle of the screen */
      .vapi-widget-wrapper > div:first-child {
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        bottom: auto !important;
        right: auto !important;
        transform: translate(-50%, -50%) !important;
        z-index: 99999 !important;
      }
      
      /* Make the initial widget button larger and more prominent */
      .vapi-widget-wrapper > div:first-child > div {
        margin-left: 19rem !important;
        width: 65rem !important;
        padding: 2rem 6rem !important;
        height: 45rem !important;
        min-height: 5rem !important;
        border-radius: 2rem !important;

        border: 3px solid #14B8A6 !important;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
      }
      
      /* Hover effects for initial button */
      .vapi-widget-wrapper > div:first-child > div:hover {
        transform: scale(1.05) !important;
        
        border-color: #0D9488 !important;
      }
      
      /* Ensure text is visible on initial button */
      .vapi-widget-wrapper > div:first-child span {
        font-size: 1.125rem !important;
        text-color: white !important;
        
      }
      
      /* Style the transcript window - make it take full main layout area */
      .vapi-widget-wrapper > div:not(:first-child) {
        position: fixed !important;
        top: 0.5rem !important;
        left: 0.5rem !important;
        bottom: 0.5rem !important;
        right: 0.5rem !important;
        width: calc(100vw - 1rem) !important;
        height: calc(100vh - 1rem) !important;
        max-width: none !important;
        max-height: none !important;
        border-radius: 0.5rem !important;
        z-index: 99999 !important;
      }
      
      /* Style the transcript window content */
      .vapi-widget-wrapper > div:not(:first-child) > div {
        width: 100% !important;
        height: 100% !important;
        border-radius: 0.5rem !important;
        border: 2px solid #14B8A6 !important;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.3) !important;
      }
      
      /* Make the transcript window background fully white */
      .vapi-widget-wrapper > div:not(:first-child) > div > div:last-child {
        background-color: rgb(255, 255, 255) !important;
        filter: brightness() !important;
      }
      
      /* Position the End Call button in bottom right of transcript window */
      .vapi-widget-wrapper > div:not(:first-child) > div > div:last-child {
        position: absolute !important;
        bottom: 1rem !important;
        right: 1rem !important;
        left: auto !important;
        top: auto !important;
        width: auto !important;
        padding: 1rem !important;
        background: transparent !important;
        border: none !important;
      }
      
      /* Style the End Call button */
      .vapi-widget-wrapper > div:not(:first-child) > div > div:last-child button {
        color: rgb(255, 255, 255) !important;
        padding: 0.75rem 1.5rem !important;
        border-radius: 9999px !important;
        font-weight: 600 !important;
        box-shadow: 0 10px 25px -5px rgba(239, 68, 68, 0.4) !important;
        transition: all 0.2s ease !important;
      }
      
      .vapi-widget-wrapper > div:not(:first-child) > div > div:last-child button:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 15px 35px -5px rgba(239, 68, 68, 0.6) !important;
      }
      
      /* Ensure the widget doesn't affect other elements */
      .vapi-widget-wrapper {
        isolation: isolate !important;
      }
    `;

    // Inject custom CSS styles
    const styleElement = document.createElement("style");
    styleElement.textContent = customWidgetStyles;
    document.head.appendChild(styleElement);

    // Load the Vapi widget script
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@vapi-ai/client-sdk-react/dist/embed/widget.umd.js";
    script.async = true;
    script.type = "text/javascript";
    document.head.appendChild(script);

    return () => {
      // Cleanup: remove script and styles when component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
      if (document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Vapi Widget - This will be rendered by the script */}
      <vapi-widget
        public-key="6b3cc4a9-dba2-439a-a62a-5a71085330fa"
        assistant-id="34a2188f-063b-4348-9c99-a4c99d18c87e"
        mode="voice"
        theme="light"
        base-bg-color="#ffffff"
        accent-color="#14B8A6"
        cta-button-color="#ffffff"
        cta-button-text-color="#000000"
        border-radius="large"
        size="full"
        position="bottom-right"
        title="TALK WITH AI"
        start-button-text="Start"
        end-button-text="End Call"
        chat-first-message="Hey, How can I help you today?"
        chat-placeholder="Type your message..."
        voice-show-transcript="true"
        consent-required="true"
        consent-title="Terms and conditions"
        consent-content='By clicking "Agree," and each time I interact with this AI agent, I consent to the recording, storage, and sharing of my communications with third-party service providers, and as otherwise described in our Terms of Service.'
        consent-storage-key="vapi_widget_consent"
      ></vapi-widget>
    </div>
  );
};

export default VoiceWidget;
