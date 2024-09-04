import React from 'react'
import { useState } from 'react'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskLisk'
import Footer from './components/Footer/Footer'
import './App.css'

const App = () => {
	const [tasks, setTasks] = useState([
		{ title: 'Completed task', createdAt: '17 seconds ago', completed: false },
		{ title: 'Editing task', createdAt: '5 minutes ago', completed: false },
		{ title: 'Active task', createdAt: '5 minutes ago', completed: false },
	])

	const toggleTaskCompletion = (taskTitle, taskCreatedAt) => {
		const updatedTasks = tasks.map(task => {
			if (task.title === taskTitle && task.createdAt === taskCreatedAt) {
				return { ...task, completed: !task.completed }
			}
			return task
		})
		setTasks(() => updatedTasks)
	}

	const deleteTask = (taskTitle, taskCreatedAt) => {
		const undatedTasksNew = tasks.filter(
			task => !(task.title === taskTitle && task.createdAt === taskCreatedAt)
		)
		setTasks(() => undatedTasksNew)
	}

	return (
		<section className='todoapp'>
			<div className='app'>
				<header className='header'>
					<h1>Todos</h1>
					<NewTaskForm />
				</header>
				<section className='main'>
					<TaskList
						tasks={tasks}
						onToggleTaskCompletion={toggleTaskCompletion}
						onDeleteTask={deleteTask}
					/>
					<Footer />
				</section>
			</div>
		</section>
	)
}

export default App
