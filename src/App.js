import React from 'react';
import { Route } from 'react-router-dom'
import LoginPage from './components/pages/LoginPage';


const App = () => (
    <div>
        <Route path="/" exact component={LoginPage} />
    </div>
);

export default App;
