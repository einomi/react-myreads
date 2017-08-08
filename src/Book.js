import React from 'react'
import PropTypes from 'prop-types'

import { BOOK_SHELVES } from './config'

class Book extends React.Component {
    static propTypes = {
        bookObj: PropTypes.object,
        onShelfChange: PropTypes.func,
        onAddBook: PropTypes.func
    };

    handleShelfChange(e) {
        let newShelf = e.target.value;
        this.props.onShelfChange(this.props.bookObj, newShelf);
    }

    render() {
        const bookObj = this.props.bookObj;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ backgroundImage: `url("${bookObj.imageLinks.smallThumbnail}")` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.handleShelfChange.bind(this)} defaultValue={bookObj.shelf || 'none'}>
                            <option value="none" disabled>Move to...</option>
                            {BOOK_SHELVES.map((shelf, index) => {
                                return <option key={index} value={shelf.id}>{shelf.name}</option>;
                            })}
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{bookObj.title}</div>
                <div className="book-authors">{bookObj.authors ? bookObj.authors.join(', ') : ''}</div>
            </div>
        );
    }
}

export default Book


