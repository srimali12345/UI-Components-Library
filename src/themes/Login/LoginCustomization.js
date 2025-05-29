import React from "react";
import { useParams } from "react-router-dom";
import LoginToolBox from "./LoginToolBox";
import CustomizationLayout from "../../commonComponents/CustomizationLayout";
import LoginPreview from "./LoginPreview";
import LoginCodePanel from "./LoginCodePanel";
import { useComponentCustomization } from "../../contexts/ComponentCustomizationSaveContext";
import { loginDefaults } from "../../constants";

const LoginCustomization = () => {
  const { loginType } = useParams();
  const actualLoginType = loginType || "Classic";
  const defaultTitle = `Login Form`;

  const [
    loginStyles,
    setLoginStyles,
    loginTitle,
    setLoginTitle,
    ,
    ,
    ,
    ,
    handleRevert,
    savingState,
    hasPreviouslySaved,
  ] = useComponentCustomization(
    "login",
    actualLoginType,
    loginDefaults[actualLoginType],
    defaultTitle
  );

  return (
    <>
      <CustomizationLayout
        activeTabOnBack="login"
        itemLabel={`LOGIN1 - ${loginType || "Classic"} Form`}
        savingState={savingState}
        hasPreviouslySaved={hasPreviouslySaved}
        mainContent={
          <LoginPreview
            loginStyles={loginStyles}
            loginTitle={loginTitle}
            loginType={loginType}
          />
        }
        codePanel={
          <LoginCodePanel
            loginTitle={loginTitle}
            loginType={loginType}
            loginStyles={loginStyles}
          />
        }
        toolBox={
          <LoginToolBox
            loginStyles={loginStyles}
            setLoginStyles={setLoginStyles}
            loginTitle={loginTitle}
            setLoginTitle={setLoginTitle}
            loginType={actualLoginType}
            onRevert={handleRevert}
          />
        }
      />
    </>
  );
};

export default LoginCustomization;