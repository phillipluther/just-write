import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import classnames from 'classnames';

import styles from './Title.css';


export default class Title extends Component {

    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.node),
        className: PropTypes.string,
        text: PropTypes.string,
    };

    render() {
        let titleClasses = classnames(
            styles.title,
            this.props.className
        );

        let title = this.props.text || this.props.children;

        return [
            <Helmet key="titleAttributes">
                <title>{title} | Just Write</title>
            </Helmet>,
            <h1 className={titleClasses} key="titleElement">
                {this.props.children}
            </h1>
        ];
    }
}
