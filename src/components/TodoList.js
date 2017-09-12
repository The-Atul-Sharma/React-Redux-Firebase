import React, {Component, PropTypes} from 'react'
import Todo from './Todo'
import '../components/TodoList.css'

class TodoList extends Component{
  render(){
    const {todos, onDeleteClick, onTodoClick} = this.props;
    let list = []
    todos.map(todo => {
      list.push(
        <div>
          <Todo
            key={todo.key}
            text={todo.text}
            completed={todo.completed}
            onClick={() => onTodoClick(todo.key)}
          />
          <button
            className="close"
            onClick={() => onDeleteClick(todo.key)}>
            &times;
          </button>
        </div>
      )
    });
    return(
      <ul className="list list-group">
        {list}
      </ul>
    )
  }
}

TodoList.propTypes = {
  onDeleteClick: PropTypes.func.isRequired,
  onTodoClick: PropTypes.func.isRequired,
}

export default TodoList;
