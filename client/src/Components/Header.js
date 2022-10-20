import React, { useContext, useState, useEffect } from 'react';

import { InitialStateContext } from "../App";

import logo from "../Assets/logo.png"

const modes = [{
  name: 'Användare',
  id: 'user',
  isAdmin: false,
},
{
  name: 'Admin',
  id: 'admin',
  isAdmin: false,
},
{
  name: 'Listning',
  id: 'listing',
  isAdmin: true,
},
{
  name: 'Ritläge',
  id: 'drawingMode',
  isAdmin: true,
}
]

const Header = () => {
  const {
    selectedMode,
    setSelectedMode } = useContext(InitialStateContext);

  const [filtredModes, setFiltredModes] = useState([]);

  useEffect(() => {
    setFiltredModes(modes.filter((mode) => {
      if (mode.isAdmin) {
        if (selectedMode !== 'user') {
          return mode
        }
        return false
      }
      return mode
    }));
  }, [selectedMode])

  const handleChangeMode = radio => event => setSelectedMode(radio);

  return <header>
    <img src={logo} alt="logo" className="logo" />
    <h1 className="sr-only">Villageville - när du behöver en stuga!</h1>
    <div className="mode-type-selector">
      {filtredModes.map((mode, i) => {
        return <label key={i}>
          <input type="radio" name="mode" onClick={handleChangeMode(mode.id)} defaultChecked={mode.id === selectedMode} />
          {mode.name}
        </label>
      }
      )}
    </div>
  </header>
}

export default Header