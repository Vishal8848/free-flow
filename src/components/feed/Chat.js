import { Avatar } from "../Extras";

const Message = () => {
    return (
        <div className="message">
            <Avatar name="Erling Haaland" scale="sm" theme="success"/>
            <div className="m-content">
                <div className="m-head">
                    <div className="m-creator text-light fw-bold">
                        Vishal Pranav
                    </div>
                    <div className="m-time text-muted">
                        now
                    </div>
                </div>
                <div className="m-body text-light">
                    Lorem ipsum dolor sit amet.
                </div>
            </div>
        </div>
    );
}

const Chat = () => {
    return ( 
        <div className="chat rounded theme-dark-middle">
            <div className="chat-header p-3 text-light border-dark theme-dark-middle">
                <i className="fas fa-comments me-2 text-success"></i> Live Pond
            </div>
            <div className="chat-content theme-dark-inner">
                <div className="chat-notice text-muted px-5">
                    <strong>Pond Messenger</strong><br/>
                    Your ripples are visible to everyone online
                </div>
                <Message />
                <Message />
                <Message />
            </div>
            <div className="chat-create ps-2 py-3 theme-dark-middle">
                <Avatar name="Vishal Pranav" scale="sm" theme="danger"/>
                <input className="w-75 theme-dark-middle" placeholder="Send a ripple ..."/>
                <div className="submit-msg"><i className="fas fa-chevron-right fa-lg text-light" style={{ WebkitTextStroke: "1.5px" }}></i></div>
            </div>
        </div>
    );
}
 
export default Chat;