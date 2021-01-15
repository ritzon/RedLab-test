import React, {Component} from 'react';
import {withStyles, Icon, Typography} from '@material-ui/core';
import {FuseAnimate} from '@fuse';
import * as Actions from './store/actions';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import classNames from 'classnames';

const styles = () => ({
    root: {}
});

class ReferenceValuesHeader extends Component {
    render()
    {
        const {classes} = this.props;
        return (
            <div className={classNames(classes.root, "flex flex-1 w-full items-center justify-between")}>

                <div className="flex items-center">
                    {/* <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className="text-32 mr-0 sm:mr-12">local_atm</Icon>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Typography className="" variant="h6">Recargas</Typography>
                    </FuseAnimate> */}
                </div>

                <div className="flex flex-1 items-center justify-center px-12">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                        <Icon className="text-32 mr-0 sm:mr-12">list</Icon>
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                        <Typography className="" variant="h6">Valores de referencia</Typography>
                    </FuseAnimate>

                    {/* <MuiThemeProvider theme={FuseSelectedTheme}>
                        <FuseAnimate animation="transition.slideDownIn" delay={300}>
                            <Paper className="flex items-center w-full max-w-512 px-8 py-4 rounded-8" elevation={1}>

                                <Icon className="mr-8" color="action">Search</Icon>

                                <Input
                                    placeholder="Buscar"
                                    className="flex flex-1"
                                    disableUnderline
                                    fullWidth
                                    value={searchText}
                                    inputProps={{
                                        'aria-label': 'Search'
                                    }}
                                    onChange={setSearchText}
                                />
                            </Paper>
                        </FuseAnimate>
                    </MuiThemeProvider> */}

                </div>
                {/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
                    <Button component={Link} to="/apps/refills/new" className="whitespace-no-wrap" variant="contained">
                        <span className="hidden sm:flex">Nueva</span>
                        <span className="flex sm:hidden">Nueva</span>
                    </Button>
                </FuseAnimate> */}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        setSearchText: Actions.setReferenceValuesSearchText,
    }, dispatch);
}

function mapStateToProps({referenceValuesReducer})
{
    return {
        searchText: referenceValuesReducer.referenceValues.searchText
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(ReferenceValuesHeader));
