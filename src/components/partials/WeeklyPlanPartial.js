import React from 'react'
import PropTypes from 'prop-types'
import {Grid, Segment, Header} from 'semantic-ui-react'
import DailyPlanPartial from './DailyPlanPartial';

const WeeklyPlanPartial = (props) => (
    <Segment>
        <Grid columns='3'>
            <Grid.Row>
                <Grid.Column>
                    <Header as='h4' attached='top'>Poniedziałek</Header>
                    <DailyPlanPartial DailyPlan={props.dailyPlans.monday} />
                </Grid.Column>
                <Grid.Column>
                    <Header as='h4'attached='top'>Wtorek</Header>
                    <DailyPlanPartial DailyPlan={props.dailyPlans.tuesday} />
                </Grid.Column>
            
                <Grid.Column>
                    <Header as='h4' attached='top'>Środa</Header>
                    <DailyPlanPartial DailyPlan={props.dailyPlans.wednesdey} />
                </Grid.Column>
                
            </Grid.Row>

            <Grid.Row>
                <Grid.Column>
                    <Header as='h4' attached='top'>Czwartek</Header>
                    <DailyPlanPartial DailyPlan={props.dailyPlans.thursday} />
                </Grid.Column>
                <Grid.Column>
                    <Header as='h4' attached='top'>Piątek</Header>
                    <DailyPlanPartial DailyPlan={props.dailyPlans.friday} />
                </Grid.Column>
                <Grid.Column>
                    <Header as='h4' attached='top'>Sobota</Header>
                    <DailyPlanPartial DailyPlan={props.dailyPlans.saturday} />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column>
                    <Header as='h4' attached='top'>Niedziela</Header>
                    <DailyPlanPartial DailyPlan={props.dailyPlans.sunday} />
                </Grid.Column>
            </Grid.Row>
         
        </Grid>
    </Segment>    
);

WeeklyPlanPartial.propTypes = {
    dailyPlans: PropTypes.shape({
        monday: PropTypes.shape({}).isRequired,
        tuesday: PropTypes.shape({}).isRequired,
        wednesdey: PropTypes.shape({}).isRequired,
        thursday: PropTypes.shape({}).isRequired,
        friday: PropTypes.shape({}).isRequired,
        saturday: PropTypes.shape({}).isRequired,
        sunday: PropTypes.shape({}).isRequired
    }).isRequired    
}

export default WeeklyPlanPartial;