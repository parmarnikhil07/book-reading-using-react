import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class MyReads extends Component {
  render(){
    let categories = {'currentlyReading':[],'wantToRead':[],'read':[]};
    this.props.books.map((item, i) => {
          var Author = item.authors && item.authors.map(function(auth, j) {
          return (
                  <div key={j} className="book-authors">{auth}</div>
              )
          });
          let book = (
              <li key={i}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + (item.imageLinks && item.imageLinks.smallThumbnail ? item.imageLinks.smallThumbnail : '') + '")' }}></div>
                    <div className="book-shelf-changer">
                      <select onChange={(event) => this.props.onUpdate(item,event.target.value)} value={item.shelf}>
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
          if(item.shelf === 'currentlyReading') {
            categories.currentlyReading[i] = book;
          } else if(item.shelf === 'wantToRead') {
            categories.wantToRead[i] = book;
          } else if(item.shelf === 'read') {
            categories.read[i] = book;
          }
          return categories;
      });
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {categories.currentlyReading}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {categories.wantToRead}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {categories.read}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a href="/search" onClick={(event) => this.props.searchData('')}>Add a book</a>
            </div>
          </div>

      </div>
    )
  }
}

export default MyReads
