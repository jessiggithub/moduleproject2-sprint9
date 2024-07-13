import React from 'react'
import axios from 'axios'
import Form from './Form'
import TodoList from './TodoList'

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
 state = {
 todos: [],
 error: '',
 todoNameInput: '',
 displayCompleted: true,

}
onTodoNameInputChange = (event) => {
  const { value } = event.target
  this.setState({ ...this.state, todoNameInput: value })
}

resetForm = () => this.setState({ ...this.state, todoNameInput: '' })
setAxiosResponseError = error => this.setState({ ...this.state, error: error.response.data.message })
postNewTodo = () => {
  axios.post(URL, { name: this.state.todoNameInput })
  .then(response => {
    this.fetchAllTodos({ ...this.state, todos: this.state.todos.concat(response.data.data) })
    this.resetForm()
  })
  .catch(this.setAxiosResponseError)
}
onTodoFormSubmit = event => {
  event.preventDefault()
  this.postNewTodo()
}
fetchAllTodos = () => {
  axios.get(URL)
  .then(response => {
    this.setState({ ...this.state, todos: response.data.data })
  })
  .catch(this.setAxiosResponseError)
}
toggleCompleted = id => event => {
 axios.patch(`${URL}/${id}`) 
 .then(response => {
   this.setState({
     ...this.state,
     todos: this.state.todos.map(todo => {
       if (todo.id === id) {
         return { ...todo, completed: !todo.completed }
       }
       return todo
     })
   
 })
})
 .catch(this.setAxiosResponseError)
}
toggleDisplayCompleted = () => {
  this.setState({ ...this.state, displayCompleted: !this.state.displayCompleted })

}
componentDidMount() {
  this.fetchAllTodos()
}
  render() {
    return (
      <div>
        <div id="error">Error: {this.state.error}</div>
        <TodoList
        todos={this.state.todos}
        displayCompleted={this.state.displayCompleted}
        toggleCompleted={this.toggleCompleted}
        
       />
        <Form
        onTodoFormSubmit={this.onTodoFormSubmit}
        todoNameInput={this.state.todoNameInput}
        onTodoNameInputChange={this.onTodoNameInputChange}
        toggleDisplayCompleted={this.toggleDisplayCompleted}
        displayCompleted={this.state.displayCompleted}

        />
      </div>
    )
  }
  }

