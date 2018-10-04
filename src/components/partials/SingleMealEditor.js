import React from 'react';
import PropTypes from 'prop-types'
import {getProduct} from '../../actions/products'
import { connect } from 'react-redux'
import { Table, Button, Icon } from 'semantic-ui-react'



class SingleMealEditor extends React.Component {
  
    
    componentDidMount()
    { 
    }



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
                        {this.props.meal.dailyPlans.find(x=>x.day===this.props.day).breakfast.products.map(product => (
                            <Table.Row key={`${product.productId}#${product.quantity}`}>
                                <Table.Cell>{product.productId}</Table.Cell>
                                <Table.Cell>{product.productId}</Table.Cell>
                                <Table.Cell>{product.productId}</Table.Cell>
                                <Table.Cell>{product.productId}</Table.Cell>
                                <Table.Cell>{product.productId}</Table.Cell>
 
                                <Table.Cell>{product.quantity}</Table.Cell>
                                <Table.Cell><Button color='red' onClick={()=>{this.props.delete(product.productId, product.quantity) }} icon><Icon name='delete' />Usuń</Button></Table.Cell>
                            </Table.Row>
                            
                        ))  
                        }
                    </Table.Body>

                </Table>

        
            </div>
        )
    }
}



SingleMealEditor.propTypes = {
    meal: PropTypes.array.isRequired,
    delete: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired
}
export default connect(null, {getProduct})(SingleMealEditor);