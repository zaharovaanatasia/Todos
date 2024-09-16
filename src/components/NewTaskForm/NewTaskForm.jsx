import { useState } from 'react'
import './NewTaskForm.css'
import PropTypes from 'prop-types'

const NewTaskForm = ({ onAddTask = () => {} }) => {
	const [taskTitle, setTaskTitle] = useState('')
	const [taskMinutes, setTaskMinutes] = useState('')
	const [taskSeconds, setTaskSeconds] = useState('')

	const handleKeyDown = e => {
		if (e.key === 'Enter' && taskTitle.trim()) {
			const totalTime =
				(parseInt(taskMinutes) || 0) * 60 + (parseInt(taskSeconds) || 0)
			if (totalTime >= 0) {
				onAddTask(taskTitle.trim(), totalTime)
				setTaskTitle('')
				setTaskMinutes('')
				setTaskSeconds('')
			}
		}
	}

	return (
		<form className='new-task-form'>
			<input
				type='text'
				className='new-todo'
				placeholder='What needs to be done?'
				value={taskTitle}
				onChange={e => setTaskTitle(e.target.value)}
				onKeyDown={handleKeyDown}
				required
				autoFocus
			/>
			<input
				type='number'
				className='new-todo-form__timer'
				placeholder='Min'
				value={taskMinutes}
				onChange={e => setTaskMinutes(e.target.value)}
			/>
			<input
				type='number'
				className='new-todo-form__timer'
				placeholder='Sec'
				value={taskSeconds}
				onChange={e => setTaskSeconds(e.target.value)}
			/>
		</form>
	)
}

NewTaskForm.propTypes = {
	onAddTask: PropTypes.func,
}

export default NewTaskForm
