import { useState, useEffect } from 'react';
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
        const updatedTask = { ...task, completed: !task.completed };

        if (!updatedTask.completed) {
          return updatedTask;
        } else {
          return { ...updatedTask, timerRunning: false, startTime: null };
        }
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // удаление
  const onDelete = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
  };

  // редактирование
  const onEdit = (taskId, newTitle) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, title: newTitle, timerRunning: false, startTime: null };
      }
      return task;
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

  const onAddTask = (newTitle, timer) => {
    const newTask = {
      title: newTitle,
      id: Date.now(),
      createdAt: new Date(),
      completed: false,
      timer,
      timerRunning: false,
      startTime: null,
    };
    setTasks([newTask, ...tasks]);
  };

  const onTimerUpdate = (taskId, isRunning) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, timerRunning: isRunning, startTime: isRunning ? Date.now() : null };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // пауза таймера
  const onTimerPause = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, timerRunning: false };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

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
