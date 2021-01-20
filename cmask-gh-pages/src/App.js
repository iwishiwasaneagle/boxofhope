import './App.css';
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt='Logo'/>
        <p>
          Hi, welcome to Box Of Hope!
        </p>
        <a
          className="App-link"
          href="https://github.com/iwishiwasaneagle/boxofhope"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check it out!
        </a>
      </header>
    </div>
  );
}

export default App;
