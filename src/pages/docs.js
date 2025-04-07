import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/pages/docs.scss";

const Docs = () => {
  const navigate = useNavigate();

  return (
    <div className="docs-wrap">
      <h1 className="title">Component Library Documentation</h1>
      <div className="container">
        

        <p>
          <strong>Purpose:</strong> A centralized library of reusable UI
          components for internal company projects. Each component is fully
          customizable and can be used by copying the code directly. No
          installation required.
        </p>

        <h2 className="sub-title">Overview</h2>
        <ul>
          <li>Browse and preview components in the interface.</li>
          <li>Use built-in code tabs to copy HTML, CSS, or SCSS.</li>
          <li>Customize components visually using the built-in editor.</li>
        </ul>

        <h2 className="sub-title">How to Use</h2>
        <ol>
          <li>Navigate through components via the sidebar.</li>
          <li>Select any component (e.g., Button, Navbar) to preview.</li>
          <li>
            Use the <code>Copy Code</code> button to get the code for your
            project.
          </li>
          <li>
            To customize, click the <code>Customise</code> button to change
            styles (colors, padding, radius, etc.).
          </li>
        </ol>

        <h2 className="sub-title">Customization Guide</h2>
        <ul>
          <li>
            Accessible via the <code>Customise</code> button on any component.
          </li>
          <li>
            Live updates as you modify properties like:
            <ul>
              <li>Background color</li>
              <li>Border radius</li>
              <li>Font size and padding</li>
            </ul>
          </li>
          <li>Instantly copy the updated code from preview tabs.</li>
        </ul>

        <h2 className="sub-title">Best Practices</h2>
        <ul>
          <li>Use SCSS versions when possible for better maintainability.</li>
          <li>Stick to naming conventions across all reused components.</li>
          <li>
            Use comments to annotate any modifications you make after copying.
          </li>
        </ul>

        <h2 className="sub-title">Available Components</h2>
        <ul>
          <li>
            <strong>Buttons</strong> - Solid, Outline, Icon, Link
          </li>
          <li>
            <strong>Navbar</strong> - Simple, With Dropdown, With Search
          </li>
          <li>
            <strong>Upcoming:</strong> Cards, Modals, Forms, Tabs
          </li>
        </ul>

        <h2 className="sub-title">Support & Feedback</h2>
        <ul>
          <li>
            Email: <code>subanemi.sooriyakumaran@1billiontech.com or srimali.ranawaka@1billiontech.com
            </code>
          </li>
          <li>For suggestions, contact via email.</li>
        </ul>
      </div>
    </div>
  );
};

export default Docs;
