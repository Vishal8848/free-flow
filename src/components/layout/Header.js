// Default
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

// Firebase
import { firebaseLogout } from '../../firebase/firebaseAuth'

// Imports
import { Avatar, Tooltip } from '../Extras'
import { AuthContext, ThemeContext, UserContext } from '../../App'
import Notifications from './Notifications'
import Feedback from '../Feedback'
import Search from './Search'

import Cookies from 'universal-cookie';

const Header = ({ setUserCount }) => {

    const { theme, setTheme } = useContext(ThemeContext)

    const { auth, setAuth } = useContext(AuthContext);
    const { user } = useContext(UserContext);

    const userLogout = () => {
        const cookies = new Cookies();
        cookies.remove('access')
        cookies.remove('commit')
        cookies.set('last', Date.now().toString(), { path: '/' })
        firebaseLogout().then(() => setAuth({ status: false, data: null }))
    }

    const [ view, setView ]  = useState(false);

    const [ search, setSearch ] = useState({ open: false, input: "" });
    const [ notify, setNotify ] = useState(false);

    useEffect(() => {

        window.localStorage.setItem('theme', JSON.stringify({ dark: theme === 'dark', at: Date.now() }))
        
    }, [theme]);

    return ( <>
        <nav className={`navbar header navbar-expand-lg navbar-light mb-md-3 shadow-sm fixed-top theme-${theme}-middle`}>
            {   user ?
            <div className={`container-fluid theme-${theme}-middle px-3`}>

                <div className="brand me-2 animate__animated animate__fadeIn">
                    {   search.open ?
                        <i className="fas fa-chevron-left fa-lg text-primary pt-2 mx-2" onClick={() => { search.open = false; setSearch({...search}) }} style={{ cursor:"pointer" }}></i> :
                        <Link to="/feed"> <i className="fab fa-facebook fa-2x text-primary"></i> </Link> 
                    }
                </div>

                <div className={`search-form me-md-auto ms-md-2 theme-${theme}-middle animate__animated animate__fadeIn`}>
                    <input id="search" type="search" className={`form-control ${ search.open && 'search-focus' } rounded-pill theme-${theme}-inner`} placeholder="Search Freeflow"
                        onFocusCapture={() => { search.open = true; setSearch({...search}) }} autoComplete="off"
                        value={search.input} onChange={(e) => { search.input = e.target.value; setSearch({...search}) }}/>
                    <Search search={search.input} uid={auth.data && auth.data.uid} visible={search.open ? true : false} setUserCount={setUserCount}/>
                </div>

                <div className="brand system me-auto animate__animated animate__fadeInDown">
                    <Link to="/feed" className={`navbar-brand theme-${theme}-middle`}> Freeflow </Link>
                </div>

                <div className="user-menu animate__animated animate__fadeIn">

                    <div className={`item me-3 system theme-${theme}-middle shadow`}>
                        <Link to="/feed" className="nav-link"><i className={`fas fa-home fa-lg theme-${theme}-middle`}></i></Link>
                        <Tooltip theme={theme} body="Home"/>
                    </div>

                    <div className={`item me-3 system position-relative theme-${theme}-middle shadow`}>
                        <i className={`fas fa-bell fa-lg theme-${theme}-middle`} onClick={() => setNotify(!notify)}></i>
                        { notify ? <Notifications uid={auth.data && auth.data.uid} top/> : <Tooltip theme={theme} body="Notifications"/> }
                    </div>

                    <div className="dropdown">

                        <div id="user-drop" data-bs-toggle="dropdown" style={{ cursor: "pointer", userSelect: "none", transform: "scale(1.15)" }}>
                            <Avatar image={user.dp} name={user.fname + ' ' + user.lname} scale="sm" theme={user.theme}/>
                        </div>

                        {   auth.status &&
                        <div className={`dropdown-menu dropdown-menu-end theme-${theme}-middle`} aria-labelledby="user-drop">
                            <div className={`tint tint-tr theme-${theme}-middle`}></div>
                            <div className={`actions-partition text-start theme-${theme}-middle`}>
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
                                <div className={`dropdown-item pb-2 theme-${theme}-middle`} onClick={() => setView(true)} style={{ cursor: "pointer" }}>
                                    <i className="fas fa-pen-alt fa-rotate-270 me-2"></i>Feedback
                                </div>
                                <div className={`dropdown-item form-check theme-switch form-switch pb-2 theme-${theme}-middle`}>
                                    <label className="form-check-label" htmlFor="themeColor"><i className={`fas fa-${ theme ? 'moon' : 'sun' } me-2`}></i>Dark Mode</label>
                                    <input className="form-check-input" role="switch" type="checkbox" id="themeColor"
                                        checked={theme === 'dark'} onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}/>
                                </div>
                                <div className={`dropdown-item pt-2 theme-${theme}-middle`} style={{ cursor: "pointer" }} onClick={() => userLogout()}>
                                    <i className="fas fa-sign-out-alt me-2"></i>Logout
                                </div>
                            </div>
                        </div>
                        }
                    </div>
                </div>

            </div> : 
            <div className="text-center m-auto">
                <div id="color-balls">
                    <div id="red-ball"><i className="fas fa-circle text-danger me-2"></i></div>
                    <div id="green-ball"><i className="fas fa-circle text-success me-2"></i></div>
                    <div id="blue-ball"><i className="fas fa-circle text-primary me-2"></i></div>
                    <div id="yellow-ball"><i className="fas fa-circle text-warning"></i></div>
                </div>
            </div>
        }
        </nav>
        { view && <Feedback uid={auth.data && auth.data.uid} setView={setView}/> } 
        </>
    );
}
 
export default Header;