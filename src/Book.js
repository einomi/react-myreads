import React from 'react'

import { BOOK_SHELVES } from './config'

class Book extends React.Component {
    state = {
        shelf: this.props.bookObj.shelf
    };

    componentWillReceiveProps(nextProps) {
        this.setState({shelf: nextProps.bookObj.shelf});
    }

    handleShelfChange(e) {
        let newShelf = e.target.value;
        this.props.onShelfChange(this.props.bookObj, newShelf);
    }

    render() {
        const bookObj = this.props.bookObj;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${bookObj.imageLinks.smallThumbnail}")`
                    }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.handleShelfChange.bind(this)} defaultValue={this.state.shelf}>
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


