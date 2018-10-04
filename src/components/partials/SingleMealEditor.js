import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react'

const SingleMealEditor = (props) =>
    (
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
                    {props.meal.map((product, key)=>(

                        <Table.Row>
                            <Table.Cell>{product.productName}</Table.Cell>
                            <Table.Cell>{product.glycemicIndex}</Table.Cell>
                            <Table.Cell>{product.glycemicLoad}</Table.Cell>
                            <Table.Cell>{product.carbohydrates}</Table.Cell>
                            <Table.Cell>{product.serveSize}</Table.Cell>
                            <Table.Cell>{product.quantity}</Table.Cell>
                            <Table.Cell><Button color='red' onClick={()=>{props.delete(key)}} icon><Icon name='delete' />Usuń</Button></Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>

            </Table>

            
        </div>
    );

export default SingleMealEditor;