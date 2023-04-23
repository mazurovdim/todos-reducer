export interface ITodoItem {
  id: number;
  title: string;
  done: boolean;
}

export type FilterTypes = "Active" | "All" | "Completed";
