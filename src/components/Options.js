import { buttonFields } from '../Object-Content.js';

const Options = ({ values, setValues, setStopClock }) => {

    const buttonStateUpdate = (value) => {
        const data = values;
        data.button = value;
        setValues({...data})
    }
    
    const buttonMapping = buttonFields.map(button => {
        return (
            <div key={button.id} 
                onClick={() => { buttonStateUpdate(button.name); setStopClock(true)}}
                style={{ backgroundColor: 
                    values.button === button.name && values.color}}
                className='option-button-container pointer'>
                    <h2 style={{ fontFamily: values.font }}
                        className={values.button === button.name ? `button-active-text` : ``}>{button.name}</h2>
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
