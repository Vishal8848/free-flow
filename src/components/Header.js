import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { Avatar, Tooltip } from './Extras'
import Notifications from './Notifications'

const SearchUser = () => {

    const [ request, setRequest ] = useState(false);

    return (
        <div className={`search-user p-2 theme-middle`}>
            <Avatar name="Vishal Pranav" scale="sm" theme="success"/>
            <div className="fs-6 mx-3 w-100">Abishek Prasannaa</div>
            <button className={`btn btn-${ request ? 'secondary' : 'primary' } btn-sm`} onClick={() => setRequest(true)} disabled={ request ? "disabled" : "" }>
                { !request && <i className="fas fa-plus me-2"></i> }
                { request ? "Requested" : "Friend" }
            </button>
        </div>
    );
}

const Search = () => {
    return (
        <div className="search p-2 theme-middle">
            <span className="feed-title ps-3 text-muted fw-bold">Search Results</span>
            <SearchUser />
            <SearchUser />
            <SearchUser/>
        </div>
    );
}

const Header = () => {

    const [ search, setSearch ] = useState({ open: false, input: "" });
    const [ theme, setTheme ] = useState(false);
    const [ notify, setNotify ] = useState(false);

    useEffect(() => {
        if(theme)  {
            document.styleSheets[3].cssRules[60].style.backgroundColor = "rgb(24, 25, 26)"
            document.styleSheets[3].cssRules[61].style.backgroundColor = "rgb(28, 30, 33)"
            document.styleSheets[3].cssRules[62].style.backgroundColor = "rgb(32, 35, 40)"
            document.styleSheets[3].cssRules[63].style.color = "rgb(238, 238, 238)";
        }   else {
            document.styleSheets[3].cssRules[60].style.backgroundColor = "rgb(187, 191, 202)"
            document.styleSheets[3].cssRules[61].style.backgroundColor = "rgb(232, 232, 232)"
            document.styleSheets[3].cssRules[62].style.backgroundColor = "rgb(244, 244, 242)"
            document.styleSheets[3].cssRules[63].style.color = "rgb(25, 25, 25)";
        }
    }, [theme]);

    return ( 
        <nav className="navbar header navbar-expand-lg navbar-light mb-md-3 theme-middle">
            <div className="container-fluid theme-middle">

                <div className="brand me-2">
                    {   search.open ?
                        <i className="fas fa-chevron-left fa-lg text-primary pt-2 mx-2" onClick={() => { search.open = false; setSearch({...search}) }} style={{ cursor:"pointer" }}></i> :
                        <Link to="/feed"> <i className="fab fa-facebook fa-2x text-primary"></i> </Link> 
                    }
                </div>

                { search.open && <div className="show-search bg-transparent"></div> }
                <div className="search-form me-md-auto ms-md-2 theme-middle">
                    <input id="search" type="search" className={`form-control ${ search.open && 'search-focus' } rounded-pill theme-inner`} placeholder="Search Freeflow"
                        onFocusCapture={() => { search.open = true; setSearch({...search}) }}
                        value={search.input} onChange={(e) => { search.input = e.target.value; setSearch({...search}) }}/>
                    { search.open && <Search /> }
                </div>

                <div className="brand system me-auto">
                    <Link to="/feed" className="navbar-brand theme-middle"> Freeflow </Link>
                </div>

                <div className="user-menu">

                    <div className="item me-3 system theme-middle shadow">
                        <Link to="/feed" className="nav-link"><i className="fas fa-home fa-lg theme-inner"></i></Link>
                        <Tooltip type="Home"/>
                    </div>

                    <div className="item me-3 system position-relative theme-middle shadow">
                        <div className="docker bg-danger"></div>
                        <i className="fas fa-bell fa-lg theme-inner" onClick={() => setNotify(!notify)}></i>
                        { notify ? <Notifications top/> : <Tooltip type="Notifications"/> }
                    </div>

                    <div className="dropdown">

                        <div id="user-drop" data-bs-toggle="dropdown" style={{ cursor: "pointer", userSelect: "none" }}>
                            <Avatar name="Vishal Pranav" theme="danger" scale="md"/>
                        </div>

                        <div className="dropdown-menu dropdown-menu-end theme-inner" aria-labelledby="user-drop">
                            <div className="tint tint-tr theme-inner"></div>
                            <div className="user-partition">
                                <Avatar name="Vishal Pranav" scale="lg" theme="success"/>
                                <div className="u-name mt-2 text-center"><h5>Vishal Pranav</h5></div>
                            </div>
                            <div className="dropdown-divider"></div>
                            <div className="actions-partition text-start theme-inner">
                                <Link to="/profile" className="dropdown-item pb-2 theme-inner"><i className="fas fa-user me-2"></i> Profile</Link>
                                <Link to="/profile?type=posts" className="dropdown-item pb-2 theme-inner"><i className="fas fa-paper-plane me-2"></i>Posts</Link>
                                <Link to="/profile?type=friends" className="dropdown-item pb-2 theme-inner"><i className="fas fa-heart me-2"></i>Friends</Link>
                                <Link to="/profile?type=saved" className="dropdown-item pb-2 theme-inner"><i className="fas fa-bookmark me-2"></i>Saved</Link>
                                <Link to="/contact" className="dropdown-item pb-2 theme-inner"><i className="fas fa-pen-alt fa-rotate-270 me-2"></i>Feedback</Link>
                                <div className="form-check theme-switch form-switch pb-2 theme-inner">
                                    <label className="form-check-label" htmlFor="themeColor"><i className={`fas fa-${ theme ? 'moon' : 'sun' } me-2`}></i>Dark Mode</label>
                                    <input className="form-check-input" role="switch" type="checkbox" id="themeColor"
                                        checked={theme} onChange={(e) => setTheme(e.target.checked)}/>
                                </div>
                                <Link to="/" className="dropdown-item pt-2 theme-inner"><i className="fas fa-sign-out-alt me-2"></i>Logout</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    );
}
 
export default Header;