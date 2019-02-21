import React from 'react'
import './employee.scss'

//部门管理员打开的员工列表
import deptIconPerson from 'static/images/dept-icon-person.svg'
import Datagrid from 'components/datagrid/datagrid'
import Pie from 'components/pie/pie'
import {Icon,Button,Input,Popover,Pagination,message,Avatar} from 'antd'
import {connect} from 'react-redux'
import {paginationTotal,getAvatar} from 'libs/common'
import {toggleModalState} from 'store/employeeModalReducer'
import {getStaffList} from 'store/staffReducer'
import {setCurrentDept} from 'store/deptReducer'
import Loadable from 'react-loadable'
const Personal = Loadable({loader: () => import('components/personal/personal'),loading() {return null}})
const ADDSModal = Loadable({loader: () => import('components/modals/addsmodal'),loading() {return null}})
const DSModal = Loadable({loader: () => import('components/modals/dsmodal'),loading() {return null}})
const SDMModal = Loadable({loader: () => import('components/modals/sdmmodal'),loading() {return null}})
const TDRModal = Loadable({loader: () => import('components/modals/tdrmodal'),loading() {return null}})
@connect(
    state=>{
        return{
            //当前登录用户信息
            loginUser:state.userReducer,
            //已选择的用户列表
            selectedStaffList:state.staffReducer.selectedStaffList,
            //弹框状态
            employeeModalState:state.employeeModalReducer,
            //当前部门
            currentDept:state.deptReducer.currentDept,
            //用户列表数据（包括当前currentPage，total，object用户列表，）
            employeese:state.staffReducer.staffData,
            deptList:state.deptReducer.deptList,
        }
    },
    {toggleModalState,getStaffList,setCurrentDept}
)
class Employee extends React.Component{
    constructor(props){
        super(props)
        this.state={
            //表格缩放比例
            tscale:1,
            //请求相关参数
            page:1,
            limit:30,
            searchName:'',
            deptId:'',
            //移除还是设置部门管理员
            sdmbool:true
        }
        this.getEmployees=this.getEmployees.bind(this)
        this.addStaff=this.addStaff.bind(this)
        this.staffDetail=this.staffDetail.bind(this)
        this.delStaff=this.delStaff.bind(this)
        this.toggleDeptDirect=this.toggleDeptDirect.bind(this)
        this.transferRight=this.transferRight.bind(this)
        this.searchHandler=this.searchHandler.bind(this)
        this.emitEmptySearchName=this.emitEmptySearchName.bind(this)
    }
    componentWillMount(){
        let ah=window.screen.availHeight
        console.log(ah)
        if(ah>900){
            this.setState({scale:1})
        }else if(ah<900&&ah>800){
            this.setState({tscale:0.88})
        }else if(ah<800&&ah>700){
            this.setState({tscale:0.70})
        }else{
            this.setState({tscale:0.65})
        }
        if(this.props.currentDept){
            this.getEmployees({deptId:this.props.currentDept.departmentId})
        }
    }
    componentWillReceiveProps(np){
        let tp=this.props
        //点击进入另一个部门
        const anotherDept=tp.currentDept && np.currentDept　&& tp.currentDept.departmentId!==np.currentDept.departmentId
        if(anotherDept){
            this.getEmployees({deptId:np.currentDept.departmentId})
        }
        //部门管理员第一次进入管理后台，展开第一个部门
        if(tp.loginUser.userRole!=='' && !tp.currentDept && !np.currentDept){
            //只有一个部门，自己是主管，自己把自己移除了
            if(np.deptList && np.deptList.length>0){
                tp.setCurrentDept(np.deptList[0])
                this.getEmployees(np.deptList[0].departmentId)
            }
        }
        //删除部门之后重新获取员工列表
        if(tp.currentDept && tp.currentDept!==np.currentDept){
            this.getEmployees({deptId:np.currentDept.departmentId})
        }
        if(!tp.currentDept && np.currentDept){
            this.getEmployees({deptId:np.currentDept.departmentId})
        }
    }
    componentDidMount(){
    }
    //设置或者移除部门主管
    toggleDeptDirect(bool){
        console.log(bool)
        this.setState({sdmbool:bool})
        this.props.toggleModalState('SET_DEPT_MANAGER',true)
    }
    //获取员工列表
    getEmployees(obj){
        let p={
            page:this.state.page,
            limit:this.state.limit,
            searchName:this.state.searchName,
            //当前部门ID
            deptId:this.props.currentDept?this.props.currentDept.departmentId:0
        }
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
    delStaff(e){
        if(e.target.className==='del-staff-btn'){
            this.props.toggleModalState('DEL_STAFF',true)
        }
    }
    staffDetail(e){
        //阻止冒泡的一种方式
        if(e.target.className.indexOf('sd-class')>-1){
            this.props.toggleModalState('STAFF_DETAIL',true)
        }
    }
    
    transferRight(){
        this.props.toggleModalState('TRANSFER_D_RIGHT',true)
    }
    addStaff(){
        this.props.toggleModalState('ADD_STAFF',true)
    }
    render(){
        const tHead=[{
            title:"员工",
            dataIndex:'name',
            render:text=><div className="cp">{text}</div>
        },{
            title:"所在部门",
            dataIndex:'dept',
        },{
            title:"容量",
            dataIndex:'capa',
        },{
            title:"手机号",
            dataIndex:'phone',
        },{
            title:"邮箱",
            dataIndex:'email',
        }]
        let pageData=this.props.employeese.object && this.props.employeese.object.length!==0?this.props.employeese.object.map(employee=>{
            let deptList=employee.departments.length>0?employee.departments.map((d,i)=>{
                return i>0 ?`、${d.name}`:d.name
            }):'待分配'
            //dept manage boolean(是否是当前部门部门主管)
            //dept director boolean(是否是当前部门部门管理员)
            //business manage boolean(是否是当前企业管理员)
            let  dmbool,bmbool,ddbool
            if(employee.userRoleInfos.length>0){
                dmbool= employee.userRoleInfos.some((u)=>{
                    return u.departmentId===this.props.currentDept.departmentId && u.roleName==='DEPT_MANAGER'
                })
                ddbool= employee.userRoleInfos.some((u)=>{
                    return u.departmentId===this.props.currentDept.departmentId && u.roleName==='DEPT_DIRECTOR'
                })
                bmbool= employee.userRoleInfos.some((u)=>{
                    return u.roleName==='ENTERPRISE_MANAGER'
                })
            }
            return {
                key: employee.userId,
                name: <div className="tr-content sd-class" onClick={this.staffDetail}>
                        <div>
                            <Avatar src={getAvatar(employee.cloudUserId)}></Avatar>
                            <span className="ml8">{employee.name}</span>
                            {/**显示角色（部门主管，企业管理员） */}
                            {bmbool?<span  className="ml6 role-tip">企业管理员</span>:null}
                            {dmbool?<span  className="ml6 role-tip">部门管理员</span>:null}
                            {ddbool?<span  className="ml6 role-tip">部门主管</span>:null}
                        </div>
                        {/**企业管理者不能操作？，就是这样 */}
                        {this.props.loginUser.userRole==="enterprise"?null:<Popover placement="leftTop" content={
                            <div className="cp">
                                {/**部门主管不能被设置为部门管理员 */}
                                {!ddbool?(dmbool?(<p onClick={()=>this.toggleDeptDirect(false)}>移除部门管理员</p>):(<p onClick={()=>this.toggleDeptDirect(true)}>设为部门管理员</p>)):null}
                                {/* 部门管理员没有移交的权限 */}
                                {dmbool || ddbool?null:<p onClick={this.transferRight}>移交部门主管</p>}
                                {/**企业管理员不能移除自己，只能通过权限移交 */}
                                {/* {bmbool?null:<p className="del-staff-btn" onClick={this.delStaff}>移除员工</p>} */}
                                <p className="del-staff-btn" onClick={this.delStaff}>移除员工</p>
                            </div>
                        }><Icon style={{display:'flex',alignItems:'center',fontSize: '20px'}} type="dash" /></Popover>}
                    </div>,
                dept: <div className="ellipsis cp deptList sd-class" onClick={this.staffDetail} title={deptList}>{deptList}</div>,
                capa: <div>已用{employee.spaceUsed}/共{employee.spaceTotal}G</div>,
                phone: employee.mobile || '未绑定',
                email: employee.email || '未绑定',
            }
        }):[]
        
        return(
            <div className="dept-data-wrapper">
                <div className="toolbar">
                    <div className="dept-name-count">
                        <div className="icon-wrapper">
                            {this.props.currentDept?<Pie
                            pieData={[
                                {value:this.props.currentDept.departmentPicSpaceUsed},
                                {value:this.props.currentDept.departmentSpaceTotal-this.props.currentDept.departmentPicSpaceUsed}
                            ]} pw={60} ph={60} title={''}  />:<img alt='' src={deptIconPerson}/>}
                        </div>
                        <div className="name-count">
                            <h4  className="name">
                                {this.props.currentDept?this.props.currentDept.name:'未定义'}
                                （共{this.props.employeese.total}人）
                            </h4>
                            <div>{this.props.currentDept?`已使用${this.props.currentDept.departmentSpaceUsed}/共${this.props.currentDept.departmentSpaceTotal}G`:`已使用0G/共0G`}</div>
                        </div>
                    </div>
                    <div className="operations">
                        <div className="oper-wrapper">
                            <Button onClick={this.addStaff}>添加员工</Button>
                        </div>
                        <div className="search-wrapper">
                            <Input prefix={<Icon type="search"/>} placeholder='请输入关键字查询'
                            suffix={this.state.searchName ? <Icon type="close-circle" onClick={this.emitEmptySearchName} /> : null}
                            onChange={e=>this.setState({searchName:e.target.value})}  value={this.state.searchName}
                            onPressEnter={this.searchHandler}/>
                            <Button onClick={this.searchHandler}>查询</Button>
                        </div>
                    </div>
                </div>
                {/* {this.props.selectedStaffList.length>0?<div className="batch-btns">
                    <Button onClick={this.delStaff} size="small"><img src={deleteIcon} className="icon" alt=''/>删除员工</Button>
                </div>:null} */}
                <div className="datagrid-wrapper demp">
                    <Datagrid calSelect={false} tscale={this.state.tscale} tableHead={tHead} sourceData={pageData}/>
                </div>
                {this.props.employeese.total>0?<div className="pagenation-wrapper">
                    {/*自定义跳转到需要LocaleProvider，showQuickJumper*/}
                    <Pagination
                        defaultCurrent={this.props.employeese.currentPage} total={this.props.employeese.total} 
                        showTotal={()=>paginationTotal(this.props.employeese.total,this.props.employeese.currentPage)}
                        onChange={this.pageChange}/>
                </div>:null}
                {/**一些模态框 */}
                {this.props.employeeModalState.staffDetailModalVisible?<Personal/>:null}
                {this.props.employeeModalState.addStaffModalVisible?<ADDSModal/>:null}
                {/* 传入当前部门id */}
                {this.props.employeeModalState.delStaffModalVisible?<DSModal />:null}
                {this.props.employeeModalState.setDeptManagerModalVisible?<SDMModal bool={this.state.sdmbool}/>:null}
                {this.props.employeeModalState.transferDRightModalVisible?<TDRModal trType={'DEPT_DIRECTOR'} mtitle={'移交部门主管权限'}/>:null}
            </div>
        )
    }
}

export default Employee