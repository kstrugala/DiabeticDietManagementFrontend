import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import PropTypes from "prop-types";
import { Container, Dropdown, Header, Menu } from "semantic-ui-react";
import * as actions from "../../actions/auth"

class AdminPage extends React.Component {
 
    logoutClicked = ()=>{
        this.props.logout();
        this.props.history.push("/");
    }

    render() {
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
                        <Menu.Item as="a">Home</Menu.Item>

                        <Menu.Menu position="right">
                            <Dropdown item simple text="Konto">
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={logoutClicked}>Wyloguj</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Menu>
                    </Container>
                </Menu>

                <Container text style={{ marginTop: "7em" }}>
                    <Header as="h1">Admin Page !!!</Header>
                    <p>
            This is a basic fixed menu template using fixed size containers.
                    </p>
                    <p>
            A text container is used for the main container, which is useful for
            single column layouts.
                    </p>
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
