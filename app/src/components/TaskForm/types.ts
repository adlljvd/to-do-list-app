export type TaskStatus = "pending" | "in_progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";
export type AMPM = "AM" | "PM";

export interface Category {
  name: string;
  color?: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  dueDate: Date;
  time: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: string;
}

export interface TaskFormProps {
  mode: "create" | "edit";
  initialData?: TaskFormData;
  onSubmit: (data: TaskFormData) => void;
  disabled?: boolean;
  profile?: any;
  onCancel?: () => void;
  submitLabel?: string;
  onAddCategory?: (category: Category) => void;
}
