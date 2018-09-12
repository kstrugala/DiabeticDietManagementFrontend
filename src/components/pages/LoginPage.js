import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm  from '../forms/LoginForm';

import { login } from '../../actions/auth';

class LoginPage extends React.Component
{
    submit = (data) =>
        this.props.login(data).then(()=>{
            if(this.props.role === "admin")
            {
                this.props.history.push("/admin");
            }
            else if(this.props.role === "Doctor")
            {
                console.log("doctor");
            }
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
    login: PropTypes.func.isRequired,
    role: PropTypes.string.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

const mapStateToProps = state =>
{
    if(typeof(state.user.userData) !== "undefined")
    {
        return { role:state.user.userData.role };
    }
    return { role:"null" }
};

export default connect(mapStateToProps, { login })(LoginPage);