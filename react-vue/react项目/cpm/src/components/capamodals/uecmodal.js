//设置员工容量（update employee capacity）
import React from 'react'
import {Modal,Button,InputNumber} from 'antd'
import {connect} from 'react-redux'
import http from 'libs/http'
import {toggleCapaModalState,searchAll} from 'store/capaReducer'
import {getStaffList,selectedStaff} from 'store/staffReducer'
import {getDeptList} from 'store/deptReducer'
@connect(
    state=>{
        return{
            loginUser:state.userReducer,
            sumaryCapacity:state.capaReducer.sumaryCapacity,
            selectedStaffList:state.staffReducer.selectedStaffList,
            employeese:state.staffReducer.staffData.object,
        }
    },
    {toggleCapaModalState,getStaffList,getDeptList,searchAll,selectedStaff}
)
class UECModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            defaultValue:1,
            //加减容量的最大最小值
            min:0,
            max:0
        }
        this.handleCancel=this.handleCancel.bind(this)
        this.handleOk=this.handleOk.bind(this)
        this.onChange=this.onChange.bind(this)
    }
    handleOk(){
        //selectedStaffList只有userId
        const {selectedStaffList,sumaryCapacity,employeese} =this.props
        let currentSelectedEmployee=selectedStaffList.map(e=>{
            //每个员工剩余容量
            for(let i=0;i<employeese.length;i++){
                if(employeese[i].userId===e.key){
                    return employeese[i]
                    break
                }
            }
        })
        //判断当前设置的容量是否合理(注意零界条件)
        if(selectedStaffList.length*this.state.defaultValue<=sumaryCapacity.residuePicQuota){
            let params
            if(this.state.defaultValue>0){
                //增加容量,modifyType修改类型（人员p，部门d，文库l）
                params=currentSelectedEmployee.map(e=>{
                    return {id:e.cloudUserId,type:1,modifyType:'p',spaceQuota:this.state.defaultValue}
                })
            }else{
                //减少容量
                params=currentSelectedEmployee.map(e=>{
                    return {id:e.cloudUserId,type:0,modifyType:'p',spaceQuota:-this.state.defaultValue}
                })
            }
            
            this.batchUpdate(params)
        }else{
            Modal.error({
                title: '系统提示',
                centered:true,
                content: '当前企业剩余容量不足',
                okText:'确定',
                cancelText:'取消'
            })
        }
    }
    componentDidMount(){
        //selectedStaffList只有userId
        let {sumaryCapacity,selectedStaffList,employeese} = this.props
        //企业剩余容量除以选中的人数
        let max=Math.floor(sumaryCapacity.residuePicQuota/selectedStaffList.length)
        //员工剩余容量
        let employeeResidue=selectedStaffList.map(e=>{
            //每个员工剩余的量
            for(let i=0;i<employeese.length;i++){
                if(employeese[i].userId===e.key){
                    return employeese[i].spaceTotal-employeese[i].spacePicUsed
                    break
                }
            }
        })
        let min = -Math.min.apply(null,employeeResidue)
        this.setState({
            min:min,
            max:max
        })
    }
    //Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application
    componentWillUnmount(){
        this.setState({
            max:0,
            min:0
        })
    }
    batchUpdate(params){
        http.put('enterprise/spaceQu/batchUpdate',params).then(res=>{
            if(res.data.code===200){
                Modal.success({
                    title: '系统提示',
                    centered:true,
                    content: '操作成功!',
                })
                //请求成功，刷新部门容量、容量使用概述、员工容量列表
                this.props.getDeptList({type:this.props.loginUser.userRole})
                this.props.getStaffList()
                this.props.searchAll()
                this.props.toggleCapaModalState('SET_EMP_CAPA',false)
                //操作之后刷新数据（操作selectedRowKeys）
                this.props.selectedStaff([])
                this.setState({defaultValue:1})
            }else{
                Modal.success({
                    title: '系统提示',
                    centered:true,
                    content: res.data.msg,
                })
            }
        })
    }
    //修改的容量
    onChange(val){
        this.setState({
            defaultValue:val
        })
    }
    handleCancel(){
        this.props.toggleCapaModalState('SET_EMP_CAPA',false)
    }
    //容量可以加减
    render(){
        return(
            <Modal
                width={350}
                visible={true}
                autoFocus={true}
                title="设置员工容量(单位：G)" centered
                onCancel={this.handleCancel}
                footer={[
                    <Button key='1'  onClick={this.handleCancel}>取消</Button>,
                    <Button  key='2' type="primary"  onClick={this.handleOk}>保存</Button>,
                ]}
                >
                <div>
                    <InputNumber style={{width:'200px'}} autoFocus size='large'  min={this.state.min} max={this.state.max} defaultValue={this.state.defaultValue} onChange={this.onChange} />
                </div>
                <div style={{color:'#666666',fontSize:'14px',}}>修改的容量是在已有容量的基础上增加或减少且不能低于已用的容量</div>
            </Modal>
        )
    }
}

export default UECModal