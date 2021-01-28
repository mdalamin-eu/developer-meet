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

        }
    }
}