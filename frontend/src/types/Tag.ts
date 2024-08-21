import { Task } from "./Task"

export interface Tag {
    _id: string
    name: string
    tasks: Task[]
    createdAt: string
    updatedAt: string
    __v: number
  }