import { Link } from 'react-router-dom'
import Avatar from '../components/Avatar'

const Header = () => {

    return ( 
        <nav className="navbar header navbar-expand-lg navbar-light mb-md-3 bg-light border-bottom">
            <div className="container-fluid">

                {/* Brand */}
                <div className="brand mobile">
                    <Link to="/feed"> <i className="fab fa-facebook fa-2x text-primary"></i> </Link>
                </div>

                {/* Search People Form */}
                <div className="search-form">
                    <input type="search" className="form-control rounded-pill shadow-sm" placeholder="Search Freeflow"/>
                </div>

                {/* Brand */}
                <div className="brand system">
                    <Link to="/feed" className="navbar-brand"> Freeflow </Link>
                </div>

                {/* User Menu */}
                <div className="user-menu">

                    {/* Feed */}
                    <div className="item border shadow-sm me-3 system">
                        <Link to="/feed" className="nav-link"><i className="fas fa-home fa-lg text-dark"></i></Link>
                    </div>

                    {/* Notifications */}
                    <div className="item border shadow-sm me-3 system position-relative">
                        <div className="docker bg-danger"></div>
                        <i className="fas fa-bell fa-lg"></i>
                    </div>

                    {/* User Dropdown */}
                    <div className="dropdown">

                        {/* Trigger */}
                        <div id="user-drop" data-bs-toggle="dropdown" style={{ cursor: "pointer", userSelect: "none" }}>
                            <Avatar name="Vishal Pranav" theme="danger" scale="md"/>
                        </div>

                        {/* Dropdown */}
                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="user-drop">
                            <div className="tint tint-tr"></div>
                            <div className="user-partition text-center">
                                <div className="u-image border shadow m-auto"></div>
                                <div className="u-name mt-2"><h5>Vishal Pranav</h5></div>
                            </div>
                            <div className="dropdown-divider"></div>
                            <div className="actions-partition text-start">
                                <div className="dropdown-header text-center">ACTIONS</div>
                                <Link to="/profile" className="dropdown-item fw-bold"><i className="fas fa-user me-2 text-dark"></i>Profile</Link>
                                <Link to="/profile?type=posts" className="dropdown-item fw-bold"><i className="fas fa-paper-plane me-2 text-primary"></i>Posts</Link>
                                <Link to="/profile?type=friends" className="dropdown-item fw-bold"><i className="fas fa-heart me-2 text-danger"></i>Friends</Link>
                                <Link to="/profile?type=saved" className="dropdown-item fw-bold"><i className="fas fa-bookmark me-2 text-success"></i>Saved</Link>
                                <Link to="/contact" className="dropdown-item fw-bold"><i className="fas fa-lightbulb me-2 text-warning"></i>Feedback</Link>
                                <div className="dropdown-divider"></div>
                                <Link to="/" className="dropdown-item fw-bold"><i className="fas fa-sign-out-alt me-2"></i>Logout</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    );
}
 
export default Header;