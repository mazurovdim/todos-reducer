import { useState } from "react"
import { State } from "../App"
import { Action, ActionTodoType } from "../assets/actions"
import { FilterTypes } from "../types"
import ItemList from "./ItemList"

interface ITodoPorps{
    state:State
    dispatch: React.Dispatch<Action>
}

export default function TodoLst({state, dispatch}:ITodoPorps){

const [filter, setFilter] = useState<FilterTypes>("All")
let filteredItems = state.todos

function handleChangeFilter(value:string){
    switch(value){
      case 'All':{
        return setFilter("All")
      }
      case 'Active':{
        return setFilter("Active")
      }
      case 'Completed':{
        return setFilter("Completed")
      }
    }
  }

function handleComplete(id:number){
    dispatch({type:ActionTodoType.TOGGLEDONEITEM, payload:id})
}

function handleDelete(id:number){
    dispatch({type:ActionTodoType.DELETEITEM, payload:id})
}

if(filter === 'All'){
  filteredItems = state.todos
}

if (filter === 'Completed'){
  filteredItems = state.todos.filter(item => item.done === true)
}

if (filter === 'Active'){
  filteredItems = state.todos.filter(item => item.done === false)
}

return (
    <>
    <h1>text</h1>
      <input type="text" value={state.newItem} onChange={e => {
        dispatch({type:ActionTodoType.ADDNEWITEM, payload:e.target.value})
      }}/>
      <button onClick={() => {
        if(state.newItem){
          dispatch({type:ActionTodoType.ADDITEM, payload:state.newItem})
          dispatch({type:ActionTodoType.ADDNEWITEM, payload:''})
        }
      }}>Add</button>

      <ItemList 
        handleComplete={handleComplete} 
        handleDelete={handleDelete} 
        itemList={filteredItems} 
      />

        <label htmlFor="All">
          <input type="radio" name='filterList' value='All' onChange={(e) => handleChangeFilter(e.target.value)}/>
          All
        </label>

        <label htmlFor="Active">
          <input type="radio" name='filterList' value='Active' onChange={(e) => handleChangeFilter(e.target.value)}/>
          Active
        </label>

        <label htmlFor="Completed">
          <input type="radio" name='filterList' value='Completed' onChange={(e) => handleChangeFilter(e.target.value)}/>
          Completed
        </label>
        </>  
    )
}