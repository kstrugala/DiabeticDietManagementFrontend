import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import LoginForm  from '../forms/LoginForm';

import { login } from '../../actions/auth';

class LoginPage extends React.Component
{
    

    componentDidMount = () =>
    {
        this.redirect();
    }

    submit = (data) =>
        this.props.login(data).then(()=>{
            this.redirect();       
        });

    redirect = () =>
    {
        if(this.props.role === "admin")
        {
            this.props.history.push("/admin");
        }
        else if(this.props.role === "Doctor")
        {
            this.props.history.push("/doctor");
        }
        else if(this.props.role === "Receptionist")
        {
            this.props.history.push("/receptionist");
        }
        else if(this.props.role === "Patient")
        {
            this.props.history.push("/patient");
        }
    }


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
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    // eslint-disable-next-line
    role: PropTypes.string
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