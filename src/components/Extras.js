import { Link } from 'react-router-dom'

export const getInitial = (name) => { return name.split(' ').filter((name) => name.length > 1).slice(0, 2).map((each) => each.charAt(0)).join('') }

export const Avatar = ({ name, scale = 'md', theme = 'primary' }) => {

    // Parse props.name
    const initial = getInitial(name);

    return ( 
        <Link to="/profile">
            <div className={`avatar avatar-${scale} bg-${theme}`}>
                { initial.length > 0 ? initial : '~' }
            </div>
        </Link>
    );
}

export const Loader = ({ show }) => {
    return ( 
        <div className="loader" style={ show ? { display: "block" } : { display: "none" } }>
            <div className="square-set">
                <div className="square s-1"></div>
                <div className="square s-2"></div>
            </div>
        </div>
    );
}

export const Tooltip = ({ type }) => {
    return ( 
        <div className="tool-tip theme-middle shadow-sm">
            <div className="tint theme-middle tint-tm"></div>
            <div className="tooltip-content px-2">{ type }</div>
        </div>
    );
}

export const parseTime = (timestamp) => {   
    const datetime = new Date(timestamp);

    const day = datetime.toString().slice(0,3);
    
    const date = datetime.toDateString().slice(4);
    
    let time = datetime.toTimeString().split(' ')[0].slice(0,5);
    
    time = (parseInt(time.split(':')[0]) > 12) ? (parseInt(time.split(':')[0]) - 12) + time.slice(2) + ' PM' : time + ' AM';
    
    if(time.length === 7) time = '0' + time;
    
    return { date, day, time };
}

export const Freeflow = () => {
    return ( 
        <div className="h-100 d-flex align-items-center justify-content-center bg-light">
            <div id="phrase">
                
                <div className="d-flex">
                    <div className="me-2">
                        <h1>Share</h1>
                    </div>
                    
                    <div className="ms-2 carousel">
                        <div className="carousel-core">
                            <h1 className="text-danger">Love</h1>
                            <h1 className="text-success">Values</h1>
                            <h1 className="text-primary">Events</h1>
                            <h1 className="text-warning">Data</h1>
                        </div>
                    </div>
                </div>
                <h1>with Freeflow</h1>
                <h4>Ideas that Resonate</h4>
                
                <div id="color-balls">
                    <div id="red-ball"><i className="fas fa-circle text-danger me-2"></i></div>
                    <div id="green-ball"><i className="fas fa-circle text-success me-2"></i></div>
                    <div id="blue-ball"><i className="fas fa-circle text-primary me-2"></i></div>
                    <div id="yellow-ball"><i className="fas fa-circle text-warning"></i></div>
                </div>
            </div>
        </div>
    );
}