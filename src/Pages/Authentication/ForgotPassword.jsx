import React, {useState} from 'react';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../../../Config/GlobalUrl"
import axios from "axios";

  const ForgotPassword = () => {

  const [email, setEmail] = useState("");


  // Event handler for input change

  // Email
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
 
    // Function for handling forgot password operation

  const handleForgotPasswordOperation =async (e) => {
    e.preventDefault();
    try {
      if (!email) {
        toast.error("Please ensure to provide email");
      }
      else {
      
        const response = await axios.post(`${API_URL}/forgotpassword`, {
          email:email
        })

        if (response.status == 200) {
          toast.success(response.data.message)
        }
        else if (response.status == 201) {
          toast.error(response.data.message);
        } else {
          console.log(response.status)
        }
      }
     
    } catch (error) {
      console.log('Error Occurred:',error)
   }
    };
    
      return (
        <div className="auth-container">
        <div className="form-card">
          <form>
            <div className="form-header">
                <h4>Password Updation Form</h4>
              </div>
              <p style={{color:"gray",marginTop:"20px"}}>Note:   Please kindly check your Gmail for messages</p>
            {/* Email */}
            <div className="form-group">
              <label className="email">Email</label>
                <input type="email" className="input-style" id="email" onChange={handleEmailChange} placeholder="Enter Your Email Id"/>
            </div>
          
            {/* Send Button */}
            <div className="submit-link-cover">
                <button  className="submit-link" onClick={handleForgotPasswordOperation}>Submit</button>
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

  export default ForgotPassword