import React, { useState, useRef, useEffect } from "react";

export default function VariableMappingEditor({
  value,
  onChange,
  originalVariables = [], // Variables from the original template that need mapping
  availableVariables = [], // Variables available in the current assistant
  placeholder = "",
  className = "",
  rows = 8,
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const editorRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Check if a variable needs mapping (is in originalVariables but not in availableVariables)
  const needsMapping = (varName) => {
    return originalVariables.includes(varName) && !availableVariables.some(v => v.name === varName);
  };

  // Convert plain text to HTML with highlighted variables
  const formatContent = (text) => {
    const variableRegex = /\{\{([^}]+)\}\}/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = variableRegex.exec(text)) !== null) {
      // Add text before the variable
      if (match.index > lastIndex) {
        const textBefore = text.substring(lastIndex, match.index);
        parts.push(textBefore);
      }

      const varName = match[1].trim();
      const needsMap = needsMapping(varName);
      
      if (needsMap) {
        parts.push(`<span style="color: #dc2626; text-decoration: line-through; background-color: rgba(254, 242, 242, 0.7); padding: 1px 2px; border-radius: 2px;">${match[0]}</span>`);
      } else {
        parts.push(match[0]);
      }

      lastIndex = match.index + match[0].length;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.join('');
  };

  // Get plain text from HTML
  const getPlainText = (html) => {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  };

  const handleInput = (e) => {
    const html = e.target.innerHTML;
    const plainText = getPlainText(html);
    onChange(plainText);
    
    // Get cursor position
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(editorRef.current);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      setCursorPosition(preCaretRange.toString().length);
    }

    // Check if "/" was just typed
    const textBeforeCursor = plainText.substring(0, cursorPosition);
    const lastSlashIndex = textBeforeCursor.lastIndexOf("/");
    const textAfterSlash = textBeforeCursor.substring(lastSlashIndex + 1);

    const textAfterCursor = plainText.substring(cursorPosition);
    const hasSpaceAfter = textAfterCursor.match(/^[\s\n]/);

    if (
      lastSlashIndex !== -1 &&
      !hasSpaceAfter &&
      !textAfterSlash.includes(" ") &&
      !textAfterSlash.includes("\n") &&
      !textAfterSlash.includes("{") &&
      !textAfterSlash.includes("}")
    ) {
      // Filter variables based on what's typed after "/"
      const filtered = availableVariables.filter((v) =>
        v.name.toLowerCase().includes(textAfterSlash.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setSelectedIndex(0);
    } else {
      setShowSuggestions(false);
    }

    // Re-format content to maintain highlighting
    setTimeout(() => {
      if (editorRef.current) {
        const currentText = getPlainText(editorRef.current.innerHTML);
        if (currentText === plainText) {
          editorRef.current.innerHTML = formatContent(plainText);
          // Restore cursor position
          const range = document.createRange();
          const selection = window.getSelection();
          range.setStart(editorRef.current, 0);
          range.collapse(true);
          let charCount = 0;
          const nodeIterator = document.createNodeIterator(
            editorRef.current,
            NodeFilter.SHOW_TEXT,
            null
          );
          let node;
          while ((node = nodeIterator.nextNode())) {
            const nodeLength = node.textContent.length;
            if (charCount + nodeLength >= cursorPosition) {
              range.setStart(node, cursorPosition - charCount);
              range.collapse(true);
              break;
            }
            charCount += nodeLength;
          }
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }, 0);
  };

  const insertVariable = (variable) => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const textBeforeCursor = getPlainText(editorRef.current.innerHTML).substring(0, cursorPosition);
      const lastSlashIndex = textBeforeCursor.lastIndexOf("/");
      
      // Delete the "/" and text after it
      range.setStart(editorRef.current, 0);
      range.collapse(true);
      let charCount = 0;
      const nodeIterator = document.createNodeIterator(
        editorRef.current,
        NodeFilter.SHOW_TEXT,
        null
      );
      let node;
      while ((node = nodeIterator.nextNode())) {
        const nodeLength = node.textContent.length;
        if (charCount + nodeLength >= lastSlashIndex) {
          range.setStart(node, lastSlashIndex - charCount);
          break;
        }
        charCount += nodeLength;
      }
      
      // Find end of current selection
      const currentText = getPlainText(editorRef.current.innerHTML);
      const textAfterSlash = textBeforeCursor.substring(lastSlashIndex + 1);
      const endPos = cursorPosition;
      
      range.setEnd(editorRef.current, 0);
      charCount = 0;
      const endIterator = document.createNodeIterator(
        editorRef.current,
        NodeFilter.SHOW_TEXT,
        null
      );
      while ((node = endIterator.nextNode())) {
        const nodeLength = node.textContent.length;
        if (charCount + nodeLength >= endPos) {
          range.setEnd(node, endPos - charCount);
          break;
        }
        charCount += nodeLength;
      }
      
      range.deleteContents();
      const variableNode = document.createTextNode(`{{${variable.name}}}`);
      range.insertNode(variableNode);
      range.setStartAfter(variableNode);
      range.collapse(true);
      selection.removeAllRanges();
      selection.addRange(range);
      
      const newText = getPlainText(editorRef.current.innerHTML);
      onChange(newText);
      
      // Re-format
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = formatContent(newText);
          // Restore cursor
          const newRange = document.createRange();
          const newSelection = window.getSelection();
          const insertPos = lastSlashIndex + `{{${variable.name}}}`.length;
          newRange.setStart(editorRef.current, 0);
          newRange.collapse(true);
          charCount = 0;
          const restoreIterator = document.createNodeIterator(
            editorRef.current,
            NodeFilter.SHOW_TEXT,
            null
          );
          while ((node = restoreIterator.nextNode())) {
            const nodeLength = node.textContent.length;
            if (charCount + nodeLength >= insertPos) {
              newRange.setStart(node, insertPos - charCount);
              newRange.collapse(true);
              break;
            }
            charCount += nodeLength;
          }
          newSelection.removeAllRanges();
          newSelection.addRange(newRange);
        }
      }, 0);
    }
    
    setShowSuggestions(false);
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
        editorRef.current &&
        !editorRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update content when value changes externally
  useEffect(() => {
    if (editorRef.current) {
      const currentText = getPlainText(editorRef.current.innerHTML);
      if (currentText !== value) {
        editorRef.current.innerHTML = formatContent(value);
      }
    }
  }, [value]);

  return (
    <div className="relative">
      {/* ContentEditable div styled like textarea */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className={className}
        style={{
          minHeight: `${rows * 1.5}rem`,
          outline: 'none',
        }}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      />
      
      {/* Placeholder styling */}
      <style>{`
        [contenteditable][data-placeholder]:empty:before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
        }
      `}</style>
      
      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          style={{
            top: editorRef.current
              ? editorRef.current.offsetHeight + 5
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
