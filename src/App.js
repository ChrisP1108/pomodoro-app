import { useState } from 'react';
import { defaultSettings, defaultClockStatus, 
  defaultProgressBar } from './Object-Content';
import Options from './components/Options';
import Clock from './components/Clock';
import Settings from './components/Settings';
import './Sass/App.scss';

const App = () => {

  const [stopClock, setStopClock] = useState(false);
  const [toggleSettings, setToggleSettings] = useState(false);
  const [values, setValues] = useState(defaultSettings);
  const [clockStatus, setClockStatus] = useState(defaultClockStatus);
  const [progressBar, setProgressBar] = useState(defaultProgressBar);

  if (stopClock) {
    setTimeout(() => {
      setStopClock(false)
    }, 1250)
  }

  return (
    <div className='viewport-container'>
        {toggleSettings && <div className='trans-background'></div>}
        {toggleSettings && 
          <Settings 
            settingsModalToggler={setToggleSettings} 
            setValues={setValues}
            values={values}
            setClockStatus={setClockStatus}
            setProgressBar={setProgressBar}
          /> 
        }
      <div className='main-container'>
        <h1>pomodoro</h1>
        <Options 
          values={values}
          setValues={setValues}
          setStopClock={setStopClock}
          setProgressBar={setProgressBar}
        />
        <Clock 
          values={values}
          setValues={setValues}
          toggleSettings={toggleSettings}
          stopClock={stopClock}
          setStopClock={setStopClock}
          clockStatus={clockStatus}
          setClockStatus={setClockStatus}
          progressBar={progressBar}
          setProgressBar={setProgressBar}
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


