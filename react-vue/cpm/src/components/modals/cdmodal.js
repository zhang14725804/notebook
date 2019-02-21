//创建部门弹框
import React from 'react'
import {Modal,Button,Input} from 'antd'
import {connect} from 'react-redux'
import http from 'libs/http'
import {toggleModalState} from 'store/employeeModalReducer'
import {getDeptList} from 'store/deptReducer'
@connect(
    state=>{
        return{
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
        this.createDept=this.createDept.bind(this)
    }
    handleOk(){
        //判空
        if(this.state.deptname.length>0){
            this.createDept()
        }
    }
    createDept(){
        http.post('enterprise/depts/create',{parentId:'0',deptName:this.state.deptname}).then(res=>{
            if(res && res.status===200){
                Modal.success({
                    title: '系统提示',
                    centered:true,
                    content: '创建成功！',
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
                title="创建部门" centered
                onCancel={this.handleCancel}
                footer={[
                    <Button key='1'  onClick={this.handleCancel}>取消</Button>,
                    <Button  key='2' type="primary"  onClick={this.handleOk}>确认</Button>,
                ]}
                >
                <Input  placeholder="请输入部门名称" onChange={e=>this.setState({deptname:e.target.value})}/>
            </Modal>
        )
    }
}

export default CDModal