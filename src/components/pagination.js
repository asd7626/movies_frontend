import React from "react";
import { Pagination } from "react-bootstrap";


const Pag = ({commentsPerPage, totalComments, paginate, currentPage}) => {
    const pageNumbers = [];
    

    for (let i = 1; i <= Math.ceil(totalComments / commentsPerPage); i++) {
        pageNumbers.push(
            <Pagination.Item key={i}  onClick={() => paginate(i)}  active={i === currentPage}>
                {i}
            </Pagination.Item>
        );
    }
    
    return (
        <Pagination style={{display: 'flex', justifyContent:'center', marginTop: '15px'}} >{pageNumbers}</Pagination>
    )


}


export default Pag;