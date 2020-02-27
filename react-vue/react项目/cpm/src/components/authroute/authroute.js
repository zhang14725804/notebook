//判断是否已经登录
import React from 'react'
import {connect} from 'react-redux'
import {fetchUserData,selectRole} from 'store/userReducer'
import {withRouter} from 'react-router-dom'
import storage from 'good-storage'
import Rheader from 'components/rheader/rheader'
import {toggleModalState} from 'store/employeeModalReducer'
import SRModal from 'components/modals/srmodal'
@connect(
    state=>{
        return{
            loginUser:state.userReducer,
            employeeModalState:state.employeeModalReducer
        }
    },
    {fetchUserData,selectRole,toggleModalState}
)
@withRouter
class Authroute extends React.Component{
    constructor(){
        super()
        this.state={
            roleState:'',
            setRoleBool:true
        }
    }
    componentWillMount(){
        //现在这么写，以后要动态获取
        //storage.set('token','FilePro/64629F739FB0AB810023B80DD162B7F6F8AF4200119ED5B7AB8D199B')
        if(this.props.loginUser.alias===''){
            this.props.fetchUserData()
        }
        if(this.props.loginUser.userRole!==''){
            this.props.history.push('/manage')
        }
    }
    componentDidUpdate(){}
    componentWillReceiveProps(nextProps){
        const tp=this.props
        const np=nextProps
        //查看location
        //console.log(tp.location) 
        // console.log(tp.loginUser) 
        // console.log(np.loginUser) 
        if(tp.loginUser.userRole==='' && np.loginUser.userRole==='' && this.state.setRoleBool){
            this.setState({setRoleBool:false})

            if(np.loginUser.roleNameList.length>1){
                //所角色的情况
                tp.toggleModalState('SELECT_ROLE',true)
            }else{
                //只有一个角色
                let rolename=np.loginUser.roleNameList[0].roleName
                let role=rolename==='ENTERPRISE_MANAGER'?'enterprise':'department'
                //为了隐藏heaher
                this.setState({roleState:role})
                tp.selectRole(role)
            }
        }else if(tp.loginUser.userRole==='' && np.loginUser.userRole!==''){
            if(np.loginUser.userRole!==''){
                //部门主管
                np.history.push('/manage')
            }
            //为了隐藏heaher
            this.setState({roleState:np.loginUser.userRole})
        }
    }
    render(){
        return <div>
            {/* 选择角色登录(选择角色的时候光秃秃的不好看，加个头先)*/}
            {this.state.roleState===''?<Rheader/>:null}
            {this.props.employeeModalState.selectRoleModalVisible?<SRModal/>:null}
        </div>
    }
}

export default Authroute