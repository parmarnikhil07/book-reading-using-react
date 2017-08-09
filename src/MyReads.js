import React, { Component } from 'react'

class MyReads extends Component {
  render(){
    console.log(this.props.books);
    let categories = {'currentlyReading':[],'wantToRead':[],'read':[]};
    this.props.books.map((item, i) => {
          let Author = item.authors && item.authors.map(function(auth, j) {
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
      let bookshelf = {'currentlyReading':'Currently Reading','wantToRead':'Want to Read','read':'Read'}
      let bookDiv = [];
      let j = 0;
    return (
      <div className="app">
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {
                  Object.keys(bookshelf).forEach(function (key) {
                    let obj = bookshelf[key];
                    let book = (
                     <div key={key} className="bookshelf">
                       <h2 className="bookshelf-title">{obj}</h2>
                       <div className="bookshelf-books">
                         <ol className="books-grid">
                           {categories[key]}
                         </ol>
                       </div>
                     </div>
                     )
                     bookDiv[j++] = book;
                  })
                }
                {bookDiv}
              </div>
            </div>
            <div className="open-search">
              <a href="/search">Add a book</a>
            </div>
          </div>

      </div>
    )
  }
}

export default MyReads
