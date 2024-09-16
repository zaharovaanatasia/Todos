import './TasksFilter.css'
import PropTypes from 'prop-types'

const TasksFilter = ({ filter = 'all', setFilter = () => {} }) => {
	return (
		<ul className='filters'>
			<li>
				<input
					type='radio'
					id='filter-all'
					name='filter'
					value='all'
					checked={filter === 'all'}
					onChange={() => setFilter('all')}
				/>
				<label htmlFor='filter-all'>All</label>
			</li>
			<li>
				<input
					type='radio'
					id='filter-active'
					name='filter'
					value='active'
					checked={filter === 'active'}
					onChange={() => setFilter('active')}
				/>
				<label htmlFor='filter-active'>Active</label>
			</li>
			<li>
				<input
					type='radio'
					id='filter-completed'
					name='filter'
					value='completed'
					checked={filter === 'completed'}
					onChange={() => setFilter('completed')}
				/>
				<label htmlFor='filter-completed'>Completed</label>
			</li>
		</ul>
	)
}

TasksFilter.propTypes = {
	filter: PropTypes.string,
	setFilter: PropTypes.func,
}

export default TasksFilter
