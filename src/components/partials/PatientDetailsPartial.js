import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { Form, Button, Icon, Divider, Message } from 'semantic-ui-react';
import { updatePatient, deletePatient } from "../../actions/patients"


class PatientDetailsPartial extends React.Component {
    state = {
        id:'',
        firstName:'',
        lastName:'',
        email:'', 
        patientDeleted:false,
        updatePatient:false,
        patientUpdated:false,
        error:false
    }
    
    componentDidMount = () =>
    {
        this.getPatientData();
    }


    onFirstNameChange = (e) => {
        if(this.state.updatePatient)
        {
            this.setState({firstName: e.target.value});    
        }
    }

    onLastNameChange = (e) => {
        if(this.state.updatePatient)
        {
            this.setState({lastName: e.target.value});    
        }
    }

    onEmailChange = (e) => {
        if(this.state.updatePatient)
        {
            this.setState({email: e.target.value});    
        }
    }

    getPatientData = () => {
        const p = this.props.patients.find(x=>x.id === this.props.PatientId);
        this.setState({id: this.props.PatientId, firstName:p.firstName, lastName:p.lastName, email:p.email});
    }

    deletePatient = () => {
        this.props.deletePatient(this.props.PatientId).then(()=>{
            this.setState({patientDeleted:true});
        })

    }

    updatePatient = () =>{
        this.setState({updatePatient:true});
    }

    acceptUpdate = () =>{
        const patient = {id: this.state.id, firstname:this.state.firstName, lastname:this.state.lastName, email:this.state.email};
        this.props.updatePatient(patient)
            .then(()=>{
                this.setState({patientUpdated:true, error:false});
            }).catch(err=>{
                this.getPatientData();
                this.setState({error:true, patientUpdated:false});
            });
        this.setState({updatePatient:false});
    }

    cancelUpdate = () => {
        this.getPatientData();
        this.setState({updatePatient:false});
    }
   

    render() {
        return (
            <div>
                {this.state.patientDeleted &&
                <Message error>Pacjent został usunięty</Message>
                }
                {this.state.updatePatient &&
                <Message warning>Edytowanie pacjenta</Message>
                }
                {this.state.patientUpdated &&
                <Message success>Dane pacjenta zostały zaktualizowane</Message>
                }
                {this.state.error &&
                <Message error>Podczas aktualizacji wystąpił błąd. Spróbuj ponownie.</Message>
                }
                {!this.state.patientDeleted &&
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
                }
                {!this.state.patientDeleted &&    
                <Divider />
                }
                {!this.state.patientDeleted && !this.state.updatePatient &&
                <div>
                    
                    <Button onClick={this.updatePatient} color="orange" icon><Icon name="refresh" /><span>Edytuj</span></Button>  
                    <Button onClick={this.deletePatient} color="red" icon><Icon name="delete" /><span>Usuń</span></Button> 
                </div>
                }
                {this.state.updatePatient && 
                    <div>
                        <Button onClick={this.acceptUpdate} color="green" icon><Icon name="save" /><span>Zatwierdź</span></Button>
                        <Button onClick={this.cancelUpdate} color="red">Anuluj</Button> 
                    </div>   
                }

            </div>
        )
    }
}        


PatientDetailsPartial.propTypes = {
    patients: PropTypes.isRequired,
    deletePatient: PropTypes.func.isRequired,
    updatePatient: PropTypes.func.isRequired,
    PatientId: PropTypes.string.isRequired
};

const mapStateToPros = (state) =>
{
    if(typeof(state.patient) !=='undefined')
        return  { patients: state.patient.patients.results, pagination:state.patient.patients.pagination };
    return  { patients: {} };  
}


export default connect(mapStateToPros, {deletePatient, updatePatient})(PatientDetailsPartial);
