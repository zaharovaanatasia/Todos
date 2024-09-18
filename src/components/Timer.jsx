import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const Timer = ({ timerValue, onTimerChangeStart = () => {}, onTimerChangePause = () => {}, taskId }) => {
  const [timer, setTimer] = useState(timerValue);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null); // запуск вр

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedTime = Math.floor((currentTime - startTime) / 1000);
        const newTimer = timerValue - elapsedTime;

        if (newTimer > 0) {
          setTimer(newTimer);
          onTimerChangeStart(taskId, newTimer);
        } else {
          setTimer(0);
          setIsRunning(false);
          onTimerChangeStart(taskId, 0);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, startTime, timerValue, taskId, onTimerChangeStart]);

  useEffect(() => {
    setTimer(timerValue);
  }, [timerValue]);

  const handleStart = () => {
    if (!isRunning) {
      setStartTime(Date.now());
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
