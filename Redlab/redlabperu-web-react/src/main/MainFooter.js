import React from 'react';
import {Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles/index';
import classNames from 'classnames';

const styles = theme => ({
    root: {}
});

function MainFooter({classes})
{
    return (
        <div className={classNames(classes.root, "flex flex-1 items-right px-24")} style={{justifyContent:'flex-end'}}>
            {/* <Typography>Powered by Jorge Chiquín <font style={{fontSize:'25px'}}>☺</font></Typography> */}
            <Typography style = {{fontSize : '85%'}}>Powered by _</Typography>
        </div>
    );
}

export default withStyles(styles, {withTheme: true})(MainFooter);