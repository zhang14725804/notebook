import React from 'react'
import {Table} from 'antd'
import {connect} from 'react-redux'
import {togglePersonal,selectedStaff} from 'store/staffReducer'
import emptyIcon from 'static/images/empty-icon.svg'
import './datagrid.scss'
@connect(
    state=>{
        return{
            employeese:state.staffReducer.staffData.object,
            selectedStaffList:state.staffReducer.selectedStaffList
        }
    },
    {togglePersonal,selectedStaff}
)
class Datagrid extends React.Component{
    componentWillReceiveProps(np){
        //console.log(np)
    }
    render(){
        const emptyStyle={
            height:`${this.props.tscale*70}vh`,
            display:'flex',
            alignItems:'center',
            justifyContent:'center'
        }
        const empty=(
            <div style={emptyStyle}>
                <div>
                    <img alt='' src={emptyIcon}/>
                    <p>暂无数据</p>
                </div>
            </div>
        )
        const rowSelection={
            //操作选中状态
            selectedRowKeys:this.props.selectedStaffList.length>0?this.props.selectedStaffList.map(ss=>{
                return ss.key
            }):[],
            onChange:(selectRowKeys,selectRows)=>{
                //console.log(`selectRowKeys:${selectRowKeys}`,"selectRows:"+selectRows)
            },
            //record当前选中的行,selected是否选中,selectedRows所有被选中的数据
            onSelect:(record,selected,selectedRows)=>{
                this.props.selectedStaff(selectedRows)
            },
            onSelectAll:(isSlectedAll,selectedRows,changeRows)=>{
                this.props.selectedStaff(selectedRows)
            }
        }
        return(<Table rowSelection={this.props.calSelect?rowSelection:null} columns={this.props.tableHead} 
            onRow={(record) => {
                return {
                  onClick: () => {
                      let ap=this.props.employeese.filter(e=>{
                          return e.userId===record.key
                      })
                      //查看员工详情，插入当前选中的员工记录
                      this.props.togglePersonal(ap[0])
                  },
                  onMouseEnter: () => {}
                }
            }}
            size={this.props.tableSize?this.props.tableSize:'default'}
            title={this.props.customHeader?this.props.customHeader:null}
            locale={{emptyText: empty }} 
            pagination={false} rowClassName='table-row-name' className='column-name' 
            dataSource={this.props.sourceData} scroll={{ y: `${this.props.tscale*70}vh` }}></Table>)
    }
}

export default Datagrid