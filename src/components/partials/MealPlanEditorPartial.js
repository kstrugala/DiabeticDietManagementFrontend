import React from 'react'
import { Segment, Grid, Header, Dimmer, Loader, Form, Message } from 'semantic-ui-react'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import {getMealPlanForEdition, addToMealPlan, removeFromMealPlan, changeMealPlanName} from '../../actions/mealPlan'
import {getProduct} from '../../actions/products'
import ButtonsForDaysPartial from './ButtonsForDaysPartial'
import SingleMealEditor from './SingleMealEditor'

const isEmpty = (obj) => { // eslint-disable-next-line
    for(const key in obj) { 
        if(obj.hasOwnProperty(key)) // eslint-disable-line
            return false;
    }
    return true;
}


class MealPlanEditorPartial extends React.Component {

    state = {
        fetching: true,
        loading: false,
        day: 1,
        completeDays: [],
        breakfast: []

    }

    componentDidMount() {
        this.fetchPlanForEdition();
    }

   

    setCompletedDays = () => {
        const cd = Array(...new Array(31)).map(() => false);
        // eslint-disable-next-line
        for(let i=0; i < this.props.mealPlan.dailyPlans.length; i+=1)
        {
            cd[this.props.mealPlan.dailyPlans[i].day-1]=true;
        }
        this.setState({completeDays:cd});
    }

    setDay = (day) => this.setState({day}, ()=>{
        this.setCompletedDays();
    });

    fetchPlanForEdition = () =>
    {
        this.setState({fetching: true});
       
        this.props.getMealPlanForEdition(this.props.patientId).then(()=>{
            this.setState({fetching: false});
            this.setCompletedDays();
        });
    }

    

    deleteFromBreakfast = (productId, quantity) =>
    {
        this.props.removeFromMealPlan(this.state.day, 'breakfast', productId, quantity);
        
    }

    render() {
        return (
            <Segment>
                <Dimmer active={this.state.fetching || this.state.loading} inverted>
                    <Loader size='large'>Pobieranie danych...</Loader>
                </Dimmer>
                <Grid>
                    <Grid.Column width={1}>
                        <ButtonsForDaysPartial completeDays={this.state.completeDays} setDay={this.setDay} currentlyEditedDay={this.state.day} />
                    </Grid.Column>
                    {this.state.fetching===false  &&
                    <Grid.Column width={15}>
                        <Form>
                            <Form.Input 
                                fluid label='Nazwa' 
                                name="planName"
                                value={this.props.mealPlan.name}
                                onChange={(e)=>{this.props.changeMealPlanName(e.target.value)}}
                            />
                        </Form>
                        <Segment>  
                            <div>
                                <Header as='h4' attached='top'>Edytujesz jadłospis na dzień: </Header> 
                                <Segment attached>
                                    <Header as='h5' attached='top'>Śniadanie</Header> 
                                    <Segment attached>
                                        <SingleMealEditor meal={this.props.mealPlan.dailyPlans.find(x=>x.day===this.state.day).breakfast.products} delete={this.deleteFromBreakfast} />
                                    </Segment>
                                    <Header as='h5' attached='top'>Drugie śniadanie</Header> 
                                    <Segment attached>
                                        a
                                    </Segment>
                                    <Header as='h5' attached='top'>Obiad</Header> 
                                    <Segment attached>
                                        a
                                    </Segment>
                                    <Header as='h5' attached='top'>Podwieczorek</Header> 
                                    <Segment attached>
                                        a
                                    </Segment>
                                    <Header as='h5' attached='top'>Kolacja</Header> 
                                    <Segment attached>
                                        a
                                    </Segment>
                                </Segment>
                            </div>
                            
                        </Segment>
                    </Grid.Column>
                    }
                </Grid>
            </Segment>
        )
    }
}


MealPlanEditorPartial.propTypes = {
    patientId: PropTypes.string.isRequired,
    getMealPlanForEdition: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired,
    addToMealPlan: PropTypes.func.isRequired,
    removeFromMealPlan: PropTypes.func.isRequired,
    changeMealPlanName: PropTypes.func.isRequired,
    mealPlan: PropTypes.shape({
        name: PropTypes.string.isRequired,
        dailyPlans: PropTypes.shape({
            find: PropTypes.func.isRequired
        }).isRequired
    }).isRequired
}



const mapStateToPros = (state) =>
{
    if(typeof(state.mealPlan) !=='undefined' && !isEmpty(state.mealPlan))
        return { mealPlan: state.mealPlan.mealPlan };
    return  { mealPlan: {} }; 
}


export default connect(mapStateToPros, {getMealPlanForEdition, getProduct, addToMealPlan, removeFromMealPlan, changeMealPlanName})(MealPlanEditorPartial);