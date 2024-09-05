import { useState } from 'react'
import './NewTaskForm.css'

const NewTaskForm = ({ onAddTask }) => {
	const [taskTitle, setTaskTitle] = useState('')

	const handleSubmit = e => {
		e.preventDefault()
		if (taskTitle.trim()) {
			onAddTask(taskTitle.trim())
			setTaskTitle('')
		}
	}
	return (
		<form onSubmit={handleSubmit}>
			<input
				type='text'
				className='new-todo'
				placeholder='What needs to be done?'
				value={taskTitle}
				onChange={e => setTaskTitle(e.target.value)}
				required
				autoFocus
			/>
		</form>
	)
}

export default NewTaskForm
