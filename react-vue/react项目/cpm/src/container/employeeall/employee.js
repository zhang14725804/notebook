import React from 'react'
import './employee.scss'

//所有员工列表
import companyIcon from 'static/images/company-icon.svg'
import appointIcon from 'static/images/appoint-icon.svg'
import deleteIcon from 'static/images/delete-icon.svg'
import filterIcon from 'static/images/filter-icon.svg'
import Datagrid from 'components/datagrid/datagrid'
import {Icon,Button,Input,Popover,Pagination,message,Radio,Avatar} from 'antd'
import {connect} from 'react-redux'

import {paginationTotal,getAvatar} from 'libs/common'
import {toggleModalState} from 'store/employeeModalReducer'
import {getStaffList} from 'store/staffReducer'
import Loadable from 'react-loadable'
const Personal = Loadable({loader: () => import('components/personal/personal'),loading() {return null}})
const SDDModal = Loadable({loader: () => import('components/modals/sddmodal'),loading() {return null}})
const DSModal = Loadable({loader: () => import('components/modals/dsmodal'),loading() {return null}})
const SBMModal = Loadable({loader: () => import('components/modals/sbmmodal'),loading() {return null}})
const RDMModal = Loadable({loader: () => import('components/modals/rdmmodal'),loading() {return null}})
const Appointmodal = Loadable({loader: () => import('components/modals/appointmodal'),loading() {return null}})
@connect(
    state=>{
        return{
            loginUser:state.userReducer,
            selectedStaffList:state.staffReducer.selectedStaffList,
            employeese:state.staffReducer.staffData,
            enterpriseTotal:state.staffReducer.enterpriseTotal,
            employeeModalState:state.employeeModalReducer,
            deptList:state.deptReducer.deptList,
        }
    },
    {toggleModalState,getStaffList}
)
class Employee extends React.Component{
    constructor(props){
        super(props)
        this.state={
            //表格缩放比例
            tscale:1,
            //请求相关参数
            isAllocation:'',//已分配1未分配-1,所有''
            page:1,
            limit:30,
            searchName:'',
            deptId:0,
            //设置企业管理员还是移除（true和false）
            sbmbool:true
        }
        this.getEmployees=this.getEmployees.bind(this)
        this.staffDetail=this.staffDetail.bind(this)
        this.appoint=this.appoint.bind(this)
        this.filterEm=this.filterEm.bind(this)
        this.delStaff=this.delStaff.bind(this)
        this.searchHandler=this.searchHandler.bind(this)
        this.emitEmptySearchName=this.emitEmptySearchName.bind(this)
        //设为移除部门主管
        this.toggleDeptManage=this.toggleDeptManage.bind(this)
        //设为移除企业管理员
        this.toggleBusManage=this.toggleBusManage.bind(this)
    }
    componentWillMount(){
        let ah=window.screen.availHeight
        //console.log(ah)
        if(ah>900){
            this.setState({scale:1})
        }else if(ah<900&&ah>800){
            this.setState({tscale:0.88})
        }else if(ah<800&&ah>700){
            this.setState({tscale:0.70})
        }else{
            this.setState({tscale:0.65})
        }
        this.getEmployees()
    }
    delStaff(e){
        if(e.target.className==='del-staff-btn'){
            this.props.toggleModalState('DEL_STAFF',true)
        }
    }
    //获取员工列表
    getEmployees(obj){
        let p={
            isAllocation:this.state.isAllocation,
            page:this.state.page,
            limit:this.state.limit,
            searchName:this.state.searchName.trim(),
            deptId:this.state.deptId
        }
        //合并参数
        let params=obj?Object.assign(p,obj):p
        this.props.getStaffList(params)
    }
    searchHandler(){
        if(this.state.searchName.trim()!==''){
            this.getEmployees()
        }
    }
    emitEmptySearchName(){
        this.setState({searchName:''})
        //setState是异步的，这里特殊处理下
        this.getEmployees({searchName:''})
    }
    //指定部门
    appoint(){
        this.props.toggleModalState('SET_DEPT',true)
    }
    staffDetail(e){
        //阻止冒泡的一种方式
        if(e.target.className.indexOf('tr-content')>-1){
            this.props.toggleModalState('STAFF_DETAIL',true)
        }
    }
    toggleDeptManage(bool){
        if(bool){
            this.props.toggleModalState('SET_DEPT_MANAGER',true)
        }else{
            this.props.toggleModalState('REMOVE_DEPT_MANAGER',true)
        }
    }
    toggleBusManage(bool){
        this.setState({sbmbool:bool})
        this.props.toggleModalState('SET_BUS_MANAGER',true)
    }
    //过滤条件（全部员工，已分配，未分配）
    filterEm(w){
        this.setState({isAllocation:w})
        this.getEmployees({isAllocation:w})
    }
    componentDidMount(){
        
    }
    componentWillReceiveProps(np){
        //console.log(np)
    }
    componentDidUpdate(){
        //console.log(this.props)
    }
    
    render(){
        const filterPop=(
            <div className='cp filter-items'>
                <div className={this.state.isAllocation===''?'active':''} onClick={()=>this.filterEm('')}>全部员工</div>
                <div className={this.state.isAllocation==='1'?'active':''} onClick={()=>this.filterEm('1')}>已分配</div>
                <div className={this.state.isAllocation==='-1'?'active':''}  onClick={()=>this.filterEm('-1')}>待分配</div>
            </div>
        )
        const tHead=[{
            title:"员工",
            dataIndex:'name',
            render:text=><div className="cp">{text}</div>
        },{
            title:"所在部门",
            dataIndex:'dept',
        },{
            title:"手机号",
            dataIndex:'phone',
        },{
            title:"邮箱",
            dataIndex:'email',
        }]
        let pageData=this.props.employeese.object && this.props.employeese.object.length!==0?this.props.employeese.object.map(employee=>{
            {/**遍历所在部门 */}
            let deptList=employee.departments.length>0?employee.departments.map((d,i)=>{
                return i>0 ?`、${d.name}`:d.name
            }):'待分配'
            {/**遍历当前用户角色 检查是否是企业管理员 ,bitPop意思是Popover的一部分（bit of Popover）*/}
            let bitPop,ifbm
            {/**企业管理员不可以移除自己（但是可以移除其他人），只能移交权限 */}
            if(employee.userRoleInfos.length>0){
                ifbm=employee.userRoleInfos.some(r=>{
                    return r.roleName==='ENTERPRISE_MANAGER'
                })
                bitPop=ifbm?(this.props.loginUser.id===employee.userId?null:<p onClick={()=>this.toggleBusManage(false)}>移除企业管理员</p>):(<p onClick={()=>this.toggleBusManage(true)}>设为企业管理员</p>)
                //bitPop=ifbm?null:(<p onClick={()=>this.toggleBusManage(true)}>设为企业管理员</p>)
            }else{
                bitPop= (<p onClick={()=>this.toggleBusManage(true)}>设为企业管理员</p>)
            }
            return {
                key: employee.userId,
                name: <div className="tr-content" onClick={this.staffDetail}>
                        <div>
                            <Avatar src={getAvatar(employee.cloudUserId)}></Avatar>
                            <span className="ml8">{employee.name}</span>
                            {employee.userRoleInfos.length>0?employee.userRoleInfos.map((r,i)=>{
                                return r.roleName==='ENTERPRISE_MANAGER'?<span className='role-tip ml6' key={i}>企业管理员</span>:null
                            }):null}
                        </div>
                        <Popover placement="leftTop" content={
                            <div className="cp">
                                <p onClick={this.appoint}>指定部门</p>
                                {bitPop}
                                {/*删除员工只有员工不属于任何部门时才有这个选项*/}
                                {employee.departments.length===0?<p onClick={this.delStaff} className='del-staff-btn'>移除员工</p>:null}
                            </div>
                        }><Icon style={{display:'flex',alignItems:'center',fontSize: '20px'}} type="dash" /></Popover>
                    </div>,
                dept: <div className="ellipsis cp tr-content" onClick={this.staffDetail} title={deptList}>{deptList}</div>,
                phone: employee.mobile || '未绑定',
                email: employee.email || '未绑定',
            }
        }):[]

        return(
            <div className="dept-data-wrapper">
                <div className="toolbar">
                    <div className="dept-name-count">
                        <div className="icon-wrapper">
                            <img alt='' src={companyIcon}/>
                        </div>
                        <div className="name-count">
                            <h4 className="name">{this.props.loginUser.enterpriseName|| '城乡结合部'}</h4>
                            <div>成员（{this.props.enterpriseTotal}人）</div>
                        </div>
                    </div>
                    <div className="operations">
                        <div className="oper-wrapper">
                            <Popover placement="bottom" content={filterPop}>
                                <Button><img className="icon vb mr6" src={filterIcon} alt=''/>筛选</Button>
                            </Popover>
                        </div>
                        <div className="search-wrapper">
                            <Input  prefix={<Icon type="search"/>}  placeholder='请输入关键字查询' 
                                suffix={this.state.searchName ? <Icon type="close-circle" onClick={this.emitEmptySearchName} /> : null}
                                onChange={e=>this.setState({searchName:e.target.value})}  value={this.state.searchName}
                                onPressEnter={this.searchHandler} />
                            <Button onClick={this.searchHandler}>查询</Button>
                        </div>
                    </div>
                </div>
                {this.props.selectedStaffList.length>0?<div className="batch-btns">
                    <Button onClick={this.appoint} size="small"><img src={appointIcon} className="icon" alt=''/>指定部门</Button>
                    {/* <Button size="small"><img src={deleteIcon} className="icon" alt=''/>删除员工</Button> */}
                </div>:null}
                <div className="datagrid-wrapper all-emp">
                    <Datagrid calSelect={true} tscale={this.state.tscale} tableHead={tHead} sourceData={pageData}/>
                </div>
                {this.props.employeese.total>0?<div className="pagenation-wrapper">
                    {/*自定义跳转到需要LocaleProvider，showQuickJumper*/}
                    <Pagination
                        defaultCurrent={this.props.employeese.currentPage} total={this.props.employeese.total} 
                        showTotal={()=>paginationTotal(this.props.employeese.total,this.props.employeese.currentPage)}
                        onChange={this.pageChange}/>
                </div>:null}
                {this.props.employeeModalState.staffDetailModalVisible?<Personal/>:null}
                {this.props.employeeModalState.setDeptModalVisible?<Appointmodal/>:null}
                {this.props.employeeModalState.delStaffModalVisible?<DSModal />:null}
                {this.props.employeeModalState.setDeptManagerModalVisible?<SDDModal/>:null}
                {this.props.employeeModalState.setBusManagerModalVisible?<SBMModal bool={this.state.sbmbool}/>:null}
                {this.props.employeeModalState.removeDeptManagerModalVisible?<RDMModal/>:null}
            </div>
        )
    }
}

export default Employee