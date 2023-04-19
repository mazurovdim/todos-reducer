import { Action, ActionTodoType, ITodoItem, State } from "../App"

interface ItemListProps{
    itemList:ITodoItem[] | undefined
    dispatch:React.Dispatch<Action>
}

function list(props:ItemListProps){
    if(props.itemList){
        return(
            props.itemList.map((item) => (
                <li key={item.id}>
                  <input type="checkbox" checked={item.done} onChange={() => {
                    props.dispatch({type:ActionTodoType.TOGGLEDONE, payload:item})
                    props.dispatch({type:ActionTodoType.FILTERTOGGLE, payload:item})
                  }}/>
                  {!item.done? item.title : <s>{item.title}</s>}
                  ---
                  {item.id}
                  <button onClick={() =>{
                    props.dispatch({type:ActionTodoType.DELETEITEM, payload:item})
                  }}>Удалить</button>
                </li>
              ))
        )
    }
}


export default function ItemList(props:ItemListProps){
    return(
        <ul>
        {list(props)}
      </ul>
    )
}