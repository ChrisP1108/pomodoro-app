import { timeFields, fontFields, colorFields, 
    defaultClockStatus, defaultProgressBar } from '../Object-Content';

const Settings = ({ values, setValues, settingsModalToggler,
        setClockStatus, setProgressBar, toggleSettings, 
        fieldCheck, setFieldCheck }) => {

    const valuestateUpdate = (name, value) => {
        switch(name) {
            case 'pomodoro':
                if (value < 0 || value > 99) {
                    setValues({...values, settingState: {...values.settingState, pomodoro: [{...values.settingState.pomodoro[0], minutes: 0}]}})
                    break;
                }
                setValues({...values, settingState: {...values.settingState, pomodoro: [{...values.settingState.pomodoro[0], minutes: Number(value)}]}})
                break;
            case 'increment.pomodoro':
                if (values.settingState.pomodoro[0].minutes >= 99) {
                    break;
                }
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
                if (value < 0) {
                    setValues({...values, settingState: {...values.settingState, shortBreak: [{...values.settingState.shortBreak[0], minutes: 0}]}})
                    break;
                }
                break;
            case 'increment.shortBreak':
                if (values.settingState.shortBreak[0].minutes >= 99) {
                    break;
                }
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
                if (value < 0) {
                    setValues({...values, settingState: {...values.settingState, longBreak: [{...values.settingState.longBreak[0], minutes: 0}]}})
                    break;
                }
                break;
            case 'increment.longBreak':
                if (values.settingState.longBreak[0].minutes >= 99) {
                    break;
                }
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
            <div key={field.id} className="d-flex">
                <div key={field.id} className="number-row-container d-md-flex flex-md-column">
                    <h6>{field.name}</h6>
                    <h6 className={fieldCheck && (field.id === 1 ? values.settingState.pomodoro[0].minutes === 0
                        : field.id === 2 ? values.settingState.shortBreak[0].minutes === 0
                        : values.settingState.longBreak[0].minutes === 0) 
                        ? `field-error-text` : `d-none`}>
                            Can't be 0
                    </h6>
                    <div className={`${fieldCheck && (field.id === 1 ? values.settingState.pomodoro[0].minutes === 0
                        : field.id === 2 ? values.settingState.shortBreak[0].minutes === 0
                        : values.settingState.longBreak[0].minutes === 0) 
                        ? `field-error-border` : ``}
                        number-value-container mt-md-2`}>
                        <input type="text" 
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
                {field.id !== 3 &&
                    <div className="d-none d-md-block field-side-gap-filler"></div>
                }
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
        if (values.settingState.pomodoro[0].minutes === 0 
            || values.settingState.shortBreak[0].minutes === 0
            || values.settingState.longBreak[0].minutes === 0) {
            setFieldCheck(true);
            return
        }
        setFieldCheck(false);
        setValues({...values, clockState: values.settingState});
        const SavedSettings = values.settingState;
        console.log(SavedSettings);
        const JsonSavedSettings = JSON.stringify(SavedSettings);
        localStorage.setItem("SavedSettings", JsonSavedSettings);
        setClockStatus(defaultClockStatus);
        settingsModalToggler(false);
        setProgressBar(defaultProgressBar);
    }

    return (
        <div className={`${toggleSettings && `modal-animation`} settings-modal-container`}>
            {valuesHeader()}
            <div className="section-settings-container">
                <h5 className="time-heading-adjust">TIME (MINUTES)</h5>
                <div className="w-100 d-md-flex flex-md-row">
                {timeFieldsMapping}
                </div>
                <div className="field-bottom-filler"></div>
            </div>
            <div className="section-font-container d-md-flex flex-md-row 
                justify-content-md-between align-items-md-center">
                <h5>FONT</h5>
                <div className="d-flex w-50 w-32 justify-content-between">
                    {fontFieldsMapping}
                </div>
                <div className="field-bottom-filler d-md-none"></div>
            </div>
            <div className="section-color-container d-md-flex flex-md-row
                justify-content-md-between align-items-md-center">
                <h5>COLOR</h5>
                <div className="d-flex w-50 w-32 justify-content-between mt-2">
                    {colorFieldsMapping}
                </div>
                <div className="field-bottom-filler d-md-none"></div>
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