import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from "react-redux";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import createBrowserHistory from 'history/createBrowserHistory';
import App from './App';
import Invite from './components/Invite';
import registerServiceWorker from './registerServiceWorker';
import thunk from "redux-thunk";
import {createStore, applyMiddleware, compose} from "redux";
import reducers from "./reducers";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const history = createBrowserHistory();

const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk)
));


ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider>
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path="/:id" component={App}/>
                    <Route exact path="/:projectId/:invitationEmail" component={Invite}/>
                    {/*<Route exact path="/invite" component={Invite}/>*/}
                    <Redirect to="/" />
                    {/*<Route component={App}/>*/}
                </Switch>
            </Router>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
