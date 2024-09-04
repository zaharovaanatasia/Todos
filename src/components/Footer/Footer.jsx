import TasksFilter from '../TasksFilter/TasksFilter'
import './Footer.css'

const Footer = () => {
	return (
		<footer className='footer'>
			<span className='todo-count'>1 item left</span>
			<TasksFilter />
			<button className='clear-completed'>Clear completed</button>
		</footer>
	)
}

export default Footer
