import PropTypes from 'prop-types';
import Task from '../Task/Task';
import './TaskList.css';

const TaskList = ({
  tasks = [],
  onToggle = () => {},
  onDelete = () => {},
  onEdit = () => {},
  onTimerUpdate = () => {},
  onTimerPause = () => {},
}) => {
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
            onTimerUpdate={(taskId, newTimerValue) => onTimerUpdate(taskId, newTimerValue)}
            onTimerPause={(taskId, newTimerValue) => onTimerPause(taskId, newTimerValue)}
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
      duration: PropTypes.number,
    })
  ),
  onToggle: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onTimerUpdate: PropTypes.func,
  onTimerPause: PropTypes.func,
};

export default TaskList;
