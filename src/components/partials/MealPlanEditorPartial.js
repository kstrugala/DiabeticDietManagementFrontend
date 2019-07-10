import React from 'react'
import { Segment, Grid, Header, Dimmer, Loader, Form, Button, Icon, Divider, Message } from 'semantic-ui-react'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import axios from 'axios'
import download from 'downloadjs'
import {getMealPlanForEdition, addToMealPlan, removeFromMealPlan, changeMealPlanName, putMealPlan, setDailyPlans} from '../../actions/mealPlan'
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

    constructor() {
        super()
        this.openFileRef = React.createRef();
    }

    state = {
        fetching: true,
        loading: false,
        day: 1,
        completeDays: [],
        breakfast: [],
        saved:false,
        error: false

    }


    componentDidMount() {
        this.fetchPlanForEdition();
    }

   

    setCompletedDays = () => {
        console.log(this.props.mealPlan)
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
        this.setCompletedDays()
    }

    deleteFromSnap = (productId, quantity) =>
    {
        this.props.removeFromMealPlan(this.state.day, 'snap', productId, quantity);
        this.setCompletedDays()
    }

    deleteFromLunch = (productId, quantity) =>
    {
        this.props.removeFromMealPlan(this.state.day, 'lunch', productId, quantity);
        this.setCompletedDays()
    }

    deleteFromDinner = (productId, quantity) =>
    {
        this.props.removeFromMealPlan(this.state.day, 'dinner', productId, quantity);
        this.setCompletedDays()
    }

    deleteFromSupper = (productId, quantity) =>
    {
        this.props.removeFromMealPlan(this.state.day, 'supper', productId, quantity);
        this.setCompletedDays()
    }

    addToBreakfast = (product, quantity) =>
    {
        this.props.addToMealPlan(this.state.day, "breakfast", product, quantity);
        this.setCompletedDays()
    }

    addToSnap = (product, quantity) =>
    {
        this.props.addToMealPlan(this.state.day, "snap", product, quantity);
        this.setCompletedDays()
    }

    addToLunch = (product, quantity) =>
    {
        this.props.addToMealPlan(this.state.day, "lunch", product, quantity);
        this.setCompletedDays()
    }

    addToDinner = (product, quantity) =>
    {
        this.props.addToMealPlan(this.state.day, "dinner", product, quantity);
        this.setCompletedDays()
    }

    addToSupper = (product, quantity) =>
    {
        this.props.addToMealPlan(this.state.day, "supper", product, quantity);
        this.setCompletedDays()
    }

    open = () => {
        this.openFileRef.current.click()

    }
    fileOpened = (event) => {
        event.stopPropagation();
        event.preventDefault();
        let jsonString="";
        const file = event.target.files[0];

        if(file)
        {
            const reader = new FileReader();
            reader.readAsText(file, "UTF-8");
            reader.onload = (e) => {
                jsonString = e.target.result;
                let json;
                try {
                    json = JSON.parse(jsonString);
                }
                catch(ex)
                {
                    json = JSON.parse("{}");
                }
                if(json.name && json.dailyPlans)
                {
                    this.setState({fetching: true, loading: true}, ()=>{
                        this.props.changeMealPlanName(json.name);
                        this.props.setDailyPlans(json.dailyPlans);
                        setTimeout(() => { 
                            this.setCompletedDays();                         
                            this.setState({fetching: false, loading: false});                   
                        }, 1500);
                    });
                }

            }
        }

    }
    save = () => {
        let allDaysFilled = true;
        for(let d in this.state.completeDays) // eslint-disable-line
        {
            if(d===false)
            {
                allDaysFilled=false;
                break;
            }
        }

        if(allDaysFilled)
        {
            this.props.putMealPlan(this.props.patientId, this.props.mealPlan).then(()=>{
                this.setState({saved: true, error: false})
            }).catch(()=>{
                this.setState({error: true, saved: false})
            })
        }
    }

    saveOnDisk = () => {
        axios.post('api/savemealplan', this.props.mealPlan, {responseType: 'blob'}).then(res=>{
            download(res.data, `plan-${(new Date()).getTime()}.ddm`, res.headers['content-type'])
        })
    }

    render() {
        return (
            <Segment>
                <Dimmer active={this.state.fetching || this.state.loading} inverted>
                    <Loader size='large'>Pobieranie danych...</Loader>
                </Dimmer>
                {this.state.saved &&
                    <Message success>Plan został zapisany</Message>
                }
                {this.state.error &&
                    <Message error>Wystąpił błąd (sprawdź czy wypełniłeś wszyskie dni)</Message>
                }
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
                                        <SingleMealEditor mealType="breakfast" meal={this.props.mealPlan} day={this.state.day} delete={this.deleteFromBreakfast} addToPlan={this.addToBreakfast} />
                                    </Segment>
                                    <Header as='h5' attached='top'>Drugie śniadanie</Header> 
                                    <Segment attached>
                                        <SingleMealEditor mealType="snap" meal={this.props.mealPlan} day={this.state.day} delete={this.deleteFromSnap} addToPlan={this.addToSnap} />
                                    </Segment>
                                    <Header as='h5' attached='top'>Obiad</Header> 
                                    <Segment attached>
                                        <SingleMealEditor mealType="lunch" meal={this.props.mealPlan} day={this.state.day} delete={this.deleteFromLunch} addToPlan={this.addToLunch} />

                                    </Segment>
                                    <Header as='h5' attached='top'>Podwieczorek</Header> 
                                    <Segment attached>
                                        <SingleMealEditor mealType="dinner" meal={this.props.mealPlan} day={this.state.day} delete={this.deleteFromDinner} addToPlan={this.addToDinner} />

                                    </Segment>
                                    <Header as='h5' attached='top'>Kolacja</Header> 
                                    <Segment attached>
                                        <SingleMealEditor mealType="supper" meal={this.props.mealPlan} day={this.state.day} delete={this.deleteFromSupper} addToPlan={this.addToSupper} />

                                    </Segment>
                                </Segment>
                            </div>
                            
                        </Segment>
                    </Grid.Column>
                    }
                </Grid>
                <Divider />
              
                <input accept=".ddm" ref={this.openFileRef} type="file" style={{display:"none"}} onChange={this.fileOpened.bind(this)} // eslint-disable-line
                />
                <Button onClick={this.open} color="teal" icon><Icon name="file outline" /><span>Otwórz</span></Button>

                <Button onClick={this.saveOnDisk} color="blue" icon><Icon name="save outline" /><span>Zapisz na dysku</span></Button>
                <Button onClick={this.save} color="green" icon><Icon name="save" /><span>Zapisz plan</span></Button>

            </Segment>            
        )
    }
}


MealPlanEditorPartial.propTypes = {
    patientId: PropTypes.string.isRequired,
    getMealPlanForEdition: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired, // eslint-disable-line
    putMealPlan: PropTypes.func.isRequired,
    addToMealPlan: PropTypes.func.isRequired,
    removeFromMealPlan: PropTypes.func.isRequired,
    changeMealPlanName: PropTypes.func.isRequired,
    setDailyPlans: PropTypes.func.isRequired,
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


export default connect(mapStateToPros, {getMealPlanForEdition, getProduct, addToMealPlan, removeFromMealPlan, changeMealPlanName, putMealPlan, setDailyPlans})(MealPlanEditorPartial);