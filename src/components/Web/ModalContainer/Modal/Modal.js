import React from "react";
import "./Modal.scss";
import { CSSTransition } from "react-transition-group";
import FixedFullPage from "../../../UI/FixedFullPage";
import closeButton from "../../../../assets/Result/closeButton.svg";

const Modal = (props) => {
  const { isModal, closeModal, modalContent, backdropClose, modalType } = props;

  return (
    <FixedFullPage isShow={isModal}>
      <CSSTransition
        in={isModal}
        classNames="ModalContainer"
        timeout={200}
        unmountOnExit
      >
        <div className="ModalContainer">
          <div
            className="BackDrop"
            onClick={backdropClose ? closeModal : null}
          />
          <div className={`Modal Modal${modalType}`}>
            {modalContent
              ? React.cloneElement(modalContent, {
                  ...props,
                  closeModal: closeModal,
                })
              : null}
            {modalType === "Result" ||
            modalType === "Filter" ||
            modalType === "Chat" ? (
              <div className="ModalCloseButton" onClick={closeModal}>
                <img src={closeButton} alt={closeButton} />
              </div>
            ) : null}
          </div>
        </div>
      </CSSTransition>
    </FixedFullPage>
  );
};

export default Modal;
