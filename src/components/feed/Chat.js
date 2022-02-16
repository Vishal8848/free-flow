import { useState, useEffect } from 'react'
import { firebaseChat, firebaseCreateMessage } from '../../firebase/firebaseStore';
import { Avatar, parseTime } from "../Extras";

const Message = ({ data, self }) => {

    const { date, time, status } = parseTime(data.createdAt);

    if(self) data.name = "You"

    return ( data &&
        <div className="message">
            <Avatar image={data.dp} name={data.name} scale="sm" theme={data.theme}/>
            <div className={`m-content p${ self ? 'e' : 's' }-1`}>
                <div className="m-head">
                    <div className="m-creator ps-2">
                        { data.name.length > 15 ? data.name.split(' ')[0].length > 15 ? data.name.substring(0, 10) + ' ...' : data.name.split(' ')[0] : data.name}
                    </div>
                    <div className="m-time text-muted">
                        { data.name.length < 10 && time }
                        { data.name.length < 10 && <i className="fas fa-circle px-1 align-middle" style={{ fontSize: "5px" }}></i> }
                        { status !== "" ? status : date }
                    </div>
                </div>
                <div className="m-body ps-2 text-muted">
                    {data.content}
                </div>
            </div>
        </div>
    );
}

const Chat = ({user}) => {

    let [ chat, setChat ] = useState([])
    const messageInitial = { content: "", uid: user.uid, name: user.name, theme: user.theme, dp: user.dp };
    let [ message, setMessage ] = useState(messageInitial)

    const sendMessage = () => {
        if(message.content.length > 0)  {
            message.createdAt = Date.now().toString();
            firebaseCreateMessage(message)
            setChat([ ...chat, message ])
            setMessage(messageInitial)
        }
    }

    useEffect(() => {
        firebaseChat().then(res => {
            if(!res.error)  setChat(res.data)
        })
    }, [])

    useEffect(() => {
        const msgInput = document.getElementById('new-msg')
        const triggerMessage = (e) => {
            if(e.keyCode === 13 && e.target.value.length > 0)  sendMessage()
        }

        msgInput.addEventListener('keyup', triggerMessage);
        return () => msgInput.removeEventListener('keyup', triggerMessage)

    })

    return ( chat &&
        <div className="chat rounded shadow-sm theme-middle">
            <div className="chat-header p-3 border-dark theme-middle">
                <i className="fas fa-comments me-2 text-success"></i> Live Pond
            </div>
            <div className="chat-content theme-inner">
                {   (chat && chat.length > 0) ?
                    chat.map(msg => (
                        <Message data={msg} self={msg.uid === user.uid} key={msg.createdAt}/>
                    )) :
                    <div className="chat-notice text-muted theme-inner px-5">
                        <strong>Pond Messenger</strong><br/>
                        Your ripples are visible to everyone online
                    </div>
                }
            </div>
            <div className="chat-create ps-2 py-3 theme-middle">
                <Avatar image={user.dp} name={user.name} scale="sm" theme={user.theme}/>
                <input id="new-msg" className="w-75 theme-middle" placeholder="Send a ripple"
                    value={message.content} onChange={(e) => { message.content = e.target.value; setMessage({...message}) }}/>
                <div className="submit-msg" onClick={() => sendMessage()}>
                    <i className="fas fa-chevron-right fa-lg" style={{ WebkitTextStroke: "1.5px" }}></i>
                </div>
            </div>
        </div>
    );
}
 
export default Chat;