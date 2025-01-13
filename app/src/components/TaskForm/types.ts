import { Profile } from "../../types/profile";

export type TaskStatus = "pending" | "in_progress" | "completed";
export type TaskPriority = "low" | "medium" | "high";

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
  initialData?: Partial<TaskFormData>;
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  submitLabel?: string;
  disabled?: boolean;
  profile?: Profile;
}
