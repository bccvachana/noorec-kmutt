import React, { useState } from "react";
import Modal from "./Modal/Modal";

export const ModalContext = React.createContext();

export const ModalContainer = (props) => {
  const { children } = props;

  const [isModal, setIsModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [backdropClose, setBackdropClose] = useState(false);
  const [modalType, setModalType] = useState(null);

  return (
    <React.Fragment>
      <Modal
        isModal={isModal}
        closeModal={() => {
          setIsModal(false);
        }}
        modalContent={modalContent}
        backdropClose={backdropClose}
        modalType={modalType}
      />
      <ModalContext.Provider
        value={{
          openModal: (modalContent, backdropClose, modalType) => {
            setModalType(modalType);
            setModalContent(modalContent);
            setBackdropClose(backdropClose);
            setIsModal(true);
          },
        }}
      >
        {children}
      </ModalContext.Provider>
    </React.Fragment>
  );
};
