import { State } from "../App"
import { Action, ActionTodoType } from "./actions"

export function reducer(state:State, action:Action):State {

    const {type, payload} = action

    switch(type){
      case ActionTodoType.ADDNEWITEM: {
            return {...state, newItem:payload}
      }

      case ActionTodoType.ADDITEM: {
          return {...state, todos:[...state.todos, {
                id:+new Date(),
                title:payload,
                done:false
              }]}
      }   

      case ActionTodoType.DELETEITEM: {
          return {...state, todos:state.todos.filter(item => item.id !== payload)}
      }
  
      case ActionTodoType.TOGGLEDONEITEM: {
              return {...state,todos:state.todos.map(item => item.id !== payload? item : {...item, done:!item.done})}
        }
  
      default:return state
    }
  }