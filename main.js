import {fetchMovies, fetchTopLists} from "/src/components/MovieList/MovieList.js";

document.addEventListener("DOMContentLoaded", function () {
  fetchMovies('movie','popular','');
  fetchTopLists('movie','top_rated','');
});