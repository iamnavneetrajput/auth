import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { logout } from "../../features/auth/authSlice";
import { setLastPage } from "../../reducers/lastPageSlice";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";
import { RiSettings2Line, RiUser6Line, RiLogoutCircleRLine, RiBookmarkLine } from "react-icons/ri";
import { HiOutlinePencilSquare } from "react-icons/hi2";

const Sublink = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);

    const handlePreviousPageClick = () => {
        dispatch(setLastPage(location.pathname)); // Store the last page before navigating
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    return (
        <div className="sub-line">
            <ul>
                {user ? (
                    <>
                        <li><NavLink to="/write"> <HiOutlinePencilSquare /><span>Write</span> </NavLink></li>
                        <li><NavLink to="/account"> <RiUser6Line /><span>Account</span> </NavLink></li>
                        <li><NavLink to="/settings"> <RiSettings2Line/><span>Settings</span></NavLink></li>
                        <li><NavLink to="/bookmarks"> <RiBookmarkLine/><span>Bookmarks</span></NavLink></li>
                        <li><button onClick={handleLogout} className="logout-btn"> <RiLogoutCircleRLine /><span>Logout</span></button></li>
                        
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to="/login" onClick={handlePreviousPageClick}> <FaSignInAlt /> Login </NavLink>
                        </li>
                        <li>
                            <NavLink to="/signup" onClick={handlePreviousPageClick}> <FaUserPlus /> Signup </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Sublink;
