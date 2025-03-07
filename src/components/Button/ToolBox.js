const ToolBox = ({ setButtonStyles }) => {
  return (
    <div className="sidebar">
      <h3>Design</h3>

      <label>Background Color:</label>
      <input
        type="color"
        onChange={(e) =>
          setButtonStyles((prev) => ({
            ...prev,
            backgroundColor: e.target.value,
          }))
        }
      />

      <label>Text Color:</label>
      <input
        type="color"
        onChange={(e) =>
          setButtonStyles((prev) => ({ ...prev, color: e.target.value }))
        }
      />

      <label>Border Radius:</label>
      <input
        type="range"
        min="0"
        max="50"
        onChange={(e) =>
          setButtonStyles((prev) => ({
            ...prev,
            borderRadius: `${e.target.value}px`,
          }))
        }
      />

      <label>Padding:</label>
      <input
        type="range"
        min="0"
        max="50"
        onChange={(e) =>
          setButtonStyles((prev) => ({
            ...prev,
            padding: `${e.target.value}px`,
          }))
        }
      />
    </div>
  );
};

export default ToolBox;
