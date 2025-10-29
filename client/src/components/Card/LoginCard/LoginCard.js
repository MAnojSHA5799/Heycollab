import { Link, useNavigate } from "react-router-dom";
import "./LoginCard.css";
import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginCard = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("creator");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const onLogin = async () => {
    try {
      setError("");
      setLoading(true);

      let res;

      if (role === "creator") {
        res = await axios.post("http://localhost:8000/api/creators/login", {
          email,
          password,
        });
        localStorage.setItem("hey_role", "creator");
        localStorage.setItem("hey_creator_id", res.data.creatorId || "");
        navigate("/creator-dashboard");
      } else if (role === "seller") {
        res = await axios.post("http://localhost:8000/api/sellers/login", {
          businessEmail: email,
          password,
        });
        localStorage.setItem("hey_role", "seller");
        localStorage.setItem("hey_seller_id", res.data.sellerId || "");
        navigate("/seller/dashboard");
      } else if (role === "purchaser") {
        res = await axios.post("http://localhost:8000/api/purchasers/login", {
          email,
          password,
        });
        localStorage.setItem("hey_role", "purchaser");
        localStorage.setItem("hey_purchaser_id", res.data.purchaserId || "");
        navigate("/purchaser/dashboard");
      } else if (role === "admin") {
        res = await axios.post("http://localhost:8000/api/admin/login", {
          email,
          password,
        });
        localStorage.setItem("hey_role", "admin");
        navigate("/admin");
      } else {
        setError("Please select a valid role");
      }
    } catch (e) {
      setError(e.response?.data?.error || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login__card__container">
      <div className="login__card">
      <div className="login__header">
  <h1 className="text-center">Please login to continue</h1>
  {/* <p className="login__subtitle">Please login to continue</p> */}
</div>

        <div className="login__inputs">

          {/* ROLE */}
          <div className="input__container">
            <label className="input__label">Select Role</label>
            <select
              className="login__input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="creator">Creator</option>
              <option value="seller">Seller</option>
              <option value="purchaser">Purchaser</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* EMAIL */}
          <div className="input__container">
            <label className="input__label">Email Address</label>
            <input
              type="email"
              className="login__input"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* PASSWORD */}
          <div className="input__container">
  <label className="input__label">Password</label>

  <div className="password__wrapper">
    <input
      type={showPass ? "text" : "password"}
      className="login__input"
      placeholder="••••••••••"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <span
      className="password__icon"
      onClick={() => setShowPass(!showPass)}
    >
      {showPass ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>
</div>


          {/* ERROR */}
          {error && <div className="login__error">{error}</div>}

          {/* SUBMIT BUTTON */}
          <div className="login__button__container">
            <button
              className="login__button"
              onClick={onLogin}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </div>

        {/* FOOTER */}
        <div className="login__other__actions">
          <div className="login__forgot__password">Forgot password?</div>
          <div className="login__new__account">
            Don’t have an account?
            <Link to="/account/register"> Create account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
