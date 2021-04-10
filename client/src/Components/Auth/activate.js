import React, { Component } from 'react'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
         .then(response=>{ console.log('hi',token)
        //  .then(response=>{ console.log('hi',token))
           
                // return <Redirect to="/dashboard" />;
              
         })
     }

    render() {
        toast.configure({
            autoClose: 10000,
            draggable: false
        })
        const notify = () => {
            this.toastId= toast("You are registerd !");
            return <Redirect to="/dashboard" />;

        }

        const { token } = this.state;
        if (token) {
            // return <Redirect to="/dashboard" />;
          }
        return (
            
            <div className="App">
                <header>
                   Please activate your account
                </header>
                <form onSubmit={this.activate}>
                    <input type="submit" onClick={notify}value="Activate"/>
                    </form>
            </div>
        )
    }
}
export default Activate