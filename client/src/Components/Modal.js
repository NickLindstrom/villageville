import React, { useContext, useState, useEffect } from 'react';

import { InitialStateContext } from "../App";

import BookingSection from "./BookingSection";
import Listing from "./Listing";


const Modal = () => {
  const [bookingMode, setBookingMode] = useState(false);

  const { showModal, setShowModal, selectedTile, selectedMode } = useContext(InitialStateContext);

  useEffect(() => {
    if (showModal === 'clicked-house' && selectedMode === 'user') setBookingMode(true);
  }, [selectedMode, showModal])

  const closeModal = () => {
    setShowModal('');
  }

  const handleClickBackdrop = () => {
    closeModal();
  }

  const handleClickInsideModal = (e) => {
    e.stopPropagation();
  }

  return (
    <div className="modal" onClick={handleClickBackdrop}>
      <div className="modal-inner" onClick={handleClickInsideModal}>
        <button onClick={closeModal} className="modal-close">Stäng</button>
        {
          bookingMode ?
            <BookingSection /> :
            <Listing data={selectedTile} />
        }
      </div>
    </div>
  )
}

export default Modal