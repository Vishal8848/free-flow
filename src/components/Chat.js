import Avatar from "./Avatar";

const Message = () => {
    return (
        <div className="message">
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
            <div className="chat-header p-3 border-bottom">
                <i className="fas fa-comments me-2 text-success"></i> Public Chat
            </div>
            <div className="chat-content">
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
                <Message />
            </div>
            <div className="chat-create ps-2 py-3">
                <Avatar name="Vishal Pranav" scale="sm" theme="danger"/>
                <input className="w-75" placeholder="Share your message"/>
                <div className="submit-msg"><i className="fas fa-caret-right fa-2x"></i></div>
            </div>
        </div>
    );
}
 
export default Chat;