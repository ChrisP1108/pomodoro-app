import { useState } from 'react';
import { defaultSettings, timeFields, fontFields, colorFields} from '../Object-Content';

const Settings = ({ setValues, settingsModalToggler }) => {

    const [fields, setFields] = useState(defaultSettings);

    const valuestateUpdate = (name, value) => {
        let data = fields;
        switch(name) {
            case 'pomodoro':
                data.pomodoro[0].minutes = Number(value);
                if (data.pomodoro <= 1) {
                    data.pomodoro = Number(1);
                    break;
                }
                break;
            case 'increment.pomodoro':
                data.pomodoro[0].minutes = data.pomodoro[0].minutes + 1;
                break;
            case 'decrement.pomodoro':
                if (data.pomodoro[0].minutes <= 1) {
                    data.pomodoro[0].minutes = Number(1);
                    break;
                } else {
                    data.pomodoro[0].minutes = data.pomodoro[0].minutes - 1;
                    break;
                }
            case 'shortBreak':
                data.shortBreak = Number(value);
                if (data.shortBreak[0].minutes <= 1) {
                    data.shortBreak[0].minutes = Number(1);
                    break;
                }
                break;
            case 'increment.shortBreak':
                data.shortBreak[0].minutes = data.shortBreak[0].minutes + 1;
                break;
            case 'decrement.shortBreak':
                data.shortBreak[0].minutes = data.shortBreak[0].minutes - 1;
                if (data.shortBreak[0].minutes <= 1) {
                    data.shortBreak[0].minutes = Number(1);
                    break;
                }
                break;
            case 'longBreak':
                data.longBreak[0].minutes = Number(value);
                if (data.longBreak[0].minutes <= 1) {
                    data.longBreak[0].minutes = Number(1);
                    break;
                }
                break;
            case 'increment.longBreak':
                data.longBreak[0].minutes = data.longBreak[0].minutes + 1;
                break;
            case 'decrement.longBreak':
                data.longBreak[0].minutes = data.longBreak[0].minutes - 1;
                if (data.longBreak[0].minutes <= 1) {
                    data.longBreak[0].minutes = Number(1);
                    break;
                }
                break;
            case 'font':
                data.font = value;
                break;
            case 'color':
                data.color = value;
                break;
            default:
                break;
        }
        setFields({...data});
    }

    const valuesHeader = () => {
        return (
            <div className="header-container">
                <h4>Settings</h4>
                <div onClick={() => settingsModalToggler(false)}
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
                        value={eval(`fields.${field.variable}[0].minutes`)}
                        onChange={(e) => valuestateUpdate(e.target.name, e.target.value)}
                        className="text-field-placement" 
                    />
                    <div className="text-field-arrows-container">
                        <div className="text-field-up-icon">
                            <div onClick ={() => valuestateUpdate(`increment.${field.variable}`)}
                                className="text-field-arrow-filler-up pointer"></div>
                        </div>
                        <div className="text-field-down-icon">
                            <div onClick ={() => valuestateUpdate(`decrement.${field.variable}`)}
                                className="text-field-arrow-filler-down pointer"></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    });

    const fontFieldsMapping = fontFields.map(font => {
        return (
            <div key={font.id} 
                onClick ={() => valuestateUpdate('font', font.font)}
                className={`${fields.font === font.font && `active-font`} 
                    f${font.id} font-circle-container pointer`}>
                    <p>Aa</p>
            </div>
        )
    });

    const colorFieldsMapping = colorFields.map(color => {
        return (
            <div key={color.id} 
                onClick ={() => valuestateUpdate('color', color.color)}
                className={`c${color.id} circle-container pointer`}>
                    {fields.color === color.color && 
                        <div className="circle-checked"></div>
                    }
            </div>
        )
    });

    return (
        <div className='settings-modal-container'>
            {valuesHeader()}
            <div className="section-settings-container">
                <h5>TIME (MINUTES)</h5>
                {timeFieldsMapping}
                <div className="field-bottom-filler"></div>
            </div>
            <div className="section-settings-container">
                <h5>FONT</h5>
                <div className="d-flex w-50 justify-content-between mt-2">
                    {fontFieldsMapping}
                </div>
                <div className="field-bottom-filler"></div>
            </div>
            <div className="section-color-container">
                <h5>COLOR</h5>
                <div className="d-flex w-50 justify-content-between mt-2">
                    {colorFieldsMapping}
                </div>
                <div className="field-bottom-filler"></div>
            </div>
            <div className="d-flex justify-content-center">
                <div onClick={() => { setValues({...fields}); settingsModalToggler(false) }}
                    className="apply-button-container pointer">
                    <p>Apply</p>
                </div>
            </div>
        </div>
    )
}

export default Settings
