import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import postServices from "../../services/post.services";

const TopJob = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await postServices.getTopJobs();
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (isLoading) {
        return (
            <div className="process-comm">
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            </div>)
    }

    if (user == null) {
        return <p>No results found1.</p>;
    }
    const stripHtml = (html) => {
        const tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        const plainDescription = tmp.textContent || tmp.innerText || '';
        const shortDescription = plainDescription.length > 200
            ? plainDescription.substring(0, 200) + '...'
            : plainDescription;
        return shortDescription;
    };


    return (
        <div className="widget widget-jobs">
            <div className="sd-title">
                <h3>Việc Làm Hàng Đầu</h3>
                <i className="la la-ellipsis-v"></i>
            </div>
            <div className="jobs-list">
                {data.map((post) =>
                    <div className="job-info" key={post._id}>
                        <div className="job-details">
                            <h3>{post.title}</h3>
                            <p>{stripHtml(post.description)}</p>
                        </div>
                        <div className="hr-rate">
                            <span>${post.price} / hr</span>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
}

export default TopJob;
