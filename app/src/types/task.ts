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
