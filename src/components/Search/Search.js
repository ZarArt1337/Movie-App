import { fetchMovies } from "../MovieList/MovieList.js";

const form = document.getElementById("form");
const search = document.getElementById("search");
const carousel = document.getElementById("carousel");
const lists = document.getElementById("lists");
const categories = document.getElementById('categories');
const searchInfo = document.getElementById('search_info');

form.addEventListener("keyup", e => {
  e.preventDefault();
  
  const searchValue = search.value;
  const extraSearching = `&query=${searchValue}`;
  
  if(searchValue) {
    fetchMovies('search','movie', extraSearching);
    carousel.classList.add('hide');
    lists.classList.add('hide');
    categories.classList.add('hide');
    searchInfo.classList.add('show');
    searchInfo.innerHTML = `<h1>Search reults for: '${searchValue}'</h1>`;
    } else {
      fetchMovies('movie','popular','');
      carousel.classList.remove('hide');
      lists.classList.remove('hide');
      categories.classList.remove('hide');
      searchInfo.classList.remove('show');
    }
});