import React from 'react'
import { Header, Segment, Menu, Input, Icon, Table, Loader, Dimmer, Message } from 'semantic-ui-react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPatientsInfo, addPatient } from "../../actions/patients"
import PaginationPartial from "./Pagination"
import AddPatientForm from '../forms/AddPatientForm';


class PatientsPartial extends React.Component {

    state = {
        queryLastName:"",
        queryPage:1,
        queryPageSize:10,
        loading: false,
        activeElement:"displayPatients",
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
        this.setState({queryLastName:e.target.value})
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
        


        this.props.getPatientsInfo(query).then(()=>{this.setState({loading:false})});
    }

    isEmpty = (obj) => { // eslint-disable-next-line
        for(const key in obj) { 
            if(obj.hasOwnProperty(key)) // eslint-disable- line
                return false;
        }
        return true;
    }

    showPatients = () =>
    {
        if(this.state.messagePatientAdded)
        {
            this.fetchPatients();
        }
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
            switch(err.response.data.code){
                case 'email_in_use':
                    this.setState({errors:{emailInUse:"Adres email jest już zajęty"}});
                    break;
                case 'invalid_username':
                    this.setState({errors:{invalidUsername:"Nieprawidłowa (lub zajęta) nazwa użytkownika"}});   
                    break; 
                default:
                    return;
            }
        });
    }

    render() {
        return (
            <Segment>
                <Header as='h3' dividing>Pacjenci</Header>

                <Menu pointing >
                    <Menu.Item as="a" active={this.state.activeElement==="displayPatients"} onClick={this.showPatients}><Icon name="users" />Przeglądaj pacjentów</Menu.Item>
                    <Menu.Item as="a" active={this.state.activeElement==="addPatient"} onClick={this.addPatient}><Icon name="plus" />Dodaj pacjenta</Menu.Item>
                    <Menu.Item as="a"><Icon name="user outline" />Aktualizuj dane pacjenta</Menu.Item>

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
                    

                    <Table  celled>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Imię</Table.HeaderCell>
                                <Table.HeaderCell>Nazwisko</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                                <Table.HeaderCell>Szczegóły</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>

                            {typeof(this.props.patients)!=="undefined" ? 
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
                                        <Table.Cell>
                                            {p.id}
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
            </Segment>

        )
    }
}

PatientsPartial.propTypes = {
    patients: PropTypes.isRequired,
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

const mapStateToPros = (state) =>
{
    if(typeof(state.patient) !=='undefined')
        return  { patients: state.patient.patients.results, pagination:state.patient.patients.pagination };
    return  { patients: {} };  
}


export default connect(mapStateToPros, {getPatientsInfo, addPatient })(PatientsPartial);