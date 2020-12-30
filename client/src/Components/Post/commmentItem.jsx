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
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-mb-2">
                        <img 
                        src= {comment && comment.avatar}
                        className="rounded-circle d-none d-mb-block"
                        alt="user photos"
                        />

                        <br/>
                    </div>
                </div>
                
            </div>
        )
    }
}
export default  (CommmentItem)