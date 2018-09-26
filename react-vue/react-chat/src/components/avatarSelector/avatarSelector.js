import React from 'react'
import {Grid,List} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component{
  //属性验证(注意这里的大小写)
  static propTypes={
    selectAvatar:PropTypes.func.isRequired
  }
  constructor(props){
    super(props)
    this.state={}
  }
  render(){
    //所有头像的名称(应该是选择文件上传的)
    const avatarList=[]
    for(let i=1;i<17;i++){
      avatarList.push({
        text:`${i}.png`,
        icon:require(`../images/${i}.png`)
      })
    }

    const gridHeader=this.state.text?(<div><span>当前头像</span><img style={{width:20}} src={this.state.icon} alt=''/></div>):(<div>请选择头像</div>)
    //用户选择头像之后，只需要传递头像名即可
    return (
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid data={avatarList} 
            onClick={ele=>{
              this.setState(ele) 
              this.props.selectAvatar(ele.text)
            }}/>
        </List>
      </div>
    )
  }
}

export default AvatarSelector