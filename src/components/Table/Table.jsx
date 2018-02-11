import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {Link} from 'react-router-dom';

import styles from './Table.css';


export default class Table extends Component {

    static propTypes = {
        data: PropTypes.arrayOf(PropTypes.object).isRequired,
        headers: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string,
            key: PropTypes.string,
        })).isRequired,
        apiRoot: PropTypes.oneOf(['page', 'tag']).isRequired,
    }

    renderHeader = (header, index) => {
        let {label, key} = header;
        //let hook = toCamelCase(header);
        let headerClasses = classnames(
            styles.header,
            `th-${key}`, // custom class hook on header
        );

        return (
            <th className={headerClasses} key={key + index}>
                {label}
            </th>
        );
    }

    renderHead = () => (
        <thead className={styles.head}>
            <tr className={styles.headers}>
                {this.props.headers.map(this.renderHeader)}
                <th>
                    <span className="sr">Actions</span>
                </th>
            </tr>
        </thead>
    );

    renderRow = (data, index) => {
        let rowData = [];

        this.props.headers.forEach((header, i) => {
            let {key} = header;
            let rowKey = `${key}-row${index}-${i}`;

            let cellClasses = classnames(
                styles.cell,
                `td-${key}`,
            );

            rowData.push(
                <td className={cellClasses} key={rowKey}>
                    {data[key]}
                </td>
            );
        });

        // push our Edit link
        let editClasses = classnames(
            styles.cell,
            styles.editCell,
        );

        let apiLink = `/${this.props.apiRoot}/${data.id}`;
        rowData.push(
            <td className={editClasses} key={`edit-${index}`}>
                <Link to={apiLink} className={styles.editLink}>
                    Edit
                </Link>
            </td>
        );

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
