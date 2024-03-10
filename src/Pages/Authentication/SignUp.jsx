import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../../../Config/GlobalUrl"

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  // Event handler for input change
  // Name
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  // Email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  // Password
  const handlePassChange = (e) => {
    setPassword(e.target.value);
  };
  // Confirm Password
  const handleCPassChange = (e) => {
    setCPassword(e.target.value);
  };

  // Handling Registration Button Operation
  
  const handleSignUpOperation = async (e) => {

    e.preventDefault();
    try{
      
      if (!name || !email || !password || !cpassword) {
        toast.error("Please ensure to provide all fields");
      } else if (password !== cpassword) {
        toast.error("Confirm password was not same as passoword");
      } else if (name.length <= 3 || password.length <= 4) {
        toast.error("Please provide characters length more than 4")
      } else {

        const response = await axios.post(`${API_URL}/signup/verify`, {
          name: name,
          email: email,
          password: password
        })

        // console.log("response", response.status)
        // console.log("response", response.data.message)

        if (response.status == 200) {
          toast.success(response.data.message);
        } else if (response.status == 201) {
        toast.error(response.data.message);
        }
        
      }
    } catch (error) {
      console.log("Error Occurred:",error)
    }
  };

  return (
    <div className="auth-container">
      <div className="form-card">
        <form>
          <div className="form-header">
            <h4>SignUp Form</h4>
          </div>
          <p style={{color:"gray",marginTop:"20px"}}>Note:   Please kindly check your Gmail for verification link</p>
          {/* Name */}
          <div className="form-group">
            <label className="name">Name</label>
            <input
              type="text"
              className="input-style"
              id="name"
              onChange={handleNameChange}
              placeholder="Enter Your Name"
            />
          </div>
          {/* Email */}
          <div className="form-group">
            <label className="email">Email</label>
            <input
              type="email"
              className="input-style"
              id="email"
              onChange={handleEmailChange}
              placeholder="Enter Your Email"
            />
          </div>
          {/* Password */}
          <div className="form-group">
            <label className="password">Password</label>
            <input
              type="password"
              className="input-style"
              id="password"
              onChange={handlePassChange}
              placeholder="Enter Your Password"
            />
          </div>
          {/*Confirm Password */}
          <div className="form-group">
            <label className="Cpassword">Confirm Password</label>
            <input
              type="password"
              className="input-style"
              id="Cpassword"
              onChange={handleCPassChange}
              placeholder="Enter Your Password"
            />
          </div>
          {/* Sign Up Button */}
          <div className="submit-link-cover">
            <button className="submit-link" onClick={handleSignUpOperation}>
              SignUp
            </button>
          </div>
          {/* Page Navigator */}
          <div className="Link-navigator">
            <p>
              Already have an account? <Link to="/Login">Login</Link>
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

export default SignUp;
