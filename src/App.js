import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { checkUser } from "./utils/firebase/auth";
import { readUserData } from "./utils/firebase//firestore";

import { ModalContainer } from "./components/Web/ModalContainer/ModalContainer";
import NavBar from "./components/Web/NavBar/NavBar";
import Routes from "./components/Web/Routes/Routes";
import Footer from "./components/Web/Footer/Footer";

import profileSvg from "./assets/profile.svg";

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
      readUserData(user.uid, setUserData);
      // setUserData({
      //   record: [],
      //   updatedAt: {
      //     seconds: 1591253922,
      //     nanoseconds: 290000000,
      //   },
      //   profileImgUrl:
      //     "https://firebasestorage.googleapis.com/v0/b/noorec-kmutt.appspot.com/o/profileImg%2F1b8b7c32-3c48-495a-9e2b-b711c3826ffa?alt=media&token=b64fefe7-0275-42d3-87f7-68797ee4ebc7",
      //   lastName: "Bbb",
      //   firstName: "Bbb",
      //   createdAt: {
      //     seconds: 1591253922,
      //     nanoseconds: 290000000,
      //   },
      // });
    } else {
      setUserData(null);
    }
  }, [user]);

  useEffect(() => {
    if (userData) {
      const { profileImgUrl } = userData;
      setProfileImg(profileImgUrl ? profileImgUrl : profileSvg);
    } else {
      setProfileImg(null);
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
