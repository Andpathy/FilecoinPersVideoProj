import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Player from './pages/Player';
import {useMoralis} from "react-moralis";
import {Icon, ConnectButton} from"web3uikit"
import './App.css';

const App = () => {
  const {isAuthenticated, Moralis} = useMoralis();
  return(
    <div>
      {isAuthenticated ? (
        <div className="appDiv">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player" element={<Player />} />
        </Routes>
        </div>
    ):(
      <div className="loginPage">
        <div style={{'textAlign':'center', 'padding':'100px'}}><ConnectButton /></div>
        
      </div>
    )}
    </div>
    
  )
};



export default App;
