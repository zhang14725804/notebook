import React from 'react'
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import AvatarSelector from '../../components/avatarSelector/avatarSelector'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {update} from '../../store/userRedux'
@connect(
  state=>state.user,
  {update}
)
class GeniusInfo extends React.Component{
  constructor(props){
    super(props)
    this.state={
      title:'',
      desc:'',
      avatar:''
    }
  }
  changeHandler(key,val){
    this.setState({
      [key]:val
    })
  }
  render(){
    const path=this.props.location.pathname
    const redirect=this.props.redirectTo
    
    return (
      <div>
        {(redirect && redirect !== path)?<Redirect to={this.props.redirectTo}></Redirect>:null}
        <NavBar mode="dark" >牛人完善信息</NavBar>
        <AvatarSelector selectAvatar={imgName=>{
          this.setState({
            avatar:imgName
          })
        }}/>
        <InputItem onChange={v=>this.changeHandler('title',v)}>求职岗位</InputItem>
        <TextareaItem onChange={v=>this.changeHandler('desc',v)} rows={3} autoHeight title='个人简介'></TextareaItem>
        <Button type="primary" onClick={()=>this.props.update(this.state)}>保存</Button>
        {/* <Button type="primary" onClick={()=>console.log(this.state)}>保存</Button> */}
      </div>
    )
  }
}

export default GeniusInfo