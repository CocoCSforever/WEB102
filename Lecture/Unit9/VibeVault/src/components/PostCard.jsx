import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import { FaThumbsUp, FaTrash, FaEdit } from 'react-icons/fa';
import { useState } from 'react';
import './PostCard.css';

const PostCard = ({ post, setPosts }) => {
    const [curPost, setCurPost] = useState(post);
    const navigate = useNavigate();

    const upvotePost = async (e) => {
        e.preventDefault();
        const {data, error} = await supabase
            .from('Posts')
            .update([
                {
                    upvotes: curPost.upvotes + 1,
                },
            ])
            .eq('id', curPost.id)
            .select();
        if (error) {
            console.error("Error updating upvotes:", error);
            return;
        }
        console.log("Upvotes Updated:", data);
        setCurPost(data[0]);
    };

    const deletePost = async (e) => {
        e.preventDefault();
        const {data, error} = await supabase
            .from('Posts')
            .delete()
            .eq('id', curPost.id)
            .select();
        if (error) {
            console.error("Error deleting post:", error);
            return;
        }
        console.log("Post Deleted:", data);
        setPosts((prevPosts) => prevPosts.filter((p) => p.id !== curPost.id));
    }

    const editPost = async (e) => {
        e.preventDefault();
        navigate(`/post/${curPost.id}/edit`, { state: { curPost } });
    }

    return (
        <div className="post-card">
            <div className="user-thoughts">
                <button className="edit-button" onClick={editPost}>
                    <FaEdit className="edit-icon" /> Edit
                </button>
                <button className="delete-button" onClick={deletePost}>
                    <FaTrash className="trash-icon" />
                </button>
                <h2>{curPost.title}</h2>
                <p>{curPost.content}</p>
            </div>
            <div className="album-info">
                <img
                src={curPost.album_image}
                alt={"No album cover available"}
                className="album-cover"
                />
                <div className="album-text">
                    <p><strong>Track:</strong> {curPost.name}</p>
                    <p><strong>Artist:</strong> {curPost.artist}</p>
                    <p><strong>Album:</strong> {curPost.album}</p>
                    <p><strong>Release Date:</strong> {curPost.release_date}</p>
                </div>
                <a
                    href={curPost.spotify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="spotify-link"
                >
                    🎧 Listen on Spotify
                </a>
                <Link to={`/post/${curPost.id}`} state={{ curPost }}>View Post</Link>
                <div className='post-card-footer'>
                    <button className="upvote-button" 
                        onClick={upvotePost}>
                        <FaThumbsUp className="thumb-icon" /> {curPost.upvotes}
                    </button>
                    <p className="created-at">Created at: {new Date(curPost.created_at).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default PostCard;