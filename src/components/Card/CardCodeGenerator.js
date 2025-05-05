import React from 'react';

export const generateHTML = ({ cardType, cardTitle, cardContent, cardStyles }) => {
  const isImageCard = cardType === "Image";
  const isActionCard = cardType === "Action";
  const isPricingCard = cardType === "Pricing";
  
  let html = '';
  
  html += `<div class="card card-${cardType.toLowerCase()}">\n`;
  
  if (cardType === "Basic") {
    html += `  <div class="card-header">Header</div>\n`;
    html += `  <div class="card-body">\n`;
    html += `    <h3 class="card-title">${cardTitle || 'Card Title'}</h3>\n`;
    html += `    <p class="card-text">${cardContent || 'Card content goes here...'}</p>\n`;
    html += `  </div>\n`;
    html += `  <div class="card-footer">Footer</div>\n`;
  }

  else if (isImageCard) {
    html += `  <div class="card-image"></div>\n`;
    html += `  <div class="card-body">\n`;
    html += `    <h3 class="card-title">${cardTitle || 'Card Title'}</h3>\n`;
    html += `    <p class="card-text">${cardContent || 'Card content goes here...'}</p>\n`;
    
    if (isActionCard || isPricingCard) {
      html += `    <div class="card-actions">\n`;
      html += `      <button class="card-button">Learn More</button>\n`;
      if (isPricingCard) {
        html += `      <button class="card-button card-button-primary">Get Started</button>\n`;
      }
      html += `    </div>\n`;
    }
    
    html += `  </div>\n`;
  }

  else {
    html += `  <div class="card-body">\n`;
    html += `    <h3 class="card-title">${cardTitle || 'Card Title'}</h3>\n`;
    html += `    <p class="card-text">${cardContent || 'Card content goes here...'}</p>\n`;
    
    // Add buttons if it's an action card
    if (isActionCard || isPricingCard) {
      html += `    <div class="card-actions">\n`;
      html += `      <button class="card-button">Learn More</button>\n`;
      if (isPricingCard) {
        html += `      <button class="card-button card-button-primary">Get Started</button>\n`;
      }
      html += `    </div>\n`;
    }
    
    html += `  </div>\n`;
  }
  
  // Close the card div
  html += `</div>`;
  
  return html;
};

export const generateCSS = ({ cardType, cardStyles }) => {
  const isImageCard = cardType === "Image";
  const isActionCard = cardType === "Action";
  const isPricingCard = cardType === "Pricing";
  
  let css = '';
  
  css += `.card-${cardType.toLowerCase()} {\n`;
  css += `  width: ${cardStyles.width || '300px'};\n`;
  css += `  min-height: ${cardStyles.minHeight || '200px'};\n`;
  css += `  background-color: ${cardStyles.backgroundColor || '#ffffff'};\n`;
  css += `  color: ${cardStyles.textColor || '#333333'};\n`;
  css += `  border-width: ${cardStyles.borderWidth || '1px'};\n`;
  css += `  border-style: ${cardStyles.borderStyle || 'solid'};\n`;
  css += `  border-color: ${cardStyles.borderColor || '#e0e0e0'};\n`;
  
  if (cardStyles.topLeftRadius || 
      cardStyles.topRightRadius || 
      cardStyles.bottomRightRadius || 
      cardStyles.bottomLeftRadius) {
    css += `  border-radius: ${cardStyles.topLeftRadius || '8px'} `;
    css += `${cardStyles.topRightRadius || '8px'} `;
    css += `${cardStyles.bottomRightRadius || '8px'} `;
    css += `${cardStyles.bottomLeftRadius || '8px'};\n`;
  } else {
    css += `  border-radius: ${cardStyles.borderRadius || '8px'};\n`;
  }
  
  css += `  box-shadow: ${cardStyles.boxShadow || '0 2px 8px rgba(0, 0, 0, 0.1)'};\n`;
  css += `  overflow: hidden;\n`;
  css += `  font-family: ${cardStyles.fontFamily || 'Arial, sans-serif'};\n`;
  css += `  transition: all 0.3s ease;\n`;
  css += `}\n\n`;
  
  if (cardType === "Basic") {
    css += `.card-${cardType.toLowerCase()} .card-header {\n`;
    css += `  padding: 15px;\n`;
    css += `  border-bottom: 1px solid ${cardStyles.borderColor || '#e0e0e0'};\n`;
    css += `  font-weight: bold;\n`;
    css += `}\n\n`;
    
    css += `.card-${cardType.toLowerCase()} .card-footer {\n`;
    css += `  padding: 15px;\n`;
    css += `  border-top: 1px solid ${cardStyles.borderColor || '#e0e0e0'};\n`;
    css += `  font-size: 12px;\n`;
    css += `  color: #8E9196;\n`;
    css += `}\n\n`;
  }
  
  if (isImageCard) {
    css += `.card-${cardType.toLowerCase()} .card-image {\n`;
    css += `  height: ${cardStyles.imageHeight || '200px'};\n`;
    css += `  width: 100%;\n`;
    css += `  background-color: #e9e9e9;\n`;
    css += `  background-image: url("https://source.unsplash.com/random/300x200/?nature");\n`;
    css += `  background-size: cover;\n`;
    css += `  background-position: center;\n`;
    css += `}\n\n`;
  }
  
  css += `.card-${cardType.toLowerCase()} .card-body {\n`;
  css += `  padding: ${cardStyles.padding || '20px'};\n`;
  css += `}\n\n`;
  
  css += `.card-${cardType.toLowerCase()} .card-title {\n`;
  css += `  font-size: ${cardStyles.titleFontSize || '18px'};\n`;
  css += `  font-weight: ${cardStyles.titleFontWeight || 'bold'};\n`;
  css += `  color: ${cardStyles.titleColor || '#000000'};\n`;
  css += `  margin-top: 0;\n`;
  css += `  margin-bottom: 10px;\n`;
  css += `}\n\n`;
  
  css += `.card-${cardType.toLowerCase()} .card-text {\n`;
  css += `  font-size: ${cardStyles.contentFontSize || '14px'};\n`;
  css += `  line-height: ${cardStyles.contentLineHeight || '1.5'};\n`;
  css += `  margin-bottom: ${isActionCard || isPricingCard ? '15px' : '0'};\n`;
  css += `}\n\n`;
  
  if (isActionCard || isPricingCard) {
    css += `.card-${cardType.toLowerCase()} .card-actions {\n`;
    css += `  display: flex;\n`;
    css += `  gap: 10px;\n`;
    css += `  margin-top: 15px;\n`;
    css += `}\n\n`;
    
    css += `.card-${cardType.toLowerCase()} .card-button {\n`;
    css += `  padding: 8px 16px;\n`;
    css += `  border: none;\n`;
    css += `  border-radius: 4px;\n`;
    css += `  background-color: ${cardStyles.buttonBackgroundColor || '#f1f1f1'};\n`;
    css += `  color: ${cardStyles.buttonTextColor || '#333333'};\n`;
    css += `  cursor: pointer;\n`;
    css += `  transition: opacity 0.2s ease;\n`;
    css += `}\n\n`;
    
    css += `.card-${cardType.toLowerCase()} .card-button:hover {\n`;
    css += `  opacity: 0.9;\n`;
    css += `}\n\n`;
    
    if (isPricingCard) {
      css += `.card-${cardType.toLowerCase()} .card-button-primary {\n`;
      css += `  background-color: ${cardStyles.primaryButtonBackgroundColor || '#4a6cf7'};\n`;
      css += `  color: ${cardStyles.primaryButtonTextColor || '#ffffff'};\n`;
      css += `}\n\n`;
    }
  }
  
  if (cardStyles.hoverEffect) {
    css += `.card-${cardType.toLowerCase()}:hover {\n`;
    
    if (cardStyles.hoverEffect === 'shadow') {
      css += `  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);\n`;
    } else if (cardStyles.hoverEffect === 'scale') {
      css += `  transform: scale(1.03);\n`;
    } else if (cardStyles.hoverEffect === 'border') {
      css += `  border-color: #4a6cf7;\n`;
    }
    
    css += `}\n`;
  }
  
  return css;
};

export const generateSCSS = ({ cardType, cardStyles }) => {
  const isImageCard = cardType === "Image";
  const isActionCard = cardType === "Action";
  const isPricingCard = cardType === "Pricing";
  
  let scss = '';
  
  scss += `// Card variables\n`;
  scss += `$card-bg: ${cardStyles.backgroundColor || '#ffffff'};\n`;
  scss += `$card-text: ${cardStyles.textColor || '#333333'};\n`;
  scss += `$card-title: ${cardStyles.titleColor || '#000000'};\n`;
  scss += `$card-border: ${cardStyles.borderColor || '#e0e0e0'};\n`;
  scss += `$card-shadow: ${cardStyles.boxShadow || '0 2px 8px rgba(0, 0, 0, 0.1)'};\n`;
  if (isActionCard || isPricingCard) {
    scss += `$button-bg: ${cardStyles.buttonBackgroundColor || '#f1f1f1'};\n`;
    scss += `$button-text: ${cardStyles.buttonTextColor || '#333333'};\n`;
    if (isPricingCard) {
      scss += `$primary-button-bg: ${cardStyles.primaryButtonBackgroundColor || '#4a6cf7'};\n`;
      scss += `$primary-button-text: ${cardStyles.primaryButtonTextColor || '#ffffff'};\n`;
    }
  }
  scss += `\n`;
  
  scss += `.card-${cardType.toLowerCase()} {\n`;
  scss += `  width: ${cardStyles.width || '300px'};\n`;
  scss += `  min-height: ${cardStyles.minHeight || '200px'};\n`;
  scss += `  background-color: $card-bg;\n`;
  scss += `  color: $card-text;\n`;
  scss += `  border-width: ${cardStyles.borderWidth || '1px'};\n`;
  scss += `  border-style: ${cardStyles.borderStyle || 'solid'};\n`;
  scss += `  border-color: $card-border;\n`;
  
  if (cardStyles.topLeftRadius || 
      cardStyles.topRightRadius || 
      cardStyles.bottomRightRadius || 
      cardStyles.bottomLeftRadius) {
    scss += `  border-radius: ${cardStyles.topLeftRadius || '8px'} `;
    scss += `${cardStyles.topRightRadius || '8px'} `;
    scss += `${cardStyles.bottomRightRadius || '8px'} `;
    scss += `${cardStyles.bottomLeftRadius || '8px'};\n`;
  } else {
    scss += `  border-radius: ${cardStyles.borderRadius || '8px'};\n`;
  }
  
  scss += `  box-shadow: $card-shadow;\n`;
  scss += `  overflow: hidden;\n`;
  scss += `  font-family: ${cardStyles.fontFamily || 'Arial, sans-serif'};\n`;
  scss += `  transition: all 0.3s ease;\n`;
  
  // Basic card specific styles
  if (cardType === "Basic") {
    scss += `\n  .card-header {\n`;
    scss += `    padding: 15px;\n`;
    scss += `    border-bottom: 1px solid $card-border;\n`;
    scss += `    font-weight: bold;\n`;
    scss += `  }\n`;
    
    scss += `\n  .card-footer {\n`;
    scss += `    padding: 15px;\n`;
    scss += `    border-top: 1px solid $card-border;\n`;
    scss += `    font-size: 12px;\n`;
    scss += `    color: #8E9196;\n`;
    scss += `  }\n`;
  }
  
  // Image styles
  if (isImageCard) {
    scss += `\n  .card-image {\n`;
    scss += `    height: ${cardStyles.imageHeight || '200px'};\n`;
    scss += `    width: 100%;\n`;
    scss += `    background-color: #e9e9e9;\n`;
    scss += `    background-image: url("https://source.unsplash.com/random/300x200/?nature");\n`;
    scss += `    background-size: cover;\n`;
    scss += `    background-position: center;\n`;
    scss += `  }\n`;
  }
  
  // Common body styles
  scss += `\n  .card-body {\n`;
  scss += `    padding: ${cardStyles.padding || '20px'};\n`;
  scss += `  }\n`;
  
  // Title styles
  scss += `\n  .card-title {\n`;
  scss += `    font-size: ${cardStyles.titleFontSize || '18px'};\n`;
  scss += `    font-weight: ${cardStyles.titleFontWeight || 'bold'};\n`;
  scss += `    color: $card-title;\n`;
  scss += `    margin-top: 0;\n`;
  scss += `    margin-bottom: 10px;\n`;
  scss += `  }\n`;
  
  // Content text styles
  scss += `\n  .card-text {\n`;
  scss += `    font-size: ${cardStyles.contentFontSize || '14px'};\n`;
  scss += `    line-height: ${cardStyles.contentLineHeight || '1.5'};\n`;
  scss += `    margin-bottom: ${isActionCard || isPricingCard ? '15px' : '0'};\n`;
  scss += `  }\n`;
  
  // Button styles for action cards
  if (isActionCard || isPricingCard) {
    scss += `\n  .card-actions {\n`;
    scss += `    display: flex;\n`;
    scss += `    gap: 10px;\n`;
    scss += `    margin-top: 15px;\n`;
    scss += `  }\n`;
    
    scss += `\n  .card-button {\n`;
    scss += `    padding: 8px 16px;\n`;
    scss += `    border: none;\n`;
    scss += `    border-radius: 4px;\n`;
    scss += `    background-color: $button-bg;\n`;
    scss += `    color: $button-text;\n`;
    scss += `    cursor: pointer;\n`;
    scss += `    transition: opacity 0.2s ease;\n`;
    scss += `    \n`;
    scss += `    &:hover {\n`;
    scss += `      opacity: 0.9;\n`;
    scss += `    }\n`;
    
    if (isPricingCard) {
      scss += `    \n`;
      scss += `    &.card-button-primary {\n`;
      scss += `      background-color: $primary-button-bg;\n`;
      scss += `      color: $primary-button-text;\n`;
      scss += `    }\n`;
    }
    
    scss += `  }\n`;
  }
  

  if (cardStyles.hoverEffect) {
    scss += `\n  &:hover {\n`;
    
    if (cardStyles.hoverEffect === 'shadow') {
      scss += `    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);\n`;
    } else if (cardStyles.hoverEffect === 'scale') {
      scss += `    transform: scale(1.03);\n`;
    } else if (cardStyles.hoverEffect === 'border') {
      scss += `    border-color: #4a6cf7;\n`;
    }
    
    scss += `  }\n`;
  }
  
 
  scss += `}\n`;
  
  return scss;
};
