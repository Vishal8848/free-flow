import { Avatar } from "../Extras";

const Message = () => {
    return (
        <div className="message border-bottom">
            <Avatar name="Erling Haaland" scale="sm" theme="success"/>
            <div className="m-content">
                <div className="m-head">
                    <div className="m-creator fw-bold">
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
        <div className="chat">
            <div className="chat-header p-3 border">
                <i className="fas fa-comments me-2 text-success"></i> Live Pond
            </div>
            <div className="chat-content border-start border-end">
                <div className="chat-notice text-muted px-5 border-bottom">
                    <strong>Pond Messenger</strong><br/>
                    Your ripples are visible to everyone online
                </div>
                <Message />
                <Message />
                <Message />
            </div>
            <div className="chat-create border ps-2 py-3">
                <Avatar name="Vishal Pranav" scale="sm" theme="danger"/>
                <input className="w-75" placeholder="Send a ripple ..."/>
                <div className="submit-msg"><i className="fas fa-caret-right fa-2x"></i></div>
            </div>
        </div>
    );
}
 
export default Chat;