// Default
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'

// Firebase
import { firebaseChatQuery, firebaseUser, firebaseCreateMessage } from '../../firebase/firebaseStore'
import { onSnapshot } from 'firebase/firestore'

// Imports
import { Avatar, parseTime } from "../Extras"
import chatImage from '../../assets/chat.png'
import { ThemeContext } from '../../App'

const Message = ({ data, self }) => {

    const { date, time, status } = parseTime(data.createdAt), name = self ? 'You' : data.name;

    return ( data &&
        <div className="message">
            <Link to={`/profile/${data.uid.split("").reverse().join("")}`}>
                <Avatar image={data.dp} name={data.name} scale="sm" theme={data.theme}/>
            </Link>
            <div className={`m-content p${ self ? 'e' : 's' }-1`}>
                <div className="m-head">
                    <div className="m-creator ps-2">
                        <Link to={`/profile/${data.uid.split("").reverse().join("")}`}>
                            { name.length > 15 ? name.split(' ')[0].length > 15 ? name.substring(0, 10) + ' ...' : name.split(' ')[0] : name}
                        </Link>
                    </div>
                    <div className="m-time text-muted">
                        { name.length < 10 && time }
                        { name.length < 10 && <i className="fas fa-circle px-1 align-middle" style={{ fontSize: "5px" }}></i> }
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

const Chat = ({user, setChatCount}) => {

    const { theme } = useContext(ThemeContext);

    let [ chat, setChat ] = useState([])
    const messageInitial = { content: "", uid: user.uid, name: user.name, theme: user.theme, dp: user.dp };
    let [ message, setMessage ] = useState(messageInitial)
    const [ net, setNet ] = useState(true)

    const sendMessage = () => {
        if(message.content.length > 0)  {
            message.createdAt = Date.now().toString();
            firebaseCreateMessage(message)
            setChat([ ...chat, message ])
            setMessage(messageInitial)
        }
    }

    useEffect(() => {
        const Abort = new AbortController();
        const unSubChat = onSnapshot(firebaseChatQuery(), async (data) => {

            setNet(true)
            let result = [], unique = [];

            data.forEach(message => result.push({ mid: message.id, ...message.data() }))

            unique = result.map(msg => msg.uid).filter((v, i, a) => a.indexOf(v) === i)

            for(const uid of unique) {
                const res = await firebaseUser(uid, true, true);
                if(!res.error)
                    result = result.map(msg => msg.uid === uid ? { ...msg, ...res.data } : { ...msg })
            }

            result = result.sort((x, y) => { return parseInt(x.createdAt) - parseInt(y.createdAt) })

            setChatCount(result.length)
            setChat([...result])

            const chatBox = document.getElementById('chat-box');
            chatBox.scrollTop = chatBox.scrollHeight;

        }, err => setNet(false))
        return () => {
            unSubChat()
            Abort.abort()
        }
    }, [setChatCount])

    useEffect(() => {
        const msgInput = document.getElementById('new-msg')
        const triggerMessage = (e) => {
            if(e.keyCode === 13 && e.target.value.length > 0)  sendMessage()
        }

        msgInput.addEventListener('keyup', triggerMessage);
        return () => msgInput.removeEventListener('keyup', triggerMessage)

    })

    return ( chat && <>
        <div className={`chat shadow theme-${theme}-middle animate__animated animate__slideInLeft`}>
            <div id="chat-box" className={`chat-content theme-${theme}-inner`}>
            {   net ?
                (chat && chat.length > 0) ?
                chat.map(msg => (
                    <Message data={msg} self={msg.uid === user.uid} key={msg.createdAt}/>
                )) :
                <div className={`notice text-muted theme-${theme}-inner px-5`}>
                    { chatImage && <img src={chatImage} alt="Chat" width="100px" height="100px" style={{ marginBottom: "25px" }}/> }
                    <br/><strong>Pond Messenger</strong><br/>
                    Your ripples are visible to everyone online now
                </div> :
                <div className={`notice text-muted theme-${theme}-inner px-5`}>
                    { chatImage && <img src={chatImage} alt="Chat" width="100px" height="100px" style={{ marginBottom: "25px" }}/> }
                    <br/><strong>Pond Messenger</strong><br/>
                    Check your internet connection and try again
                </div>
            }
            </div>
            <div className={`chat-create ps-2 py-3 theme-${theme}-middle`}>
                <Link to={`/profile/${user.uid}`}>
                    <Avatar image={user.dp} name={user.name} scale="sm" theme={user.theme}/>
                </Link>
                <input id="new-msg" className={`w-75 theme-${theme}-middle`} placeholder="Send a ripple"
                    value={message.content} onChange={(e) => { message.content = e.target.value; setMessage({...message}) }}/>
                <div className="submit-msg" onClick={() => sendMessage()}>
                    <i className="fas fa-chevron-right fa-lg text-muted" style={{ WebkitTextStroke: "1.5px" }}></i>
                </div>
            </div>
        </div>
    </>);
}
 
export default Chat;