import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { Form, Button, Icon, Divider, Message } from 'semantic-ui-react';
import { updateDoctor } from "../../actions/doctors"


class DoctorDetailsPartial extends React.Component {
    state = {
        id:'',
        firstName:'',
        lastName:'',
        email:'', 
        updateDoctor:false,
        doctorUpdated:false,
        error:false
    }
    
    componentDidMount = () =>
    {
        this.getDoctorData();
    }


    onFirstNameChange = (e) => {
        if(this.state.updateDoctor)
        {
            this.setState({firstName: e.target.value});    
        }
    }

    onLastNameChange = (e) => {
        if(this.state.updateDoctor)
        {
            this.setState({lastName: e.target.value});    
        }
    }

    onEmailChange = (e) => {
        if(this.state.updateDoctor)
        {
            this.setState({email: e.target.value});    
        }
    }

    getDoctorData = () => {
        const p = this.props.doctors.find(x=>x.id === this.props.DoctorId);
        this.setState({id: this.props.DoctorId, firstName:p.firstName, lastName:p.lastName, email:p.email});
    }

   
    updateDoctor = () =>{
        this.setState({updateDoctor:true});
    }

    acceptUpdate = () =>{
        const doctor = {id: this.state.id, firstname:this.state.firstName, lastname:this.state.lastName, email:this.state.email};
        this.props.updateDoctor(doctor)
            .then(()=>{
                this.setState({doctorUpdated:true, error:false});
            }).catch(err=>{ // eslint-disable-line
                this.getDoctorData();
                this.setState({error:true, doctorUpdated:false});
            });
        this.setState({updateDoctor:false});
    }

    cancelUpdate = () => {
        this.getDoctorData();
        this.setState({updateDoctor:false});
    }
   

    render() {
        return (
            <div>
                {this.state.updateDoctor &&
                <Message warning>Edytowanie lekarza</Message>
                }
                {this.state.doctorUpdated &&
                <Message success>Dane lekarza zostały zaktualizowane</Message>
                }
                {this.state.error &&
                <Message error>Podczas aktualizacji wystąpił błąd. Spróbuj ponownie.</Message>
                }
                <Form>
                    <Form.Input 
                        fluid label='Imię' 
                        name="firstname"
                        value={this.state.firstName}
                        onChange={this.onFirstNameChange}
                            
                    />
                    <Form.Input 
                        fluid label='Nazwisko' 
                        name="lastname"
                        value={this.state.lastName}
                        onChange={this.onLastNameChange}
                    />
                    <Form.Input 
                        fluid label='E-mail' 
                        name="email"
                        value={this.state.email}
                        onChange={this.onEmailChange}
                    />
                </Form>
                
                <Divider />
                {!this.state.updateDoctor &&
                <div>
                    <Button onClick={this.updateDoctor} color="orange" icon><Icon name="refresh" /><span>Edytuj</span></Button>  
                </div>
                }
                
                {this.state.updateDoctor && 
                    <div>
                        <Button onClick={this.acceptUpdate} color="green" icon><Icon name="save" /><span>Zatwierdź</span></Button>
                        <Button onClick={this.cancelUpdate} color="red">Anuluj</Button> 
                    </div>   
                }

            </div>
        )
    }
}        


DoctorDetailsPartial.propTypes = {
    doctors: PropTypes.isRequired,
    updateDoctor: PropTypes.func.isRequired,
    DoctorId: PropTypes.string.isRequired
};

const mapStateToPros = (state) =>
{
    if(typeof(state.doctor) !=='undefined')
        return  { doctors: state.doctor.doctors.results, pagination:state.doctor.doctors.pagination };
    return  { doctors: {} };  
}


export default connect(mapStateToPros, {updateDoctor})(DoctorDetailsPartial);
