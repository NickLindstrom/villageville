import React, { useContext } from 'react'

import Tile from './Tile';

import { InitialStateContext } from "../App";

const Grid = ({ width, height }) => {

  const { data } = useContext(InitialStateContext);

  return (
    Array(height).fill().map((row, a) => {
      return (
        <div className="row" key={a}>
          {Array(width).fill().map((column, b) => {
            const tile = data.find((tile) => tile.pos.x === b && tile.pos.y === a)
            return <Tile tile={tile} key={b} id={`${b}-${a}`} />
          })
          }
        </div>
      )
    })
    
  )
}

export default Grid