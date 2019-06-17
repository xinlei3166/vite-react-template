import { createSelector } from 'reselect'

const getTodos = (state) => state.todos.present;
const getVisibilityFilter = (state) => state.visibilityFilter;

export const makeGetVisibleTodos = () => {
    return createSelector(
        [ getTodos, getVisibilityFilter ],
        (todos, visibilityFilter) => {
            // eslint-disable-next-line default-case
            switch (visibilityFilter) {
                case 'SHOW_ALL':
                    return todos;
                case 'SHOW_COMPLETED':
                    return todos.filter(t => t.completed);
                case 'SHOW_ACTIVE':
                    return todos.filter(t => !t.completed)
            }
        }
    )
};
