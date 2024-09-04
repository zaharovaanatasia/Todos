import React from 'react'
import NewTaskForm from './components/NewTaskForm/NewTaskForm'
import TaskList from './components/TaskList/TaskLisk'
import Footer from './components/Footer/Footer'
import './App.css'

const App = () => {

	return (
		<section className='todoapp'>
			<div className='app'>
				<header className='header'>
					<h1>Todos</h1>
					<NewTaskForm />
				</header>
				<section className='main'>
					<TaskList />
					<Footer />
				</section>
			</div>
		</section>
	)
}

export default App
