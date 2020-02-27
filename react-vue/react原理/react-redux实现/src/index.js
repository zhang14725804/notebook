import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from './react-redux'

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
  render(){
    return (
      <div>
        <Header />
        <Content />
      </div>
    )
  }
}

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
