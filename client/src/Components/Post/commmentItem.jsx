import React, { Component } from 'react'
import { connect } from "react-redux"
import { commentDelete } from "../Actions/PostActions"

class CommmentItem extends Component {
    onDeleteComment = { postId, id} => {
        this.props.commentDelete(postId, id);
    };
    render() {
        const { comment, postId, auth } = this.props;
        return (
            <div>
                
            </div>
        )
    }
}
export default  (CommmentItem)