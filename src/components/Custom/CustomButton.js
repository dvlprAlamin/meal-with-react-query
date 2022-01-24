import React, { useState } from 'react';

const CustomButton = ({ children }) => {
    const [wavePosition, setWavePosition] = useState({ display: 'none', x: 0, y: 0 })
    const waveHandler = (e) => {
        setWavePosition({ display: 'block', x: (e.pageX - e.target.offsetLeft), y: (e.pageY - e.target.offsetTop) })
        setTimeout(() => {
            setWavePosition(preValue => ({ ...preValue, display: 'none' }))
        }, 500);
    }
    return (
        <button onClick={waveHandler} className='wave-effect'>
            <span style={{ display: wavePosition.display, left: `${wavePosition.x}px`, top: `${wavePosition.y}px` }}></span>
            {children}
        </button>
    );
};

export default CustomButton;