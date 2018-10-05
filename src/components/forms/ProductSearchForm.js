import React from 'react'
import { Dropdown, Input, Button, Icon, Grid } from 'semantic-ui-react'


export default class ProductSearchForm extends React.Component {
   state = {
       query: "",
       loading: false,
       options: [],
   }
  
   render() {
       return (
           <div>
               <Grid>
                   <Grid.Row>
                       <Grid.Column width={8}>
                           <Dropdown placeholder='Produkt' fluid search selection noResultsMessage='Nie znaleziono produktu.' options={[{text:"b", value:2}, {text:"a", value:2}]} />
                       </Grid.Column>
                       <Grid.Column width={6}>
                           <Input fluid placeholder="Ilość" />
                       </Grid.Column>
                       <Grid.Column width={2}>
                           <Button color='green' icon><Icon name="plus" /> Dodaj</Button>
                       </Grid.Column>
                   </Grid.Row>
               </Grid>
           </div>
       )
   }
}
