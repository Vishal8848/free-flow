import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom'

const Footer = () => {

    const page = window.location.href.split('/')[3].startsWith('profile');
    
    const [ params ] = useSearchParams();
    const type = params.get('type');

    let [ active, setActive ] = useState([ !page, false, page, false ]);

    useEffect(() => {
        if(!page)   setActive([ type === null, type === 'chat', false, type === 'trend' ]);
    }, [page, type]);

    let [ notify, setNotify ] = useState(false);

    return ( <>
        <div className="w-100 footer-sys border-top text-center py-3 mt-md-3 bg-light">
            &copy; Copyright: <Link to="/" className="text-primary fw-bold" style={{ textDecoration: "none" }}>Freeflow</Link>
        </div>
        <div className="user-menu footer-mob w-100 border-top text-center py-2 mt-md-3 bg-light fixed-bottom">           
            <div className="item bg-light d-block" onClick={() => setActive([ true, false, false, false ])}>
                <Link to="/feed" className="text-dark">
                    <i className={`fas fa-home fa-lg ${active[0] ? 'text-dark' : 'text-muted'}`}></i>
                    Home
                </Link>
            </div>

            <div className="item bg-light d-block" onClick={() => setActive([ false, true, false, false ])}>
                <Link to="/feed?type=chat" className="text-dark">
                    <i className={`fas fa-comments fa-lg ${active[1] ? 'text-dark' : 'text-muted'}`}></i>
                    Chat
                </Link>
            </div>

            <div className="item bg-light" onClick={() => setActive([ false, false, true, false ])}>
                <Link to="/profile" className="text-dark">
                    <i className={`fas fa-user fa-lg ${active[2] ? 'text-dark' : 'text-muted'}`}></i>
                    You
                </Link>
            </div>

            <div className="item bg-light position-relative"  onClick={() => setNotify(!notify) }>
                <div className="docker me-2 bg-danger"></div>
                <span>  <i className={`fas fa-bell fa-lg ${notify ? 'text-dark' : 'text-muted'}`}></i> News  </span>
            </div>

            <div className="item bg-light d-block" onClick={() => setActive([ false, false, false, true ])}>
                <Link to="/feed?type=trend" className="text-dark">
                    <i className={`fas fa-fire fa-lg ${active[3] ? 'text-dark' : 'text-muted'}`}></i>
                    Trend
                </Link>
            </div>
        </div>
    </>);
}
 
export default Footer;