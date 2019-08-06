import React from 'react';
import axios from 'axios';
import moment from 'moment';

import styles from './App.module.scss';

export default class App extends React.Component {

    state = {
        loading: true,
        books: [],
        error: null,
    }

    async componentDidMount() {
        try {
            const result = await axios.get('/api/books');
            this.setState({ loading: false, books: result.data });
        } catch (error) {
            this.setState({ error });
        }
    }

    render() {
        return (
            <div className={styles.app}>
                <h1>Books</h1>
                {this.state.loading ? 
                    'Loading...'
                : this.state.error ? 
                    'Oops! Something went wrong.'
                : (
                    <table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Date Published</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.books.map((book, i) => (
                                <tr key={i}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{moment(book.date_published).format('MMMM Do, YYYY')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        )
    }
}
