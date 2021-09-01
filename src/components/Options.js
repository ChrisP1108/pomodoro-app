import { buttonFields } from '../Object-Content.js';

const Options = ({ values, setValues, setStopClock, setProgressBar }) => {

    const buttonStateUpdate = (value) => {
        let data = values.clockState;
        data.button = value;
        setValues({...values, clockState: data})
    }
    
    const buttonMapping = buttonFields.map(button => {
        return (
            <div key={button.id} 
                onClick={() => { buttonStateUpdate(button.name); setStopClock(true)}}
                style={{ backgroundColor: 
                    values.clockState.button === button.name && values.clockState.color}}
                className='option-button-container pointer'>
                    <h2 style={{ fontFamily: values.clockState.font }}
                        className={values.clockState.button === button.name ? `button-active-text` : ``}>{button.name}</h2>
            </div>
        )
    });
    
    return (
        <div className='options-container'>
            {buttonMapping}
        </div>
    )
}

export default Options
