
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Movie } from "../types/homeAuth";
import "../Allcss/Home.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const API_KEY = "3f382146";
const MAX_PAGES = 4;

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(() => localStorage.getItem("searchQuery") || "Avengers");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number>(0);

  const navigate = useNavigate();
  const { logout, user } = useAuth(); // Access the user object from AuthContext

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    fetchMovies(searchQuery, currentPage);
  }, [searchQuery, currentPage]);

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);

  const fetchMovies = async (query: string, page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&page=${page}`
      );
      console.log("API Response:", response.data);

      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        setTotalResults(parseInt(response.data.totalResults, 10)); // Store the total results count
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (movieId: string) => {
    navigate(`/movies/${movieId}`);
  };

  const handleNextPage = () => {
    if (currentPage < MAX_PAGES) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="z">
      <div className="header">
        {user && (
          <div className="user-info">
            <p>Welcome, {user.name}</p>
          </div>
        )}
        <h1>movieHaven</h1>
      </div>
      <button className="rbtn" onClick={handleLogout}>Logout</button>

      <div className="container">
        <div className="search-bar">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="pop">
              <h3>Popular Movies</h3>
            </div>
            <div className="car">
              {movies.length > 0 ? (
                movies.map((movie) => (
                  <div
                    key={movie.imdbID}
                    onClick={() => handleCardClick(movie.imdbID)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="card h-100">
                      <img src={movie.Poster} className="card-img-top" alt={movie.Title} />
                      <div className="card-body">
                        <h5 className="card-title">{movie.Title}</h5>
                        <p className="card-text">Year: {movie.Year}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No movies found.</p>
              )}
            </div>

            {/* Pagination Controls */}
            {movies.length > 0 && (
              <div className="pagination-controls">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
                <span>Page {currentPage} of {Math.min(MAX_PAGES, Math.ceil(totalResults / 10))}</span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage >= MAX_PAGES || currentPage >= Math.ceil(totalResults / 10)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
