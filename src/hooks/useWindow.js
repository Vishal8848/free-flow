import { useState, useLayoutEffect } from 'react'

const useWindow = () => {
    
    const [ windowSize, setWindow ] = useState([ window.innerWidth, window.innerHeight ]);

    useLayoutEffect(() => {
        const Resize = () => setWindow([ window.innerWidth, window.innerHeight ]);

        window.addEventListener('resize', Resize);
        
        return () => window.removeEventListener('resize', Resize);
    });

    return { width: windowSize[0], height: windowSize[1] };

}
 
export default useWindow;