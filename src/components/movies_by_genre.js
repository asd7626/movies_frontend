import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import MovieCards from './cards';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

const MoviesByGenre = () => {

    const [moviesByGenre, setMoviesByGenre] = useState([]);
    
    let params = useParams();

    const getMoviesByGenre = async () => {
        const genreName = params.genreName;
        const response = await fetch(`http://127.0.0.1:8000/genre/${genreName}`);
        const object = await response.json();
        console.log(object);    
        setMoviesByGenre(object);
    }

    useEffect(() => {
        getMoviesByGenre();
    }, []);
    
    
    return (
        <Fragment>
        {moviesByGenre.length === 0? <div style={{ height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}> <Spinner animation="grow" variant="info" /> </div>:  <MovieCards movie_list={moviesByGenre}> </MovieCards> }
        </Fragment>
    )
}

export default MoviesByGenre;