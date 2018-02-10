import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Transition from 'react-transition-group/Transition';

import styles from './Notice.css';

const transitionDuration = 360;

const transitionDefault = {
    transition: `max-height ${transitionDuration}ms`,
    maxHeight: 0
};

const transitionStyles = {
    entering: {maxHeight: 0},
    entered: {maxHeight: 120}
};


export default class Notice extends Component {

    static propTypes = {
        message: PropTypes.node,
        show: PropTypes.bool,
        type: PropTypes.oneOf([
            'confirmation',
            'error',
            'warning'
        ]),
    }

    render() {
        let {message, show, type} = this.props;
        let noticeClasses = classnames(
            styles.notice,
            {
                [styles.warning]: type === 'warning',
                [styles.error]: type === 'error',
                [styles.confirmation]: type === 'confirmation',
            }
        );

        return (
            <Transition in={show} timeout={transitionDuration}>
                {(state) => (
                    <div
                        className={styles.wrapper}
                        style={{
                            ...transitionDefault,
                            ...transitionStyles[state]
                        }}
                    >
                        <p className={noticeClasses}>
                            {message}
                        </p>
                    </div>
                )}
            </Transition>
        );
    }
}
