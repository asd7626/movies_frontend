import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import MovieCards from './cards';
import { Spinner } from 'react-bootstrap';

const Movies = () => {

    const [movies, setMovies] = useState([]);
    
    const getMovies = async () => {
        const response = await fetch(`http://127.0.0.1:8000/movie`);
        const objects = await response.json();    
        setMovies(objects);
    }

    useEffect(() => {
        getMovies();
    }, []);

    
    return (
       <Fragment>
        {movies.length === 0? <div style={{ height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}><Spinner animation="grow" variant="info" /> </div> : <MovieCards movie_list={movies}> </MovieCards>} 
        </Fragment>
    ) 

}

export default Movies;