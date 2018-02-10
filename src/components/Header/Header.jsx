import React, {Component} from 'react';
import classnames from 'classnames';
import {Link, NavLink} from 'react-router-dom';

import styles from './Header.css';


// exported in case wanna use this anywhere else
export const NAV_ITEMS = [
    {
        classHook: 'pages',
        href: '/pages',
        name: 'Pages',
    },
    {
        classHook: 'tags',
        href: '/tags',
        name: 'Tags',
    },
    {
        classHook: 'Info',
        href: '/info',
        name: 'Info',
    }
];


export default class Header extends Component {

    renderNavItem = (navItem, index) => {
        let {classHook, href, name} = navItem;
        let itemClasses = classnames(
            styles.navItem,
            styles[classHook],
        );

        return (
            <li className={itemClasses} key={`nav-${classHook}-${index}`}>
                <NavLink to={href} className={styles.navLink}>
                    {name}
                </NavLink>
            </li>
        );
    }

    render() {
        let dashboardLinkStyles = classnames(
            styles.navLink,
            styles.dashboard,
            styles.branding,
        );

        return (
            <header className={styles.wrapper}>
                <div className={styles.content}>
                    <Link to="/" className={dashboardLinkStyles}>Dashboard</Link>

                    <nav className={styles.nav}>
                        <ul className={styles.navMenu}>
                            {NAV_ITEMS.map(this.renderNavItem)}
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}
