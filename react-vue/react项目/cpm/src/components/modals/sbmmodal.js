//设置企业管理员
import React from 'react'
import {Modal,Button,message} from 'antd'
import {connect} from 'react-redux'
import http from 'libs/http'
import {toggleModalState} from 'store/employeeModalReducer'
import {getStaffList} from 'store/staffReducer'
@connect(
    state=>{
        return{
            ...state.deptReducer,
            loginUser:state.userReducer,
            activePerson:state.staffReducer.activePerson,
        }
    },
    {toggleModalState,getStaffList}
)
class CDModal extends React.Component{
    constructor(props){
        super(props)
        this.handleOk=this.handleOk.bind(this)
        this.handleCancel=this.handleCancel.bind(this)
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
            pointType:'0',
            deptId:0
        }
        http.put('enterprise/admin/setManager',params).then(res=>{
            if(res && res.status===200){
                message.success('操作成功')
                this.props.toggleModalState('DEFAULT',false)
                //指定完成之后刷新当前页面
                this.getEmployees()
            }
        })
    }
    removeManager(){
        http.delete('enterprise/admin/delete',[this.props.activePerson.userId,'0',0]).then(res=>{
            if(res && res.status===200){
                message.success('操作成功')
                this.props.toggleModalState('DEFAULT',false)
                //指定完成之后刷新当前页面
                this.getEmployees()
            }
        })
    }
    //获取员工列表
    getEmployees(){
        let params={
            isAllocation:'',
            page:1,
            limit:30,
            searchName:'',
            deptId:''
        }
        this.props.getStaffList(params)
    }
    handleCancel(){
       this.props.toggleModalState('DEFAULT',false)
    }
    render(){
        return (
            <Modal
                width={300}
                visible={true}
                title={this.props.bool?"设置企业管理员":"移除企业管理员"} centered
                onCancel={this.handleCancel}
                footer={[
                    <Button key='1'  onClick={this.handleCancel}>取消</Button>,
                    <Button  key='2' type="primary"  onClick={this.handleOk}>确认</Button>,
                ]}
                >
                确定要操作吗?
            </Modal>
        )
    }
}

export default CDModal