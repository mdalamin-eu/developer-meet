import React, { Component } from 'react'
import Moment from "react-moment";

class Credintial extends Component {
    render() {
        const { experiance, education } = this.props;
        const expItems = experiance.map(exp => (
            <li key={exp._id} className="list-group-item">
                <h4> {exp.company} </h4>
                <p>
                    <Moment format="DD/MM/YYYY"> {exp.from} </Moment> -
                    {exp.to ===null?(
                        "Now"
                    ) : ( 
                        <Moment format="DD/MM/YYYY"> {exp.to} </Moment>
                    )}
                </p>
                <p>
                    <strong>Position:</strong> {exp.title}
                </p>
                <p>
                    {exp.location === "" ? null : (
                        <span>
                            <strong>Location</strong> {exp.location}
                        </span>
                    )}
                </p>

                <p>
                    {exp.description==="" ? null : (
                        <span>
                            <strong>Description: </strong> {exp.description}
                        </span>
                    )}
                </p>
            </li>
        ))
        return (
            <div className="row">
                
            </div>
        )
    }
}
export default  Credintial