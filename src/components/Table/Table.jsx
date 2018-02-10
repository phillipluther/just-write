import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import toCamelCase from 'Utils/toCamelCase';

import styles from './Table.css';


export default class Table extends Component {

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        order: PropTypes.arrayOf(PropTypes.string),
    }

    static defaultProps = {
        order: [],
    }

    state = {
        headers: [],
    }

    constructor(props) {
        super(props);

        // if an order is not explicitly provided, build our headers array. we
        // check every object (eep!) in the event some of them have fewer/more
        // fields than others ... not assuming they're all the same
        if (props.order.length === 0) {
            props.data.forEach(obj => {
                Object.keys(obj).forEach(key => {
                    if (this.state.headers.indexOf(key) === -1) {
                        this.state.headers.push(key);
                    }
                });
            });

        } else {
            this.state.headers = props.order;
        }
    }

    renderHeader = (header, index) => {
        let hook = toCamelCase(header);
        let headerClasses = classnames(
            styles.header,
            `th-${hook}`, // custom class hook on header
        );

        return (
            <th className={headerClasses} key={hook + index}>
                {header}
            </th>
        );
    }

    renderHead = () => (
        <thead className={styles.head}>
            <tr className={styles.headers}>
                {this.state.headers.map(this.renderHeader)}
            </tr>
        </thead>
    );

    renderRow = (data, index) => {
        let rowData = [];

        this.state.headers.forEach((header, i) => {
            let hook = toCamelCase(header);
            let key = `${hook}-row${index}-${i}`;

            let cellClasses = classnames(
                styles.cell,
                `td-${hook}`,
            );

            rowData.push(
                <td className={cellClasses} key={key}>
                    {data[header]}
                </td>
            );
        });

        return (
            <tr className={styles.row} key={`tr-${index}`}>
                {rowData}
            </tr>
        );
    }

    renderBody = () => (
        <tbody className={styles.body}>
            {this.props.data.map(this.renderRow)}
        </tbody>
    )

    render() {
        return (
            <table className={styles.table}>
                {this.renderHead()}
                {this.renderBody()}
            </table>
        );
    }
}
