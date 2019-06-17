import React from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import loadingComponent from '@/utils/loadable'
// import store from '@/store'
import Link from '@/components/link'
import routes, { NoMatch } from '@/router'
import './App.css'

const ChildRouter = () => (
    <Switch>
        <Redirect exact from="/" to="/index" />
        {routes.map((route, index) => (<Route path={route.path} exact component={loadingComponent(route.component)} key={route.title} />))}
        <Route component={NoMatch} />
    </Switch>
);

class App extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired,
    };

    shouldComponentUpdate() {
        return false
    }

    render () {
        return (
            <Provider store={this.props.store}>
                <Router>
                    <Link routes={routes} />
                    <div id={'main'}>
                        <Route path="/" component={ChildRouter} />
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default App
