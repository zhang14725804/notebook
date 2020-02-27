//修改部门名称
import React from 'react'
import {Modal,Button,Input,message} from 'antd'
import {connect} from 'react-redux'
import http from 'libs/http'
import {toggleModalState} from 'store/employeeModalReducer'
import {getDeptList,setCurrentDept} from 'store/deptReducer'
import {getStaffList} from 'store/staffReducer'
@connect(
    state=>{
        return{
            loginUser:state.userReducer,
            deptList:state.deptReducer.deptList,
            currentDept:state.deptReducer.currentDept,
        }
    },
    {toggleModalState,getDeptList,setCurrentDept,getStaffList}
)
class CDModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            deptname:this.props.currentDept.name
        }
        this.handleOk=this.handleOk.bind(this)
        this.handleCancel=this.handleCancel.bind(this)
        this.updateDeptName=this.updateDeptName.bind(this)
    }
    handleOk(){
        //判空
        if(this.state.deptname.trim().length>0){
            this.updateDeptName()
        }else{
            message.error('部门名称不能为空')
        }
    }
    updateDeptName(){
        http.post('enterprise/depts/updateDeptName',{deptId:this.props.currentDept.departmentId,deptName:this.state.deptname}).then(res=>{
            if(res && res.status===200){
                Modal.success({
                    title: '系统提示',
                    centered:true,
                    content: '修改成功!',
                })
                this.props.toggleModalState('DEFAULT',false)
                this.props.getDeptList({type:this.props.loginUser.userRole})
                //更新部门之后更新名称
                this.props.currentDept.name=this.state.deptname
                this.props.setCurrentDept(this.props.currentDept)
                this.props.getStaffList({deptId:this.props.currentDept.departmentId})
            }
        })
    }
    
    handleCancel(){
       this.props.toggleModalState('DEFAULT',false)
    }
    render(){
        return (
            <Modal
                width={300}
                visible={true}
                title="修改部门名称" centered
                onCancel={this.handleCancel}
                footer={[
                    <Button key='1'  onClick={this.handleCancel}>取消</Button>,
                    <Button  key='2' type="primary"  onClick={this.handleOk}>确认</Button>,
                ]}
                >
                <Input value={this.state.deptname}  placeholder="请输入部门名称" onChange={e=>this.setState({deptname:e.target.value})}/>
            </Modal>
        )
    }
}

export default CDModal