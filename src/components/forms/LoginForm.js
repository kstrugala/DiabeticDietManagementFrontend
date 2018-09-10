import React from 'react'
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'
import Validator from 'validator'

class LoginForm extends React.Component {
    
    state = {
        data: {
            email:'',
            password:''
        },
        loading: false,
        errors: {}
    }
    
    onChange = e => 
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        });

    onSubmit = () => {
        // Validate data
        const errors = this.validate(this.state.data);
        this.setState({ errors });
    }
     
    validate = data =>
    {
        const errors = {}
        if(!Validator.isEmail(data.email)) errors.email = "Wrong email";
        if(!data.password) errors.password = "Password can't be blank.";
        
        return errors;
    }

    render() {
        const { data, errors } = this.state;

        return (
            <div className='login-form'>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            Zaloguj się
                        </Header>
                        <Form size='large' onSubmit={this.onSubmit}>
                            <Segment stacked>
                                <Form.Input 
                                    fluid icon='user'
                                    type="email"
                                    name="email"
                                    id="email"
                                    iconPosition='left'
                                    placeholder='Adres e-mail'
                                    value={data.email} 
                                    onChange={this.onChange}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Hasło'
                                    type='password'
                                    name="password"
                                    id="password"
                                    onChange={this.onChange}
                                />

                                <Button color='teal' fluid size='large'>
                                Zaloguj
                                </Button>
                            </Segment>
                        </Form>
                        {errors.email && 
                        <Message negative>
                            <Message.Header>Nieprawidłowy adres email</Message.Header>
                            <p>Podaj prawidłowy adres e-mail <br /> (przykładowy adres example@example.com)</p>
                        </Message>
                        }
                        {errors.password &&
                        <Message negative>
                            <Message.Header>Nieprawidłowe hasło</Message.Header>
                            <p>Hasło nie może być puste</p>
                        </Message>
                        }
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
};



export default LoginForm;