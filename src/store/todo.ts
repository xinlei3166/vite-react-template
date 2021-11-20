import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import undoable from 'redux-undo'

export interface TodoState {
  text: string
  completed: boolean
}

const initialState: TodoState[] = []

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo(state: TodoState[], action: PayloadAction<string>) {
      return [...state, { text: action.payload, completed: false }]
    },
    toggleTodo(state: TodoState[], action: PayloadAction<number>) {
      return state.map((todo, index) => {
        if (index === action.payload) {
          return { ...todo, completed: !todo.completed }
        }
        return todo
      })
    }
  }
})

export type visibilityFilterState =
  | 'SHOW_ALL'
  | 'SHOW_COMPLETED'
  | 'SHOW_ACTIVE'

const visibilityFilterSlice = createSlice({
  name: 'visibilityFilter',
  initialState: 'SHOW_ALL',
  reducers: {
    setVisibilityFilter(
      state: any,
      action: PayloadAction<visibilityFilterState>
    ) {
      return action.payload
    }
  }
})

export const { addTodo, toggleTodo } = todoSlice.actions

export const { setVisibilityFilter } = visibilityFilterSlice.actions

const reducer = combineReducers({
  visibilityFilter: visibilityFilterSlice.reducer,
  todos: undoable(todoSlice.reducer)
})

export default reducer
