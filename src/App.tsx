import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MapComponent } from './Map/MapComponent';

function App() {
  return (
    <div className="App" style={{height:"100%"}}>
     <MapComponent position={{ lat: 39.103, lng: -84.512}} style={{height:"100vh"}}/>
    </div>
  );
}

export default App;
