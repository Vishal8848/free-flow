import { useState } from 'react'
import useWindow from '../hooks/useWindow'
import TypeWriter from 'typewriter-effect'

const Feedback = ({ setView }) => {

    const [ message, setMessage ] = useState("");
    const [ reaction, setReaction ] = useState(null);

    const { width } = useWindow()

    return ( 
        <div className="feedback modal-container shadow-lg">
            <div className="feedback-modal theme-outer">
                <div className="feedback-header text-danger">
                    <div className="feedback-title fs-1" style={{ fontFamily: "Montserrat" }}>
                        <i className="fas fa-heart fs-2 me-2"></i>Feedback
                    </div>
                    <div className="feedback-close" onClick={() => setView(false)}>
                        <i className="fas fa-times text-muted fa-2x ms-2"></i>
                    </div>
                </div>
                <div className="feedback-invite fw-bold">
                    <TypeWriter
                        options={{
                            deleteSpeed: 50,
                            autoStart: true,
                            delay: 100,
                            loop: true
                        }}
                        onInit={(type) => {
                            type.typeString("Thank You ")
                                .pauseFor(1000)
                                .deleteAll()
                                .pauseFor(200)
                                .typeString("Your opinions matter. ")
                                .pauseFor(200)
                                .typeString("A lot ...")
                                .pauseFor(500)
                                .deleteAll()
                                .start();
                    }}/>
                </div>
                <div className="feedback-body mt-3">
                    <div className="feedback-reaction theme-middle px-2">
                        <div className={`text-center fw-bold ${reaction && reaction === 5 ? "text-danger" : ""}`} onClick={() => setReaction(5)}>
                            <i className={`fas fa-grin-hearts fa-2x mb-md-3 theme-outer ${reaction && reaction === 5 ? "text-danger" : ""}`}></i>
                            <br/>{ width > 768 && "Woah" }
                        </div>
                        <div className={`text-center fw-bold ${reaction && reaction === 4 ? "text-danger" : ""}`} onClick={() => setReaction(4)}>
                            <i className={`fas fa-grin-stars fa-2x mb-md-3 theme-outer ${reaction && reaction === 4 ? "text-danger" : ""}`}></i>
                            <br/>{ width > 768 && "Yeah" }
                        </div>
                        <div className={`text-center fw-bold ${reaction && reaction === 3 ? "text-danger" : ""}`} onClick={() => setReaction(3)}>
                            <i className={`fas fa-grin-alt fa-2x mb-md-3 theme-outer ${reaction && reaction === 3 ? "text-danger" : ""}`}></i>
                            <br/>{ width > 768 && "Hmm" }
                        </div>
                        <div className={`text-center fw-bold ${reaction && reaction === 2 ? "text-danger" : ""}`} onClick={() => setReaction(2)}>
                            <i className={`fas fa-grin-beam-sweat fa-2x mb-md-3 theme-outer ${reaction && reaction === 2 ? "text-danger" : ""}`}></i>
                            <br/>{ width > 768 && "Uh-Oh" }
                        </div>
                        <div className={`text-center fw-bold ${reaction && reaction === 1 ? "text-danger" : ""}`} onClick={() => setReaction(1)}>
                            <i className={`fas fa-dizzy fa-2x mb-md-3 theme-outer ${reaction && reaction === 1 ? "text-danger" : ""}`}></i>
                            <br/>{ width > 768 && "Yuck" }
                        </div>
                    </div>
                    <div className="feedback-form theme-middle">
                        <div className="form-floating mt-3 theme-inner rounded rounded-3">
                            <textarea id="feedback" maxLength="1000" className="form-control border-0 theme-inner" placeholder="Just spill the beans" style={{ minHeight: "100px", maxHeight: "200px", borderRadius: "10px" }}
                                value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                            <label htmlFor="feedback" className="text-muted">Just spill the beans</label>
                        </div>
                    </div>
                    <div className="user-save mt-3">
                        <button className="btn btn-success fw-bold btn-lg">
                            Done
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Feedback;