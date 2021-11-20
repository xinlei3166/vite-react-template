import { useSelector, useDispatch } from 'react-redux'
import { PropsWithChildren } from 'react'
import { RootState } from '@/store'

function FilterLink(props: PropsWithChildren<{ filter: string }>) {
  const visibilityFilter = useSelector(
    (state: RootState) => state.todo.visibilityFilter
  )
  const active = props.filter === visibilityFilter
  const dispatch = useDispatch()
  const onClick = () => {
    dispatch({
      type: 'visibilityFilter/setVisibilityFilter',
      payload: props.filter
    })
  }

  if (active) {
    return <span className="text-primary">{props.children}</span>
  }

  return (
    <a
      href=""
      onClick={e => {
        e.preventDefault()
        onClick()
      }}
    >
      {props.children}
    </a>
  )
}

export default FilterLink
