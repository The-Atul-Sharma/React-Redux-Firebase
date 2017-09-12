import React, {Component, PropTypes} from 'react'
import '../components/AddTodo.css'

class AddTodo extends Component {

  render(){
    let input;
    return(
      <div className="form">
        <form onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          this.props.onAddTodo(input.value)
          input.value = ''
        }}>
          <input type="text" maxLength="70" placeholder="Add a task..." ref={node => {
            input = node
          }} />
          <button type="submit">
            +
          </button>
        </form>
      </div>
    )
  }
}

AddTodo.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
}

export default AddTodo;
