import * as types from './types';

/*
 * action 创建函数
 */

export function addTodo(text) {
    return { type: types.ADD_TODO, text }
}

export function toggleTodo(index) {
    return { type: types.TOGGLE_TODO, index }
}

export function setVisibilityFilter(filter) {
    return { type: types.SET_VISIBILITY_FILTER, filter }
}

