import './App.css';
import logo from './logo.svg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faYoutube,faFacebook,faTwitter,faInstagram,faLinkedin, faGithub} from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return <div className='social-container'>
    <a href="https://github.com/iwishiwasaneagle/boxofhope"
      className="github social">
      <FontAwesomeIcon icon={faGithub} size="2x" />
    </a>
    <a href="https://www.youtube.com/channel/UCG8txVUxQb3aCut7adeDU7A"
      className="youtube social">
      <FontAwesomeIcon icon={faYoutube} size="2x" />
    </a>
    <a href="https://www.facebook.com/Box-of-Hope-106011608167716"
      className="facebook social">
      <FontAwesomeIcon icon={faFacebook} size="2x" />
    </a>
    <a href="https://twitter.com/theboxofhope" 
      className="twitter social">
      <FontAwesomeIcon icon={faTwitter} size="2x" />
    </a>
    <a href="https://www.instagram.com/theboxofhope"
      className="instagram social">
      <FontAwesomeIcon icon={faInstagram} size="2x" />
    </a>
    <a href="https://www.linkedin.com/company/theboxofhope"
      className="linkedin social">
      <FontAwesomeIcon icon={faLinkedin} size="2x" />
    </a>
  </div>
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className='logo' src={logo} alt='Logo' />
        <h1>
          Coming soon
        </h1>
      <Footer />
      </header>
    </div>
  );
}

export default App;
