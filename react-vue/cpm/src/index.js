import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,HashRouter,Route,Switch} from 'react-router-dom'
import Loadable from 'react-loadable'
import 'static/css/common.scss';
/**redux相关引用 */
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import reducer from 'store/reducer'
import * as serviceWorker from './serviceWorker';
//import Manage from 'container/manage/manage'
import Authroute from 'components/authroute/authroute'
const Manage = Loadable({loader: () => import('container/manage/manage'),loading() {return null}})
const store=createStore(reducer,applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        <HashRouter>
            <div>
                <Authroute/>
                <Switch>
                    <Route path="/manage"  component={Manage}></Route>
                </Switch>
            </div>
        </HashRouter>
    </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
