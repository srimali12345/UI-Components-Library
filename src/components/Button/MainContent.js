import React from "react";
import ButtonPreview from "./ButtonPreview";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, MoreHorizontal } from "lucide-react";

const MainContent = ({
  buttonStyles,
  buttonText,
  buttonType,
  setButtonStyles,
}) => {
  const navigate = useNavigate();

  return (
    <div className="preview-main">
      <div className="customization-container-preview">
        <div className="flex-wrap">
          <button
            className="btn-icon-wrap"
            onClick={() =>
              navigate(`/dashboard`, { state: { active: "buttons" } })
            }
          >
            <ChevronLeft size={20} />
          </button>
          <span>Customization</span>
        </div>

        <div className="text-gray">BTN1 - {buttonType || "Primary"} Button</div>
        {/* <div>
          <button className="btn-icon-wrap vertical">
            <MoreHorizontal size={20} />
          </button>
        </div> */}
      </div>
      <div className="middle-section">
        <ButtonPreview
          buttonStyles={buttonStyles}
          buttonText={buttonText}
          buttonType={buttonType}
        />
      </div>
    </div>
  );
};

export default MainContent;
