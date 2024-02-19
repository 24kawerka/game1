import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import StartMenu from './pages/StartMenu';
import GamePage from './pages/GamePage';
const App = () => {
  return (
    <BrowserRouter basename={process.env.REACT_APP_BASE_PATH ? '' : '/game1'}>
      <Routes>
        <Route path="/" element={<StartMenu />} />
        <Route path="game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
