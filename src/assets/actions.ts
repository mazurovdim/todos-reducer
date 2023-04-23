import { ITodoItem } from "../types";

export enum ActionTodoType {
  ADDITEM = "ADDITEM",
  DELETEITEM = "DELETEITEM",
  ADDNEWITEM = "ADDNEXTITEM",
  TOGGLEDONEITEM = "TOGGLEDONEITEM",
}

type ActionAddItem = {
  type: ActionTodoType;
  payload: ITodoItem;
};

type ActionAddNewItem = {
  type: ActionTodoType;
  payload: string;
};

type ActionDeleteItem = {
  type: ActionTodoType;
  payload: number;
};

type ActionToggleItem = {
  type: ActionTodoType;
  payload: number;
};

export type Action =
  | ActionAddItem
  | ActionAddNewItem
  | ActionDeleteItem
  | ActionToggleItem;
