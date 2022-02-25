// Default
import { useState, useEffect, useContext } from "react"
import { Link } from 'react-router-dom'

// Firebase
import { firebaseTrendingPost } from '../../firebase/firebaseStore'

// Imports
import trendImage from '../../assets/trend.png'
import { Avatar, parseTime } from "../Extras"
import TypeWriter from 'typewriter-effect'
import { ThemeContext } from "../../App"

const Trending = () => {

    const { theme } = useContext(ThemeContext)

    const [ trend, setTrend ] = useState(null)
    
    useEffect(() => {
        firebaseTrendingPost().then(res => {
            if(!res.error) setTrend(res.data)
        })
    }, [])

    return (
        <div className={`trend theme-${theme}-middle shadow animate__animated animate__slideInRight`}>
        {   trend ? <>
            <div className={`trend-header px-3 py-2 theme-${theme}-middle`}>
            <Link to={`/profile/${trend.creator.split("").reverse().join("")}`}>
                <Avatar image={trend.dp} name={trend.name} scale="md" theme={trend.theme}/>
            </Link>
            <div className="trend-setter ps-3">
                <div className="fs-5">
                    <Link to={`/profile/${trend.creator.split("").reverse().join("")}`}>
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
                            type.pasteString('<strong class="text-danger fw-bold">Trend </strong>')
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
            </div>
            <div className={`trend-body theme-${theme}-inner`}>
                <div className="image" style={{ background: `url(${trend.URL}) center center / cover no-repeat` }}>
                    {   !trend.URL && 
                        <div className="text-center pt-5">
                            <i className="fas fa-camera fa-2x text-muted"></i><br/>
                            <span className="fs-6 text-muted">No image for this post</span>
                        </div>
                    }
                </div>
                <div className="content text-muted">
                    { trend.content.substring(0, 50) + ' ...' }
                </div>
            </div>
            <div className={`trend-status p-3 text-danger theme-${theme}-middle`}>
                <i className="fas fa-heart me-2"></i> <strong>{ trend.likes.length } &nbsp; Likes</strong>
            </div></> :
            <div className="notice text-muted px-5" style={{ borderRadius: "10px", height: "375px" }}>
                { trendImage && <img src={trendImage} alt="Trend" width="100px" height="100px" style={{ marginBottom: "25px" }}/> }
                <br/><strong>Trending</strong><br/>
                This place is reserved for the popular post
            </div>
        }
        </div>
    );
}
 
export default Trending;