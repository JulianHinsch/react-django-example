import React from 'react';
import axios from 'axios';
import moment from 'moment';

import styles from './BookTable.module.scss';

export default class BookTable extends React.Component {

    state = {
        loading: true,
        books: [],
        authors: [],
        error: null,
    }

    async componentDidMount() {
        try {
            const [ books, authors ] = await Promise.all([
                axios.get('/api/books?format=json'),
                axios.get('/api/authors?format=json'),
            ]);
            this.setState({ loading: false, books: books.data, authors: authors.data });
        } catch (error) {
            this.setState({ error });
        }
    }

    render() {
        return this.state.loading ? 
            <p>Loading...</p>
        : this.state.error ? 
            <p>Oops! Something went wrong.</p>
        : (
            <table className={styles.book_table}>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Date Published</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.books.map((book, key) => (
                        <tr key={key}>
                            <td>{book.title}</td>
                            <td>{this.state.authors.find(author => author.id === book.author).name}</td>
                            <td>{moment(book.date_published).format('MMMM Do, YYYY')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )
    }
}