import React, {Component} from 'react';
import {withStyles, Button, Tab, Tabs, TextField, Icon, Typography, Grid } from '@material-ui/core';
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
import { genders, civilStatus, typeDirections } from 'constant';
import {showMessage, fetch_end, fetch_start} from 'store/actions/fuse';
import { saveTuitionApi, saveTypeEmployeeApi, getTuitionsApi, getSpecialitiesApi, getRolesApi, 
        getHeadquartersAllApi, getTypeEmployeesApi, getTypeDocsApi, getRegionsApi, 
        getProvincesForRegion, getDistrictsForProvince, saveSpecialityApi,
        getProfessionsAllApi, saveProfessionApi} from '../../../api';
import DialogCreateMaster from '../global/DialogCreateMaster';
import Select from 'react-select';

const styles = theme => ({});

/*const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};*/

const fieldsNewTypeEmployee = [
    {
        name: 'name',
        label: "Nombre",
    },
    {
        name: 'description',
        label: "Descripción",
    }
]

const fieldsNewSpeciality = fieldsNewTypeEmployee
const fieldsNewTuition = fieldsNewTypeEmployee
const fieldsNewProfession = fieldsNewTypeEmployee


class Employee extends Component {
    state = {
        tabValue: 0,
        form    : null,
        dialogTypeEmployee: false,
        dialogSpeciality: false,
        dialogTutition: false,
        dialogProfession: false,
        tuitions: [],
        typeEmployees: [],
        typeDocs: [],
        specialities: [],
        roles: [],
        regions: [],
        provinces: [],
        districts: [],
        headquarters: [],
        professions: []
        
    };
    
    closeDialogTypeEmployee = (response) => {
        this.setState({dialogTypeEmployee: false});
        if(response) //If the new type employee has been added
            this.fetchTypeEmployees()
    }
    
    openDialogTypeEmployee = () => {
        this.setState({dialogTypeEmployee:true})
    }
    
    closeDialogSpeciality = (response) => {
        this.setState({dialogSpeciality: false});
        if(response) //If the new speciality has been added
            this.fetchSpecialities()
    }
    
    openDialogSpeciality = () => {
        this.setState({dialogSpeciality:true})
    }
    
    closeDialogTuition = (response) => {
        this.setState({dialogTuition: false});
        if(response) //If the new tuition has been added
            this.fetchTuitions()
    }
    
    openDialogTuition = () => {
        this.setState({dialogTuition:true})
    }
    
    closeDialogProfession = (response) => {
        this.setState({dialogProfession: false});
        if(response) //If the new profession has been added
            this.fetchProfessions()
    }
    
    openDialogProfession = () => {
        this.setState({dialogProfession:true})
    }

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChange = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };
    
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
      let formCopy = {...this.state.form}
      formCopy.DistrictId = value || "" //set empty string if value is null for validations
      this.setState({form: formCopy})
    }
    
    handleSelectFile = (event) => {
      this.setState({form: _.set({...this.state.form}, event.target.name, event.target.files[0])})
    }
    
    componentDidMount()
    {
        this.fetchProfessions()
        this.fetchTuitions()
        this.fetchTypeDocs()
        this.fetchTypeEmployees()
        this.fetchSpecialities()
        this.fetchRoles()
        this.fetchHeadquarters()
        this.fetchRegions()
        const params = this.props.match.params;
        const { employee } = this.props
        const {employeeId } = params;
        if ( employeeId === 'new' )
            this.props.newEmployee()
        else if (!Object(employee).length) //If employee is empty, it doesn't come from list, so get from API
            this.props.getEmployee(employeeId)
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const { employee, isLoadingRequest } = this.props
        if ( employee && !this.state.form && !isLoadingRequest)
        {
            this.setState({form: employee})
            const params = this.props.match.params;
            const {employeeId } = params;
            if ( employeeId !== 'new' ){
              console.log("entro")
              this.fetchProvinces(employee.RegionId.id)
              this.fetchDistricts(employee.ProvinceId.id)
            }
        }
    }
    
    fetchProfessions = () => {
      const {showMessage, fetch_end, fetch_start} = this.props
      fetch_start()
      getProfessionsAllApi().then(response => {
        if (response.status)
          this.setState({professions: response.data})
      }, err => {
        console.log(err)
        showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
      }).finally(fetch_end)
    }

    fetchTuitions = () => {
      const {showMessage, fetch_end, fetch_start} = this.props
      fetch_start()
      getTuitionsApi().then(response => {
        if (response.status)
          this.setState({tuitions: response.data})
      }, err => {
        console.log(err)
        showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
      }).finally(fetch_end)
    }
    
    fetchHeadquarters = () => {
      const {showMessage, fetch_end, fetch_start} = this.props
      fetch_start()
      getHeadquartersAllApi().then(response => {
        if (response.status)
          this.setState({headquarters: response.data})
      }, err => {
        console.log(err)
        showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
      }).finally(fetch_end)
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
    
    fetchTypeEmployees = () => {
      const {showMessage, fetch_end, fetch_start} = this.props
      fetch_start()
      getTypeEmployeesApi().then(response => {
        if (response.status)
          this.setState({typeEmployees: response.data})
      }, err => {
        console.log(err)
        showMessage({ message: 'Error de conexión. Recargue por favor.', variant:"error" })
      }).finally(fetch_end)
    }
    
    fetchSpecialities = () => {
      const {showMessage, fetch_end, fetch_start} = this.props
      fetch_start()
      getSpecialitiesApi().then(response => {
        if (response.status)
          this.setState({specialities: response.data})
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
            !_.isEqual(this.props.employee, form) &&
            !hasEmptyField(form, ["tlfNumber", "digitalSignature", "referencePoint", "tuitionNumber2", "Tuition2Id"])
        )
    }

    submit = () => {
      
      let formValue = {...this.state.form};
      
      const { saveEmployee, editEmployee} = this.props
      const params = this.props.match.params;
      const {employeeId } = params;
      let formData = new FormData()
      formValue.DistrictId = formValue.DistrictId.id //because backend only needs ID
      formData.append('body', JSON.stringify(formValue))
      if(formValue.digitalSignature)
        formData.append('file', formValue.digitalSignature)
        
      if ( employeeId === 'new' )
        saveEmployee(formData)
      else
        editEmployee(formData, formValue.userId)
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
        const {tabValue, form, tuitions, specialities, 
              headquarters, typeDocs, typeEmployees, roles, 
              regions, provinces, districts, professions} = this.state;
              
        const { params : { employeeId } } = this.props.match;
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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/employees">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Personal
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                          <Typography className="text-16 sm:text-20 truncate">
                                              {employeeId === "new" ? "Registrar personal" : `${form.name} ${form.lastNameP} ${form.lastNameM}`}
                                          </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                          <Typography variant="caption">Detalle del personal</Typography>
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
                        variant="fullWidth"
                        classes={{root: "w-full h-64"}}
                        centered
                    >
                        <Tab className="h-64 normal-case" label="Datos personales"/>
                        <Tab className="h-64 normal-case" label="Domicilio"/>
                        <Tab className="h-64 normal-case" label="Profesión"/>
                        <Tab className="h-64 normal-case" label="Usuario"/>
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
                                          onChange={this.handleChange}
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
                                        inputProps={{ maxLength: 30 }}
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
                                          id="admissionDate"
                                          label="Fecha de admisión"
                                          type="date"
                                          value={form.admissionDate}
                                          name="admissionDate"
                                          error={form.admissionDate === ''}
                                          required
                                          onChange={this.handleChange}
                                          InputLabelProps={{
                                            shrink: true,
                                          }}
                                          variant="outlined"
                                          className="mt-8 mb-16 mr-8 ml-8"
                                          fullWidth
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
                                    <Grid container spacing={16} className="pb-16">
                                      <Grid item md xs>
                                        <TextField
                                          id="standard-select-currency"
                                          select
                                          label="Tipo de dirección"
                                          name="typeDirection"
                                          value={form.typeDirection}
                                          error={form.typeDirection === ''}
                                          required
                                          onChange={this.handleChange}
                                          helperText="Por favor seleccione uno"
                                          margin="normal"
                                          fullWidth
                                          variant="outlined"
                                        >
                                          {typeDirections.map(option => (
                                            <MenuItem key={option.value} value={option.value}>
                                              {option.label}
                                            </MenuItem>
                                          ))}
                                        </TextField>
                                      </Grid>
                                      <Grid item md xs>
                                        <TextField
                                          label="Punto de referencia"
                                          id="referencePoint"
                                          name="referencePoint"
                                          value={form.referencePoint}
                                          onChange={this.handleChange}
                                          variant="outlined"
                                          fullWidth
                                          autoComplete="off"
                                          margin="normal"
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
                                <div>
                                    <div style={{display:"flex", justifyContent:"center"}}>
    
                                        <TextField
                                          id="standard-select-currency"
                                          className="mt-8 mb-16 mr-8 ml-8"
                                          select
                                          label="Especialidad"
                                          name="SpecialityId"
                                          value={form.SpecialityId}
                                          error={form.SpecialityId === ''}
                                          required
                                          onChange={this.handleChange}
                                          helperText="Por favor seleccione uno"
                                          margin="normal"
                                          variant="outlined"
                                          fullWidth
                                        >
                                          <MenuItem value="">
                                            <Button color="primary" onClick={this.openDialogSpeciality} fullWidth variant="contained">
                                              Crear nuevo
                                            </Button>
                                          </MenuItem>
                                          {specialities.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                              {option.name}
                                            </MenuItem>
                                          ))}
                                        </TextField>
                                   <TextField
                                          id="standard-seleDermatologíact-currency"
                                          className="mt-8 mb-16 mr-8 ml-8"
                                          select
                                          label="Cargo"
                                          name="TypeEmployeeId"
                                          value={form.TypeEmployeeId}
                                          error={form.TypeEmployeeId === ''}
                                          required
                                          onChange={this.handleChange}
                                          helperText="Por favor seleccione uno"
                                          margin="normal"
                                          variant="outlined"
                                          fullWidth
                                        >
                                          <MenuItem value="">
                                            <Button color="primary" onClick={this.openDialogTypeEmployee} fullWidth variant="contained">
                                              Crear nuevo
                                            </Button>
                                          </MenuItem>
                                          {typeEmployees.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                              {option.name}
                                            </MenuItem>
                                          ))}
                                        </TextField>
                                      <TextField
                                          id="standard-select-currency"
                                          className="mt-8 mb-16 mr-8 ml-8"
                                          select
                                          label="Profesión"
                                          name="ProfessionId"
                                          value={form.ProfessionId}
                                          error={form.ProfessionId === ''}
                                          required
                                          onChange={this.handleChange}
                                          helperText="Por favor seleccione uno"
                                          margin="normal"
                                          variant="outlined"
                                          fullWidth
                                        >
                                          <MenuItem value="">
                                            <Button color="primary" onClick={this.openDialogProfession} fullWidth variant="contained">
                                              Crear nuevo
                                            </Button>
                                          </MenuItem>
                                          {professions.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                              {option.name}
                                            </MenuItem>
                                          ))}
                                        </TextField>
                                    </div>
                                    <div style={{display:"flex", justifyContent:"center"}}>
                                        <TextField
                                          id="standard-select-currency"
                                          className="mt-8 mb-16 mr-8 ml-8"
                                          select
                                          label="Colegiatura 1"
                                          name="TuitionId"
                                          value={form.TuitionId}
                                          onChange={this.handleChange}
                                          helperText="Por favor seleccione uno"
                                          error={form.TuitionId === ''}
                                          required
                                          margin="normal"
                                          variant="outlined"
                                          fullWidth
                                          autoComplete="off"
                                        >
                                          <MenuItem value="">
                                            <Button color="primary" onClick={this.openDialogTuition} fullWidth variant="contained">
                                              Crear nuevo
                                            </Button>
                                          </MenuItem>
                                          {tuitions.map(option => {
                                            return option.id !== form.Tuition2Id && 
                                            <MenuItem key={option.id} value={option.id}>
                                              {option.name}
                                            </MenuItem>
                                          })}
                                        </TextField>
                                   <TextField
                                        className="mt-8 mb-16 mr-8 ml-8"
                                        label="Nro. de colegiatura 1"
                                        id="tuitionNumber"
                                        name="tuitionNumber"
                                        value={form.tuitionNumber}
                                        error={form.tuitionNumber === ''}
                                        required
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        margin= "normal"
                                        fullWidth
                                        autoComplete="off"
                                    />
                                    </div>
                                    <div style={{display:"flex", justifyContent:"center"}}>
                                        <TextField
                                          id="standard-select-currency"
                                          className="mt-8 mb-16 mr-8 ml-8"
                                          select
                                          label="Colegiatura 2"
                                          name="Tuition2Id"
                                          value={form.Tuition2Id}
                                          onChange={this.handleChange}
                                          helperText="Por favor seleccione uno"
                                          margin="normal"
                                          variant="outlined"
                                          fullWidth
                                        >
                                          <MenuItem value="">
                                            <Button color="primary" onClick={this.openDialogTuition} fullWidth variant="contained">
                                              Crear nuevo
                                            </Button>
                                          </MenuItem>
                                          {tuitions.map(option => {
                                            return option.id !== form.TuitionId && 
                                            <MenuItem key={option.id} value={option.id}>
                                              {option.name}
                                            </MenuItem>
                                          })}
                                        </TextField>
                                   <TextField
                                        className="mt-8 mb-16 mr-8 ml-8"
                                        label="Nro. de colegiatura 2"
                                        id="tuitionNumber2"
                                        name="tuitionNumber2"
                                        value={form.tuitionNumber2}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        margin= "normal"
                                        fullWidth
                                        autoComplete="off"
                                    />
                                    </div>
                                    <TextField
                                        className="mt-8 mb-16 mr-8 ml-8"
                                        label="Firma digital"
                                        id="digitalSignature"
                                        name="digitalSignature"
                                        type="file"
                                        fullWidth
                                        //value={form.digitalSignature}
                                        onChange={this.handleSelectFile}
                                        variant="outlined"
                                        InputLabelProps={{
                                          shrink: true
                                        }}
                                        autoComplete="off"
                                    />
                                    {form.digitalSignatureUrl && 
                                      <a 
                                        className="mt-8 mb-16 mr-8 ml-8" 
                                        style={{color:'blue'}}
                                        href={form.digitalSignatureUrl} 
                                        target='_blank'
                                        rel="noopener noreferrer"
                                        >
                                          Descargar firma actual
                                      </a>
                                    }
                                </div>
                            )}
                            {tabValue === 3 && (
                                <div>
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
                                      {/*<TextField
                                          id="standard-select-currency"
                                          className="mt-8 mb-16 mr-8 ml-8"
                                          select
                                          label="Roles"
                                          value={form.roles}
                                          error={!form.roles.length}
                                          required
                                          name="roles"
                                          onChange={this.handleChange}
                                          helperText="Por favor seleccione"
                                          margin="normal"
                                          variant="outlined"
                                          fullWidth
                                          SelectProps={{
                                            multiple: true,
                                            renderValue: selected => `Hay ${selected.length} rol(es) seleccionado(s)`,
                                            menuprops: {MenuProps}
                                          }}
                                        >
                                          {roles.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                              <Checkbox color="primary" checked={form.roles.indexOf(option.id) > -1} />
                                              <ListItemText primary={option.name} />
                                            </MenuItem>
                                          ))}
                                        </TextField>*/}
                                        <TextField
                                          id="standard-select-currency"
                                          className="mt-8 mb-16 mr-8 ml-8"
                                          select
                                          label="Rol"
                                          name="roles"
                                          value={form.roles}
                                          error={form.roles === ''}
                                          required
                                          onChange={this.handleChange}
                                          helperText="Por favor seleccione uno"
                                          margin="normal"
                                          variant="outlined"
                                          fullWidth
                                        >
                                          {roles.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                              {option.name}
                                            </MenuItem>
                                          ))}
                                        </TextField>
                                        <TextField
                                          id="standard-select-currency"
                                          className="mt-8 mb-16 mr-8 ml-8"
                                          select
                                          label="Sede"
                                          name="HeadquarterId"
                                          value={form.HeadquarterId}
                                          error={form.HeadquarterId === ''}
                                          required
                                          onChange={this.handleChange}
                                          helperText="Por favor seleccione uno"
                                          margin="normal"
                                          variant="outlined"
                                          fullWidth
                                        >
                                          {headquarters.map(option => (
                                            <MenuItem key={option.id} value={option.id}>
                                              {option.name}
                                            </MenuItem>
                                          ))}
                                        </TextField>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                }
                    
                    innerScroll
                />
                {this.state.dialogTypeEmployee && <DialogCreateMaster
                    dialog={this.state.dialogTypeEmployee} 
                    onResponse={this.closeDialogTypeEmployee}
                    fields={fieldsNewTypeEmployee}
                    title="Nuevo cargo"
                    onFetchApi={saveTypeEmployeeApi}
                />}
                {this.state.dialogSpeciality && <DialogCreateMaster
                    dialog={this.state.dialogSpeciality} 
                    onResponse={this.closeDialogSpeciality}
                    fields={fieldsNewSpeciality}
                    title="Nueva especialidad"
                    onFetchApi={saveSpecialityApi}
                />}
                {this.state.dialogTuition && <DialogCreateMaster
                    dialog={this.state.dialogTuition} 
                    onResponse={this.closeDialogTuition}
                    fields={fieldsNewTuition}
                    title="Nueva colegiatura"
                    onFetchApi={saveTuitionApi}
                />}
                {this.state.dialogProfession && <DialogCreateMaster
                    dialog={this.state.dialogProfession} 
                    onResponse={this.closeDialogProfession}
                    fields={fieldsNewProfession}
                    title="Nueva profesión"
                    onFetchApi={saveProfessionApi}
                />}
            </div>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
      newEmployee : Actions.newEmployee,
      getEmployee : Actions.getEmployee,
      saveEmployee : Actions.saveEmployee,
      editEmployee : Actions.editEmployee,
      showMessage,
      fetch_end,
      fetch_start
    }, dispatch);
}

function mapStateToProps({employeesReducer, fuse})
{
    return {
        isLoadingRequest: fuse.request.loading > 0,
        employee: employeesReducer.employee.data
    }
}

export default withReducer('employeesReducer', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Employee))));