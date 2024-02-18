import React, { useState, useEffect } from 'react';
import '../App.css';

interface IProps {
  time: number;
  setTime: any;
}

const Timer = (props: IProps) => {
  const { time, setTime } = props;
  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime: any) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className="timer">Time: {time}</div>;
};

export default Timer;
