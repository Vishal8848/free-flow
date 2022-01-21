import Avatar from "./Avatar";
import TypeWriter from 'typewriter-effect'

const Trending = () => {

    let timeString = 'an hour ago';

    return ( 
        <div className="trend border">
            <div className="trend-header px-3 py-2 border-bottom">
                <Avatar name="Vishal Pranav" scale="md" theme="success"/>
                <div className="trend-setter ps-3">
                    <div className="fs-5 fw-bold">
                        Vishal Pranav
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
                                type.pasteString('<strong>Trending </strong>')
                                    .pauseFor(500)
                                    .typeString(timeString)
                                    .pauseFor(3000)
                                    .deleteChars(timeString.length)
                                    .pauseFor(1000)
                                    .typeString(timeString)
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
            <div className="trend-body border-bottom">
                <div className="image bg-dark"></div>
                <div className="content">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, ...
                </div>
            </div>
            <div className="trend-status p-3 text-danger">
                <i className="fas fa-heart me-2"></i> <strong>234 Likes</strong>
            </div>
        </div>
    );
}
 
export default Trending;