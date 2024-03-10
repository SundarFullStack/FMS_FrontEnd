import React, { useContext} from "react";
import { Link,useNavigate} from "react-router-dom"
import { FaHome } from "react-icons/fa";
import { BiSolidReport } from "react-icons/bi";
import { RiLoginBoxFill } from "react-icons/ri";
import { RiLogoutBoxFill } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";
import "./header.css";
import Logo from "../../Images/FarmerLogo1.png";
import ProfileLogo from "../../Images/ProfileFarmer.jpg"
import {LoginContext} from "../Context/ContextProvider"

const Header = () => {
  const { loginData, setLoginData } = useContext(LoginContext);
  const navigator = useNavigate();

  const handleLogoutFunc = async (e) => {
    e.preventDefault();
    try {
      const token = await localStorage.getItem("UserInfo");
      if (token) {
        localStorage.removeItem("UserInfo");
        setLoginData(null);
        navigator("/");
      }
    } catch (error) {
      console.log("Error", error);
    }
  }
  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          {/* Header Logo */}
          <img src={Logo} alt="Header Logo" className="header-logo" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          {/* Nav Bar elements */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {/* Home */}
              <li className="nav-item">
                  <Link to="/Home" className="nav-link"><FaHome className="cursor-pointer Home-Icon" /> Home</Link>
              </li>
              {/* Report */}
              <li className="nav-item">
                  <Link to="/Report" className="nav-link"><BiSolidReport className="cursor-pointer" /> Report</Link>
              </li>
              {/* Login */}
              <li className="nav-item">
                <Link to="/Login" className="nav-link"><RiLoginBoxFill className="cursor-pointer" /> Log in</Link>
              </li>
              {/* Sign Up */}
              <li className="nav-item">
                <Link to="/SignUp" className="nav-link"><SiGnuprivacyguard className="cursor-pointer" /> Sign Up</Link>
              </li>
              {/* Logout*/}
              <li className="nav-item">
                <Link  className="nav-link" onClick={handleLogoutFunc}><RiLogoutBoxFill className="cursor-pointer" /> Logout</Link>
              </li>
            </ul>
          </div>

         
              </div>
               {/* Profile Wrapper */}
           <div className="profile-wrapper">
            <img src={ProfileLogo} alt="profile-img" className="profile-img" />
            <span className="profile-userName">{loginData?loginData:"User"}</span>
          {/* <RiLogoutBoxFill onClick={handleLogoutFunc} className="absolute-center profile-options-icon cursor-pointer"/> */}
          </div>
          </nav>
          
    </div>
  );
};

export default Header;
