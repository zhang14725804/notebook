import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import Header from './Header'
import Content from './Content'


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
