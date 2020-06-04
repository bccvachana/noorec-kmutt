import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { checkUser } from "./utils/firebase/auth";

import { ModalContainer } from "./components/Web/ModalContainer/ModalContainer";
import NavBar from "./components/Web/NavBar/NavBar";
import Routes from "./components/Web/Routes/Routes";
import Footer from "./components/Web/Footer/Footer";

export const Context = React.createContext();

const App = (props) => {
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isSignIn, setIsSignIn] = useState(
    window.sessionStorage.getItem("norecIsSignIn") === "true" ? true : false
  );
  const [isVerified, setIsVerified] = useState(
    window.sessionStorage.getItem("norecIsVerified") === "true" ? true : false
  );
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  window.addEventListener("resize", () => {
    document.getElementById("root").style.minHeight = `${window.innerHeight}px`;
  });

  useEffect(() => {
    checkUser(setUser, setIsSignIn, setIsVerified);
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <React.Fragment>
      <Context.Provider
        value={{
          user: user,
          isSignUp: isSignUp,
          setIsSignUp: setIsSignUp,
          isSignIn: isSignIn,
          isVerified: isVerified,
        }}
      >
        <NavBar />
        <ModalContainer>
          <Routes />
        </ModalContainer>
        <Footer />
      </Context.Provider>
    </React.Fragment>
  );
};

export default App;
