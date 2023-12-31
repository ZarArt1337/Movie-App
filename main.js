import {fetchMovies, fetchTopLists} from "/src/components/MovieList/MovieList.js";

document.addEventListener("DOMContentLoaded", function () {
  fetchMovies('movie','popular','');
  fetchTopLists('movie','top_rated','');
});

//HAMBURGER MENU
const burger = document.getElementById("burgerLinks");
const icon = document.getElementById("icon");

export const closeBurger = () => {
  burger.classList.remove('active');
};

icon.addEventListener("click", () => {
  if (burger.classList.contains('active')){
    closeBurger(); 
  } else {
    burger.classList.add('active');
  } 
});

document.addEventListener('mouseup', function(e) {
  if ((!burger.contains(e.target)) && (!icon.contains(e.target))) {
    closeBurger();
  }
});

//MORE CATEGORIES LIST
const moreCategories = document.getElementById("display-categories");
const categories = document.getElementById("categories");
const hideCategories = document.getElementById("hide-categories");

moreCategories.addEventListener("click", () => {
  categories.classList.add('show-more-categories');
  hideCategories.classList.remove('hide');
  moreCategories.classList.add('hide');
});
  
hideCategories.addEventListener("click", () => {
    categories.classList.remove('show-more-categories');
    moreCategories.classList.remove('hide');
    hideCategories.classList.add('hide');
});
  
//MORE LIST
const moreLists = document.getElementById("display-lists");
const lists = document.getElementById("top-lists");
const hideLists = document.getElementById("hide-lists");

moreLists.addEventListener("click", () => {
  lists.classList.add('show-more-categories');
  hideLists.classList.remove('hide');
  moreLists.classList.add('hide');
});
  
hideLists.addEventListener("click", () => {
    lists.classList.remove('show-more-categories');
    moreLists.classList.remove('hide');
    hideLists.classList.add('hide');
});