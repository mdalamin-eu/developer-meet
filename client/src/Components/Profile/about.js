import React, { Component } from 'react'
import isEmpty from "../utlis/isEmpty"

class About extends Component {
    render() {
        const {profile} = this.props;
        //get first name
        const firstname = profile.user.name.trim().split(" ") [0];
        //skill list
        const skills = profile.skills.map((skill,index)=>(
            <div key={index} className="p-3">
                <i className="fa fa-check" /> {skill}
            </div>
        ));
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-body bg-light mb-3">
                        
                    </div>
                </div>
                
            </div>
        )
    }
}
export default  About;