import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { currentUserProfile } from "../Actions/profileAction";
import Spinner from "../common/spinner";


class Dashboard extends Component {
    componentDidMount(){
        this.props.currentUserProfile();
    }
    render() {
        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

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
    profile: state.profile,
    auth: state.auth
});
export default connect (mapStateToProps,{ currentUserProfile})(Dashboard);