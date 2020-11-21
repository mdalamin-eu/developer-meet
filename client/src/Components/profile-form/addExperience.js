import React, { Component, Fragment } from 'react' //why Fragment?
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaField from '../common/TextAreaField'
import {connect} from 'react-redux'
import { Link, withRouter } from 'react-router-dom';
import {addExperience} from "../Actions/profileAction"
class AddExperience extends Component {
    state= {
        company:"",
        title:"",
        to:"",
        from:"",
        current:false,
        disabled:false,
        location:"",
        description:""
    };
    onChange = e=>{
        this.setState({[e.targert.name]:e.target.value});

    };
    onCheck=e=> {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current,
            to: ""
        });
    }
    onSubmit = e => {
        e.preventDefault();
    
    const addExperience= {
        company: this.state.company,
        title:this.state.to,
        to: this.state.to,
        from: this.state.from,
        current:this.state.current,
        disabled:this.state.disabled,
        location:this.state.location,
        description:this.state.description
    };
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
                            </form>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}
export default  AddExperience 