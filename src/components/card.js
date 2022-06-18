import React, { useState, useEffect } from 'react'
import {Card, ListGroup, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MovieCard = ({movie_item}) => {

  const director_name = movie_item.director_name;
  const genre_name = movie_item.genre_name;

  const [director, setDirector] = useState({});
  const [genre, setGenre] = useState({});

  const getDirector_Genre = async () => {
    const first_response = await fetch(`http://127.0.0.1:8000/director/${director_name}`);
    const first_object = await first_response.json();  
    setDirector(first_object);
    console.log(first_object);
    
    const second_response = await fetch(`http://127.0.0.1:8000/genre/${genre_name}`);
    const second_object = await second_response.json();
    setGenre(second_object);  
    
}

  useEffect(() => {
    getDirector_Genre();
  }, []);

  
  

    return (
      
      <Card style={{width: '16rem'  , margin: '25px 0' }}>
        <Link to={'/movie/' + movie_item.id}>
        <Card.Img variant="top" src={movie_item.cover} style={{height: '25rem'}}/>
        </Link>
        <Card.Body>
          <Card.Title style={{fontSize: '28px', fontWeight: 'bold'}}>{movie_item.title}</Card.Title>
          <Card.Text> Genre: {movie_item.genre_name} </Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item> Director: {movie_item.director_name}</ListGroup.Item>
        </ListGroup>
        
      </Card>
      
      
    );
  }
  
  export default MovieCard;