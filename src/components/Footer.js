import React from "react";
import "../styles/footer.scss";
import bankLogo from "../images/PB_Logo.png";

const Footer = () => {
  return (
    <div className="footer_cls">
      <div className="footer_cntr">
        <div className="handles">
          <img className="main-logo" src={bankLogo} alt="logo" />

          <div className="off-web">Address : Quezon City, Philippines</div>
        </div>

        <div className="contacts">
          <h2>Need Assistance?</h2>
          <p className="num">Contact Number: (+63) 9875620473</p>
          <p>Email: primal.bank@gmail.com</p>
        </div>

        <div className="message">
          <h2>Message us</h2>
          <form className="forms" autoComplete="off">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              required
            />
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              required
            />
            {/* <input type="text" name="message" id="message"  /> */}
            <textarea
              rows="4"
              cols="10"
              name="comment"
              form="usrform"
              placeholder="Message"
              required
            ></textarea>
            <button>Submit</button>
          </form>
        </div>

        <h4>
          Primal Bank is not a registered bank. Please use this website
          carefully.
        </h4>
      </div>
    </div>
  );
};

export default Footer;
