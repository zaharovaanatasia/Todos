import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import Task from '../Task/Task'
import './TaskList.css'

const TaskList = ({
	tasks = [],
	onToggleTaskCompletion = () => {},
	onDeleteTask = () => {},
	onEditTask = () => {},
}) => {
	const [taskTimers, setTaskTimers] = useState(
		tasks.reduce((acc, task) => ({ ...acc, [task.id]: task.duration || 0 }), {})
	)
	const [isRunning, setIsRunning] = useState(false)
	const [activeTaskId, setActiveTaskId] = useState(null)

	useEffect(() => {
		let interval = null

		if (isRunning) {
			interval = setInterval(() => {
				setTaskTimers(prevTimers => {
					const updatedTimers = { ...prevTimers }
					if (activeTaskId !== null) {
						updatedTimers[activeTaskId] += 1
					}
					return updatedTimers
				})
			}, 1000)
		} else {
			clearInterval(interval)
		}
		return () => clearInterval(interval)
	}, [isRunning, activeTaskId])

	const handleTimerChangeStart = (id, newTimerValue) => {
		setTaskTimers(prevTimers => ({
			...prevTimers,
			[id]: newTimerValue,
		}))
		setActiveTaskId(id)
		setIsRunning(true)
	}

	const handleTimerChangePause = () => {
		setIsRunning(false)
	}

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
						timer={taskTimers[task.id] || 0}
						onTimerChangeStart={handleTimerChangeStart}
						onTimerChangePause={handleTimerChangePause}
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
