import React, { Component } from 'react'
import isEmpty from "../utlis/isEmpty";
class Headers extends Component {
    render() {
        const { profile } = this.props;
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-body bg-info text-white mb-3">
                        <div className="row">
                            <div className="col-4 col-mb-3 m-auto">
                                <img
                                className="rounded-circle"
                                src={profile.user.avatar}
                                alt=""
                                />
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="display-4 text-center"> {profile.user.name} </div>
                            <p className="lead text-center">

                                
                            </p>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
export default Headers;