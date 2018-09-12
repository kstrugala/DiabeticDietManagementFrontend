import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import PropTypes from "prop-types";

import { Container, Dropdown, Header, Menu } from "semantic-ui-react";

class AdminPage extends React.Component {
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
                        <Menu.Item as="a">Home</Menu.Item>

                        <Menu.Menu position="right">
                            <Dropdown item simple text="Dropdown">
                                <Dropdown.Menu>
                                    <Dropdown.Item>List Item</Dropdown.Item>
                                    <Dropdown.Item>List Item</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Header>Header Item</Dropdown.Header>
                                    <Dropdown.Item>
                                        <i className="dropdown icon" />
                                        <span className="text">Submenu</span>
                                        <Dropdown.Menu>
                                            <Dropdown.Item>List Item</Dropdown.Item>
                                            <Dropdown.Item>List Item</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown.Item>
                                    <Dropdown.Item>List Item</Dropdown.Item>
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
    isAuthenticated: PropTypes.bool.isRequired
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
    {}
)(AdminPage);
