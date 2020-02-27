//指定部门主管（必须是部门内部的人）
import React from 'react'
import {Modal,Button,message,Radio,Avatar} from 'antd'
import {getAvatar} from 'libs/common'
import {connect} from 'react-redux'
import http from 'libs/http'
import {toggleModalState} from 'store/employeeModalReducer'
import {getStaffList,getMEL} from 'store/staffReducer'
import './modal.scss'
@connect(
    state=>{
        return{
            loginUser:state.userReducer,
            mEmployee:state.staffReducer.mEmployee,
            currentDept:state.deptReducer.currentDept
        }
    },
    {toggleModalState,getStaffList,getMEL}
)
class SDDModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            pointUserId:'',
            //请求相关参数
            isAllocation:'',//已分配未分配
            page:1,
            searchName:'',
            
            //用户列表，逐个拼接，加载更多
            employeeArray:[],
            lastPage:false,
            total:0,
            sortway:'当前部门',
            sortWays:['当前部门','所有员工','未分配']
        }
        this.handleOk=this.handleOk.bind(this)
        this.handleCancel=this.handleCancel.bind(this)
        this.setManager=this.setManager.bind(this)
        this.onChange=this.onChange.bind(this)
        this.getMore=this.getMore.bind(this)
        this.changgeSort=this.changgeSort.bind(this)
    }
    componentDidMount(){
        this.getEmployee({deptId:this.props.currentDept.departmentId})
    }
    componentWillReceiveProps(np){
        const tp=this.props

        //第一次加载数据
        if(!tp.mEmployee &&  np.mEmployee && np.mEmployee.object && np.mEmployee.object.length>0){
            console.log('第一次加载数据')
            const list=this.state.employeeArray.concat(np.mEmployee.object)
            this.setState({
                employeeArray:list,
                page:np.mEmployee.currentPage,
                total:np.mEmployee.total,
                lastPage:list.length===np.mEmployee.total?true:false
            })
        }else if(tp.mEmployee &&  np.mEmployee && np.mEmployee.object && np.mEmployee.object.length>0){
            //点击加载更多
            console.log('点击加载更多')
            const list=this.state.employeeArray.concat(np.mEmployee.object)
            this.setState({
                employeeArray:list,
                page:np.mEmployee.currentPage,
                total:np.mEmployee.total,
                lastPage:list.length===np.mEmployee.total?true:false
            })
        }else if(np.mEmployee &&  np.mEmployee.total===0){
            console.log('加载完所有数据')
            this.setState({
                employeeArray:[],
                page:1,
                total:0,
                lastPage:true
            })
        }
    }
    //获取员工列表
    getEmployee(params){
        this.props.getMEL(params)
    }
    getMore(){
        if(!this.state.lastPage && this.state.sortway!=='当前部门'){
            this.getEmployee({
                page:this.state.page+1,
                isAllocation:this.state.isAllocation
            })
        }else if(!this.state.lastPage && this.state.sortway==='当前部门'){
            this.getEmployee({
                page:this.state.page+1,
                isAllocation:this.state.isAllocation,
                deptId:this.props.currentDept.departmentId
            })
        }
    }
    handleOk(){
        //判空
        if(this.state.pointUserId!==''){
            this.setManager()
        }else{
            message.error('请先进入要操作的部门')
        }
    }
    changgeSort(w){
        //所有员工或者未分配的员工
        if( w==='所有员工'|| w==='未分配'){
            this.setState({
                isAllocation:w==='所有员工'?'':w==='未分配'?'-1':'1',
            })
            this.getEmployee({
                isAllocation:w==='所有员工'?'':'-1'
            })
        }else if(w==='当前部门'){
            //当前部门的员工
            this.setState({isAllocation:''})
            this.getEmployee({
                deptId:this.props.currentDept.departmentId
            })
        }
        //改变查询条件时清空状态
        this.setState({
            sortway:w,
            page:1,
            employeeArray:[],
            lastPage:false,
        })
    }
    setManager(){
        let params={
            pointUserId:this.state.pointUserId,
            //（0.：企业管理员1.：部门主管2.：部门管理员）
            pointType:'1',
            deptId:this.props.currentDept.departmentId
        }
        http.put('enterprise/admin/setManager',params).then(res=>{
            if(res && res.status===200){
                Modal.success({
                    title: '系统提示',
                    centered:true,
                    content: '操作成功！',
                })
                this.props.toggleModalState('DEFAULT',false)
                //指定完成之后刷新当前页面
                this.props.getStaffList({deptId:this.props.currentDept.departmentId})
            }
        })
    }
    handleCancel(){
       this.props.toggleModalState('DEFAULT',false)
    }
    onChange(e) {
        this.setState({pointUserId:e.target.value})
    }
    render(){
        //排除已经是当前部门主管的人
        const cdId=this.props.currentDept.departmentId
        let {employeeArray}=this.state
        let deptDirectors=employeeArray.filter((employee)=>{
            let departments=employee.departments
            let urole=employee.userRoleInfos
            const departAndrole=Object.assign(departments,urole)
            //current dept director
            let cdm=departAndrole.some(dr=>{return dr.departmentId===cdId && dr.roleName && dr.roleName==='DEPT_DIRECTOR'})
            if(cdm){
                return employee
            }
        })
        //dept director id
        let ddId=deptDirectors.map(dd=>{return dd.userId})
        //如果这个部门都是管理员（测试的时候又可能出现这个情况）
        let allAreDirector=employeeArray.length===ddId.length
        console.log(allAreDirector)
        return (
            <Modal
                width={300}
                visible={true}
                title="指定部门主管" centered
                onCancel={this.handleCancel}
                footer={[
                    <Button key='1'  onClick={this.handleCancel}>取消</Button>,
                    <Button  key='2' type="primary"  onClick={this.handleOk}>确认</Button>,
                ]}
                >
                <div className="radio-wrapper">
                    <Radio.Group style={{ width: '100%' }} onChange={this.onChange}>
                        {this.state.employeeArray&&this.state.employeeArray.length>0?this.state.employeeArray.map(employee=>{
                            return ddId.some((dd)=>{return dd===employee.userId})?null:<div className="radio-class" key={employee.userId}>
                                <Radio  value={employee.userId}>
                                    <Avatar src={getAvatar(employee.cloudUserId)}></Avatar>
                                    <span className="ml6">{employee.name}</span>
                                </Radio>
                            </div>
                        }):null}
                        {employeeArray.length>0&&allAreDirector?<div className="radio-class tc">当前部门员工都是部门主管</div>:null}
                    </Radio.Group>
                    {this.state.total===0?<div className="tc">暂无记录</div>:this.state.lastPage?null:<div className="cp theme-color tc" onClick={this.getMore}>加载更多</div>}
                </div>
            </Modal>
        )
    }
}

export default SDDModal