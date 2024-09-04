import React from 'react'
import './Task.css'

const Task = ({ title, createdAt, completed, onToggle, onDelete }) => {
	return (
		<li className={completed ? 'completed' : ''}>
			<div className='view'>
				<input
					className='toggle'
					type='checkbox'
					checked={completed}
					onChange={onToggle}
				/>
				<label onClick={onToggle}>
					<span className='description'>{title}</span>
					<span className='created'>created {createdAt}</span>
				</label>
				<button className='icon icon-edit' />
				<button className='icon icon-destroy' onClick={onDelete} />
			</div>
		</li>
	)
}

export default Task
