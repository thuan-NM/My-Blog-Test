import React, { useState, useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import PostCreation from "../../components/PostCreation";
import PostItem from "../../components/PostItem";
import Pagination from "../../components/Pagination";
import SearchBar from "../../components/SearchBar";
import Suggestions from "../../components/Suggestion";
import { useHashtags } from "../../contexts/HashtagContext";
import { useSearch } from "../../contexts/SearchContext";
import { useAuth } from "../../contexts/AuthContext";
import "../../jquery.range.css"


function Jobs() {
    const [currentPage, setCurrentPage] = useState(1);
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
    const [posts, setPosts] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [totalPages, settotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth()
    const pageSize = 5;
    const { showPostLists, hashtagResults, handleHashtags, setHashtagResults, setShowPostLists } = useHashtags();
    const { handleSearchPost, searchTerm, searchResults, showPostListsWithSearch, setSearchTerm, setSearchResults, setShowPostListsWithSearch } = useSearch();

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postResponse = await axios.get(`http://localhost:3001/posts`);
                const suggestionResponse = await axios.get(`http://localhost:3001/users`);
                setSuggestions(suggestionResponse.data.data)
                setPosts(postResponse.data.data);
                settotalPages(postResponse.data.totalPages)
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };
        fetchPost();
    }, [posts]);

    if (isLoading) {
        return <p>Loading...</p>;
    }
    const handleShowJobModal = (e) => {
        e.preventDefault();
        setIsJobModalOpen(!isJobModalOpen);
    };
    const handleShowProjectModal = (e) => {
        e.preventDefault();
        setIsProjectModalOpen(!isProjectModalOpen);
    };
    return (
        <div><div className="search-sec">
            <div className="container">
                <div className="search-box">
                    <form>
                        <input type="text" name="search" placeholder="Search keywords" />
                        <button type="submit">Search</button>
                    </form>
                </div>
            </div>
        </div>
            <main>
                <div className={`main-section ${(isJobModalOpen || isProjectModalOpen) ? "overlay" : ""}`}>
                    <div className="container">
                        <div className="main-section-data">
                            <div className="row">
                                <div className="col-lg-3 pd-left-none no-pd">
                                    <div className="filter-secs">
                                        <div className="filter-heading">
                                            <h3>Filters</h3>
                                            <a href="#" title="">Clear all filters</a>
                                        </div>
                                        <div className="paddy">
                                            <div className="filter-dd">
                                                <div className="filter-ttl">
                                                    <h3>Skills</h3>
                                                    <a href="#" title="">Clear</a>
                                                </div>
                                                <form>
                                                    <input type="text" name="search-skills" placeholder="Search skills" />
                                                </form>
                                            </div>
                                            <div className="filter-dd">
                                                <div className="filter-ttl">
                                                    <h3>Availabilty</h3>
                                                    <a href="#" title="">Clear</a>
                                                </div>
                                                <ul className="avail-checks">
                                                    <li>
                                                        <input type="radio" name="cc" id="c1" />
                                                        <label htmlFor="c1">
                                                            <span></span>
                                                        </label>
                                                        <small>Hourly</small>
                                                    </li>
                                                    <li>
                                                        <input type="radio" name="cc" id="c2" />
                                                        <label htmlFor="c2">
                                                            <span></span>
                                                        </label>
                                                        <small>Part Time</small>
                                                    </li>
                                                    <li>
                                                        <input type="radio" name="cc" id="c3" />
                                                        <label htmlFor="c3">
                                                            <span></span>
                                                        </label>
                                                        <small>Full Time</small>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="filter-dd">
                                                <div className="filter-ttl">
                                                    <h3>Job Type</h3>
                                                    <a href="#" title="">Clear</a>
                                                </div>
                                                <form className="job-tp">
                                                    <select>
                                                        <option>Select a job type</option>
                                                        <option>Select a job type</option>
                                                        <option>Select a job type</option>
                                                        <option>Select a job type</option>
                                                    </select>
                                                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                </form>
                                            </div>
                                            <div className="filter-dd">
                                                <div className="filter-ttl">
                                                    <h3>Pay Rate / Hr ($)</h3>
                                                    <a href="#" title="">Clear</a>
                                                </div>
                                                <div className="rg-slider">
                                                    <input className="rn-slider slider-input" type="hidden" value="5,50" style={{display: "none"}} />
                                                    <div className="slider-container theme-green" style={{width: "300px"}}>
                                                        <div className="back-bar">
                                                            <div className="selected-bar">
                                                            </div>
                                                            <div className="pointer low">
                                                            </div><div className="pointer-label low" style={{left: "0px"}}>5
                                                            </div>
                                                            <div className="pointer high">
                                                            </div>
                                                            <div className="pointer-label high">50
                                                            </div>
                                                            <div className="clickable-dummy">
                                                            </div>
                                                        </div>
                                                        <div className="scale">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="rg-limit">
                                                    <h4>1</h4>
                                                    <h4>100+</h4>
                                                </div>
                                            </div>
                                            <div className="filter-dd">
                                                <div className="filter-ttl">
                                                    <h3>Experience Level</h3>
                                                    <a href="#" title="">Clear</a>
                                                </div>
                                                <form className="job-tp">
                                                    <select>
                                                        <option>Select a experience level</option>
                                                        <option>3 years</option>
                                                        <option>4 years</option>
                                                        <option>5 years</option>
                                                    </select>
                                                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                </form>
                                            </div>
                                            <div className="filter-dd">
                                                <div className="filter-ttl">
                                                    <h3>Countries</h3>
                                                    <a href="#" title="">Clear</a>
                                                </div>
                                                <form className="job-tp">
                                                    <select>
                                                        <option>Select a country</option>
                                                        <option>United Kingdom</option>
                                                        <option>United States</option>
                                                        <option>Russia</option>
                                                    </select>
                                                    <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-8 no-pd">
                                    <div className="main-ws-sec">
                                        <div className="post-topbar">
                                            <div className="user-picy">
                                                <img src={user.profilePictureUrl || `images/userava.jpg`} />
                                            </div>
                                            <div className="post-st">
                                                <ul>
                                                    <li><button className="post_project" href="#" title="">Post a Project</button></li>
                                                    <li><button className="post-jb" onClick={handleShowJobModal}>Post a Job</button></li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="posts-section">
                                            {posts.map((post, index) => (
                                                <React.Fragment key={post._id}>
                                                    {index === 2 && (
                                                        <div className="top-profiles">
                                                            <div className="pf-hd">
                                                                <h3>Top Profiles</h3>
                                                                <i className="la la-ellipsis-v"></i>
                                                            </div>
                                                            <div className="profiles-slider slick-initialized slick-slider">
                                                                <span className="slick-previous slick-arrow" style={{ display: 'inline' }}></span>
                                                                <span className="slick-nexti slick-arrow" style={{ display: 'inline' }}></span>
                                                            </div>
                                                        </div>)}
                                                    <PostItem post={post}></PostItem>
                                                </React.Fragment>
                                            ))}
                                            <div className="process-comm">
                                                <div className="spinner">
                                                    <div className="bounce1"></div>
                                                    <div className="bounce2"></div>
                                                    <div className="bounce3"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 pd-right-none no-pd">
                                    <div className="right-sidebar">
                                        <div className="widget widget-about">
                                            <img src="images/wd-logo.png" alt="" />
                                            <h3>Track Time on Workwise</h3>
                                            <span>Pay only for the Hours worked</span>
                                            <div className="sign_link">
                                                <h3><Link to={"/auth"} title="">Sign up</Link></h3>
                                                <Link href="#" title="">Learn More</Link>
                                            </div>
                                        </div>
                                        <div className="widget widget-jobs">
                                            <div className="sd-title">
                                                <h3>Top Jobs</h3>
                                                <i className="la la-ellipsis-v"></i>
                                            </div>
                                            <div className="jobs-list">
                                                <div className="job-info">
                                                    <div className="job-details">
                                                        <h3>Senior Product Designer</h3>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
                                                    </div>
                                                    <div className="hr-rate">
                                                        <span>$25/hr</span>
                                                    </div>
                                                </div>
                                                <div className="job-info">
                                                    <div className="job-details">
                                                        <h3>Senior UI / UX Designer</h3>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
                                                    </div>
                                                    <div className="hr-rate">
                                                        <span>$25/hr</span>
                                                    </div>
                                                </div>
                                                <div className="job-info">
                                                    <div className="job-details">
                                                        <h3>Junior Seo Designer</h3>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
                                                    </div>
                                                    <div className="hr-rate">
                                                        <span>$25/hr</span>
                                                    </div>
                                                </div>
                                                <div className="job-info">
                                                    <div className="job-details">
                                                        <h3>Senior PHP Designer</h3>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
                                                    </div>
                                                    <div className="hr-rate">
                                                        <span>$25/hr</span>
                                                    </div>
                                                </div>
                                                <div className="job-info">
                                                    <div className="job-details">
                                                        <h3>Senior Developer Designer</h3>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
                                                    </div>
                                                    <div className="hr-rate">
                                                        <span>$25/hr</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="widget widget-jobs">
                                            <div className="sd-title">
                                                <h3>Most Viewed This Week</h3>
                                                <i className="la la-ellipsis-v"></i>
                                            </div>
                                            <div className="jobs-list">
                                                <div className="job-info">
                                                    <div className="job-details">
                                                        <h3>Senior Product Designer</h3>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
                                                    </div>
                                                    <div className="hr-rate">
                                                        <span>$25/hr</span>
                                                    </div>
                                                </div>
                                                <div className="job-info">
                                                    <div className="job-details">
                                                        <h3>Senior UI / UX Designer</h3>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
                                                    </div>
                                                    <div className="hr-rate">
                                                        <span>$25/hr</span>
                                                    </div>
                                                </div>
                                                <div className="job-info">
                                                    <div className="job-details">
                                                        <h3>Junior Seo Designer</h3>
                                                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</p>
                                                    </div>
                                                    <div className="hr-rate">
                                                        <span>$25/hr</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="widget suggestions full-width">
                                            <div className="sd-title">
                                                <h3>Most Viewed People</h3>
                                                <i className="la la-ellipsis-v"></i>
                                            </div>
                                            <div className="suggestions-list">
                                                <div className="suggestion-usd">
                                                    <img src="images/myfavicon.png" alt="" />
                                                    <div className="sgt-text">
                                                        <h4>Jessica William</h4>
                                                        <span>Graphic Designer</span>
                                                    </div>
                                                    <span><i className="la la-plus"></i></span>
                                                </div>
                                                <div className="suggestion-usd">
                                                    <img src="images/myfavicon.png" alt="" />
                                                    <div className="sgt-text">
                                                        <h4>John Doe</h4>
                                                        <span>PHP Developer</span>
                                                    </div>
                                                    <span><i className="la la-plus"></i></span>
                                                </div>
                                                <div className="suggestion-usd">
                                                    <img src="images/myfavicon.png" alt="" />
                                                    <div className="sgt-text">
                                                        <h4>Poonam</h4>
                                                        <span>Wordpress Developer</span>
                                                    </div>
                                                    <span><i className="la la-plus"></i></span>
                                                </div>
                                                <div className="suggestion-usd">
                                                    <img src="images/myfavicon.png" alt="" />
                                                    <div className="sgt-text">
                                                        <h4>Bill Gates</h4>
                                                        <span>C &amp; C++ Developer</span>
                                                    </div>
                                                    <span><i className="la la-plus"></i></span>
                                                </div>
                                                <div className="suggestion-usd">
                                                    <img src="images/myfavicon.png" alt="" />
                                                    <div className="sgt-text">
                                                        <h4>Jessica William</h4>
                                                        <span>Graphic Designer</span>
                                                    </div>
                                                    <span><i className="la la-plus"></i></span>
                                                </div>
                                                <div className="suggestion-usd">
                                                    <img src="images/myfavicon.png" alt="" />
                                                    <div className="sgt-text">
                                                        <h4>John Doe</h4>
                                                        <span>PHP Developer</span>
                                                    </div>
                                                    <span><i className="la la-plus"></i></span>
                                                </div>
                                                <div className="view-more">
                                                    <Link href="#" title="">View More</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <PostCreation isJobModalOpen={isJobModalOpen} handleShowJobModal={handleShowJobModal} isProjectModalOpen={isProjectModalOpen} handleShowProjectModal={handleShowProjectModal} />
            </main>
        </div>
    );
}

export default Jobs;