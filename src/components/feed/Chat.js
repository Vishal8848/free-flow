import { Avatar } from "../Extras";

const Message = () => {
    return (
        <div className="message">
            <Avatar name="Erling Haaland" scale="sm" theme="success"/>
            <div className="m-content">
                <div className="m-head">
                    <div className="m-creator">
                        Vishal Pranav
                    </div>
                    <div className="m-time text-muted">
                        now
                    </div>
                </div>
                <div className="m-body">
                    Lorem ipsum dolor sit amet.
                </div>
            </div>
        </div>
    );
}

const Chat = () => {
    return ( 
        <div className="chat rounded shadow-sm theme-middle">
            <div className="chat-header p-3 border-dark theme-middle">
                <i className="fas fa-comments me-2 text-success"></i> Live Pond
            </div>
            <div className="chat-content theme-inner">
                <div className="chat-notice text-muted theme-inner px-5">
                    <strong>Pond Messenger</strong><br/>
                    Your ripples are visible to everyone online
                </div>
            </div>
            <div className="chat-create ps-2 py-3 theme-middle">
                <Avatar name="Vishal Pranav" scale="sm" theme="danger"/>
                <input className="w-75 theme-middle" placeholder="Send a ripple"/>
                <div className="submit-msg"><i className="fas fa-chevron-right fa-lg" style={{ WebkitTextStroke: "1.5px" }}></i></div>
            </div>
        </div>
    );
}
 
export default Chat;