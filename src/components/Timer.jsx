import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Timer = ({ timerValue, onTimerChangeStart = () => {}, onTimerChangePause = () => {}, taskId }) => {
  const [timer, setTimer] = useState(timerValue);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer + 1;
          onTimerChangeStart(taskId, newTimer);
          return newTimer;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning, taskId, onTimerChangeStart]);

  useEffect(() => {
    setTimer(timerValue);
  }, [timerValue]);

  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    if (isRunning) {
      setIsRunning(false);
      onTimerChangePause();
    }
  };

  const formatTime = (timer) => {
    const minutes = Math.floor(timer / 60);
    const seconds = (timer % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="description-new">
      <button className="icon-play" onClick={handleStart} />
      <button className="icon-pause" onClick={handlePause} />
      <span className="timer">{formatTime(timer)}</span>
    </div>
  );
};

Timer.propTypes = {
  timerValue: PropTypes.number,
  onTimerChangeStart: PropTypes.func,
  onTimerChangePause: PropTypes.func,
  taskId: PropTypes.number,
};

export default Timer;
