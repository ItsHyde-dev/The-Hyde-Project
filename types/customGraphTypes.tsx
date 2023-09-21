// Variation of Custom Graph Data Structure
export type TaskList = {
  [key: string]: {
    name: string;
    completed: boolean;
    parent: string | null;
    children: string[];
  }
}
