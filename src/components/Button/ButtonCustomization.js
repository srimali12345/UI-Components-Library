import React, { useState } from "react";
import ToolBox from "./ToolBox";
import Styles from "../../styles/Buttons/styles.scss";
import MainContent from "./MainContent";
import CodePanel from "./Codepanel";
const ButtonCustomization = () => {
  const [buttonStyles, setButtonStyles] = useState({
    backgroundColor: "blue",
    color: "red",
    padding: "20px 20px",
    border: "1px solid black",
    borderRadius: "5px",
  });

  return (
    <div className="customization-container">
      <ToolBox setButtonStyles={setButtonStyles} />
      <MainContent buttonStyles={buttonStyles} />
      <CodePanel buttonStyles={buttonStyles} />
    </div>
  );
};

export default ButtonCustomization;
