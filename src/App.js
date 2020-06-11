import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { checkUser } from "./utils/firebase/auth";
import { readUserData, snapshotArticle } from "./utils/firebase/firestore";
import { getRecentRecord, getRecord } from "./utils/result/filter";

import { ModalContainer } from "./components/Web/ModalContainer/ModalContainer";
import NavBar from "./components/Web/NavBar/NavBar";
import Routes from "./components/Web/Routes/Routes";
import Footer from "./components/Web/Footer/Footer";
import AdminSideBar from "./components/Admin/AdminSidebar/AdminSideBar";

import { mockData1, mockData2, mockData3 } from "./mockData";

import { defaults } from "react-chartjs-2";
import "chartjs-plugin-datalabels";

defaults.global.defaultFontFamily = "Prompt";
defaults.global.defaultFontColor = "white";

export const Context = React.createContext();

const App = (props) => {
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [userState, setUserState] = useState(
    window.sessionStorage.getItem("norecUserState")
  );
  const [userData, setUserData] = useState(null);
  const [profileImg, setProfileImg] = useState(null);
  const [recentRecord, setRecentRecord] = useState(null);
  const [record, setRecord] = useState(null);
  const [article, setArticle] = useState(null);

  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  window.addEventListener("resize", () => {
    document.getElementById("root").style.minHeight = `${window.innerHeight}px`;
  });

  useEffect(() => {
    checkUser(setUser, setUserState);
  }, []);

  useEffect(() => {
    if (user) {
      if (user.uid !== "nFe6SOGeOGXPWJKS2YPjVO7DApi1") {
        readUserData(user.uid, setUserData);
        //setUserData(mockData3);
      }
      snapshotArticle(setArticle);
    } else {
      setUserData(null);
      setProfileImg(null);
      setRecentRecord(null);
      setRecord(null);
    }
  }, [user]);

  useEffect(() => {
    if (userData) {
      const { profileImgUrl, record } = userData;
      setProfileImg(profileImgUrl ? profileImgUrl : null);
      setRecentRecord(record.length !== 0 ? getRecentRecord(record) : {});
      setRecord(record.length !== 0 ? getRecord(record) : {});
    }
  }, [userData]);

  return (
    <React.Fragment>
      <Context.Provider
        value={{
          user: user,
          isSignUp: isSignUp,
          setIsSignUp: setIsSignUp,
          userState: userState,
          userData: userData,
          profileImg: profileImg,
          recentRecord: recentRecord,
          record: record,
          article: article,
        }}
      >
        {userState !== "admin" ? <NavBar /> : <AdminSideBar />}
        <ModalContainer>
          <Routes />
        </ModalContainer>
        <Footer />
      </Context.Provider>
    </React.Fragment>
  );
};

export default App;
