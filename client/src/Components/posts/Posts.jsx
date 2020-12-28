import React, { Component } from 'react'
import { connect } from "react-redux"
import Spinner from "../common/spinner"
import PostFeed from "./PostFeed"
import PostForm from "./PostForm";
import { getposts } from "../Actions/PostActions"

class Posts extends Component {
    componentDidMount(){
        this.props.getposts();
    }
    render(){
        const { posts, loading } = this.props.post;
        let postsContent;
        
        if (posts === null && loading){
            postsContent = <Spinner />;
        } else {
            if ( posts && posts.length > 0) {
                postsContent = <PostFeed posts={posts} />;
            } else {
                postsContent = <p>posts not found</p>
            }
        }
    
        return (
            <div>
                
            </div>
        )
    }
}
export default  (Posts)