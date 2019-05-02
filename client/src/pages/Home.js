//impot React, component from react
import React, { Component } from "react";
//import components which need in this file
import Jumbotron from "../components/Jumbotron";
import Card from "../components/Card";
import Form from "../components/Form";
import Book from "../components/Book";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";
//class Home has all the react component feature
class Home extends Component {
  // set the initial  state: books is set as an empty array, 
  //q is empty, and message is "Search For A Book To Begin!" at the booklists
  state = {
    books: [],
    q: "",
    message: "Search For A Book To Begin!"
  };
//handleInputChange 
  handleInputChange = event => {
    //deconstruction of event.tartget 
    const { name, value } = event.target;
    //setstate to the search and search input, will get the search input
    this.setState({
      [name]: value
    });
  };
//getBooks is a function, which will define in API file and it will hit and pass the {q} as title to the api to google the books
  getBooks = () => {
    // here catch the this.state.q as the search tilte passing to the route
    console.log(this.state.q)
    API.getBooks(this.state.q)
    //after get back from api
      .then(res =>
        {
          console.log(res.data);
          console.log("+++++++++++++");
        //setState, books to the res.data
        this.setState({
          books: res.data
        })
      }
      )
      //if nothing comback, setstate as; books is the an empty arry, and message "No books found"
      .catch(() =>
        this.setState({
          books: [],
          message: "No New Books Found, Try a Different Query"
        })
      );
  };
//submit event listener 
  handleFormSubmit = event => {
  
    event.preventDefault();
    //in this event, will hit the API, so here call this.getBooks function, which is define in API file 
    this.getBooks();
  };
//handleBookSave event will pass the book id here 
  handleBookSave = id => {
    //find the book in the books which id is the saved one
    //it can run the for loop to find that one 
    const book = this.state.books.find(book => book.id === id);
    console.log(id)
//then run saveBook function from API, pass googleID, title... as bookData in API file
    API.saveBook({
      googleId: book.id,
      title: book.volumeInfo.title,
      subtitle: book.volumeInfo.subtitle,
      link: book.volumeInfo.infoLink,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      image: book.volumeInfo.imageLinks.thumbnail
    }).then(() => this.getBooks());
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>(React) Google Books Search</strong>
              </h1>
              <h2 className="text-center">Search for and Save Books of Interest.</h2>
            </Jumbotron>
          </Col>
          <Col size="md-12">
            <Card title="Book Search" icon="far fa-book">
              <Form
                handleInputChange={this.handleInputChange}
                handleFormSubmit={this.handleFormSubmit}
                q={this.state.q}
              />
            </Card>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <Card title="Results">
              {this.state.books.length ? (
                <List>
                  {this.state.books.map(book => (
                    <Book
                      key={book.id}
                      title={book.volumeInfo.title}
                      subtitle={book.volumeInfo.subtitle}
                      link={book.volumeInfo.infoLink}
                      authors={book.volumeInfo.authors.join(", ")}
                      description={book.volumeInfo.description}
                      image={book.volumeInfo.imageLinks.thumbnail}
                      Button={() => (
                        <button
                          onClick={() => this.handleBookSave(book.id)}
                          className="btn btn-primary ml-2"
                        >
                          Save
                        </button>
                      )}
                    />
                  ))}
                </List>
              ) : (
                <h2 className="text-center">{this.state.message}</h2>
              )}
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Home;
