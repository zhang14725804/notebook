//删除员工(删除只能删除单个员工)
import React from 'react'
import {Modal,Button} from 'antd'
import {connect} from 'react-redux'
import http from 'libs/http'
import {toggleModalState} from 'store/employeeModalReducer'
import {getStaffList} from 'store/staffReducer'
import {getDeptList} from 'store/deptReducer'
@connect(
    state=>{
        return{
            selectedStaffList:state.staffReducer.selectedStaffList,
            currentDept:state.deptReducer.currentDept,
            activePerson:state.staffReducer.activePerson,
            loginUser:state.userReducer
        }
    },
    {toggleModalState,getStaffList,getDeptList}
)
class CDModal extends React.Component{
    constructor(props){
        super(props)
        this.handleOk=this.handleOk.bind(this)
        this.handleCancel=this.handleCancel.bind(this)
    }
    handleOk(){
        let {loginUser} = this.props
        //（部门管理员）在部门中删除员工
        if(loginUser.userRole==='department'){
            this.deleteStaff(this.props.activePerson.userId,this.props.currentDept.departmentId)
        }else if(loginUser.userRole==='enterprise'){
            //(企业管理者)人员管理删除员工
            this.deleteStaff(this.props.activePerson.userId,0)
        }
        
    }
    deleteStaff(userId,deptId){
        http.delete('enterprise/delete/employee',[userId,deptId]).then(res=>{
            if(res && res.status===200){
                Modal.success({
                    title: '系统提示',
                    centered:true,
                    content: '删除成功!',
                })
                this.props.toggleModalState('DEFAULT',false)
                if(deptId!==0){
                    //部门内部删除员工
                    this.getEmployees({deptId:this.props.currentDept.departmentId})
                    //主管自己把自己删了（重新获取部门列表）,部门主管不是部门里面的人，怎么把自己删除的
                    if(userId===this.props.loginUser.id){
                        this.props.getDeptList({type:this.props.loginUser.userRole})
                    }
                }else if(deptId===0){
                    //人员管理删除员工
                    this.getEmployees()
                }
            }
        })
    }
    //获取员工列表
    getEmployees(obj){
        let p={
            isAllocation:'',
            page:1,
            limit:30,
            searchName:'',
            //当前部门ID
            deptId:0
        }
        let params=obj?Object.assign(p,obj):p
        this.props.getStaffList(params)
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
                title="删除员工" centered
                onCancel={this.handleCancel}
                footer={[
                    <Button key='1'  onClick={this.handleCancel}>取消</Button>,
                    <Button  key='2' type="primary"  onClick={this.handleOk}>确认</Button>,
                ]}
                >
                确定要删除吗?
            </Modal>
        )
    }
}

export default CDModal