import React from "react";
import { useFavorites } from "../contexts/FavouriteContext";
import { useNavigate } from "react-router-dom";
import { Copy, Settings, Heart, AlertCircle } from "lucide-react";
import "../styles/pages/favourite.scss";

const Favourite = () => {
  const { favorites, removeFavorite, clearAllFavorites } = useFavorites();
  const navigate = useNavigate();

  const groupedFavorites = favorites.reduce((acc, component) => {
    if (!acc[component.type]) {
      acc[component.type] = [];
    }
    acc[component.type].push(component);
    return acc;
  }, {});

  const handleCustomize = (component) => {
    switch (component.type) {
      case "Button":
        navigate(`/customize/${component.subtype}`);
        break;
      case "Card":
        navigate(`/customize-card/${component.subtype}`);
        break;
      case "Input":
        navigate(`/customize-input/${component.subtype}`);
        break;
      case "Navbar":
        navigate(`/customizer/${component.subtype}`);
        break;
      default:
        navigate("/dashboard");
    }
  };

  
 

  return (
    
    <div className="favorites-container">
      <div className="favorites-header">
        <h2 className="component-title">Favorite Components</h2>
        {favorites.length > 0 && (
          <button 
            className="clear-favorites-btn" 
            onClick={clearAllFavorites}
            title="Clear all favorites"
            
          >
            Clear All
          </button>
        )}
      </div>
      
      {Object.keys(groupedFavorites).length > 0 ? (
        Object.entries(groupedFavorites).map(([type, components]) => (
          <div key={type} className="favorites-section">
            <h3>{type}s</h3>
            <div className="button-list">
              {components.map((component) => (
                <div key={component.id} className="btn-list-wrap">
                  <p className="btn-wrap-title">{component.label}</p>
                  <div className="btn-wrap">
                    <div className="component-preview" onClick={() => handleCustomize(component)}>
                    </div>
                    <div className="flex-wrap">
                      <button
                        className="btn-tool-wrap"
                        title="Remove from favorites"
                        onClick={() => removeFavorite(component.id)}
                      >
                        <Heart size={16} className="btn-icon" fill="#ff3b5c" stroke="#ff3b5c" />
                      </button>
                      <button
                        className="btn-tool-wrap"
                        title="View code"
                        onClick={() => {
                          console.log("View code for", component.id);
                        }}
                      >
                        <Copy size={16} className="btn-icon" />
                      </button>
                      <button
                        className="btn-tool-wrap"
                        title="Customize styles"
                        onClick={() => handleCustomize(component)}
                      >
                        <Settings size={16} className="btn-icon" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="empty-favorites">
          <AlertCircle size={48} className="empty-icon" />
          <p>You haven't added any components to your favorites yet.</p>
          <button className="dashboard-btn Primary" onClick={() => navigate("/dashboard")}>
            Browse Components
          </button>
        </div>
      )}
      
    </div>
    
  );
};

export default Favourite;