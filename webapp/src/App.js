import logo from './images/logo.svg';
import {Col} from 'react-bootstrap';
import './App.css';
import PushNotificationCard from "./components/pushNotifications/PushNotificationCard";
import MasksCard from './components/masksList/MasksCard';
import BottomBar from './components/bottomBar/BottomBar';
import StatsCard from './components/statsCard/StatsCard';

function App() {
  return (
    <div className="App">
      <header id="home" className="App-header">
          <img className='logo' src={logo}></img>
      </header>
      <Col className="Body-list">
          <PushNotificationCard id="notification"/>
          <MasksCard id="mask"/>
          <StatsCard id="stats"/>      
      </Col>
      {/* <BottomBar/> */}
    </div>
  );
}

export default App;
