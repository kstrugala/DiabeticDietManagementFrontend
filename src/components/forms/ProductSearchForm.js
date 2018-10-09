import React from 'react'
import { Dropdown, Input, Button, Icon, Grid, Form, Message } from 'semantic-ui-react'
import { connect } from 'react-redux'
import validator from 'validator'
import PropTypes from 'prop-types'
import { getProducts } from '../../actions/products'

class ProductSearchForm extends React.Component {
   state = {
       product: "",
       query: "",
       loading: false,
       options: [],
       products: [],
       quantity:"",
       errorP:false,
       errorQ: false
   }
  
   onSearchChange = (e, data) => {
       clearTimeout(this.timer);
       this.setState({
           query: data
       });
       this.timer = setTimeout(this.fetchOptions, 1000);
   };

  onChange = (e, data) => {
      this.setState({ query: data.value, product: data.value });
  };

  setQuantity = (e) =>
  {
      if(validator.isInt(e.target.value, {min: 1}) || e.target.value === "")
      {
          this.setState({quantity:e.target.value.toString()});
      }
  }

  fetchOptions = () => {
      if (!this.state.query) return;
      this.setState({ loading: true });

      const products = [];
      const options = [];

      this.props.getProducts(this.state.query.searchQuery).then(results=>{
          results.forEach(p => {
              products.push(p);
              options.push({
                  key: p.id,
                  value: p.id,
                  text: p.productName
              });
          });
          this.setState({ loading: false, products, options });
      });
  }

  add = () =>
  {
      if(this.state.product!=="" && typeof(this.state.product)!=='undefined')
      {
          const product = this.state.products.find(x=>x.id===this.state.product);
          if(validator.isInt(this.state.quantity.toString()))
          {
              this.setState({errorP:false, errorQ:false})
              this.props.addToPlan(product, this.state.quantity)
          }
          else{
              this.setState({errorQ:true})

          }
      }
      else
      {
          this.setState({errorP:true})

      }
  }

  render() {
      return (
          <div>
              {this.state.errorP &&
              <Message info>Proszę wybrać produkt</Message> 
              }
              {this.state.errorQ &&
              <Message info>Proszę wybrać ilość</Message> 
              }

              <Grid>
                  <Grid.Row>
                      <Grid.Column width={8}>
                          <Form>
                              <Dropdown placeholder='Produkt'
                                  search
                                  selection
                                  fluid
                                  closeOnChange
                                  noResultsMessage="Nie znaleziono produktu."
                                  value={this.state.query}
                                  onSearchChange={this.onSearchChange}
                                  options={this.state.options}
                                  loading={this.state.loading}
                                  onChange={this.onChange}
                              />
                          </Form>
                      </Grid.Column>
                      <Grid.Column width={6}>
                          <Input fluid placeholder="Ilość" value={this.state.quantity} onChange={this.setQuantity}/>
                      </Grid.Column>
                      <Grid.Column width={2}>
                          <Button color='green' onClick={this.add} icon><Icon name="plus" /> Dodaj</Button>
                      </Grid.Column>
                  </Grid.Row>
              </Grid>
          </div>
      )
  }
}
ProductSearchForm.propTypes = {
    getProducts: PropTypes.func.isRequired,
    addToPlan: PropTypes.func.isRequired
}


export default connect(null, {getProducts})(ProductSearchForm)