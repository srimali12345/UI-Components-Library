import React, { useState, useEffect } from "react";

export const CopyToClipboard = ({ text }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let timeout;
    if (copied) {
      timeout = setTimeout(() => setCopied(false), 2000);
    }
    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <button onClick={handleCopy} className="copy-button">
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};
