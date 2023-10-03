import {fetchMovies} from "/src/components/MovieList/MovieList.js";
import {fetchTopLists} from "/src/components/Carousel/Carousel.js";

document.addEventListener("DOMContentLoaded", function () {
  fetchMovies('movie','popular','');
  fetchTopLists('movie','top_rated','');
});