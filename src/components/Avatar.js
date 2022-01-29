import { Link } from 'react-router-dom'

const Avatar = ({ name, scale = 'md', theme = 'primary' }) => {

    // Parse props.name
    const initial = name.split(' ').filter((name) => name.length > 1).slice(0, 2).map((each) => each.charAt(0)).join('');

    return ( 
        <Link to="/profile">
            <div className={`avatar avatar-${scale} bg-${theme} border`}>
                { initial.length > 0 ? initial : '~' }
            </div>
        </Link>
    );
}
 
export default Avatar;