import React, { createContext, useState, useContext } from "react";

// CREATE CONTEXT USING CREATECONTEXT KEYWORD WITH LOGIN CONTEXT VARIABLE

export const LoginContext = createContext({
    loginData: [],
    setLoginData: () => Promise,
    prodName: [],
    setProdName:() => Promise,
    UserId: [],
    setUserId:() => Promise,
    
})

// EXPORTING CONTEXT WITH USECONTEXT KEYWORD
export const useMyContext = () => useContext(LoginContext);

const Context = ({ children } = {}) => { 

    let [loginData, setLoginData] = useState(null);

    let [prodName, setProdName] = useState(null);
    
    let [UserId, setUserId] = useState(null);
    
    let value = {
        loginData,
        setLoginData,
        prodName,
        setProdName,
        UserId,
        setUserId,
    }
    return (
        <>
             <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
        </>
    )
}

export default Context;