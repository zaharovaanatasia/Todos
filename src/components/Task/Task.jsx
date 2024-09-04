import './Task.css'

const Task = ({ title, createdAt, completed }) => {
	return (
		<li className={completed ? 'completed' : ''}>
			<div className='view'>
				<input className='toggle' type='checkbox' defaultChecked={completed} />
				<label>
					<span className='description'>{title}</span>
					<span className='created'>created {createdAt}</span>
				</label>
				<button className='icon icon-edit' />
				<button className='icon icon-destroy' />
			</div>
		</li>
	)
}

export default Task
