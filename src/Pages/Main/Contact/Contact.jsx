import React from "react";
import ContactComponents from "../../../Component/Main/Contact/ContactComponents";
import HelmetSeo from "../../../Component/shared/Helmet";

const Contact = () => {
  return (
    <>
      <HelmetSeo
        title="Contact"
        canonical={"contact"}
        description="Would you like to Beanie a talk? Or just want to send me a message? "
      />
      <div>
        <ContactComponents />
      </div>
    </>
  );
};

export default Contact;
