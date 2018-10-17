import React from 'react'
import { Header, Segment, Menu, Input, Icon, Table, Loader, Dimmer, Message, Button, Divider } from 'semantic-ui-react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import axios from 'axios';
import { getPatientsInfo, addPatient, deletePatient } from "../../actions/patients"
import PaginationPartial from "./Pagination"
import PatientDetailsPartial from "./PatientDetailsPartial"
import AddPatientForm from '../forms/AddPatientForm'
import MealPlanPartial from './MealPlanPartial'
import MealPlanEditorPartial from './MealPlanEditorPartial'
import DietaryCompliancePartial from "../partials/DietaryCompliancePartial"


class PatientsPartial extends React.Component {

    state = {
        queryLastName:"",
        queryPage:1,
        queryPageSize:10,
        loading: false,
        activeElement:"displayPatients",
        patientId:"",
        messagePatientAdded:false,
        errors:{}
    }
    
    componentDidMount()
    {
        this.fetchPatients();
    }

    onSearchChange = (e) =>
    {
        clearTimeout(this.timer);
        this.setState({queryLastName:e.target.value, messagePatientDeleted:false})
        this.timer = setTimeout(this.fetchPatients, 1000);
    }

    onPageChange = (e, { activePage })=>{
        this.setState({queryPage: activePage}, ()=>{this.fetchPatients();});
    };

    
    setPageSize = (e) => {
        this.setState({queryPageSize:parseInt(e.target.innerHTML, 10)}, ()=>{this.fetchPatients();});
        
    };

    fetchPatients = () =>
    {
        let query;
        if(!this.state.queryLastName)
        {
            query = { page:this.state.queryPage, pageSize:this.state.queryPageSize};
        }
        else
        {
            query = {lastName:this.state.queryLastName, page:this.state.queryPage, pageSize:this.state.queryPageSize};
        }
        this.setState({loading: true})
        


        this.props.getPatientsInfo(query).then(()=>{this.setState({loading:false})}).catch(err=>{
            if(err.response.status === 401 || err.response.status === 403)
            {
                axios.defaults.headers.common.Authorization = `Bearer ${  localStorage.getItem('tokenJWT')}`;
                this.fetchPatients();
            }
        });
    }

    isEmpty = (obj) => { // eslint-disable-next-line
        for(const key in obj) { 
            if(obj.hasOwnProperty(key)) // eslint-disable-line
                return false;
        }
        return true;
    }


    showPatients = () =>
    {
        this.fetchPatients();
        this.setState({activeElement:"displayPatients", messagePatientAdded:false});
    }

    addPatient = () =>
    {
        this.setState({activeElement:"addPatient"});
    }

    addPatientSubmit = (patient) =>
    {
        this.setState({errors:{}});
        this.props.addPatient(patient).then(()=>{
            this.setState({messagePatientAdded:true});
        }).catch(err=>{
            switch(err.response.data.code)
            {
            case 'email_in_use':
                this.setState({errors:{emailInUse:"Adres email jest już zajęty"}});
                break;
            case 'invalid_username':
                this.setState({errors:{invalidUsername:"Nieprawidłowa (lub zajęta) nazwa użytkownika"}});   
                break; 
            default:
                            
            }
        });
    }
    
    patientDetails = (id) =>
    {
        this.setState({activeElement:"patientDetails", patientId:id});
    }

    showMealPlan = () =>
    {
        this.setState({activeElement:"mealPlan"});
    }    

    showMealPlanEditor = () =>
    {
        this.setState({activeElement:"mealPlanEditor"});
    }

    showDietaryCompliance = () =>
    {
        this.setState({activeElement:"dietaryComplinace"});
    }

    render() {
        return (
            <Segment>
                <Header as='h3' dividing>Pacjenci</Header>

                <Menu pointing >
                    <Menu.Item as="a" active={this.state.activeElement==="displayPatients"} onClick={this.showPatients}><Icon name="users" />Przeglądaj pacjentów</Menu.Item>
                    
                    {(this.props.userRole === "admin" || this.props.userRole === "receptionist") &&
                    <Menu.Item as="a" active={this.state.activeElement==="addPatient"} onClick={this.addPatient}><Icon name="plus" />Dodaj pacjenta</Menu.Item>
                    }
                    {this.state.activeElement==="patientDetails"  &&
                    <Menu.Item as="a" active={this.state.activeElement==="patientDetails"}><Icon name="user outline" />Szczegóły pacjenta</Menu.Item>
                    }
                    {this.state.activeElement==="mealPlan"  &&
                    <Menu.Item as="a" active={this.state.activeElement==="patientDetails"}><Icon name="user outline" />Szczegóły pacjenta</Menu.Item>
                    }
                    {this.state.activeElement==="mealPlanEditor"  &&
                    <Menu.Item as="a" active={this.state.activeElement==="patientDetails"}><Icon name="user outline" />Szczegóły pacjenta</Menu.Item>
                    }
                    {this.state.activeElement==="mealPlan"  &&
                    <div>
                        <Menu.Item as="a" active={this.state.activeElement==="mealPlan"}><Icon name="clipboard list" />Jadłospis</Menu.Item>
                    </div>
                    }
                    {this.state.activeElement==="mealPlanEditor"  &&
                    <div>
                        <Menu.Item as="a" active={this.state.activeElement==="mealPlan"}><Icon name="clipboard list" />Edytor jadłospisu</Menu.Item>
                    </div>
                    }
                    {this.state.activeElement==="displayPatients" &&
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Input icon='search' onChange={this.onSearchChange} value={this.state.queryLastName} placeholder='Szukaj...' />
                        </Menu.Item>
                    </Menu.Menu>
                    }
                </Menu>


                {this.state.activeElement==="displayPatients" &&
                <Segment className="displayPatients">
                    {this.state.loading &&
                    <Dimmer active inverted>
                        <Loader size='large'>Pobieranie danych...</Loader>
                    </Dimmer>
                    }
                    
                    {this.state.messagePatientDeleted &&
                    <Message info>
                        Pacjent został usunięty.
                    </Message>
                    }
                    <Table  celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Imię</Table.HeaderCell>
                                <Table.HeaderCell>Nazwisko</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell>
                                    
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>

                            {typeof(this.props.patients)!=="undefined" && !this.isEmpty(this.props.patients) ? 
                                this.props.patients.map(p=>
                                    <Table.Row key={p.id}>
                                        <Table.Cell>
                                            {p.firstName}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {p.lastName}
                                        </Table.Cell>
                                        <Table.Cell>
                                            {p.email}
                                        </Table.Cell>
                                        <Table.Cell textAlign='center'>
                                                                            
                                            <Button onClick={()=>{this.patientDetails(p.id)}} color="green" icon><Icon name="book" /> <span>Szczegóły</span></Button>
                                            
                                                 
                                        </Table.Cell>
                                    </Table.Row>) 
                                :null}
                            
                    
                        </Table.Body>
                        <Table.Footer>
                            <Table.Row>
                                <Table.HeaderCell colSpan='4'>
                                    <Menu compact>
                                        <Menu.Item active={this.state.queryPageSize===10} onClick={this.setPageSize}>10</Menu.Item>
                                        <Menu.Item active={this.state.queryPageSize===30} onClick={this.setPageSize}>30</Menu.Item>
                                        <Menu.Item active={this.state.queryPageSize===50} onClick={this.setPageSize}>50</Menu.Item>
                                    </Menu>
                                    {!this.isEmpty(this.props.patients) &&
                                    <PaginationPartial pagination={this.props.pagination} onPageChange={this.onPageChange} />
                                    }
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </Segment>
                }
                {this.state.activeElement==="addPatient" &&
                    <Segment className="addPatient">
                        {this.state.messagePatientAdded && 
                            <Message info>
                                Pacjent został dodany.
                            </Message>
                        }
                        {!this.isEmpty(this.state.errors) &&
                        <Message error>
                            {this.state.errors.emailInUse}
                            {this.state.errors.invalidUsername}
                        </Message>
                        }
                        <AddPatientForm submit={this.addPatientSubmit}/>
                    </Segment>
                }
                {this.state.activeElement==="patientDetails" &&
                <Segment>
                    <PatientDetailsPartial userRole={this.props.userRole} PatientId={this.state.patientId} />
                    {this.props.userRole === "doctor" &&
                    <div>
                        <Button onClick={this.showMealPlan} color="blue" icon><Icon name="clipboard list" /><span>Jadłospis</span></Button>
                        <Button onClick={this.showMealPlanEditor} color="teal" icon><Icon name="clipboard check" /><span>Edytuj jadłospis</span></Button>
                        <Button onClick={this.showDietaryCompliance} color="violet" icon><Icon name="check square outline" /><span>Przestrzeganie diety</span></Button>

                    </div>
                    }

                </Segment>
                }

                {this.state.activeElement==="mealPlan" &&
                <Segment>
                    <Header as='h4' dividing>Jadłospis</Header>
                    
                    <MealPlanPartial patientId={this.state.patientId}/>

                    <Divider />
                    <Button onClick={()=>{this.patientDetails(this.state.patientId)}} color="teal" icon><Icon name="backward" /><span>Powrót</span></Button>
                </Segment>
                }

                {this.state.activeElement==="mealPlanEditor" &&
                <Segment>
                    <Header as='h4' dividing>Edytor jadłospisu</Header>
                    
                    <MealPlanEditorPartial patientId={this.state.patientId}/>

                    <Divider />
                    <Button onClick={()=>{this.patientDetails(this.state.patientId)}} color="red" icon><Icon name="cancel" /><span>Anuluj</span></Button>

                </Segment>
                }

                {this.state.activeElement==="dietaryComplinace" &&
                <DietaryCompliancePartial userRole="other" patientId={this.state.patientId} />
                }


            </Segment>

        )
    }
}

PatientsPartial.propTypes = {
    userRole: PropTypes.string.isRequired,
    patients: PropTypes.isRequired,
    addPatient:PropTypes.func.isRequired,
    getPatientsInfo: PropTypes.func.isRequired,
    pagination:PropTypes.shape({
        currentPage: PropTypes.number.isRequired,
        totalPages: PropTypes.number.isRequired,
        pageSize: PropTypes.number.isRequired,
        totalCount: PropTypes.number.isRequired,
        hasPrevious: PropTypes.bool.isRequired,
        hasNext: PropTypes.bool.isRequired
    }).isRequired
}

const isEmpty = (obj) => { // eslint-disable-next-line
    for(const key in obj) { 
        if(obj.hasOwnProperty(key)) // eslint-disable-line
            return false;
    }
    return true;
}

const mapStateToPros = (state) =>
{
    if(typeof(state.patient) !=='undefined' && !isEmpty(state.patient))
        return  { patients: state.patient.patients.results, pagination:state.patient.patients.pagination };
    return  { patients: {} };  
}


export default connect(mapStateToPros, {getPatientsInfo, addPatient, deletePatient })(PatientsPartial);