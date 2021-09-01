import { useState } from 'react';
import { useInterval } from 'react-interval-hook';
import { defaultClockStatus } from '../Object-Content';

const Clock = ({ values, setValues, toggleSettings, stopClock, setStopClock }) => {
    
    const [progressBar, setProgressBar] = useState({
            position: 0,
            increment: 1,
        });
    const [clockStatus, setClockStatus] = useState(defaultClockStatus);
    
    const clockCounter = (input) => {
        let data = values;
        if (stopClock) {
            stop(true);
            setStopClock(false);
            return;
        }
        const clock = input === 'pomodoro' ? values.pomodoro[0]
                        : input === 'short break' ? values.shortBreak[0]
                        : values.longBreak[0];
        if (clock.minutes === 0 && clock.seconds === 0) {
            stop(true);
            return;
        } else if (clock.minutes >= 1 && clock.seconds === 0) {
            if (input === 'pomodoro') {
                data.pomodoro[0].minutes = data.pomodoro[0].minutes - 1;
                data.pomodoro[0].seconds = 59;
            } else if (input === 'short break') {
                data.shortBreak[0].minutes = data.shortBreak[0].minutes - 1;
                data.shortBreak[0].seconds = 59;
            } else {
                data.longBreak[0].minutes = data.longBreak[0].minutes - 1;
                data.longBreak[0].seconds = 59;
            }    
        } else {
            if (input === 'pomodoro') {
                data.pomodoro[0].seconds = data.pomodoro[0].seconds - 1;
            } else if (input === 'short break') {
                data.shortBreak[0].seconds = data.shortBreak[0].seconds - 1;
            } else {
                data.longBreak[0].seconds = data.longBreak[0].seconds - 1;
            }
        }
        const progressBarIncrement = (clock.minutes * 60) + clock.seconds;
        console.log(progressBarIncrement);
        setValues({...data});
    }

    const { start, stop, isActive} = useInterval(
        () => clockCounter(values.button === 'pomodoro' ? 'pomodoro'
                            : values.button === 'short break' ? 'short break'
                            : 'long break'), 1000,
        {
            autoStart: false,
            immediate: false,
            selfCorrecting: false,
        }
    );


    const clockTimeDisplay = () => {
        const minutes = values.button === 'pomodoro' 
            ? values.pomodoro[0].minutes 
            : values.button === 'short break' ? values.shortBreak[0].minutes
            : values.longBreak[0].minutes
        const seconds = values.button === 'pomodoro' 
            ? values.pomodoro[0].seconds
            : values.button === 'short break' ? values.shortBreak[0].seconds
            : values.longBreak[0].seconds
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
            <div onClick={start}
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
