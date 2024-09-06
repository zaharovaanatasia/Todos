import PropTypes from 'prop-types'
import Task from '../Task/Task'
import './TaskList.css'

const TaskList = ({
	tasks = [],
	onToggleTaskCompletion = () => {},
	onDeleteTask = () => {},
	onEditTask = () => {},
}) => {
	return (
		<ul className='todo-list'>
			{tasks.map(task => (
				<li key={task.id}>
					<Task
						id={task.id}
						title={task.title}
						createdAt={task.createdAt}
						completed={task.completed}
						onToggle={() => onToggleTaskCompletion(task.id)}
						onDelete={() => onDeleteTask(task.id)}
						onEdit={newTitle => onEditTask(task.id, newTitle)}
					/>
				</li>
			))}
		</ul>
	)
}

TaskList.propTypes = {
	tasks: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number.isRequired,
			title: PropTypes.string.isRequired,
			createdAt: PropTypes.instanceOf(Date).isRequired,
			completed: PropTypes.bool.isRequired,
		})
	),
	onToggleTaskCompletion: PropTypes.func,
	onDeleteTask: PropTypes.func,
	onEditTask: PropTypes.func,
}

export default TaskList
