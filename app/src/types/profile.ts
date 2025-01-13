export interface Profile {
  userId: string;
  name: string;
  email: string;
  role: string;
  categories: Category[];
}

export interface Category {
  _id: string;
  name: string;
  color: string;
}
