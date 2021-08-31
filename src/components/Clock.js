import { useState } from 'react';
import { useInterval } from 'react-interval-hook';

const Clock = () => {

    const [progressBar, setProgressBar] = useState(300);
    const [incrementAmount, setIncrementAmount] = useState(.5);
    const [timer, setTimer] = useState({minutes: 17, seconds: 59});
    
    const incrementer = () => {
        setProgressBar(progressBar - incrementAmount);
        progressBar === 0 && stopTimer();
    }

    const { start, stopTimer, timerActive} = useInterval(
        () => incrementer(), 1000,
        {
            autoStart: false,
            immediate: false,
            selfCorrecting: false,

        });

    return (
        <div className='clock-body-outer-container'>
            <div className="clock-body-inner-container">
                <div className="progress-bar-container">
                    <svg height="100%" width="100%">
                        <circle cx="50%" cy="50%" r="48%"
                            stroke-linecap={progressBar > 0 ? "round" : "square"}
                            strokeDashoffset={`${progressBar}%`}
                        ></circle>
                    </svg>
                </div>
                <h3>{`${timer.minutes}:${timer.seconds < 10 ? `0${timer.seconds}` : timer.seconds}`}</h3>
            </div>
        </div>
    )
}

export default Clock
