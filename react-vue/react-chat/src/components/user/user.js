import React from 'react'
import {connect} from 'react-redux'
import {Result,List,WhiteSpace,Modal} from 'antd-mobile'
import browserCookies from 'browser-cookies'
import {logoutSubmit} from '../../store/userRedux'
import {Redirect} from 'react-router-dom'
@connect(
  state=>state.user,
  {logoutSubmit}
)
class User extends React.Component{
  constructor(props){
    super(props)
    this.logout=this.logout.bind(this)
  }
  logout(){
    
    const alert=Modal.alert
    alert('注销', '确认退出登录?', [
          { text: '取消', onPress: () => console.log('cancel') },
          { text: '确认', onPress: () => {
              //清除cookies(返回到登录页面)
              browserCookies.erase('userid')
              //window.location.href=window.location.href
              this.props.logoutSubmit()
            }
          },
        ])
    
  }
  render(){
    console.log(this.props)
    const Item=List.Item
    const Brief=Item.Brief
    //从redux中取值，之前authRoute组件已将获取到了数据
    //记得判空
    return this.props.name?(
      <div style={{position:"relative",zIndex:11}}>
        <Result img={<img src={require(`../images/${this.props.avatar}`)} alt='' style={{width:60,height:60}}/>}
        title={this.props.name}
        message={this.props.type==='boss'?this.props.company:null}></Result>
        <List renderHeader={()=>'简介'}>
          <Item multipleLine>
            {this.props.title}
            {this.props.desc.split('\n').map(d=><Brief key={d}>{d}</Brief>)}
            {this.props.money?<Brief>薪资：{this.props.money}</Brief>:null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={this.logout}>退出登录</Item>
        </List>
      </div>
    ):<Redirect to={this.props.redirectTo}/>
  }
}

export default User