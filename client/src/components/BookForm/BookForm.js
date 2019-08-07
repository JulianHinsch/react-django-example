import React from 'react';
import axios from 'axios';

import styles from './BookForm.module.scss';

export default class BookForm extends React.Component {
    
    state = {
        loading: true,
        error: null,
        authors: [],
        title: '',
        author: '',
        datePublished: '',
    }

    async componentDidMount() {
        try {
            const result = await axios.get('/api/authors?format=json');
            this.setState({ loading: false, authors: result.data });
        } catch (error) {
            this.setState({ error });
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            'title': this.state.title,
            'author_id': this.state.author,
            'date_published': this.state.datePublished,
        }
        try {
            axios.post('/api/books/', data);
            this.props.history.push('/');
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
            <form className={styles.book_form} onSubmit={this.handleSubmit}>
                <h2>New Book</h2>
                <label htmlFor='title'>Title</label>
                <input type='text' name='title' required value={this.state.title} onChange={this.handleChange}/>
                <label htmlFor='author'>Author</label>
                <select name='author' required value={this.state.author} onChange={this.handleChange}>
                    <option disabled></option>
                    {this.state.authors.map((author, key) => (
                        <option key={key} value={author.id}>{author.name}</option>
                    ))}
                </select>
                <label htmlFor='datePublished'>Date Published</label>
                <input type='date' name='datePublished' required value={this.state.datePublished} onChange={this.handleChange}/>
                <button type='submit'>Submit</button>
                <button type='reset'>Reset</button>
            </form>
        )
    }
}