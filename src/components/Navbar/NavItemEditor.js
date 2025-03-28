import React, { useState } from "react";

const NavItemEditor = ({
  navItems,
  onAdd,
  onUpdate,
  onDelete,
  onSetActive,
}) => {
  const [newItemText, setNewItemText] = useState("");
  const [newItemUrl, setNewItemUrl] = useState("");
  const [editingItem, setEditingItem] = useState(null);

  const handleAddItem = () => {
    if (newItemText.trim() === "") return;

    onAdd({
      text: newItemText,
      url: newItemUrl || `/${newItemText.toLowerCase().replace(/\s+/g, "-")}`,
      active: false,
    });

    setNewItemText("");
    setNewItemUrl("");
  };

  const startEditing = (item) => {
    setEditingItem({
      id: item.id,
      text: item.text,
      url: item.url,
    });
  };

  const cancelEditing = () => {
    setEditingItem(null);
  };

  const saveEditing = () => {
    if (editingItem && editingItem.text.trim() !== "") {
      onUpdate({
        id: editingItem.id,
        text: editingItem.text,
        url: editingItem.url,
        active: navItems.find((item) => item.id === editingItem.id).active,
      });
      setEditingItem(null);
    }
  };

  return (
    <div className="nav-item-editor">
      <div className="item-list">
        {navItems.map((item) => (
          <div key={item.id} className="nav-item">
            {editingItem && editingItem.id === item.id ? (
              <div className="editing-controls">
                <input
                  type="text"
                  value={editingItem.text}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      text: e.target.value,
                    })
                  }
                  className="item-input"
                />
                <input
                  type="text"
                  value={editingItem.url}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      url: e.target.value,
                    })
                  }
                  className="item-input"
                  placeholder="URL"
                />
                <div className="edit-buttons">
                  <button onClick={saveEditing} className="save-btn">
                    Save
                  </button>
                  <button onClick={cancelEditing} className="cancel-btn">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="item-display">
                <div className="item-info">
                  <span className={`item-text ${item.active ? "active" : ""}`}>
                    {item.text}
                  </span>
                  <span className="item-url">{item.url}</span>
                </div>
                <div className="item-controls">
                  <button
                    onClick={() => onSetActive(item.id)}
                    className={`active-btn ${item.active ? "is-active" : ""}`}
                    title={item.active ? "Active item" : "Set as active"}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => startEditing(item)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="add-item-form">
        <h4>Add New Item</h4>
        <div className="input-group">
          <input
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            placeholder="Item text"
            className="item-input"
          />
          <input
            type="text"
            value={newItemUrl}
            onChange={(e) => setNewItemUrl(e.target.value)}
            placeholder="URL (optional)"
            className="item-input"
          />
          <button onClick={handleAddItem} className="add-btn">
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavItemEditor;
