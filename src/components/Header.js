import { useState } from 'react';
import { Link } from 'react-router-dom'
import { Avatar, Tooltip } from './Extras'
import Notifications from './Notifications'

const SearchUser = ({ nb }) => {

    const [ request, setRequest ] = useState(false);

    return (
        <div className={`search-user p-2 bg-light ${ !nb && 'border-bottom' }`}>
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
        <div className="search p-2 bg-light border-end border-bottom">
            <span className="feed-title ps-3 text-muted fw-bold">Search Results</span>
            <SearchUser />
            <SearchUser />
            <SearchUser nb={true}/>
        </div>
    );
}

const Header = () => {

    const [ search, setSearch ] = useState({ open: false, input: "" });
    const [ notify, setNotify ] = useState(false);

    return ( 
        <nav className="navbar header navbar-expand-lg navbar-light mb-md-3 bg-light border-bottom">
            <div className="container-fluid">

                <div className="brand me-2">
                    {   search.open ?
                        <i className="fas fa-chevron-left fa-lg text-primary pt-2 mx-2" onClick={() => { search.open = false; setSearch({...search}) }} style={{ cursor:"pointer" }}></i> :
                        <Link to="/feed"> <i className="fab fa-facebook fa-2x text-primary"></i> </Link> 
                    }
                </div>

                { search.open && <div className="show-search bg-transparent border-end"></div> }
                <div className="search-form me-md-auto ms-md-2">
                    <input id="search" type="search" className={`form-control ${ search.open && 'search-focus' } rounded-pill shadow-sm`} placeholder="Search Freeflow"
                        onFocusCapture={() => { search.open = true; setSearch({...search}) }}
                        value={search.input} onChange={(e) => { search.input = e.target.value; setSearch({...search}) }}/>
                    { search.open && <Search /> }
                </div>

                <div className="brand system me-auto">
                    <Link to="/feed" className="navbar-brand"> Freeflow </Link>
                </div>

                <div className="user-menu">

                    <div className="item border shadow-sm me-3 system">
                        <Link to="/feed" className="nav-link"><i className="fas fa-home fa-lg text-dark"></i></Link>
                        <Tooltip type="Home"/>
                    </div>

                    <div className="item border shadow-sm me-3 system position-relative">
                        <div className="docker bg-danger"></div>
                        <i className="fas fa-bell fa-lg" onClick={() => setNotify(!notify)}></i>
                        { notify ? <Notifications top/> : <Tooltip type="Notifications"/> }
                    </div>

                    <div className="dropdown">

                        <div id="user-drop" data-bs-toggle="dropdown" style={{ cursor: "pointer", userSelect: "none" }}>
                            <Avatar name="Vishal Pranav" theme="danger" scale="md"/>
                        </div>

                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="user-drop">
                            <div className="tint tint-tr"></div>
                            <div className="user-partition">
                                <Avatar name="Vishal Pranav" scale="lg" theme="success"/>
                                <div className="u-name mt-2 text-center"><h5>Vishal Pranav</h5></div>
                            </div>
                            <div className="dropdown-divider"></div>
                            <div className="actions-partition text-start">
                                <div className="dropdown-header text-center">ACTIONS</div>
                                <Link to="/profile" className="dropdown-item fw-bold">Profile</Link>
                                <Link to="/profile?type=posts" className="dropdown-item fw-bold">Posts</Link>
                                <Link to="/profile?type=friends" className="dropdown-item fw-bold">Friends</Link>
                                <Link to="/profile?type=saved" className="dropdown-item fw-bold">Saved</Link>
                                <Link to="/contact" className="dropdown-item fw-bold">Feedback</Link>
                                <div className="dropdown-divider"></div>
                                <Link to="/" className="dropdown-item fw-bold">Logout</Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    );
}
 
export default Header;