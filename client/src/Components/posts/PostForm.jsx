import React, { Component } from 'react'
import TextAreaField from '../common/TextAreaField';
import { connect } from "react-redux"
import { addPost } from "../Actions/PostActions"

 class PostForm extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
export default connect(null, {addPost})(PostForm)