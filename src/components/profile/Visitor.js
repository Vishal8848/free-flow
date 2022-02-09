import { useState, useEffect } from 'react'
import { parseDOB } from '../Extras';
import useWindow from '../../hooks/useWindow'

const Visitor = ({ data }) => {

    const { width } = useWindow();
    const [ position, setPosition ] = useState(false);

    // Listen to Window Resize
    useEffect(() => {
        width <= 768 ? setPosition(true) : setPosition(false)
    }, [width]);

    return ( 
        <div className="visitor row">
            <div className="col-md-6">
                <div className="v-set">
                    <div className="v-head theme-inner shadow">
                        <i className="fas fa-gift fa-3x"></i>
                    </div>
                    <div className="v-body theme-inner shadow">
                        Wish me on <strong>{ parseDOB(data.dob) }</strong>
                    </div>
                </div>
                <div className="v-detail theme-inner shadow mt-4">
                    <div className="v-icon"><i className="fas fa-skiing-nordic fa-3x me-2"></i></div>
                    <div className="v-body text-nowrap">
                        My hobbies are <br/>
                        <strong>{ data.hobbies }</strong>
                    </div>
                </div>
                <div className="v-detail theme-inner shadow mt-4">
                    { !position && <div className="v-icon"><i className="fas fa-globe-asia fa-3x"></i></div> }
                    <div className="v-body">
                        <strong>
                            { data.location.city }
                            <i className="fas fa-circle mx-2 align-middle" style={{ fontSize: "5px" }}></i>
                            { data.location.state }
                            <i className="fas fa-circle mx-2 align-middle" style={{ fontSize: "5px" }}></i>
                            { data.location.country }
                        </strong>
                        <br/> Is my home place
                    </div>
                    { position && <div className="v-icon"><i className="fas fa-globe-asia fa-3x"></i></div> }
                </div>
            </div>
            <div className="col-md-6">
                {   position ?
                    <div className="v-detail theme-inner shadow mt-4">
                        <div className="v-icon"><i className="fas fa-trophy fa-3x"></i></div>
                        <div className="v-body">
                            I'm best being a <br/>
                            <strong>{ data.occupation }</strong>
                        </div>
                    </div> :
                    <div className="v-set">
                        <div className="v-head theme-inner shadow">
                            <i className="fas fa-trophy fa-3x"></i>
                        </div>
                        <div className="v-body theme-inner shadow">
                            I'm best being a <strong>{ data.occupation }</strong>
                        </div>
                    </div>
                }
                <div className="v-detail theme-inner shadow mt-4">
                    { !position && <div className="v-icon"><i className="fas fa-school fa-3x"></i></div>}
                    <div className="v-body">
                        <strong>{ data.education }</strong> 
                        <br/> Helped me learn
                    </div>
                    { position && <div className="v-icon"><i className="fas fa-school fa-3x"></i></div>}
                </div>
                <div className="v-detail theme-inner shadow mt-4">
                    <div className="v-icon"><i className="fas fa-users fa-3x"></i></div>
                    <div className="v-body">
                        My latest connection <br/>
                        <strong>Abishek Prasannaa</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Visitor;