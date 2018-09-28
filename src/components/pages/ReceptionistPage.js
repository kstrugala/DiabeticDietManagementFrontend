import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { Container, Dropdown, Menu, Icon } from "semantic-ui-react";
import * as actions from "../../actions/auth"

import PatientsPartial from "../partials/PatientsPartial";

class ReceptionistPage extends React.Component {
 
    state = {
        showPatients: true
    }

    logoutClicked = ()=>{
        this.props.logout();
        this.props.history.push("/");
    }

    showPatientClicked = () =>{
        this.setState({
            showPatients: true, 
            showDoctors: false,
            showReceptionists:false
        });
    }

    

    render() {
        const { showPatients } = this.state;
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
                        

                        <Menu.Menu position="right">
                            <Dropdown item simple text="Konto">
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={logoutClicked}>Wyloguj</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Menu>
                    </Container>
                </Menu>

                <Container style={{ marginTop: "4em", background: "rgb(255, 255, 255)", boxShadow: "rgb(204, 204, 204) 0px 1px 2px" }}>
                    {showPatients ? <PatientsPartial userRole="receptionist" /> : null}
                </Container>
            </div>
        );
    }
}

ReceptionistPage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,  
    logout: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired
};

const mapStateToProps = state => {
    const props = {};
    if (typeof state.user.userData !== "undefined") {
        if (state.user.userData.role === "Receptionist") {
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
)(ReceptionistPage);
