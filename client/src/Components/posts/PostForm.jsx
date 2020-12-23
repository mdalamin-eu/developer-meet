import React, { Component } from 'react'
import TextAreaField from '../common/TextAreaField';
import { connect } from "react-redux"
import { addPost } from "../Actions/PostActions"

 class PostForm extends Component {
     state = {
         text: ""
     };

     onSubmit = e => {
         e.preventDefault();
         const newpost = {
             text: this.state.text
         };
         this.props.addPost(newpost).then(
             this.setState({
                 text: ""
             })
         );
     };
     onChange= e => {
         this.setState({
             [e.target.name]:e.target.value
         });
     };
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
export default connect(null, {addPost})(PostForm)