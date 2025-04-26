import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from '../client';
import PostCard from "../components/PostCard";

const HomeFeed = () => {
    const [posts, setPosts] = useState([]);
    const [sortBy, setSortBy] = useState("created_at");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchPosts = async () => {
            const { data, error } = await supabase
                .from('Posts')
                .select('*')
                .order('created_at', { ascending: false })
                .order('upvotes', { ascending: false });

            if (error) {
                console.error("Error fetching posts:", error);
            } else {
                console.log("Fetched posts:", data);
                setPosts(data);
            }
        };
        fetchPosts();
    }, []);

    const sortedPosts = [...posts]
        .filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => (sortBy === "created_at" ? b.created_at - a.created_at : b.upvotes - a.upvotes));

    return (
        <div className="home-feed-container">
            <h1>Home Feed</h1>
            <input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="header-search-bar"
            />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="header-sort-dropdown">
                <option value="created_at">Sort by Creation Time</option>
                <option value="upvotes">Sort by Upvotes</option>
            </select>
            <div className="search-results">
                {sortedPosts.map((post) => (
                    <PostCard key={post.id} post={post} setPosts={setPosts}/>
                ))}
            </div>
        </div>
    );
};

export default HomeFeed;