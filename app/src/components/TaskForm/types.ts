export type TaskStatus = "pending" | "in_progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

export interface Category {
  name: string;
  color: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  date: Date;
  status: TaskStatus;
  priority: TaskPriority;
  category: Category;
}

export interface TaskFormProps {
  mode: "create" | "edit";
  initialData?: Partial<TaskFormData>;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  submitLabel?: string;
}
