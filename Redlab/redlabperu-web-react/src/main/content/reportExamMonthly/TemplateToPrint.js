import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { months } from "constant";
import classNames from 'classnames';
import NumberFormat from 'react-number-format';

const styles = theme => ({
  borderB: {
    borderBottom: "2px solid #000",
  },
  borderBR: {
    borderRight: "2px solid #000",
    borderBottom: "2px solid #000",
  },
  borderBRL: {
    borderBottom: "2px solid #000",
    borderRight: "2px solid #000",
    borderLeft: "2px solid #000",
  },
  striped: {
    background: "#f2f2f2"
  },
  cellHeader: {
    background: "black",
    padding: "5px 0"
  }
});



class TemplateToPrint extends React.Component {
  render() {
    const { classes, month, year, report } = this.props;

    return (
      <div className="w-full p-16">
        <Typography className="pb-8" align="center" variant="h6">
          REPORTE DE EXAMENES REALIZADOS -{months[month]} {year}- Redlab Perú
        </Typography>
        <Grid container>
          <Grid className={classes.cellHeader} item xs={1}> <TextHeader text="Fecha"/> </Grid>
          <Grid item container xs={11}>
            <Grid className={classes.cellHeader} item xs><TextHeader text="Código"/></Grid>
            <Grid className={classes.cellHeader} item xs><TextHeader text="DNI"/></Grid>
            <Grid className={classes.cellHeader} item xs={2}><TextHeader text="Nombres y apellidos"/></Grid>
            <Grid className={classes.cellHeader} item xs><TextHeader text="Edad"/></Grid>
            <Grid item container xs={5}>
              <Grid className={classes.cellHeader} item xs={3}><TextHeader text="Servicio"/></Grid>
              <Grid item container xs={9}>
                <Grid className={classes.cellHeader} item xs={8}><TextHeader text="Pruebas"/></Grid>
                <Grid className={classes.cellHeader} item xs={4}><TextHeader text="Precio"/></Grid>
              </Grid>
            </Grid>
            <Grid className={classes.cellHeader} item xs><TextHeader text="Precio"/></Grid>
          </Grid>
        </Grid>
        {report.dates.map((date, i) => 
          <PrintDate 
            classes={classes} 
            striped={i%2} 
            key={i} 
            date={date}
          />
        )}
        
        <Grid container>
          <Grid item xs={1}/>
          <Grid item container xs={11}>
            <Grid item xs/>
            <Grid item xs/>
            <Grid item xs={2}/>
            <Grid item xs/>
            <Grid item container xs={5}>
              <Grid item xs={3}/>
              <Grid item container xs={9}>
                <Grid item xs={8}/>
                <Grid className={classes.borderBRL} item xs={4}><NumberCell text={report.totalExaminations$}/></Grid>
              </Grid>
            </Grid>
            <Grid className={classes.borderBR} item xs><NumberCell text={report.totalAppointments$}/></Grid>
          </Grid>
        </Grid>
        
      </div>
    );
  }
}

const PrintDate = ({ date, classes, striped }) => (
  <Grid 
    className={classNames(classes.borderBRL, striped ? classes.striped : '')}
    container 
    justify="center" 
    alignItems="center"
  >
      <Grid item xs={1}><TextCell text={date.date}/></Grid>
      <Grid item xs={11}>
        {date.appointments.map((appoinment, i) => 
          <PrintAppoinment 
            classes={classes} 
            key={i} 
            appoinment={appoinment} 
            isLast={(i+1) === date.appointments.length}
          />
        )}
      </Grid>
    </Grid>
)

const PrintAppoinment = ({ appoinment, classes, isLast }) => (

  <Grid container className={isLast ? '' : classes.borderB} justify="center" alignItems="center">
        <Grid item xs><TextCell text={appoinment.code}/></Grid>
        <Grid item xs><TextCell text={appoinment.dni}/></Grid>
        <Grid item xs={2}> <TextCell text={appoinment.fullName}/> </Grid>
        <Grid item xs> <TextCell text={appoinment.age}/> </Grid>
        <Grid item xs={5}>
          {appoinment.services.map((service, i) => 
            <PrintService 
              classes={classes} 
              key={i} service={service} 
              isLast={(i+1) === appoinment.services.length}
            />
          )}
        </Grid>
        <Grid item xs> <NumberCell text={appoinment.totalPrice}/> </Grid>
      </Grid>

)

const PrintService = ({ service, classes, isLast }) => (

  <Grid container className={isLast ? '' : classes.borderB} justify="center" alignItems="center">
        <Grid item xs={3}><TextCell text={service.name}/></Grid>
        <Grid item xs={9}>
          {service.examinations.map((exam, i) => 
            <PrintExam 
              classes={classes} 
              key={i} exam={exam} 
              isLast={(i+1) === service.examinations.length}
            />
          )}
        </Grid>
      </Grid>

)

const PrintExam = ({ exam, classes, isLast }) => (
  <Grid className={classNames(isLast ? '' : classes.borderB, 'pb-6 pt-6')} container>
    <Grid item xs={8}><TextCell text={exam.name}/></Grid>
    <Grid item xs={4}><NumberCell text={exam.price}/></Grid>
  </Grid>
)

const TextHeader = ({ text }) => (
  <Typography className="text-17" align="center" color="primary">
    {text.toUpperCase()}
  </Typography>
)
const TextCell = ({ text }) => (
  <Typography className="text-15" align="center">
    {text}
  </Typography>
)

const NumberCell = ({ text }) => (
  <Typography className="text-15" align="center">
        <NumberFormat 
          thousandSeparator="."
          decimalSeparator=","
          prefix="S/."
          value={text}
          displayType="text"
          decimalScale={2}
        />
      </Typography>
)

TemplateToPrint.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemplateToPrint);
