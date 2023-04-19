import { useReducer, useState } from 'react'
import ItemList from './components/ItemList'

export interface ITodoItem{
      id?:number
      title: string
      done: boolean
}

export enum ActionTodoType{
  ADDITEM = "ADDITEM",
  DELETEITEM = "DELETEITEM",
  ADDNEXTITEM = "ADDNEXTITEM",
  TOGGLEDONE = "TOGGLEDONE"
}

type ActionItem = {
  type: ActionTodoType
  payload: ITodoItem
}

type ActionAddItem = {
  type: ActionTodoType
  payload: string
}

export type Action = ActionItem | ActionAddItem 

export type State = {
  newItem?: string,
  todos: ITodoItem[]
}

function reducer(state:State, action:Action):State {
  const {type, payload} = action
  switch(type){
    case ActionTodoType.ADDNEXTITEM: {
      if (typeof payload === 'string'){
          return {...state, newItem:payload}
      }
    }
    case ActionTodoType.ADDITEM: {
      if(typeof payload === 'string'){
        return {...state, todos:[...state.todos, {
              id:state.todos.length + 1,
              title:payload,
              done:false
            }]}
      }
  }
    case ActionTodoType.DELETEITEM: {
      if (typeof payload === 'object'){
        return {...state, todos:state.todos.filter(item => item !== payload)}
      }  
    }

    case ActionTodoType.TOGGLEDONE: {
      if (typeof payload === 'object'){
            return {...state,todos:state.todos.map(item => item !== payload? item : {...item, done:!payload.done})}
        }
      }

    default:return state
  }
}

function App() {

const initialState:State = {
  todos:[],
  newItem: '',
  }

const [state, dispatch] = useReducer(reducer, initialState)  



  function showItems(filter:string){
    switch(filter){
      case 'All':{
        setFilteredItems([...state.todos])
        break;
      }
      case 'Active':{
        setFilteredItems(state.todos.filter(item => item.done === false))
        break;
      }
      case 'Completed':{
        setFilteredItems(state.todos.filter(item => item.done === true))
        break;
      }
    }
  }

const [filteredItems, setFilteredItems] = useState(state.todos)
  return (
    <>
      <h1>text</h1>
      <input type="text" value={state.newItem} onChange={e => {
        dispatch({type:ActionTodoType.ADDNEXTITEM, payload:e.target.value})
      }}/>
      <button onClick={() => {
        if(state.newItem){
          dispatch({type:ActionTodoType.ADDITEM, payload:state.newItem})
          dispatch({type:ActionTodoType.ADDNEXTITEM, payload:''})
        }
      }}>Add</button>

      <ItemList dispatch={dispatch} itemList={filteredItems}/>

        <label htmlFor="All">
          <input type="radio" name='filterList' value='All' onChange={(e) => showItems(e.target.value)}/>
          All
        </label>

        <label htmlFor="Active">
          <input type="radio" name='filterList' value='Active' onChange={(e) => showItems(e.target.value)}/>
          Active
        </label>

        <label htmlFor="Completed">
          <input type="radio" name='filterList' value='Completed' onChange={(e) => showItems(e.target.value)}/>
          Completed
        </label>
          
    </>
  )
}

export default App
