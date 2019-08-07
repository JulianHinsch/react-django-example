import React from 'react';
import { Link } from 'react-router-dom';
import Router from '../Router';

import styles from './App.module.scss';

export default class App extends React.Component {

    render() {
        return (
            <div className={styles.app}>
                <header>
                    <Link to='/'><h1>Books App</h1></Link>
                    <Link to='/new'>New Book</Link>
                </header>
                <Router/>
            </div>
        )
    }
}
