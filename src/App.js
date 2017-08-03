import React from 'react'

import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import './App.css'
import {BOOK_SHELVES} from './config'

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        books: [],
        showSearchPage: false
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
                {this.state.showSearchPage ? (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <a className="close-search" onClick={() => this.setState({showSearchPage: false})}>Close</a>
                            <div className="search-books-input-wrapper">
                                {/*
                                 NOTES: The search from BooksAPI is limited to a particular set of search terms.
                                 You can find these search terms here:
                                 https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                                 However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                                 you don't find a specific author or title. Every search is limited by search terms.
                                 */} <input type="text" placeholder="Search by title or author"/>

                            </div>
                        </div>
                        <div className="search-books-results">
                            <ol className="books-grid"></ol>
                        </div>
                    </div>
                ) : (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                {BOOK_SHELVES.map((shelf, index) => {
                                    let books = this.state.books.filter((book) => {
                                        return book.shelf === shelf.id;
                                    });
                                    return <BookShelf key={index} name={shelf.name} books={books} onBookShelfChange={this.handleBookShelfChange} />;
                                })}
                            </div>
                        </div>
                        <div className="open-search">
                            <a onClick={() => this.setState({showSearchPage: true})}>Add a book</a>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default BooksApp
