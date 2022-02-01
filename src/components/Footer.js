import { useState} from 'react';
import Notifications from './Notifications';
import { Link } from 'react-router-dom'

const Footer = () => {

    // const page = window.location.href.split('/')[3].startsWith('profile');

    let [ notify, setNotify ] = useState(false);

    return ( <>
        <div className="w-100 footer-sys text-center py-3 mt-md-3 theme-middle">
            &copy; Copyright: <Link to="/" className="text-primary" style={{ textDecoration: "none" }}>Freeflow</Link>
        </div>
        <div className="user-menu footer-mob w-100 text-center py-2 mt-md-3 theme-middle fixed-bottom">
            <div className="item theme-middle d-block">
                <Link to="/feed" className="theme-middle">
                    <i className={`fas fa-home fa-lg`}></i>
                    Home
                </Link>
            </div>

            <div className="item theme-middle d-block">
                <Link to="/feed?type=chat" className="theme-middle">
                    <i className={`fas fa-comments fa-lg`}></i>
                    Chat
                </Link>
            </div>

            <div className="item theme-middle">
                <Link to="/profile" className="theme-middle">
                    <i className={`fas fa-user fa-lg`}></i>
                    You
                </Link>
            </div>

            <div className="item theme-middle position-relative">
                <div className="docker me-2 bg-danger"></div>
                <span>  <i className={`fas fa-bell fa-lg`} onClick={() => setNotify(!notify) }></i> News  </span>
            </div>

            <div className="item theme-middle d-block">
                <Link to="/feed?type=trend" className="theme-middle">
                    <i className={`fas fa-fire fa-lg`}></i>
                    Trend
                </Link>
            </div>
        </div>
        { notify && <Notifications bottom notify={setNotify}/> }
    </>);
}
 
export default Footer;