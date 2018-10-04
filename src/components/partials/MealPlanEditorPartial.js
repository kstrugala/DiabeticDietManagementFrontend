import React from 'react'
import { Segment, Grid, Header, Dimmer, Loader, Form, Message } from 'semantic-ui-react'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import {getMealPlanForEdition} from '../../actions/mealPlan'
import {getProduct} from '../../actions/products'
import ButtonsForDaysPartial from './ButtonsForDaysPartial'
import SingleMealEditor from './SingleMealEditor';

const isEmpty = (obj) => { // eslint-disable-next-line
    for(const key in obj) { 
        if(obj.hasOwnProperty(key)) // eslint-disable-line
            return false;
    }
    return true;
}


class MealPlanEditorPartial extends React.Component {

    state = {
        fetching: false,
        loading: false,
        name: '',
        dailyPlans: [],
        completeDays: [],
        day: 1,
        dayChosen: false,
        breakfast: [],
        snap: [],
        lunch: [],
        dinner: [],
        supper: []
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
        if(this.state.isFetched===true)
        {
            this.setState({day: d, dayChosen: true}, ()=>{
                this.setCompletedDays();
                this.processDailyMeal();
            });
            
        }
    }

    fetchPlanForEdition = () =>
    {
        this.setState({fetching: true, completeDays: Array(...new Array(31)).map(() => false)});
       
        this.props.getMealPlanForEdition(this.props.patientId).then(()=>{
            this.setState({fetching: false, isFetched:true, name: this.props.mealPlan.name, dailyPlans:this.props.mealPlan.dailyPlans}, ()=>{
                this.setCompletedDays();
            });
            
        });
    }

    nameChange = (e)=>
    {
        this.setState({name: e.target.value})
    }

    deleteFromBreakfast = (key) =>
    {
        const bf = this.state.breakfast;
        bf.splice(key, 1);
        this.setState({breakfast:bf});
    }

    processDailyMeal = () =>
    {
        const dailyPlan = this.state.dailyPlans.find(x=>x.day===this.state.day);
        if(dailyPlan !== 'undefined' && !isEmpty(dailyPlan))
        {
            this.processBreakfast(dailyPlan.breakfast);
            this.processSnap(dailyPlan.snap);
            this.processLunch(dailyPlan.lunch);
            this.processDinner(dailyPlan.dinner);
            this.processSupper(dailyPlan.supper);

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
        this.setState({breakfast: bf}, ()=>{this.forceUpdate();});
        
    }

    processSnap = (snap) =>
    {
        const sn = [];   
        for(let i=0; i < snap.products.length; i+=1)
        {
            this.props.getProduct(snap.products[i].productId).then((data)=>{
                const prodInfo = {productId: snap.products[i].productId, 
                    quantity: snap.products[i].quantity, productName: data.productName,
                    carbohydrates: data.carbohydrates, glycemicIndex: data.glycemicIndex,
                    glycemicLoad: data.glycemicLoad, serveSize: data.serveSize
                }
                sn.push(prodInfo);
            })
        }
        this.setState({snap: sn});
    }

    processLunch = (lunch) =>
    {
        const lc = [];   
        for(let i=0; i < lunch.products.length; i+=1)
        {
            this.props.getProduct(lunch.products[i].productId).then((data)=>{
                const prodInfo = {productId: lunch.products[i].productId, 
                    quantity: lunch.products[i].quantity, productName: data.productName,
                    carbohydrates: data.carbohydrates, glycemicIndex: data.glycemicIndex,
                    glycemicLoad: data.glycemicLoad, serveSize: data.serveSize
                }
                lc.push(prodInfo);
            })
        }
        this.setState({lunch: lc});
    }

    processDinner = (dinner) =>
    {
        const dn = [];   
        for(let i=0; i < dinner.products.length; i+=1)
        {
            this.props.getProduct(dinner.products[i].productId).then((data)=>{
                const prodInfo = {productId: dinner.products[i].productId, 
                    quantity: dinner.products[i].quantity, productName: data.productName,
                    carbohydrates: data.carbohydrates, glycemicIndex: data.glycemicIndex,
                    glycemicLoad: data.glycemicLoad, serveSize: data.serveSize
                }
                dn.push(prodInfo);
            })
        }
        this.setState({dinner: dn});
    }

    processSupper = (supper) =>
    {
        const sp = [];   
        for(let i=0; i < supper.products.length; i+=1)
        {
            this.props.getProduct(supper.products[i].productId).then((data)=>{
                const prodInfo = {productId: supper.products[i].productId, 
                    quantity: supper.products[i].quantity, productName: data.productName,
                    carbohydrates: data.carbohydrates, glycemicIndex: data.glycemicIndex,
                    glycemicLoad: data.glycemicLoad, serveSize: data.serveSize
                }
                sp.push(prodInfo);
            })
        }
        this.setState({supper: sp});
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
                    {this.state.isFetched===true  &&
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
                            {!this.state.dayChosen && 
                                <Message info>Proszę wybrać dzień do edycji</Message>
                            }
                            {this.state.dayChosen===true &&     
                        <div>
                            <Header as='h4' attached='top'>Edytujesz jadłospis na dzień: {this.state.day}</Header> 
                            <Segment attached>
                                <Header as='h5' attached='top'>Śniadanie</Header> 
                                <Segment attached>
                                    <SingleMealEditor meal={this.state.breakfast} delete={this.deleteFromBreakfast} />
                                </Segment>
                                <Header as='h5' attached='top'>Drugie śniadanie</Header> 
                                <Segment attached>
                                    <SingleMealEditor meal={this.state.snap} />
                                </Segment>
                                <Header as='h5' attached='top'>Obiad</Header> 
                                <Segment attached>
                                    <SingleMealEditor meal={this.state.lunch} />

                                </Segment>
                                <Header as='h5' attached='top'>Podwieczorek</Header> 
                                <Segment attached>
                                    <SingleMealEditor meal={this.state.dinner} />

                                </Segment>
                                <Header as='h5' attached='top'>Kolacja</Header> 
                                <Segment attached>
                                    <SingleMealEditor meal={this.state.supper} />

                                </Segment>
                            </Segment>
                        </div>
                            }
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



const mapStateToPros = (state) =>
{
    if(typeof(state.mealPlan) !=='undefined' && !isEmpty(state.mealPlan))
        return { mealPlan: state.mealPlan.mealPlan };
    return  { mealPlan: {} }; 
}


export default connect(mapStateToPros, {getMealPlanForEdition, getProduct})(MealPlanEditorPartial);