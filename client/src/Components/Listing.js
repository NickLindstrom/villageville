import React from 'react'

import ListItem from "./ListItem";

const Listing = ({ data }) => {
  if (data.occupied.length > 0)
    return <>
      <h2>{data.name}</h2>
      {data.occupied.map((booking, i) =>
        <ListItem booking={booking} key={i} />
      )}
    </>
  else
    return <span>Inga bokningar är ännu gjorda</span>
}

export default Listing