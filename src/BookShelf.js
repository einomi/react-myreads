import React from 'react'
import sortBy from 'sort-by'
import PropTypes from 'prop-types'

import Book from './Book'

class BookShelf extends React.Component {
    static propTypes = {
        name: PropTypes.string,
        books: PropTypes.array,
        onBookShelfChange: PropTypes.func
    };

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.sort(sortBy('title')).map((book, index) => {
                            return (
                                <li key={book.id}>
                                    <Book bookObj={book} onShelfChange={this.props.onBookShelfChange} />
                                </li>
                            );
                        })}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookShelf


