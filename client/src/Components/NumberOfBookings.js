import React from 'react'

const NumberOfBookings = ({ tile }) => {
    if (!tile) return null;
    if (!tile.occupied) return null;
    if (tile.occupied.length === 0) return null;
    return (
        <span className="number-of-bookings">{tile.occupied.length}</span>
    )
}

export default NumberOfBookings