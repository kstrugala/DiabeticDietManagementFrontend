import React from 'react';
import { Route } from 'react-router-dom'
import LoginPage from './components/pages/LoginPage';
import AdminPage from './components/pages/AdminPage';


const App = () => (
    <div>
        <Route path="/" exact component={LoginPage} />
        <Route path="/admin" exact component={AdminPage} />
    </div>
);

export default App;
