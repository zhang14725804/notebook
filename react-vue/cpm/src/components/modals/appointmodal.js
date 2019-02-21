//指定部门
import React from 'react'
import {Modal,Button,Radio} from 'antd'
import {connect} from 'react-redux'
import http from 'libs/http'
import {toggleModalState} from 'store/employeeModalReducer'
import {getDeptList} from 'store/deptReducer'
import {getStaffList,selectedStaff} from 'store/staffReducer'
import './modal.scss'

@connect(
    state=>{
        return{
            loginUser:state.userReducer,
            selectedStaffList:state.staffReducer.selectedStaffList,
            activePerson:state.staffReducer.activePerson,
            deptList:state.deptReducer.deptList
        }
    },
    {toggleModalState,getDeptList,getStaffList,selectedStaff}
)
class CDModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            newDeptId:'',
            enterpriseUserIds:[],
        }
        this.handleOk=this.handleOk.bind(this)
        this.handleCancel=this.handleCancel.bind(this)
        this.appointFn=this.appointFn.bind(this)
        this.onChange=this.onChange.bind(this)
    }
    
    componentWillMount(){
        if(!this.props.deptList){
            this.props.getDeptList({type:this.props.loginUser.userRole})
        }
    }
    componentDidUpdate(){
        //console.log(this.props)
    }
    handleOk(){
        //批量操作
        if(this.state.newDeptId!=='' && this.props.selectedStaffList.length>0){
            const staff=this.props.selectedStaffList.map(e=>{
                return {newDeptId:this.state.newDeptId,enterpriseUserIds:e.key}
            })
            this.appointFn(staff)
        }else if(this.state.newDeptId!=='' && this.props.activePerson){
            //操作单个文件
            this.appointFn([{newDeptId:this.state.newDeptId,enterpriseUserIds:this.props.activePerson.userId}])
        }
    }
    appointFn(staff){
        http.put('enterprise/user/move',staff).then(res=>{
            if(res && res.status===200){
                Modal.success({
                    title: '系统提示',
                    centered:true,
                    content: '操作成功!',
                })
                this.props.toggleModalState('DEFAULT',false)
                //制定部门之后如何刷新数据（操作selectedRowKeys）
                this.props.selectedStaff([])
                //指定部门之后刷新
                this.props.getStaffList()
            }
        })
    }
    handleCancel(){
       this.props.toggleModalState('DEFAULT',false)
    }
    onChange(e) {
        this.setState({newDeptId:e.target.value})
    }
    render(){
        return (
            <Modal
                width={300}
                visible={true}
                title="指定部门" centered
                onCancel={this.handleCancel}
                footer={[
                    <Button key='1'  onClick={this.handleCancel}>取消</Button>,
                    <Button  key='2' type="primary"  onClick={this.handleOk}>确认</Button>,
                ]}
                >
                <div className="radio-wrapper">
                    <Radio.Group style={{ width: '100%' }} onChange={this.onChange}>
                        {this.props.deptList?this.props.deptList.map(d=>{
                            return <div className="radio-class" key={d.departmentId}><Radio  value={d.departmentId}>{d.name}</Radio></div>
                        }):null}
                    </Radio.Group>
                </div>
            </Modal>
        )
    }
}

export default CDModal