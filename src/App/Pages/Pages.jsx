import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Title from 'Components/Title';
import Table from 'Components/Table';

import styles from './Pages.css';


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
                    can be blog posts, a company bio, or a to-do list.
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

    renderPages = () => {

    }

    render() {
        let {pagesLoaded, pages} = this.state;
        let content = null;

        if (pagesLoaded) {
            content = (pages.length === 0) ?
                this.renderIntro() :
                [
                    this.renderActions(),
                    this.renderPages()
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
