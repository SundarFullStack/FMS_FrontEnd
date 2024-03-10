import React, { useState} from 'react'
import { Link,useParams} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import API_URL from "../../../Config/GlobalUrl"

const FPUpdate = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const { token } = useParams();
  // Event handler for input change

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

  // Function for handle password update operation
  
  const handleFPUpdateOperation = async (e) => {
    e.preventDefault();
   try{
    if (!email || !password || !cpassword) {
      toast.error("Please ensure to provide all fields");
    }else if (password.length <= 4) { 
      toast.error("Please provide characters length more than 4")
    } 
    else if (password !== cpassword) {
      toast.error("Confirm password was not same as passoword");
    } else {
     
      const response = await axios.put(`${API_URL}/FPUpdate`, {
        email:email,
        token: token,
        password: password
      })

      if (response.status == 200) {
        toast.success(response.data.message);
      } else if (response.status == 200) {
        toast.success(response.data.message);
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
            <h4>Update Password</h4>
          </div>
           {/* Email */}
           <div className="form-group">
            <label className="email">Email</label>
            <input  type="email" className="input-style" id="name"onChange={handleEmailChange} placeholder="Enter Your Email Id"/>
          </div>
          {/* New Password */}
          <div className="form-group">
            <label className="password">New Password</label>
            <input  type="password" className="input-style" id="password" onChange={handlePassChange} placeholder="Enter Your Password"/>
          </div>
          {/* Confirm Password */}
          <div className="form-group">
            <label className="Cpassword">Confirm Password</label>
            <input  type="password" className="input-style" id="Cpassword" onChange={handleCPassChange} placeholder="Enter Your Password"/>
          </div>
          {/* Update Button */}
          <div className="submit-link-cover">
            <button className="submit-link" onClick={handleFPUpdateOperation}>Update</button>
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
  )
}

export default FPUpdate