import { fetchMovies } from "../MovieList/MovieList.js";

const form = document.getElementById("form");
const search = document.getElementById("search");
const lists = document.getElementById("lists");
const categories = document.getElementById('categories');
const searchInfo = document.getElementById('search-info');
const pagination = document.getElementById('pagination');
const boxFavourite = document.getElementById("favourite-box");
const hideCategories = document.getElementById("show-categories");

form.addEventListener("keyup", e => {

  const searchValue = search.value;
  const extraSearching = `&query=${searchValue}`;
  
  if(searchValue) {
    fetchMovies('search','movie', extraSearching);
    lists.classList.add('hide');
    categories.classList.add('hide');
    pagination.classList.add('hide');
    searchInfo.classList.add('show');
    boxFavourite.classList.add('hide');
    hideCategories.classList.add('hide');
    searchInfo.innerHTML = `<h1>Search reults for: '${searchValue}'</h1>`;
  } else {
    fetchMovies('movie','popular','');
    lists.classList.remove('hide');
    categories.classList.remove('hide');
    pagination.classList.remove('hide');
    searchInfo.classList.remove('show');
    hideCategories.classList.remove('hide');
  }
});

form.addEventListener("submit", e => {
  e.preventDefault();
});



