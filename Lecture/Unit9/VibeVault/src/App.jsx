import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeFeed from "./pages/HomeFeed";
import CreatePost from "./pages/CreatePost";
import PostDetail from "./components/PostDetail";
import Header from "./components/Header";
import EditPost from "./pages/EditPost";
import "./App.css";

function App() {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <Router>
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <Routes>
                <Route path="/" element={<HomeFeed searchQuery={searchQuery} />} />
                <Route path="/create" element={<CreatePost />} />
                <Route path="/post/:id" element={<PostDetail />} />
                <Route path="/post/:id/edit" element={<EditPost />} />
            </Routes>
        </Router>
    );
}

export default App;