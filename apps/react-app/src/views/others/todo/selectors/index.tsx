import { createSelector } from 'reselect'
import type { RootState, TodoState } from '@/store'

const getTodos = (state: RootState) => {
  return state.todo.todos.present
}
const getVisibilityFilter = (state: RootState) => state.todo.visibilityFilter

export const visibleTodos = createSelector(
  [getTodos, getVisibilityFilter],
  (todos, visibilityFilter) => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return todos
      case 'SHOW_COMPLETED':
        return todos.filter((t: TodoState) => t.completed)
      case 'SHOW_ACTIVE':
        return todos.filter((t: TodoState) => !t.completed)
    }
  }
)
