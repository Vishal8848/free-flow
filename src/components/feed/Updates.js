import { Avatar } from "../Extras";

const Update = () => {
    return (
        <div className="update border mb-2">
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
            <div className="update-notice text-muted px-5">
                <strong>Wave Notifications</strong><br/>
                All actions made on your waves live here
            </div>
            <Update />
            <Update />
        </div>
    );
}
 
export default Updates;