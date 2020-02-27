import React from 'react'
import Rheader from 'components/rheader/rheader'
import './manage.scss'
import {connect} from 'react-redux'
import {Route,Switch} from 'react-router-dom'
import Loadable from 'react-loadable';
import {fetchUserData} from 'store/userReducer'
import {toggleModalState} from 'store/employeeModalReducer'
import Menubar from 'components/menubar/menubar'

const Personal = Loadable({loader: () => import('components/personal/personal'),loading() {return null}})
const Employee = Loadable({loader: () => import('container/employee/employee'),loading() {return null}})
const Employeeall = Loadable({loader: () => import('container/employeeall/employee'),loading() {return null}})
const DEmployeeall = Loadable({loader: () => import('container/demployee/employee'),loading() {return null}})
const Capacity = Loadable({loader: () => import('container/capacity/capacity'),loading() {return null}})
//引入多个reducer
@connect(
    state=>{
        return{
            loginUser:state.userReducer,
            employeeModalState:state.employeeModalReducer,
            ...state.deptReducer
        }
    },
    {fetchUserData,toggleModalState}
)
class Manage extends React.Component{
    constructor(){
        super()
        this.state={
            getRoleState:true
        }
    }
    componentWillMount(){
        
    }
    componentDidMount(){
        this.props.fetchUserData()
        //设置title
        document.title=this.props.loginUser.enterpriseName!==''?this.props.loginUser.enterpriseName:''
    }
    render(){
        const {match}=this.props
        return (
            <div className="page-container">
                <Rheader/>
                <div className="container-wrapper">
                    <div className="menu-wrapper">
                        <Menubar/>
                    </div>
                    <div className="data-wrapper">
                        <Switch>
                            <Route path={`${match.path}/`} exact component={this.props.loginUser.userRole==='enterprise'?Employee:DEmployeeall} />
                            <Route path={`${match.path}/eall`}   component={Employeeall} />
                            <Route path={`${match.path}/capacity`}   component={Capacity}></Route>
                        </Switch>
                    </div>
                </div>
                {/* 展示员工详情 */}
                {this.props.activePerson?<Personal/>:null}
            </div>
        )
    }
}

export default Manage