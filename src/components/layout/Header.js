import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Tooltip, readStoredTheme } from '../Extras'
import Notifications from './Notifications'
import { AuthContext, UserContext } from '../../App'
import { firebaseLogout } from '../../firebase/firebaseAuth'
import Search from './Search'
import Feedback from '../Feedback'

import Cookies from 'universal-cookie';

const Header = ({ setUserCount }) => {

    const { auth, setAuth } = useContext(AuthContext);
    const { user } = useContext(UserContext);

    const userLogout = () => {
        const cookies = new Cookies();
        cookies.remove('access')
        cookies.remove('commit')
        cookies.set('last', Date.now().toString())
        firebaseLogout().then(() => setAuth({ status: false, data: null }))
    }

    const mode = readStoredTheme();

    const [ view, setView ]  = useState(false);

    const [ search, setSearch ] = useState({ open: false, input: "" });
    const [ theme, setTheme ] = useState(mode);
    const [ notify, setNotify ] = useState(false);

    useEffect(() => {
        if(theme)  {
            window.localStorage.setItem('theme', JSON.stringify({ dark: true, at: Date.now() }))
            document.styleSheets[3].cssRules[61].style.backgroundColor = "rgb(24, 25, 26)"
            document.styleSheets[3].cssRules[62].style.backgroundColor = "rgb(28, 30, 33)"
            document.styleSheets[3].cssRules[63].style.backgroundColor = "rgb(32, 35, 40)"
            document.styleSheets[3].cssRules[64].style.color = "rgb(238, 238, 238)"
        }   else {
            window.localStorage.setItem('theme', JSON.stringify({ dark: false, at: Date.now() }))
            document.styleSheets[3].cssRules[61].style.backgroundColor = "rgb(244, 247, 248)"
            document.styleSheets[3].cssRules[62].style.backgroundColor = "rgb(255, 255, 255)"
            document.styleSheets[3].cssRules[63].style.backgroundColor = "rgb(248, 255, 255)"
            document.styleSheets[3].cssRules[64].style.color = "rgb(25, 25, 25)"
        }
    }, [theme]);

    return ( <>
        <nav className="navbar header navbar-expand-lg navbar-light mb-md-3 shadow-sm fixed-top theme-middle">
            {   user ?
            <div className="container-fluid theme-middle px-3">

                <div className="brand me-2">
                    {   search.open ?
                        <i className="fas fa-chevron-left fa-lg text-primary pt-2 mx-2" onClick={() => { search.open = false; setSearch({...search}) }} style={{ cursor:"pointer" }}></i> :
                        <Link to="/feed"> <i className="fab fa-facebook fa-2x text-primary"></i> </Link> 
                    }
                </div>

                <div className="search-form me-md-auto ms-md-2 theme-middle">
                    <input id="search" type="search" className={`form-control ${ search.open && 'search-focus' } rounded-pill theme-inner`} placeholder="Search Freeflow"
                        onFocusCapture={() => { search.open = true; setSearch({...search}) }} autoComplete="off"
                        value={search.input} onChange={(e) => { search.input = e.target.value; setSearch({...search}) }}/>
                    <Search search={search.input} uid={auth.data && auth.data.uid} visible={search.open ? true : false} setUserCount={setUserCount}/>
                </div>

                <div className="brand system me-auto">
                    <Link to="/feed" className="navbar-brand theme-middle"> Freeflow </Link>
                </div>

                <div className="user-menu">

                    <div className="item me-3 system theme-middle shadow">
                        <Link to="/feed" className="nav-link"><i className="fas fa-home fa-lg theme-inner"></i></Link>
                        <Tooltip body="Home"/>
                    </div>

                    <div className="item me-3 system position-relative theme-middle shadow">
                        <div className="docker bg-danger"></div>
                        <i className="fas fa-bell fa-lg theme-inner" onClick={() => setNotify(!notify)}></i>
                        { notify ? <Notifications uid={auth.data && auth.data.uid} top/> : <Tooltip body="Notifications"/> }
                    </div>

                    <div className="dropdown">

                        <div id="user-drop" data-bs-toggle="dropdown" style={{ cursor: "pointer", userSelect: "none" }}>
                            <Avatar image={user.dp} name={user.fname + ' ' + user.lname} scale="sm" theme={user.theme}/>
                        </div>

                        {   auth.status &&
                        <div className="dropdown-menu dropdown-menu-end theme-inner" aria-labelledby="user-drop">
                            <div className="tint tint-tr theme-inner"></div>
                            <div className="actions-partition text-start theme-inner">
                                <Link to={`/profile/${auth.data.uid.split("").reverse().join("")}`} className="dropdown-item pb-2">
                                    <i className="fas fa-user me-2"></i>Profile
                                </Link>
                                <Link to={`/profile/${auth.data.uid.split("").reverse().join("")}?type=posts`} className="dropdown-item pb-2">
                                    <i className="fas fa-paper-plane me-2"></i>Posts
                                </Link>
                                <Link to={`/profile/${auth.data.uid.split("").reverse().join("")}?type=friends`} className="dropdown-item pb-2">
                                    <i className="fas fa-heart me-2"></i>Friends
                                </Link>
                                <Link to={`/profile/${auth.data.uid.split("").reverse().join("")}?type=saved`} className="dropdown-item pb-2">
                                    <i className="fas fa-bookmark me-2"></i>Saved
                                </Link>
                                <div className="dropdown-item pb-2 theme-inner" onClick={() => setView(true)} style={{ cursor: "pointer" }}>
                                    <i className="fas fa-pen-alt fa-rotate-270 me-2"></i>Feedback
                                </div>
                                <div className="dropdown-item form-check theme-switch form-switch pb-2 theme-inner">
                                    <label className="form-check-label" htmlFor="themeColor"><i className={`fas fa-${ theme ? 'moon' : 'sun' } me-2`}></i>Dark Mode</label>
                                    <input className="form-check-input" role="switch" type="checkbox" id="themeColor"
                                        checked={theme} onChange={(e) => setTheme(e.target.checked)}/>
                                </div>
                                <div className="dropdown-item pt-2 theme-inner" style={{ cursor: "pointer" }} onClick={() => userLogout()}>
                                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>

            </div> : "Loading" }
        </nav>
        { view && <Feedback setView={setView}/> } 
        </>
    );
}
 
export default Header;