import React, { useState, useEffect, useContext } from "react";
import classes from "./AdminChat.module.scss";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

import sendIcon from "../../../assets/send.svg";
import chatIcon from "../../../assets/chat.svg";
import resultIcon from "../../../assets/Result/criteria.svg";
import { Context } from "../../../App";
import { ModalContext } from "../../../components/Web/ModalContainer/ModalContainer";
import ProfileImg from "../../../components/ProfileImg/ProfileImg";
import {
  addChatByAdmin,
  readChatByAdmin,
} from "../../../utils/firebase/firestore";
import moment from "moment";
import { chatTime } from "../../../utils/moment";
import AdminChatModal from "./AdminChatModal/AdminChatModal";

const AdminChat = (props) => {
  const { search } = useLocation();
  const { userId } = queryString.parse(search);
  const { users, chat } = useContext(Context);
  const { openModal, closeModal } = useContext(ModalContext);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [selectedUser, setSelectedUser] = useState(userId ? userId : null);
  const [sortChat, setSortChat] = useState(null);

  const handleOnchange = (event) => {
    event.target.style.height = "0px";
    event.target.style.height = `${event.target.scrollHeight + 5}px`;
    setTextAreaValue(event.target.value);
  };

  useEffect(() => {
    document.body.style.minHeight = "0px";
    return () => {
      document.body.style.minHeight = "512px";
    };
  }, []);

  useEffect(() => {
    if (chat || chat === undefined) {
      if (chat) {
        let temp = Object.keys(chat).sort((a, b) =>
          moment(chat[b].updatedAt).diff(moment(chat[a].updatedAt))
        );
        if (userId) temp = temp.filter((id) => id !== userId);
        setSortChat(temp);
      } else {
        setSortChat([]);
      }
    }
  }, [chat]);

  useEffect(() => {
    if (sortChat) {
      props.delaySetIsLoadingFalse();
    }
  }, [sortChat]);

  useEffect(() => {
    if (chat && chat[selectedUser] && !chat[selectedUser].adminRead)
      readChatByAdmin(selectedUser);
    if (chat && chat[selectedUser]) {
      const timer = setTimeout(() => {
        clearTimeout(timer);
        const bottom = document.getElementById("AdminChatBox").scrollHeight;
        document.getElementById("AdminChatBox").scrollTo(0, bottom);
      }, 0);
    }
  }, [selectedUser]);

  return users && sortChat ? (
    <div className={classes.Page}>
      <div className={classes.Container}>
        <div className={classes.Contact}>
          <div className={classes.Title}>แชท</div>
          <div className={classes.ContactContainer}>
            {userId ? (
              <div
                className={`${classes.ContactList} ${
                  userId === selectedUser ? classes.Selected : ""
                }`}
                onClick={() => {
                  setSelectedUser(userId);
                }}
              >
                <div>
                  <ProfileImg
                    profileImgUrl={users[userId].profileImgUrl}
                    style={{
                      width: "2.5rem",
                      height: "2.5rem",
                    }}
                  />
                  <div
                    className={`${classes.UserDetail} ${
                      chat[userId] && !chat[userId].adminRead
                        ? classes.Unread
                        : ""
                    }`}
                  >
                    {users[userId].firstName} {users[userId].lastName}
                  </div>
                </div>
                {chat[userId] && !chat[userId].adminRead ? (
                  <div className={classes.UnreadNumber}>
                    {chat[userId].adminUnread}
                  </div>
                ) : null}
              </div>
            ) : null}
            {sortChat.map((id) => {
              const { firstName, lastName, profileImgUrl } = users[id];
              return (
                <div
                  key={id}
                  className={`${classes.ContactList} ${
                    id === selectedUser ? classes.Selected : ""
                  }`}
                  onClick={() => {
                    setSelectedUser(id);
                  }}
                >
                  <div>
                    <ProfileImg
                      profileImgUrl={profileImgUrl}
                      style={{
                        width: "2.5rem",
                        height: "2.5rem",
                      }}
                    />
                    <div
                      className={`${classes.UserDetail} ${
                        !chat[id].adminRead ? classes.Unread : ""
                      }`}
                    >
                      {firstName} {lastName}
                    </div>
                  </div>
                  {!chat[id].adminRead ? (
                    <div className={classes.UnreadNumber}>
                      {chat[id].adminUnread}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
        <div className={classes.Chat}>
          {selectedUser ? (
            <React.Fragment>
              <div className={classes.TopBar}>
                <div className={classes.UserDetail}>
                  {users[selectedUser].firstName} {users[selectedUser].lastName}
                </div>
                <div
                  className={classes.ResultButton}
                  onClick={() => {
                    openModal(
                      <AdminChatModal
                        userId={selectedUser}
                        users={users}
                        closeModal={closeModal}
                      />,
                      true,
                      "Chat"
                    );
                  }}
                >
                  <img src={resultIcon} alt="resultIcon" />
                </div>
              </div>
              <div id="AdminChatBox" className={classes.ChatContainer}>
                {chat[selectedUser] &&
                  chat[selectedUser].message.map(
                    ({ sender, message, createdAt: { seconds } }, index) => {
                      return sender === "user" ? (
                        <div key={index} className={classes.Sender}>
                          <ProfileImg
                            profileImgUrl={users[selectedUser].profileImgUrl}
                            style={{
                              width: "1.5rem",
                              height: "1.5rem",
                              marginRight: "0.5rem",
                            }}
                          />
                          <span>{message}</span>
                          <div className={classes.Time}>
                            {chatTime(seconds)}
                          </div>
                        </div>
                      ) : (
                        <div key={index} className={classes.Receiver}>
                          <div className={classes.Time}>
                            {chatTime(seconds)}
                          </div>
                          <span>{message}</span>
                        </div>
                      );
                    }
                  )}
              </div>
              <div className={classes.Input}>
                <textarea
                  onChange={handleOnchange}
                  placeholder="พิมพ์ข้อความ..."
                  value={textAreaValue}
                />
                <img
                  className={classes.SendIcon}
                  src={sendIcon}
                  alt="sendIcon"
                  onClick={() => {
                    if (textAreaValue) {
                      try {
                        addChatByAdmin(
                          selectedUser,
                          textAreaValue,
                          chat[selectedUser]
                        );
                        setTextAreaValue("");
                        const timer = setTimeout(() => {
                          clearTimeout(timer);
                          const bottom = document.getElementById("AdminChatBox")
                            .scrollHeight;
                          document
                            .getElementById("AdminChatBox")
                            .scrollTo(0, bottom);
                        }, 200);
                      } catch (error) {
                        console.log(error);
                      }
                    }
                  }}
                />
              </div>
            </React.Fragment>
          ) : (
            <div className={classes.ChatIcon}>
              <img src={chatIcon} alt="chatIcon" />
            </div>
          )}
        </div>
      </div>
    </div>
  ) : null;
};

export default AdminChat;
