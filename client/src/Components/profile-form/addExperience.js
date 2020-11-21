import React, { Component, Fragment } from 'react' //why Fragment?
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaField from '../common/TextAreaField'
import {connect} from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import {addExperience} from "../Actions/profileAction"
class AddExperience extends Component {
    state= {
        company: "",
        title: "",
        to: "",
        from:"",
        current: false,
        disabled: false,
        location: "",
        description: ""
    };

    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };
    onCheck= e => {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current,
            to: ""
        });
    };
    onSubmit = e => {
        e.preventDefault();
        const {company,
            location,
            title,
            to,
            from,
            current,
            disabled,
            description
        } = this.state
        
    const addExperience = {
        company,
        location,
        title,
        to,
        from,
        current,
        disabled,
        description
    }
    this.props.addExperience(addExperience, this.props.history);
    };
    render() {
        const {
            company,
            location,
            title,
            to,
            from,
            current,
            disabled,
            description
        } =this.state
        return (
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className="display-4 text-center"> Add Experience </h1>
                            <p className="lead text-center">
                            Add any job or position that you have had in the past or current
                             </p>
                             <small className="d-block pb-3">*=required fields </small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup
                                name="title"
                                placeholder="*Job Title"
                                value={title}
                                onChange={this.onChange}
                                required />
                                <TextFieldGroup
                                name="company"
                                placeholder="*Company"
                                value={company}
                                onChange={this.onChange}
                                required
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
                                <div className="form-check mb-4">
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
                                        Current Job
                                    </label>
                                 </div>
                                 <h6>To Date</h6>
                                 <TextFieldGroup
                                 name= "to"
                                 type="date"
                                 value={to}
                                 onChange={this.onChange}
                                 disabled={ disabled?"disabled":""}
                                 />
                                 <TextAreaField
                                 placeholder="Job Description"
                                 name="description"
                                 value={description}
                                 onChange={this.onChange}
                                 info="Tell us about your position"
                                 />
                                 <input type="submit" value="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
export default  connect (null,{addExperience}) (withRouter(AddExperience )) 