import Options from './components/Options';
import Clock from './components/Clock';
import './Sass/App.scss';

const App = () => {
  return (
    <div className='viewport-container'>
      <div className='main-container'>
        <h1>pomodoro</h1>
        <Options />
        <Clock />
      </div>
    </div>
  )
}

export default App


