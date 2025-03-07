const CodePanel = ({ buttonStyles }) => {
  const generateCSS = () => {
    return `
    
   CSS:
        background-color: ${buttonStyles.backgroundColor};
        color: ${buttonStyles.color};
        border-radius: ${buttonStyles.borderRadius};
        padding: ${buttonStyles.padding};
        `;
  };
  return (
    <div className="code-container">
      <h3>Code</h3>
      <pre className="code">{generateCSS()}</pre>
      <button
        className="button"
        onClick={() => navigator.clipboard.writeText(generateCSS())}
      >
        Copy Code
      </button>
    </div>
  );
};

export default CodePanel;
