import React from 'react'
import {Link,withRouter} from 'react-router-dom'
import './menubar.scss'
import {Menu,Icon} from 'antd'
import addIcon from 'static/images/add-icon.svg'
import staffIcon from 'static/images/staff-icon.svg'
import capacityIcon from 'static/images/capacity-icon.svg'
import deptIcon from 'static/images/dept-icon.svg'
import mvUserIcon from 'static/images/mv-user-icon.svg'
import {connect} from 'react-redux'
import CDModal from 'components/modals/cdmodal'
import TBRModal from 'components/modals/tbrmodal'
import {toggleModalState} from 'store/employeeModalReducer'
import {setCurrentDept,getDeptList} from 'store/deptReducer'

const SubMenu=Menu.SubMenu
const MenuItem=Menu.Item
const MenuItemGroup=Menu.ItemGroup

@connect(
    state=>{
        return{
            loginUser:state.userReducer,
            ...state.deptReducer,
            employeeModalState:state.employeeModalReducer
        }
    },
    {getDeptList,toggleModalState,setCurrentDept}
)
@withRouter
class Menubar extends React.Component{
    constructor(props){
        super(props)
        this.state={
            //currentDept和deptList是否存在
            cdAnddlbool:false,
            menuSelectedKeys:'',
            menuOpenKeys:''
        }
        this.createDept=this.createDept.bind(this)
        this.rightTransfer=this.rightTransfer.bind(this)
        this.selectDept=this.selectDept.bind(this)
    }
    //点击部门名称，进入部门详情（也就是部门人员列表）
    selectDept(dept){
        if(dept.key==='depts'){
            //点击部门管理submenu(默认就不点击子menu了)
            this.state.menuOpenKeys==='' || this.state.menuOpenKeys.indexOf('deptless')>-1?this.setState({menuOpenKeys:'depts'}):this.setState({menuOpenKeys:''})
        }else if(dept.key.indexOf("deptless")===-1){
            //点击部门列表
            let cd=this.props.deptList.filter((d)=>{
                //dept.key是string，d.departmentId是number
                return dept.key==d.departmentId
            })
            this.props.setCurrentDept(cd[0])
            this.setState({menuOpenKeys:'depts'})
        }else{
            //点击人员管理和容量管理
            this.setState({menuSelectedKeys:dept.key})
            this.setState({menuOpenKeys:dept.key})
        }
    }
    componentDidMount(){
        //第一次加载的时候
        if(!this.props.deptList && this.props.loginUser.userRole!==''){
            this.props.getDeptList({type:this.props.loginUser.userRole})
        }
    }
    componentDidUpdate(){
        //console.log(this.props)
    }
    componentWillReceiveProps(nextProps){
        const tp=this.props
        // console.log(tp)
        // console.log(nextProps)
        this.setState({cdAnddlbool:nextProps.deptList!==null&& nextProps.deptList.length>0 && nextProps.currentDept!==null})
        if(tp.loginUser.userRole==='' && nextProps.loginUser.userRole!==''){
            tp.getDeptList({type:nextProps.loginUser.userRole})
        }
        if(!tp.currentDept && nextProps.currentDept){
            // console.log('第一次进入部门列表')
            this.setState({menuSelectedKeys:nextProps.currentDept.departmentId+''})
            nextProps.setCurrentDept(nextProps.currentDept)
            this.setState({menuOpenKeys:'depts'})
        }else if(tp.currentDept && nextProps.currentDept && tp.currentDept.departmentId!==nextProps.currentDept.departmentId){
            // console.log('切换部门列表')
            this.setState({menuSelectedKeys:nextProps.currentDept.departmentId+''})
            nextProps.setCurrentDept(nextProps.currentDept)
        }else if(!nextProps.currentDept && nextProps.deptList && nextProps.deptList.length>0){
            // console.log('部门主管刷新时')
            this.setState({menuSelectedKeys:nextProps.deptList[0].departmentId+''})
            nextProps.setCurrentDept(nextProps.deptList[0])
            this.setState({cdAnddlbool:true})
            this.setState({menuOpenKeys:'depts'})
        }
        if(tp.deptList && tp.deptList.length!==nextProps.deptList.length && nextProps.deptList.length>0){
            // console.log('删除部门之后打开第一个menu')
            this.setState({menuSelectedKeys:nextProps.deptList[0].departmentId+''})
            nextProps.setCurrentDept(nextProps.deptList[0])
        }
        
    }
    //创建部门
    createDept(){
        this.props.toggleModalState('CREATE_DEPT',true)
    }

    rightTransfer(){
        this.props.toggleModalState('TRANSFER_B_RIGHT',true)
    }
    render(){
        return(
            <div className="menubar">
                <div className="role">{this.props.loginUser.userRole==='department'?'部门管理':'企业管理'}</div>
                {/**企业管理menu 和部门管理menu，默认打开第一个部门 */}
                {this.props.loginUser.userRole==='enterprise'?
                <div>
                    <Menu mode="inline" theme="light" openKeys={[this.state.menuOpenKeys]} selectedKeys={[this.state.menuSelectedKeys]}>
                        {this.state.cdAnddlbool?(
                            <SubMenu onTitleClick={params=>this.selectDept(params)}  key="depts" title={<span><img alt='' className="icon" src={deptIcon}/>部门管理</span>}>
                                {<MenuItemGroup key="d1">
                                    {this.props.deptList.map((d,i)=>{
                                        //return <MenuItem onClick={params=>this.selectDept(params)} key={d.departmentId}>{d.name}</MenuItem>
                                        return (<MenuItem onClick={params=>this.selectDept(params)} key={d.departmentId}>
                                            <Link to={{pathname:`/manage`}}>{d.name}</Link></MenuItem>)
                                        // return (<MenuItem onClick={params=>this.selectDept(params)} key={d.departmentId}>
                                        //     <Link to={`/manage/${d.departmentId}`}>{d.name}</Link></MenuItem>)
                                    })}
                                    
                                </MenuItemGroup>}
                            </SubMenu>
                        ):null}
                        <MenuItem onClick={params=>this.selectDept(params)} key="deptless-1"><Link to={`/manage/eall`}>
                            <img alt='' className="mr6" src={staffIcon}/>人员管理</Link>
                        </MenuItem>
                        <MenuItem onClick={params=>this.selectDept(params)} key="deptless-2"><Link to={`/manage/capacity`}>
                            <img alt=''  className="mr6" src={capacityIcon}/>容量管理</Link>
                        </MenuItem>
                    </Menu>
                    <div className="menu-dark"></div>
                    <div className="menu-btns">
                        <li onClick={this.createDept} className="btn cp"><img alt='' src={addIcon}/>创建部门</li>
                        <li onClick={this.rightTransfer}  className="btn cp"><img alt='' src={mvUserIcon}/>权限移交</li>
                    </div>
                </div>:(
                    this.state.cdAnddlbool?<Menu mode="inline" theme="light" openKeys={[this.state.menuOpenKeys]} selectedKeys={[this.state.menuSelectedKeys]}>
                    <SubMenu   key="depts" title={<span><img alt='' className="icon" src={deptIcon}/>部门管理</span>}>
                        <MenuItemGroup key="d1">
                            {this.props.deptList.map((d,i)=>{
                                return <MenuItem onClick={params=>this.selectDept(params)} key={d.departmentId}>{d.name}</MenuItem>
                                // return (<MenuItem onClick={params=>this.selectDept(params)} key={d.departmentId}>
                                //     <Link to={{pathname:'/manage',query:{deptId:d.departmentId}}}>{d.name}</Link></MenuItem>)
                            })}
                        </MenuItemGroup>
                    </SubMenu>
                </Menu>:<div>暂无任何部门</div>)
            }
                {this.props.employeeModalState.createDeptModalVisible?<CDModal/>:null}
                {this.props.employeeModalState.transferBRightModalVisible?<TBRModal trType={'ENTERPRISE_MANAGER'} mtitle={'移交企业管理员权限'}/>:null}
            </div>
        )
    }
}
export default Menubar