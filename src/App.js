import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { checkUser } from "./utils/firebase/auth";
import {
  readUserData,
  snapshotArticle,
  readUsers,
} from "./utils/firebase/firestore";
import { getRecentRecord, getRecord } from "./utils/result/filter";
import { db } from "./utils/firebase/firebase";

import { ModalContainer } from "./components/Web/ModalContainer/ModalContainer";
import NavBar from "./components/Web/NavBar/NavBar";
import Routes from "./components/Web/Routes/Routes";
import Footer from "./components/Web/Footer/Footer";
import AdminSideBar from "./components/Admin/AdminSidebar/AdminSideBar";

import { mockData1, mockData2, mockData3, mockUsers } from "./mockData";

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
  const [record, setRecord] = useState(null);
  const [users, setUsers] = useState(null);

  const [article, setArticle] = useState(null);
  const [userChat, setUserChat] = useState(null);
  const [chat, setChat] = useState(null);

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
    let unsubscribeUserChat, unsubscribeChat, unsubscribeArticle;
    if (user) {
      if (user.uid !== "nFe6SOGeOGXPWJKS2YPjVO7DApi1") {
        readUserData(user.uid, setUserData);
        //setUserData(mockData3);
        unsubscribeUserChat = db
          .collection("chat")
          .doc(user.uid)
          .onSnapshot((doc) => {
            setUserChat(doc.data());
            console.log(doc.data());
          });
      } else {
        readUsers(setUsers);
        let chat = {};
        unsubscribeChat = db
          .collection("chat")
          .orderBy("updatedAt", "desc")
          .onSnapshot((doc) => {
            doc.docs.map((doc) => {
              const data = doc.data();
              if (data.message && data.message.length > 0) {
                const userId = doc.id;
                chat = {
                  ...chat,
                  [userId]: {
                    ...data,
                    createdAt: data.createdAt.seconds,
                    updatedAt: data.updatedAt.seconds,
                  },
                };
              }
              return null;
            });
            console.log(chat);
            setChat(chat);
          });
      }
      let article;
      unsubscribeArticle = db
        .collection("articles")
        .orderBy("updatedAt", "desc")
        .onSnapshot((doc) => {
          doc.docs.map((doc) => {
            const data = doc.data();
            const { createdAt, updatedAt } = data;
            const articleId = doc.id;
            const content = JSON.parse(data.content);
            const checkImg = content.ops.find(
              (element) => element.insert.image
            );
            const img = checkImg ? checkImg.insert.image : null;
            article = {
              ...article,
              [articleId]: {
                ...data,
                content: content,
                image: img,
                createdAt: createdAt.seconds,
                updatedAt: updatedAt.seconds,
              },
            };
            return null;
          });
          console.log(article);
          setArticle(article);
        });
    } else {
      setUserData(null);
      setProfileImg(null);
      setRecord(null);
      setUsers(null);
      setUserChat(null);
      setArticle(null);
    }
    return () => {
      if (unsubscribeUserChat) unsubscribeUserChat();
      if (unsubscribeChat) unsubscribeChat();
      if (unsubscribeArticle) unsubscribeArticle();
    };
  }, [user]);

  useEffect(() => {
    if (userData) {
      const { profileImgUrl, record } = userData;
      setProfileImg(profileImgUrl ? profileImgUrl : null);
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
          record: record,
          setRecord: setRecord,
          article: article,
          users: users,
          userChat: userChat,
          chat: chat,
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
