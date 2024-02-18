import React, { useEffect } from 'react';
import '../App.css';

interface IProps {
  currentPowerUp: '' | { type: string; x: number; y: number };
  position: { x: number; y: number };
  setCurrentPowerUp: any;
  size: number;
  //TODO: type
  setTime: any;
  setEnemies: any;
  setHealthPoint: any;
}
const PowerUp = (props: IProps) => {
  const {
    currentPowerUp,
    position,
    setCurrentPowerUp,
    size,
    setEnemies,
    setHealthPoint,
    setTime,
  } = props;

  useEffect(() => {
    //collision beetween person and powerUp
    if (currentPowerUp) {
      const isGetPowerUp =
        currentPowerUp.x < position.x + size &&
        currentPowerUp.x + 36 > position.x &&
        currentPowerUp.y < position.y + size &&
        currentPowerUp.y + 36 > position.y;

      if (isGetPowerUp) {
        setCurrentPowerUp('');
        if (currentPowerUp.type === 'time') {
          setTime((prev: any) => prev + 10);
        }
        if (currentPowerUp.type === 'health') {
          setHealthPoint((prev: any) => [...prev, prev.length + 1]);
        }
        if (currentPowerUp.type === 'refresh') {
          setEnemies([]);
        }
      }
    }
  }, [position, currentPowerUp]);

  if (!currentPowerUp) {
    return null;
  }
  if (currentPowerUp.type === 'time') {
    return (
      <div
        className="power-up time"
        style={{
          left: currentPowerUp.x,
          top: currentPowerUp.y,
        }}></div>
    );
  }
  if (currentPowerUp.type === 'health') {
    return (
      <div
        className="power-up health"
        style={{
          left: currentPowerUp.x,
          top: currentPowerUp.y,
        }}></div>
    );
  }
  return (
    <div
      className="power-up refresh"
      style={{
        left: currentPowerUp.x,
        top: currentPowerUp.y,
      }}></div>
  );
};

export default PowerUp;
