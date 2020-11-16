import React, { Component } from 'react'
import {WithRouter, Redirect } from "react-router-dom"
import TextFieldGroup from "../common/TextFieldGroup"
import { createProfile } from '../Actions/profileAction';
import { object } from 'prop-types';

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
        location:"",
        twitter:"",
        facebook:"",
        linkedin:"",
        youtube:"",
        instagram:"",
        snapchat:"",
        errors:{}     
    };
    onChange = e => {
        this.setState({
            [e.target.name]:e.target.value
        });
    };
    onSubmit= e=> {
        e.preventDefault();
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            handle,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin,
            snapchat
        } =this.state;
        const CreateProfileData = {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            handle,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin,
            snapchat
        };
        this.props.CreateProfile(createProfileData, this.props.history);

    };
    componentDidMount(){
        this.props.currentUserProfile();
    }
    componentDidUpdate(prevProps) {
        if(
            this.props.profile.profile && 
            object.keys(this.props.profile.profile).length > 0
        ){
            return this.props.history.push("/dashboard");
        }
    }
    render() {
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            handle,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin,
            snapchat
        }= this.state;
        const {profile}= this.props.profile;
        let socialInputs;
        if(displaySocialInouts){
            scoialInput=(
                <div>
                    
                </div>
            )
        }
        return (
            <div>
                
            </div>
        )
    }
}
export default  CreateProfile;