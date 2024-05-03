/** @format */

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from './Dashboard';
import DataSensor from './DataSensor';
import ActionHistory from './ActionHistory';
import Profile from './Profile';

export default function App() {
   return (
      <Router>
         <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/data_sensor' element={<DataSensor />} />
            <Route path='/action_history' element={<ActionHistory />} />
            <Route path='/profile' element={<Profile />} />
         </Routes>
      </Router>
   );
}
