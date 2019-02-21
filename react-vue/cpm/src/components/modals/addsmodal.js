//添加员工（部门管理员）
import React from 'react'
import {Modal,Button,Checkbox,message,Avatar} from 'antd'
import {getAvatar} from 'libs/common'
import {connect} from 'react-redux'
import http from 'libs/http'
import {toggleModalState} from 'store/employeeModalReducer'
import {getMEL,getStaffList} from 'store/staffReducer'
import './modal.scss'
@connect(
    state=>{
        return{
            loginUser:state.userReducer,
            mEmployee:state.staffReducer.mEmployee,
            currentDept:state.deptReducer.currentDept
        }
    },
    {toggleModalState,getMEL,getStaffList}
)
class ADDSModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            //请求相关参数
            isAllocation:'',//已分配1未分配-1,所有''
            limit:30,
            page:1,
            //用户列表，逐个拼接，加载更多
            employeeArray:[],
            lastPage:false,
            total:0,
            //选中的人
            selectedUserArray:[]
        }
        this.handleOk=this.handleOk.bind(this)
        this.handleCancel=this.handleCancel.bind(this)
        this.deptAddStaff=this.deptAddStaff.bind(this)
        this.getMore=this.getMore.bind(this)
        this.changgeSort=this.changgeSort.bind(this)
        this.onChange=this.onChange.bind(this)

    }
    onChange(checkedValues){
        this.setState({selectedUserArray:checkedValues})
    }
    handleOk(){
        if(this.state.selectedUserArray.length>0){
            let ndid=this.props.currentDept.departmentId
            let params=this.state.selectedUserArray.map(u=>{
                return {newDeptId:ndid,enterpriseUserIds:u}
            })
            this.deptAddStaff(params)
        }else{
            message.config({top:99})
            message.error('请先选择员工！')
        }
    }
    deptAddStaff(params){
        http.put('enterprise/user/move',params).then(res=>{
            if(res && res.status===200){
                message.success('添加成功')
                this.props.toggleModalState('DEFAULT',false)
                this.props.getStaffList({deptId:this.props.currentDept.departmentId})
            }
        })
    }
    changgeSort(e){
        //改变查询条件时清空状态
        this.setState({
            isAllocation:e,
            limit:30,
            page:1,
            employeeArray:[],
            lastPage:false,
        })
        this.getEmployee({isAllocation:e})
    }
    getEmployee(params){
        this.props.getMEL(params)
    }
    getMore(){
        if(!this.state.lastPage){
            this.getEmployee({
                page:this.state.page+1,
                isAllocation:this.state.isAllocation
            })
        }
    }
    componentWillReceiveProps(np){
        if(np.mEmployee &&  np.mEmployee.object && np.mEmployee.object.length>0){
            const list=this.state.employeeArray.concat(np.mEmployee.object)
            this.setState({
                employeeArray:list,
                page:np.mEmployee.currentPage,
                total:np.mEmployee.total,
                lastPage:list.length===np.mEmployee.total?true:false
            })
        }else if(np.mEmployee &&  np.mEmployee.total===0){
            this.setState({
                employeeArray:[],
                page:1,
                total:0,
                lastPage:true
            })
        }
    }
    componentWillMount(){
        this.getEmployee(null)
    }
    handleCancel(){
       this.props.toggleModalState('DEFAULT',false)
    }
    render(){
        //过滤当前部门的人
        const cdId=this.props.currentDept.departmentId
        let {employeeArray}=this.state
        //current dept employee
        let cde=employeeArray.filter((employee)=>{
            let departments=employee.departments
            //current dept employee
            let cdemp=departments.some(d=>{return d.departmentId===cdId})
            if(cdemp){
                return employee
            }
        })
        //current dept employee userId
        let dcdeId=cde.map(dd=>{return dd.userId})
        return (
            <Modal
                width={350}
                visible={true}
                title="添加员工" centered
                onCancel={this.handleCancel}
                footer={[
                    <Button key='1'  onClick={this.handleCancel}>取消</Button>,
                    <Button  key='2' type="primary"  onClick={this.handleOk}>确认</Button>,
                ]}
                >
                <div className="add-staff-modal">
                    <div className="sort cp">
                        <div onClick={()=>this.changgeSort('')} className={this.state.isAllocation===''?'active':''}>所有成员</div>
                        <div onClick={()=>this.changgeSort('-1')} className={this.state.isAllocation==='-1'?'active':''}>待分配</div>
                    </div>
                    <div className="radio-wrapper">
                        <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange}>
                            {this.state.employeeArray&&this.state.employeeArray.length>0?this.state.employeeArray.map(employee=>{
                                return dcdeId.some((dd)=>{return dd===employee.userId})?null:<div className="radio-class" key={employee.userId}>
                                    <Checkbox  value={employee.userId}>
                                        <Avatar src={getAvatar(employee.cloudUserId)}></Avatar>
                                        <span className="ml6">{employee.name}</span>
                                    </Checkbox>
                                </div>
                            }):null}
                        </Checkbox.Group>
                        {this.state.total===0?<div className="tc">暂无记录</div>:this.state.lastPage?null:<div className="cp theme-color tc" onClick={this.getMore}>加载更多</div>}
                    </div>
                </div>
            </Modal>
        )
    }
}

export default ADDSModal