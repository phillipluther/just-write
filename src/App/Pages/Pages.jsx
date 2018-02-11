import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Title from 'Components/Title';
import Table from 'Components/Table';

import styles from './Pages.css';

const TABLE_HEADERS = [
    {
        key: 'title',
        label: 'Title',
    },
    {
        key: 'filename',
        label: 'Filename',
    },
    {
        key: 'summary',
        label: 'Summary',
    }
];


export default class Pages extends Component {

    state = {
        pages: [],
        pagesLoaded: false,
    }

    componentDidMount() {
        axios.get('/api/pages')
            .then(response => {
                this.setState({
                    pages: response.data,
                    pagesLoaded: true,
                });
            })
            .catch(() => {
                // error handling? this'll default to the intro
                this.setState({
                    pagesLoaded: true,
                });
            });
    }

    renderIntro = () => {
        return (
            <div className={styles.introWrapper}>
                <p>
                    A page is any piece of content created with Just Write. Pages
                    can be things like blog posts, company bios, or to-do lists.
                </p>

                {this.renderNewPageButton()}
            </div>
        );
    }

    renderNewPageButton = () => (
        <Link to="/page/new" className="button button--primary">
            Create a New Page
        </Link>
    );

    renderActions = () => (
        <div className={styles.actions} key="pagesActions">
            {this.renderNewPageButton()}
        </div>
    );

    render() {
        let {pagesLoaded, pages} = this.state;
        let content = null;

        if (pagesLoaded) {
            content = (pages.length === 0) ?
                this.renderIntro() :
                [
                    this.renderActions(),
                    <Table
                        className={styles.listing}
                        data={pages}
                        headers={TABLE_HEADERS}
                        key="tableListings"
                        apiRoot="page"
                    />
                ];
        }

        return (
            <div className={styles.wrapper}>
                <Title>Pages</Title>
                {content}
            </div>
        );
    }
}
