import React from 'react'
import PropTypes from "prop-types";
import {Card, Segment, Table} from 'semantic-ui-react'

const DailyPlanPartial  = (props) => (

    <Segment attached>
        <Card fluid color='green' >
            <Card.Content header='Śniadanie' />
            <Card.Content>
                <Table basic='very'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Produkt</Table.HeaderCell>
                            {props.details===true && 
                                <Table.HeaderCell>Indeks glikemiczny (GI)</Table.HeaderCell>
                            }   
                            {props.details===true && 
                                <Table.HeaderCell>Ładunek glikemiczny (GL)</Table.HeaderCell>
                            }    
                            {props.details===true && 
                                <Table.HeaderCell>Węglowdany</Table.HeaderCell>
                            }
                            <Table.HeaderCell>Wielkość porcji</Table.HeaderCell>
                            <Table.HeaderCell>Ilość porcji</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {props.DailyPlan.breakfast.products.map((product) => 
                            <Table.Row key={product.id}>
                                <Table.Cell>{product.productName}</Table.Cell>
                                {props.details===true && 
                                    <Table.Cell>{product.glycemicIndex}</Table.Cell>
                                }    
                                {props.details===true && 
                                    <Table.Cell>{product.glycemicLoad}</Table.Cell>
                                }    
                                {props.details===true && 
                                    <Table.Cell>{product.carbohydrates}</Table.Cell>
                                }
                                <Table.Cell>{product.serveSize}</Table.Cell>
                                <Table.Cell>{product.quantity}</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </Card.Content>
        </Card>
        
        <Card fluid color="olive"  >
            <Card.Content header='Drugie śniadanie' />
            <Card.Content>
                <Table basic='very'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Produkt</Table.HeaderCell>
                            {props.details===true && 
                                <Table.HeaderCell>Indeks glikemiczny (GI)</Table.HeaderCell>
                            }   
                            {props.details===true && 
                                <Table.HeaderCell>Ładunek glikemiczny (GL)</Table.HeaderCell>
                            }    
                            {props.details===true && 
                                <Table.HeaderCell>Węglowdany</Table.HeaderCell>
                            }
                            <Table.HeaderCell>Wielkość porcji</Table.HeaderCell>
                            <Table.HeaderCell>Ilość porcji</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {props.DailyPlan.snap.products.map((product) => 
                            <Table.Row key={product.id}>
                                <Table.Cell>{product.productName}</Table.Cell>
                                {props.details===true && 
                                    <Table.Cell>{product.glycemicIndex}</Table.Cell>
                                }    
                                {props.details===true && 
                                    <Table.Cell>{product.glycemicLoad}</Table.Cell>
                                }    
                                {props.details===true && 
                                    <Table.Cell>{product.carbohydrates}</Table.Cell>
                                }
                                <Table.Cell>{product.serveSize}</Table.Cell>
                                <Table.Cell>{product.quantity}</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </Card.Content>
        </Card>

        <Card fluid color="yellow"  >
            <Card.Content header='Obiad' />
            <Card.Content>
                <Table basic='very'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Produkt</Table.HeaderCell>
                            {props.details===true && 
                                <Table.HeaderCell>Indeks glikemiczny (GI)</Table.HeaderCell>
                            }   
                            {props.details===true && 
                                <Table.HeaderCell>Ładunek glikemiczny (GL)</Table.HeaderCell>
                            }    
                            {props.details===true && 
                                <Table.HeaderCell>Węglowdany</Table.HeaderCell>
                            }
                            <Table.HeaderCell>Wielkość porcji</Table.HeaderCell>
                            <Table.HeaderCell>Ilość porcji</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {props.DailyPlan.lunch.products.map((product) => 
                            <Table.Row key={product.id}>
                                <Table.Cell>{product.productName}</Table.Cell>
                                {props.details===true && 
                                    <Table.Cell>{product.glycemicIndex}</Table.Cell>
                                }    
                                {props.details===true && 
                                    <Table.Cell>{product.glycemicLoad}</Table.Cell>
                                }    
                                {props.details===true && 
                                    <Table.Cell>{product.carbohydrates}</Table.Cell>
                                }
                                <Table.Cell>{product.serveSize}</Table.Cell>
                                <Table.Cell>{product.quantity}</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </Card.Content>
        </Card>

        <Card fluid color="teal"  >
            <Card.Content header='Podwieczorek' />
            <Card.Content>
                <Table basic='very'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Produkt</Table.HeaderCell>
                            {props.details===true && 
                                <Table.HeaderCell>Indeks glikemiczny (GI)</Table.HeaderCell>
                            }   
                            {props.details===true && 
                                <Table.HeaderCell>Ładunek glikemiczny (GL)</Table.HeaderCell>
                            }    
                            {props.details===true && 
                                <Table.HeaderCell>Węglowdany</Table.HeaderCell>
                            }
                            <Table.HeaderCell>Wielkość porcji</Table.HeaderCell>
                            <Table.HeaderCell>Ilość porcji</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {props.DailyPlan.dinner.products.map((product) => 
                            <Table.Row key={product.id}>
                                <Table.Cell>{product.productName}</Table.Cell>
                                {props.details===true && 
                                    <Table.Cell>{product.glycemicIndex}</Table.Cell>
                                }    
                                {props.details===true && 
                                    <Table.Cell>{product.glycemicLoad}</Table.Cell>
                                }    
                                {props.details===true && 
                                    <Table.Cell>{product.carbohydrates}</Table.Cell>
                                }
                                <Table.Cell>{product.serveSize}</Table.Cell>
                                <Table.Cell>{product.quantity}</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </Card.Content>
        </Card>

        <Card fluid color="blue"  >
            <Card.Content header='Kolacja' />
            <Card.Content>
                <Table basic='very'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Produkt</Table.HeaderCell>
                            {props.details===true && 
                                <Table.HeaderCell>Indeks glikemiczny (GI)</Table.HeaderCell>
                            }   
                            {props.details===true && 
                                <Table.HeaderCell>Ładunek glikemiczny (GL)</Table.HeaderCell>
                            }    
                            {props.details===true && 
                                <Table.HeaderCell>Węglowdany</Table.HeaderCell>
                            }
                            
                            <Table.HeaderCell>Wielkość porcji</Table.HeaderCell>
                            <Table.HeaderCell>Ilość porcji</Table.HeaderCell>

                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {props.DailyPlan.supper.products.map((product) => 
                            <Table.Row key={product.id}>
                                <Table.Cell>{product.productName}</Table.Cell>
                                {props.details===true && 
                                    <Table.Cell>{product.glycemicIndex}</Table.Cell>
                                }    
                                {props.details===true && 
                                    <Table.Cell>{product.glycemicLoad}</Table.Cell>
                                }    
                                {props.details===true && 
                                    <Table.Cell>{product.carbohydrates}</Table.Cell>
                                }
                                
                                <Table.Cell>{product.serveSize}</Table.Cell>
                                <Table.Cell>{product.quantity}</Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
            </Card.Content>
        </Card>
    </Segment>
    
);

DailyPlanPartial.propTypes = {
    DailyPlan: PropTypes.shape({
        breakfast: PropTypes.shape({
            products: PropTypes.shape({
                map: PropTypes.func
            }).isRequired
        }).isRequired,
        snap: PropTypes.shape({
            products: PropTypes.shape({
                map: PropTypes.func
            }).isRequired
        }).isRequired,
        lunch: PropTypes.shape({
            products: PropTypes.shape({
                map: PropTypes.func
            }).isRequired
        }).isRequired,
        dinner: PropTypes.shape({
            products: PropTypes.shape({
                map: PropTypes.func
            }).isRequired
        }).isRequired,
        supper: PropTypes.shape({
            products: PropTypes.shape({
                map: PropTypes.func
            }).isRequired
        }).isRequired
    }).isRequired,
    details: PropTypes.bool.isRequired
}

export default DailyPlanPartial;