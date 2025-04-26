import React from 'react';
import { useLocation } from "react-router-dom";
import { supabase } from '../client';
import { useState } from "react";
import './PostDetail.css';
import { FaThumbsUp } from 'react-icons/fa';

const PostDetail = () => {
    const location = useLocation();
    const [post, setPost] = useState(location.state?.curPost || {});
    const [comment, setComment] = useState("");

    const upvotePost = async (e) => {
        e.preventDefault();
        const {data, error} = await supabase
            .from('Posts')
            .update([
                {
                    upvotes: post.upvotes + 1,
                },
            ])
            .eq('id', post.id)
            .select();
        if (error) {
            console.error("Error updating upvotes:", error);
            return;
        }
        console.log("Upvotes Updated:", data);
        setPost(data[0]);
    };

    const commentOnPost = async (e) => {
        e.preventDefault();
        const {data, error} = await supabase
            .from('Posts')
            .update([
                {
                    comments: [...post.comments, comment],
                },
            ])
            .eq('id', post.id)
            .select();
        if (error) {
            console.error("Error updating comments:", error);
            return;
        }
        console.log("Comments Updated:", data);
        setPost(data[0]);
        setComment("");
    }

    return (
        <div className="post-detail-container">
            <div className="post-detail">
                <div className="user-thoughts">
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </div>
                <div className="post-detail-album-info">
                    <img
                    src={post.album_image}
                    alt={"No album cover available"}
                    className="post-detail-album-cover"
                    />
                    <div className="post-detail-album-text">
                        <p><strong>Track:</strong> {post.name}</p>
                        <p><strong>Artist:</strong> {post.artist}</p>
                        <p><strong>Album:</strong> {post.album}</p>
                        <p><strong>Release Date:</strong> {post.release_date}</p>
                        <a
                            href={post.spotify_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="post-detail-spotify-link"
                        >
                            🎧 Listen on Spotify
                        </a>
                        {/* <button className="upvote-button" 
                            type="button"
                            onClick={upvotePost}>
                            {post.upvotes} Upvotes
                        </button> */}
                    </div>
                </div>
                <div className='post-detail-footer'>
                    <button className="upvote-button" 
                        onClick={upvotePost}>
                        <FaThumbsUp className="thumb-icon" /> {post.upvotes}
                    </button>
                    <p className="created-at">Created at: {new Date(post.created_at).toLocaleString()}</p>
                </div>
            </div>
            <div className="post-detail-comments-section">
                <h3>Comments</h3>
                {post.comments && post.comments.length > 0 ? (
                    post.comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <p>{comment}</p>
                        </div>
                    ))
                ) : (
                    <p>No comments yet. Add first comment!</p>
                )}
                <form onSubmit={commentOnPost}>
                    <textarea placeholder="Add a comment..." 
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default PostDetail;