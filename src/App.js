import { useState } from 'react';
import { defaultSettings, defaultTimerState } from './Object-Content';
import Options from './components/Options';
import Clock from './components/Clock';
import Settings from './components/Settings';
import './Sass/App.scss';

const App = () => {

  const [toggleSettings, setToggleSettings] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);
  const [timerToggle, setTimerToggle] = useState(defaultTimerState);

  return (
    <div className='viewport-container'>
        {toggleSettings && <div className='trans-background'></div>}
        {toggleSettings && 
          <Settings 
            settingsModalToggler={setToggleSettings} 
            values={settings}
            setValues={setSettings}
          /> 
        }
      <div className='main-container'>
        <h1>pomodoro</h1>
        <Options 
          values={settings}
          setValues={setSettings}
        />
        <Clock 
          values={settings}
          timerToggle={timerToggle}
          setTimerToggle={setTimerToggle}
          toggleSettings={toggleSettings}
        />
        <div onClick={() => { setToggleSettings(true); setTimerToggle(defaultTimerState) }}
            className="settings-icon-container pointer">
          <div className="settings-icon cursor"></div>
        </div>
      </div>
    </div>
  )
}

export default App


