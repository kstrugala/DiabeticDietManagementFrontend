import React from 'react'
import { Segment, Grid, Header, Dimmer, Loader, Form } from 'semantic-ui-react'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import {getMealPlanForEdition} from '../../actions/mealPlan'
import {getProduct} from '../../actions/products'
import ButtonsForDaysPartial from './ButtonsForDaysPartial'

class MealPlanEditorPartial extends React.Component {

    state = {
        fetching: false,
        loading: false,
        name: '',
        dailyPlans: [],
        completeDays: [],
        day: 1,
        breakfast: {}
    }

    componentDidMount() {
        this.fetchPlanForEdition();

    }

    setCompletedDays = () => {
        const cd = this.state.completeDays;       
        for(let i=0; i < this.state.dailyPlans.length; i+=1)
        {
            cd[this.state.dailyPlans[i].day-1]=true;
        }
        this.setState({completeDays: cd});
    }

    setDay = (d) => {
        this.setState({day: d})
    }

    fetchPlanForEdition = () =>
    {
        this.setState({fetching: true, completeDays: Array(...new Array(31)).map(() => false)});
       
        this.props.getMealPlanForEdition(this.props.patientId).then(()=>{
            this.setState({fetching: false, isFetched:true, name: this.props.mealPlan.name, dailyPlans:this.props.mealPlan.dailyPlans}, ()=>{
                this.setCompletedDays();
                this.processDailyMeal();
            });
            
        });
    }

    nameChange = (e)=>
    {
        this.setState({name: e.target.value})
    }

    processDailyMeal = () =>
    {
        const dailyPlan = this.state.dailyPlans.find(x=>x.day===this.state.day);
        if(dailyPlan !== 'undefined')
        {
            this.processBreakfast(dailyPlan.breakfast)
        }
    }

    processBreakfast = (breakfast) =>
    {
        const bf = [];   
        for(let i=0; i < breakfast.products.length; i+=1)
        {
            this.props.getProduct(breakfast.products[i].productId).then((data)=>{
                const prodInfo = {productId: breakfast.products[i].productId, 
                    quantity: breakfast.products[i].quantity, productName: data.productName,
                    carbohydrates: data.carbohydrates, glycemicIndex: data.glycemicIndex,
                    glycemicLoad: data.glycemicLoad, serveSize: data.serveSize
                }
                bf.push(prodInfo);
            })
        }
        this.setState({breakfast: bf});
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
                    {this.state.isFetched===true &&
                    <Grid.Column width={15}>
                        <Form>
                            <Form.Input 
                                fluid label='Nazwa' 
                                name="planName"
                                value={this.state.name}
                                onChange={this.nameChange}
                            />
                        </Form>
                        <Segment>
                            <Header as='h4' attached='top'>Edytujesz jadłospis na dzień: {this.state.day}</Header> 
                            <Segment attached>
                                <Header as='h5' attached='top'>Śniadanie</Header> 
                                <Segment attached>
                                    a
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
    mealPlan: PropTypes.shape({
        name: PropTypes.string.isRequired,
        dailyPlans: PropTypes.shape({
            find: PropTypes.func.isRequired
        }).isRequired
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
    if(typeof(state.mealPlan) !=='undefined' && !isEmpty(state.mealPlan))
        return { mealPlan: state.mealPlan.mealPlan };
    return  { mealPlan: {} }; 
}


export default connect(mapStateToPros, {getMealPlanForEdition, getProduct})(MealPlanEditorPartial);