const axios = require('axios');
const movieList = document.querySelector('#movie-list');
const detailList = document.querySelector('#detail-list');

let movies, movieDetails;

const renderMovies = () => {
  const html = movies.map(movie => {
    return `
      <li>
        <a href='#${movie.id}'>
          ${movie.title}
        </a>
      </li>
    `;
  }).join('');
  movieList.innerHTML = html;
};

const renderMovieDetails = () => {
  const html = movieDetails.map(movieDetail => {
    return `
      <li>
        <b>Release Year</b>: ${movieDetail.releaseyear}<br>
        <b>Description</b>: ${movieDetail.description}<br>
        <b>Rating</b>: ${movieDetail.rating}
      </li>
    `;
  }).join('');
  detailList.innerHTML = html;
}

const fetchMovieDetails = async() => {
  const movieId = window.location.hash.slice(1);
  movieDetails = (await axios.get(`/api/movies/${movieId}/details`)).data;
  renderMovieDetails();
}

window.addEventListener('hashchange', async() => {
  renderMovies();
  fetchMovieDetails();
});

const setup = async()=> {
  movies = (await axios.get('/api/movies')).data;
  renderMovies();
};

setup();
