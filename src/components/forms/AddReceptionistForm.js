import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import Validator from 'validator'
import PropTypes from 'prop-types'


class AddReceptionistForm extends React.Component {
    
    state = {
        data: {
            firstname:'',
            lastname:'',
            username:'',
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
        if(Object.keys(errors).length === 0)
        {
            this.setState({loading:true});
            this.props.submit(this.state.data);
        }
    }
     
    validate = data =>
    {
        const errors = {}
        if(!Validator.isEmail(data.email)) errors.email = "Wrong email";
        if(!data.firstname) errors.firstname = "First name can't be blank.";
        if(!data.lastname) errors.lastname = "Last name can't be blank.";
        if(!data.username) errors.username = "Username can't be blank.";
        if(!Validator.isLength(data.password, {min: 4, max:undefined})) errors.password = "Password can't be blank (has to contain at least 4 charactrers).";
        return errors;
    }

    render() {
        const {errors} = this.state;
        return (
            <div>
                <Form>
                    <Form.Input 
                        fluid label='Imię' 
                        placeholder={errors.firstname ? "Pole imię nie może być puste" : "Imię"} 
                        name="firstname"
                        error={errors.firstname}
                        onChange={this.onChange}
                    />
                    <Form.Input 
                        fluid label='Nazwisko' 
                        placeholder={errors.firstname ? "Pole nazwisko nie może być puste" : "Nazwisko"}  
                        name="lastname"
                        error={errors.lastname}
                        onChange={this.onChange}
                    />
                    <Form.Input 
                        fluid label='Adres e-mail' 
                        placeholder={errors.firstname ? "Podaj prawidłowy adres email" : "Adres e-mail"}  
                        name="email"
                        error={errors.email}
                        onChange={this.onChange}
                    />
                    <Form.Input 
                        fluid label='Nazwa użytkownika' 
                        placeholder={errors.username ? "Nazwa użytkownika nie może być pusta" : "Nazwa użytkownika"}  
                        name="username"
                        error={errors.username}
                        onChange={this.onChange}
                    />
                    <Form.Input 
                        fluid label={errors.password ? "Hasło musi zawierać minimum 4 znaki" : "Hasło"}
                        placeholder={errors.password ? "Hasło musi zawierać minimum 4 znaki" : "Hasło"}
                        type='password' 
                        name="password"
                        error={errors.password}
                        onChange={this.onChange}
                    />
                    <Button color='green' fluid size='large' onClick={this.onSubmit}> 
                                Zarejestruj
                    </Button>

                </Form>
            </div>
        );
    }
};

AddReceptionistForm.propTypes = {
    submit: PropTypes.func.isRequired
};

export default AddReceptionistForm;