import React from 'react';

const MovieDetails = (props) => {
    return ( 
        <div className="row">
            <h3>{`Movie - ${props.match.params.id}`}</h3>
        </div>
    );
}
 
export default MovieDetails;