import React from 'react'

import Grass from '../Assets/grass.jpg'
import Water from '../Assets/water.jpg'
import House from '../Assets/house.png'
import Road from '../Assets/road.jpg'
import Remove from '../Assets/remove.png'

const TileImage = ({ type }) => {
  switch (type) {
    case 'house': 
    return <img src={House} alt=""/>
    case 'grass': 
    return <img src={Grass} alt=""/>
    case 'water': 
    return <img src={Water} alt=""/>
    case 'road': 
    return <img src={Road} alt=""/>
    case 'remove': 
    return <img src={Remove} alt=""/>
    default:
      return null;
  }
}

export default TileImage