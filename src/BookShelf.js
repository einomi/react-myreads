import React from 'react'

import Book from './Book'

class BookShelf extends React.Component {
    state = {
        books: this.props.books
    };

    componentWillReceiveProps(nextProps) {
        this.setState({books: nextProps.books});
    }

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.name}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.state.books.map((book, index) => {
                            return (
                                <li key={index}>
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


