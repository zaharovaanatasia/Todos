import { useState } from 'react'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskList'
import Footer from './components/Footer/Footer'
import './App.css'

const App = () => {
	const [tasks, setTasks] = useState([])

	const [filter, setFilter] = useState('all')

	// переключатель
	const toggleTaskCompletion = (taskTitle, taskCreatedAt) => {
		const updatedTasks = tasks.map(task => {
			if (task.title === taskTitle && task.createdAt === taskCreatedAt) {
				return { ...task, completed: !task.completed }
			}
			return task
		})
		setTasks(() => updatedTasks)
	}

	// удаление
	const deleteTask = (taskTitle, taskCreatedAt) => {
		const updatedTasks = tasks.filter(
			task => !(task.title === taskTitle && task.createdAt === taskCreatedAt)
		)
		setTasks(updatedTasks)
	}

	// редактирование
	const editTask = (taskTitle, taskCreatedAt, newTitle) => {
		const updatedTasks = tasks.map(task => {
			return task.title === taskTitle && task.createdAt === taskCreatedAt
				? { ...task, title: newTitle }
				: task
		})
		setTasks(updatedTasks)
	}

	// фильтрация
	const filterTasks = tasks.filter(task => {
		if (filter === 'completed') {
			return task.completed
		}
		if (filter === 'active') {
			return !task.completed
		}
		return true
	})

	// очистка выполненных задач
	const ClearCompletedTask = () => {
		const updatedTasks = tasks.filter(task => !task.completed)
		setTasks(updatedTasks)
	}

	// активные задачи в footer
	const activeTasksCount = () => {
		return tasks.filter(task => !task.completed).length
	}

	//добавление новой задачи

	const addTask = newTitle => {
		const newTask = {
			title: newTitle,
			id: Date.now(),
			createdAt: new Date().toLocaleTimeString(),
			completed: false,
		}
		setTasks([newTask, ...tasks])
	}

	return (
		<section className='todoapp'>
			<div className='app'>
				<header className='header'>
					<h1>Todos</h1>
					<NewTaskForm onAddTask={addTask} />
				</header>
				<section className='main'>
					<TaskList
						tasks={filterTasks}
						onToggleTaskCompletion={toggleTaskCompletion}
						onDeleteTask={deleteTask}
						onEditTask={editTask}
					/>
					<Footer
						tasks={tasks}
						filter={filter}
						setFilter={setFilter}
						onClearCompletedTask={ClearCompletedTask}
						activeCount={activeTasksCount()}
					/>
				</section>
			</div>
		</section>
	)
}

export default App
