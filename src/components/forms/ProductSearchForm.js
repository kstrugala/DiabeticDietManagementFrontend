import React from 'react'
import { Dropdown, Input, Button, Icon, Grid, Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { getProducts } from '../../actions/products'

class ProductSearchForm extends React.Component {
   state = {
       query: "",
       loading: false,
       options: [],
       products: []
   }
  
   onSearchChange = (e, data) => {
       clearTimeout(this.timer);
       this.setState({
           query: data
       });
       this.timer = setTimeout(this.fetchOptions, 1000);
   };

  onChange = (e, data) => {
      this.setState({ query: data.value });
      // this.props.onBookSelect(this.state.books[data.value]);
  };

  fetchOptions = () => {
      if (!this.state.query) return;
      this.setState({ loading: true });

      const products = [];
      const options = [];


      this.props.getProducts(this.state.query.searchQuery).then(results=>{
          results.forEach(p => {
              console.log(p);
              products.push(p);
              options.push({
                  key: p.id,
                  value: p.id,
                  text: p.productName
              });
          });
      });

      this.setState({ loading: false, options, products });

  }

  render() {
      return (
          <div>
              <Grid>
                  <Grid.Row>
                      <Grid.Column width={8}>
                          <Form>
                              <Dropdown placeholder='Produkt'
                                  search
                                  selection
                                  fluid
                                  value={this.state.query}
                                  onSearchChange={this.onSearchChange}
                                  options={this.state.options}
                                  loading={this.state.loading}
                                  onChange={this.onChange}
                              />
                          </Form>
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
ProductSearchForm.propTypes = {
    getProducts: PropTypes.func.isRequired
}


export default connect(null, {getProducts})(ProductSearchForm)