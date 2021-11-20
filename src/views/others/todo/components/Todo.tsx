import { PropsWithChildren, HTMLAttributes } from 'react'
import PropTypes from 'prop-types'

const Todo = ({
  onClick,
  completed,
  text
}: PropsWithChildren<
  HTMLAttributes<HTMLElement> & { completed: boolean; text: string }
>) => (
  <li
    className="cursor-pointer"
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    * {text}
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
