import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import "./App.css"
import Landing from './Components/layout/Landing'
import Activate from './Components/Auth/activate'
import Notification from './Components/Dashboard/notification'
import Footer from './Components/layout/footer'
import Navbar from './Components/layout/Navbar'
import Register from './Components/Auth/register'
import Login from './Components/Auth/Login'
import {setCurrentUser } from './Components/Actions/authAction'
import setAuthToken from '../src/Components/utlis/setAuthToken'
import {connect} from 'react-redux'
import jwt_decode from "jwt-decode";
import Dashboard from './Components/Dashboard/Dashboard'
import PrivateRoute from './Components/routing/PrivateRoute'
import store from './store'
import Profile from './Components/Profile/Profile'
import CreateProfile from './Components/createProfile/createProfile';
import AddExperience from './Components/profile-form/AddExperience'
import AddEducation from "./Components/profile-form/AddEducation "
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser());
  // Check for expired token
  // const currentTime = Date.now() / 1000;
  // if (decoded.exp < currentTime) {
  //   // Logout user
  //   store.dispatch(logoutUser());
  //   // Clear current Profile
  //   // store.dispatch(clearCurrentProfile());
  //   // Redirect to login
  //   window.location.href = "/login";
  // }
}

class App extends Component {
  render() {
    
    return (
          <div className="App">
           <Navbar/>
            <Route exact path="/" component={Landing} />
            <section className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/auth/activate/:id" component={Activate}/>
            <Route exact path="/notification" component={Notification}/>
            <Route exact path= "/profile/:handle" component={Profile}/>
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path="/add-experience" component={AddExperience}/>
            </Switch>
            <Switch>
              <PrivateRoute exact path="/add-education" component={AddEducation}/>
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
