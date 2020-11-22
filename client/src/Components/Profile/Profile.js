import React, { Component } from 'react'
import { connect } from "react-redux";
import { getProfilebyhandler } from "../Actions/profileAction"
import Spinner from "../common/spinner"
import { Link } from "react-router-dom"
import About from "./About"


class Profile extends Component {
    // componentDidMount() {
    //     if(this,props.match.params.handle) {
    //         this
    //     }
    // }
    render() {
        return (
            <div className="row">
                
            </div>
        )
    }
}
export default  Profile;