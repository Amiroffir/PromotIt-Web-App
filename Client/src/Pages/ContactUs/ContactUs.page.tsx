import React from "react";
import EmailIcon from "@mui/icons-material/Email";
import PhoneEnabledIcon from "@mui/icons-material/PhoneEnabled";
import BusinessIcon from "@mui/icons-material/Business";
import "./style.css";

export const ContactUs = () => {
  return (
    <div className="admin-homepage-container">
      <section>
        <div className="section-header">
          <div className="contact">
            <h2>Contact Us</h2>
          </div>
        </div>

        <div className="contact">
          <div className="row">
            <div className="contact-info">
              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i>
                    <BusinessIcon />
                  </i>
                </div>

                <div className="contact-info-content">
                  <h4>Address</h4>
                  <p>
                    461 Shalma Road,
                    <br /> Tel Aviv, Israel, <br />
                    550605
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i>
                    <PhoneEnabledIcon />
                  </i>
                </div>

                <div className="contact-info-content">
                  <h4>Phone</h4>
                  <p>052-4269629</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">
                  <i>
                    <EmailIcon />
                  </i>
                </div>

                <div className="contact-info-content">
                  <h4>Email</h4>
                  <p>amirosoffir@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <form action="" id="contact-form">
                <h2>Send Message</h2>
                <div className="input-box">
                  <span>Full Name</span>
                  <input type="text" required name="" />
                </div>

                <div className="input-box">
                  <span>Email</span>
                  <input type="email" required name="" />
                </div>

                <div className="input-box">
                  <span>Type your Message...</span>
                  <textarea required name=""></textarea>
                </div>

                <div className="input-box">
                  <input
                    className="add-product-btn"
                    type="submit"
                    value="Send"
                    name=""
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
