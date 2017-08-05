import React, { Component } from 'react'

class Search extends Component {
  render(){
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a href="/" className="close-search">Close</a>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(event) => this.props.onSearch(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {
              this.props.searchBooks && this.props.searchBooks.length > 0 &&
                this.props.searchBooks.map((item, i) => {
                  var Author = item.authors && item.authors.map(function(auth, j) {
                  return (
                        <div key={j} className="book-authors">{auth}</div>
                    )
                  });
                  var result = this.props.books.find((s) => s.id === item.id);
                  var shelf = '';
                  if(result && result.shelf) {
                    shelf = result.shelf;
                  }
                  return (
                    <li key={i}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + (item.imageLinks && item.imageLinks.smallThumbnail ? item.imageLinks.smallThumbnail : '') + '")' }}></div>
                          <div className="book-shelf-changer">
                            <select onChange={(event) => this.props.onUpdate(item,event.target.value)} value={shelf !== '' ? shelf : item.shelf}>
                              <option value="none" disabled>Move to...</option>
                              <option value="currentlyReading">Currently Reading</option>
                              <option value="wantToRead">Want to Read</option>
                              <option value="read">Read</option>
                              <option value="none">None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{item.title}</div>
                          {Author}
                      </div>
                    </li>
                  )
                })
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
