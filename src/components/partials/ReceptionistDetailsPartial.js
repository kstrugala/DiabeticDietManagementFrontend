import React from 'react'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import { Form, Button, Icon, Divider, Message } from 'semantic-ui-react';
import { updateReceptionist } from "../../actions/receptionists"


class ReceptionistDetailsPartial extends React.Component {
    state = {
        id:'',
        firstName:'',
        lastName:'',
        email:'', 
        updateReceptionist:false,
        receptionistUpdated:false,
        error:false
    }
    
    componentDidMount = () =>
    {
        this.getReceptionistData();
    }


    onFirstNameChange = (e) => {
        if(this.state.updateReceptionist)
        {
            this.setState({firstName: e.target.value});    
        }
    }

    onLastNameChange = (e) => {
        if(this.state.updateReceptionist)
        {
            this.setState({lastName: e.target.value});    
        }
    }

    onEmailChange = (e) => {
        if(this.state.updateReceptionist)
        {
            this.setState({email: e.target.value});    
        }
    }

    getReceptionistData = () => {
        console.log(this.props.ReceptionistId);
        const p = this.props.receptionists.find(x=>x.id === this.props.ReceptionistId);
        this.setState({id: this.props.ReceptionistId, firstName:p.firstName, lastName:p.lastName, email:p.email});
    }

   
    updateReceptionist = () =>{
        this.setState({updateReceptionist:true});
    }

    acceptUpdate = () =>{
        const receptionist = {id: this.state.id, firstname:this.state.firstName, lastname:this.state.lastName, email:this.state.email};
        this.props.updateReceptionist(receptionist)
            .then(()=>{
                this.setState({receptionistUpdated:true, error:false});
            }).catch(err=>{ // eslint-disable-line
                this.getReceptionistData();
                this.setState({error:true, receptionistUpdated:false});
            });
        this.setState({updateReceptionist:false});
    }

    cancelUpdate = () => {
        this.getReceptionistData();
        this.setState({updateReceptionist:false});
    }
   

    render() {
        return (
            <div>
                {this.state.updateReceptionist &&
                <Message warning>Edytowanie rejstratora</Message>
                }
                {this.state.receptionistUpdated &&
                <Message success>Dane rejestratora zostały zaktualizowane</Message>
                }
                {this.state.error &&
                <Message error>Podczas aktualizacji wystąpił błąd. Spróbuj ponownie.</Message>
                }
                <Form>
                    <Form.Input 
                        fluid label='Imię' 
                        name="firstname"
                        value={this.state.firstName}
                        onChange={this.onFirstNameChange}
                            
                    />
                    <Form.Input 
                        fluid label='Nazwisko' 
                        name="lastname"
                        value={this.state.lastName}
                        onChange={this.onLastNameChange}
                    />
                    <Form.Input 
                        fluid label='E-mail' 
                        name="email"
                        value={this.state.email}
                        onChange={this.onEmailChange}
                    />
                </Form>
                
                <Divider />
                {!this.state.updateReceptionist &&
                <div>
                    <Button onClick={this.updateReceptionist} color="orange" icon><Icon name="refresh" /><span>Edytuj</span></Button>  
                </div>
                }
                
                {this.state.updateReceptionist && 
                    <div>
                        <Button onClick={this.acceptUpdate} color="green" icon><Icon name="save" /><span>Zatwierdź</span></Button>
                        <Button onClick={this.cancelUpdate} color="red">Anuluj</Button> 
                    </div>   
                }

            </div>
        )
    }
}        


ReceptionistDetailsPartial.propTypes = {
    receptionists: PropTypes.isRequired,
    updateReceptionist: PropTypes.func.isRequired,
    ReceptionistId: PropTypes.string.isRequired
};

const mapStateToPros = (state) =>
{
    if(typeof(state.receptionist) !=='undefined')
        return  { receptionists: state.receptionist.receptionists.results, pagination:state.receptionist.receptionists.pagination };
    return  { receptionists: {} };  
}


export default connect(mapStateToPros, {updateReceptionist})(ReceptionistDetailsPartial);
