import React, { useState, useRef, useEffect } from "react";

export default function VariableAutocomplete({
  value,
  onChange,
  variables = [],
  placeholder = "",
  className = "",
  rows = 4,
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const textareaRef = useRef(null);
  const suggestionsRef = useRef(null);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    const cursorPos = e.target.selectionStart;
    onChange(newValue);

    // Check if "/" was just typed
    const textBeforeCursor = newValue.substring(0, cursorPos);
    const lastSlashIndex = textBeforeCursor.lastIndexOf("/");
    const textAfterSlash = textBeforeCursor.substring(lastSlashIndex + 1);

    // Check if there's a space or newline after the slash (meaning we're not in a variable name)
    const textAfterCursor = newValue.substring(cursorPos);
    const hasSpaceAfter = textAfterCursor.match(/^[\s\n]/);

    if (
      lastSlashIndex !== -1 &&
      !hasSpaceAfter &&
      !textAfterSlash.includes(" ") &&
      !textAfterSlash.includes("\n")
    ) {
      // Filter variables based on what's typed after "/"
      const filtered = variables.filter((v) =>
        v.name.toLowerCase().includes(textAfterSlash.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setSelectedIndex(0);
      setCursorPosition(cursorPos);
    } else {
      setShowSuggestions(false);
    }
  };

  const insertVariable = (variable) => {
    const textBeforeCursor = value.substring(0, cursorPosition);
    const textAfterCursor = value.substring(cursorPosition);
    const lastSlashIndex = textBeforeCursor.lastIndexOf("/");
    const textBeforeSlash = textBeforeCursor.substring(0, lastSlashIndex);
    const variableInsert = `{{${variable.name}}}`;

    const newValue = textBeforeSlash + variableInsert + textAfterCursor;
    onChange(newValue);

    setShowSuggestions(false);
    // Set cursor position after inserted variable
    setTimeout(() => {
      if (textareaRef.current) {
        const newCursorPos =
          textBeforeSlash.length + variableInsert.length;
        textareaRef.current.setSelectionRange(newCursorPos, newCursorPos);
        textareaRef.current.focus();
      }
    }, 0);
  };

  const handleKeyDown = (e) => {
    if (showSuggestions) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        if (suggestions[selectedIndex]) {
          insertVariable(suggestions[selectedIndex]);
        }
      } else if (e.key === "Escape") {
        setShowSuggestions(false);
      }
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        textareaRef.current &&
        !textareaRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={className}
        rows={rows}
      />
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          style={{
            top: textareaRef.current
              ? textareaRef.current.scrollHeight + 5
              : "100%",
            left: 0,
            minWidth: "300px",
          }}
        >
          {suggestions.map((variable, index) => (
            <div
              key={variable.name}
              onClick={() => insertVariable(variable)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                index === selectedIndex ? "bg-gray-100" : ""
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="font-mono text-sm text-gray-900">
                  {variable.name}
                </span>
                <span className="text-xs text-gray-500">
                  {variable.displayName}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

