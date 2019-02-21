//个人信息
import React from 'react'
import {Card,Avatar,Icon} from 'antd'
import './personal.scss'
import {getAvatar} from 'libs/common'
import {connect} from 'react-redux'
import {toggleModalState} from 'store/employeeModalReducer'
import {togglePersonal} from 'store/staffReducer'
@connect(
    state=>{
        return{
            activePerson:state.staffReducer.activePerson,
        }
    },
    {togglePersonal,toggleModalState}
)
class Personal extends React.Component{
    constructor(props){
        super(props)
        this.handleClose=this.handleClose.bind(this)
    }
    handleClose(){
        //清空activePerson
        this.props.togglePersonal(false)
        this.props.toggleModalState('DEFAULT',false)
    }
    render(){
        //返回所在部门
        const userRoleInfos=[...this.props.activePerson.userRoleInfos]
        const departments=[...this.props.activePerson.departments]
        const deptWithRole=Object.assign(departments,userRoleInfos)
        const belongDept=deptWithRole.map((d,i)=>{
            return d.roleName?(d.roleName!=='ENTERPRISE_MANAGER'?<li key={i}><span>{d.deptName}</span><span>{d.roleName==='DEPT_DIRECTOR'?'部门主管':'部门管理员'}</span></li>:null):
            (<li key={i}><span>{d.name}</span><span>员工</span></li>)
            
        })
        return(
            <div>
                <div className="ant-modal-mask"></div>
                <div className="ant-modal-wrap">
                    <div className="card-wrapper">
                        <div  className="close-wrapper cp" onClick={this.handleClose}>
                            <Icon type="close-circle" style={{color:'#ffffff',fontSize:'24px'}} size="large" />
                        </div>
                        <Card bodyStyle={{maxHeight:'500px',overflow:'auto'}} headStyle={{textAlign:'center',background:'#EDEFF1'}} title="个人信息" style={{ width: 400 }}>
                            <ul className="personal-card">
                                <li>
                                    <span>头像</span><Avatar src={getAvatar(this.props.activePerson.cloudUserId)}></Avatar>
                                </li>
                                <li>
                                    <span>姓名</span><span>{this.props.activePerson.name}</span>
                                </li>
                                <li>
                                    <span>性别</span><span>{this.props.activePerson.gender}</span>
                                </li>
                                <li>
                                    <span>手机号</span><span>{this.props.activePerson.mobile || '未绑定'}</span>
                                </li>
                                <li>
                                    <span>邮箱</span><span>{this.props.activePerson.email || '未绑定'}</span>
                                </li>
                                {departments && departments.length>0?<li style={{color:'#999',marginTop:'10px'}}><span>所在部门</span><span></span></li>:null}
                                {belongDept}
                                {/* {this.props.activePerson.userRoleInfos.length>0?this.props.activePerson.userRoleInfos.map((d,i)=>{
                                    return d.roleName==='ENTERPRISE_MANAGER'?null:<li key={i}><span>{d.deptName}</span><span>{d.roleName==='DEPT_DIRECTOR'?'部门主管':'员工'}</span></li>
                                }):null} */}
                            </ul>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default Personal