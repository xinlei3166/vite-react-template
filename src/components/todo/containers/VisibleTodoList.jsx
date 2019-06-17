import {connect} from 'react-redux'
import {toggleTodo} from '@/store/actions'
import TodoList from '../components/TodoList'
import {makeGetVisibleTodos} from '../selectors'

// 无记忆版
// const getVisibleTodos = (todos, filter) => {
//     // eslint-disable-next-line default-case
//     switch (filter) {
//         case 'SHOW_ALL':
//             return todos;
//         case 'SHOW_COMPLETED':
//             return todos.filter(t => t.completed);
//         case 'SHOW_ACTIVE':
//             return todos.filter(t => !t.completed)
//     }
// };
//
// const mapStateToProps = state => {
//     return {
//         todos: getVisibleTodos(state.todos, state.visibilityFilter)
//     }
// };

// 跨多组件的共享 Selector（记忆版获取数据方法; Reselect 库可以创建可记忆的(Memoized)、可组合的 selector 函数。）
const makeMapStateToProps = () => {
    const getVisibleTodos = makeGetVisibleTodos();
    return (state) => {  // mapStateToProps
        return {
            todos: getVisibleTodos(state)
        }
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onTodoClick: id => {
            dispatch(toggleTodo(id))
        }
    }
};

const VisibleTodoList = connect(
    makeMapStateToProps,
    mapDispatchToProps
)(TodoList);

export default VisibleTodoList
