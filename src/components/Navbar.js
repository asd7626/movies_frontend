import React, {useState, useEffect} from "react"
import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap"
import { Link } from "react-router-dom"


const NavBar = () => {

  const [genres, setGenres] = useState([]);
    
    const getGenres = async () => {
        const response = await fetch(`http://127.0.0.1:8000/genre`);
        const objects = await response.json();    
        console.log(objects);
        setGenres(objects);
    }

    useEffect(() => {
      getGenres();
  }, []);


    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="/">Home</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href="/popular">Popular</Nav.Link>
      
      
    </Nav>
    <Nav>
      <NavDropdown title="Genres" id="collasible-nav-dropdown">
        {genres.map((genre) => {
          return (
          <NavDropdown.Item href={'/genre/' + genre.name}>{genre.name}</NavDropdown.Item>
          )
        })}
        
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
    )
}

export default NavBar;