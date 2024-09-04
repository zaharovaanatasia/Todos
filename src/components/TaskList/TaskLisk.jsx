import { useState } from 'react'
import Task from '../Task/Task'
import './TaskList.css'

const TaskList = ({ tasks, onToggleTaskCompletion, onDeleteTask }) => {
	return (
		<ul className='todo-list'>
			{tasks.map(task => (
				<Task
					key={`${task.title}-${task.createdAt}`}
					title={task.title}
					createdAt={task.createdAt}
					completed={task.completed}
					onToggle={() => onToggleTaskCompletion(task.title, task.createdAt)}
					onDelete={() => onDeleteTask(task.title, task.createdAt)}
				/>
			))}
		</ul>
	)
}

export default TaskList
