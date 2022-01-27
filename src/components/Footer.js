import { useState } from 'react';
import { Link } from 'react-router-dom'

const Footer = ({ manageFeed }) => {

    let [ active, setActive ] = useState([ true, false, false, false ]);

    return ( <>
        <div className="w-100 footer-sys border-top text-center py-3 mt-3 bg-light">
            &copy; Copyright: <Link to="/" className="text-primary fw-bold" style={{ textDecoration: "none" }}>Freeflow</Link>
        </div>
        <div className="user-menu footer-mob w-100 border-top text-center py-2 mt-3 bg-light fixed-bottom">
            {/* Feed */}
            <div className="item" onClick={() => { setActive([ true, false, false, false ]) }}>
                <i className={`fas fa-home fa-2x ${active[0] ? 'text-dark' : 'text-muted'}`}></i>
            </div>

            {/* Chat */}
            <div className="item" onClick={() => { setActive([ false, true, false, false ]) }}>
                <i className={`fas fa-comments fa-2x ${active[1] ? 'text-dark' : 'text-muted'}`}></i>
            </div>

            {/* Notifications */}
            <div className="item position-relative"  onClick={() => { setActive([ false, false, true, false ]) }}>
                <div className="docker bg-danger"></div>
                <i className={`fas fa-bell fa-2x ${active[2] ? 'text-dark' : 'text-muted'}`}></i>
            </div>

            {/* Trending & Updates */}
            <div className="item"  onClick={() => { setActive([ false, false, false, true ]) }}>
                <i className={`fas fa-fire fa-2x ${active[3] ? 'text-dark' : 'text-muted'}`}></i>
            </div>
        </div>
    </>);
}
 
export default Footer;