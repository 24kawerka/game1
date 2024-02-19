import React from 'react';
import '../assets/styles/start-game.css';
import refreshImg from '../assets/images/refresh-power-up.webp';
import heartIcon from '../assets/images/health-power-up.png';
import timeIcon from '../assets/images/time-power-up.png';
import { Link } from 'react-router-dom';

const StartMenu = () => {
  return (
    <div className="container">
      <div className="blocks-wrapper">
        <div className="menu-container">
          <Link className="start-game-btn" to="/game">
            Start game
          </Link>
        </div>
        <div className="controll-container">
          <span>
            <span style={{ fontWeight: 'bold' }}>
              &uarr; &darr; &larr; &rarr;
            </span>{' '}
            moving
          </span>
          <span>Space - attack (coming soon)</span>
          <div>
            <img src={refreshImg} alt="" className="controller-image" />
            <span> - refresh all enemies</span>
          </div>
          <div>
            <img src={heartIcon} alt="" className="controller-image" />
            <span> + 1 more life</span>
          </div>
          <div>
            <img src={timeIcon} alt="" className="controller-image" />
            <span> + 10 seconds to result</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
