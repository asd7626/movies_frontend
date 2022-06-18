import React,  {useState, useEffect, Fragment} from 'react';
import { Container, Row, Col, Card, Form, Button, Alert} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Pag from './pagination';

const MovieDetail = () => {

    const [movie, setMovie] = useState({});
    const [comments, setComments] = useState([]);
    const [width, setWidth] = useState(window.innerWidth);
    const [comment, setComment] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [commentsPerPage, setCommentsPerPage] = useState(5);
    const [directorName, setDirectorName] = useState('');
    const [director, setDirector] = useState({});
    const [error, setError] = useState(false);
    
    let params = useParams();

    function changeWindowSize() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener("resize", changeWindowSize);
        return () => {
          window.removeEventListener("resize", changeWindowSize);
        };
      }, [width]);
      
      
    const getMovie = async () => {
        const movieID = parseInt(params.movieID);

        const response = await fetch(`http://127.0.0.1:8000/movie/${movieID}`);
        const object = await response.json();
        setMovie(object);
        setComments(object.comments);
        setDirectorName(object.director_name);
        getDirector(object.director_name);
    }

    const getDirector = async (name) => {
        const response = await fetch(`http://127.0.0.1:8000/director/${name}`);
        const object = await response.json();  
        setDirector(object);
        console.log(object);
    }

    const scrollUp = () => {
        window.scrollTo({top: 0, behavior:'smooth'});
        console.log('scrolling up')
    }
    useEffect(() => {
        getMovie();
        if (window.scrollY > 1) {
            scrollUp();
        }
    }, []);

    

    const handleOnChange = (e) => {
        setComment(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(comment.length === 0) {
            setError(true);
            return;
        }
    
        const requestOptions = {
            method:'POST',
            headers: {'Content-Type': 'application/json'},
            
            body: JSON.stringify({
                text: comment,
                movie_id: movie.id
            }),
        };
        fetch('http://127.0.0.1:8000/comment', requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data))
        setComments([...comments, comment]);
        setComment('');
        
        }

    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    
    return (
        
        <Container style={{color: '#fff'}}>

            {width > 991? 
            <Row style={{margin: '25px 0'}}>
                <Col>
                    <Card.Img variant="top" src={movie.cover} />
                </Col>

                <Col style={{textAlign:'center'}}>
                    <h3>{movie.title}</h3>
                    <h6>Director: {movie.director_name}</h6>
                    <h6>------------------------------------</h6>
                    <h6>Stars: {movie.cast}</h6>
                    <h6>------------------------------------</h6>
                    <h6>Year: {movie.year}</h6>
                    <h6>------------------------------------</h6>
                    <h6>Country: {movie.country}</h6>
                    <h6>------------------------------------</h6>
                    <h6>Genre: {movie.genre_name}</h6>
                    <h6>------------------------------------</h6>
                    <h6>Rating: {movie.rating}/10 (IMDB)</h6>
                    <h6>------------------------------------</h6>
                    <h6>Budget: ${movie.budget} million</h6>
                    <h6>------------------------------------</h6>
                    <h6>Language: {movie.language}</h6>
                    <h6>------------------------------------</h6>
                </Col>
            </Row> :

            <Row style={{margin: '25px 0'}}>
            <Col style={{textAlign:'center'}}>
                <Card.Img variant="top" src={movie.cover} />
                <br/> <br/>
                <h3>{movie.title}</h3>
                    <h6>Director: {movie.director_name}</h6>
                    <h6>------------------------------------</h6>
                    <h6>Stars: {movie.cast}</h6>
                    <h6>------------------------------------</h6>
                    <h6>Year: {movie.year}</h6>
                    <h6>------------------------------------</h6>
                    <h6>Country: {movie.country}</h6>
                    <h6>------------------------------------</h6>
                    <h6>Genre: {movie.genre_name}</h6>
                    <h6>------------------------------------</h6>
                    <h6>Rating: {movie.rating}/10 (IMDB)</h6>
                    <h6>------------------------------------</h6>
                    <h6>Budget: ${movie.budget} million</h6>
                    <h6>------------------------------------</h6>
                    <h6>Language: {movie.language}</h6>
                    <h6>------------------------------------</h6>
            </Col>
            </Row> }

            <Row>
                <h3>Description</h3>
                <h6>{movie.description}</h6>
                
            </Row>

            <Row>
                <h3>Director</h3>
                <h6>{director.biography}</h6>
                
            </Row>
            
            {comments.length > 0?
            
            <Row style={{marginTop: '25px'}}>
                
                <h3>Commentaries</h3>
                {currentComments.map((comm) => {
                    return (
                        <Card style={{color: '#fff', paddingLeft: '0', paddingRight: '0'}}>
                            <Card.Header style={{backgroundColor: '#000', color: '#fff'}}>Somebody said:    </Card.Header>
                            <Card.Body>
                                <blockquote className="blockquote mb-0">
                                <p style={{color: '#000'}}>
                                    {comm}
                                </p>
                                
                                </blockquote>
                            </Card.Body>
                        </Card>
                    )
                })}

                <Pag currentPage={currentPage} commentsPerPage={commentsPerPage} totalComments={comments.length} paginate={paginate}></Pag>
            
            </Row>
             : <Fragment/> } 
            <br/> 
            <Row>
                
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label> <h4>Leave your comment </h4></Form.Label>
                        <Form.Control onChange={(e) => handleOnChange(e)} type="text" name="comment" value={comment} placeholder="Leave your comment" />
                        <Button onClick={(e) => handleSubmit(e)} type="button" variant="info" style={{marginTop: '10px'}} >Send</Button>
                        <br/> <br/>
                        {error === true && <Alert onClose={() => setError(false)} dismissible variant="danger">Empty Comment</Alert>}
                    </Form.Group>
                </Form>
            </Row>

            
        </Container>
    )
}



export default MovieDetail;