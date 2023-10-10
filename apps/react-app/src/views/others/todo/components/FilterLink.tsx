import type { PropsWithChildren } from 'react'
import { useAppSelector, useAppDispatch } from '@/store'

function FilterLink(props: PropsWithChildren<{ filter: string }>) {
  const visibilityFilter = useAppSelector(state => state.todo.visibilityFilter)
  const active = props.filter === visibilityFilter
  const dispatch = useAppDispatch()
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
