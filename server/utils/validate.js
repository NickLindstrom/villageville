export const validateBookingDate = (house, allDates) => {
    if(house.occupied.some((booking) => booking.dates.some((date) => allDates.includes(date)))) {
        return false
    }
    return true
}