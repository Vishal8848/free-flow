import { useContext, useState} from 'react';
import { Link } from 'react-router-dom'
import { AuthContext } from '../App';
import Notifications from './Notifications'

const Footer = () => {

    // const page = window.location.href.split('/')[3].startsWith('profile');

    const { auth } = useContext(AuthContext);

    let [ notify, setNotify ] = useState(false);

    return ( <>
        <div className="user-menu footer-mob w-100 text-center py-2 mt-md-3 fixed-bottom theme-middle">
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

            {   auth.data &&
                <div className="item theme-middle">
                    <Link to={`/profile/${auth.data.uid.split("").reverse().join("")}`} className="theme-middle">
                        <i className={`fas fa-user fa-lg`}></i>
                        You
                    </Link>
                </div>
            }

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
        { notify && <Notifications uid={auth.data && auth.data.uid} bottom notify={setNotify}/> }
    </>);
}
 
export default Footer;