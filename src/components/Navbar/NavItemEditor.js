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
  const [expandedItems, setExpandedItems] = useState({});
  const [activeSubmenuParent, setActiveSubmenuParent] = useState(null);
  const [newSubmenuText, setNewSubmenuText] = useState("");
  const [newSubmenuUrl, setNewSubmenuUrl] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItemText.trim()) {
      onAdd({
        text: newItemText,
        url: newItemUrl || `/${newItemText.toLowerCase().replace(/\s+/g, "-")}`,
        active: false,
        submenu: [],
      });
      setNewItemText("");
      setNewItemUrl("");
    }
  };

  const toggleItemExpand = (itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleAddSubmenu = (parentId) => {
    setActiveSubmenuParent(parentId);
  };

  const handleSubmitSubmenu = (parentId, e) => {
    e.preventDefault();

    if (newSubmenuText.trim()) {
      const parent = navItems.find((item) => item.id === parentId);

      if (parent) {
        const updatedItem = {
          ...parent,
          submenu: [
            ...(parent.submenu || []),
            {
              id: `submenu-${Date.now()}`,
              text: newSubmenuText,
              url:
                newSubmenuUrl ||
                `/${newSubmenuText.toLowerCase().replace(/\s+/g, "-")}`,
              parentId: parentId,
            },
          ],
        };

        onUpdate(parentId, updatedItem);
        setNewSubmenuText("");
        setNewSubmenuUrl("");
        setActiveSubmenuParent(null);
      }
    }
  };

  const handleDeleteSubmenu = (parentId, submenuId) => {
    const parent = navItems.find((item) => item.id === parentId);
    if (parent && parent.submenu) {
      const updatedSubmenu = parent.submenu.filter(
        (sub) => sub.id !== submenuId
      );
      onUpdate(parentId, { ...parent, submenu: updatedSubmenu });
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
                  onClick={() => toggleItemExpand(item.id)}
                  className="btn btn-toggle"
                >
                  {expandedItems[item.id] ? "▼" : "►"}
                </button>
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

            {expandedItems[item.id] && (
              <div className="submenu-container">
                <div className="submenu-items">
                  {item.submenu && item.submenu.length > 0 ? (
                    item.submenu.map((submenuItem) => (
                      <div key={submenuItem.id} className="submenu-item">
                        <div className="submenu-header">
                          <span className="submenu-text">
                            {submenuItem.text}
                          </span>
                          <button
                            onClick={() =>
                              handleDeleteSubmenu(item.id, submenuItem.id)
                            }
                            className="btn btn-remove btn-sm"
                          >
                            ✕
                          </button>
                        </div>
                        <div className="submenu-url">{submenuItem.url}</div>
                      </div>
                    ))
                  ) : (
                    <div className="no-submenu">No submenu items</div>
                  )}
                </div>

                {activeSubmenuParent === item.id ? (
                  <form
                    onSubmit={(e) => handleSubmitSubmenu(item.id, e)}
                    className="submenu-form"
                  >
                    <div className="submenu-inputs">
                      <input
                        type="text"
                        value={newSubmenuText}
                        onChange={(e) => setNewSubmenuText(e.target.value)}
                        placeholder="Submenu text"
                        className="submenu-input"
                      />
                      <input
                        type="text"
                        value={newSubmenuUrl}
                        onChange={(e) => setNewSubmenuUrl(e.target.value)}
                        placeholder="Submenu URL"
                        className="submenu-input"
                      />
                    </div>
                    <div className="submenu-actions">
                      <button type="submit" className="btn btn-add btn-sm">
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveSubmenuParent(null)}
                        className="btn btn-cancel btn-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => handleAddSubmenu(item.id)}
                    className="btn btn-add-submenu"
                  >
                    + Add Submenu Item
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavItemEditor;
