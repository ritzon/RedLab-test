import React, {Component} from 'react';
import {withStyles, Button, Tab, Tabs, TextField, Icon, Typography, IconButton, Tooltip } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as Actions from './store/actions';
import _ from '@lodash';
import withReducer from 'store/withReducer';
import reducer from './store/reducers';
import { hasEmptyField, hasArrayEmptyField } from 'Utils';
import {showMessage, fetch_end, fetch_start} from 'store/actions/fuse';
import Select from 'react-select';
import DataTables from 'material-ui-datatables'; 
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';




class ValueRefGroup extends Component {

    renderTableSelected = () => {
        const { group: {referenceValues} } = this.prop
        const TABLE_COLUMNS = [
            {
                key: "id",
                label: "Nombre",
                render: (name, all) =>
                <Select
                    placeholder="Escoge un valor"
                    defaultInputValue=""
                    name={String(name)}
                    id={String(name)}
                    isClearable
                    styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                    menuPortalTarget={document.body}
                    menuPlacement="top"
                    value={all}
                    onChange={this.handleChangeAutoSelect(name)}
                    options={referenceValues}
                  />
            },
            {
                key: "unit",
                label: "Unidad",
                style: {
                  width: '10%',
                },
            },
            {
                key: "allValues",
                label: "Rangos refereciales",
                style: {
                  width: '50%',
                },
                render: (name, all) =>
                <TextField
                    className="text-20"
                    id={String(all.id)}
                    name={String(all.id)}
                    error={!all.allValues}
                    required
                    value={all.allValues}
                    onChange={(event) => this.handleChangeTableValues(event, all.id)}
                    variant="outlined"
                    rows="3"
                    multiline
                    fullWidth
                />
                
            },
            {
                key: "options",
                label: "Opciones",
                style: {
                  width: '10%',
                },
                render: (name, all) => (
                    <Tooltip title="Eliminar">
                        <IconButton onClick={() => this.removeReferenceValue(all.id)} color="primary" >
                            <Icon>delete</Icon>
                        </IconButton>
                    </Tooltip>
                )
            }
        ];
        
        return (
            <MuiThemeProvider>
              <DataTables
                height={'auto'}
                selectable={false}
                showRowHover={true}
                columns={TABLE_COLUMNS}
                data={this.state.form.referenceValues}
                showCheckboxes={false}
                showFooterToolbar={false}
              />
            </MuiThemeProvider>
        );
    }


    render()
    {   
        const { group } = this.props
        return (
            <div>
                <TextField
                    className="text-20"
                    name="name"
                    error={!group.name}
                    required
                    value={group.name}
                    onChange={1+1}
                    variant="outlined"
                />
                { this.renderTableSelected() }
                <p align="center">
                  <Button
                    className="whitespace-no-wrap mt-8"
                    variant="contained"
                    onClick={this.handleClickAddValue}
                   >
                    Agregar otro valor al examen
                    </Button>  
                </p>
            </div>
        )
    };
}

export default ValueRefGroup;