import React, {Component} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom';
import Title from 'Components/Title';
import TextField from 'Components/Form/TextField';
import TextArea from 'Components/Form/TextArea';
import Button from 'Components/Button';
import noop from 'Utils/noop';

import styles from './Tag.css';


class Tag extends Component {

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

    constructor(props) {
        super(props);

        this.state = {
            allTags: null,
            isChanged: false,
            isLoaded: false,
            isNew: false,
        };
    }

    componentDidMount() {
        let {tagId} = this.props.match.params;

        if (tagId === 'new') {
            this.setState({
                isLoaded: true,
                isNew: true,
                tag: {},
            });

        } else {
            axios.get('/api/tag/' + tagId)
                .then(({data}) => {
                    this.setState({
                        isLoaded: true,
                        tag: data,
                    });
                })
                .catch(() => {
                    this.props.notify(
                        'error',
                        'Could not retrieve tags. Try refreshing the page.'
                    );

                    this.setState({
                        isLoaded: true,
                    });
                });
        }
    }

    createTag = (tagData) => {
        axios.post('/api/tags', tagData)
            .then(() => {
                this.props.notify('confirmation', 'Tag created.');
                this.props.history.push('/tags');
            })
            .catch(({response}) => {
                this.props.notify(
                    'error',
                    `Could not create tag. ${response.data}.`
                );
            });
    }

    updateTag = (id, tagData) => {
        axios.put('/api/tag/' + id, tagData)
            .then(() => {
                this.props.notify('confirmation', 'Tag updated.');
                this.props.history.push('/tags');
            })
            .catch(({response}) => {
                this.props.notify(
                    'error',
                    `Could not update tag. ${response.data}.`
                );
            });
    }

    deleteTag = () => {
        let {tagId} = this.props.match.params;

        axios.delete('/api/tag/' + tagId)
            .then(() => {
                this.props.notify('confirmation', 'Tag deleted.');
                this.props.history.push('/tags');
            })
            .catch(({response}) => {
                this.props.notify(
                    'error',
                    `Could not delete tag. ${response.data}.`
                );
            });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let {id, ...tagData} = this.state.tag;

        if (id) {
            this.updateTag(id, tagData);
        } else {
            this.createTag(tagData);
        }
    }

    renderTagForm = () => {
        let {isChanged, isNew, tag} = this.state;
        let verb = 'Create';
        let deleteButton = null;

        if (isNew === false) {
            verb = 'Update';
            deleteButton = (
                <Button
                    onClick={this.deleteTag}
                    type="button"
                    variant="secondary"
                >
                    Delete Tag
                </Button>
            );
        }

        return (
            <form name="tagForm" onSubmit={this.handleSubmit}>
                <TextField
                    defaultValue={tag.name}
                    label="Name"
                    name="name"
                    onChange={this.updateTagValue}
                />
                <TextField
                    defaultValue={tag.slug}
                    label="Slug"
                    name="slug"
                    onChange={this.updateTagValue}
                />
                <TextArea
                    defaultValue={tag.description}
                    label="Description"
                    name="description"
                    onChange={this.updateTagValue}
                />

                <div className={styles.actions}>
                    <Button
                        disabled={isChanged === false}
                        onClick={this.handleSubmit}
                        type="submit"
                    >
                        {verb} Tag
                    </Button>

                    {deleteButton}
                </div>
            </form>
        );
    }

    updateTagValue = (e) => {
        let {name, value} = e.target;
        let tag = Object.assign({}, this.state.tag);

        tag[name] = value;
        this.setState({
            isChanged: true,
            tag
        });
    }

    render() {
        let {isLoaded, isNew} = this.state;
        let title = (isNew) ? 'Create a New Tag' : 'Edit Tag Details';
        let content = null;

        if (isLoaded) {
            content = (
                <div className={styles.details}>
                    {this.renderTagForm()}
                </div>
            );
        }

        return (
            <div className={styles.wrapper}>
                <Title>{title}</Title>
                <div>
                    <Link to="/tags" className="button">Cancel</Link>
                </div>
                {content}
            </div>
        );
    }
}

export default withRouter(Tag);
