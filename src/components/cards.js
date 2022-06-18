import React, {useState, useEffect, Fragment} from 'react'
import MovieCard from './card'
import {Container, Row, Col, Button} from 'react-bootstrap';

const MovieCards = ({movie_list}) => {
    const [visible, setVisible] = useState(12);
    const [width, setWidth] = useState(window.innerWidth);

    function changeWindowSize() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize", changeWindowSize);
        return () => {
          window.removeEventListener("resize", changeWindowSize);
        };
      }, [width]);

    const viewMoreEvents = () => {
        setVisible((prev) => prev + 8);
    }

    const style_gt_904 = {
        display:'flex', justifyContent: 'start', alignItems:'center', flexWrap: 'wrap'
    }

    const style_lt_904 = {
        display:'flex', justifyContent: 'center', alignItems:'center', flexWrap: 'wrap'
    }

    return (
        <Fragment>
        <Container fluid style={width < 904 ? style_lt_904 : style_gt_904}>
            
            {movie_list.slice(0, visible).map((movie_item) => {  
                return (
                    <div style={{margin: '10px 25px'}}>
                        <MovieCard movie_item={movie_item} /> 
                    </div>
                    
                )   
                })}
                
                
            
        </Container>
        {movie_list.length > 0 && visible >= movie_list.length? 
                <p style={{fontSize: 30+'px', fontWeight:700, color: '#fff', textAlign:'center' }}>That's all here :)</p> :
                <div style={{display: 'flex', justifyContent:'center'}}>
                    <Button style={{width:'150px', height:'70px', fontSize:'30px' ,fontWeight:'600'}} variant="info" onClick={viewMoreEvents}>More({movie_list.length - visible})</Button> 
                </div> }
        </Fragment>
    )
     
}

export default MovieCards;