import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { Container, Dropdown, Menu, Icon, Header, Segment } from "semantic-ui-react";
import * as actions from "../../actions/auth"

import PatientsPartial from "../partials/PatientsPartial";
import DoctorsPartial from "../partials/DoctorsPartial";
import ReceptionistPartial from "../partials/ReceptionistPartial";
import ChangePasswordPartial from "../partials/ChangePasswordPartial"

class AdminPage extends React.Component {
 
    state = {
        showPatients: true, 
        showDoctors: false,
        showReceptionists:false,
        showChangePassword: false

    }

    logoutClicked = ()=>{
        this.props.logout();
        this.props.history.push("/");
    }

    showPatientClicked = () =>{
        this.setState({
            showPatients: true, 
            showDoctors: false,
            showReceptionists:false,
            showChangePassword: false
        });
    }

    showChangePassword=()=>this.setState(
        {
            showPatients: false, 
            showDoctors: false,
            showReceptionists:false,
            showChangePassword: true
        });

    showDoctorsClicked = () =>{
        this.setState({
            showPatients: false, 
            showDoctors: true,
            showReceptionists:false,
            showChangePassword: false
        });
    }

    showReceptionistsClicked = () =>{
        this.setState({
            showPatients: false, 
            showDoctors: false,
            showReceptionists:true,
            showChangePassword: false
        });
    }

    render() {
        const { showPatients, showDoctors, showReceptionists } = this.state;
        const { logoutClicked } = this;
        
        if (!this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <Menu fixed="top">
                    <Container>
                        <Menu.Item as="a" header>
              Diabetic Diet Management
                        </Menu.Item>
                        <Menu.Item as="a" onClick={this.showPatientClicked}><Icon name='users' />Pacjenci</Menu.Item>
                        <Menu.Item as="a" onClick={this.showReceptionistsClicked}><Icon name='user' />Rejstratorzy</Menu.Item>
                        <Menu.Item as="a" onClick={this.showDoctorsClicked}><Icon name='doctor' />Lekarze</Menu.Item>

                        <Menu.Menu position="right">
                            <Dropdown item simple text="Konto">
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={this.showChangePassword}>Zmiana hasła</Dropdown.Item>
                                    <Dropdown.Item onClick={logoutClicked}>Wyloguj</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Menu>
                    </Container>
                </Menu>

                <Container style={{ marginTop: "4em", background: "rgb(255, 255, 255)", boxShadow: "rgb(204, 204, 204) 0px 1px 2px" }}>
                    {showPatients ? <PatientsPartial userRole="admin" /> : null}
                    {showDoctors ? <DoctorsPartial /> : null}
                    {showReceptionists ? <ReceptionistPartial /> : null}
                    {this.state.showChangePassword &&
                        <Segment>
                            <Header as='h3' dividing>Zmiana hasła</Header>
                            <ChangePasswordPartial />
                        </Segment>
                    }
                </Container>
            </div>
        );
    }
}

AdminPage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,  
    logout: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

const mapStateToProps = state => {
    const props = {};
    if (typeof state.user.userData !== "undefined") {
        if (state.user.userData.role === "admin") {
            props.isAuthenticated = true;
        }
    } else {
        props.isAuthenticated = false;
    }
    return props;
};

export default connect(
    mapStateToProps,
    { logout: actions.logout }
)(AdminPage);
