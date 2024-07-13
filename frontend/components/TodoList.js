import React from 'react'
import Todo from './Todo'

export default class TodoList extends React.Component {
  render() {
    return (
      <div id='todos'>
        <h2>Todos:</h2>
        {
          this.props.todos.reduce((acc, todo) => {
            if (this.props.displayCompleted || !todo.completed) 
              return acc.concat(
               <Todo
                toggleCompleted={this.props.toggleCompleted}
                todo={todo}
                key={todo.id}
               />
              )
              return acc
          },[])
         }
         </div>
    )
  }
}