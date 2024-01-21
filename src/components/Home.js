import React, { useEffect } from "react";
import Service from "../components/Services";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/home.scss";
import home_image from "../images/hero-image.png";
import banklogo from "../images/PB_Logo.png";
import wallet from "../images/secured_money.png";
import fstMny from "../images/fast_money.png";
import easyP from "../images/easy_money.png";

const Home = () => {
 

    useEffect(() => {
        AOS.init({
            duration: 1000, // Set the animation duration to 1200ms (1.2 seconds)
        });
    }, []);


    return (
        <section className="home_cls">

            <div className="home-cntr">

                <div className="home_txt">

                    <p1 className="greetings">Hello! Welcome to,</p1>
                    <div data-aos="fade-right" data-aos-delay="0" className="name_logo_bx">
                        <img src={banklogo} alt="" />
                    </div>
                    <p>
                        "Let us help you invest in your future. It's our pleasure to work with you."
                    </p>
                    <h3>The official website of Primal Bank</h3>

                    <div className="features">
                        <div data-aos="fade-up-right" data-aos-delay="20" className="ft">
                            <img src={easyP} alt="wallet_img" />
                            <span>Easy to Use</span>
                        </div>
                        <div data-aos="fade-up-right" data-aos-delay="20" className="ft">
                            <img src={fstMny} alt="wallet_img" />
                            <span>Fast Transactions</span>
                        </div>
                        <div data-aos="fade-up-right" data-aos-delay="20" className="ft">
                            <img src={wallet} alt="wallet_img" />
                            <span>Secured Payments</span>
                        </div>


                    </div>
                </div>

                <div className="home_img">
                    <img src={home_image} alt="home-img" />
                </div>



  useEffect(() => {
    AOS.init({
      duration: 1000, // Set the animation duration to 1200ms (1.2 seconds)
    });
  }, []);

  return (
    <section className="home_cls">
      <div className="home-cntr">
        <div className="home_txt">

          <p1 className="greetings">Hello! Welcome to,</p1>

          <p1 className="greetings">WELLCOME TO OUR BANKING WEB APPLICATION</p1>

          <div
            data-aos="fade-right"
            data-aos-delay="0"
            className="name_logo_bx"
          >
            <img src={banklogo} alt="" />
          </div>
          <p>

            Let us help you invest in your future. It's our pleasure to work
            with you.
          </p>
          <h3>The official website of Primal Bank</h3>

            EMPOWERING YOUR FINANCIAL JOURNEY, WHERE TRUST MEETS TECHNOLOGY.
          </p>
          <h3>THE OFFICIAL BANKING WEB APPLICATION OF PRIMAL BANK</h3>


          <div className="features">
            <div data-aos="fade-up-right" data-aos-delay="20" className="ft">
              <img src={easyP} alt="wallet_img" />
              <span>Easy Payments</span>


            </div>
            <div data-aos="fade-up-right" data-aos-delay="20" className="ft">
              <img src={fstMny} alt="wallet_img" />
              <span>Fast Payments</span>
            </div>
            <div data-aos="fade-up-right" data-aos-delay="20" className="ft">
              <img src={wallet} alt="wallet_img" />
              <span>Secured Payments</span>
            </div>
          </div>
        </div>

        <div className="home_img">
          <img src={home_image} alt="home-img" />
        </div>
      </div>
      <Service />
    </section>
  );
};

export default Home;
