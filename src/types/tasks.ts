
export interface Task extends Record<string, unknown> {
  id: number;
  taskable_id:string,
  taskable_type:string,
  description: string;
  price?: number;
  tasks:[]
}