import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import MovieCards from './cards';
import { Spinner } from 'react-bootstrap';

const PopularMovies = () => {

    const [popularMovies, setPopularMovies] = useState([]);
    
    const getPopularMovies = async () => {
        const response = await fetch("http://127.0.0.1:8000/movie/popular");
        const objects = await response.json();
        console.log(objects);    
        setPopularMovies(objects);
    }

    useEffect(() => {
        getPopularMovies();
    }, []);
    console.log(popularMovies);
    
    return (
        <Fragment>
        {popularMovies.length === 0? <div style={{ height:'100vh', display:'flex', justifyContent:'center', alignItems:'center'}}> <Spinner animation="grow" variant="info" /> </div>:  <MovieCards movie_list={popularMovies}> </MovieCards> }
        </Fragment>
    )
}

export default PopularMovies;