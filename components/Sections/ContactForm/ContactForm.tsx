import React, { useState } from "react";
import { ComponentSection } from "../../../styles/General.styles";
import axios from "axios";

export const ContactForm = () => {
  const [contactInfo, setContactInfo] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
  });

  const contactFormInfo = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type
  ) => {
    setContactInfo((prevState) => ({
      ...prevState,
      [type]: event.target.value,
    }));
  };

  const handleFormSubmit = async (e: React.MouseEvent<HTMLInputElement>) => {
    console.log("sent");
    e.preventDefault();
    console.log(contactInfo);
    axios({
      method: "post",
      url: `http://localhost:3001/react-contact-form/api/contact/index.php`,
      headers: { "content-type": "application/json" },
      data: contactInfo,
    })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log(error.message));
    // const postInfo = {
    //   method: "POST",
    //   headers: { "content-type": "application/json" },
    //   data: contactInfo,
    // };
    // try {
    //   const url = await fetch(
    //     "http://localhost:3001/react-contact-form/api/contact/index.php",
    //     postInfo
    //   );
    //   console.log(url);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <ComponentSection>
      <form action="#">
        <label>First Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your name.."
          value={contactInfo.name}
          onChange={(e) => contactFormInfo(e, "name")}
        />
        <label>Last Name</label>
        <input
          type="text"
          id="surname"
          name="surname"
          placeholder="Your last name.."
          value={contactInfo.surname}
          onChange={(e) => contactFormInfo(e, "surname")}
        />

        <label>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email"
          value={contactInfo.email}
          onChange={(e) => contactFormInfo(e, "email")}
        />
        <label>Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Write something.."
          value={contactInfo.message}
          onChange={(e) => contactFormInfo(e, "message")}
        ></textarea>
        <input
          type="submit"
          onClick={(e) => handleFormSubmit(e)}
          value="Submit"
        />
      </form>
    </ComponentSection>
  );
};
