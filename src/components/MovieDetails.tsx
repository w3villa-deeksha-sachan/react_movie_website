import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../Allcss/MovieDetails.css";

const API_KEY = "3f382146";

const MovieDetail: React.FC = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<any>(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  const back =() =>{
    navigate('/home');
  };

  return (
    <div className="w">
      {movie ? (
        <div className="det">
          <h1>{movie.Title}</h1>
          <div className="all">
          <div className="poster">
          <img src={movie.Poster} alt={movie.Title} />
          </div>
          <div className="poster-detail">
          <p>Plot: {movie.Plot}</p>
          <p>Released: {movie.Released}</p>
          <p>Genre: {movie.Genre}</p>
          <p>Directior: {movie.Director}</p>
          <p>Writer: {movie.Writer}</p>
          <p>Actors: {movie.Actors}</p>

          </div>
          </div>
          <button onClick={back} className="back-btn"> Back </button>
         
        </div>
      ) : (
        <p>Loading movie details...</p>
      )}
      
     
     
    </div>
  );
};

export default MovieDetail;

