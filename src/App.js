import React from 'react';
import { Route } from 'react-router-dom'
import LoginPage from './components/pages/LoginPage';
import AdminPage from './components/pages/AdminPage';
import ReceptionistPage from './components/pages/ReceptionistPage';
import DoctorPage from './components/pages/DoctorPage';


const App = () => (
    <div>
        <Route path="/" exact component={LoginPage} />
        <Route path="/admin" exact component={AdminPage} />
        <Route path="/receptionist" exact component={ReceptionistPage} />
        <Route path="/doctor" exact component={DoctorPage} />

    </div>
);

export default App;
