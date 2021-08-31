import { timeFields, fontFields, colorFields} from '../Object-Content';

const values = ({ values, setValues, settingsModalToggler, startTimer }) => {

    const valuestateUpdate = (name, value) => {
        let data = values;
        switch(name) {
            case 'pomodoro':
                data.pomodoro = Number(value);
                if (data.pomodoro <= 1) {
                    data.pomodoro = Number(1);
                    break;
                }
                break;
            case 'increment.pomodoro':
                data.pomodoro = data.pomodoro + 1;
                break;
            case 'decrement.pomodoro':
                if (data.pomodoro <= 1) {
                    data.pomodoro = Number(1);
                    break;
                } else {
                    data.pomodoro = data.pomodoro - 1;
                    break;
                }
            case 'shortBreak':
                data.shortBreak = Number(value);
                if (data.shortBreak <= 1) {
                    data.shortBreak = Number(1);
                    break;
                }
                break;
            case 'increment.shortBreak':
                data.shortBreak = data.shortBreak + 1;
                break;
            case 'decrement.shortBreak':
                data.shortBreak = data.shortBreak - 1;
                if (data.shortBreak <= 1) {
                    data.shortBreak = Number(1);
                    break;
                }
                break;
            case 'longBreak':
                data.longBreak = Number(value);
                if (data.longBreak <= 1) {
                    data.longBreak = Number(1);
                    break;
                }
                break;
            case 'increment.longBreak':
                data.longBreak = data.longBreak + 1;
                break;
            case 'decrement.longBreak':
                data.longBreak = data.longBreak - 1;
                if (data.longBreak <= 1) {
                    data.longBreak = Number(1);
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
        setValues({...data});
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
                        value={eval(`values.${field.variable}`)}
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
                onClick ={() => valuestateUpdate('font', font.id)}
                className={`${values.font === font.id && `active-font`} 
                    f${font.id} font-circle-container pointer`}>
                    <p>Aa</p>
            </div>
        )
    });

    const colorFieldsMapping = colorFields.map(color => {
        return (
            <div key={color.id} 
                onClick ={() => valuestateUpdate('color', color.id)}
                className={`c${color.id} circle-container pointer`}>
                    {values.color === color.id && 
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
                <div onClick={() => { startTimer(true); settingsModalToggler(false) }}
                    className="apply-button-container pointer">
                    <p>Apply</p>
                </div>
            </div>
        </div>
    )
}

export default values
