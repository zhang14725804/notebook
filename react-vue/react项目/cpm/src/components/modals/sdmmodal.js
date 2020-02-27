//设置部门管理员
import React from 'react'
import {Modal,Button} from 'antd'
import {connect} from 'react-redux'
import http from 'libs/http'
import {toggleModalState} from 'store/employeeModalReducer'
import {getStaffList} from 'store/staffReducer'
@connect(
    state=>{
        return{
            loginUser:state.userReducer,
            activePerson:state.staffReducer.activePerson,
            currentDept:state.deptReducer.currentDept
        }
    },
    {toggleModalState,getStaffList}
)
class SDMModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            pointUserId:'',
            //请求相关参数
            isAllocation:'',//已分配未分配
            page:1,
            limit:30,
            searchName:'',
            deptId:'',
        }
        this.handleOk=this.handleOk.bind(this)
        this.handleCancel=this.handleCancel.bind(this)
        this.setManager=this.setManager.bind(this)
    }
    componentDidMount(){
        console.log(this.props)
    }
    //获取员工列表
    getEmployees(deptId){
        let params={
            isAllocation:this.state.isAllocation,
            page:this.state.page,
            limit:this.state.limit,
            searchName:this.state.searchName,
            //当前部门ID
            deptId:deptId
        }
        this.props.getStaffList(params)
    }
    handleOk(){
        if(this.props.bool){
            this.setManager()
        }else{
            this.removeManager()
        }
    }
    setManager(){
        let params={
            pointUserId:this.props.activePerson.userId,
            //（0.：企业管理员1.：部门主管2.：部门管理员）
            pointType:'2',
            deptId:this.props.currentDept.departmentId
        }
        http.put('enterprise/admin/setManager',params).then(res=>{
            if(res && res.status===200){
                Modal.success({
                    title: '系统提示',
                    centered:true,
                    content: '操作成功!',
                })
                this.props.toggleModalState('DEFAULT',false)
                //指定完成之后刷新当前页面
                this.getEmployees(this.props.currentDept.departmentId)
            }
        })
    }
    removeManager(){
        http.delete('enterprise/admin/delete',[this.props.activePerson.userId,'2',this.props.currentDept.departmentId]).then(res=>{
            if(res && res.status===200){
                Modal.success({
                    title: '系统提示',
                    centered:true,
                    content: '操作成功!',
                })
                this.props.toggleModalState('DEFAULT',false)
                //指定完成之后刷新当前页面
                this.getEmployees(this.props.currentDept.departmentId)
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
                title={this.props.bool?"指定部门管理员":"移除部门管理员"} centered
                onCancel={this.handleCancel}
                footer={[
                    <Button key='1'  onClick={this.handleCancel}>取消</Button>,
                    <Button  key='2' type="primary"  onClick={this.handleOk}>确认</Button>,
                ]}
                >
                确定要操作吗？
            </Modal>
        )
    }
}

export default SDMModal