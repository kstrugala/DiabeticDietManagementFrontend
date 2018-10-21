import React from 'react'
import { Form, Button, Message } from 'semantic-ui-react';
import { connect } from "react-redux"
import PropTypes from "prop-types";
import Validator from 'validator'
import { changePassword } from '../../actions/auth'

class ChangePasswordPartial extends React.Component {
  state = {
      passwordChanged: false,
      errorLenght: false,
      errorCheck: false,
      errorOldPasswordCheck: false,
      data: {
          oldPassword: "",
          newPassword: "",
          passwordCheck: "",
      }
  }

  onChange = e => 
      this.setState({
          data: { ...this.state.data, [e.target.name]: e.target.value }
      });

  submit = () => {
      this.setState({
          passwordChanged: false,
          errorLenght: false,
          errorCheck: false,
          errorOldPasswordCheck: false,
    
      })
      if(this.state.data.oldPassword!=="" && this.state.data.newPassword!=="" && this.state.data.passwordCheck!=="")
      {
          if(this.state.data.newPassword === this.state.data.passwordCheck)
          {
              if(Validator.isLength(this.state.data.newPassword, {min: 4, max:undefined}))
              {
                  const payload = {oldPassword: this.state.data.oldPassword, newPassword:this.state.data.newPassword};
                  this.props.changePassword(payload).then((data) => {
                      if(data.status===200)
                      {
                          this.setState({
                              passwordChanged: true,
                              errorLenght: false,
                              errorCheck: false,
                              errorOldPasswordCheck: false,
                          
                          })
                      }
                      else
                      {
                          this.setState({errorCheck:true});
                      }
                  });
              }
              else
              {
                  this.setState({errorLenght: true})
              }
          }
          else
          {
              this.setState({errorOldPasswordCheck: true})
          }
      }
      else
      {
          this.setState({errorLenght: true})
      }
  }

  render() {
      return (
          <div>
              {this.state.passwordChanged &&
              <Message success>Hasło zostało zmienione</Message>
              }
              {this.state.errorLenght &&
              <Message error>Hasło musi zawierać minimum 4 znaki.</Message>
              }
              {this.state.errorCheck &&
              <Message error>Stare hasło jest niepoprawne.</Message>
              }
              {this.state.errorOldPasswordCheck &&
              <Message error>Pola nowe hasło oraz wprowadź ponownie hasło nie zgadzają się</Message>
              }
              <Form>
                  <Form.Input label='Obecne hasło' placeholder="Obecne hasło" name="oldPassword" type='password' onChange={this.onChange} />
                  <Form.Input label='Nowe hasło' placeholder="Nowe hasło" name="newPassword" type='password' onChange={this.onChange}/>
                  <Form.Input label='Wropwadź ponownie nowe hasło' placeholder="Wropwadź ponownie nowe hasło" name="passwordCheck" type='password' onChange={this.onChange}/>

                  <Button onClick={this.submit} color="green">Zmień</Button>
              </Form>
          </div>
      )
  }
}

ChangePasswordPartial.propTypes = {
    changePassword: PropTypes.func.isRequired
}

export default connect(null, {changePassword})(ChangePasswordPartial);