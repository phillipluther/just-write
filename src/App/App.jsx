import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import classnames from 'classnames';

import Header from 'Components/Header';
import Notice from 'Components/Notice';
import Dashboard from './Dashboard';
import Tag from './Tag';
import Tags from './Tags';

import styles from './App.css';


const A11Y_TRIGGERS = ['ArrowUp', 'ArrowDown', 'Tab', 'Escape'];

export default class App extends Component {

    state = {
        isA11yActive: false,
        notice: {},
    }

    componentDidMount() {
        window.addEventListener('keydown', this.activateA11y);
    }

    activateA11y = ({key}) => {
        if (A11Y_TRIGGERS.indexOf(key) > -1) {
            window.removeEventListener('keydown', this.activateA11y);
            window.addEventListener('mousemove', this.deactivateA11y);

            this.setState({
                isA11yActive: true
            });
        }
    }

    deactivateA11y = () => {
        window.removeEventListener('mousemove', this.deactivateA11y);
        window.addEventListener('keydown', this.activateA11y);

        this.setState({
            isA11yActive: false
        });
    }

    provideNotifications = (Component) => {
        return <Component notify={this.setUserNotice} />;
    }

    clearUserNotice = () => {
        let notice = Object.assign({}, this.state.notice);
        notice.show = false;

        this.setState({notice});
    }

    setUserNotice = (type, message) => {
        let notice = {
            message,
            show: true,
            type,
        };

        this.setState({notice});
        setTimeout(() => this.clearUserNotice(), 10000);
    }

    render() {
        let appClasses = classnames(
            'app',
            {
                'a11y--active': this.state.isA11yActive,
            }
        );

        return (
            <BrowserRouter>
                <div className={appClasses}>
                    <Header />

                    <Notice {...this.state.notice} />

                    <main className={styles.main}>
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/tags" component={Tags} />
                        <Route path="/tag/:tagId" render={() => this.provideNotifications(Tag)} />
                    </main>
                </div>
            </BrowserRouter>
        );
    }
}
