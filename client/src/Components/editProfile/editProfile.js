import React, {Component} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import InputGroup from "../common/inputGroup";

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

            

        }
    }
}