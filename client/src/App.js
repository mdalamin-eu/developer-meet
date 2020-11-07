import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import "./App.css"
import Landing from './Components/layout/Landing'
import Activate from './Components/Auth/activate'
import Footer from './Components/layout/footer'
import Navbar from './Components/layout/Navbar'
import Register from './Components/Auth/register'
import Login from './Components/Auth/Login'
import {setCurrentUser} from './Components/Actions/authAction'
import setAuthToken from '../src/Components/utlis/setAuthToken'
import {connect} from 'react-redux'
import jwt_decode from "jwt-decode";
import Dashboard from './Components/Dashboard/Dashboard'
import PrivateRoute from './Components/routing/PrivateRoute'



class App extends Component {
  componentDidMount(){
    if(localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);
      console.log('test before',localStorage.jwtToken);
      const decode = jwt_decode(localStorage.jwtToken);
      console.log('test',decode);
 this.props.setCurrentUser()    
    }
  }
  render() {
    return (
          <div className="App">
           <Navbar/>
            <Route exact path="/" component={Landing} />
            <section className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/auth/activate/:id" component={Activate}/>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            </Switch>
            </section>
<Footer/>
          </div>
    );
  }
}
const mapStateToProps = state => {

}

export default  connect(mapStateToProps,{setCurrentUser})(App);
