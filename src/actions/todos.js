import {firebaseDb} from '../firebase/'
const ref = firebaseDb.ref('todos');

// Subscribe
function loadTodos() {
  return dispatch => {
    ref.off()
    ref.on('value',
      (snapshot) => {dispatch(loadTodosSuccess(snapshot))},
      (error) => {dispatch(loadTodosError(error))}
    )
  }
}

function loadTodosSuccess(snapshot){
  return {
    type: 'TODOS_RECEIVE_DATA',
    data: snapshot.val()
  }
}

function loadTodosError(error){
  return {
    type: 'TODOS_RECIVE_ERROR',
    message: error.message
  }
}

// CREATE_TASK
function addTodo(text){
  return dispatch => {
    ref.push({
      text: text,
      completed: false,
    })
    .catch(error => dispatch({
      type: 'ADD_TASK_ERROR',
      message: error.message,
    }));
  }
}

// UPDATE_TASK
function updateTodo(key){
  return (dispatch, getState) => {
    let state = getState()
    let todo = state.todos.filter(todo => todo.key === key)

    firebaseDb.ref(`todos/${key}`).update({completed: !todo[0].completed})
    .catch(error => dispatch({
      type: 'UPDATE_TASK_ERROR',
      message: error.message,
    }));
  }
}

// DELETE_TASK
function deleteTodo(key){
  return dispatch => {
    firebaseDb.ref(`todos/${key}`).remove()
    .catch(error => dispatch({
      type: 'DELETE_TASK_ERROR',
      message: error.message,
    }));
  }
}

// function loginUserSuccess(dispatch, user) {
//   dispatch({
//     type: LOGIN_USER_SUCCESS,
//     payload: user
//   });
// }

// function loginUser(email, password) {
//   return (dispatch) => {
//     dispatch({ type: LOGIN_USER });
//     return firebaseDb.auth().signInWithEmailAndPassword(email, password)
//       .then(user => loginUserSuccess(dispatch, user))
//       .catch(() => {
//         console.log('failed to sign in');
//         return;
//       });
//   };
// }

module.exports = {
  loadTodos,
  addTodo,
  updateTodo,
  deleteTodo,
}
