import React from "react";
import { Link } from "react-router-dom";

const Header = ({ searchQuery, setSearchQuery }) => {
    return (
        <header className="header">
            <h1 className="header-title">VibeVault</h1>
            <div className="header-buttons">
                <Link to="/" className="header-button">
                    Home
                </Link>
                <Link to="/create" className="header-button">
                    Create New Post
                </Link>
            </div>
        </header>
    );
};

export default Header;