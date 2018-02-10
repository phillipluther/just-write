import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import Title from 'Components/Title';
import TextField from 'Components/Form/TextField';
import TextArea from 'Components/Form/TextArea';
import Button from 'Components/Button';
import noop from 'Utils/noop';
import hasValue from 'Utils/hasValue';

import styles from './Page.css';


class Page extends Component {

    static propTypes = {
        notify: PropTypes.func,
        history: PropTypes.shape({
            push: PropTypes.func,
        }),
        match: PropTypes.shape({
            params: PropTypes.shape({
                tagId: PropTypes.string,
            }),
        })
    }

    static defaultProps = {
        notify: noop,
    }

    state = {
        allPages: null,
        isChanged: false,
        isLoaded: false,
        isNew: false,
    }

    componentDidMount() {
        let {pageId} = this.props.match.params;

        if (pageId === 'new') {
            this.setState({
                isLoaded: true,
                isNew: true,
                page: {},
            });

        } else {
            axios.get('/api/page/' + pageId)
                .then(({data}) => {
                    this.setState({
                        isLoaded: true,
                        page: data,
                    });
                })
                .catch(() => {
                    this.props.notify(
                        'error',
                        'Could not retrieve page information. Try refreshing the page.'
                    );

                    this.setState({
                        isLoaded: true,
                    });
                });
        }
    }

    validatePageData = (pageData) => new Promise((resolve, reject) => {
        let {content, filename, title} = pageData;

        // ensure the title is set
        if (hasValue(title) === false) {
            reject('Page \'Title\' is a required field.');
            return;
        }

        if (hasValue(filename) === false) {
            reject('Page \'Filename\' is a required field.');
            return;
        }

        // alpha, numeric, dashes, underscores in the filename
        if (filename.search(/^[a-zA-Z0-9-_]+$/) === -1) {
            reject(
                'Filename can contain alpha-numeric characters, dashes, or ' +
                'underscores. Do not include the file extension.'
            );
            return;
        }

        if (hasValue(content) === false) {
            reject('Page \'Content\' is a required field.');
            return;
        }

        resolve();
    })

    updatePage = (id, pageData) => {

    }

    createPage = (pageData) => {
        axios.post('/api/pages', pageData)
            .then(() => {
                this.props.notify('confirmation', 'Page created.');
                this.props.history.push('/pages');
            })
            .catch(({response}) => {
                this.props.notify(
                    'error',
                    `Could not create page. ${response.data}.`
                );
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let {page: pageData} = this.state;

        this.validatePageData(pageData)
            .then(() => {
                let {id, ...pageData} = this.state.page;

                if (id) {
                    this.updatePage(id, pageData);
                } else {
                    this.createPage(pageData);
                }

            })
            .catch(message => {
                this.props.notify('error', message);
            });
    }

    updatePageData = (e) => {
        let {name, value} = e.target;
        let page = Object.assign({}, this.state.page);

        page[name] = value;
        this.setState({
            isChanged: true,
            page
        });
    }

    renderForm = () => {
        let {isChanged, isNew, page} = this.state;
        let verb = 'Create';
        let deleteButton = null;

        if (isNew === false) {
            verb = 'Update';
            deleteButton = (
                <Button
                    onClick={this.handleDelete}
                    type="button"
                    variant="secondary"
                >
                    Delete Page
                </Button>
            );
        }

        return (
            <form name="pageDataForm" onSubmit={this.handleSubmit}>
                <TextField
                    defaultValue={page.title}
                    label="Title"
                    name="title"
                    onChange={this.updatePageData}
                />
                <TextField
                    defaultValue={page.filename}
                    label="Filename"
                    name="filename"
                    onChange={this.updatePageData}
                />
                <TextArea
                    defaultValue={page.summary}
                    label="Summary"
                    name="summary"
                    onChange={this.updatePageData}
                />
                <TextArea
                    className={styles.contentField}
                    defaultValue={page.content}
                    label="Content"
                    name="content"
                    onChange={this.updatePageData}
                />

                <div className={styles.actions}>
                    <Button
                        disabled={isChanged === false}
                        onClick={this.handleSubmit}
                        type="submit"
                    >
                        {verb} Page
                    </Button>

                    {deleteButton}
                </div>
            </form>
        );
    }

    render() {
        let {isLoaded, isNew} = this.state;
        let title = (isNew) ? 'Create a New Page' : 'Edit Page';
        let content = null;

        if (isLoaded) {
            content = (
                <div className={styles.details}>
                    {this.renderForm()}
                </div>
            );
        }

        return (
            <div className={styles.wrapper}>
                <Title>{title}</Title>
                <div>
                    <Link to="/pages" className="button">Cancel</Link>
                </div>
                {content}
            </div>
        );
    }
}

export default withRouter(Page);
