//删除员工(删除只能删除单个员工，智障一样的需求)
import React from 'react'
import {Modal,Button,message} from 'antd'
import {connect} from 'react-redux'
import http from 'libs/http'
import {toggleModalState} from 'store/employeeModalReducer'
@connect(
    state=>{
        return{
            selectedStaffList:state.staffReducer.selectedStaffList,
            currentDept:state.deptReducer.currentDept,
            activePerson:state.staffReducer.activePerson,
        }
    },
    {toggleModalState}
)
class CDModal extends React.Component{
    constructor(props){
        super(props)
        this.handleOk=this.handleOk.bind(this)
        this.handleCancel=this.handleCancel.bind(this)
    }
    handleOk(){
        console.log(this.props)
        this.deleteStaff(this.props.activePerson.userId,this.props.currentDept.departmentId)
    }
    deleteStaff(userId,deptId){
        http.delete('enterprise/delete/employee',[userId,deptId]).then(res=>{
            if(res && res.status===200){
                message.success('删除成功！')
                this.props.toggleModalState('DEFAULT',false)
            }
        })
    }
    componentDidUpdate(){
        
    }
    handleCancel(){
       this.props.toggleModalState('DEFAULT',false)
    }
    render(){
        return (
            <Modal
                width={300}
                visible={true}
                title="移除部门主管" centered
                onCancel={this.handleCancel}
                footer={[
                    <Button key='1'  onClick={this.handleCancel}>取消</Button>,
                    <Button  key='2' type="primary"  onClick={this.handleOk}>确认</Button>,
                ]}
                >
                确定要移除吗?
            </Modal>
        )
    }
}

export default CDModal