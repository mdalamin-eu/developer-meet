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
                </tr>
            ))
        } 
        let 
        return (
            <div>
                
            </div>
        )
    }
}
export default  Education