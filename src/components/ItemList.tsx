import { ITodoItem } from "../types";

interface ItemListProps {
  itemList: ITodoItem[];
  handleDelete: (id: number) => void;
  handleComplete: (id: number) => void;
}

export default function ItemList(props: ItemListProps) {
  if (props.itemList) {
    return (
      <>
        {props.itemList.map((item) => (
          <li key={item.id}>
            <input
              type="checkbox"
              checked={item.done}
              onChange={() => {
                props.handleComplete(item.id);
              }}
            />
            {!item.done ? item.title : <s>{item.title}</s>}
            ---
            {item.id}
            <button
              onClick={() => {
                props.handleDelete(item.id);
              }}
            >
              Удалить
            </button>
          </li>
        ))}
      </>
    );
  } else return null;
}
