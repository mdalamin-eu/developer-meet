import React, { Component } from 'react'
import {connect} from "react-redux"
import {WithRouter, Redirect, withRouter } from "react-router-dom"
import TextFieldGroup from "../common/TextFieldGroup"
import InputGroup from "../common/inputGroup"
import SelectListGroup from "../common/SelectListGroup"
import TextAreaField from "../common/TextAreaField"
import { createProfile, currentUserProfile} from '../Actions/profileAction';

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
        errors: {}     
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
        const createProfileData = {
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
        this.props.createProfile(createProfileData, this.props.history);

    };
    // componentDidMount(){
    //     this.props.currentUserProfile();
    // }
    // componentDidUpdate(prevProps) {
    //     if(
    //         this.props.profile.profile && 
    //         Object.keys(this.props.profile.profile).length > 0
    //     ){
    //         return this.props.history.push("/dashboard");
    //     }
    // }
    render() {
        const {
            errors,
            company,
            website,
            displaySocialInouts,
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

        //const { profile } = this.props.profile;

        let socialInputs;
        if(displaySocialInouts){
            socialInputs=(
                <div>
                     <InputGroup
                            placeholder = "Twitter Profile URL"
                            name="twitter"
                            value= {twitter}
                            icon="fab fa-twitter"
                            onChange= {this.onChange}
                            error={errors.twitter}
                            />
                            <InputGroup
                            name="facebook"
                            placeholder="Facebook profile URL"
                            value={facebook}
                            icon="fab fa-facebook"
                            onChange={this.onChange}
                            error={errors.facebook}
                            />
                        <InputGroup
                            name="linkedin"
                            placeholder="Linkedin profile URL"
                            value={linkedin}
                            icon="fab fa-linkedin"
                            onChange={this.onChange}
                            error={errors.linkedin}
                            />
                            <InputGroup
                            name="youtube"
                            placeholder="Youyube Profile URL"
                            value={youtube}
                            icon="fab fa-youtube"
                            onChange={this.onChange}
                            error={errors.youtube}
                            />
                            <InputGroup
                            name="instagram"
                            placeholder="Instagram Profile URL"
                            value={instagram}
                            icon="fab fa-instagram"
                            onChange={this.onChange}
                            error={errors.instagram}
                            />
                            <InputGroup
                            name="snapchat"
                            placeholder="Snapchat Profile URL"
                            value={snapchat}
                            icon="fab fa-snapchat"
                            onChange={this.onChange}
                            error= {errors.snapchat}
                            />
                </div>
            );
        }
        const options = [
            { label: "* Select Profissional Status", value:0},
            {label: "Developer", value:"Developer"},
            {label:"Junior Developer", value: "Junior Developer"},
            {label:"Senior Developer", value: "Senior Develope"},
            {label:"Manager", value:"Manager"},
            {label:"Student or Learning", value:"Student or Learning"},
            {label:"Instructor or Teacher", value:"Instructor or Teacher"},
            {label:"Intern", value:"Intern"}
        ];
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className= "display-4  text-center">Create your profile</h1>
                            <p className= "lead text-center">
                                Let's get some information to make your profile stand out
                            </p>
                            <small className= "d-block pb-3">*=required filed</small>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                            name="handle"
                            placeholder="handle"
                            value={handle}
                            onChange={this.onChange}
                            error={errors.handle}
                            info="A unique handle for your profile URL example company name website profile name"
                            />
                            <SelectListGroup
                            name="status"
                            value={status}
                            placeholder="Status"
                            options={options}
                            onChange={this.onChange}
                            info="Select Status"
                            error={errors.status}
                            />
                            <TextFieldGroup
                            name="company"
                            placeholder="Company Name"
                            value={company}
                            info="could be your own company or you work for one"
                            error= {errors.company}
                            onChange= {this.onChange}
                            />
                            <TextFieldGroup
                            name="website"
                            value= {website}
                            placeholder="Website"
                            info="could be your own website"
                            error={errors.website}
                            onChange= {this.onChange}
                            />
                            <TextFieldGroup
                            name= "location"
                            placeholder="Location"
                            value={location}
                            info="City (eg. Helsinki)"
                            onChange={this.onChange}
                            error={errors.location}
                            />
                            <TextFieldGroup
                            name="skills"
                            value= {skills}
                            placeholder= "Skills"
                            onChange={this.onChange}
                            error= {errors.skills}
                            info= "please use comma separate values(eg, HTML, Python, Javascript)"
                            />
                            <TextFieldGroup
                            name= "githubusername"
                            value={githubusername}
                            placeholder= "githubusername"
                            onChange={this.onChange}
                            error={errors.skills}
                            info="If you want to get your latest  repos, include your github usernames"
                            />
                             <TextFieldGroup
                             name="bio"
                             placeholder= "Short Bio"
                             value={bio}
                             onChange={this.onChange}
                             error={errors.bio}
                             info="Tell us a little about you self"
                            />
                            <div className="mb-3">
                                <button
                                    type="button"
                                    onClick={()=>{
                                        this.setState(prevState=>({
                                            displaySocialInouts: !prevState.displaySocialInouts
                                        }));
                                    }}
                                    className="btn btn-light">
                                    Add Social Networks Links
                                </button>
                                <span className="text-muted"> Optional</span>
                            </div>
                            {socialInputs}
                            <input
                            type="submit" value="submit" className="btn btn-info btn-block mt-4"
                            />
                        </form>
                        </div>
                    </div>

                </div>
               
            </div>
        );
    }
}
const mapStateToProps = state => ({
    profile: state.profile
});
export default connect(mapStateToProps,{createProfile, currentUserProfile})(withRouter(CreateProfile));