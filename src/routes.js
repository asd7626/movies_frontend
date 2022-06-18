import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Movies from './components/movies';
import MovieDetail from './components/movie-detail';
import PopularMovies from './components/popular';
import MoviesByGenre from './components/movies_by_genre';

const BaseRouter = () => (
    
        <Routes>
            <Route exact path ='/'  element={<Movies />} />   
            <Route exact path ='/popular'  element={<PopularMovies />} /> 
            <Route path ='/genre/:genreName'  element={<MoviesByGenre />} />       
            <Route path ='/movie/:movieID'  element={<MovieDetail />} />
             
        </Routes>   
    
)


export default BaseRouter;