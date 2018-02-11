import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Title from 'Components/Title';
import Table from 'Components/Table';

import styles from './Tags.css';

const TABLE_HEADERS = [
    {
        key: 'name',
        label: 'Name',
    },
    {
        key: 'slug',
        label: 'Slug',
    },
    {
        key: 'description',
        label: 'Description',
    }
];

export default class Tags extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tags: [],
            tagsLoaded: false,
            tagsError: false,
        };
    }

    componentDidMount() {
        axios.get('/api/tags')
            .then(response => {
                this.setState({
                    tags: response.data,
                    tagsLoaded: true,
                });
            })
            .catch(err => {
                this.setState({
                    tagsError: err
                });
            });
    }

    renderNewTagButton = () => {
        return (
            <Link to="/tag/new" className="button button--primary">Create a New Tag</Link>
        );
    }

    renderTagIntro = () => {
        return (
            <div className={styles.introWrapper}>
                <p>
                    Tags are the basic organizational unit of Just Write. They
                    can represent categories, keywords, topics of interest, or
                    anything else used for classifying pages.
                </p>

                {this.renderNewTagButton()}
            </div>
        );
    }

    renderActions = () => {
        return (
            <div className={styles.actions} key="tagActions">
                {this.renderNewTagButton()}
            </div>
        );
    }

    render() {
        let {tags, tagsLoaded} = this.state;
        let content = null;

        if (tagsLoaded) {
            content = (tags.length === 0) ?
                this.renderTagIntro() :
                [
                    this.renderActions(),
                    <Table
                        className={styles.listing}
                        data={tags}
                        headers={TABLE_HEADERS}
                        key="tableListings"
                        apiRoot="tag"
                    />
                ];
        }

        return (
            <div className={styles.wrapper}>
                <Title>Tags</Title>
                {content}
            </div>
        );
    }
}
