import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import registerServiceWorker from './registerServiceWorker'
import {BrowserRouter as Router, Switch, Route,} from 'react-router-dom';

import './index.css';
import './static/less/index.less';
import './models/User';
import './constants/global/Config';
import App from './views/main/Main';
import Login from './views/my/login/Login'
import OrderList from './views/my/order/list/OrderList';
import Coupon from "./views/my/coupon/Coupon";
import OrderDetail from './views/my/order/detail/OrderDetail';
import MemberCenter from './views/my/memberCenter';
import PayCenter from './views/paycenter/Paycenter';
import MyAddress from './views/my/addr/MyAddress';
import EditAddress from './views/my/addr/edit/EditAddr';
import Customer from './views/my/customer/Customer';
import Points from './views/my/member/points/MemberPoints';
import ProductList from './views/product/list/ProductList';
import ProductDetail from './views/product/detail/ProductDetail';


import store from "./store/Store";

class IndexApp extends React.Component {
    render() {
        return <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path='/' component={App}/>
                    <Route path='/login' component={Login}/>
                    <Route path='/coupon' component={Coupon}/>
                    <Route path='/memberCenter' component={MemberCenter}/>
                    <Route path='/orderlist' component={OrderList}/>
                    <Route path='/orderdetail' component={OrderDetail}/>
                    <Route path='/paycenter' component={PayCenter}/>
                    <Route path='/myaddress' component={MyAddress}/>
                    <Route path='/editaddr' component={EditAddress}/>
                    <Route path='/customer' component={Customer}/>
                    <Route path='/points' component={Points}/>
                    <Route path='/productlist' component={ProductList}/>
                    <Route path='/productdetail' component={ProductDetail}/>
                </Switch>
            </Router>
        </Provider>
    }
}

ReactDOM.render(<IndexApp/>, document.getElementById('root'));
registerServiceWorker();
