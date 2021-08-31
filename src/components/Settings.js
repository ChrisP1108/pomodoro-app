import { useState } from 'react';
import { timeFields, defaultTimeState } from '../Object-Content';

const Settings = ({ settingsToggler, timeValues }) => {

    const defaultTimeState = {
        pomodoro: 0,
        shortBreak: 0,
        longBreak: 0
    }

    const [times, setTimes] = useState(defaultTimeState);

    const timeStateUpdate = (name, value) => {
        let data = times;

        switch(name) {
            case 'pomodoro':
                data.pomodoro = Number(value);
                break;
            case 'increment.pomodoro':
                data.pomodoro = data.pomodoro + 1;
                break;
            case 'decrement.pomodoro':
                data.pomodoro = data.pomodoro - 1;
                break;
            case 'shortBreak':
                data.shortBreak = Number(value);
                break;
            case 'increment.shortBreak':
                data.shortBreak = data.shortBreak + 1;
                break;
            case 'decrement.shortBreak':
                data.shortBreak = data.shortBreak - 1;
                break;
            case 'longBreak':
                data.longBreak = Number(value);
                break;
            case 'increment.longBreak':
                data.longBreak = data.longBreak + 1;
                break;
            case 'decrement.longBreak':
                data.longBreak = data.longBreak - 1;
                break;
            default:
                break;
        }
        setTimes({...data});
        timeValues(times);
    }

    const settingsHeader = () => {
        return (
            <div className="header-container">
                <h4>Settings</h4>
                <div onClick={() => settingsToggler(false)}
                    className="closing-icon-container pointer">
                    <div className="closing-icon"></div>
                </div>
            </div>
        )
    }

    const timeFieldsMapping = timeFields.map(field => {
        return (
            <div key={field.id} className="number-row-container">
                <h6>{field.name}</h6>
                <div className="number-value-container">
                    <input type="number" 
                        name={field.variable}
                        value={eval(`times.${field.variable}`)}
                        onChange={(e) => timeStateUpdate(e.target.name, e.target.value)}
                        className="text-field-placement" 
                    />
                    <div className="text-field-arrows-container">
                        <div className="text-field-up-icon">
                            <div onClick ={() => timeStateUpdate(`increment.${field.variable}`)}
                                className="text-field-arrow-filler-up pointer"></div>
                        </div>
                        <div className="text-field-down-icon">
                            <div onClick ={() => timeStateUpdate(`decrement.${field.variable}`)}
                                className="text-field-arrow-filler-down pointer"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    });

    return (
        <div className='settings-modal-container'>
            {settingsHeader()}
            <div className="time-settings-container">
                <h5>TIME (MINUTES)</h5>
                {timeFieldsMapping}
                <div className="text-field-bottom-filler"></div>
            </div>
        </div>
    )
}

export default Settings
