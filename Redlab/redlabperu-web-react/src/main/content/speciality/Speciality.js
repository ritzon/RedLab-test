import React, {Component} from 'react';
import {withStyles, Button, TextField, Icon, Typography} from '@material-ui/core';
import {orange} from '@material-ui/core/colors';
import {FuseAnimate, FusePageCarded} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { cutString, getRoleFunctionActions } from 'Utils';
import connect from 'react-redux/es/connect/connect';
import * as Actions from './store/actions';
import _ from '@lodash';
import withReducer from 'store/withReducer';
import reducer from './store/reducers';

const styles = theme => ({
    cardImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
    },
    cardImageItem        : {
        width                   : 128,
        height                  : 128,
        display                 : 'flex',
        alignItems              : 'center',
        justifyItems            : 'center',
        position                : 'relative',
        borderRadius            : 4,
        marginRight             : 16,
        marginBottom            : 16,
        overflow                : 'hidden',
        boxShadow               : theme.shadows[0],
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        cursor                  : 'pointer',
        '&:hover'               : {
            boxShadow                    : theme.shadows[5],
            '& $cardImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
            '& $cardImageFeaturedStar'      : {
                opacity: 1
            },
            '&:hover $cardImageFeaturedStar': {
                opacity: 1
            }
        }
    }
});

class Speciality extends Component {
    state = {
        tabValue: 0,
        form    : null
    };
    
    componentWillMount()
    {
        const params = this.props.match.params;
        const {specialityId} = params;
        if ( specialityId === 'new' )
        {
            this.props.newSpeciality();
            
            if(!this.canCreate())
                this.redirectToHome();
        }
        else
        {
            this.props.getSpeciality(specialityId);
        }
    }
    
    
    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( this.props.speciality && !this.state.form && !this.props.isLoadingRequest)
        {
            this.setState({form: this.props.speciality})
        }
        
    }
    
    handleChange = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    redirectToHome = () => {
        this.props.history.push({pathname: '/apps/home'});
    }

    canCreate() {
        const {actions, location} = this.props;
        const navigation = JSON.parse(localStorage.getItem('navigation'));
        const path = cutString(location.pathname, 4);
        const permissions = getRoleFunctionActions(navigation[0].children, actions, path, 'url');
        
        return permissions.canCreate;
    }

    canBeSubmitted() {   
        const  { name = "", description = "" } = this.state.form;
        const {isLoadingRequest} = this.props
        return (
            !isLoadingRequest &&
            name.length > 0 &&
            description.length > 0 &&
            !_.isEqual(this.props.speciality, this.state.form)
        )
    }

    submit = () => {
        const {form} = this.state;
        const params = this.props.match.params;
        const {specialityId} = params;
        
        if (specialityId === 'new')
            this.props.saveSpeciality(form); 
        else
            this.props.editSpeciality(form, specialityId);
    }


    render()
    {
        const {form} = this.state;

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
                                        <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/apps/specialties">
                                            <Icon className="mr-4 text-20">arrow_back</Icon>
                                            Especialidades
                                        </Typography>
                                    </FuseAnimate>

                                    <div className="flex items-center max-w-full">
                                        <div className="flex flex-col min-w-0">
                                            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                                <Typography className="text-16 sm:text-20 truncate">
                                                    {form.name ? form.name : 'Registrar especialidad'}
                                                </Typography>
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
                    content={
                        form && (
                            <div className="p-16 sm:p-24">
                                <div>
                                    <TextField
                                        className="mt-8 mb-16"
                                        error={form.name === ''}
                                        required
                                        label="Nombre"
                                        autoFocus
                                        id="name"
                                        name="name"
                                        value={form.name}
                                        onChange={this.handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
                                <div>
                                    <TextField
                                        multiline={true}
                                        error={form.description === ''}
                                        required
                                        label="Descripción"
                                        id="description"
                                        name="description"
                                        value={form.description}
                                        onChange={this.handleChange}
                                        rows="4"
                                        variant="outlined"
                                        fullWidth
                                    />
                                </div>
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
        getSpeciality: Actions.getSpeciality,
        newSpeciality : Actions.newSpeciality,
        saveSpeciality: Actions.saveSpeciality,
        editSpeciality: Actions.editSpeciality
    }, dispatch);
}

function mapStateToProps({specialtiesReducer, fuse})
{
    return {
        isLoadingRequest: fuse.request.loading > 0,
        actions: fuse.menulink.data,
        navigation: fuse.navigation,
        speciality: specialtiesReducer.speciality.data,
    }
}

export default withReducer('specialtiesReducer', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Speciality))));