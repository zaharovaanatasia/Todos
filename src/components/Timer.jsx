import PropTypes from 'prop-types';

const Timer = ({ timer, onTimerUpdate = () => {}, onTimerPause = () => {}, taskId, isTaskCompleted }) => {
  const handleStart = () => {
    onTimerUpdate(taskId, true);
  };

  const handlePause = () => {
    onTimerPause(taskId);
  };

  const formatTime = (timer) => {
    const minutes = Math.floor(timer / 60);
    const seconds = (timer % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="description-new">
      <button className="icon-play" onClick={handleStart} disabled={isTaskCompleted} />
      <button className="icon-pause" onClick={handlePause} disabled={isTaskCompleted} />
      <span className="timer">{formatTime(timer)}</span>
    </div>
  );
};

Timer.propTypes = {
  timer: PropTypes.number,
  onTimerUpdate: PropTypes.func,
  onTimerPause: PropTypes.func,
  taskId: PropTypes.number,
  isTaskCompleted: PropTypes.bool,
};

export default Timer;
