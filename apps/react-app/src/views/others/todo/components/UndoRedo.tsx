import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { useAppSelector, useAppDispatch } from '@/store'
import type { RootState } from '@/store'

const UndoRedo = () => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector(state => state.todo.todos)

  const canUndo = todos.past.length > 0
  const canRedo = todos.future.length > 0
  const onUndo = () => dispatch(UndoActionCreators.undo())
  const onRedo = () => dispatch(UndoActionCreators.redo())

  return (
    <p>
      <button
        className="border-1 border-solid px-1 mt-1 mr-2"
        onClick={onUndo}
        disabled={!canUndo}
      >
        Undo
      </button>
      <button
        className="border-1 border-solid px-1 mt-1"
        onClick={onRedo}
        disabled={!canRedo}
      >
        Redo
      </button>
    </p>
  )
}

export default UndoRedo
