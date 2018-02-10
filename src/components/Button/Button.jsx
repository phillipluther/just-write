import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import noop from 'Utils/noop';

import styles from './Button.css';


export default class Button extends Component {

    static propTypes = {
        className: PropTypes.string,
        children: PropTypes.node,
        disabled: PropTypes.bool,
        onBlur: PropTypes.func,
        onClick: PropTypes.func.isRequired,
        onFocus: PropTypes.func,
        type: PropTypes.oneOf(['button', 'submit', 'reset']),
        variant: PropTypes.oneOf(['primary', 'secondary']),
    }

    static defaultProps = {
        disabled: false,
        onBlur: noop,
        onFocus: noop,
        type: 'button',
        variant: 'primary',
    }

    constructor(props) {
        super(props);

        this.state = {
            isFocused: false,
        };
    }

    handleBlur = (e) => {
        this.setState({
            isFocused: false,
        });

        this.props.onBlur(e);
    }

    handleClick = (e) => {
        this.props.onClick(e);
    }

    handleFocus = (e) => {
        this.setState({
            isFocused: true,
        });

        this.props.onFocus(e);
    }

    render() {
        let {className, disabled, type, variant} = this.props;

        let classes = classnames(
            styles.button,
            className,
            {
                [styles.primary]: variant === 'primary',
                [styles.secondary]: variant === 'secondary',
                [styles.disabled]: disabled,
            }
        );

        return (
            <button
                className={classes}
                disabled={disabled}
                onBlur={this.handleBlur}
                onClick={this.handleClick}
                onFocus={this.handleFocus}
                type={type}
            >
                {this.props.children}
            </button>
        );
    }
}
