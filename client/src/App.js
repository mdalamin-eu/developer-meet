import React, { Component } from 'react'
import {connect} from 'react-redux'
import {regAction} from './Components/Actions/action'

class App extends Component {
  state={
    reg:''
  }
  render() {
    return (
      <div>
        hi, bye
      </div>
    )
  }
};
function mapStateToProps(state){
  return{
    reg:state.appState.value
  }
}
export default connect(mapStateToProps,{regAction})(App)