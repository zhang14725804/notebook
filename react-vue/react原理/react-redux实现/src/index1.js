import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types'
import registerServiceWorker from './registerServiceWorker';

import Header from './Header'
import Content from './Content'

function createStore(reducer){
  let state = null
  const listeners = []
  
  const subscribe = (listener) => (listeners.push(listener))
  const getState = () => state
  const dispatch=(actions)=>{
    state=reducer(state,actions)
    listeners.forEach((listener)=>listener())
  }
  //初始化state
  dispatch({})
  return {getState,dispatch,subscribe}
}

const themeReducer=(state,actions)=>{
  if(!state) return {
    themeColor:'red'
  }
  switch(actions.type){
    case 'CHANGE_COLOR':
      return {...state,themeColor:actions.themeColor}
    default:
      return state
  }
}

const store = createStore(themeReducer)

class App extends React.Component{
  //context 的用法
  static childContextTypes={
    store:PropTypes.object
  }

  getChildContext(){
    return {store}
  }
  render(){
    return (
      <div>
        <Header />
        <Content />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
