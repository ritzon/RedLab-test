import React, {Component} from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/lib/Creatable';
import {withStyles, Paper, Chip, Typography, TextField, MenuItem} from '@material-ui/core';
import {emphasize} from '@material-ui/core/styles/colorManipulator';
import classNames from 'classnames';

const styles = theme => ({
    root            : {
        flexGrow: 1,
        height  : 250
    },
    input           : {
        display: 'flex',
        padding: 0
    },
    valueContainer  : {
        display   : 'flex',
        flexWrap  : 'wrap',
        flex      : 1,
        alignItems: 'center',
        padding   : '6px 4px 0 4px'
    },
    chip            : {
        margin: `${theme.spacing.unit}px ${theme.spacing.unit / 4}px`
    },
    chipFocused     : {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08
        )
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
    },
    singleValue     : {
        fontSize: 16
    },
    placeholder     : {
        position: 'absolute',
        left    : 2,
        fontSize: 16
    },
    paper           : {
        position : 'absolute',
        zIndex   : 1,
        marginTop: theme.spacing.unit,
        left     : 0,
        right    : 0
    },
    divider         : {
        height: theme.spacing.unit * 2
    }
});

function NoOptionsMessage(props)
{
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.noOptionsMessage}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function inputComponent({inputRef, ...props})
{
    return <div ref={inputRef} {...props} />;
}

function Control(props)
{
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef : props.innerRef,
                    children : props.children,
                    ...props.innerProps
                }
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function Option(props)
{
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 600 : 400
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props)
{
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function SingleValue(props)
{
    return (
        <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
            {props.children}
        </Typography>
    );
}

function ValueContainer(props)
{
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props)
{
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused
            }, props.data.class)}
            onDelete={event => {
                props.removeProps.onClick();
                props.removeProps.onMouseDown(event);
            }}
        />
    );
}

function Menu(props)
{
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

const components = {
    Control,
    Menu,
    MultiValue,
    NoOptionsMessage,
    Option,
    Placeholder,
    SingleValue,
    ValueContainer
};

class FuseChipSelect extends Component {

    render()
    {
        return (
            this.props.variant === 'fixed' ? (
                <Select
                    {...this.props}
                    components={components}
                />
            ) : (
                <CreatableSelect
                    {...this.props}
                    components={components}
                />
            )
        );
    }
}

export default withStyles(styles, {withTheme: true})(FuseChipSelect);
