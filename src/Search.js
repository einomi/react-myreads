import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from "./Book";

class Search extends React.Component {
    state = {
        results: []
    };

    handleInputChange(e) {
        let query = e.target.value;
        if (!query) {
            this.setState({results: []});
            return;
        }
        BooksAPI.search(query).then((data) => {
            if (data.hasOwnProperty('error')) {
                this.setState({results: []});
                return;
            }
            this.setState({results: data});
        });
    }

    handleShelfChange() {

    }

    render() {
        return (<div className="search-books">
            <div className="search-books-bar">
                <Link to="/" className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                     <input type="text" placeholder="Search by title or author" onChange={this.handleInputChange.bind(this)} />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {this.state.results.map((book, index) => {
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