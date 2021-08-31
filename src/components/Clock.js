import { useState } from 'react';
import { useInterval } from 'react-interval-hook';
import { defaultClockStatus } from '../Object-Content';

const Clock = ({ values, timerToggle, setTimerToggle, toggleSettings }) => {

    const [progressBar, setProgressBar] = useState(0);
    const [incrementAmount, setIncrementAmount] = useState(1);
    const [clockStatus, setClockStatus] = useState(defaultClockStatus);

    let timer = {
        pomodoro: [
            {
                minutes: values.pomodoro,
                seconds: 0
            }
        ],
        shortBreak: [
            {
                minutes: values.shortBreak,
                seconds: 0
            }
        ],
        longBreak: [
            {
                minutes: values.longBreak,
                seconds: 0
            }
        ]
    };    
    
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

    const clockStarter = () => {

    }

    const clockTimeDisplay = () => {
        const minutes = values.button === 'pomodoro' 
            ? timer.pomodoro[0].minutes 
            : values.button === 'short break' ? timer.shortBreak[0].minutes
            : timer.longBreak[0].minutes
        const seconds = values.button === 'pomodoro' 
            ? timer.pomodoro[0].seconds
            : values.button === 'short break' ? timer.shortBreak[0].seconds
            : timer.longBreak[0].seconds
        const data = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
        return data;
    }

    const clockStatusDisplay = () => {
        const data = values.button === 'pomodoro' ? clockStatus.pomodoro
                        : values.button === 'short break' ? clockStatus.shortBreak
                        : clockStatus.longBreak
        return data;
    }

    const styleStatusText = (status) => {
        const text = document.querySelector('h4');
        status === 'on' ? text.style.color = values.color 
            : text.style.color = '#D7E0FF'
    }

    return (
        <div className='clock-body-outer-container'>
            <div onClick={() => clockStarter()}
                onMouseOver={() => styleStatusText('on')} 
                onMouseOut={() => styleStatusText('off')}
                className="clock-body-inner-container pointer">
                <div className="progress-bar-container">
                    <svg height="100%" width="100%">
                        <circle cx="50%" cy="50%" r="48%" stroke={values.color}
                            strokeLinecap={progressBar > 0 ? "round" : "square"}
                            strokeDashoffset={`${progressBar}%`}>   
                        </circle>
                    </svg>
                </div>
                <div className="clock-numbers-container">
                    <h3 style={{fontFamily: values.font}}>{clockTimeDisplay()}</h3>
                    <h4 style={{fontFamily: values.font }}>{clockStatusDisplay()}</h4>
                </div>
            </div>
        </div>
    )
}

export default Clock
