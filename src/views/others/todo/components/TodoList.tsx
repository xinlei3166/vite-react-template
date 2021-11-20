import { useSelector, useDispatch } from 'react-redux'
import { visibleTodos } from '../selectors'
import { TodoState } from '@/store'
import Todo from './Todo'

// 跨多组件的共享 Selector（记忆版获取数据方法; Reselect 库可以创建可记忆的(Memoized)、可组合的 selector 函数。）
function TodoList() {
  const todos = useSelector(visibleTodos)
  const dispatch = useDispatch()

  const onTodoClick = (id: any) => {
    dispatch({ type: 'todos/toggleTodo', payload: id })
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
