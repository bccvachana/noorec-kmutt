import React, { useState } from "react";
import Modal from "./Modal/Modal";

export const ModalContext = React.createContext();

export const ModalContainer = (props) => {
  const { children } = props;

  const [isModal, setIsModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [backdropClose, setBackdropClose] = useState(false);

  return (
    <React.Fragment>
      <Modal
        isModal={isModal}
        closeModal={() => {
          setIsModal(false);
        }}
        modalContent={modalContent}
        backdropClose={backdropClose}
      />
      <ModalContext.Provider
        value={{
          openModal: (modalContent, backdropClose) => {
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
