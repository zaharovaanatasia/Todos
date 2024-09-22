import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import './Task.css';
import Timer from '../Timer';

const Task = ({
  id,
  title = 'Untitled Task',
  createdAt = new Date(),
  completed = false,
  onToggle = () => {},
  onDelete = () => {},
  onEdit = () => {},
  timer,
  onTimerUpdate,
  onTimerPause,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleEdit = () => {
    setEditedTitle(title);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editedTitle.trim()) {
      onEdit(editedTitle, id);
    }
    setIsEditing(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };
  const createdAtFormatted = formatDistanceToNow(new Date(createdAt), {
    addSuffix: true,
    includeSeconds: true,
  });

  return (
    <span className={`${completed ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}>
      <div className="view">
        <input className="toggle" type="checkbox" checked={completed} onChange={() => onToggle(id)} />

        <label>
          <span className="description">{title}</span>

          <Timer
            timerValue={timer}
            onTimerUpdate={onTimerUpdate}
            onTimerPause={onTimerPause}
            taskId={id}
            isTaskCompleted={completed}
          />
          <span className="created">created {createdAtFormatted}</span>
        </label>

        <button className="icon icon-edit" onClick={handleEdit} disabled={completed} />
        <button className="icon icon-destroy" onClick={() => onDelete(id)} />
      </div>
      {isEditing && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSave();
          }}
        >
          <input
            type="text"
            className="edit"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onKeyDown={onKeyDown}
            onBlur={handleSave}
          />
        </form>
      )}
    </span>
  );
};

Task.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date),
  completed: PropTypes.bool,
  onToggle: PropTypes.func,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  timer: PropTypes.number,
  onTimerUpdate: PropTypes.func,
  onTimerPause: PropTypes.func,
};

export default Task;
