import { useState } from 'react';
import PropTypes from 'prop-types';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import TaskList from './components/TaskList/TaskList';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  // переключатель
  const onToggle = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(() => updatedTasks);
  };

  // удаление
  const onDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // редактирование
  const onEdit = (taskId, newTitle) => {
    const updatedTasks = tasks.map((task) => {
      return task.id === taskId ? { ...task, title: newTitle } : task;
    });
    setTasks(updatedTasks);
  };

  // фильтрация
  const filterTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.completed;
    }
    if (filter === 'active') {
      return !task.completed;
    }
    return true;
  });

  // очистка выполненных задач
  const onClearTask = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  };

  // активные задачи в footer
  const activeTasksCount = () => {
    return tasks.filter((task) => !task.completed).length;
  };

  //добавление новой задачи

  const onAddTask = (newTitle, duration) => {
    const newTask = {
      title: newTitle,
      id: Date.now(),
      createdAt: new Date(),
      completed: false,
      timer: duration,
    };
    setTasks([newTask, ...tasks]);
  };

  const onTimerUpdate = (taskId, newTimerValue) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, timer: newTimerValue } : task));
    setTasks(updatedTasks);
  };


  const onTimerPause = (taskId) => {
    const updatedTasks = tasks.map((task) => (task.id === taskId ? { ...task, timerRunning: false } : task));
    setTasks(updatedTasks);
  };

  return (
    <section className="todoapp">
      <div className="app">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm onAddTask={onAddTask} />
        </header>
        <section className="main">
          <TaskList
            tasks={filterTasks}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onTimerUpdate={onTimerUpdate}
            onTimerPause={onTimerPause}
          />
          <Footer
            tasks={tasks}
            filter={filter}
            setFilter={setFilter}
            onClearTask={onClearTask}
            activeCount={activeTasksCount()}
          />
        </section>
      </div>
    </section>
  );
};

App.propTypes = {
  tasks: PropTypes.array,
  filter: PropTypes.string,
};

export default App;
