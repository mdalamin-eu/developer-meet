import React, { Component } from 'react'
import Moment from "react-moment"
import {connect } from "react-redux"
class Education extends Component {
    
    
    render() {
        const { education } = this.props;
        let educationContent ;
        if (education && education.length > 0){
            educationContent = education.map(edu=>(
                <tr>
        <td>{edu.school_name}</td>
        <td> {edu.degree} </td>
        <td> {edu.fieldofstudy} </td>
        <td>
        <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{exp.to===null?(
            "Now"
        ):(
            <Moment format="DD/MM/YYYY">{exp.to}</Moment>
        )}
        </td>
                </tr>
            ))
        } 
        else{
            educationContent = <p>You have not yet add your education</p>;

        }
        
        return (
            <div>
                <h4 className="mb-4">Education Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Fieldofstudy</th>
                            <th>Year</th>
                        </tr>
                        {educationContent}
                    </thead>
                </table>
            </div>
        )
    }
}
export default  Education