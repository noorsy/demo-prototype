import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { createPortal } from "react-dom";
import Settings from "./Settings";

export default function SettingsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background;

  const handleClose = () => {
    if (background) {
      navigate(background, { replace: true });
    } else {
      navigate(-1);
    }
  };

  // Render the Settings modal as a portal overlay
  // The background page should remain visible (handled by not unmounting it)
  return createPortal(
    <Settings onClose={handleClose} />,
    document.body
  );
}

