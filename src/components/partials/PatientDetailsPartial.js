import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { Form, Button, Icon, Divider, Message } from 'semantic-ui-react';
import { deletePatient } from "../../actions/patients"


class PatientDetailsPartial extends React.Component {
    state = {
        firstName:'',
        lastName:'',
        email:'', 
        patientDeleted:false
    }
    
    componentDidMount = () =>
    {
        this.getPatientData();
    }

    getPatientData = () => {
        const p = this.props.patients.find(x=>x.id === this.props.PatientId);
        this.setState({firstName:p.firstName, lastName:p.lastName, email:p.email});
    }

    deletePatient = () => {
        this.props.deletePatient(this.props.PatientId).then(()=>{
            this.setState({patientDeleted:true});
        })

    }

    render() {
        return (
            <div>
                {this.state.patientDeleted &&
                <Message info>Pacjent został usunięty</Message>
                }
                {!this.state.patientDeleted &&
                    <Form>
                        <Form.Input 
                            fluid label='Imię' 
                            name="firstname"
                            value={this.state.firstName}
                            
                        />
                        <Form.Input 
                            fluid label='Nazwisko' 
                            name="lastname"
                            value={this.state.lastName}
                        />
                        <Form.Input 
                            fluid label='E-mail' 
                            name="email"
                            value={this.state.email}
                        />
                    </Form>
                }
                {!this.state.patientDeleted &&    
                <Divider />
                }
                {!this.state.patientDeleted &&  
                <Button onClick={this.deletePatient} color="red" icon><Icon name="delete" /><span>Usuń</span></Button> 
                }
            </div>
        )
    }
}        


PatientDetailsPartial.propTypes = {
    patients: PropTypes.isRequired,
    deletePatient: PropTypes.func.isRequired,
    PatientId: PropTypes.string.isRequired
};

const mapStateToPros = (state) =>
{
    if(typeof(state.patient) !=='undefined')
        return  { patients: state.patient.patients.results, pagination:state.patient.patients.pagination };
    return  { patients: {} };  
}


export default connect(mapStateToPros, {deletePatient})(PatientDetailsPartial);
