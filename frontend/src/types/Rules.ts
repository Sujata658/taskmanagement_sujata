export interface Rule {
    _id: string
    author: string
    rules: Category
  }

  export interface Category {
    [key: string]: string[];
    "ToDo": string[]
    "InProgress": string[]
    "Completed": string[]
  }
  