import { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import NewTaskForm from './components/NewTaskForm/NewTaskForm';
import TaskList from './components/TaskList/TaskList';
import Footer from './components/Footer/Footer';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  // Переключатель
  const onToggle = useCallback((taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const updatedTask = { ...task, completed: !task.completed };
          if (updatedTask.completed) {
            return { ...updatedTask, timerRunning: false, startTime: null };
          }
          return updatedTask;
        }
        return task;
      })
    );
  }, []);

  // Удаление
  const onDelete = useCallback((taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  }, []);

  // Редактирование
  const onEdit = useCallback((taskId, newTitle) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, title: newTitle, timerRunning: false, startTime: null };
        }
        return task;
      })
    );
  }, []);

  // Фильтрация
  const filterTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === 'completed') {
        return task.completed;
      }
      if (filter === 'active') {
        return !task.completed;
      }
      return true;
    });
  }, [tasks, filter]);

  // Очистка выполненных задач
  const onClearTask = useCallback(() => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
  }, [tasks]);

  // Активные задачи в footer
  const activeTasksCount = useMemo(() => {
    return tasks.filter((task) => !task.completed).length;
  }, [tasks]);

  // Добавление новой задачи
  const onAddTask = useCallback((newTitle, timer) => {
    const newTask = {
      title: newTitle,
      id: Date.now(),
      createdAt: new Date(),
      completed: false,
      timer,
      timerRunning: false,
      startTime: null,
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  }, []);

  const onTimerToggle = useCallback((taskId, isRunning) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, timerRunning: isRunning, startTime: isRunning ? Date.now() : null } : task
      )
    );
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTasks = tasks.map((task) => {
        if (task.timerRunning && task.startTime) {
          const currentTime = Date.now();
          const elapsedTime = Math.floor((currentTime - task.startTime) / 1000);
          const newTimer = task.timer - elapsedTime;

          if (newTimer > 0) {
            return { ...task, timer: newTimer, startTime: currentTime };
          } else {
            return { ...task, timer: 0, timerRunning: false, startTime: null, completed: true };
          }
        }
        return task;
      });
      setTasks(updatedTasks);
    }, 1000);

    return () => clearInterval(interval);
  }, [tasks]);

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
            onTimerToggle={onTimerToggle}
          />
          <Footer
            tasks={tasks}
            filter={filter}
            setFilter={setFilter}
            onClearTask={onClearTask}
            activeCount={activeTasksCount}
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
