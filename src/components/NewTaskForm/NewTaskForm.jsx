import { useState } from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';

const NewTaskForm = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskMinutes, setTaskMinutes] = useState('');
  const [taskSeconds, setTaskSeconds] = useState('');

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      const totalTime = (parseInt(taskMinutes) || 0) * 60 + (parseInt(taskSeconds) || 0);

      if (taskTitle.trim() && totalTime > 0) {
        onAddTask(taskTitle.trim(), totalTime);
        setTaskTitle('');
        setTaskMinutes('');
        setTaskSeconds('');
      }
    }
  };
  return (
    <form className="new-task-form" onKeyDown={onKeyDown}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        required
        autoFocus
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Min"
        value={taskMinutes}
        onChange={(e) => setTaskMinutes(e.target.value)}
        required
      />
      <input
        type="number"
        className="new-todo-form__timer"
        placeholder="Sec"
        value={taskSeconds}
        onChange={(e) => setTaskSeconds(e.target.value)}
        required
      />
    </form>
  );
};

NewTaskForm.propTypes = {
  onAddTask: PropTypes.func,
};

export default NewTaskForm;
