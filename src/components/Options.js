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
                className='option-button-container pointer'>
                    <h2 style={{ fontFamily: values.clockState.font }}
                        className={values.clockState.button === button.name ? `button-active-text` : ``}>{button.name}</h2>
            </div>
        )
    });
    
    return (
        <div className='options-container'>
            {buttonMapping}
            <div className="option-button-highlight"
                style={{ backgroundColor: values.clockState.color, 
                    transform: `${values.clockState.button === 'pomodoro' ? `translateX(-115%)` 
                    : values.clockState.button === 'short break' ? `translateX(0%)` 
                    : `translateX(115%)`}`}}></div>
        </div>
    )
}

export default Options
