import Footer from './components/Footer'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import UndoRedo from './components/UndoRedo'

export default function Todo() {
  return (
    <div>
      <AddTodo />
      <TodoList />
      <Footer />
      <UndoRedo />
    </div>
  )
}
