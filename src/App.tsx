import { useReducer } from 'react'
import { ITodoItem } from './types'
import { reducer } from './assets/reducer'
import TodoList from './components/TodoList'

export type State = {
  newItem?: string,
  todos: ITodoItem[]
}

function App() {

const initialState:State = {
  todos:[],
  newItem: '',
}

const [state, dispatch] = useReducer(reducer, initialState)  

return (
      <TodoList state={state} dispatch={dispatch}/>
  )
}

export default App
