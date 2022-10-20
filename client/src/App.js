import React, { useEffect, useState, createContext } from 'react';

import Header from './Components/Header';
import Grid from './Components/Grid';
import Modal from './Components/Modal';
import Listing from './Components/Listing';
import DrawingFilterOptions from './Components/DrawingFilterOptions';

import './App.css';

export const InitialStateContext = createContext();

function App() {
  const [data, setData] = useState([]);
  const [highetstX, setHighestX] = useState(0);
  const [highetstY, setHighestY] = useState(0);
  const [selectedMode, setSelectedMode] = useState('user');
  const [selectedTile, setSelectedTile] = useState('');
  const [selectedTileType, setSelectedTileType] = useState('house');
  const [showModal, setShowModal] = useState('');

  const handleChangeSelectedTile = (id) => {
    const house = data.find((tile) => 
                            tile.pos.x.toString() === id.split('-')[0] && 
                            tile.pos.y.toString() === id.split('-')[1]);
    if (house) setSelectedTile(house);
  }

  const contextState = {
    data,
    selectedTileType,
    setSelectedTileType,
    selectedTile,
    handleChangeSelectedTile,
    setData,
    showModal,
    setShowModal,
    selectedMode,
    setSelectedMode
  }

  const arrOfXValues = data.map((tile) => tile.pos.x).sort((a, b) => {
    return a - b;
  });
  const arrOfYValues = data.map((tile) => tile.pos.y).sort((a, b) => {
    return a - b;
  });

  const getData = async () => {
    const response = await fetch('/getData');
    const body = await response.json();

    if (!body) return;
    setData(body.data);

    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (!data) return;
    if (data.length === 0) return;
    setHighestX(arrOfXValues.pop() + 2); // +2 to get a grass frame around the cabins
    setHighestY(arrOfYValues.pop() + 2); // +2 to get a grass frame around the cabins
  }, [data.length, arrOfXValues , arrOfYValues, data])

  return (
    <InitialStateContext.Provider value={contextState}>
      <Header />
      <main >
        <div className={`app ${selectedMode}`}>
          <Grid width={highetstX} height={highetstY} />
          { selectedMode === 'listing' &&
            data.filter((house) => house.occupied.length > 0).map((house, i) => {
              return <Listing data={house} key={i}/>
            })
          }
          { selectedMode === 'drawingMode' && 
              <DrawingFilterOptions />
          }
        </div >
      </main>
      {showModal && <Modal />}
    </InitialStateContext.Provider>
  );
}

export default App;
