import {openModal, getVoteColor} from "../Modal/Modal.js";
const API_KEY = "32ccb349a74920e218cca3e62608f9ab";
const container = document.getElementById("container");

//FETCHING DATA
export function fetchMovies(type, category, extras) {
  let baseURL = 'https://api.themoviedb.org/3/';
  let apiKey = `api_key=${API_KEY}`;
  let url = `${baseURL}${type}/${category}?${apiKey}${extras}`;
  
  fetch(url)
  .then(res => res.json())
  .then(data => {
      console.log(data.results);
      if (data.results.length !== 0) {
        showMovies(data.results);
      } else {
        container.innerHTML = '<h1 class="no_results">No results found.</h1>';
      }
  })
};

//DISPLAYING DATA
export const showMovies = data => {
  container.innerHTML = "";
  data.forEach(movie => {
    const {name, poster_path, vote_average, overview, id, first_air_date, title, release_date} = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <img src="${
        poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : "http://via.placeholder.com/300x450"
      }" alt="${name}">

      <div class="movie-info">
        <h3>${name? name: title}</h3>
        <span class="${getVoteColor(
          vote_average
        )}">${vote_average}</span>
      </div>
                
      <div class="overview">
        <h3>Overview</h3>
          ${
            overview.length >= 500
            ? overview.substr(0, 500) + "..."
            : overview
          }
        <br/> 
        <button class="more" id="${id}">Read more</button>
      </div>
    `;

    container.appendChild(movieEl);

    document.getElementById(id).addEventListener("click", () => {
      console.log(id);
      openModal(movie);
    });
  });
};