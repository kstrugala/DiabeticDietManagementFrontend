import React from 'react'
import { connect } from "react-redux";
import { Form, Loader, Dimmer, Message, Menu, Header, Segment, Button, Grid } from 'semantic-ui-react'
import PropTypes from "prop-types";
import axios from 'axios';
import {getMealPlan, getMealPlanForPatient} from '../../actions/mealPlan'
import DailyPlanPartial from './DailyPlanPartial';
import WeeklyPlanPartial from './WeeklyPlanPartial';


class MealPlanPartial extends React.Component {
    state = {
        loading: false,
        plan: "daily",
        weeklyPlan: {},
        planForDay:1,
        isFetched: false
    }

    componentDidMount() {
        this.fetchMealPlan()
    }

    // Weekly plan

    getMonday = (date) =>
    {
        const day = date.getDay() || 7;  
        if( day !== 1 ) 
            date.setHours(-24 * (day - 1)); 
        return date;
    }
    
    fetchMealPlan = () => {
        this.setState({loading: true});
        
        if(this.props.patientId === "null")
        {
            this.props.getMealPlanForPatient().then(()=>{
                this.setState({loading: false, isFetched:true});
            }).catch(err=>{
                if(err.response.status === 401 || err.response.status === 403 )
                {
                    axios.defaults.headers.common.Authorization = `Bearer ${  localStorage.getItem('tokenJWT')}`;
                    this.fetchMealPlan();
                }
            });
        }
        else {
            this.props.getMealPlan(this.props.patientId).then(()=>{
                this.setState({loading: false, isFetched:true}
                );
            }).catch(err=>{
                if(err.response.status === 401 || err.response.status === 403 )
                {
                    axios.defaults.headers.common.Authorization = `Bearer ${  localStorage.getItem('tokenJWT')}`;
                    this.fetchMealPlan();
                }
            });
        }
    }

    
    showDailyPlan = () =>
    {
        this.setState({plan: "daily"});
    }

    showWeeklyPlan = () =>
    {
        this.setState({plan: "weekly"});
        // Prepare weekly plan (get only current week days)
        let monday = this.getMonday(new Date());

        
        
        let tuesday = new Date();
        tuesday.setDate(monday.getDate()+1);
        
        let wednesday = new Date();
        wednesday.setDate(tuesday.getDate()+1);
        
        let thursday = new Date();
        thursday.setDate(wednesday.getDate()+1);

        let friday = new Date();
        friday.setDate(thursday.getDate()+1);

        let saturday = new Date();
        saturday.setDate(friday.getDate()+1);

        let sunday = new Date();
        sunday.setDate(saturday.getDate()+1);

        monday= monday.getDate();
        tuesday= tuesday.getDate();
        wednesday= wednesday.getDate();
        thursday= thursday.getDate();
        friday= friday.getDate();
        saturday= saturday.getDate();
        sunday= sunday.getDate();


        const mondayPlan = this.props.mealPlan.dailyPlans.find(x => x.day === monday);
        const tuesdayPlan = this.props.mealPlan.dailyPlans.find(x => x.day === tuesday);
        const wednesdayPlan = this.props.mealPlan.dailyPlans.find(x => x.day === wednesday);
        const thursdayPlan = this.props.mealPlan.dailyPlans.find(x => x.day === thursday);
        const fridayPlan = this.props.mealPlan.dailyPlans.find(x => x.day === friday);
        const saturdayPlan = this.props.mealPlan.dailyPlans.find(x => x.day === saturday);
        const sundayPlan = this.props.mealPlan.dailyPlans.find(x => x.day === sunday);

        this.setState({weeklyPlan: {
            monday: mondayPlan,
            tuesday: tuesdayPlan,
            wednesdey: wednesdayPlan,
            thursday: thursdayPlan,
            friday: fridayPlan,
            saturday: saturdayPlan,
            sunday: sundayPlan
        }});
    }

    showMonthlyPlan = () =>
    {
        this.setState({plan: "monthly"});
        const maxDayInMonth = new Date(new Date().getFullYear(), new Date().getMonth()+1, 0).getDate()
        this.setState({daysInMonth: [...Array(maxDayInMonth).keys()]})
    }

    showPlanForDay = (day) =>
    {
        this.setState({planForDay:day});
    }

    render() {
        return (
            <div>
                <Dimmer active={this.state.loading} inverted>
                    <Loader size='large'>Pobieranie danych...</Loader>
                </Dimmer>

                {this.props.mealPlan.name === "Brak planu" &&
                    <Message warning>Plan żywienia nie został jeszcze ułożony.</Message>
                }

                <Form>
                    <Form.Input 
                        fluid label='Nazwa' 
                        name="planName"
                        value={this.props.mealPlan.name}
                    />
                    {this.props.mealPlan.name !== "Brak planu" && 
                    <Menu compact>
                        <Menu.Item onClick={this.showDailyPlan} active={this.state.plan === "daily"}>Dzień</Menu.Item>
                        <Menu.Item onClick={this.showWeeklyPlan} active={this.state.plan === "weekly"}>Tydzień</Menu.Item>
                        <Menu.Item onClick={this.showMonthlyPlan} active={this.state.plan === "monthly"}>Miesiąc</Menu.Item>

                    </Menu>
                    }
                    {this.state.plan==="daily" && this.props.mealPlan.name !== "Brak planu" && this.state.isFetched===true &&

                        <Header as='h4' attached='top'>Dzisiejszy jadłospis</Header> 
                    }
                    {this.state.plan==="daily" && this.props.mealPlan.name !== "Brak planu" && this.state.isFetched===true &&
                        <DailyPlanPartial DailyPlan={this.props.mealPlan.dailyPlans.find(x => x.day === new Date().getDate())} details />
                    }

                    {this.state.plan==="weekly" && this.props.mealPlan.name !== "Brak planu" && this.state.isFetched===true &&
                        <WeeklyPlanPartial dailyPlans={this.state.weeklyPlan}/> 
                    }

                    {this.state.plan==="monthly" && this.props.mealPlan.name !== "Brak planu" && this.state.isFetched===true &&
                        <Segment>
                            <Header as='h4' attached='top'>Jadłospis na dzień: {this.state.planForDay}</Header> 
                            <Segment fluid attached>
                                <Grid>
                                    <Grid.Column width={1}>
                                        <Button.Group basic vertical>
            
                                            {this.state.daysInMonth.map((d)=>(
                                                <Button active={d+1===this.state.planForDay} onClick={()=>{this.showPlanForDay(d+1)}}>{d+1}</Button>
                                            ))}
                                        </Button.Group>
                                    </Grid.Column>
                                    <Grid.Column width={15}>
                                        <DailyPlanPartial DailyPlan={this.props.mealPlan.dailyPlans.find(x => x.day === this.state.planForDay)} details />
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                        </Segment>
                    }

                </Form>    

            </div>
        )
    }



}

MealPlanPartial.propTypes = {
    patientId: PropTypes.string.isRequired,
    getMealPlan: PropTypes.func.isRequired,
    getMealPlanForPatient: PropTypes.func.isRequired,
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

export default connect(mapStateToPros, {getMealPlan, getMealPlanForPatient})(MealPlanPartial);