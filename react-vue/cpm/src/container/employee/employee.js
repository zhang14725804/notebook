import React from 'react'
import './employee.scss'

//企业管理者对应的部门列表
import deptIconPerson from 'static/images/dept-icon-person.svg'
import editIcon from 'static/images/edit-icon.svg'
//import deleteIcon from 'static/images/delete-icon.svg'
import Datagrid from 'components/datagrid/datagrid'
import {Icon,Button,Input,Popover,Pagination,Avatar,Modal} from 'antd'
import {connect} from 'react-redux'
import {paginationTotal,getAvatar} from 'libs/common'
import {toggleModalState} from 'store/employeeModalReducer'
import {getStaffList} from 'store/staffReducer'
import {setCurrentDept} from 'store/deptReducer'
import Loadable from 'react-loadable'
const Personal = Loadable({loader: () => import('components/personal/personal'),loading() {return null}})
const DDModal = Loadable({loader: () => import('components/modals/ddmodal'),loading() {return null}})
const DSModal = Loadable({loader: () => import('components/modals/dsmodal'),loading() {return null}})
const SDDModal = Loadable({loader: () => import('components/modals/sddmodal'),loading() {return null}})
const UDNModal = Loadable({loader: () => import('components/modals/udnmodal'),loading() {return null}})
const ADDSModal = Loadable({loader: () => import('components/modals/addsmodal'),loading() {return null}})
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
        }
        this.getEmployees=this.getEmployees.bind(this)
        this.deleteDept=this.deleteDept.bind(this)
        this.setManager=this.setManager.bind(this)
        this.staffDetail=this.staffDetail.bind(this)
        this.delStaff=this.delStaff.bind(this)
        this.updatedn=this.updatedn.bind(this)
        this.searchHandler=this.searchHandler.bind(this)
        this.emitEmptySearchName=this.emitEmptySearchName.bind(this)
        this.addStaff=this.addStaff.bind(this)
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
    //object nextProps, object nextState
    componentWillUpdate(np,ns){ } 
    //shouldComponentUpdate(){}
    componentWillReceiveProps(np){
        let tp=this.props
        // console.log(tp)
        // console.log(np)
        //点击进入另一个部门
        const anotherDept=tp.currentDept && np.currentDept　&& tp.currentDept.departmentId!==np.currentDept.departmentId
        if(anotherDept){
            this.getEmployees({deptId:np.currentDept.departmentId})
        }
        //部门管理员第一次进入管理后台，展开第一个部门
        if(tp.loginUser.userRole!=='' && !tp.currentDept && np.currentDept){
            //只有一个部门，自己是主管，自己把自己移除了
            if(np.deptList && np.deptList.length>0){
                tp.setCurrentDept(np.deptList[0])
                this.getEmployees({deptId:np.deptList[0].departmentId})
            }
        }
    }
    updatedn(){
        this.props.toggleModalState('UPDATE_DEPT_NAME',true)
    }
    //获取员工列表
    getEmployees(obj){
        let p={
            page:this.state.page,
            limit:this.state.limit,
            searchName:this.state.searchName.trim(),
            //当前部门ID
            deptId:this.props.currentDept?this.props.currentDept.departmentId:0
        }
        let params=obj?Object.assign(p,obj):p
        this.props.getStaffList(params)
    }
    //查询员工
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
        if(e.target.className.indexOf('tr-content')>-1){
            this.props.toggleModalState('STAFF_DETAIL',true)
        }
    }
    addStaff(){
        this.props.toggleModalState('ADD_STAFF',true)
    }
    deleteDept(){
        //只能删除没有员工的部门（不合理，极其不合理）
        if(this.props.currentDept.subEmployees>0){

            Modal.confirm({
                title: '无法删除',
                centered:true,
                content: '当部门没有任何员工时才可以删除部门',
                okText:'确定',
                cancelText:'取消',
                onOk() {},
                onCancel() {},
            })
        }else{
            this.props.toggleModalState('DELETE_DEPT',true)
        }
    }
    
    setManager(){
        this.props.toggleModalState('SET_DEPT_MANAGER',true)
    }
    render(){
        const popoverContent=(
            <div className="cp">
                <p>设为部门管理员</p>
                <p>移除部门管理员</p>
                <p>移交部门主管</p>
                <p className="del-staff-btn" onClick={this.delStaff}>移除员工</p>
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
            let deptList=employee.departments.length>0?employee.departments.map((d,i)=>{
                return i>0 ?`、${d.name}`:d.name
            }):'待分配'
            //dept manage boolean(是否是当前部门部门主管)
            //business manage boolean(是否是当前企业管理员)
            let  dmbool,bmbool
            if(employee.userRoleInfos.length>0){
                dmbool= employee.userRoleInfos.some((u)=>{
                    return u.departmentId===this.props.currentDept.departmentId
                })
                bmbool= employee.userRoleInfos.some((u)=>{
                    return u.roleName==='ENTERPRISE_MANAGER'
                })
            }
            return {
                key: employee.userId,
                name: <div className="tr-content" onClick={this.staffDetail}>
                        <div>
                            <Avatar src={getAvatar(employee.cloudUserId)}></Avatar>
                            <span className="ml8">{employee.name}</span>
                            {/**显示角色（部门主管，企业管理员） */}
                            {bmbool?<span  className="ml6 role-tip">企业管理员</span>:null}
                            {dmbool?<span  className="ml6 role-tip">部门主管</span>:null}
                        </div>
                        {/**企业管理者不能操作？，就是这样 */}
                        {this.props.loginUser.userRole==="enterprise"?null:<Popover placement="leftTop" content={popoverContent}><Icon style={{display:'flex',alignItems:'center',fontSize: '20px'}} type="dash" /></Popover>}
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
                            <img alt='' src={deptIconPerson}/>
                        </div>
                        <div className="name-count">
                            <h4 onClick={this.updatedn} className="name cp">
                                {this.props.currentDept?this.props.currentDept.name:'未定义'}
                                <img className="ml4" src={editIcon} alt=''/>
                            </h4>
                            <div>成员（{this.props.currentDept?this.props.currentDept.subEmployees:0}人）</div>
                        </div>
                    </div>
                    <div className="operations">
                        <div className="oper-wrapper">
                            <Button onClick={this.addStaff}>添加员工</Button>
                            <Button onClick={this.deleteDept}>删除部门</Button>
                            <Button onClick={this.setManager}>指定部门主管</Button>
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
                <div className="datagrid-wrapper dept-emp">
                    <Datagrid calSelect={false} tscale={this.state.tscale} tableHead={tHead} sourceData={pageData}/>
                </div>
                {this.props.employeese.total>0?<div className="pagenation-wrapper">
                    {/*自定义跳转到需要LocaleProvider，showQuickJumper*/}
                    <Pagination
                        defaultCurrent={this.props.employeese.currentPage} total={this.props.employeese.total} 
                        showTotal={()=>paginationTotal(this.props.employeese.total,this.props.employeese.currentPage)}
                        onChange={this.pageChange} />
                </div>:null}
                {/**一些模态框 */}
                {this.props.employeeModalState.deleteDeptModalVisible?<DDModal/>:null}
                {this.props.employeeModalState.staffDetailModalVisible?<Personal/>:null}
                {this.props.employeeModalState.addStaffModalVisible?<ADDSModal/>:null}
                {/* 传入当前部门id */}
                {this.props.employeeModalState.delStaffModalVisible?<DSModal />:null}
                {this.props.employeeModalState.setDeptManagerModalVisible?<SDDModal/>:null}
                {this.props.employeeModalState.updateDeptNameModalVisible?<UDNModal/>:null}
            </div>
        )
    }
}

export default Employee