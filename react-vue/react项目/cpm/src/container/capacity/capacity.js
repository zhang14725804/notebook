import React from 'react' 
import Pie from 'components/pie/pie'
import filterIcon from 'static/images/filter-icon.svg'
import editIcon from 'static/images/edit-icon.svg'
import {Icon,Button,Input,Popover,Pagination,Avatar,Select } from 'antd'
import {connect} from 'react-redux'
import {getStaffList} from 'store/staffReducer'
import {getDeptList} from 'store/deptReducer'
import {paginationTotal,getAvatar} from 'libs/common'
import {toggleCapaModalState,selectDeptfn,searchAll} from 'store/capaReducer'
import {toggleModalState} from 'store/employeeModalReducer'
import './capacity.scss'
import Loadable from 'react-loadable'
const Datagrid = Loadable({loader: () => import('components/datagrid/datagrid'),loading() {return null}})
const ULCModal = Loadable({loader: () => import('components/capamodals/ulcmodal'),loading() {return null}})
const UDCModal = Loadable({loader: () => import('components/capamodals/udcmodal'),loading() {return null}})
const UECModal = Loadable({loader: () => import('components/capamodals/uecmodal'),loading() {return null}})
const UOCModal = Loadable({loader: () => import('components/capamodals/uocmodal'),loading() {return null}})
const SECModal = Loadable({loader: () => import('components/capamodals/secmodal'),loading() {return null}})
const Personal = Loadable({loader: () => import('components/personal/personal'),loading() {return null}})

@connect(
    state=>{
        return{
            loginUser:state.userReducer,
            selectedStaffList:state.staffReducer.selectedStaffList,
            activePerson:state.staffReducer.activePerson,
            employeese:state.staffReducer.staffData,
            enterpriseTotal:state.staffReducer.enterpriseTotal,
            deptData:state.deptReducer,
            capaModalState:state.capaReducer,
            sumaryCapacity:state.capaReducer.sumaryCapacity,
            employeeModalState:state.employeeModalReducer,
        }
    },
    {getStaffList,getDeptList,toggleCapaModalState,selectDeptfn,searchAll,toggleModalState}
)
class Capacity extends React.Component{
    constructor(props){
        super(props)
        this.state={
            //企业文库、员工、部门容量使用情况echarts缩放量
            escale:1,
            //各个部门(dept)容量列表缩放量
            dscale:1,
            //表格缩放比例
            tscale:1,
            isAllocation:'',//已分配未分配
            page:1,
            limit:30,
            searchName:'',
            deptId:0
        }

        this.filterEm=this.filterEm.bind(this)
        this.handleSelectChange=this.handleSelectChange.bind(this)
        this.searchHandler=this.searchHandler.bind(this)
        this.emitEmptySearchName=this.emitEmptySearchName.bind(this)
        this.updateLibsCapa=this.updateLibsCapa.bind(this)
        this.updateEmployeeCapa=this.updateEmployeeCapa.bind(this)
        this.updateOneCapa=this.updateOneCapa.bind(this)
        this.updateDeptCapa=this.updateDeptCapa.bind(this)
        this.setEveryEmpCapa=this.setEveryEmpCapa.bind(this)
        this.staffDetail=this.staffDetail.bind(this)
    }
    componentWillMount(){
        let ah=window.screen.availHeight
        //大屏幕1040 15.4寸824   mac812
        if(ah>900){
            this.setState({escale:0.95})
            this.setState({dscale:0.88})
            this.setState({tscale:0.58})
        }else if(ah<900&&ah>800){
            this.setState({escale:0.88})
            this.setState({dscale:0.85})
            this.setState({tscale:0.45})
        }else if(ah<800&&ah>700){
            this.setState({escale:0.70})
            this.setState({dscale:0.85})
            this.setState({tscale:0.45})
        }
        this.props.searchAll()
        this.getEmployees()
    }
    //过滤条件（全部员工，已分配，未分配）
    filterEm(w){
        this.setState({isAllocation:w})
        this.getEmployees({isAllocation:w})
    }
    handleSelectChange(deptId){
        this.setState({deptId:deptId})
        this.getEmployees({deptId:deptId})
    }
    //获取员工列表
    getEmployees(obj){
        let p={
            isAllocation:this.state.isAllocation,
            page:this.state.page,
            limit:this.state.limit,
            searchName:this.state.searchName,
            deptId:this.state.deptId
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
    componentWillReceiveProps(nextProps) {
        //获取部门列表
        if(nextProps.loginUser.userRole!=='' && !nextProps.deptData.deptList){
            nextProps.getDeptList({type:nextProps.loginUser.userRole})
        }
        // console.log(nextProps)
    }
    componentDidUpdate(){
        //console.log(this.props)
    }
    staffDetail(e){
        //阻止冒泡的一种方式
        if(e.target.className.indexOf('sd-class')>-1){
            this.props.toggleModalState('STAFF_DETAIL',true)
        }
    }
    updateLibsCapa(){
        this.props.toggleCapaModalState('UPDATE_LIBS_CAPA',true)
    }
    updateEmployeeCapa(){
        this.props.toggleCapaModalState('SET_EMP_CAPA',true)
    }
    updateOneCapa(){
        this.props.toggleCapaModalState('SET_ONE_CAPA',true)
    }
    updateDeptCapa(dept){
        this.props.selectDeptfn(dept)
        this.props.toggleCapaModalState('UPDATE_DEPT_CAPA',true)
    }
    setEveryEmpCapa(){
        this.props.toggleCapaModalState('SET_EVERY_CAPA',true)
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
            title:"容量",
            dataIndex:'capa',
        }]
        let pageData=this.props.employeese.length!==0?this.props.employeese.object.map(employee=>{
            let deptList=employee.departments.length>0?employee.departments.map((d,i)=>{
                return i>0 ? '、'+d.name:d.name
            }):'未分配部门'
            return {
                key: employee.userId,
                name: <div className="tr-content sd-class" onClick={this.staffDetail}>
                        <div>
                            <Avatar src={getAvatar(employee.cloudUserId)}></Avatar>
                            <span className="ml8">{employee.name}</span>
                        </div>
                        <div></div>
                    </div>,
                dept: <div className="ellipsis cp sd-class" onClick={this.staffDetail} title={deptList}>{deptList}</div>,
                capa: <div onClick={this.updateOneCapa}  className="cp">已用{employee.spaceUsed}/共{employee.spaceTotal}G<img className='ml4' src={editIcon} alt=''/></div>,
            }
        }):[]
        let {deptData,sumaryCapacity} = this.props
        return(
            <div>
                <div className="total-toolbar">
                    {sumaryCapacity?<div className="total">
                        <div className="icon-wrapper">
                            <Pie pw={60} ph={60} title={''} 
                                pieData={[{value:sumaryCapacity.enterpriseQuota-sumaryCapacity.residuePicQuota},
                                {value:sumaryCapacity.residuePicQuota}]}/>
                        </div>
                        <div className="name-count">
                            <h4 className="name">{this.props.loginUser.enterpriseName}（共{this.props.enterpriseTotal}人）</h4>
                            <div className="count">已使用{sumaryCapacity.enterpriseQuota-sumaryCapacity.residuePicQuota}G/共{sumaryCapacity.enterpriseQuota}G</div>
                        </div>
                    </div>:null}
                    <div className="toolbar">
                        <Select className="mr6" defaultValue="所有部门" style={{ width: 220 }} onChange={this.handleSelectChange}>
                            <Select.Option key={111} value={0}>所有部门</Select.Option>
                            {deptData.deptList && deptData.deptList.length>0?deptData.deptList.map((d,i)=>{
                                return <Select.Option key={i} value={d.departmentId}>{d.name}</Select.Option>
                            }):null}
                        </Select>
                        <Popover className="mr6" placement="bottom" content={filterPop}>
                            <Button><img className="icon" src={filterIcon} alt=''/>筛选</Button>
                        </Popover>
                        <Input prefix={<Icon type="search"/>} placeholder='请输入关键字查询' 
                        suffix={this.state.searchName ? <Icon type="close-circle" onClick={this.emitEmptySearchName} /> : null}
                        onChange={e=>this.setState({searchName:e.target.value})}  value={this.state.searchName}
                        onPressEnter={this.searchHandler}/>
                        <Button onClick={this.searchHandler}>查询</Button>
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="sum-staff">
                        {/**总量概述 */}
                        {sumaryCapacity?<div className="sum-wrapper">
                            {/**企业容量 */}
                            <div className="pie-wrapper">
                                <Pie pw={this.state.escale*150} ph={this.state.escale*150} title={'剩余容量'}
                                pieData={[{value:sumaryCapacity.enterpriseQuota-sumaryCapacity.residuePicQuota},
                                    {value:sumaryCapacity.residuePicQuota}]}/>
                                <div  className="desc cp">剩余{sumaryCapacity.residueQuota}/共{sumaryCapacity.enterpriseQuota}G</div>
                            </div>
                            {/**企业文库 */}
                            <div className="pie-wrapper">
                                <Pie pw={this.state.escale*150} ph={this.state.escale*150} title={'企业文库'}
                                pieData={[{value:sumaryCapacity.libraryPicUsedQuota},
                                {value:sumaryCapacity.libraryQuota-sumaryCapacity.libraryPicUsedQuota}]}/>
                                <div onClick={this.updateLibsCapa} className="desc cp">已使用{sumaryCapacity.libraryUsedQuota}/共{sumaryCapacity.libraryQuota}G<img  className='ml4' src={editIcon} alt=''/></div>
                            </div>
                            {/**员工容量 */}
                            <div className="pie-wrapper">
                                <Pie pw={this.state.escale*150} ph={this.state.escale*150} title={'员工容量'}
                                pieData={[{value:sumaryCapacity.personalPicUsedQuota},
                                {value:sumaryCapacity.personalQuota-sumaryCapacity.personalPicUsedQuota}]}/>
                                <div className="desc">已使用{sumaryCapacity.personalUsedQuota}/共{sumaryCapacity.personalQuota}G</div>
                            </div>
                            {/**部门容量 */}
                            <div className="pie-wrapper">
                                <Pie pw={this.state.escale*150} ph={this.state.escale*150} title={'部门容量'}
                                pieData={[{value:sumaryCapacity.departmentPicUsedQuota},
                                {value:sumaryCapacity.departmentQuota-sumaryCapacity.departmentPicUsedQuota}]}/>
                                <div className="desc">已使用{sumaryCapacity.departmentUsedQuota}/共{sumaryCapacity.departmentQuota}G</div>
                            </div>
                        </div>:null}
                        {/**员工容量*/}
                        <div className="staff-wrapper">
                            <div className="datagrid-wrapper capa-emp">
                                <Datagrid customHeader={()=>{return <div className="batch-wrapper">
                                        {this.props.selectedStaffList.length>0?<Button onClick={this.updateEmployeeCapa} size='small'>修改容量</Button>:<Button onClick={this.setEveryEmpCapa} size='small'>修改人均容量</Button>}
                                    </div>}} 
                                    tableSize={this.state.escale<0.9?'small':'defalut'}
                                    calSelect={true} tscale={this.state.tscale} tableHead={tHead} sourceData={pageData}/>
                            </div>
                            {this.props.employeese.total>0?<div className="pagenation-wrapper">
                                {/*自定义跳转到需要LocaleProvider，showQuickJumper*/}
                                <Pagination
                                    defaultCurrent={this.props.employeese.currentPage} total={this.props.employeese.total} 
                                    showTotal={()=>paginationTotal(this.props.employeese.total,this.props.employeese.currentPage)}
                                    onChange={this.pageChange}/>
                            </div>:null}
                        </div>
                    </div>
                    {/**部门容量*/}
                    <div className="dept-sum" >
                        <h3 className="title">部门容量使用详情</h3>
                        <div className="depts-wrapper" style={{maxHeight:`${this.state.dscale*76}vh`}}>
                            {deptData.deptList?deptData.deptList.map(d=>{
                                return(
                                    <div key={d.departmentId} className="dept-item">
                                        <div className="total">
                                            <div className="icon-wrapper">
                                                <Pie pw={60} ph={60} title={''} 
                                                 pieData={[{value:d.departmentPicSpaceUsed},{value:d.departmentSpaceTotal-d.departmentPicSpaceUsed}]}/>
                                            </div>
                                            <div className="name-count">
                                                <h4 className="name">{d.name}(共{d.subEmployees}人)</h4>
                                                <div className="count">已使用{d.departmentSpaceUsed}/共{d.departmentSpaceTotal}G</div>
                                            </div>
                                        </div>
                                        <Button onClick={()=>this.updateDeptCapa(d)} type="primary" size='small'>修改</Button>
                                    </div>
                                )
                            }):null}
                        </div>
                    </div>
                </div>
                {this.props.employeeModalState.staffDetailModalVisible?<Personal/>:null}
                {this.props.capaModalState.updateLibsCapaModalShow?<ULCModal/>:null}
                {this.props.capaModalState.updateDeptCapaModalShow?<UDCModal/>:null}
                {this.props.capaModalState.setEveryCapaModalShow?<SECModal/>:null}
                {this.props.capaModalState.setEmpCapaModalShow?<UECModal/>:null}
                {this.props.capaModalState.setOneCapaModalShow?<UOCModal/>:null}
            </div>
        )
    }
}
export default Capacity