import axios from "axios";
import { useEffect } from "react";

function Contact() {
  async function welcome() {
    const { data } = await axios.get("http://localhost:3033");
    console.log(data);
  }
  useEffect(() => {
    welcome();
  });

  return (
    <>
      <div>contact us</div>
    </>
  );
}

export default Contact;
