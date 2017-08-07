import React from 'react'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import PropTypes from 'prop-types'

import { debounce } from './utils'
import * as BooksAPI from './BooksAPI'
import Book from "./Book";

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.inputChangeDebounce = debounce((query) => {
            if (!query) {
                this.setState({results: []});
                return;
            }
            this.props.onShowSpinner();
            BooksAPI.search(query).then((data) => {
                this.props.onHideSpinner();

                if (data.hasOwnProperty('error')) {
                    this.setState({results: []});
                    return;
                }

                // Check if book is on a shelf
                data.forEach((book, index) => {
                   this.props.books.forEach(bookInState => {
                       if (book.id === bookInState.id) {
                           data[index].shelf = bookInState.shelf;
                       }
                   }) ;
                });

                this.setState({results: data});
            });
        }, 300);
    }

    static propTypes = {
        books: PropTypes.array,
        onBookShelfChange: PropTypes.func,
        onAddBook: PropTypes.func,
        onShowSpinner: PropTypes.func,
        onHideSpinner: PropTypes.func
    };

    state = {
        results: []
    };

    handleInputChange = e => {
        let query = e.target.value;
        this.inputChangeDebounce(query);
    };

    render() {
        return (<div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                     <input type="text" placeholder="Search by title or author" onChange={this.handleInputChange} />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {this.state.results.sort(sortBy('title')).map((book, index) => {
                        return (
                            <li key={index}>
                                <Book bookObj={book} onShelfChange={this.props.onBookShelfChange} onAddBook={this.props.onAddBook} />
                            </li>
                        );
                    })}
                </ol>
            </div>
        </div>);
    }
}

export default Search