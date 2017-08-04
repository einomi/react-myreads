import React from 'react'
import { Link } from 'react-router-dom'

import BookShelf from './BookShelf'
import { BOOK_SHELVES } from './config'

class BookList extends React.Component {
    render() {
        return (<div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    {BOOK_SHELVES.map((shelf, index) => {
                        let books = this.props.books.filter((book) => {
                            return book.shelf === shelf.id;
                        });
                        return <BookShelf key={index} name={shelf.name} books={books} onBookShelfChange={this.props.onBookShelfChange} />;
                    })}
                </div>
            </div>
            <div className="open-search">
                <Link to="/search">Add a book</Link>
            </div>
        </div>);
    }
}

export default BookList