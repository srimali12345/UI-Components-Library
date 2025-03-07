import ButtonPreview from "./ButtonPreview";

const MainContent = ({ buttonStyles }) => {
  return (
    <div className="container">
      <h2>Button 1</h2>
      <ButtonPreview buttonStyles={buttonStyles} />
    </div>
  );
};

export default MainContent;
