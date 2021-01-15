import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import {FuseAnimate} from '@fuse';
import {BrowserView} from "react-device-detect";
import { connect } from 'react-redux';
import _ from '@lodash';

const styles = {
  root: {
    backgroundSize: 'cover',
    height: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  intro: {
        color: '#ffffff'
    },
  textBlack: {
    color: '#000000',
  },
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
}; 

class HomeContent extends React.Component {
  
  render() {
    const { classes, user } = this.props;
    const image = !_.isEmpty(user.person.headquarter, true) ? 
      "url('"+localStorage.getItem('headquarterImg')+"') no-repeat"
      :
      "url('/assets/images/backgrounds/dark-material-bg.jpg') no-repeat";
    
    return (
      <div style={{background: image}} className={classNames(classes.root, "flex flex-col flex-1 flex-no-shrink p-24 md:flex-row md:p-0")}>
        <div
            className={classNames(classes.intro, "flex flex-col flex-no-grow items-center p-16 text-center md:p-128 md:items-start md:flex-no-shrink md:flex-1 md:text-left")}>
            <FuseAnimate animation="transition.expandIn">
                <img style={{width:'250px'}} src="assets/images/backgrounds/logo-redlab.png" alt="logo"/>
            </FuseAnimate>
            <BrowserView>
                <FuseAnimate animation="transition.slideUpIn" delay={300}>
                    <Typography variant="h3" color="inherit" className="font-light">
                        Bienvenido al sistema Administrativo del laboratorio Clínico  Redlab Perú
                    </Typography>
                </FuseAnimate>
                <FuseAnimate delay={400}>
                    <Typography variant="subtitle1" color="inherit" className="max-w-512 mt-16">
                        {!_.isEmpty(user.person.headquarter, true) ?
                          `Dirección: ${user.person.headquarter.address} tlf: ${user.person.headquarter.tlfNumber}`
                          :
                          'Realiza todo tipo de tareas desde el menu lateral izquierdo.'
                        }
                    </Typography>
                </FuseAnimate>
            </BrowserView>
        </div>
      </div>
    );
  }
}

HomeContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps({ auth }) {
  return {
    user: auth.user.data
  }
}

export default connect(mapStateToProps)(withStyles(styles)(HomeContent));