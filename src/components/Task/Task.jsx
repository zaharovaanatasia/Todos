import React, { useState } from 'react'

import './Task.css'

const Task = ({ title, createdAt, completed, onToggle, onDelete, onEdit }) => {
	const [isEditing, setIsEditing] = useState(false)
	const [editedTitle, setEditedTitle] = useState(title)

	const handleEdit = () => {
		setEditedTitle(title)
		setIsEditing(true)
	}

	const handleSave = () => {
		setIsEditing(false)
		onEdit(title, createdAt, editedTitle)
	}

	const handleKeyDown = e => {
		if (e.key === 'Enter') {
			handleSave()
		}
	}

	return (
		<li
			className={`${completed ? 'completed' : ''} ${
				isEditing ? 'editing' : ''
			}`}
		>
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
				<button className='icon icon-edit' onClick={handleEdit} />
				<button className='icon icon-destroy' onClick={onDelete} />
			</div>
			{isEditing && (
				<form>
					<input
						type='text'
						className='edit'
						value={editedTitle}
						onChange={e => setEditedTitle(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
				</form>
			)}
		</li>
	)
}

export default Task
