import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../contexts/FavouriteContext';
import { Heart } from 'lucide-react';

const FavoritesButton = ({ componentType, className = "favorites-btn" }) => {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  
  // Count favorites for this component type
  const getFavoriteCount = () => {
    return favorites.filter((component) => {
      switch (componentType) {
        case "Buttons":
          return component.type === "Button" || component.componentType === "BUTTON";
        case "Cards":
          return component.type === "Card" || component.componentType === "CARD";
        case "Input":
          return component.type === "Input" || component.componentType === "INPUT";
        case "Login":
          return component.type === "Login" || component.componentType === "LOGIN";
        case "Navbar":
          return component.type === "Navbar" || 
                 component.type === "Navigation" || 
                 component.componentType === "NAV" ||
                 component.componentType === "NAVBAR";
        default:
          return false;
      }
    }).length;
  };

  const handleClick = () => {
    navigate(`/favourites/${componentType.toLowerCase()}`);
  };

  const favoriteCount = getFavoriteCount();

  return (
    <button
      className={className}
      onClick={handleClick}
      title={`View ${componentType} favorites`}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '8px 16px',
        background: '#6D45FF',
        border: '1px solid #e2e8f0',
        borderRadius: '6px',
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.target.style.background = '#5a38d9';
      }}
      onMouseLeave={(e) => {
        e.target.style.background = '#6D45FF';
      }}
    >
      <Heart size={16} />
      <span>Favourites ({favoriteCount})</span>
    </button>
  );
};

export default FavoritesButton;