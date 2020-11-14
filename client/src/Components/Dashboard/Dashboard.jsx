import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { currentUserProfile } from "../Actions/profileAction";
import Spinner from "../common/spinner";
// import ProfileAction from ""
import Experience from "./Experience"
import Education from './Education';


class Dashboard extends Component {
    componentDidMount(){ //life cycle hoks j data rendering korte sahojjo kore
        this.props.currentUserProfile();
    }
    render() {
        //distucring kortachi 
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;
        console.log(profile)

        let dashboardContent;
        if(profile == null || loading){
            dashboardContent=<Spinner />;
        } else{
            if (Object.keys(profile).length > 0) { 
                dashboardContent = (
                    <div>
                        <p className = "lead text-muted">
                Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                        </p>
                        <Experience experience={profile.experience}/>
                        <Education education={profile.education}/>
                    </div>
                    
            
                );
            }else{
                dashboardContent = (
                    <div>
            <p classNam= "lead text-muted"> Welcome{user.name}</p>
            <p>You have not yet setup a profile, please add some info </p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
                    Create profile
                    </Link>
                </div>
                );
            }
        }
        return (
            <div className="dashboard">
                <div className= "container">
                    <div className= "row">
                        <div className="col-md-12">
                            <h1 className= "display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div> 
            </div>
        );
    }
}
const mapStateToProps = state => ({
    profile: state.profileData,
    auth: state.auth
});
export default connect (mapStateToProps,{ currentUserProfile})(Dashboard);