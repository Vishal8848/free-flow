import Avatar from "./Avatar";

const Update = () => {
    return (
        <div className="update border shadow mb-2">
            <div className="update-by">
                <Avatar name="Vishal Pranav" scale="md" theme="primary"/>
                <div className="u-content px-3">
                    <div className="u-head">
                        <div className="u-creator fw-bold">
                            Vishal Pranav
                        </div>
                        <div className="u-time text-muted">
                            now
                        </div>
                    </div>
                    <div className="u-body text-muted">
                        Added a comment
                    </div>
                </div>
            </div>
        </div>
    );
}

const Updates = () => {
    return ( 
        <div className="updates">
            <Update />
            <Update />
            <Update />
            <Update />
            <Update />
            <Update />
            <Update />
            <Update />
            <Update />
        </div>
    );
}
 
export default Updates;