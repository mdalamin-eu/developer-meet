import React, { Component } from 'react'
import Axios from 'axios'
 class Activate extends Component {
     componentDidMount(){

     }
     activate= (event) =>{
         event.preventDefault()
         const token = this.props.match.params.id
         Axios.post(`http://localhost:3000/api/users/activate`,{token})
         .then(response=>{
             console.log(response.data);
         })
     }

    render() {
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