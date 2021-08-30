import { useState, useEffect } from 'react';

const Clock = () => {

    const [progressBar, setProgressBar] = useState(300);
    const [incrementAmount, setIncrementAmount] = useState(5);

    let total = 300
    
    const incrementer = () => {
        setProgressBar(progressBar - incrementAmount);
    }

    useEffect(() => {
        setInterval(incrementer, 1000);
    })

    return (
        <div className='clock-body-outer-container'>
            <div className="clock-body-inner-container">
                <div className="progress-bar-container">
                    <svg height="100%" width="100%">
                        <circle cx="50%" cy="50%" r="48%" 
                            strokeDashoffset={`${progressBar}%`}
                        ></circle>
                    </svg>
                </div>
                <h3>17:59</h3>
            </div>
        </div>
    )
}

export default Clock
