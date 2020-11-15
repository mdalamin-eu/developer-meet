import React, { Component } from 'react'
import {WithRouter, Redirect } from "react-router-dom"
import TextFieldGroup from "../common/TextFieldGroup"

class CreateProfile extends Component {
    state ={
        displaySocialInouts: false,
        handle:"",
        company:"",
        website:"",
        status:"",
        skills:"",
        bio:"",
        githubusername:"",
        
             
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
export default  CreateProfile;