import { jwtDecode } from "jwt-decode";
import { useEffect, useState, createContext } from "react";
import NavBar from "../../SharedModule/NavBar/NavBar";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext(null);

export default function AuthContextProvider(props){

  let [loginData, setLoginData ]= useState(null);
   const logOut = () => {
       sessionStorage.removeItem('token');
       setLoginData("");
       
      };
  let saveLoginData=() => {
    let encodedToken = sessionStorage.getItem('token');
    if (encodedToken) {
      try {
        let decodedToken = jwtDecode(encodedToken);
        setLoginData(decodedToken); 

console.log(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
        sessionStorage.removeItem('token');
        setLoginData(null);
      }
    } else {
        setLoginData(null);
    }
}

  useEffect(() => {
    // Check if a token exists in localStorage on component mount
    if (sessionStorage?.getItem("token")) {
      saveLoginData(); // Call saveLoginData to decode and set the user data
    }
    // No cleanup needed for this specific effect, so an empty return is fine
    return () => {
      // Optional: Cleanup if there were event listeners or subscriptions
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <AuthContext.Provider value={{ saveLoginData, loginData , logOut}}>
      {props.children}
      
    </AuthContext.Provider>
  );
}