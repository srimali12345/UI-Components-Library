import ButtonPreview from "./ButtonPreview";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
const MainContent = ({ buttonStyles,setButtonText,buttonText,buttonType }) => {
  return (
    <div className="preview-main">
    <div className="customization-container-preview" >
    <div>
      <button >
        <ChevronLeft size={20} />
      </button>
      <span className="text-gray-600">Customization</span>
    </div>
    
    <div >
      BTN1 - {buttonType || "Primary"} Button
    </div>
    <div>
    <button >
    ...
    </button>
    </div>
  
  </div>
  <div className="middle-section" >
       
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
