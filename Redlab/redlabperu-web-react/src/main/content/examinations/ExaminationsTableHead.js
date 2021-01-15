import React from 'react';
import {
    TableHead,
    TableSortLabel,
    TableCell,
    TableRow,
    Tooltip,
    withStyles
} from '@material-ui/core';

const rows = [
    {
        id            : 'code',
        numeric       : false,
        disablePadding: false,
        label         : 'Codigo',
        sort          : true
    },
    {
        id            : 'name',
        numeric       : false,
        disablePadding: false,
        label         : 'Nombre',
        sort          : true
    },
    {
        id            : 'service',
        numeric       : false,
        disablePadding: false,
        label         : 'Servicio',
        sort          : true
    },
    {
        id            : 'method',
        numeric       : false,
        disablePadding: false,
        label         : 'Metodo',
        sort          : true
    },
    {
        id            : 'options',
        numeric       : false,
        disablePadding: false,
        label         : 'Opciones',
        sort          : true
    },
];

const styles = theme => ({
    root                : {},
    actionsButtonWrapper: {
        position      : 'absolute',
        top           : 0,
        left          : 64,
        width         : 64,
        height        : 63,
        zIndex        : 10,
        background    : theme.palette.background.paper,
        alignItems    : 'center',
        display       : 'flex',
        justifyContent: 'center'
    }
});

class ExaminationsTableHead extends React.Component {
    state = {
        selectedCardsMenu: null
    };

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };

    openSelectedCardsMenu = (event) => {
        this.setState({selectedCardsMenu: event.currentTarget});
    };

    closeSelectedCardsMenu = () => {
        this.setState({selectedCardsMenu: null});
    };

    render()
    {
        const {order, orderBy} = this.props;

        return (
            <TableHead>
                <TableRow className="h-64">
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                numeric={row.numeric}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                {row.sort && (
                                    <Tooltip
                                        title="Sort"
                                        placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderBy === row.id}
                                            direction={order}
                                            onClick={this.createSortHandler(row.id)}
                                        >
                                            {row.label}
                                        </TableSortLabel>
                                    </Tooltip>
                                )}
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

export default withStyles(styles, {withTheme: true})(ExaminationsTableHead);
