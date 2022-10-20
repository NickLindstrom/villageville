import React, { useContext, useEffect, useState } from 'react';

import { InitialStateContext } from "../App";

import NumberOfBookings from "./NumberOfBookings";
import TileImage from "./TileImage";

const Tile = ({ tile, id }) => {
  const {
    selectedTileType,
    setShowModal,
    setData,
    selectedMode,
    handleChangeSelectedTile } = useContext(InitialStateContext);

  const [isAdminMode, setIsAdminMode] = useState(false)

  const drawOnCanvas = async (target) => {
    await fetch('/draw', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: target.dataset.id,
        type: selectedTileType
      })
    }).then((response) => response.json())
      .then((data) => setData(data.data))
      .catch((error) =>
        console.log(`Något blev tokigt i connection ${JSON.stringify(error)}`)
      );
  }

  useEffect(() => {
    if (!selectedMode) return;
    setIsAdminMode(selectedMode !== 'user');
  }, [selectedMode])

  const handleClickTile = (e) => {
    if (selectedMode === 'drawingMode') drawOnCanvas(e.target);
    else if (e.target.dataset.type === 'house') {
      setShowModal('clicked-house');
      handleChangeSelectedTile(e.target.dataset.id)
    }
  }

  return <div className={`tile ${tile ? tile.type : ''}`}
              onClick={handleClickTile}
              data-id={id}
              data-type={tile ? tile.type : 'grass'} >
                {isAdminMode && <NumberOfBookings tile={tile} />}
                <TileImage type={tile ? tile.type : 'grass'} />
            </div>
}

export default Tile