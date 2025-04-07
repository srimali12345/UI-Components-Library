import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/pages/faq.scss";

const FAQ = () => {
  const navigate = useNavigate();

  return (
    <div className="faq-wrap">
      <h1 className="title">FAQ</h1>
      <div className="container">
      <ul>
        <li><div className="flex-wrap"><strong>Do I need to install anything?</strong> No — everything is copy-paste ready.</div></li>
        <li><div className="flex-wrap"><strong>Can I suggest new components?</strong> Yes — reach out directly or submit feedback to subanemi.sooriyakumaran@1billiontech.com or srimali.ranawaka@1billiontech.com</div></li>
        <li><div className="flex-wrap"><strong>Is this usable in React or Vue?</strong> Yes — you can embed the HTML/CSS directly inside JSX or template files.</div></li>
      </ul>
      </div>
    </div>
  );
};

export default FAQ;
