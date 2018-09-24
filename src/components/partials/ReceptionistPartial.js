import React from 'react'
import { Header, Segment, Menu, Input, Icon, Table, Loader, Dimmer, Message, Button } from 'semantic-ui-react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import PaginationPartial from "./Pagination"
import { getReceptionistsInfo, addReceptionist } from "../../actions/receptionists"
import AddReceptionistForm from '../forms/AddReceptionistForm'
import ReceptionistDetailsPartial from './ReceptionistDetailsPartial'

class ReceptionistPartial extends React.Component {

    state = {
        queryLastName:"",
        queryPage:1,
        queryPageSize:10,
        loading: false,
        activeElement:"displayReceptionists",
        receptionistId:"",
        messageReceptionistAdded:false,
        errors:{}
    }

    componentDidMount()
    {
        this.fetchReceptionists();
    }

    onSearchChange = (e) =>
    {
        clearTimeout(this.timer);
        this.setState({queryLastName:e.target.value, messagePatientDeleted:false})
        this.timer = setTimeout(this.fetchReceptionists, 1000);
    }

    onPageChange = (e, { activePage })=>{
        this.setState({queryPage: activePage}, ()=>{this.fetchReceptionists();});
    };

    
    setPageSize = (e) => {
        this.setState({queryPageSize:parseInt(e.target.innerHTML, 10)}, ()=>{this.fetchReceptionists();});
        
    };

    fetchReceptionists = () =>
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
        


        this.props.getReceptionistsInfo(query).then(()=>{this.setState({loading:false})});
    }

    isEmpty = (obj) => { // eslint-disable-next-line
        for(const key in obj) { 
            if(obj.hasOwnProperty(key)) // eslint-disable-line
                return false;
        }
        return true;
    }


    showReceptionists = () =>
    {
        this.fetchReceptionists();
        this.setState({activeElement:"displayReceptionists", messageReceptionistAdded:false});
    }

    addReceptionist = () =>
    {
        this.setState({activeElement:"addReceptionist"});
    }

    addReceptionistSubmit = (receptionist) =>
    {
        this.setState({errors:{}});
        this.props.addReceptionist(receptionist).then(()=>{
            this.setState({messageReceptionistAdded:true});
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
    
    receptionistDetails = (id) =>
    {
        this.setState({activeElement:"receptionistDetails", receptionistId:id});
    }

    render() {
        return (
            <Segment>
                <Header as='h3' dividing>Rejstratorzy</Header>

                <Menu pointing >
                    <Menu.Item as="a" active={this.state.activeElement==="displayReceptionists"} onClick={this.showReceptionists}><Icon name="users" />Przeglądaj rejstratorów</Menu.Item>
                    <Menu.Item as="a" active={this.state.activeElement==="addReceptionist"} onClick={this.addReceptionist}><Icon name="plus" />Dodaj rejestratora</Menu.Item>
                    {this.state.activeElement==="receptionistDetails"  &&
                    <Menu.Item as="a" active={this.state.activeElement==="receptionistDetails"}><Icon name="user outline" />Szczegóły rejstratora</Menu.Item>
                    }
                    {this.state.activeElement==="displayReceptionists" &&
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Input icon='search' onChange={this.onSearchChange} value={this.state.queryLastName} placeholder='Szukaj...' />
                        </Menu.Item>
                    </Menu.Menu>
                    }
                </Menu>


                {this.state.activeElement==="displayReceptionists" &&
                <Segment className="displayReceptionists">
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
                                <Table.HeaderCell>
                                    
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>

                            {typeof(this.props.receptionists)!=="undefined" && !this.isEmpty(this.props.receptionists) ? 
                                this.props.receptionists.map(p=>
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
                                                                            
                                            <Button onClick={()=>{this.receptionistDetails(p.id)}} color="green" icon><Icon name="book" /> <span>Szczegóły</span></Button>
                                            
                                                 
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
                                    {!this.isEmpty(this.props.receptionists) &&
                                    <PaginationPartial pagination={this.props.pagination} onPageChange={this.onPageChange} />
                                    }
                                </Table.HeaderCell>
                            </Table.Row>
                        </Table.Footer>
                    </Table>
                </Segment>
                }
                {this.state.activeElement==="addReceptionist" &&
                    <Segment className="addReceptionist">
                        {this.state.messageReceptionistAdded && 
                            <Message info>
                                Rejstrator został dodany.
                            </Message>
                        }
                        {!this.isEmpty(this.state.errors) &&
                        <Message error>
                            {this.state.errors.emailInUse}
                            {this.state.errors.invalidUsername}
                        </Message>
                        }

                        <AddReceptionistForm submit={this.addReceptionistSubmit}/>

                    </Segment>
                }
                {this.state.activeElement==="receptionistDetails" &&
                <Segment>
                    <ReceptionistDetailsPartial ReceptionistId={this.state.receptionistId} />
                </Segment>
                }
            </Segment>

        )
    }
}

ReceptionistPartial.propTypes = {
    receptionists: PropTypes.isRequired,
    addReceptionist:PropTypes.func.isRequired,
    getReceptionistsInfo: PropTypes.func.isRequired,
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
    if(typeof(state.receptionist) !=='undefined' && !isEmpty(state.receptionist))
        return  { receptionists: state.receptionist.receptionists.results, pagination:state.receptionist.receptionists.pagination };
    return  { receptionists: {} };  
}


export default connect(mapStateToPros, {getReceptionistsInfo, addReceptionist})(ReceptionistPartial);