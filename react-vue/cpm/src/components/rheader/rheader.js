import React from 'react'
import {Avatar,Popover,Modal,Icon} from 'antd'
import storage from 'good-storage'
import './rheader.scss'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import toggleIcon from 'static/images/toggle-icon.svg'
import logoutIcon from 'static/images/logout-icon.svg'
import homeIcon from 'static/images/home-icon.svg'
import {authTimeout} from 'libs/common'
import CONFIG from 'libs/config'
@connect(
    state=>{
        return{
            loginUser:state.userReducer
        }
    }
)
@withRouter
class Rheader extends React.Component{
    constructor(){
        super()
        this.state={
            mouseEnter:false
        }
        this.logout=this.logout.bind(this)
        this.backhome=this.backhome.bind(this)
        this.toggleRole=this.toggleRole.bind(this)
        this.headerMouseEnter=this.headerMouseEnter.bind(this)
        this.headerMouseLeave=this.headerMouseLeave.bind(this)
    }
    //实例化时期
    /**getDefaultProps was defined on Rheader, a plain JavaScript class. 
     * This is only supported for classes created using React.createClass. 
     * Use a static property to define defaultProps instead */
    //getDefaultProps(){}
    //getInitialState(){}
    componentWillMount(){}
    //render(){}
    componentDidMount(){}
    //存在期
    componentWillReceiveProps(){}
    /**shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false */
    //shouldComponentUpdate(){}
    componentWillUpdate(){}
    componentDidUpdate(){}
    //销毁时期
    componentWillUnmount(){}
    /**Cannot update during an existing state transition (such as within `render`). 
     * Render methods should be a pure function of props and state */
    toggleRole(role){
        let originUser=storage.get('loginUser')
        originUser.userRole=role
        storage.set('loginUser',originUser)
        //直接暴力的刷新
        window.location.reload()
    }
    logout(){
        Modal.confirm({
            title: '确定要退出登录吗?',
            content: '退出之后返回官网首页',
            centered:true,
            okText:'确定',
            cancelText:'取消',
            onOk() {
                authTimeout()
            },
            onCancel() {}
        })
    }
    //回到企业文件宝
    backhome(){
        Modal.confirm({
            title: '确定要返回企业网盘吗?',
            content: '返回企业网盘',
            centered:true,
            okText:'确定',
            cancelText:'取消',
            onOk() {
                window.location.href=`${CONFIG.HOST}/enterprise/?pageLayoutType=topNavigation`
            },
            onCancel() {}
        })
    }
    headerMouseEnter(){
        this.setState({mouseEnter:true})
    }
    headerMouseLeave(){
        this.setState({mouseEnter:false})
    }
    render(){
        const {loginUser}=this.props
        let  dmbool,bmbool
        if(loginUser.roleNameList&&loginUser.roleNameList.length>0){
            //是否有部门主管权限
            dmbool= loginUser.roleNameList.some((u)=>{
                return u.roleName==='DEPT_DIRECTOR'
            })
            //是否有企业管理员权限
            bmbool= loginUser.roleNameList.some((u)=>{
                return u.roleName==='ENTERPRISE_MANAGER'
            })
        }
        const currentUser=(
            <div className="cu-pop">
                <div className="avatar-name-title">
                    {loginUser.avatar?<Avatar src={loginUser.avatar}></Avatar>:<span className="avatar"></span>}
                    <div className="name-title">
                        <div className="name">{loginUser.name||'未登录'}</div>
                        <div className="title">当前身份：{loginUser.userRole==='enterprise'?'企业管理员':'部门管理员'}</div>
                    </div>
                </div>
                <div onClick={this.backhome} className="oper cp"><img src={homeIcon} className="mr6" alt=''/>回到企业网盘</div>
                {/**只有一个角色就不现实了 */}
                {dmbool&&bmbool?<div onClick={()=>this.toggleRole(loginUser.userRole==='enterprise'?'department':'enterprise')} className="oper cp">
                    <img src={toggleIcon} className="mr6 vm" alt=''/>切换为{loginUser.userRole==='enterprise'?'部门后台管理':'企业后台管理'}
                </div>:null}
                <div onClick={this.logout} className="oper cp"><img src={logoutIcon} className="mr6" alt=''/>退出登录</div>
            </div>
        )
        return (
            <div>
                <div className="header-container">
                    <div className="company">{loginUser.enterpriseName || '员工管理系统'}</div>
                    <div className="avatar-name cp">
                        <Popover content={currentUser}>
                            {loginUser.avatar?<Avatar src={loginUser.avatar}></Avatar>:<span className="avatar"></span>}
                            <span onMouseEnter={this.headerMouseEnter} onMouseLeave={this.headerMouseLeave} className="name">
                                {loginUser.name||'未登录'}
                                {this.state.mouseEnter?<Icon type="up" className="ml6" />:<Icon type="down" className="ml6" />}
                            </span>
                        </Popover>
                    </div>
                </div>
            </div>
        )
    }
}

export default Rheader