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
  ADDNEWITEM = "ADDNEWITEM",
  TOGGLEDONE = "TOGGLEDONE",
  FILTERTOGGLE = "FILTERTOGGLE"
}

type ActionNewItemType = {
  type: ActionTodoType
  payload: ITodoItem
}

type ActionAddItem = {
  type: ActionTodoType
  payload: string
}

export type Action = ActionNewItemType | ActionAddItem

export type State = {
  newItem?: string
  todos: ITodoItem[],
  filteredTodos:{
    active:ITodoItem[],
    completed:ITodoItem[]
  }
}

function reducer(state:State, action:Action):State {
  const { type, payload } = action
  
  switch(action.type){
    case ActionTodoType.ADDNEWITEM: {
        if (typeof action.payload === 'string'){
            return {...state, newItem:payload}
        }

    }
    case ActionTodoType.ADDITEM: {
      if(typeof payload === 'string'){
        return {...state, todos:[...state.todos, {
              id:state.todos.length + 1,
              title:payload,
              done:false
            }],
            filteredTodos:{...state.filteredTodos, active:[...state.filteredTodos.active,{
              id:state.todos.length + 1,
              title:payload,
              done:false
            }]}
          }
      }
  }
    case ActionTodoType.DELETEITEM: {
      if (typeof payload === 'object'){
        return {
          ...state, 
          todos:state.todos.filter(item => item !== payload),
          filteredTodos:{
            active:state.filteredTodos.active.filter(item => item !== payload),
            completed:state.filteredTodos.completed.filter(item => item !== payload)
            }
        }
      }  
    }

    case ActionTodoType.TOGGLEDONE: {
      if (typeof payload === 'object'){
            return {
              ...state,
              todos:state.todos.map(item => item !== payload? item : {...item, done:!payload.done},
              )}
        }
      }
    case ActionTodoType.FILTERTOGGLE: {
      if (typeof payload === 'object'){
        return {
          ...state, 
          filteredTodos:{
            active: state.todos.filter(item => item.done === false),
            completed: state.todos.filter(item => item.done === true)}
        }
      }
    }    
    default:return state
  }
}

function App() {

const initialState:State = {
  todos:[],
  newItem: '',
  filteredTodos:{
    active:[],
    completed:[]
  }
  }

const [state, dispatch] = useReducer(reducer, initialState)  

  return (
    <>
      <h1>text</h1>
      <input type="text" value={state.newItem}
      onChange={e => {
        dispatch({type:ActionTodoType.ADDNEWITEM, payload:e.target.value})
      }}/>
      <button onClick={() => {
        if(state.newItem){
          dispatch({type:ActionTodoType.ADDITEM, payload:state.newItem})
          dispatch({type:ActionTodoType.ADDNEWITEM, payload:''})
        }
      }}>Add</button>

      <ItemList dispatch={dispatch} itemList={state.todos}/>

      <h2>ACTIVE</h2>
      <ul>
        {
          state.filteredTodos.active.map((item, i) => (
            <li key={i}>{item.title}</li>
          ))
        }
      </ul>
      <h2>COMPLITED</h2>
      <ul>
        {
          state.filteredTodos.completed.map((item, i) => (
            <li key={i}>{item.title}</li>
          ))
        }
      </ul>
        <label htmlFor="All">
          <input type="radio" name='filterList' value='All'  />
          All
        </label>

        <label htmlFor="Active">
          <input type="radio" name='filterList' value='Active' />
          Active
        </label>

        <label htmlFor="Completed">
          <input type="radio" name='filterList' value='Completed' />
          Completed
        </label>
          
    </>
  )
}

export default App
