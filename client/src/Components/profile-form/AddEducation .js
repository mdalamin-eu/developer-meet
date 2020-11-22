import React, { Component} from 'react'
import {Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaGroup from '../common/TextAreaField'
import {addEducation} from '../Actions/profileAction'

class AddEducation extends Component {
    state={
        school_name:"",
        degree: "",
        fieldofstudy: "",
        to: "",
        from: "",
        current: false,
        disabled: false,
        description: "",
        location:""
    };
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    onCheck = () => {
        this.setState({
            current: !this.state.current,
            disabled: !this.state.disabled,
            to: ""
        });
    };
    onSubmit = e=> {
        e.preventDefault();
        
        const {
        school_name,
        degree,
        fieldofstudy,
        to,
        from,
        current,
        disabled,
        description,
        location
        }= this.state

    const addEducation = {
        school_name,
        degree,
        fieldofstudy,
        to,
        from,
        current,
        disabled,
        description,
        location
    }
    this.props.addEducation(addEducation, this.props.history);
    };
    render() {
        const  {
            school_name,
            degree,
            fieldofstudy,
            to,
            from,
            current,
            disabled,
            description,
            location
        }= this.state;
        return (
            <div className="add-experiance">
                <div className= "container">
                    <div className= "row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center">Add Education</h1>
                            <p className="lead text-center">
                                Add your school or degree that you have had in the past or current 
                            </p>
                            <small className= "d-block pb-3">*=requred fields</small>  
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                name="school_name"
                                placeholder="*School"
                                value= {school_name}
                                onChange={this.onChange}
                                required
                                />
                                <TextFieldGroup
                                name= "degree"
                                placeholder= "*degree"
                                value={degree}
                                onChange={this.onChange}
                                required
                                />
                                <TextFieldGroup
                                name="fieldofstudy"
                                placeholder="Field of Study"
                                value={fieldofstudy}
                                onChange={this.onChange}
                                />
                                <TextFieldGroup
                                name="location"
                                placeholder="Location"
                                value={location}
                                onChange={this.onChange}
                                />
                                <h6>From Date</h6>
                                <TextFieldGroup
                                name="from"
                                type="date"
                                value={from}
                                onChange={this.onChange}
                                />
                                <div className="form-check mb-4"S>
                                    <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name="current"
                                    value={current}
                                    checked={current}
                                    onChange={this.onCheck}
                                    id="current"
                                    />
                                    <label htmlFor="current" className="form-check-label">
                                        Current Study
                                    </label>
                                </div>
                                <h6>To Date</h6>
                                <TextFieldGroup
                                name="to"
                                type="date"
                                value={to}
                                onChange={this.onChange}
                                disabled={disabled ? "disabled":""}
                                />
                                <TextAreaGroup
                                placeholder="Job Description"
                                name="description"
                                value={description}
                                onChange={this.onChange}
                                info="Tell us about your position"
                                />
                                <input type="submit" value="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default connect( null, {addEducation})(withRouter(AddEducation)); 