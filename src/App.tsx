import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import healthIcon from './assets/images/health.png';
import { getRandomInt } from './helpers/getRandomInt';
import Timer from './components/Timer';
import PowerUp from './components/PowerUp';

type IDirection = 'right' | 'left' | 'up' | 'down';

function App() {
  //positions
  const [position, setPosition] = useState({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });
  const [weaponPosition, setWeaponPosition] = useState({ x: 75, y: 100 });
  const [direction, setDirection] = useState<IDirection>('down');
  //enemies
  const [enemies, setEnemies] = useState<any>([]);
  const [enemiesTotalCount, setEmiesTotalCount] = useState(30);
  const [defaultEnemySpeed, setDefaultEnemySpeed] = useState(100);
  const [spawnEnemyDelay, setSpawnEnemyDelay] = useState(200);
  //else
  const [time, setTime] = useState(0);
  const [isAttack, setIsAttack] = useState(false);
  const [healthPoint, setHealthPoint] = useState([1, 2, 3, 4, 5]);
  const [currentPowerUp, setCurrentPowerUp] = useState<
    '' | { type: string; x: number; y: number }
  >('');

  const size = 50;
  const weaponSize = {
    height: 20,
    width: 5,
  };
  const powerUpSpawnDelay = 10000;
  const powerUps = ['time', 'health', 'refresh', ''];

  useEffect(() => {
    //collision beetween person and enemy
    if (healthPoint.length > 0) {
      const isShootByEnemy =
        enemies.length > 0 &&
        enemies.find(
          (item: any) =>
            item.x < position.x + size &&
            item.x + 15 > position.x &&
            item.y < position.y + size &&
            item.y + 20 > position.y,
        );
      if (isShootByEnemy) {
        setEnemies((prev: any) =>
          prev.filter((item: any) => item.id !== isShootByEnemy.id),
        );
        setHealthPoint((prev) =>
          prev.filter((item, index) => index !== prev.length - 1),
        );
      }
    }
  }, [position, enemies]);

  useEffect(() => {
    //end game
    if (healthPoint.length === 0) {
      alert(`Your time is ${time} seconds`);
      resetGame();
      setTime(0);
    }
  }, [healthPoint]);

  useEffect(() => {
    //harder every 5 seconds
    const speedEnemyImprove = () => {
      setDefaultEnemySpeed((prev) => prev / 2);
      setEmiesTotalCount((prev) => prev + 5);
      setSpawnEnemyDelay((prev) => prev / 2);
    };
    const moveFasterId = setInterval(speedEnemyImprove, 5000);
    return () => clearInterval(moveFasterId);
  }, []);

  useEffect(() => {
    //spawn enemies
    const enemyCreationInterval = setInterval(() => {
      if (enemies.length < enemiesTotalCount) {
        const id = Date.now();
        const randomStartXY = getRandomInt(2);
        const newEnemy = {
          id,
          x: randomStartXY ? getRandomInt(window.innerWidth - 45) : 0,
          y: !randomStartXY ? getRandomInt(window.innerHeight - 45) : 0,
          direction: randomStartXY ? 'down' : 'right',
        };
        setEnemies((prevEnemies: any) => [...prevEnemies, newEnemy]);
      }
    }, spawnEnemyDelay);

    return () => clearInterval(enemyCreationInterval);
  }, []);

  useEffect(() => {
    //enemies movement
    const movementInterval = setInterval(() => {
      setEnemies((prevEnemies: any) =>
        prevEnemies
          .map((enemy: any) => {
            if (enemy.direction === 'right') {
              return enemy.x < window.innerWidth - 45
                ? { ...enemy, x: enemy.x + 15 }
                : null;
            } else if (enemy.direction === 'down') {
              return enemy.y < window.innerHeight - 45
                ? { ...enemy, y: enemy.y + 15 }
                : null;
            }
            return enemy;
          })
          .filter((enemy: any) => enemy !== null),
      );
    }, defaultEnemySpeed);

    return () => clearInterval(movementInterval);
  }, []);

  useEffect(() => {
    //press btns
    const handleKeyDown = (e: any) => {
      switch (e.key) {
        case ' ':
          attack();
          break;
        case 'ArrowLeft':
          setPosition((prev) => ({ ...prev, x: Math.max(prev.x - 15, 0) }));
          setDirection('left');
          break;
        case 'ArrowDown':
          setPosition((prev) => ({
            ...prev,
            y: Math.min(prev.y + 15, window.innerHeight - size),
          }));
          setDirection('down');
          break;
        case 'ArrowUp':
          setPosition((prev) => ({
            ...prev,
            y: Math.max(prev.y - 15, 0),
          }));
          setDirection('up');
          break;
        case 'ArrowRight':
          setPosition((prev) => ({
            ...prev,
            x: Math.min(prev.x + 15, window.innerWidth - size),
          }));
          setDirection('right');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [position]);

  useEffect(() => {
    //person attack
    switch (direction) {
      case 'left':
        setWeaponPosition({
          x: position.x - weaponSize.height,
          y: position.y + (size - weaponSize.height) / 2,
        });
        break;
      case 'right':
        setWeaponPosition({
          x: position.x + size,
          y: position.y + (size - weaponSize.height) / 2,
        });
        break;
      case 'up':
        setWeaponPosition({
          x: position.x + (size - weaponSize.width) / 2,
          y: position.y - weaponSize.height,
        });
        break;
      case 'down':
        setWeaponPosition({
          x: position.x + (size - weaponSize.width) / 2,
          y: position.y + size,
        });
        break;
      default:
        break;
    }
  }, [direction, position]);

  useEffect(() => {
    const spawnPowerUpId = setInterval(getPowerUp, powerUpSpawnDelay);
    return () => clearInterval(spawnPowerUpId);
  }, []);

  const attack = () => {
    setIsAttack(true);
    setTimeout(() => {
      setIsAttack(false);
    }, 200);
  };

  const resetGame = () => {
    setHealthPoint([1, 2, 3, 4, 5]);
    setEnemies([]);
    setPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
  };

  const getPowerUp = () => {
    const randomIndex = Math.floor(Math.random() * powerUps.length);
    setCurrentPowerUp(
      powerUps[randomIndex]
        ? {
            type: powerUps[randomIndex],
            x: getRandomInt(window.innerWidth - 80),
            y: getRandomInt(window.innerHeight - 80),
          }
        : '',
    );
  };

  return (
    <div className="App">
      <Timer time={time} setTime={setTime} />
      <div className="health-container">
        {healthPoint.map((item) => (
          <img src={healthIcon} alt="" key={item} />
        ))}
      </div>
      {enemies.length > 0 &&
        enemies.map((item: any) => (
          <div
            className="enemy"
            key={item.id}
            style={{
              left: item.x,
              top: item.y,
              width: 30,
              height: 30,
            }}></div>
        ))}
      {currentPowerUp && (
        <PowerUp
          currentPowerUp={currentPowerUp}
          setCurrentPowerUp={setCurrentPowerUp}
          position={position}
          size={size}
          setEnemies={setEnemies}
          setHealthPoint={setHealthPoint}
          setTime={setTime}
        />
      )}
      <div
        className="square"
        id="person"
        style={{
          left: position.x,
          top: position.y,
          width: size,
          height: size,
        }}></div>
      {isAttack && (
        <div
          className="weapon"
          style={{
            left: weaponPosition.x,
            top: weaponPosition.y,
            width: ['up', 'down'].includes(direction)
              ? weaponSize.width
              : weaponSize.height,
            height: ['up', 'down'].includes(direction)
              ? weaponSize.height
              : weaponSize.width,
          }}></div>
      )}
    </div>
  );
}

export default App;
