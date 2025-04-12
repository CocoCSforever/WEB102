import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { supabase } from '../client';

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const {data, error} = await supabase
                .from('Posts')
                .select('*')
                .order('created_at', { ascending: true });
            if (error) {
                console.error("Error fetching data:", error);
            }
            setPosts(data);
        }
        fetchPosts();
    }, [props]);
    
    return (
        <div className="ReadPosts">
            {
                posts && posts.length > 0 ?
                posts.map((post,index) => 
                   <Card key={index} id={post.id} title={post.title} author={post.author} description={post.description} betCount={post.betCount}/>
                ) : <h2>{'No Challenges Yet 😞'}</h2>
            }
        </div>  
    )
}

export default ReadPosts;