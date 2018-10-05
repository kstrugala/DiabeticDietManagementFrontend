import React from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Table, Button, Icon } from 'semantic-ui-react'
import {getProduct} from '../../actions/products'
import ProductSearchForm from '../forms/ProductSearchForm'


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
                        {typeof(this.props.meal.dailyPlans.find(x=>x.day===this.props.day)) !=='undefined' && this.props.mealType === "breakfast" && this.props.meal.dailyPlans.find(x=>x.day===this.props.day).breakfast.products.map(product => (
                            <Table.Row key={`${product.productId}#${product.quantity}`}>
                                <Table.Cell>{product.productName}</Table.Cell>
                                <Table.Cell>{product.glycemicIndex}</Table.Cell>
                                <Table.Cell>{product.glycemicLoad}</Table.Cell>
                                <Table.Cell>{product.carbohydrates}</Table.Cell>
                                <Table.Cell>{product.serveSize}</Table.Cell>
 
                                <Table.Cell>{product.quantity}</Table.Cell>
                                <Table.Cell><Button color='red' onClick={()=>{this.props.delete(product.productId, product.quantity) }} icon><Icon name='delete' />Usuń</Button></Table.Cell>
                            </Table.Row>
                            
                        ))  
                        }

                        {typeof(this.props.meal.dailyPlans.find(x=>x.day===this.props.day)) !=='undefined' && this.props.mealType === "snap" && this.props.meal.dailyPlans.find(x=>x.day===this.props.day).snap.products.map(product => (
                            <Table.Row key={`${product.productId}#${product.quantity}`}>
                                <Table.Cell>{product.productName}</Table.Cell>
                                <Table.Cell>{product.glycemicIndex}</Table.Cell>
                                <Table.Cell>{product.glycemicLoad}</Table.Cell>
                                <Table.Cell>{product.carbohydrates}</Table.Cell>
                                <Table.Cell>{product.serveSize}</Table.Cell>
 
                                <Table.Cell>{product.quantity}</Table.Cell>
                                <Table.Cell><Button color='red' onClick={()=>{this.props.delete(product.productId, product.quantity) }} icon><Icon name='delete' />Usuń</Button></Table.Cell>
                            </Table.Row>
                            
                        ))  
                        }

                        {typeof(this.props.meal.dailyPlans.find(x=>x.day===this.props.day)) !=='undefined' && this.props.mealType === "lunch" && this.props.meal.dailyPlans.find(x=>x.day===this.props.day).lunch.products.map(product => (
                            <Table.Row key={`${product.productId}#${product.quantity}`}>
                                <Table.Cell>{product.productName}</Table.Cell>
                                <Table.Cell>{product.glycemicIndex}</Table.Cell>
                                <Table.Cell>{product.glycemicLoad}</Table.Cell>
                                <Table.Cell>{product.carbohydrates}</Table.Cell>
                                <Table.Cell>{product.serveSize}</Table.Cell>
 
                                <Table.Cell>{product.quantity}</Table.Cell>
                                <Table.Cell><Button color='red' onClick={()=>{this.props.delete(product.productId, product.quantity) }} icon><Icon name='delete' />Usuń</Button></Table.Cell>
                            </Table.Row>
                            
                        ))  
                        }

                        {typeof(this.props.meal.dailyPlans.find(x=>x.day===this.props.day)) !=='undefined' && this.props.mealType === "dinner" && this.props.meal.dailyPlans.find(x=>x.day===this.props.day).dinner.products.map(product => (
                            <Table.Row key={`${product.productId}#${product.quantity}`}>
                                <Table.Cell>{product.productName}</Table.Cell>
                                <Table.Cell>{product.glycemicIndex}</Table.Cell>
                                <Table.Cell>{product.glycemicLoad}</Table.Cell>
                                <Table.Cell>{product.carbohydrates}</Table.Cell>
                                <Table.Cell>{product.serveSize}</Table.Cell>
 
                                <Table.Cell>{product.quantity}</Table.Cell>
                                <Table.Cell><Button color='red' onClick={()=>{this.props.delete(product.productId, product.quantity) }} icon><Icon name='delete' />Usuń</Button></Table.Cell>
                            </Table.Row>
                            
                        ))  
                        }

                        {typeof(this.props.meal.dailyPlans.find(x=>x.day===this.props.day)) !=='undefined' && this.props.mealType === "supper" && this.props.meal.dailyPlans.find(x=>x.day===this.props.day).supper.products.map(product => (
                            <Table.Row key={`${product.productId}#${product.quantity}`}>
                                <Table.Cell>{product.productName}</Table.Cell>
                                <Table.Cell>{product.glycemicIndex}</Table.Cell>
                                <Table.Cell>{product.glycemicLoad}</Table.Cell>
                                <Table.Cell>{product.carbohydrates}</Table.Cell>
                                <Table.Cell>{product.serveSize}</Table.Cell>
 
                                <Table.Cell>{product.quantity}</Table.Cell>
                                <Table.Cell><Button color='red' onClick={()=>{this.props.delete(product.productId, product.quantity) }} icon><Icon name='delete' />Usuń</Button></Table.Cell>
                            </Table.Row>
                            
                        ))  
                        }

                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan='7'>
                                <ProductSearchForm />        
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                
                
        
            </div>
        )
    }
}



SingleMealEditor.propTypes = {
    meal: PropTypes.array.isRequired, // eslint-disable-line
    mealType: PropTypes.string.isRequired,
    delete: PropTypes.func.isRequired,
    getProduct: PropTypes.func.isRequired // eslint-disable-line
}
export default connect(null, {getProduct})(SingleMealEditor);