import { useAppDispatch, addTodo } from '@/store'

function AddTodo() {
  let input: any
  const dispatch = useAppDispatch()

  const onSubmit = (e: any) => {
    e.preventDefault()
    if (!input.value.trim()) {
      return
    }
    dispatch(addTodo(input.value))
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
