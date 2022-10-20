import React from 'react'

const ListItem = ({ booking }) => {
    return (
        <dl>
            <dt>Bokad av:</dt>
            <dd>{booking.by}</dd>
            <dt>Från:</dt>
            <dd>{booking.dates[0]}</dd>
            <dt>Till:</dt>
            <dd>{booking.dates[booking.dates.length - 1]}</dd>
        </dl>
    )
}

export default ListItem