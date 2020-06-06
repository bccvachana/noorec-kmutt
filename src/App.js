import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { checkUser } from "./utils/firebase/auth";
import { readUserData } from "./utils/firebase//firestore";
import { getRecentRecordAll } from "./utils/result/filter";

import { ModalContainer } from "./components/Web/ModalContainer/ModalContainer";
import NavBar from "./components/Web/NavBar/NavBar";
import Routes from "./components/Web/Routes/Routes";
import Footer from "./components/Web/Footer/Footer";

import { mockData1, mockData2, mockData3 } from "./mockData";

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
  const [userData, setUserData] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [recordData, setRecordData] = useState(null);

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
    if (user) {
      //readUserData(user.uid, setUserData);
      setUserData(mockData1);
    } else {
      setUserData(null);
    }
  }, [user]);

  useEffect(() => {
    if (userData) {
      const { profileImgUrl, record } = userData;
      setProfileImg(profileImgUrl ? profileImgUrl : null);
      setRecordData(getRecentRecordAll(record));
    } else {
      setProfileImg(null);
      setRecordData(null);
    }
  }, [userData]);

  return (
    <React.Fragment>
      <Context.Provider
        value={{
          user: user,
          isSignUp: isSignUp,
          setIsSignUp: setIsSignUp,
          isSignIn: isSignIn,
          isVerified: isVerified,
          userData: userData,
          profileImg: profileImg,
          recordData: recordData,
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
