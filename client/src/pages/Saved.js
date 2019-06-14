//import React and relative components
import React, { Component } from "react";
import Hero from "../components/Hero";
import Card from "../components/Card";
import Book from "../components/Book";
import Footer from "../components/Footer";
import API from "../utils/API";
import { Col, Row, Container } from "../components/Grid";
import { List } from "../components/List";
//class Saved extends React Component
class Saved extends Component {
  //set the initial state books as an empty arry
  state = {
    books: []
  };
//as the document.ready will run the this.getSavedBooks function
  componentDidMount() {
    this.getSavedBooks();
  }
//this mehod is from API
  getSavedBooks = () => {
    API.getSavedBooks()
      .then(res =>
        //after get back the data, setstate res.data to books []
        this.setState({
          books: res.data
        })
      )
      //err handling
      .catch(err => console.log(err));
  };

  handleBookDelete = id => {
    //this method will run the API.deleteBook passing the id,when comeback, run getSavedBooks()
    API.deleteBook(id).then(res => this.getSavedBooks());
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
          <Hero backgroundImage="https://cache.desktopnexus.com/cropped-wallpapers/2175/2175713-1920x1080-[DesktopNexus.com].jpg?st=9t59p2hUES0veZd7m-c_6Q&e=1560488417">                      
                  <h1 className="text-center">
                    <strong>(React) Google Books Search</strong>
                  </h1>
                  <h2 className="text-center">Search for and Save Books of Interest.</h2>           
              </Hero>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
          {/* //render the books list  */}
            <Card title="Saved Books" icon="download">

              {this.state.books.length ? (
                //if the.state books is not empty render the books in ul using the map
                <List>
                  {this.state.books.map(book => (
                    <Book
                      key={book._id}
                      title={book.title}
                      subtitle={book.subtitle}
                      link={book.link}
                      authors={book.authors.join(", ")}
                      description={book.description}
                      image={book.image}
                      Button={() => (
                        <button
                        // handleBookDelete onClick
                          onClick={() => this.handleBookDelete(book._id)}
                          className="btn btn-danger ml-2"
                        >
                          Delete
                        </button>
                      )}
                    />
                  ))}
                </List>
                //if books arry is ampty, show the message"No Saved Books"
              ) : (
                <h2 className="text-center">No Saved Books</h2>
              )}
            </Card>
          </Col>
        </Row>
        <Footer />
      </Container>
    );
  }
}

export default Saved;
