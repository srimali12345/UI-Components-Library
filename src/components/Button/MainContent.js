import ButtonPreview from "./ButtonPreview";

const MainContent = ({ buttonStyles,setButtonText,buttonText }) => {
  return (
    <div className="container">
      <h2>Button 1</h2>
      <ButtonPreview buttonStyles={buttonStyles}  buttonText={buttonText} uploadedIcon={true} />
    </div>
  );
};

export default MainContent;
