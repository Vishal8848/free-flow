// Default
import { useContext, useState} from 'react'
import { Link } from 'react-router-dom'

// Imports
import Notifications from './Notifications'
import { AuthContext, ThemeContext } from '../../App'

const Footer = () => {

    const { theme } = useContext(ThemeContext);

    const { auth } = useContext(AuthContext);

    let [ notify, setNotify ] = useState(false);

    return ( <>
        <div className={`user-menu footer-mob w-100 text-center py-2 mt-md-3 fixed-bottom theme-${theme}-middle animate__animated animate__slideInUp`}>
            <div className={`item theme-${theme}-middle d-block`}>
                <Link to="/feed" className={`theme-${theme}-middle`}>
                    <i className={`fas fa-home fa-lg`}></i>
                    Home
                </Link>
            </div>

            <div className={`item theme-${theme}-middle d-block`}>
                <Link to="/feed?type=chat" className={`theme-${theme}-middle`}>
                    <i className={`fas fa-comments fa-lg`}></i>
                    Chat
                </Link>
            </div>

            {   auth.data &&
                <div className={`item theme-${theme}-middle`}>
                    <Link to={`/profile/${auth.data.uid.split("").reverse().join("")}`} className={`theme-${theme}-middle`}>
                        <i className={`fas fa-user fa-lg`}></i>
                        You
                    </Link>
                </div>
            }

            <div className={`item theme-${theme}-middle position-relative`}>
                <span>  <i className={`fas fa-bell fa-lg`} onClick={() => setNotify(!notify) }></i> News  </span>
            </div>

            <div className={`item theme-${theme}-middle d-block`}>
                <Link to="/feed?type=trend" className={`theme-${theme}-middle`}>
                    <i className={`fas fa-fire fa-lg`}></i>
                    Trend
                </Link>
            </div>
        </div>
        { notify && <Notifications uid={auth.data && auth.data.uid} bottom notify={setNotify}/> }
    </>);
}
 
export default Footer;