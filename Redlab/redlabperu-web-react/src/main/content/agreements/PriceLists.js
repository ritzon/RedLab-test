import React from 'react';
import { connect } from 'react-redux'; 
import { Table, TableHead, TableCell, TableRow, TableBody, Button, Icon, Typography } from '@material-ui/core';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {Link} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { getAgreementsListPriceApi, deletePriceListApi } from '../../../api';
import {showMessage, fetch_end, fetch_start} from 'store/actions/fuse';
import DialogConfirm from '../global/DialogConfirm';

class PriceLists extends React.Component {

  state = {
    data: [],
    priceList: {},
    open: false
  }

  componentDidMount = () => {
    const params  = this.props.match.params
    this.fetchPricesList(params.agreementId);
  }

  fetchPricesList = (agreementId) => {
    const {showMessage, fetch_end, fetch_start} = this.props;
    fetch_start()
    getAgreementsListPriceApi(agreementId).then(response => {
     if (response.status) {
        this.setState({data: response.data});
     }
     }, err => {
        console.log(err)
        showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
    }).finally(fetch_end)
  }

  deletePriceList = (id) => {
    const {showMessage, fetch_end, fetch_start} = this.props;
    fetch_start()
    deletePriceListApi(id).then(response => {
     if (response.status) {
        showMessage({ message: response.message.text, variant:"success" })
     }
     }, err => {
        console.log(err)
        showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
    }).finally(fetch_end)
  }

  handleAlertResponse = (response) => {
    const { data, priceList } = this.state;
    this.setState({open: false});
        
    if (response) {
      this.deletePriceList(priceList.id);
      let index = data.indexOf(priceList);
      if (index > -1)
        data.splice(index,1);
      this.setState({data, priceList: {}});
    }
  }

  handleEditPriceList = (item) => {
    const params  = this.props.match.params;
    this.props.history.push(`/apps/agreements/priceLists/${item.id}/${params.agreementId}`);
  }

  handleDeletePriceList = (item) => {
    this.setState({open: true, priceList: item});
  }

  handleNewPriceList = () => {
    const params = this.props.match.params;
    this.props.history.push(`/apps/agreements/priceLists/new/${params.agreementId}`);
  }

  renderListPrices = () => {
    const { data } = this.state;
    const { isLoadingRequest } = this.props;
    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="right">Nombre</TableCell>
            <TableCell align="right">Opciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                <div>
                  <Button 
                    color="primary"
                    onClick={() => this.handleEditPriceList(row)}
                  >
                    Editar
                  </Button>
                  {/*
                  <Button 
                    color="primary"
                    onClick={() => this.handleDeletePriceList(row)}
                  >
                    Eliminar
                  </Button>
                  */}
                </div>
              </TableCell>
            </TableRow>
          ))}
          {!isLoadingRequest && data.length === 0 && 
          <TableRow>
              <TableCell colSpan={3}>
                  <p style={{fontSize:'20px', textAlign:'center'}}>No hay Listas registradas</p>
              </TableCell>
          </TableRow>}
        </TableBody>
      </Table>
    )
  }

	render() {

		return (
      <div>
        <FusePageCarded 
          classes={{
            toolbar: "p-0",
            header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
          }}
          header={
            <div className="flex flex-1 w-full items-center justify-between">
              <div className="flex flex-col items-start max-w-full">
                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/agreements">
                        <Icon className="mr-4 text-20">arrow_back</Icon>
                        Convenios
                    </Typography>
                </FuseAnimate>

                <div className="flex items-center max-w-full">
                    <div className="flex flex-col min-w-0">
                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                            <Typography className="text-16 sm:text-20 truncate">
                                Lista de precios
                            </Typography>
                        </FuseAnimate>
                    </div>
                </div>
              </div>
                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                    <Button
                        className="whitespace-no-wrap"
                        variant="contained"
                        onClick={this.handleNewPriceList}
                    >
                      Asignar lista de precios
                    </Button>
                </FuseAnimate>
            </div>
          }
          content={
            <div>
              { this.renderListPrices() }
            </div>
          }
  		    innerScroll
        />
        <DialogConfirm 
          open={this.state.open}
          onResponse={this.handleAlertResponse}
          title="Confirmar"
          description="¿Desea eliminar esta lista de precios?"
        />
      </div>
		)
	}
}

function mapDispatchToProps(dispatch)
{
  return bindActionCreators({
    showMessage,
    fetch_start,
    fetch_end
  }, dispatch);
}

function mapStateToProps({cardsReducer, fuse})
{
  return {
    isLoadingRequest: fuse.request.loading > 0
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PriceLists);