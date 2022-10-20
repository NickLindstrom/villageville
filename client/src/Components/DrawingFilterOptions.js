import React, { useContext } from 'react';

import { InitialStateContext } from "../App";

import MiscTile from "./TileImage";

const DrawingFilterOptions = () => {
    const tileTypes = ['house', 'road', 'water', 'remove']
    const handleChangeTileType = radio => event => setSelectedTileType(radio);

    const { setSelectedTileType } = useContext(InitialStateContext);

    return <div className="tile-type-selector">
        {tileTypes.map((tileType, i) =>
            <label key={i}>
                <input type="radio" name="tile" onClick={handleChangeTileType(tileType)} defaultChecked={i === 0} />
                <MiscTile type={tileType} />
            </label>
        )}
    </div>
}

export default DrawingFilterOptions