const Avatar = ({ name, scale = 'md', theme = 'primary' }) => {

    // Parse props.name
    const initial = name.split(' ').filter((name) => name.length > 1).slice(0, 2).map((each) => each.charAt(0)).join('');

    return ( 
        <div className={`avatar avatar-${scale} bg-${theme} border`}>
            { initial.length > 0 ? initial : '~' }
        </div>
    );
}
 
export default Avatar;