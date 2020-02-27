//移交企业管理员权限权限
import React from 'react'
import {Modal,Button,message,Radio} from 'antd'
import {connect} from 'react-redux'
import http from 'libs/http'
import {authTimeout} from 'libs/common'
import {toggleModalState} from 'store/employeeModalReducer'
import {getMEL} from 'store/staffReducer'
import './modal.scss'

message.config({top:99})
@connect(
    state=>{
        return{
            loginUser:state.userReducer,
            mEmployee:state.staffReducer.mEmployee,
            currentDept:state.deptReducer.currentDept
        }
    },
    {toggleModalState,getMEL}
)
class TRModal extends React.Component{
    constructor(props){
        super(props)
        this.state={
            //请求相关参数
            isAllocation:'',//已分配1未分配-1,所有''
            //limit:30,
            limit:2,
            page:1,
            //用户列表，逐个拼接，加载更多
            employeeArray:[],
            lastPage:false,
            total:0,
            //选中的人
            selectedUserArray:[],
            userId:''
        }
        this.handleOk=this.handleOk.bind(this)
        this.handleCancel=this.handleCancel.bind(this)
        this.transferRight=this.transferRight.bind(this)
        this.onChange=this.onChange.bind(this)
        this.getMore=this.getMore.bind(this)
        this.changgeSort=this.changgeSort.bind(this)
    }
    componentDidMount(){
        //这里为什么会执行两次（因为menubar中也引用了）
        if(this.props.trType==='DEPT_DIRECTOR'){
            //移交部门主管权限
            this.getEmployee(null)
        }else if(this.props.trType==='ENTERPRISE_MANAGER'){
            //移交企业管理员权限
            this.getEmployee(null)
        }
    }
    //获取员工列表
    getEmployee(params){
        this.props.getMEL(params)
    }
    handleOk(){
        if(this.state.userId==this.props.loginUser.id){
            message.error('当前用户已经是企业管理员')
        }else if(this.state.userId!==''){
            this.transferRight()
        }else{
            message.error('请先选择员工')
        }
    }
    //userId(天选之子)，moveUserId（自己的），moveType（移交那种权限），moveDeptId（存在多个部门管理者的情况，移交企业管理者权限 0）
    transferRight(){
        let params={
            userId:this.state.userId,
            moveUserId:this.props.loginUser.id,
            //权限类型分为（0.：企业管理员1.：部门主管2.：部门管理员）
            moveType:'0',
            moveDeptId:'0',
        }
        http.post('enterprise/admin/move/power',params).then(res=>{
            if(res && res.status===200){
                this.props.toggleModalState('DEFAULT',false)
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
    getMore(){
        if(!this.state.lastPage){
            this.getEmployee({
                page:this.state.page+1,
                isAllocation:this.state.isAllocation
            })
        }
    }
    componentWillReceiveProps(np){
        const tp=this.props
        // console.log(tp)
        // console.log(np)
        if(this.props.trType==='DEPT_DIRECTOR'){
            //移交部门主管权限
            this.propsChange(tp,np)
        }else if(this.props.trType==='ENTERPRISE_MANAGER'){
            //移交企业管理员权限
            this.propsChange(tp,np)
        }
    }
    propsChange(tp,np){
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
    onChange(e) {
        this.setState({userId:e.target.value})
    }
    handleCancel(){
        this.props.toggleModalState('DEFAULT',false)
     }
    render(){
        //过滤当前企业管理员
        let {employeeArray} = this.state
        let newEmployeeArray = employeeArray.map(e=>{
            let flag=e.userRoleInfos.some(role=>{
                return role.roleName==='ENTERPRISE_MANAGER'
            })
            //is enterprise manager
            e.isEM=flag?true:false
            return e
        })
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
                <div className="add-staff-modal">
                    <div className="sort cp">
                        <div onClick={()=>this.changgeSort('')} className={this.state.isAllocation===''?'active':''}>所有成员</div>
                        <div onClick={()=>this.changgeSort('-1')} className={this.state.isAllocation==='-1'?'active':''}>待分配</div>
                    </div>
                    <div className="radio-wrapper">
                        <Radio.Group style={{ width: '100%' }} onChange={this.onChange}>
                            {newEmployeeArray.length>0?newEmployeeArray.map(e=>{
                                return e.isEM?null:<div className="radio-class" key={e.userId}><Radio  value={e.userId}>{e.name}</Radio></div>
                            }):null}
                        </Radio.Group>
                        {this.state.total===0?<div className="tc">暂无记录</div>:this.state.lastPage?null:<div className="cp theme-color tc" onClick={this.getMore}>加载更多</div>}
                    </div>
                </div>
            </Modal>
        )
    }
}

export default TRModal