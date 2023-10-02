import { fetchMovies } from "../MovieList/MovieList.js";

const form = document.getElementById("form");
const search = document.getElementById("search");

form.addEventListener("keyup", e => {
    e.preventDefault();
  
    const searchValue = search.value;
      const extraSearching = `&query=${searchValue}`;
  
  if(searchValue) {
              fetchMovies('search','movie', extraSearching);
    } else {
        fetchMovies('movie','popular','');
    }
  });