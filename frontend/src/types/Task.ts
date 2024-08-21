import { User } from "./User"

export interface Response<T> {
  status: number
  message: string
  data: T
}


export interface TaskProps {
    title: string
    description: string
    dueDate?: string
    priority?: string
    color?: string
    assignees?: string[]
    tags?: Tag[]
    status?: string
}



export interface Task {
    values: any
    _id: string
    title: string
    description: string
    dueDate: string
    priority: string
    author: Partial<User>
    // color: string
    assignees: Assignee[]
    status: string
    createdAt: string
    updatedAt: string
    __v: number
    comments: Comment[]
    tags: Tag[]
  }
  
  export interface Assignee {
    _id: string
    name: string
    email: string
  }
  
  export interface Tag{
    _id: string
    name: string
  }


  export interface Comment {
    _id: string
    content: string
    author: Partial<User>
    createdAt: string
  }
