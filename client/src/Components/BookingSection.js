import React, { useRef, useContext, useState } from 'react'

import { InitialStateContext } from "../App";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// eslint-disable-next-line no-extend-native
Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

const getDates = (startDate, stopDate) => {
    if(!stopDate) return [startDate];
    const dateArray = [];
    let currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date(currentDate));
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

const showMessage = (content) => {
    alert(content);
}

const handleFailedResponse = (response, booking) => {
    showMessage(`Tyvärr, datumet som är valt är tyvärr stugan upptagen. De röda datumen i kalendern är de datum som ej är tilllgängliga.`)
}

const BookingSection = () => {
    const { setData, selectedTile, setShowModal } = useContext(InitialStateContext);

    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    const nameRef = useRef();

    const handleSuccessResponse = (response, booking) => {
        setData(response.data)
        showMessage(`Härligt, ${booking.name}. Stugan är bokad ${booking.allDates[0]} till ${booking.allDates[booking.allDates.length - 1]}.`)
        setShowModal(false);
    }

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const handleBooking = () => {
        let name = nameRef.current.value;
        if (name && startDate) {
            if (selectedTile) {
                const newBooking = {
                    name,
                    allDates: getDates(startDate, endDate).map((date) => date.toLocaleDateString().split('T')[0]),
                    pos: selectedTile.pos
                };
                fetch('/addNewBooking', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newBooking)
                })
                    .then((response) => response.json())
                    .then((data) => data.sucess ?
                        handleSuccessResponse(data, newBooking) :
                        handleFailedResponse(data, newBooking))
                    .catch((error) => console.log(`Något gick fel: ${error}`));
            } else showMessage('Inget hus är valt. Ladda om sidan och prova igen...')
        } else showMessage('Alla fält måste fyllas i');
    }

    const allBookedDates = selectedTile.occupied.map((booking) => booking.dates.flat()).flat();

    return (
        <div className="booking-section">
        <h2>{selectedTile.name}</h2>
            <label htmlFor="namefield">Namn</label>
            <input ref={nameRef} type="text" id="namefield" />
            <div className="booking-section-calendar">
                <DatePicker
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    excludeDates={allBookedDates.map((date) => new Date(date))}
                    selectsRange
                    selectsDisabledDaysInRange
                    inline
                    minDate={new Date()}
                />
            </div>
            <button onClick={handleBooking}>Boka</button>
        </div>
    )
}

export default BookingSection