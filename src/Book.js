import React from 'react'

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
                        <select onChange={this.handleShelfChange.bind(this)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.title}</div>
                <div className="book-authors">Harper Lee</div>
            </div>
        );
    }
}

export default Book


