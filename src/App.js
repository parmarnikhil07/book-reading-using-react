import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import MyReads from './MyReads'
import Search from './Search'
import './App.css'

class App extends React.Component {
  state = {
    showSearchPage: this.props.showSearchPage,
    books:[],
    searchBooks:[],
  }

  /**
  * @description Call Get all API and set them as state with categories
  */
  componentDidMount(e){
    if(this.state.books.length === 0) {
      BooksAPI.getAll().then(
        ( books ) => {
          if(books.length>0){
            this.setState({books})
          }
      });
    }
  }

  /**
  * @description Update Books shelf using call of Update API and setState
  * @param {obj} item - the object of book
  * @param {string} value - shelf value
  */
  update = (item, value) => {
    let books = this.state.books;
    BooksAPI.update(item, value).then(
      (response) => {
      let index = '';
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
    });
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

  render() {
    return (
    <div>
      <Route exact path='/' render={() => (
        <MyReads
        books={this.state.books}
        onUpdate={this.update}
      />)}
      />
    <Route path='/search' render={({ history}) => (
        <Search
          onSearch={this.searchData}
          onUpdate={this.update}
          searchBooks={this.state.searchBooks}
          books={this.state.books}
        />
      )}/>
    </div>
    )
  }
}

export default App
