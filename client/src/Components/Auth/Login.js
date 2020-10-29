import React, { Component } from 'react';
import {connect }from "react-redux";
import {loginUser} from '../Actions/action'
import TextFieldsGroup from "../common/TextFieldGroup"

class Login extends Component{
    state = {
        email: "",
        password:""
    };

    onSubmit = e => {
        e.preventDefault();

        const { email, password } = this.state;
        const userData = {
            email,
            password
        };
        this.props.loginUser(userData, this.props.history);
    };

        onChange = e => {
            this.setState({ [e.target.name]: e.target.value});
        
    };

    render(){
        const { email, password } = this.state;
        return(
            <div className="login">
                <div className= "container">
                    <div className= "row">
                        <div className= "col-md-8 m-auto">
                            <h1 className="display -4 text-center">Log In</h1>
                            <p className="lead text-center">
                                sign in to your DeveloperMeet acoount
                            </p>
                            <form onSubmit = {this.onSubmit}>
                                <TextFieldsGroup
                                name="email"
                                placeholder="Enter Email"
                                value={email}
                                onChange= {this.onChange}
                                type="email"
                                />
                                <TextFieldsGroup
                                type= "password"
                                name="password"
                                value={password}
                                placeholder="Enter Password"
                                onChange={this.onChange}
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>

                        </div>

                    </div>

                </div>

            </div>
        );
    }
}
const mapStateToProps= state=> ({
    auth: state.auth
})

export default connect(mapStateToProps, {loginUser}) (Login);