import Task from '../Task/Task'
import './TaskList.css'

const TaskList = () => {
	
	const tasks = [
		{ title: 'Completed task', createdAt: '17 seconds ago', completed: true },
		{ title: 'Editing task', createdAt: '5 minutes ago', completed: false },
		{ title: 'Active task', createdAt: '5 minutes ago', completed: false },
	]

	return (
		<ul className='todo-list'>
			{tasks.map(task => (
				<Task
					key={`${task.title}-${task.createdAt}`}
					title={task.title}
					createdAt={task.createdAt}
					completed={task.completed}
				/>
			))}
		</ul>
	)
}

export default TaskList
