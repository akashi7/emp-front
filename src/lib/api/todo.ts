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
  }),
})

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useEditTodoMutation,
  useDeleteTodoMutation,
} = todoEndpoints
