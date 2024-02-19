import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import StartMenu from './pages/StartMenu';
import GamePage from './pages/GamePage';

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<StartMenu />} />
        <Route path="game" element={<GamePage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
