import React from 'react'

import { BOOK_SHELVES } from './config'

class Book extends React.Component {
    state = {
        shelf: this.props.shelf
    };

    handleShelfChange(event) {
        let newShelf = event.target.value;
        this.setState({shelf: newShelf});
        this.props.onShelfChange(this.props.id, newShelf);
    }

    render() {
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${this.props.imageLinks.smallThumbnail}")`
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
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">{this.props.authors.join(', ')}</div>
            </div>
        );
    }
}

export default Book


