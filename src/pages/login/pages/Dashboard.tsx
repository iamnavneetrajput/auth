import React, { lazy, useEffect, useState } from 'react';
import { CiUser, CiHeart, CiBookmark } from 'react-icons/ci';
import { FaRegComment } from "react-icons/fa";
import { GoGear } from "react-icons/go";
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

import '../../../assets/css/login.css'

const DashboardItem = lazy(() => import('../components/DashboardItem'));

const Dashboard: React.FC = () => {
    const [likes, setLikes] = useState<number>(0);
    const [latestComment, setLatestComment] = useState<string>("No comments yet.");
    const [bookmarks, setBookmarks] = useState<number>(0);
    const [profileImage, setProfileImage] = useState<string>("");
    const [likedContent, setLikedContent] = useState<string>("");
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        // Simulating data fetching with placeholder values
        setLikes(50); // Example count for likes
        setLatestComment("This is the latest comment."); // Example comment
        setBookmarks(10); // Example count for bookmarks
        setProfileImage("https://www.kasandbox.org/programming-images/avatars/marcimus-purple.png"); // Example profile image path
        setLikedContent("Example liked content description."); 
    }, []);

    const dashboardItems = [
        { title: "Likes", icon: <CiHeart />, navigateTo: "/like", divClass: "likes", content: "No Likes Found", likedContent },
        { title: user.name, icon: <CiUser />, navigateTo: "/account", divClass: "account", content: user.email, image: profileImage },
        { title: "Settings", icon: <GoGear />, navigateTo: "/settings", divClass: "settings", content: "Adjust preferences" },
        { title: "Comments", icon: <FaRegComment />, navigateTo: "/comments", divClass: "comments", content: latestComment },
        { title: "Bookmarks", icon: <CiBookmark />, navigateTo: "/bookmarks", divClass: "bookmarks", content: "No Bookmark Found", bookmarks },
    ];

    return (
        <div className="main-content">
            <div className="parent main">
                {dashboardItems.map((item, index) => (
                    <DashboardItem key={index} {...item} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
