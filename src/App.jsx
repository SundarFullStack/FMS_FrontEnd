import React, { useState,useEffect,useContext} from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import Login from "./Pages/Authentication/Login";
import SignUp from "./Pages/Authentication/SignUp";
import ForgotPassword from "./Pages/Authentication/ForgotPassword";
import FPUpdate from "./Pages/Authentication/FPUpdate";
import Home from "./Pages/Application/Home/Home";
import Report from "./Pages/Application/Report/Report";
import Layout from "./Pages/Application/Layout/Layout";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import API_URL from "../Config/GlobalUrl";
import {LoginContext} from "./Components/Context/ContextProvider"
import axios from "axios";

const App = () => {
  const [data, setData] = useState(false);
  const {UserId, setUserId} = useContext(LoginContext);
  const { loginData, setLoginData } = useContext(LoginContext);
  //FUNCTION FOR VALIDATING CURRENT USER AUTHENTICATION FOR EVERY
 // API for validating current user using login token
// console.log("UserFront", UserId);
 const DashboardValid = async () => {
  try {
    const user = JSON.parse(localStorage.getItem("UserInfo"));

    
    if (user) {
      const headers = {
        Authorization: user,
        "Content-Type": "application/json",
      };

      let response = await axios.get(`${API_URL}/validUser`, { headers });

      if (response.status == 200) {
        // console.log("homename",response.data.UserData.name);
        setLoginData(response.data.UserData.name);
        setUserId(response.data.UserData._id);
      } else if (response.status == 201) {
        navigator("/");
      }
    }
  } catch (error) {
    console.log("Error Occurred:", error);
  }
};

  useEffect(() => {
    DashboardValid();
    setData(true);

  }, [data]);
  
  return (
    <>
      {data ? (
        <>
          <div style={{overflowX:"hidden"}}>
            <Header/>
            <Routes>
            <Route path="/" element={<Layout />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
              <Route path="/FPUpdate/:token" element={<FPUpdate />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Report" element={<Report />} />
            </Routes>
          </div>
        </>
      ) : (
        <>
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              Loading... &nbsp;
              <CircularProgress />
            </Box>
          </>
        </>
      )}
    </>
  );
};

export default App;
