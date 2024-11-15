import { ScrollNumberState } from 'antd/es/badge/ScrollNumber'
import { baseAPI } from './api'

export interface Todo {
  id: number
  todo: string
  completed: boolean
  userId: number
}

export interface TodoResp {
  todos: Todo[]
  limit: number
  skip: number
  total: number
}

interface AddTodoDTO {
  text: string
  completed: boolean
}

interface EditTodoDTO {
  id: number
  completed: boolean
}

interface DeleteTodoDTO {
  id: number
}

export interface Select {
  title: string
  reactions: string
  userId: number
}

interface params {
  limit?: number
  skip?: number
  select?: string
}

export interface respObj {
  id: number
  title: string
  reactions: {
    likes: number
    dislikes: number
  }
  userId: number
}
interface paginatedResponse {
  posts: Array<respObj>
  total: number
  skip: number
  limit: ScrollNumberState
}
const todoEndpoints = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    getTodos: builder.query<TodoResp, void>({
      providesTags: ['GetTodos'],
      query: () => ({
        url: `todos`,
        method: 'GET',
      }),
    }),
    addTodo: builder.mutation<Todo, AddTodoDTO>({
      invalidatesTags: ['GetTodos'],
      query: (DTO) => ({
        url: 'todos/add',
        method: 'POST',
        body: DTO,
      }),
    }),
    editTodo: builder.mutation<Todo, EditTodoDTO>({
      invalidatesTags: ['GetTodos'],
      query: ({ id, completed }) => ({
        url: `todos/${id}`,
        method: 'PUT',
        body: { completed },
      }),
    }),
    deleteTodo: builder.mutation<void, DeleteTodoDTO>({
      invalidatesTags: ['GetTodos'],
      query: (DTO) => ({
        url: `todos/${DTO.id}`,
        method: 'DELETE',
      }),
    }),

    getPaginatedTasks: builder.query<paginatedResponse, params>({
      providesTags: ['GetTodos'],
      query: ({ limit, skip, select }) => ({
        url: `posts?limit=${limit || 10}&skip=${skip || 10}&select=${
          select || {}
        }`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
  useGetTodosQuery,
  useGetPaginatedTasksQuery,
} = todoEndpoints
