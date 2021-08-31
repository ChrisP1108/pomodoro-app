import { useState } from 'react';
import { defaultTimeState } from './Object-Content';
import Options from './components/Options';
import Clock from './components/Clock';
import Settings from './components/Settings';
import './Sass/App.scss';

const App = () => {

  const [toggleSettings, setToggleSettings] = useState(false);
  const [times, setTimes] = useState(defaultTimeState);

  return (
    <div className='viewport-container'>
        {toggleSettings && <div className='trans-background'></div>}
        {toggleSettings && <Settings settingsToggler={setToggleSettings} timeValues={setTimes}/>}
      <div className='main-container'>
        <h1>pomodoro</h1>
        <Options />
        <Clock timeValues={times} />
        <div onClick={() => setToggleSettings(true)}
            className="settings-icon-container pointer">
          <div className="settings-icon cursor"></div>
        </div>
      </div>
    </div>
  )
}

export default App


