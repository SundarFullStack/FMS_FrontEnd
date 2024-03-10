import React, { useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../../../Config/GlobalUrl"
import axios from "axios";
const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigator = useNavigate();
  // Event handler for input change

  // Email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  // Password
  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };


  const handleLoginOperation = async (e) => {
    e.preventDefault();
    try {
      
    
    if (!email || !password) {
      toast.error("Please ensure to provide all fields");
    }else {

      const response = await axios.post(`${API_URL}/login`, {
        email:email,
        password:password
      })
      // console.log("login",response.data.token);
      // console.log(email,password)

      if (response.status == 200) {
        localStorage.setItem("UserInfo", JSON.stringify(response.data.token));
        toast.success(response.data.message);
        setTimeout(() => {
        }, 3000);
       
      } else if (response.status == 201) {
        toast.error(response.data.message);
      } 

      }
    } catch (error) {
      console.log("Error Occurred:", error);
    }
  };
  return (
    <div className="auth-container">
      <div className="form-card">
        <form>
          <div className="form-header">
            <h4>Login Form</h4>
          </div>
          {/* Email */}
          <div className="form-group">
            <label className="email">Email</label>
            <input  type="email" className="input-style" id="name"onChange={handleEmailChange} placeholder="Enter Your Email Id"/>
          </div>
          {/* Password */}
          <div className="form-group">
            <label className="password">Password</label>
            <input  type="password" className="input-style" id="password"onChange={handlePassChange} placeholder="Enter Your Password"/>
          </div>
          {/* Login Button */}
          <div className="submit-link-cover">
            <button className="submit-link" onClick={handleLoginOperation}>Login</button>
          </div>
          {/* Page Navigator */}
          <div className="Link-navigator">
            <p>
              Not Registered User? <Link to="/SignUp">Register</Link>
            </p>
            <p>
              Forgot Password? <Link to="/ForgotPassword">Update Password</Link>
            </p>

          </div>
        </form>
        
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
  </div>
  );
};

export default Login;
