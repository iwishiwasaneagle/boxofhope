import logo from './images/logo.svg';
import {Col} from 'react-bootstrap';
import './App.css';
import PushNotificationCard from "./components/pushNotifications/PushNotificationCard";
import MasksCard from './components/masksList/MasksCard';
import BottomBar from './components/bottomBar/BottomBar';
import StatsCard from './components/statsCard/StatsCard';
import StatusCard from './components/statusCard/StatusCard';

function App() {
  return (
    <div className="App">
      <div id="bg"/>
      <header id="home" className="App-header">
          <img className='logo' src={logo}></img>
      </header>
      <Col className="Body-list">
          <PushNotificationCard id="notification"/>
          {/* <MasksCard id="mask"/> */}
          <StatusCard id="status"/>
          <StatsCard id="stats"/>      
          <div height="100"/>
      </Col>
      <BottomBar/>
    </div>
  );
}

export default App;
