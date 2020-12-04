import React, { Component } from 'react'
import { connect } from "react-redux";
import { getProfiles } from "../Actions/profileAction"
import Spinner from "../common/spinner"
import profileAction from "./profileItems"

class Profiles extends Component {
    componentDidMount() {
        this.props.getProfiles();
    }
    render() {
        const { Profiles, loading } = this.props.profiles;
        let profileContent;
        if (profiles == null && loading) {
            profileContent = <Spinner/>
        } else {
            if (profiles !== null && profiles.length > 0){
                
            }
        }
        return (
            <div>
                
            </div>
        )
    }
}
export default  (Profiles);