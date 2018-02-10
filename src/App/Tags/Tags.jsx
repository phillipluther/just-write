import React, {Component} from 'react';
import axios from 'axios';
import classnames from 'classnames';
import {Link} from 'react-router-dom';
import Title from 'Components/Title';

import styles from './Tags.css';


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

    renderTag = (tag, index) => {
        let key = `${tag.name}-${index}`;
        let rowClasses = classnames(
            styles.tag,
            {
                [styles.even]: index % 2 === 0,
                [styles.odd]: index % 2 === 1,
            }
        );

        return (
            <tr className={rowClasses} key={key}>
                <td className={styles.tagName}>
                    {tag.name}
                </td>
                <td className={styles.tagSlug}>
                    {tag.slug}
                </td>
                <td className={styles.tagDescription}>
                    {tag.description}
                </td>
                <td className={styles.tagActions}>
                    <Link to={`/tag/${tag.id}`} className={styles.tagLink}>
                        Edit
                    </Link>
                </td>
            </tr>
        );
    }

    renderActions = () => {
        return (
            <div className={styles.actions} key="tagActions">
                {this.renderNewTagButton()}
            </div>
        );
    }

    renderTags = (tags) => {
        return (
            <table className={styles.tags} key="tagListing">
                <thead>
                    <tr className={styles.tagsHeader}>
                        <th>Name</th>
                        <th>Slug</th>
                        <th>Description</th>
                        <th>
                            <span className="sr">Actions</span>
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {tags.map(this.renderTag)}
                </tbody>
            </table>
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
                    this.renderTags(tags)
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
