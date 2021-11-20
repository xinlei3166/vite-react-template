import { useDispatch } from 'react-redux'

function AddTodo() {
  let input: any
  const dispatch = useDispatch()

  const onSubmit = (e: any) => {
    e.preventDefault()
    if (!input.value.trim()) {
      return
    }
    dispatch({ type: 'todos/addTodo', payload: input.value })
    input.value = ''
  }

  return (
    <div style={{ color: 'black' }}>
      <form onSubmit={onSubmit}>
        <input
          ref={node => {
            input = node
          }}
        />
        <button className="border-1 border-solid px-1 ml-2" type="submit">
          Add Todo
        </button>
      </form>
    </div>
  )
}

export default AddTodo
