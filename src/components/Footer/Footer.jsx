import TasksFilter from '../TasksFilter/TasksFilter'
import './Footer.css'

const Footer = ({
	tasks,
	filter,
	setFilter,
	onClearCompletedTask,
	activeCount,
}) => {
	const itemLabel = activeCount === 1 ? 'item' : 'items'
	return (
		<footer className='footer'>
			<span className='todo-count'>
				{' '}
				{activeCount} {itemLabel} left
			</span>
			<TasksFilter filter={filter} setFilter={setFilter} />
			<button className='clear-completed' onClick={onClearCompletedTask}>
				Clear completed
			</button>
		</footer>
	)
}

export default Footer
