import React, {Component} from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import classnames from 'classnames';
import noop from 'Utils/noop';

import styles from './TextArea.css';


export default class TextArea extends Component {

    static propTypes = {
        className: PropTypes.string,
        defaultValue: PropTypes.string,
        id: PropTypes.string,
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        validator: PropTypes.func,
    }

    static defaultProps = {
        onBlur: noop,
        onChange: noop,
        onFocus: noop,
        validator: noop,
    }

    constructor(props) {
        super(props);

        this.state = {
            id: props.id || shortid.generate(),
            isChanged: false,
            isFocused: false,
            isPristine: true,
            value: props.defaultValue || '',
        };
    }

    handleBlur = (e) => {
        this.setState({
            isFocused: false,
        });

        this.props.onBlur(e);
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value,
            isChanged: true,
        });

        this.props.onChange(e);
    }

    handleFocus = (e) => {
        this.setState({
            isFocused: true,
            isPristine: false,
        });

        this.props.onFocus(e);
    }

    render() {
        let {className, label, name} = this.props;
        let {id, isFocused, value} = this.state;

        let wrapperStyles = classnames(
            styles.wrapper,
            className,
            {
                [styles.focused]: isFocused,
            }
        );

        return (
            <div className={wrapperStyles}>
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
                <textarea
                    id={id}
                    name={name}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    value={value}
                />
            </div>
        );
    }
}
