import React from 'react'
import { connect } from "react-redux";
import { Form, Loader, Dimmer, Message, Menu } from 'semantic-ui-react'
import PropTypes from "prop-types";
import {getMealPlan} from '../../actions/mealPlan'
import DailyPlanPartial from './DailyPlanPartial';


class MealPlanPartial extends React.Component {
    state = {
        loading: false,
        plan: "daily"
    }

    componentDidMount() {
        this.fetchMealPlan()
    }

    
    fetchMealPlan = () => {
        this.setState({loading: true});
        
        this.props.getMealPlan(this.props.patientId).then(()=>{
            this.setState({loading: false}
            
            );
        });
    }

    
    showDailyPlan = () =>
    {
        this.setState({plan: "daily"});
    }

    showWeeklyPlan = () =>
    {
        this.setState({plan: "weekly"});
    }

    showMonthlyPlan = () =>
    {
        this.setState({plan: "monthly"});
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
                    
                    {this.state.plan==="daily" && this.props.mealPlan.name !== "Brak planu" &&
                        <DailyPlanPartial DailyPlan={this.props.mealPlan.dailyPlans.find(x => x.day === new Date().getDate())} details />
                    }

                </Form>    

            </div>
        )
    }



}

MealPlanPartial.propTypes = {
    patientId: PropTypes.string.isRequired,
    getMealPlan: PropTypes.func.isRequired,
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

export default connect(mapStateToPros, {getMealPlan})(MealPlanPartial);