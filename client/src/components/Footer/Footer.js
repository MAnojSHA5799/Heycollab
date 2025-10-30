import "./Footer.css";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TwitterIcon from "@mui/icons-material/Twitter";
import TelegramIcon from "@mui/icons-material/Telegram";
import PinterestIcon from "@mui/icons-material/Pinterest";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo Section */}
        <div className="footer-logo">
  <h1>HeyCollab</h1> 
  <p><strong>Where Brands and Creators Grow Together</strong></p>
  <p className="tech">
    <strong style={{ color: "#0070f3" }}>
      @Powered by Zauvijek Tech.
    </strong>
  </p>
</div>



        {/* Help Section */}
        <div className="footer-column">
          <h3>Help</h3>
          <ul>
            {/* <li><a href="/account/register">Business Registration</a></li>
            <li><a href="/account/creater-registration">Creator Registration</a></li> */}
            <li><a href="/">FAQ</a></li>
            <li><a href="/">Accessibility</a></li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-column">
          <h3>Contact Us</h3>
          <ul>
            <li><LocalPhoneIcon />+91 7370940256</li>
            <li><EmailIcon />tech@zauvijek.com</li>
            <li><LocationOnIcon /> Sector 62 Noida, Uttar Pradesh - 201309</li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="footer-column">
          <h3>Stay Connected</h3>
          <div className="social-links">
            <TwitterIcon />
            <InstagramIcon />
            <YouTubeIcon />
            <TelegramIcon />
            <PinterestIcon />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2025 HeyCollab Ltd. | Terms & Conditions | Privacy Policy</p>
      </div>
    </footer>
  );
};

export default Footer;
