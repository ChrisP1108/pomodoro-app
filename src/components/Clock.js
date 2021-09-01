import { useInterval } from 'react-interval-hook';
import { progressBarStart } from '../Object-Content';

const Clock = ({ values, setValues, toggleSettings, 
    stopClock, setStopClock, clockStatus, setClockStatus,
    progressBar, setProgressBar }) => {
    
    const clockCounter = (input) => {
        if (stopClock || toggleSettings) {
            stop(true);
            if (clockStatus.pomodoro === 'PAUSE') {
                setClockStatus({...clockStatus, pomodoro: 'RESUME'});
            } 
            if (clockStatus.shortBreak === 'PAUSE') {
                setClockStatus({...clockStatus, shortBreak: 'RESUME'});
            } 
            if (clockStatus.longBreak === 'PAUSE') {
                setClockStatus({...clockStatus, longBreak: 'RESUME'});
            }
            setStopClock(false);
            return;
        }
        const clock = input === 'pomodoro' ? values.clockState.pomodoro[0]
                        : input === 'short break' ? values.clockState.shortBreak[0]
                        : values.clockState.longBreak[0];
        if (clock.minutes === 0 && clock.seconds === 0) {
            stop(true);
            if (input === 'pomodoro') {
                setClockStatus({...clockStatus, pomodoro: 'RESTART'});
                setProgressBar({...progressBar, pomodoro: 0});
            } else if (input === 'short break') {
                setClockStatus({...clockStatus, shortBreak: 'RESTART'});
                setProgressBar({...progressBar, shortBreak: 0});
            } else {
                setClockStatus({...clockStatus, longBreak: 'RESTART'});
                setProgressBar({...progressBar, longBreak: 0});
            }
            return;
        } else if (clock.minutes >= 1 && clock.seconds === 0) {
            if (input === 'pomodoro') {
                setValues({...values, clockState: {...values.clockState, pomodoro: [{...values.clockState.pomodoro[0], minutes: values.clockState.pomodoro[0].minutes - 1, seconds: 59}]}})
            } else if (input === 'short break') {
                setValues({...values, clockState: {...values.clockState, shortBreak: [{...values.clockState.shortBreak[0], minutes: values.clockState.shortBreak[0].minutes - 1, seconds: 59}]}})
            } else {
                setValues({...values, clockState: {...values.clockState, longBreak: [{...values.clockState.longBreak[0], minutes: values.clockState.longBreak[0].minutes - 1, seconds: 59}]}})
            }    
        } else {
            if (input === 'pomodoro') {
                setValues({...values, clockState: {...values.clockState, pomodoro: [{...values.clockState.pomodoro[0], seconds: values.clockState.pomodoro[0].seconds - 1}]}})
            } else if (input === 'short break') {
                setValues({...values, clockState: {...values.clockState, shortBreak: [{...values.clockState.shortBreak[0], seconds: values.clockState.shortBreak[0].seconds - 1}]}})
            } else {
                setValues({...values, clockState: {...values.clockState, longBreak: [{...values.clockState.longBreak[0], seconds: values.clockState.longBreak[0].seconds - 1}]}})
            }
        }
        const totalSeconds = (clock.minutes * 60) + clock.seconds;
        if (input === 'pomodoro') {
            const incrementPomodoro = progressBar.pomodoro / totalSeconds;
            setProgressBar({...progressBar, pomodoro: progressBar.pomodoro - incrementPomodoro});
        } else if (input === 'short break') {
            const incrementShortBreak = progressBar.shortBreak / totalSeconds;
            setProgressBar({...progressBar, shortBreak: progressBar.shortBreak - incrementShortBreak});
        } else {
            const incrementLongBreak = progressBar.longBreak / totalSeconds;
            setProgressBar({...progressBar, longBreak: progressBar.longBreak - incrementLongBreak});
        }
    }

    const { start, stop } = useInterval(
        () => { clockCounter(values.clockState.button === 'pomodoro' ? 'pomodoro'
                            : values.clockState.button === 'short break' ? 'short break'
                            : 'long break');
        }, 1000,
        {
            autoStart: false,
            immediate: false,
            selfCorrecting: false,
        }
    );

    const clockStarterStopper = (type) => {
        if (type === 'pomodoro') {
            if (clockStatus.pomodoro === 'START') {
                setClockStatus({...clockStatus, pomodoro: 'PAUSE'});
                start(true);
                setProgressBar({...progressBar, pomodoro: progressBarStart});
            } else if (clockStatus.pomodoro === 'PAUSE') {
                setClockStatus({...clockStatus, pomodoro: 'RESUME'});
                stop(true);
            } else if (clockStatus.pomodoro === 'RESUME') {
                setClockStatus({...clockStatus, pomodoro: 'PAUSE'});
                start(true);
            } else if (clockStatus.pomodoro === 'RESTART') {
                setValues({...values, clockState: {...values.clockState, pomodoro: [{...values.settingState.pomodoro[0]}]}})
                setClockStatus({...clockStatus, pomodoro: 'PAUSE'});
                start(true);
                setProgressBar({...progressBar, pomodoro: progressBarStart});
            }
        } else if (type === 'short break') {
            if (clockStatus.shortBreak === 'START') {
                setClockStatus({...clockStatus, shortBreak: 'PAUSE'});
                start(true);
                setProgressBar({...progressBar, shortBreak: progressBarStart});
            } else if (clockStatus.shortBreak === 'PAUSE') {
                setClockStatus({...clockStatus, shortBreak: 'RESUME'});
                stop(true);
            } else if (clockStatus.shortBreak === 'RESUME') {
                setClockStatus({...clockStatus, shortBreak: 'PAUSE'});
                start(true);
            } else if (clockStatus.shortBreak === 'RESTART') {
                setValues({...values, clockState: {...values.clockState, shortBreak: [{...values.settingState.shortBreak[0]}]}})
                setClockStatus({...clockStatus, shortBreak: 'PAUSE'});
                start(true);
                setProgressBar({...progressBar, shortBreak: progressBarStart});
            }
        } else if (type === 'long break') {
            if (clockStatus.longBreak === 'START') {
                setClockStatus({...clockStatus, longBreak: 'PAUSE'});
                start(true);
                setProgressBar({...progressBar, longBreak: progressBarStart});
            } else if (clockStatus.longBreak === 'PAUSE') {
                setClockStatus({...clockStatus, longBreak: 'RESUME'});
                stop(true);
            } else if (clockStatus.longBreak === 'RESUME') {
                setClockStatus({...clockStatus, longBreak: 'PAUSE'});
                start(true);
            } else if (clockStatus.longBreak === 'RESTART') {
                setValues({...values, clockState: {...values.clockState, longBreak: [{...values.settingState.longBreak[0]}]}})
                setClockStatus({...clockStatus, longBreak: 'PAUSE'});
                start(true);
                setProgressBar({...progressBar, longBreak: progressBarStart});
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
        const data = `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
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
        status === 'on' ? text.style.color = values.clockState.color 
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
                            strokeLinecap="round"
                            strokeDashoffset={
                                values.clockState.button === 'pomodoro' ? `${progressBar.pomodoro}`
                                : values.clockState.button === 'short break' ? `${progressBar.shortBreak}`
                                : `${progressBar.longBreak}`
                            }>   
                        </circle>
                    </svg>
                </div>
                <div className="clock-numbers-container">
                    <h3 style={{fontFamily: values.clockState.font, 
                            transform: values.clockState.font === 'Space Mono' ? `scale(0.8)` : `scale(1.0)`}}>{clockTimeDisplay()}</h3>
                    <h4 style={{fontFamily: values.clockState.font }}>{clockStatusDisplay()}</h4>
                </div>
            </div>
        </div>
    )
}

export default Clock