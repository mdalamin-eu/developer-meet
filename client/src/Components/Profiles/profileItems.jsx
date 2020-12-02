import React from "react";
import isEmpty from '../utlis/isEmpty';
import { LInk } from "react-router-dom";

const ProfileItems = ({profile}) => {
    return (

        <div className="card card-body bg-light mb-3">
            <div className="row">
                <div className="col-2">
                    <img src={profile.user.avatar} className="rounded-circle" />
                </div>
                <div className="col-lg-6 col-md-4 col-8">
                    <h3> {profile.user.name} </h3>
                    <p>
                        {profile.status}{" "}
                        {isEmpty(profile.company) ? null : (
                            <span>at {profile.company}</span>
                        ) }
                    </p>
                    <p>
                        {isEmpty(profile.location) ? null: <span>{profile.location}</span>  }
                    </p>
                        <Link>to={`/profile/${profile.handle}`} className="bth btn-info"> View Profile </Link>
                </div>
            </div>
        </div>
        
    )
}

export default ProfileItems;