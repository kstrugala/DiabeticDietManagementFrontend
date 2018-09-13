import React from 'react'
import { Header, Segment, Menu, Input, Icon } from 'semantic-ui-react';
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getPatientsInfo } from "../../actions/patients"

class PatientsPartial extends React.Component {
    search = (e) =>
    {
        const query = {page:1, pageSize:100, lastName:e.target.value }
        this.props.getPatientsInfo(query);
    }
    render() {
        return (
            <Segment>
                <Header as='h3' dividing>Pacjenci</Header>

                <Menu pointing >
                    <Menu.Item as="a" active><Icon name="users" />Przeglądaj pacjentów</Menu.Item>
                    <Menu.Item as="a"><Icon name="plus" />Dodaj pacjenta</Menu.Item>
                    <Menu.Item as="a"><Icon name="user outline" />Aktualizuj dane pacjenta</Menu.Item>

                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Input icon='search' onChange={this.search} placeholder='Szukaj...' />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>

                <Segment>
                    {typeof(this.props.patients)!=="undefined" ? this.props.patients.map(p=><div>{p.id}: {p.firstName} {p.lastName}</div>):null}
                </Segment>
            </Segment>

        )
    }
}

PatientsPartial.propTypes = {
    patients: PropTypes.isRequired,
    getPatientsInfo: PropTypes.func.isRequired
}

const mapStateToPros = (state) =>
{
    if(typeof(state.patient) !=='undefined')
        return  { patients: state.patient.patients.results, pagination:state.patient.patients.pagination };
    return  { patients: {} };  
}


export default connect(mapStateToPros, {getPatientsInfo})(PatientsPartial);