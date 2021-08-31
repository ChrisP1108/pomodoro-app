import { useState } from 'react';
import { defaultSettings } from './Object-Content';
import Options from './components/Options';
import Clock from './components/Clock';
import Settings from './components/Settings';
import './Sass/App.scss';

const App = () => {

  const [toggleSettings, setToggleSettings] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);
  const [startTimer, setStartTimer] = useState(false);

  return (
    <div className='viewport-container'>
        {toggleSettings && <div className='trans-background'></div>}
        {toggleSettings && 
          <Settings 
            settingsModalToggler={setToggleSettings} 
            values={settings}
            setValues={setSettings}
            startTimer={setStartTimer}
          /> 
        }
      <div className='main-container'>
        <h1>pomodoro</h1>
        <Options />
        <Clock 
          values={settings}
          startTimer={startTimer}
        />
        <div onClick={() => { setToggleSettings(true); setStartTimer(false) }}
            className="settings-icon-container pointer">
          <div className="settings-icon cursor"></div>
        </div>
      </div>
    </div>
  )
}

export default App


