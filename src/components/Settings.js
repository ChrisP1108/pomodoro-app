import { timeFields, fontFields, colorFields, 
    defaultClockStatus, defaultProgressBar } from '../Object-Content';

const Settings = ({ values, setValues, settingsModalToggler,
        setClockStatus, setProgressBar }) => {

    const valuestateUpdate = (name, value) => {
        switch(name) {
            case 'pomodoro':
                setValues({...values, settingState: {...values.settingState, pomodoro: [{...values.settingState.pomodoro[0], minutes: Number(value)}]}})
                if (values.settingState.pomodoro[0].minutes <= 1) {
                    setValues({...values, settingState: {...values.settingState, pomodoro: [{...values.settingState.pomodoro[0], minutes: 1}]}})
                    break;
                }
                break;
            case 'increment.pomodoro':
                setValues({...values, settingState: {...values.settingState, pomodoro: [{...values.settingState.pomodoro[0], minutes: values.settingState.pomodoro[0].minutes + 1}]}})
                break;
            case 'decrement.pomodoro':
                if (values.settingState.pomodoro[0].minutes <= 1) {
                    setValues({...values, settingState: {...values.settingState, pomodoro: [{...values.settingState.pomodoro[0], minutes: 1}]}})
                    break;
                } else {
                    setValues({...values, settingState: {...values.settingState, pomodoro: [{...values.settingState.pomodoro[0], minutes: values.settingState.pomodoro[0].minutes - 1}]}})
                    break;
                }
            case 'shortBreak':
                setValues({...values, settingState: {...values.settingState, shortBreak: [{...values.settingState.shortBreak[0], minutes: Number(value)}]}})
                if (values.settingState.shortBreak[0].minutes <= 1) {
                    setValues({...values, settingState: {...values.settingState, shortBreak: [{...values.settingState.shortBreak[0], minutes: 1}]}})
                    break;
                }
                break;
            case 'increment.shortBreak':
                setValues({...values, settingState: {...values.settingState, shortBreak: [{...values.settingState.shortBreak[0], minutes: values.settingState.shortBreak[0].minutes + 1}]}})
                break;
            case 'decrement.shortBreak':
                if (values.settingState.shortBreak[0].minutes <= 1) {
                    setValues({...values, settingState: {...values.settingState, shortBreak: [{...values.settingState.shortBreak[0], minutes: 1}]}})
                    break;
                } else {
                    setValues({...values, settingState: {...values.settingState, shortBreak: [{...values.settingState.shortBreak[0], minutes: values.settingState.shortBreak[0].minutes - 1}]}})
                }
                break;
            case 'longBreak':
                setValues({...values, settingState: {...values.settingState, longBreak: [{...values.settingState.longBreak[0], minutes: Number(value)}]}})
                if (values.settingState.longBreak[0].minutes <= 1) {
                    setValues({...values, settingState: {...values.settingState, longBreak: [{...values.settingState.longBreak[0], minutes: 1}]}})
                    break;
                }
                break;
            case 'increment.longBreak':
                setValues({...values, settingState: {...values.settingState, longBreak: [{...values.settingState.longBreak[0], minutes: values.settingState.longBreak[0].minutes + 1}]}})
                break;
            case 'decrement.longBreak':
                if (values.settingState.longBreak[0].minutes <= 1) {
                    setValues({...values, settingState: {...values.settingState, longBreak: [{...values.settingState.longBreak[0], minutes: 1}]}})
                    break;
                } else {
                    setValues({...values, settingState: {...values.settingState, longBreak: [{...values.settingState.longBreak[0], minutes: values.settingState.longBreak[0].minutes - 1}]}})
                } 
                break;
            case 'font':
                setValues({...values, settingState: {...values.settingState, font: value}})
                break;
            case 'color':
                setValues({...values, settingState: {...values.settingState, color: value}})
                break;
            default:
                break;
        }
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
                        value={field.id === 1 ? values.settingState.pomodoro[0].minutes
                                : field.id === 2 ? values.settingState.shortBreak[0].minutes
                                : values.settingState.longBreak[0].minutes}
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
                className={`${values.settingState.font === font.font && `active-font`} 
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
                    {values.settingState.color === color.color && 
                        <div className="circle-checked"></div>
                    }
            </div>
        )
    });

    const toggleApplyButton = () => {
        setValues({...values, clockState: values.settingState});
        setClockStatus(defaultClockStatus);
        settingsModalToggler(false);
        setProgressBar(defaultProgressBar);
    }

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
                <div onClick={() => toggleApplyButton()}
                    className="apply-button-container pointer">
                    <p>Apply</p>
                </div>
            </div>
        </div>
    )
}

export default Settings