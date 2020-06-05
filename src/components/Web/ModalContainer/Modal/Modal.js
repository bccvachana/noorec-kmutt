import React from "react";
import "./Modal.scss";
import { CSSTransition } from "react-transition-group";
import FixedFullPage from "../../../UI/FixedFullPage";

const Modal = (props) => {
  const { isModal, closeModal, modalContent, backdropClose } = props;

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
    </FixedFullPage>
  );
};

export default Modal;
