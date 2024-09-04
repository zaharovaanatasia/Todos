import './NewTaskForm.css'


const NewTaskForm = () => {
	return (
		<form >
			<input
				type='text'
				className='new-todo'
				placeholder='What needs to be done?'
				required
				autoFocus
			/>
		</form>
	)
}

export default NewTaskForm
