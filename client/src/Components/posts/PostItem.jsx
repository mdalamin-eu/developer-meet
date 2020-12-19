import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import {postLike, unLikePost, deletePost } from "../Actions/PostActions";
import classnames from "classnames";

 class PostItem extends Component {
     onLikeClick = id => {
         this.props.postLike(id);
     };
     postDelete = id => {
         this.props.deletePost(id);
     }
     findUserLike = Likes => {
         const {auth} = this.props;
         if (likes && likes.length > 0) {
             if(
                 likes && likes.filter(like=> like.user === auth.user.id).length > 0
             ) {
                 return true;
             } else {
                 return false;
             }
         }
     };
    render() {
        const { post, showAction, auth} = this.props;

        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <Link to="/profile">
                            <img 
                            className="rounded-circle d-none d-md-block"
                            src={post.avatar}
                            alt="user profile"
                            />
                        </Link>

                        <br />
                <div className="text-center">{post.name }</div>

                    </div>
                </div> 
            </div>
        )
    }
}
export default PostItem