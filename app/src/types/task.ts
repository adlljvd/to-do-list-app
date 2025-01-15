export interface Task {
  id: string;
  title: string;
  description: string;
  time: string;
  date: {
    day: number;
    month: string;
    year: number;
  };
  status: string;
  priority: string;
  category: {
    name: string;
    color: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface RawTaskData {
  title: string;
  description: string;
  dueDate: Date | string; // Mengubah tipe dueDate untuk mendukung string dan Date
  time: string;
  status: string;
  priority: string;
  category: {
    name: string;
    color: string;
  };
}

export type NewTask = Omit<Task, "id" | "createdAt" | "updatedAt">;

export type PendingChangeAdd = {
  type: "ADD";
  task: Omit<RawTaskData, "dueDate"> & { dueDate: string }; // Memastikan dueDate selalu string di pending changes
};

export type PendingChangeUpdate = {
  type: "UPDATE";
  task: Task;
};

export type PendingChangeDelete = {
  type: "DELETE";
  taskId: string;
};

export type PendingChange =
  | PendingChangeAdd
  | PendingChangeUpdate
  | PendingChangeDelete;
