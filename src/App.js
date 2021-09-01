import { useState } from 'react';
import { defaultSettings } from './Object-Content';
import Options from './components/Options';
import Clock from './components/Clock';
import Settings from './components/Settings';
import './Sass/App.scss';

const App = () => {

  const [stopClock, setStopClock] = useState(false);
  const [toggleSettings, setToggleSettings] = useState(false);
  const [values, setValues] = useState(defaultSettings);

  return (
    <div className='viewport-container'>
        {toggleSettings && <div className='trans-background'></div>}
        {toggleSettings && 
          <Settings 
            settingsModalToggler={setToggleSettings} 
            setValues={setValues}
          /> 
        }
      <div className='main-container'>
        <h1>pomodoro</h1>
        <Options 
          values={values}
          setValues={setValues}
          setStopClock={setStopClock}
        />
        <Clock 
          values={values}
          setValues={setValues}
          toggleSettings={toggleSettings}
          stopClock={stopClock}
          setStopClock={setStopClock}
        />
        <div onClick={() => setToggleSettings(true)}
            className="settings-icon-container pointer">
          <div className="settings-icon cursor"></div>
        </div>
      </div>
    </div>
  )
}

export default App


