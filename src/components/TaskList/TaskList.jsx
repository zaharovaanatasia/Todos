import PropTypes from 'prop-types';
import Task from '../Task/Task';
import './TaskList.css';

const TaskList = ({ tasks = [], onToggle = () => {}, onDelete = () => {}, onEdit = () => {}, onTimerToggle }) => {
  return (
    <ul className="todo-list">
      {tasks.map((task) => (
        <li key={task.id}>
          <Task
            id={task.id}
            title={task.title}
            createdAt={task.createdAt}
            completed={task.completed}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            timer={task.timer}
            timerRunning={task.timerRunning}
            onTimerToggle={onTimerToggle}
          />
        </li>
      ))}
    </ul>
  );
};
TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.instanceOf(Date).isRequired,
      completed: PropTypes.bool.isRequired,
      timer: PropTypes.number.isRequired,
      timerRunning: PropTypes.bool.isRequired,
    })
  ),
  onToggle: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onTimerToggle: PropTypes.func,
};

export default TaskList;
