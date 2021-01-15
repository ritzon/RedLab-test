import React, {Component, createRef} from 'react';
import {withStyles, Grid, Button, Tab, Tabs, TextField, Icon, Typography } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as Actions from './store/actions';
import _ from '@lodash';
import withReducer from 'store/withReducer';
import reducer from './store/reducers';
import { hasEmptyField } from 'Utils';
import { genders, civilStatus } from 'constant';
import Select from 'react-select';

import {showMessage, fetch_end, fetch_start} from 'store/actions/fuse';
import { getRolesApi, getRegionsApi, getTypeDocsApi, getProvincesForRegion, getDistrictsForProvince } from '../../../api';

const styles = theme => ({});


class Patient extends Component {
  
  state = {
    tabValue: 0,
    form    : null,
    typeDocs: [],
    roles: [],
    regions: [],
    provinces: [],
    districts: [],
};

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChange = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value),});
        
    };
    
    handleChangeTypeDoc = (e) => {
      console.log(e.target.name)
      console.log(e.target.value)
      let formCopy = {...this.state.form}
      formCopy.TypeDocId = e.target.value
      if(formCopy.TypeDocId === 1) {
        formCopy.nationality = "Peruano"
      }
      this.setState({form: formCopy})

    }
    handleChangeRegion = (value) => {
      let formCopy = {...this.state.form}
      formCopy.RegionId = value || "" //set empty string if value is null for validations
      formCopy.ProvinceId = ""
      formCopy.DistrictId = ""
      this.setState({form: formCopy, provinces: [], districts: []});
      if(value)
        this.fetchProvinces(value.id)
    }
    
    handleChangeProvince = (value) => {
      let formCopy = {...this.state.form}
      formCopy.ProvinceId = value || "" //set empty string if value is null for validations
      formCopy.DistrictId = ""
      this.setState({form: formCopy, districts: []});
      if(value)
        this.fetchDistricts(value.id)
    }
    
    handleChangeDistrict = (value) => {
      console.log(value)
      let formCopy = {...this.state.form}
      formCopy.DistrictId = value || "" //set empty string if value is null for validations
      this.setState({form: formCopy})
    }
    
    componentDidMount()
    {
        this.fetchTypeDocs()
        //this.fetchRoles()
        this.fetchRegions()
        const params = this.props.match.params;
        const {patientId } = params;
        const { patient } = this.props
        if ( patientId === 'new' )
            this.props.newPatient()
        else if (!Object(patient).length) //If patient is empty, it doesn't come from list, so get from API
            this.props.getPatient(patientId)
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const { patient, isLoadingRequest } = this.props
        if ( patient && !this.state.form && !isLoadingRequest )
        {
            this.setState({form: patient})
            const params = this.props.match.params;
            const {patientId } = params;
            if ( patientId !== 'new' ){
              console.log("entro")
              this.fetchProvinces(patient.RegionId.id)
              this.fetchDistricts(patient.ProvinceId.id)
            }
        }
    }
    
    fetchRoles = () => {
      const {showMessage, fetch_end, fetch_start} = this.props
      fetch_start()
      getRolesApi().then(response => {
        if (response.status)
          this.setState({roles: response.data})
      }, err => {
        console.log(err)
        showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
      }).finally(fetch_end)
    }
    
    fetchTypeDocs = () => {
      const {showMessage, fetch_end, fetch_start} = this.props
      fetch_start()
      getTypeDocsApi().then(response => {
        if (response.status)
          this.setState({typeDocs: response.data})
      }, err => {
        console.log(err)
        showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
      }).finally(fetch_end)
    }
    
    fetchRegions = () => {
      const {showMessage, fetch_end, fetch_start} = this.props
      fetch_start()
      getRegionsApi().then(response => {
        if (response.status)
          this.setState({regions: response.data})
      }, err => {
        console.log(err)
        showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
      }).finally(fetch_end)
    }
    
    fetchProvinces = (regionId) => {
      const {showMessage, fetch_end, fetch_start} = this.props
      fetch_start()
      getProvincesForRegion(regionId).then(response => {
        if (response.status)
          this.setState({provinces: response.data})
      }, err => {
        console.log(err)
        showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
      }).finally(fetch_end)
    }
    
    fetchDistricts = (provinceId) => {
      const {showMessage, fetch_end, fetch_start} = this.props
      fetch_start()
      getDistrictsForProvince(provinceId).then(response => {
        if (response.status)
          this.setState({districts: response.data})
      }, err => {
        console.log(err)
        showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
      }).finally(fetch_end)
    }

    canBeSubmitted = () => {   
        const { form } = this.state
        const { isLoadingRequest } = this.props
        return (
            !isLoadingRequest &&
            !_.isEqual(this.props.patient, form) &&
            !hasEmptyField(form, ["tlfNumber"])
        )
    }

    submit = () => {
      
      let formValue = {...this.state.form};
      formValue.DistrictId = formValue.DistrictId.id //because backend only needs ID
      const { savePatient, editPatient} = this.props
      const params = this.props.match.params;
      const {patientId, patientHandle } = params;
      if ( patientId === 'new' && patientHandle !== 'continue') {
        savePatient(formValue);
      } else if (patientHandle === 'continue') {
        savePatient(formValue, "/apps/appointments/new/continue");
      }
      else
        editPatient(formValue, formValue.userId)
    }
    
    stylesAutoSelects = (name) => ({
      menuPortal: base => ({ ...base, zIndex: 9999 }),
      control: (provided, state) => ({
          ...provided,
          height: "56px",
          borderColor: this.state.form[name] ?  provided.borderColor : "red !important"
      })
    })


    render()
    {   
        const {tabValue, form, typeDocs, regions, provinces, districts} = this.state;
        const { params : { patientId, patientHandle = '' } } = this.props.match;
        const returnUrl = patientHandle === 'continue' ? '/apps/appointments/new/continue' : '/apps/patients'
        return (
            <div>
                <FusePageCarded
                    classes={{
                        toolbar: "p-0",
                        header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={
                      form && (
                        <div className="flex flex-1 w-full items-center justify-between">

                            <div className="flex flex-col items-start max-w-full">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to={returnUrl}>
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Paciente
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                          <Typography className="text-16 sm:text-20 truncate">
                                              {patientId === "new" ? "Nuevo paciente" : `${form.name} ${form.lastNameP} ${form.lastNameM}`}
                                          </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                          <Typography variant="caption">Detalle del paciente</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    disabled={!this.canBeSubmitted()}
                                    onClick={() => this.submit()}
                                >
                                    Guardar
                                </Button>
                            </FuseAnimate>
                        </div>
                      )
                    }
                    contentToolbar={
                    <Tabs
                        value={tabValue}
                        onChange={this.handleChangeTab}
                        indicatorColor="primary"
                        textColor="primary"
                        //scrollable
                        //scrollButtons="auto"
                        centered
                        variant="fullWidth"
                        classes={{root: "w-full h-64"}}
                    >
                        <Tab className="h-64 normal-case" label="Datos personales"/>
                        <Tab className="h-64 normal-case" label="Domicilio"/>
                        <Tab className="h-64 normal-case" label="Datos de contacto"/>
                    </Tabs>
                }
                content={
                    form && (
                        <div className="p-16 sm:p-24">
                            {tabValue === 0 &&
                            (
                                <div>
                                    <div style={{display:"flex", justifyContent:"center"}}>
    
                                        <TextField
                                          id="standard-select-currency"
                                          className="mt-8 mb-16 mr-8 ml-8"
                                          select
                                          error={form.TypeDocId === ''}
                                          required
                                          label="Tipo Documento"
                                          value={form.TypeDocId}
                                          name="TypeDocId"
                                          onChange={ (e) => {this.handleChangeTypeDoc(e);} }
                                          helperText="Por favor seleccione uno"
                                          margin="normal"
                                          variant="outlined"
                                          fullWidth
                                        >
                                          {typeDocs.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                              {option.name}
                                            </MenuItem>
                                          ))}
                                        </TextField>
                                    <TextField
                                        className="mt-8 mb-16 mr-8 ml-8"
                                        label="Nro Documento"
                                        id="name"
                                        name="dni"
                                        error={form.dni === ''}
                                        required
                                        value={form.dni}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        margin= "normal"
                                        autoComplete="off"
                                        fullWidth
                                    />
                                    <TextField
                                        className="mt-8 mb-16 mr-8 ml-8"
                                        label="Nro. de historia clínica"
                                        id="historyNumber"
                                        name="historyNumber"
                                        error={form.historyNumber === ''}
                                        required
                                        value={form.historyNumber}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        margin= "normal"
                                        fullWidth
                                        autoComplete="off"
                                    />
                                    </div>
                                <div style={{display:"flex", justifyContent:"center"}}>
                                    <TextField
                                      className="mt-8 mb-16 mr-8 ml-8"
                                      label="Nombres"
                                      id="name"
                                      name="name"
                                      error={form.name === ''}
                                      required
                                      fullWidth
                                      value={form.name}
                                      onChange={this.handleChange}
                                      variant="outlined"
                                      autoComplete="off"
                                    />
                                    <TextField
                                        className="mt-8 mb-16 mr-8 ml-8"
                                        label="Apellido paterno"
                                        id="name"
                                        name="lastNameP"
                                        error={form.lastNameP === ''}
                                        required
                                        value={form.lastNameP}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                        autoComplete="off"
                                    />
                                    <TextField
                                        className="mt-8 mb-16 mr-8 ml-8"
                                        label="Apellido materno"
                                        id="name"
                                        name="lastNameM"
                                        error={form.lastNameM === ''}
                                        required
                                        value={form.lastNameM}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                        autoComplete="off"
                                    />
                                </div>
                                <div style={{display:"flex", justifyContent:"center"}}>
    
                                        <TextField
                                          id="standard-select-currency"
                                          className="mt-8 mb-16 mr-8 ml-8"
                                          select
                                          label="Género"
                                          name="gender"
                                          value={form.gender}
                                          error={form.gender === ''}
                                          required
                                          onChange={this.handleChange}
                                          helperText="Por favor seleccione uno"
                                          margin="normal"
                                          variant="outlined"
                                          fullWidth
                                        >
                                          {genders.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                              {option.label}
                                            </MenuItem>
                                          ))}
                                        </TextField>
                                   <TextField
                                          id="standard-select-currency"
                                          className="mt-8 mb-16 mr-8 ml-8"
                                          select
                                          label="Estado civil"
                                          name="civilStatus"
                                          value={form.civilStatus}
                                          onChange={this.handleChange}
                                          helperText="Por favor seleccione uno"
                                          error={form.civilStatus === ''}
                                          required
                                          margin="normal"
                                          variant="outlined"
                                          fullWidth
                                        >
                                          {civilStatus.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                              {option.label}
                                            </MenuItem>
                                          ))}
                                        </TextField>
                                    </div>
                                    <div style={{display:"flex", justifyContent:"center"}}>
                                        <TextField
                                          id="birthDate"
                                          label="Fecha de nacimiento"
                                          type="date"
                                          value={form.birthDate}
                                          name="birthDate"
                                          error={form.birthDate === ''}
                                          required
                                          onChange={this.handleChange}
                                          InputLabelProps={{
                                            shrink: true,
                                          }}
                                          variant="outlined"
                                          className="mt-8 mb-16 mr-8 ml-8"
                                          fullWidth
                                        />
                                        <TextField
                                          id="nationality"
                                          disabled = {this.state.form.TypeDocId === 1}
                                          label="Nacionalidad"
                                          value={form.nationality}
                                          name="nationality"
                                          error={form.nationality === ''}
                                          required
                                          onChange={this.handleChange}
                                          variant="outlined"
                                          className="mt-8 mb-16 mr-8 ml-8"
                                          fullWidth
                                          autoComplete="off"
                                        />
                                    </div>
                                </div>
                            )}
                            {tabValue === 1 && (
                                <div>

                                    <Grid container spacing={16} className="pb-16">
                                      <Grid item md xs>
                                        <Select
                                          styles={this.stylesAutoSelects("RegionId")}
                                          placeholder="Escoge un departamento"
                                          defaultInputValue=""
                                          name="RegionId"
                                          isClearable
                                          menuPortalTarget={document.body}
                                          //openMenuOnClick={false}
                                          value={form.RegionId}
                                          onChange={this.handleChangeRegion}
                                          options={regions}
                                          noOptionsMessage={()=>"No hay departamentos"}
                                        />
                                      </Grid>
                                      <Grid item md xs>
                                        <Select
                                          placeholder="Escoge una provincia"
                                          defaultInputValue=""
                                          name="ProvinceId"
                                          isClearable
                                          styles={this.stylesAutoSelects("ProvinceId")}
                                          menuPortalTarget={document.body}
                                          //openMenuOnClick={false}
                                          value={form.ProvinceId}
                                          onChange={this.handleChangeProvince}
                                          options={provinces}
                                          noOptionsMessage={()=>"No hay provincias"}
                                        />
                                      </Grid>
                                      <Grid item md xs>
                                        <Select
                                          placeholder="Escoge un distrito"
                                          defaultInputValue=""
                                          name="DistrictId"
                                          isClearable
                                          styles={this.stylesAutoSelects("DistrictId")}
                                          menuPortalTarget={document.body}
                                          //openMenuOnClick={false}
                                          value={form.DistrictId}
                                          onChange={this.handleChangeDistrict}
                                          options={districts}
                                          noOptionsMessage={()=>"No hay districtos"}
                                        />
                                      </Grid>
                                    </Grid>
                                    <TextField
                                        multiline={true}
                                        className="mt-8 mb-16"
                                        label="Dirección"
                                        id="address"
                                        name="address"
                                        value={form.address}
                                        error={form.address === ''}
                                        required
                                        onChange={this.handleChange}
                                        rows="4"
                                        variant="outlined"
                                        fullWidth
                                        autoComplete="off"
                                    />

                                    
                                </div>
                            )}
                            {tabValue === 2 && (
                                <div style={{display:"flex", justifyContent:"center"}}>
                                  <TextField
                                    className="mt-8 mb-16 mr-8 ml-8"
                                    type="email"
                                    label="Correo"
                                    id="username"
                                    name="username"
                                    value={form.username}
                                    error={form.username === ''}
                                    required
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    margin= "normal"
                                    fullWidth
                                    autoComplete="off"
                                  />
                                  <TextField
                                    className="mt-8 mb-16 mr-8 ml-8"
                                    label="Teléfono móvil"
                                    name="phoneNumber"
                                    error={form.phoneNumber === ''}
                                    required
                                    value={form.phoneNumber}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    fullWidth
                                    autoComplete="off"
                                  />
                                  <TextField
                                    className="mt-8 mb-16 mr-8 ml-8"
                                    label="Teléfono fijo"
                                    name="tlfNumber"
                                    value={form.tlfNumber}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    fullWidth
                                    autoComplete="off"
                                  />
                                </div>
                            )}
                        </div>
                    )
                }
                    
                    innerScroll
                />
            </div>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
      newPatient : Actions.newPatient,
      getPatient : Actions.getPatient,
      savePatient : Actions.savePatient,
      editPatient : Actions.editPatient,
      showMessage,
      fetch_end,
      fetch_start
    }, dispatch);
}

function mapStateToProps({patientsReducer, fuse})
{
    return {
        isLoadingRequest: fuse.request.loading > 0,
        patient: patientsReducer.patient.data
    }
}

export default withReducer('patientsReducer', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Patient))));