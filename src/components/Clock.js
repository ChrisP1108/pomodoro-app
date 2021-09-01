import { useState, useEffect } from 'react';
import { useInterval } from 'react-interval-hook';
import { defaultClockStatus } from '../Object-Content';

const Clock = ({ values, setValues, toggleSettings, 
    stopClock, setStopClock, clockStatus, setClockStatus,
    progressBar, setProgressBar }) => {
    
    const clockCounter = (input) => {
        let data = values.clockState;
        if (stopClock || toggleSettings) {
            stop(true);
            setStopClock(false);
            return;
        }
        const clock = input === 'pomodoro' ? data.pomodoro[0]
                        : input === 'short break' ? data.shortBreak[0]
                        : data.longBreak[0];
        if (clock.minutes === 0 && clock.seconds === 0) {
            stop(true);
            setProgressBar(0);
            if (input === 'pomodoro') {
                setClockStatus({...clockStatus, pomodoro: 'RESTART'});
            } else if (input === 'short break') {
                setClockStatus({...clockStatus, shortBreak: 'RESTART'});
            } else {
                setClockStatus({...clockStatus, longBreak: 'RESTART'});
            }
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
        const totalSeconds = (clock.minutes * 60) + clock.seconds;
        if (input === 'pomodoro') {
            const incrementAmount = progressBar.pomodoro / totalSeconds;
            setProgressBar({...progressBar, pomodoro: progressBar.pomodoro - incrementAmount});
        } else if (input === 'short break') {
            const incrementAmount = progressBar.shortBreak / totalSeconds;
            setProgressBar({...progressBar, pomodoro: progressBar.shortBreak - incrementAmount});
        } else {
            const incrementAmount = progressBar.longBreak / totalSeconds;
            setProgressBar({...progressBar, pomodoro: progressBar.longBreak - incrementAmount});
        }
        setValues({...values, clockState: data});
    }

    const { start, stop } = useInterval(
        () => { clockCounter(values.clockState.button === 'pomodoro' ? 'pomodoro'
                            : values.clockState.button === 'short break' ? 'short break'
                            : 'long break');
        }, 100,
        {
            autoStart: false,
            immediate: false,
            selfCorrecting: false,
        }
    );

    const clockStarterStopper = (type) => {
        let data = values;
        if (type === 'pomodoro') {
            if (clockStatus.pomodoro === 'START') {
                setClockStatus({...clockStatus, pomodoro: 'PAUSE'});
                start(true);
                setProgressBar({...progressBar, pomodoro: 740});
            } else if (clockStatus.pomodoro === 'PAUSE') {
                setClockStatus({...clockStatus, pomodoro: 'RESUME'});
                stop(true);
            } else if (clockStatus.pomodoro === 'RESUME') {
                setClockStatus({...clockStatus, pomodoro: 'PAUSE'});
                start(true);
            } else if (clockStatus.pomodoro === 'RESTART') {
                data.clockState.pomodoro[0] = values.settingState.pomodoro[0];
                setValues({...data});
                setClockStatus({...clockStatus, pomodoro: 'PAUSE'});
                start(true);
                setProgressBar({...progressBar, pomodoro: 740});
            }
        } else if (type === 'short break') {
            if (clockStatus.shortBreak === 'START') {
                setClockStatus({...clockStatus, shortBreak: 'PAUSE'});
                start(true);
                setProgressBar({...progressBar, shortBreak: 740});
            } else if (clockStatus.shortBreak === 'PAUSE') {
                setClockStatus({...clockStatus, shortBreak: 'RESUME'});
                stop(true);
            } else if (clockStatus.shortBreak === 'RESUME') {
                setClockStatus({...clockStatus, shortBreak: 'PAUSE'});
                start(true);
            } else if (clockStatus.shortBreak === 'RESTART') {
                data.clockState.shortBreak[0] = values.settingState.shortBreak[0];
                setValues({...data});
                setClockStatus({...clockStatus, shortBreak: 'PAUSE'});
                start(true);
                setProgressBar({...progressBar, shortBreak: 740});
            }
        } else if (type === 'long break') {
            if (clockStatus.longBreak === 'START') {
                setClockStatus({...clockStatus, longBreak: 'PAUSE'});
                start(true);
                setProgressBar({...progressBar, longBreak: 740});
            } else if (clockStatus.longBreak === 'PAUSE') {
                setClockStatus({...clockStatus, longBreak: 'RESUME'});
                stop(true);
            } else if (clockStatus.longBreak === 'RESUME') {
                setClockStatus({...clockStatus, longBreak: 'PAUSE'});
                start(true);
            } else if (clockStatus.longBreak === 'RESTART') {
                data.clockState.longBreak[0] = values.settingState.longBreak[0];
                setValues({...data});
                setClockStatus({...clockStatus, longBreak: 'PAUSE'});
                start(true);
                setProgressBar({...progressBar, longBreak: 740});
            }
        }
    }


    const clockTimeDisplay = () => {
        const state = values.clockState
        const minutes = state.button === 'pomodoro' 
            ? state.pomodoro[0].minutes 
            : state.button === 'short break' ? state.shortBreak[0].minutes
            : state.longBreak[0].minutes
        const seconds = state.button === 'pomodoro' 
            ? state.pomodoro[0].seconds
            : state.button === 'short break' ? state.shortBreak[0].seconds
            : state.longBreak[0].seconds
        const data = `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
        return data;
    }

    const clockStatusDisplay = () => {
        const data = values.clockState.button === 'pomodoro' ? clockStatus.pomodoro
                        : values.clockState.button === 'short break' ? clockStatus.shortBreak
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
            <div onClick={() => clockStarterStopper(values.clockState.button)}
                onMouseOver={() => styleStatusText('on')} 
                onMouseOut={() => styleStatusText('off')}
                className="clock-body-inner-container pointer">
                <div className="progress-bar-container">
                    <svg height="100%" width="100%">
                        <circle cx="50%" cy="50%" r="48%" stroke={values.clockState.color}
                            strokeLinecap={progressBar.pomodoro > 0  
                                || progressBar.shortbreak > 0 
                                || progressBar.shortbreak > 0 ? "round" : "square"}
                            strokeDashoffset={
                                values.clockState.button === 'pomodoro' ? `${progressBar.pomodoro}`
                                : values.clockState.button === 'short break' ? `${progressBar.shortBreak}`
                                : `${progressBar.longBreak}`
                            }>   
                        </circle>
                    </svg>
                </div>
                <div className="clock-numbers-container">
                    <h3 style={{fontFamily: values.clockState.font}}>{clockTimeDisplay()}</h3>
                    <h4 style={{fontFamily: values.clockState.font }}>{clockStatusDisplay()}</h4>
                </div>
            </div>
        </div>
    )
}

export default Clock
