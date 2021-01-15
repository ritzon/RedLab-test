import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import { FuseAnimate, FusePageCarded } from '@fuse';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import * as Actions from './store/actions/editUser.actions';
import _ from '@lodash';
import withReducer from 'store/withReducer';
import reducer from './store/reducers';

class Profile extends Component {
    state = {
        tabValue: 0,
        form: null,
    };
    
    componentWillMount(){
        if (this.props.user.person.name && !this.state.form) {
            this.setState({ form: this.props.user.person })
        }
    }
    
    componentDidUpdate() {
        if (this.props.user.person.name && !this.state.form) {
            this.setState({ form: this.props.user.person });
        }
    }

    handleChangeTab = (event, tabValue) => {
        this.setState({ tabValue });
    };

    handleChange = (event) => {
        this.setState({ form: _.set({ ...this.state.form }, event.target.name, event.target.value) });
    };

    submit = () => {
        const { form } = this.state;
        const { editUser, user } = this.props;
        const user_id = localStorage.getItem('user_id');
        const person = user.roles[0].roleStr;
        
        if (person === 'client'){
            editUser(form, user_id, person);
        }
        else {
            let formData = new FormData()
            formData.append('body', JSON.stringify(form))
            editUser(formData,user_id, person);
        }
    }

    canBeSubmitted()
    {
        const {isLoadingRequest} = this.props
        const {form} = this.state
        return (
            !isLoadingRequest &&
            form.name.length &&
            form.lastNameP.length &&
            !_.isEqual(this.props.user.person, form)
        );
    }

    render() {
        const { form } = this.state;
        const { user } = this.props.user;
        
        return (
            <FusePageCarded
                classes={{
                    toolbar: "p-0",
                    header: "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header= {form && (
                    <div className="flex flex-1 w-full items-center justify-between">

                        <div className="flex flex-col items-start max-w-full"/>
                           
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            <Button
                                className="whitespace-no-wrap"
                                variant="contained"
                                disabled={!this.canBeSubmitted()}
                                onClick={this.submit}
                            >
                                Guardar
                            </Button>
                        </FuseAnimate>                        
                    </div>
                )
            }
                content={form && (

                    <div className="p-16 sm:p-24">
                        <div>
                            <TextField
                                className="mt-8 mb-16 mr-8 ml-8"
                                id="Nombre"
                                name="name"
                                required
                                label="Nombre"
                                error={form.name === ''}
                                value={form.name}
                                margin="normal"
                                onChange={this.handleChange}
                                fullWidth
                                variant="outlined"
                            />

                            <div style={{display:"flex", justifyContent:"center"}}>
                                <TextField
                                    className="mt-8 mb-16 mr-8 ml-8"
                                    required
                                    error={form.lastNameP === ''}
                                    label="Apellido paterno"
                                    name="lastNameP"
                                    id="lastNameP"
                                    value={form.lastNameP}
                                    margin="normal"
                                    onChange={this.handleChange}
                                    fullWidth
                                    variant="outlined"

                                />
                                <TextField
                                    className="mt-8 mb-16 mr-8 ml-8"
                                    required
                                    error={form.lastNameM === ''}
                                    label="Apellido materno"
                                    name="lastNameM"
                                    id="lastNameM"
                                    value={form.lastNameM}
                                    margin="normal"
                                    onChange={this.handleChange}
                                    fullWidth
                                    variant="outlined"
                                />
                            </div>

                            <div style={{display:"flex", justifyContent:"center"}}>
                                <TextField
                                    className="mt-8 mb-16 mr-8 ml-8"
                                    required
                                    error={form.phoneNumber === ''}
                                    label="Celular"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    value={form.phoneNumber}
                                    margin="normal"
                                    onChange={this.handleChange}
                                    fullWidth
                                    variant="outlined"

                                />
                                <TextField
                                    className="mt-8 mb-16 mr-8 ml-8"
                                    required
                                    error={form.tlfNumber === ''}
                                    label="Telefono"
                                    name="tlfNumber"
                                    id="tlfNumber"
                                    value={form.tlfNumber}
                                    margin="normal"
                                    onChange={this.handleChange}
                                    fullWidth
                                    variant="outlined"

                                />
                            </div>

                            <TextField
                                className="mt-8 mb-16 mr-8 ml-8"
                                required
                                multiline={true}
                                rows="4"
                                error={form.address === ''}
                                label="Dirección"
                                name="address"
                                id="address"
                                value={form.address}
                                margin="normal"
                                onChange={this.handleChange}
                                fullWidth
                                variant="outlined"

                            />
                            <TextField
                                required
                                className="mt-8 mb-16 mr-8 ml-8"
                                label="Correo"
                                id="email"
                                name="email"
                                value={user.email}
                                onChange={this.handleChange}
                                fullWidth
                                type="email"
                                variant="outlined"
                                disabled
                            />
                        </div>
                    </div>
                )}

                innerScroll
            />
        )
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        editUser: Actions.editUser,
    }, dispatch);

}

function mapStateToProps({ auth, fuse }) {
    return {
        user: auth.user.data,
        isLoadingRequest: fuse.request.loading > 0
    }
}

export default withReducer('editUserReducer', reducer)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile)));
