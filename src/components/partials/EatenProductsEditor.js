import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Table, Button, Icon } from 'semantic-ui-react'
import {getProduct} from '../../actions/products'
import ProductSearchForm from '../forms/ProductSearchForm'

class EatenProductsEditor extends React.Component {
  
    state = {
        eatenProducts: []
    }
    
    componentDidMount()
    { 
    }

    addProduct  = (product, quantity) => {
        const ep = [...this.state.eatenProducts];
        ep.push({productId:product.id, productName:product.productName, glycemicIndex:product.glycemicIndex, glycemicLoad:product.glycemicLoad, 
            carbohydrates:product.carbohydrates, serveSize: product.serveSize, quantity});
        this.setState({eatenProducts:ep}, ()=>{
            this.props.setProducts(ep);
        });    
    }

    deleteProduct  = (productId, quantity) => {
        const ep = [...this.state.eatenProducts];
        const index = ep.findIndex(y=>y.productId === productId && y.quantity === quantity);
        ep.splice(index, 1);
        this.setState({eatenProducts:ep}, ()=>{
            this.props.setProducts(ep);
        });      }

    render() {
        return (
            <div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Nazwa</Table.HeaderCell>
                            <Table.HeaderCell>Indeks glikemiczny (GI)</Table.HeaderCell>
                            <Table.HeaderCell>Ładunek glikemiczny (GL)</Table.HeaderCell>
                            <Table.HeaderCell>Węglowodany</Table.HeaderCell>
                            <Table.HeaderCell>Wielkość porcji</Table.HeaderCell>
                            <Table.HeaderCell>Ilość porcji</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
     
                        {this.state.eatenProducts.map(product=>(
                            <Table.Row key={`${product.productId}#${product.quantity}`}>
                                <Table.Cell>{product.productName}</Table.Cell>
                                <Table.Cell>{product.glycemicIndex}</Table.Cell>
                                <Table.Cell>{product.glycemicLoad}</Table.Cell>
                                <Table.Cell>{product.carbohydrates}</Table.Cell>
                                <Table.Cell>{product.serveSize}</Table.Cell>
                                <Table.Cell>{product.quantity}</Table.Cell>
                                <Table.Cell><Button color='red' onClick={()=>{this.deleteProduct(product.productId, product.quantity)}} icon><Icon name='delete' />Usuń</Button></Table.Cell>
                            </Table.Row>   
                        ))}
                        
                                   
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='7'>
                                <ProductSearchForm  addToPlan={this.addProduct}/>        
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </div>
        )
    }
}



EatenProductsEditor.propTypes = {
    getProduct: PropTypes.func.isRequired, // eslint-disable-line
    setProducts: PropTypes.func.isRequired
}
export default connect(null, {getProduct})(EatenProductsEditor);