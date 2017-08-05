import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearchPage: this.props.showSearchPage,
      books:[],
      searchBooks:[],
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.getAll = this.getAll.bind(this);
    this.searchData = this.searchData.bind(this);
  }

  /**
  * @description Get value from the text field and make search API call and set status accordingly.
  * @param {string} value - the value of searched texbox
  */

  searchData = (value) => {
      if (value.length !== 0) {
        BooksAPI.search(value, 10).then((books) => {
          if(books.length>0){
            this.setState({searchBooks:books})
          }
          else{
            this.setState({searchBooks: []})
          }
        })
      } else {
        this.setState({searchBooks: [], showSearchPage: true})
      }
    }

  /**
  * @description Call Get all API and set them as state with categories
  */
  componentDidMount(e){
    if(this.state.books.length === 0) {
      BooksAPI.getAll().then(
        function( books ) {
          if(books.length>0){
            this.setState({books:books})
          }
      }.bind(this));
    }
  }

  /**
  * @description When getAll is called, set showSearchPage to false
  */
  getAll(e){
    this.setState({ showSearchPage: false });
    this.componentDidMount();
  }

  /**
  * @description Update Books shelf using call of Update API and setState
  * @param {obj} item - the object of book
  * @param {string} value - shelf value
  */
  update(item, value) {
    var books = this.state.books;
    BooksAPI.update(item, value).then(function(response){
      var index = '';
      books.forEach(function(s, sidx) {
        if(item.id === s.id) {
          index = sidx;
        }
      });
      if(index) {
          books[index].shelf = value;
      } else {
        item.shelf = value;
        books.push(item);
      }
      this.setState({books});
    }.bind(this));
  }

  render() {
    let categories = {'currentlyReading':[],'wantToRead':[],'read':[]};
    if(this.state.showSearchPage === false) {
      this.state.books.map((item, i) => {
          var Author = item.authors && item.authors.map(function(auth, j) {
          return (
                  <div key={j} className="book-authors">{auth}</div>
              )
          });
          const book = (
              <li key={i}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("' + (item.imageLinks && item.imageLinks.smallThumbnail ? item.imageLinks.smallThumbnail : '') + '")' }}></div>
                    <div className="book-shelf-changer">
                      <select onChange={(event) => this.update(item,event.target.value)} value={item.shelf}>
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
    }

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a href="#" className="close-search" onClick={this.getAll}>Close</a>
              <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" onChange={(event) => this.searchData(event.target.value)}/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {
                  this.state.searchBooks && this.state.searchBooks.length > 0 &&
                      this.state.searchBooks.map((item, i) => {
                          var Author = item.authors && item.authors.map(function(auth, j) {
                          return (
                                  <div key={j} className="book-authors">{auth}</div>
                              )
                          });
                          var result = this.state.books.find((s) => s.id === item.id);
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
                                      <select onChange={(event) => this.update(item,event.target.value)} value={shelf !== '' ? shelf : item.shelf}>
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
        ) : (
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
              <a href="#/search" onClick={(event) => this.searchData('')}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
