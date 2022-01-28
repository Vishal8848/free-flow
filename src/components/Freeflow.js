const Freeflow = () => {
    return ( 
        <div className="h-100 d-flex align-items-center justify-content-center">
            <div id="phrase">
                
                <div className="d-flex">
                    <div className="me-2">
                        <h1>Share</h1>
                    </div>
                    
                    <div className="ms-2 carousel">
                        <div className="carousel-core">
                            <h1 className="text-danger">Love</h1>
                            <h1 className="text-success">Values</h1>
                            <h1 className="text-primary">Events</h1>
                            <h1 className="text-warning">Data</h1>
                        </div>
                    </div>
                </div>
                <h1>with Freeflow</h1>
                <h4>Ideas that Resonate</h4>
                
                <div id="color-balls">
                    <div id="red-ball"><i className="fas fa-circle text-danger me-2"></i></div>
                    <div id="green-ball"><i className="fas fa-circle text-success me-2"></i></div>
                    <div id="blue-ball"><i className="fas fa-circle text-primary me-2"></i></div>
                    <div id="yellow-ball"><i className="fas fa-circle text-warning"></i></div>
                </div>
            </div>
        </div>
    );
}

export default Freeflow;