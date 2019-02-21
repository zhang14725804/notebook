//删除部门
import React from 'react'
import {Modal,Button} from 'antd'
import {connect} from 'react-redux'
import http from 'libs/http'
import {toggleModalState} from 'store/employeeModalReducer'
import {getDeptList} from 'store/deptReducer'
@connect(
    state=>{
        return{
            ...state.deptReducer,
            loginUser:state.userReducer
        }
    },
    {toggleModalState,getDeptList}
)
class CDModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            deptname:''
        }
        this.handleOk=this.handleOk.bind(this)
        this.handleCancel=this.handleCancel.bind(this)
    }
    handleOk(){
        this.deleteDept(this.props.currentDept.departmentId)
    }
    deleteDept(deptId){
        http.delete('enterprise/depts/delete',[deptId]).then(res=>{
            if(res && res.status===200){
                Modal.success({
                    title: '系统提示',
                    centered:true,
                    content: '删除成功！',
                })
                this.props.toggleModalState('DEFAULT',false)
                this.props.getDeptList({type:this.props.loginUser.userRole})
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
                title="删除部门" centered
                onCancel={this.handleCancel}
                footer={[
                    <Button key='1'  onClick={this.handleCancel}>取消</Button>,
                    <Button  key='2' type="primary"  onClick={this.handleOk}>确认</Button>,
                ]}
                >
                确定要删除部门“{this.props.currentDept.name}”吗?
            </Modal>
        )
    }
}

export default CDModal