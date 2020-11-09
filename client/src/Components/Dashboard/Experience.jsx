import React, { Component } from "react";
import Moment from "react-moment";


class Experience extends Component {

    render(){
        const { experience } = this.props;
        let experienceContent;
        if(experience && experience.length > 0) {
            experienceContent = this.props.experience.map(exp=>(
                <tr>     {/*for row---*/} 
                    <td> {/*for column||*/}
                    {exp.comapny}
                    </td>
                    <td>exp.title</td>
                <td>
            <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {exp.to === null?(
                "Now"
            ) : (
            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
            )}
                </td>
                </tr>
                // <button type="submit" className="btn btn-danger"></button>
            ))
        } else {
            experienceContent = <p>You have not yet add your experience</p>
        }
        return(
            <div>
                <h4 className= "mb-4">Experince Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                        <th>Title</th>
                        <th>Year</th>
                        </tr>
                        {experienceContent}
                    </thead>
                </table>

            </div>
        )
    }
} 
export default Experience;