import React from 'react'
import { connect } from "react-redux"
import PropTypes from "prop-types"
import axios from 'axios'
import { Icon, Table, Loader, Dimmer, Divider, Button, Modal, Header, Form, Checkbox, Menu } from 'semantic-ui-react';
import { getDietaryComplianceInfo, getDietaryComplianceInfoByDoctor, postDietaryCompliance } from '../../actions/diateryCompliance'
import EatenProductsEditor from './EatenProductsEditor'
import PaginationPartial from "./Pagination"

const isEmpty = (obj) => { // eslint-disable-next-line
  for(const key in obj) { 
      if(obj.hasOwnProperty(key)) // eslint-disable-line
            return false;
    }
    return true;
}

const options = [
    { key: '1', text: 'Śnadanie', value: 'Breakfast' },
    { key: '2', text: 'Drugie śnadanie', value: 'Snap' },
    { key: '3', text: 'Obiad', value: 'Lunch' },
    { key: '4', text: 'Podwieczorek', value: 'Dinner' },
    { key: '5', text: 'Kolacja', value: 'Supper' },
]


class DietaryCompliancePartial extends React.Component {
  state = {
      loading:false,
      eatenProducts:[],
      wasComplied:false,
      mealType:"",
      open: false,
      queryPage:1,
      queryPageSize:10,
  }
  
  componentDidMount() {
      this.fetchDietaryCompliance();
  }
  


  onChange = (e, data) => {
      this.setState({ mealType: data.value });
  };

  onPageChange = (e, { activePage })=>{
      this.setState({queryPage: activePage}, ()=>{this.fetchDietaryCompliance();});
  };

  onWasCompliedChange = (e, data) =>{
      this.setState({wasComplied: data.checked})
  }

  setPageSize = (e) => {
      this.setState({queryPageSize:parseInt(e.target.innerHTML, 10)}, ()=>{this.fetchDietaryCompliance();});
     
  };

  setProducts = (eatenProducts) => {
      this.setState({eatenProducts})
  }

  fetchDietaryCompliance = () => {
      this.setState({loading: true})
      const query = {pageSize: this.state.queryPageSize, page: this.state.queryPage }
      
      if(this.props.patientId==='null')
      {
          this.props.getDietaryComplianceInfo(query).then(
              this.setState({loading: false})
          ).catch(err=>{
              if(err.response.status === 401 || err.response.status === 403)
              {
                  axios.defaults.headers.common.Authorization = `Bearer ${  localStorage.getItem('tokenJWT')}`            
                  this.fetchDietaryCompliance();
              }
          });
      }
      else
      {
          this.props.getDietaryComplianceInfoByDoctor(this.props.patientId, query).then(
              this.setState({loading: false})
          ).catch(err=>{
              if(err.response.status === 401 || err.response.status === 403)
              {
                  axios.defaults.headers.common.Authorization = `Bearer ${  localStorage.getItem('tokenJWT')}`            
                  this.fetchDietaryCompliance();
              }
          });
      }
  }

  submit = () => {
      const payload={
          mealType: this.state.mealType,
          wasComplied:this.state.wasComplied,
          eatenProducts: this.state.eatenProducts
      }
      this.props.postDietaryCompliance(payload).then(()=>{
          this.fetchDietaryCompliance();
          this.setState({open:false, eatenProducts: [], wasComplied: false});
      })
  }



  render() {
      return (
          <div>
              {this.state.loading &&
                    <Dimmer active inverted>
                        <Loader size='large'>Pobieranie danych...</Loader>
                    </Dimmer>
              }
              <Table  celled>
                  <Table.Header>
                      <Table.Row>
                          <Table.HeaderCell textAlign='center'>Data</Table.HeaderCell>
                          <Table.HeaderCell textAlign='center'>Posiłek</Table.HeaderCell>
                          <Table.HeaderCell textAlign='center'>Przestrzeganie diety</Table.HeaderCell>
                          <Table.HeaderCell textAlign='center'>
                              Szczegóły      
                          </Table.HeaderCell>
                      </Table.Row>
                  </Table.Header>

                  <Table.Body>
                      {typeof(this.props.dietaryCompliance)!=="undefined" && !isEmpty(this.props.dietaryCompliance) ? 
                          this.props.dietaryCompliance.map(p=> (
                              <Table.Row key={p.id}>
                                  <Table.Cell textAlign='center'>{p.date.substring(0, 10)}</Table.Cell>
                                  <Table.Cell textAlign='center'>
                                      {p.mealType === "Breakfast" ? "Śniadanie": null }
                                      {p.mealType === "Snap" ? "Drugie śniadanie": null }
                                      {p.mealType === "Lunch" ? "Obiad": null }
                                      {p.mealType === "Dinner" ? "Podwieczorek": null }
                                      {p.mealType === "Supper" ? "Kolacja": null }
                                  </Table.Cell>
                                  <Table.Cell textAlign='center'>{p.wasComplied ? <Icon color="green" name="check circle outline" />: <Icon color="red" name="times circle" />}</Table.Cell>
                                  <Table.Cell textAlign='center'>
                                      <Modal trigger={<Button color="green">Szczegóły</Button>}>
                                          <Modal.Header>Szczegóły</Modal.Header>
                                          <Modal.Content>
                                              <Modal.Description>
                                                  <Header>Data: {p.date.substring(0, 10)} | Posiłek:
                                                      {p.mealType === "Breakfast" ? "Śniadanie": null }
                                                      {p.mealType === "Snap" ? "Drugie śniadanie": null }
                                                      {p.mealType === "Lunch" ? "Obiad": null }
                                                      {p.mealType === "Dinner" ? "Podwieczorek": null }
                                                      {p.mealType === "Supper" ? "Kolacja": null } 
                                                      | Przestrzeganie diety: {p.wasComplied ? <Icon color="green" name="check circle outline" />: <Icon color="red" name="times circle" />}
                                                  </Header>
                                                  <Table celled>
                                                      <Table.Header>
                                                          <Table.HeaderCell>Produkt</Table.HeaderCell>
                                                          <Table.HeaderCell>Indeks glikemiczny (GI)</Table.HeaderCell>
                                                          <Table.HeaderCell>Ładunek glikemiczny (GL)</Table.HeaderCell>
                                                          <Table.HeaderCell>Węglowodany</Table.HeaderCell>
                                                          <Table.HeaderCell>Wielkość porcji</Table.HeaderCell>
                                                          <Table.HeaderCell>Ilość porcji</Table.HeaderCell>
                                                      </Table.Header>
                                                      <Table.Body>
                                                          {p.eatenProducts.map(pr=>(
                                                              <Table.Row key={pr.id}>
                                                                  <Table.Cell>{pr.productName}</Table.Cell>
                                                                  <Table.Cell>{pr.glycemicIndex}</Table.Cell>
                                                                  <Table.Cell>{pr.glycemicLoad}</Table.Cell>
                                                                  <Table.Cell>{pr.carbohydrates}</Table.Cell>
                                                                  <Table.Cell>{pr.serveSize}</Table.Cell>
                                                                  <Table.Cell>{pr.quantity}</Table.Cell>
                                                              </Table.Row>
                                                          ))}
                                                      </Table.Body>
                                                  </Table>
                                              </Modal.Description>
                                          </Modal.Content>
                                      </Modal>
                                  </Table.Cell>
                              </Table.Row>

                          )):null}

                  
                  </Table.Body>

                  <Table.Footer>
                      <Table.Row>
                          <Table.HeaderCell colSpan='4'>
                              <Menu compact>
                                  <Menu.Item active={this.state.queryPageSize===10} onClick={this.setPageSize}>10</Menu.Item>
                                  <Menu.Item active={this.state.queryPageSize===30} onClick={this.setPageSize}>30</Menu.Item>
                                  <Menu.Item active={this.state.queryPageSize===50} onClick={this.setPageSize}>50</Menu.Item>
                              </Menu>
                              {!isEmpty(this.props.dietaryCompliance) &&
                                    <PaginationPartial pagination={this.props.pagination} onPageChange={this.onPageChange} />
                              }
                          </Table.HeaderCell>
                      </Table.Row>
                  </Table.Footer>

              </Table>
              {this.props.userRole === "patient" &&
              <div>
                  <Button color="green" onClick={()=>{this.setState({open:true})}} icon><Icon name="add"/>Dodaj</Button>
                  <Modal open={this.state.open}>
                      <Modal.Header>Dodaj informacje o przestrzeganiu diety</Modal.Header>   
                      <Modal.Content>
                          <Form>
                              <Form.Select fluid name='mealType' label='Posiłek' options={options} onChange={this.onChange} placeholder='Wybierz posiłek' />
                              <Form.Field>
                                  <Checkbox name='wasComplied' onChange={this.onWasCompliedChange} label='Dieta była przestrzegana' />
                              </Form.Field>
                              <EatenProductsEditor setProducts={this.setProducts}/>
                              <Divider />
                              <Button color="green" onClick={this.submit}>Dodaj</Button>
                              <Button color="red" onClick={()=>{this.setState({open:false})}}>Anuluj</Button>
                          </Form>
                      </Modal.Content>  
                  </Modal>
              </div>
              }
          </div>
      )
  }
}

DietaryCompliancePartial.propTypes = {
    dietaryCompliance: PropTypes.shape({
        map: PropTypes.func
    }).isRequired,
    getDietaryComplianceInfo: PropTypes.func.isRequired,
    getDietaryComplianceInfoByDoctor: PropTypes.func.isRequired,
    postDietaryCompliance: PropTypes.func.isRequired,
    userRole: PropTypes.string.isRequired,
    patientId: PropTypes.string.isRequired,
    pagination: PropTypes.shape({}).isRequired,
}

const mapStateToPros = (state) =>
{
    if(typeof(state.dietaryCompliance) !=='undefined' && !isEmpty(state.dietaryCompliance))
        return { dietaryCompliance: state.dietaryCompliance.dietaryCompliance.results, pagination: state.dietaryCompliance.dietaryCompliance.pagination };
    return  { dietaryCompliance: {}, pagination: {} }; 
}

export default connect(mapStateToPros, {getDietaryComplianceInfo, getDietaryComplianceInfoByDoctor, postDietaryCompliance})(DietaryCompliancePartial);