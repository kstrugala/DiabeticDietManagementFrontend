import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { Container, Dropdown, Menu, Icon, Segment, Header } from "semantic-ui-react";
import * as actions from "../../actions/auth"
import MealPlanPartial from "../partials/MealPlanPartial";

class PatientPage extends React.Component {
    state = {
        showDiet: true, 
    }

    logoutClicked = ()=>{
        this.props.logout();
        this.props.history.push("/");
    }
    
    showDiet=()=>this.setState({showDiet:true});

    render() {
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
                        <Menu.Item as="a" onClick={this.showDiet}><Icon name='food' />Jadłospis</Menu.Item>
                        

                        <Menu.Menu position="right">
                            <Dropdown item simple text="Konto">
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={this.logoutClicked}>Wyloguj</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Menu>
                    </Container>
                </Menu>

                <Container style={{ marginTop: "4em", background: "rgb(255, 255, 255)", boxShadow: "rgb(204, 204, 204) 0px 1px 2px" }}>
                    {this.state.showDiet &&
                    <Segment>
                        <Header as='h3' dividing>Jadłospis</Header>
                        <MealPlanPartial patientId="null"/>
                    </Segment>
                    }
                </Container>
            </div>
        )
    }
}
PatientPage.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,  
    logout: PropTypes.func.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired

}

const mapStateToProps = state => {
    const props = {};
    if (typeof state.user.userData !== "undefined") {
        if (state.user.userData.role === "Patient") {
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
)(PatientPage);
