import {
    ADD_TODO,
    TOGGLE_TODO,
    SET_VISIBILITY_FILTER,
    VisibilityFilters
} from '@/store/actions/types';

import { combineReducers } from 'redux';
import undoable, { distinctState } from 'redux-undo'
const { SHOW_ALL } = VisibilityFilters;

function todos(state = [], action) {
    switch (action.type) {
        case ADD_TODO:
            return [...state, {text: action.text, completed: false}];
        case TOGGLE_TODO:
            return state.map((todo, index) => {
                if (index === action.index) {
                    return {...todo, completed: !todo.completed}
                }
                return todo
            });
        default:
            return state
    }
}

const undoableTodos = undoable(todos, {
    filter: distinctState()
});

function visibilityFilter(state = SHOW_ALL, action) {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state
    }
}

const todoApp = combineReducers({
    visibilityFilter,
    todos: undoableTodos
});

// export const todos = createReducer([], {
//     [ActionTypes.ADD_TODO](state, action) {
//         let text = action.text.trim();
//         return [...state, text];
//     }
// });
//
// function createReducer(initialState, handlers) {
//     return function reducer(state = initialState, action) {
//         if (handlers.hasOwnProperty(action.type)) {
//             return handlers[action.type](state, action);
//         } else {
//             return state;
//         }
//     }
// }

export default todoApp;
