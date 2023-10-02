import {fetchMovies} from "/src/components/MovieList/MovieList.js";

document.addEventListener("DOMContentLoaded", function () {
  fetchMovies('movie','popular','');
});