import { useState } from 'react';
import Options from './components/Options';
import Clock from './components/Clock';
import Settings from './components/Settings';
import './Sass/App.scss';

const App = () => {

  const [toggleSettings, setToggleSettings] = useState(false);

  return (
    <div className='viewport-container'>
        {toggleSettings && <div className='trans-background'></div>}
        {toggleSettings && <Settings settingsToggler={setToggleSettings}/>}
      <div className='main-container'>
        <h1>pomodoro</h1>
        <Options />
        <Clock />
        <div onClick={() => setToggleSettings(true)}
            className="settings-icon-container pointer">
          <div className="settings-icon cursor"></div>
        </div>
      </div>
    </div>
  )
}

export default App


