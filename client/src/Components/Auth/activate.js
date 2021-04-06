import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import Axios from 'axios'
 class Activate extends Component {
    state = {
        token: ""
    };
     componentDidMount(){

     }
     activate= (event) =>{
         event.preventDefault()
         const token = this.props.match.params.id
         Axios.post(`http://localhost:3000/api/users/activate`,{token})
         .then(response=>{
           
                return <Redirect to="/dashboard" />;
              
         })
     }

    render() {

        const { token } = this.state;
        if (token) {
            return <Redirect to="/dashboard" />;
          }
        return (
            
            <div className="App">
                <header>
                   Please activate your account
                </header>
                <form onSubmit={this.activate}>
                    <input type="submit" value="Activate"/>
                    </form>
            </div>
        )
    }
}
export default Activate