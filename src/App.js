import React from 'react'
import { Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'
import Search from './Search'
import Spinner from './Spinner'

class BooksApp extends React.Component {
    state = {
        books: [],
        spinnerIsVisible: false
    };

    componentDidMount() {
        this.showSpinner();
        BooksAPI.getAll().then((books) => {
            this.setState({books});
            this.hideSpinner();
        });
    }

    showSpinner = () => {
        this.setState({spinnerIsVisible: true});
    };

    hideSpinner = () => {
        this.setState({spinnerIsVisible: false});
    };

    handleChangeShelf = (bookToChange, shelf) => {
        // Remove book if None value is selected
        if (shelf === 'none') {
            this.removeBook(bookToChange);
            return;
        }

        // Add book if it's current shelf is None
        if (bookToChange.shelf === 'none' || bookToChange.shelf === undefined) {
            bookToChange.shelf = shelf;
            this.updateShelfOnServer(bookToChange, shelf, () => {
                this.addBook(bookToChange);
            });
            return;
        }

        // Change shelf of existing book
        this.changeShelf(bookToChange, shelf);
    };

    removeBook = (bookToRemove) => {
        this.updateShelfOnServer(bookToRemove, 'none', () => {
            let newBooks = this.state.books.filter((book) => book.id !== bookToRemove.id);
            this.setState({books: newBooks});
        });
    };

    changeShelf = (bookToChange, shelf) => {
        this.updateShelfOnServer(bookToChange, shelf, () => {
            this.setState(state => {
                let newBooks = state.books.map(book => {
                    if (book.id === bookToChange.id) {
                        book.shelf = shelf;
                    }
                    return book;
                });
                return {books: newBooks};
            });
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

    updateShelfOnServer(book, shelf, callback) {
        this.showSpinner();
        BooksAPI.update(book, shelf).then(() => {
            callback();
            this.hideSpinner();
        }).catch((error) => {
            throw error;
        });
    }

    render() {
        return (
            <div className="app">
                <Spinner visible={this.state.spinnerIsVisible} />
                <Route path="/" exact render={() =>
                    <BookList
                        books={this.state.books}
                        onBookShelfChange={this.handleChangeShelf} />}
                />
                <Route path="/search" render={() =>
                    <Search
                        books={this.state.books}
                        onBookShelfChange={this.handleChangeShelf}
                        onAddBook={this.addBook}
                        onShowSpinner={this.showSpinner}
                        onHideSpinner={this.hideSpinner} />}
                />
            </div>
        );
    }
}

export default BooksApp
