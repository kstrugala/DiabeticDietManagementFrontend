import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm  from '../forms/LoginForm';
import { login } from '../../actions/auth';

class LoginPage extends React.Component
{
    submit = (data) =>
        this.props.login(data).then(()=>{
            
        });

    
    render()
    {
        return(
            <div className='login-page'>
                <LoginForm submit={this.submit}/>
            </div>
        );
    }
}

LoginPage.propTypes = {
    login: PropTypes.func.isRequired
};

export default connect(null, { login })(LoginPage);