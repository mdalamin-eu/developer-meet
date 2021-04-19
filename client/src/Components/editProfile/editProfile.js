import React, {Component} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import InputGroup from "../common/inputGroup";
import TestAreaFieldGroup from '../common/TextAreaField';
import SelectListGroup from '../common/SelectListGroup';
import {createProfile, currentUserProfile} from '../Actions/profileAction';
import isEmpty from '../utlis/isEmpty';

class EditProfile extends Component {
    state = {
        displaySocialInouts: false,
        company: "",
        website: "",
        status: "",
        skills: "",
        githubusername: "",
        bio: "",
        location: "",
        twitter: "",
        facebook: "",
        linkedin: "",
        youtube: "",
        instagram: "",
        snapchat:"",
        errors: {}
    };
   

    componentDidMount() {
        this.props.currentUserProfile();
    }

    componentDidUpdate(prevProps) {
        if (this.props.profile.profile !== prevProps.profile.profile) {
            const profile= this.props.profile.profile;

            const skillsCSV = !isEmpty(profile.skills) ? profile.skills.join (",") : "" ;

            profile.company =! isEmpty(profile.company) ? profile.company : "";
            profile.website = ! isEmpty(profile.website) ? profile.website : "";
            profile.location = ! isEmpty(profile.location) ? profile.location : "";
            profile.githubusername = ! isEmpty(profile.githubusername) ? profile.githubusername : "";
            profile.bio = ! isEmpty(profile.bio) ? profile.bio : "";
            profile.social = ! isEmpty(profile.social) ? profile.social : { };
            profile.twitter = ! isEmpty(profile.social.twitter) ? profile.social.twitter : "";
            profile.facebook= ! isEmpty(profile.social.facebook) ? profile.social.facebook : "";
            profile.youtube= ! isEmpty(profile.social.youtube) ? profile.social.youtube : "" ;
            profile.instagram= ! isEmpty(profile.social.instagram) ? profile.social.instagram : "";
            profile.linkedin = ! isEmpty(profile.social.linkedin) ? profile.social.linkedin : "";
            profile.snapchat = ! isEmpty(profile.social.snapchat) ? profile.social.snapchat : "";

            this.setState({
                company : profile.company,
                website: profile.website,
                location: profile.location,
                bio : profile.bio,
                skills : skillsCSV,
                githubusername: profile.githubusername,
                status: profile.status,
                facebook: profile.facebook,
                twitter: profile.twitter,
                youtube:profile.youtube,
                linkedin: profile.linkedin,
                instagram:profile.instagram,
                snapchat: profile.snapchat
            });

        }
    }
    onChange= e => {
        this.setState({
            [e.target.name] : e.target.value
        });
    };

    onSubmit = e => {
        e.preventDefault();
        const {
            company,
            website,
            status,
            skills,
            location,
            bio,
            githubusername,
            facebook,
            twitter,
            instagram,
            youtube
        } = this.state;
        const createProfileData = {
            company,
            website,
            status,
            skills,
            location,
            bio,
            githubusername,
            facebook,
            twitter,
            instagram,
            youtube
        };
        this.props.createProfile(createProfileData, this.props.history, true);
    };


render() {
    console.log(this.state);
    const {
        errors,
        displaySocialInouts,
        status,
        company,
        website,
        location,
        bio,
        skills,
        twitter,
        facebook,
        instagram,
        youtube,
        snapchat,
        githubusername
    } = this.state;
    let socialInputs;
    if( displaySocialInouts) {
        socialInputs= (
            <div>
                <InputGroup
                placeholder="Twitter profile URL"
                name= "twitter"
                value={twitter}
                icon="fab fa-twitter"
                onChange={this.onChange}
                error={errors.twitter}
                />
                <InputGroup
                name="facebook"
                placeholder="Facebook Profile URL"
                value={facebook}
                icon="fab fa-facebook"
                onChange={this.onChange}
                error={errors.facebook}
                />
                <InputGroup
                name="youtube"
                placeholder="Youtube Profile URL"
                value={youtube}
                icon="fab fa-youtube"
                onChange={this.onChange}
                error={errors.youtube}
                />

                <InputGroup
                name="instagram"
                placeholder="Instagram Profile URL"
                value={instagram}
                onChange={this.onChange}
                error={errors.instagram}
                icon="fab fa-instagram"
                />

                <InputGroup
                name="snapchat"
                placeholder="Snapchat Profile URL"
                value={snapchat}
                onChange={this.onChange}
                error={errors.snapchat}
                icon="fab fa-instagram"
                />
                </div>
        );
    }
    const options = [
        {label: "*Select Professional Status", value:0},
        {label: "Developer", value:"Developer"},
        {lable: "Junior Developer", value:"Junior Developer"},
        {lable: "Manager", value:"manager"},
        {label: "Student or Learning", value:"Student or Learning"},
        {label: "Instructor or Teacher", value: "Instructor or Teacher"},
        {label:"Intern", value:"Intern"}
    ];


return(
    <div className="create-profile" >
        <div className="container">
            <div className="row">
                <div className="col-md-8 m-auto">
                    <h1 className="display-4 text-center">Edit your profile </h1>
                    <p className="lead text-center">
                        Let's get some information to make your profile stand out
                    </p>
                    <small className="d-block pb-3">*=required filed</small>
                    <form onSubmit={this.onSubmit}>
                        <SelectListGroup
                        name="status"
                        value={status}
                        placeholder="Status"
                        options={options}
                        onChange={this.onChange}
                        info="Select Status"
                        error={errors.company}
                        />

                        <TextFieldGroup
                        name="company"
                        placeholder="Company name"
                        value={company}
                        info="could be your own company or you work for one"
                        error={errors.company}
                        onChange={this.onChange}
                        />

                        <TextFieldGroup
                        name= "website"
                        placeholder="Website"
                        value={website}
                        info="Could be your own website or company"
                        error={errors.website}
                        onChange={this.onChange}
                        />

                        <TextFieldGroup
                        name="location"
                        placeholder="Location"
                        value={location}
                        onChange={this.onChange}
                        info="info(eg. Helsinki)"
                        error={errors.location}
                        />
                        <TextFieldGroup
                        name="skills"
                        placeholder="Skills"
                        value={skills}
                        onChange={this.onChange}
                        error={errors.skills}
                        placeholder="Skills"
                        info="Please use comma separated values(eg, HTML, Python, JavaScript)"
                        />

                        <TextFieldGroup
                        name="githubusername"
                        placeholder="Github Username"
                        value={githubusername}
                        error={errors.githubusername}
                        onChange={this.onChange}
                        info="Tell us a little about yourself"
                        />

                        <div className="mb-3">
                            <button
                            type="button"
                            onClick={()=>{
                                this.setState(prevState=>({
                                    displaySocialInouts: !prevState.displaySocialInouts
                                }));
                            }}
                            className="btn btn-light"
                            >
                                Add social networks links
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>

    </div>
)
}
}
