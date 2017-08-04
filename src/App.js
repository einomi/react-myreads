import React from 'react'
import { Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import Search from './Search'

class BooksApp extends React.Component {
    state = {
        books: [],
    };

    componentDidMount() {
        BooksAPI.getAll().then((books) => this.setState({books}));
    }

    handleBookShelfChange = (id, shelf) => {
        this.setState(state => {
            // Remove book if None value is selected
            if (shelf === 'none') {
                let newBooks = this.state.books.filter((book) => book.id !== id);
                return {books: newBooks};
            }

            let newBooks = state.books.map(book => {
                if (book.id === id) {
                    book.shelf = shelf;
                }
                return book;
            });

            return {books: newBooks};
        });
    };

    render() {
        return (
            <div className="app">
                <Route path="/" render={() => <BookList books={this.state.books} onBookShelfChange={this.handleBookShelfChange} />} />
                <Route path="/search" render={() => <Search />} />
            </div>
        );
    }
}

export default BooksApp
