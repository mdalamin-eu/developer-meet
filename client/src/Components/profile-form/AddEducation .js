import React, { Component} from 'react'
import {Link, withRouter } from "react-router-dom"
import { connect } from "react-redux"
import TextFieldGroup from '../common/TextFieldGroup'
import TextAreaGroup from '../common/TextAreaField'
import {addEducation} from '../Actions/profileAction'

class AddEducation extends Component {
    state={
        school:"",
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
            disable: !this.state.disabled,
            to: ""
        });
    };
    onSubmit = e=> {
        e.preventDefault();
        
        const {
        school,
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
        school,
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
            school,
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
            <div>
                
            </div>
        )
    }
}
export default AddEducation 