import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";
import { FaSpotify } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Editpost = () => {
    const location = useLocation();
    const [post, setPost] = useState(location.state?.curPost || {});
    const [searchResults, setSearchResults] = useState([]);
    const [title, setTitle] = useState(post.title || "");
    const [content, setContent] = useState(post.content || "");
    const [spotifySearch, setSpotifySearch] = useState("");
    const [selectedTrack, setSelectedTrack] = useState("");
    const navigate = useNavigate();

    const getSpotifyToken = async () => {
        const client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
        const client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
        const authOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization:
                    "Basic " +
                    btoa(`${client_id}:${client_secret}`), // Base64 encode client_id:client_secret
            },
            body: new URLSearchParams({
                grant_type: "client_credentials",
            }),
        };

        const response = await fetch("https://accounts.spotify.com/api/token", authOptions);
        const data = await response.json();

        if (response.ok) {
            return data.access_token; // Return the access token
        } else {
            console.error("Error fetching Spotify token:", data);
            throw new Error("Failed to fetch Spotify token");
        }
    };

    useEffect(() => {
        const fetchTrack = async () => {
            try {
                const token = await getSpotifyToken();
                const response = await fetch(
                    `https://api.spotify.com/v1/tracks/${post.track_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();
                console.log("Spotify search results:", data);
                setSearchResults([data]);
                setSelectedTrack(data);
            } catch (error) {
                console.error("Error during Spotify search:", error);
            }
        };
        fetchTrack();
    }, [post.id]);

    const handleSpotifySearch = async () => {
        try {
            const token = await getSpotifyToken(); // Get the Spotify access token
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${encodeURIComponent(spotifySearch)}&type=track&limit=5`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const data = await response.json();
            console.log("Spotify search results:", data);
            setSearchResults(data.tracks.items);
        } catch (error) {
            console.error("Error during Spotify search:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {data, error} = await supabase
            .from('Posts')
            .update([
                {
                    title: title,
                    content: content,
                    name: selectedTrack?.name || "Unknown Track",
                    artist: selectedTrack?.artists[0]?.name || "Unknown Artist",
                    album: selectedTrack?.album?.name || "Unknown Album",
                    album_image: selectedTrack?.album?.images[0]?.url,
                    release_date: selectedTrack?.album?.release_date || "Unknown Release Date",
                    spotify_url: selectedTrack?.external_urls?.spotify,
                    track_id: selectedTrack?.id || null,
                    upvotes: post.upvotes,
                    comments: post.comments,
                },
            ])
            .eq('id', post.id)
            .select();

        if (error) {
            console.error("Error updating data:", error);
            return;
        }
        console.log("Data updated:", data);

        navigate("/");
    };

    return (
        <div>
            <h1>Edit Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="search-group">
                    <label>Search Spotify:</label>
                    <input
                        type="text"
                        value={spotifySearch}
                        onChange={(e) => setSpotifySearch(e.target.value)}
                    />
                    <button type="button" onClick={handleSpotifySearch}>
                        Search
                    </button>
                </div>
                <div className="search-results">
                    {searchResults.map((track) => (
                        <div
                            key={track.id}
                            className={`track-item ${
                                selectedTrack?.id === track.id ? "selected" : ""
                            }`}
                        >
                            <img
                                src={track.album.images[1]?.url}
                                alt={track.album.name}
                                className="album-cover"
                            />
                            <p>
                                <strong>Track:</strong> {track.name}
                            </p>
                            <p>
                                <strong>Artist:</strong> {track.artists[0].name}
                            </p>
                            <p>
                                <strong>Album:</strong> {track.album.name}
                            </p>
                            <p>
                                <strong>Release Date:</strong> {track.album.release_date}
                            </p>
                            <a
                                href={track.external_urls.spotify}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Listen on Spotify
                            </a>
                            <button
                                type="button"
                                onClick={() => setSelectedTrack(track)}
                            >
                                {selectedTrack?.id === track.id
                                    ? "Selected"
                                    : "Select"}
                            </button>
                        </div>
                    ))}
                </div>
                <div className="form-group">
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Content:</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Share your thoughts about this song..."
                        rows="4"
                        required
                    />
                </div>
                <button type="submit" disabled={!selectedTrack || !title || !content}>
                    Update Post
                </button>
            </form>
        </div>
    );
}

export default Editpost;