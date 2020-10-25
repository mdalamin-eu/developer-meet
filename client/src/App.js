import React, { Component } from 'react'
import { Route, Switch } from "react-router-dom";
import "./App.css"
import Landing from './Components/layout/Landing'
import Footer from './Components/layout/footer'
import Navbar from './Components/layout/Navbar'
import Register from './Components/Auth/register'
class App extends Component {
  render() {
    return (
          <div className="App">
           <Navbar/>
            <Route exact path="/" component={Landing} />
            <section className="container">
            <Route exact path="/register" component={Register} />
            
            </section>
<Footer/>
          </div>
    );
  }
}

export default App;