import React from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const Suggestions = () => {

    const { user } = useAuth();
    const { data, isLoading, error } = useQuery(
        ["users", user],
        () =>
            axios
                .get(
                    `http://localhost:3001/users`)
                .then((response) => response.data),
    );

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching posts: {error.message}</p>;
    }

    if (data.data.length === 0 || data === null) {
        return <p>No results found.</p>;
    }

    if (user == null || user.friendRequests == null) {
        return <p>No results found1.</p>;
    }
    return (
        <div className="widget suggestions full-width">
            <div className="sd-title">
                <h3>Những người bạn có thể biết</h3>
                <i className="la la-ellipsis-v"></i>
            </div>
            <div className="suggestions-list">
                {data.data.map((suggestion) => (user && user._id && user._id != suggestion._id && (
                    <div className="suggestion-usd" key={suggestion._id} >
                        <img src={suggestion.profilePictureUrl || `images/userava.jpg`} />
                        <div className="sgt-text">
                            <h4>{suggestion.firstName} {suggestion.lastName}</h4>
                            <span>Graphic Designer</span>
                        </div>
                        <span><i className="la la-plus"></i></span>
                    </div>
                )))}
                <div className="view-more">
                    <Link to={"/users"}>Xem thêm</Link>
                </div>
            </div>

        </div>
    )
}

export default Suggestions;