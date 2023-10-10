import { visibleTodos } from '../selectors'
import type { TodoState } from '@/store'
import { useAppSelector, useAppDispatch, toggleTodo } from '@/store'
import Todo from './Todo'

// 跨多组件的共享 Selector（记忆版获取数据方法; Reselect 库可以创建可记忆的(Memoized)、可组合的 selector 函数。）
function TodoList() {
  const todos = useAppSelector(visibleTodos)
  const dispatch = useAppDispatch()

  const onTodoClick = (id: any) => {
    dispatch(toggleTodo(id))
  }

  return (
    <ul>
      {todos?.map((todo: TodoState, index: number) => (
        <Todo key={index} {...todo} onClick={() => onTodoClick(index)} />
      ))}
    </ul>
  )
}

export default TodoList
