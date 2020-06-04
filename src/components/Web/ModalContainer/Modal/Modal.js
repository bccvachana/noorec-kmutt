import React, { useState, useEffect } from "react";
import "./Modal.scss";
import { CSSTransition } from "react-transition-group";

const Modal = (props) => {
  const { isModal, closeModal, modalContent, backdropClose } = props;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let modalTimer;
    if (isModal) {
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
    } else {
      modalTimer = setTimeout(() => {
        document.body.style.position = "";
        document.body.style.top = "";
        window.scrollTo(0, parseInt(scrollY || "0"));
      }, 200);
    }
    return () => {
      clearTimeout(modalTimer);
    };
  }, [isModal]);

  window.addEventListener("scroll", () => {
    if (document.body.style.position !== "fixed") {
      setScrollY(window.scrollY);
    }
  });

  return (
    <CSSTransition
      in={isModal}
      classNames="ModalContainer"
      timeout={200}
      unmountOnExit
    >
      <div className="ModalContainer">
        <div className="BackDrop" onClick={backdropClose ? closeModal : null} />
        <div className="Modal">
          {modalContent
            ? React.cloneElement(modalContent, {
                ...props,
                closeModal: closeModal,
              })
            : null}
        </div>
      </div>
    </CSSTransition>
  );
};

export default Modal;
