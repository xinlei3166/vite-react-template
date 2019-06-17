import React from 'react'
import Footer from './components/Footer'
import AddTodo from './containers/AddTodo'
import VisibleTodoList from './containers/VisibleTodoList'
import UndoRedo from './containers/UndoRedo'
// eslint-disable-next-line no-unused-vars
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from '@/store'

const App = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
        <UndoRedo/>
    </div>
);

// render(
//     <Provider store={store}>
//         <App />
//     </Provider>,
//     document.getElementById('root')
// );

export default function Todo() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

