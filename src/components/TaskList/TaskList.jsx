import Task from '../Task/Task'
import './TaskList.css'

const TaskList = ({
	tasks,
	onToggleTaskCompletion,
	onDeleteTask,
	onEditTask,
}) => {
	return (
		<ul className='todo-list'>
			{tasks.map(task => (
				<Task
					key={task.id}
					title={task.title}
					createdAt={task.createdAt}
					completed={task.completed}
					onToggle={() => onToggleTaskCompletion(task.title, task.createdAt)}
					onDelete={() => onDeleteTask(task.title, task.createdAt)}
					onEdit={newTitle => onEditTask(task.title, task.createdAt, newTitle)}
				/>
			))}
		</ul>
	)
}

export default TaskList
