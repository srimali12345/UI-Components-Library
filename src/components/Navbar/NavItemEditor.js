import React, { useState } from "react";
import "../../styles/components/navbarCustomization.scss";

const NavItemEditor = ({
  navItems,
  onAdd,
  onUpdate,
  onDelete,
  onSetActive,
}) => {
  const [newItemText, setNewItemText] = useState("");
  const [newItemUrl, setNewItemUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItemText.trim()) {
      onAdd({
        text: newItemText,
        url: newItemUrl || `/${newItemText.toLowerCase()}`,
        active: false,
      });
      setNewItemText("");
      setNewItemUrl("");
    }
  };

  return (
    <div className="nav-item-editor">
      <form onSubmit={handleSubmit} className="editor-form">
        <div className="form-group">
          <label>Text</label>
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Item name"
          />
        </div>
        <div className="form-group">
          <label>URL</label>
          <input
            type="text"
            value={newItemUrl}
            onChange={(e) => setNewItemUrl(e.target.value)}
            placeholder="/page-url"
          />
        </div>
        <button type="submit" className="btn add-btn">
          Add Item
        </button>
      </form>

      <div className="nav-items-list">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${item.active ? "active" : ""}`}
          >
            <div className="item-header">
              <span>{item.text}</span>
              <div className="actions">
                <button
                  onClick={() => onSetActive(item.id)}
                  className={`btn ${item.active ? "btn-active" : "btn-set"}`}
                >
                  {item.active ? "Active" : "Set Active"}
                </button>
                <button
                  onClick={() => onDelete(item.id)}
                  className="btn btn-remove"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="item-url">{item.url}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavItemEditor;
