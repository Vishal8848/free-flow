import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { Avatar, parseTime } from "../Extras"
import TypeWriter from 'typewriter-effect'
import { firebaseTrendingPost } from '../../firebase/firebaseStore'

const Trending = () => {

    const [ trend, setTrend ] = useState(null)
    
    useEffect(() => {
        console.log("Trend")
        firebaseTrendingPost().then(res => {
            if(!res.error) setTrend(res.data)
        })
    }, [])

    return ( trend &&
        (<div className="trend theme-middle shadow">
            <div className="trend-header px-3 py-2 theme-middle">
                <Link to={`/profile/${trend.creator}`}>
                    <Avatar image={trend.dp} name={trend.name} scale="md" theme={trend.theme}/>
                </Link>
                <div className="trend-setter ps-3">
                    <div className="fs-5">
                        <Link to={`/profile/${trend.creator}`}>
                            {trend.name}
                        </Link>
                    </div>
                    <div className="trend-time text-muted">
                        <TypeWriter
                            options={{
                                deleteSpeed: 50,
                                autoStart: true,
                                cursor: '',
                                delay: 100,
                                loop: true
                            }}
                            onInit={(type) => {
                                type.pasteString('<strong class="text-danger fw-light">Trending Since  </strong>')
                                    .pauseFor(500)
                                    .typeString(parseTime(trend.createdAt).date)
                                    .pauseFor(3000)
                                    .deleteChars(parseTime(trend.createdAt).date.length)
                                    .pauseFor(1000)
                                    .typeString(parseTime(trend.createdAt).date)
                                    .pauseFor(5000)
                                    .deleteAll()
                                    .start();
                            }}/>
                    </div>
                </div>
                <div className="trend-redirect text-primary">
                    <i className="fas fa-share fa-lg"></i>
                </div>
            </div>
            <div className="trend-body theme-inner">
                <div className="image bg-dark" style={{ background: `url(${trend.URL}) center center / cover no-repeat` }}></div>
                <div className="content text-muted">
                    { trend.content.substring(0, 50) + ' ...' }
                </div>
            </div>
            <div className="trend-status p-3 text-danger theme-middle">
                <i className="fas fa-heart me-2"></i> <strong>{ trend.likes.length } &nbsp; Likes</strong>
            </div>
        </div>)
    );
}
 
export default Trending;