import React from 'react';
import {withRouter} from 'react-router-dom';


function MainNavbarHeader()
{
    return (
        <div>
                    <img
                        src="assets/images/backgrounds/logo-redlab.png"
                        alt="react"
                        width="128"
                        style={{marginLeft: '50%'}}
                    />
        </div>
    );
};

export default withRouter(MainNavbarHeader);
