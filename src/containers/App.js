import React, {Component} from 'react'
import { connect } from 'react-redux'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import '../containers/App.css';

import {
  loadTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from '../actions'

function Header() {
    return ( 
      <div className="header">
        <h2> To Do </h2> 
      </div>
    )
}

class App extends Component {

  constructor(){
    super();
    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
  }

  componentDidMount(){
    const {dispatch} = this.props;
    dispatch(loadTodos());
  }

  render(){
    const {todos} = this.props;
    return (
      <div className="app">
        <div className="fixed-header">
          <Header />
          <AddTodo onAddTodo={this.addTodo} />
        </div>
        <TodoList
          todos={todos}
          onDeleteClick={this.deleteTodo}
          onTodoClick={this.toggleTodo} />
      </div>
    ) 
  }

  addTodo(text){
    const {dispatch} = this.props;
    dispatch(addTodo(text))
  }

  deleteTodo(key){
    const {dispatch} = this.props;
    dispatch(deleteTodo(key))
  }

  toggleTodo(key){
    const {dispatch} = this.props;
    dispatch(updateTodo(key))
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos ? state.todos : []
  };
}

export default connect(
  mapStateToProps,
)(App);
