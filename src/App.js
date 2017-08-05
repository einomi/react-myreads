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

    handleChangeShelf = (bookToChange, shelf) => {
        // Remove book if None value is selected
        if (shelf === 'none') {
            this.removeBook(bookToChange);
            return;
        }

        // Add book if it's current shelf is None
        if (bookToChange.shelf === 'none') {
            bookToChange.shelf = shelf;
            BooksAPI.update({id: bookToChange.id}, shelf).then(() => {
                this.addBook(bookToChange);
            }).catch((error) => {
                throw error;
            });
            return;
        }

        // Change shelf of existing book
        this.changeShelf(bookToChange, shelf);
    };

    removeBook = (bookToRemove) => {
        BooksAPI.update({id: bookToRemove.id},'none').then(() => {
            let newBooks = this.state.books.filter((book) => book.id !== bookToRemove.id);
            this.setState({books: newBooks});
        }).catch((error) => {
            throw error;
        });
    };

    changeShelf = (bookToChange, shelf) => {
        BooksAPI.update({id: bookToChange.id}, shelf).then(() => {
            this.setState(state => {
                let newBooks = state.books.map(book => {
                    if (book.id === bookToChange.id) {
                        book.shelf = shelf;
                    }
                    return book;
                });
                return {books: newBooks};
            });
        }).catch((error) => {
            throw error;
        });
    };

    addBook = (bookToAdd) => {
        let bookExists = this.state.books.some((book) => book.id === bookToAdd.id);
        if (bookExists) {
            return;
        }

        let newBooks = this.state.books.concat(bookToAdd);
        this.setState({books: newBooks});
    };

    render() {
        return (
            <div className="app">
                <Route path="/" exact render={() => <BookList books={this.state.books} onBookShelfChange={this.handleChangeShelf} />} />
                <Route path="/search" render={() => <Search books={this.state.books} onBookShelfChange={this.handleChangeShelf} onAddBook={this.addBook} />} />
            </div>
        );
    }
}

export default BooksApp
