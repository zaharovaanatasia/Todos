import PropTypes from 'prop-types';
import TasksFilter from '../TasksFilter/TasksFilter';
import './Footer.css';

const Footer = ({ filter = 'all', setFilter = () => {}, onClearTask = () => {}, activeCount = 0 }) => {
  const itemLabel = activeCount === 1 ? 'item' : 'items';
  return (
    <footer className="footer">
      <span className="todo-count">
        {' '}
        {activeCount} {itemLabel} left
      </span>
      <TasksFilter filter={filter} setFilter={setFilter} />
      <button className="clear-completed" onClick={onClearTask}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.propTypes = {
  filter: PropTypes.string,
  setFilter: PropTypes.func,
  onClearTask: PropTypes.func,
  activeCount: PropTypes.number,
};

export default Footer;
