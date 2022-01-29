const Loader = ({ show }) => {
    return ( 
        <div className="loader" style={ show ? { display: "block" } : { display: "none" } }>
            <div className="square-set">
                <div className="square s-1"></div>
                <div className="square s-2"></div>
            </div>
        </div>
    );
}
 
export default Loader;