import PropTypes from 'prop-types';

const Timer = ({ timer, onTimerToggle, taskId, isTaskCompleted, timerRunning }) => {
  const handleToggle = () => {
    onTimerToggle(taskId, !timerRunning); // Переключаем состояние таймера
  };
  const formatTime = (timer) => {
    const minutes = Math.floor(timer / 60);
    const seconds = (timer % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="description-new">
      <button className="icon-play" onClick={handleToggle} disabled={isTaskCompleted} />
      <button className="icon-pause" onClick={handleToggle} disabled={isTaskCompleted} />
      <span className="timer">{formatTime(timer)}</span>
    </div>
  );
};

Timer.propTypes = {
  timer: PropTypes.number,
  timerRunning: PropTypes.bool,
  onTimerToggle: PropTypes.func,
  taskId: PropTypes.number,
  isTaskCompleted: PropTypes.bool,
};

export default Timer;
