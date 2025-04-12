import React from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../client';
import './EditPost.css'

const EditPost = ({data}) => {

    const {id} = useParams();
    const [post, setPost] = useState({id: null, title: "", author: "", description: ""});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const updatePost = async (event) => {
        event.preventDefault();
        const {data, error} = await supabase
            .from('Posts')
            .update({title: post.title, author: post.author, description: post.description})
            .eq('id', id)
        if (error) {
            console.error("Error updating post:", error);
        }
        if (data) {
            console.log("Post updated successfully:", data);
        }
        window.location = "/";
    }

    const deletePost = async (event) => {
        event.preventDefault();
        const {data, error} = await supabase
            .from('Posts')
            .delete()
            .eq('id', id)
        if (error) {
            console.error("Error deleting post:", error);
        }
        if (data) {
            console.log("Post deleted successfully:", data);
        }
        window.location = "http://localhost:3000/";
    }

    return (
        <div>
            <form>
                <label htmlFor="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="author">Author</label><br />
                <input type="text" id="author" name="author" value={post.author} onChange={handleChange} /><br />
                <br/>

                <label htmlFor="description">Description</label><br />
                <textarea rows="5" cols="50" id="description" name="description" value={post.description} onChange={handleChange} >
                </textarea>
                <br/>
                <input type="submit" value="Submit" onClick={updatePost}/>
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditPost