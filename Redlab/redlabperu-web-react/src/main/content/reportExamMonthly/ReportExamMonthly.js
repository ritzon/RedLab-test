import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {FusePageCarded} from '@fuse';
import ReportExamMonthlyHeader from './ReportExamMonthlyHeader';
import TemplateToPrint from './TemplateToPrint';

const styles = theme => ({});

const initialState = {
        report: null,
        month: '',
        year: ''
    } 

class ReportExamMonthly extends Component {
    state = initialState
    
    onFetchReport = (data, month, year) => {
        this.setState({
            report: data,
            month,
            year,
            contentPrint: null
            
        })
    }
    
    onFailedReport = () => {
        this.setState(initialState)
    }

    render()
    {
        const { report, month, year } = this.state
        return (
            <React.Fragment>
                <FusePageCarded
                    classes={{
                        content: "flex",
                        header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={
                        <ReportExamMonthlyHeader
                            onFetchReport={this.onFetchReport}
                            onFailedReport={this.onFailedReport}
                            contentPrint={this.state.contentPrint}
                        />
                    }
                    content={
                        report && 
                        <TemplateToPrint
                            report={report}
                            month={month} 
                            year={year}
                            ref={c => !this.state.contentPrint && this.setState({ contentPrint: c })}
                        />
                    }
                />
            </React.Fragment>
        )
    };
}

export default withStyles(styles)(ReportExamMonthly)
