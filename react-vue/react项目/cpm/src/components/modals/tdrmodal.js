//移交部门主管权限（只是移交给选中的人，不是一个列表）
import React from 'react'
import {Modal,Button} from 'antd'
import {connect} from 'react-redux'
import http from 'libs/http'
import {toggleModalState} from 'store/employeeModalReducer'
import {getMEL} from 'store/staffReducer'
import {authTimeout} from 'libs/common'
import './modal.scss'
@connect(
    state=>{
        return{
            loginUser:state.userReducer,
            activePerson:state.staffReducer.activePerson,
            currentDept:state.deptReducer.currentDept
        }
    },
    {toggleModalState,getMEL}
)
class TRModal extends React.Component{
    constructor(props){
        super(props)
        this.handleOk=this.handleOk.bind(this)
        this.handleCancel=this.handleCancel.bind(this)
        this.transferRight=this.transferRight.bind(this)
    }
    componentDidMount(){}
    handleOk(){
        this.transferRight()
    }
    //userId(天选之子)，moveUserId（自己的），moveType（移交那种权限），moveDeptId（存在多个部门管理者的情况，移交企业管理者权限 0）
    transferRight(){
        let params={
            userId:this.props.activePerson.userId,
            moveUserId:this.props.loginUser.id,
            //权限类型分为（0.：企业管理员1.：部门主管2.：部门管理员）
            moveType:'1',
            moveDeptId:this.props.currentDept.departmentId,
        }
        http.post('enterprise/admin/move/power',params).then(res=>{
            if(res && res.status===200){
                // this.props.toggleModalState('DEFAULT',false)
                // //获取部门列表
                // this.props.getDeptList({type:this.props.loginUser.userRole})
                Modal.success({
                    title: '系统提示',
                    centered:true,
                    content: '移交成功！即将返回官网首页'
                })
                // 操作成功之后跳回首页，清空缓存
                setTimeout(()=>{
                    authTimeout()
                },3000)
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
                title={this.props.mtitle?this.props.mtitle:"权限移交"} centered
                onCancel={this.handleCancel}
                footer={[
                    <Button key='1'  onClick={this.handleCancel}>取消</Button>,
                    <Button  key='2' type="primary"  onClick={this.handleOk}>确认</Button>,
                ]}
                >
                确定要移交给“{this.props.activePerson.name}”吗？
            </Modal>
        )
    }
}

export default TRModal