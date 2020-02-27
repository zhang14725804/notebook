//选择角色登录
import React from 'react'
import {Modal,Button,Radio} from 'antd'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {selectRole} from 'store/userReducer'
import {toggleModalState} from 'store/employeeModalReducer'
@connect(
    state=>{
        return{
            loginUser:state.userReducer
        }
    },
    {toggleModalState,selectRole}
)
@withRouter
class CDModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            role:''
        }
        this.handleOk=this.handleOk.bind(this)
        this.handleCancel=this.handleCancel.bind(this)
        this.onChange=this.onChange.bind(this)
    }
    handleOk(){
        this.props.selectRole(this.state.role)
        //部门主管
        this.props.history.push('/manage')
        this.props.toggleModalState('DEFAULT',false)
    }
    onChange(e) {
        this.setState({role:e.target.value==='ENTERPRISE_MANAGER'?'enterprise':'department'})
    }
    handleCancel(){
        window.history.back()
        this.props.toggleModalState('DEFAULT',false)
    }
    componentDidMount(){
        //console.log(this.props)
    }
    render(){
        //dept manage boolean(是否是当前部门部门主管)
        //dept director boolean(是否是当前部门部门管理员)
        //business manage boolean(是否是当前企业管理员)

        let  dmbool,bmbool
        if(this.props.loginUser.roleNameList.length>0){
            dmbool= this.props.loginUser.roleNameList.some((u)=>{
                return u.roleName==='DEPT_DIRECTOR'
            })
            bmbool= this.props.loginUser.roleNameList.some((u)=>{
                return u.roleName==='ENTERPRISE_MANAGER'
            })
        }
        return (
            <Modal
                width={300}
                visible={true}
                title="请选择身份进入" centered
                onCancel={this.handleCancel}
                footer={[
                    <Button key='1'  onClick={this.handleCancel}>取消</Button>,
                    <Button  key='2' type="primary"  onClick={this.handleOk}>确认</Button>,
                ]}
                >
                <Radio.Group onChange={this.onChange}>
                    {this.props.loginUser.roleNameList.length>0?<div>
                        {bmbool?<div style={{padding:'10px'}} ><Radio value={'ENTERPRISE_MANAGER'}>企业后台管理</Radio></div>:null}
                        {dmbool?<div style={{padding:'10px'}} ><Radio value={'DEPT_DIRECTOR'}>部门后台管理</Radio></div>:null}
                    </div>:null}
                </Radio.Group>
            </Modal>
        )
    }
}

export default CDModal