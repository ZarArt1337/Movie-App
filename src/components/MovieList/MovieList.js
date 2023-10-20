import { openModal, getVoteColor } from "../Modal/Modal.js";
import { closeBurger } from "../../../main.js";

const API_KEY = "32ccb349a74920e218cca3e62608f9ab";
const container = document.getElementById("container");
const prev = document.getElementById("prev_page");
const next = document.getElementById("next_page");
const current = document.getElementById("current_page");
const first = document.getElementById("first_page");
const myFavourite = document.getElementById("my_favourite");
const closeFavourite = document.getElementById("close_button");
const boxFavourite = document.getElementById("favourite_box");
const topLists = document.getElementById("top_lists");

let currentPage = 1;
let nextPage = 2;
let prevPage = "";

//FETCHING DATA
export function fetchMovies(type, category, extras) {
  let baseURL = "https://api.themoviedb.org/3/";
  let apiKey = `api_key=${API_KEY}`;
  let url = `${baseURL}${type}/${category}?${apiKey}${extras}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.results);
      if (data.results.length !== 0) {
        showMovies(data.results);
        currentPage = data.page;
        nextPage = currentPage + 1;
        prevPage = currentPage - 1;

        current.innerText = currentPage;
        prev.innerText = prevPage;
        next.innerText = nextPage;

        if (currentPage <= 1) {
          prev.classList.add("hide");
          first.classList.add("hide");
        } else if (currentPage > 2) {
          first.classList.remove("hide");
        } else {
          prev.classList.remove("hide");
        }
      } else {
        container.innerHTML = '<h1 class="no_results">No results found.</h1>';
      }
    });
}

//CREATING LOCALSTORAGE
if (localStorage.getItem("favorite") === null) {
  localStorage.setItem("favorite", JSON.stringify(["start"]));
}

//DISPLAYING DATA
export const showMovies = data => {
  container.innerHTML = "";

  data.forEach(movie => {
    const {
      name,
      poster_path,
      vote_average,
      overview,
      id,
      first_air_date,
      title,
      release_date
    } = movie;
    const movieEl = document.createElement("div");

    movieEl.classList.add("movie");
    movieEl.innerHTML = generateMovieHTML(movie);
    container.appendChild(movieEl);

    document.getElementById(id).addEventListener("click", () => {
      console.log(id);
      openModal(movie);
      // heartChecking(movie);
    });
  });
};

//GENERATING HTML TO DISPLAY MOVIES
const generateMovieHTML = movie => {
  return `
    <img src="${
      movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "http://via.placeholder.com/300x450"
    }" alt="${movie.title}">
    <div class="movie-info">
      <h3> ${
        movie.title.length >= 30
          ? movie.title.substr(0, 30) + "..."
          : movie.title
      }</h3>
      <span class="${getVoteColor(movie.vote_average)}">${
    movie.vote_average
  }</span>
    </div>
    <div class="overview">
      <h3>Overview</h3>
      ${
        movie.overview.length >= 300
          ? movie.overview.substr(0, 300) + "..."
          : movie.overview
      }
      <br/>
      <button class="more" id="${movie.id}">Read more</button>
    </div>`;
};

//FETCHING DATA FOR TOPLISTS
export function fetchTopLists(type, category, extras) {
  let baseURL = "https://api.themoviedb.org/3/";
  let apiKey = `api_key=${API_KEY}`;
  let url = `${baseURL}${type}/${category}?${apiKey}${extras}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.results);
      showTopLists(data.results);
    });
}

export const showTopLists = data => {
  topLists.innerHTML = "";
  const savedMovies = JSON.parse(localStorage.getItem("favorite"));
  const myFav = savedMovies;

  data.forEach(movie => {
    const { name, poster_path, id, title } = movie;
    const topListsEl = document.createElement("div");
    topListsEl.classList.add("list_item");
    topListsEl.innerHTML = `
      <img class ='list_img' src="${
        poster_path
          ? `https://image.tmdb.org/t/p/w200${poster_path}`
          : "http://via.placeholder.com/300x450"
      }" alt="${name ? name : title}">
      <span class="${getVoteColor(movie.vote_average)} top_average">${
      movie.vote_average
    }</span>
      <div class="list_hidden_context" id="${id}">Read more</div>`;

    topLists.appendChild(topListsEl);

    document.getElementById(id).addEventListener("click", () => {
      console.log(id);
      openModal(movie);
      heartChecking(movie);
    });
  });
};

//BUTTON ACTIVE LIST
const activeListButton = active => {
  const activeOn = document.querySelectorAll(".lists_btn_active");

  if (activeOn.length != 0) {
    activeOn.forEach(active => {
      active.classList.remove("lists_btn_active");
    });
    document.getElementById(active).classList.add("lists_btn_active");
  } else {
    document.getElementById(active).classList.add("lists_btn_active");
  }
};

//CHOSING TOP LIST
document.getElementById("top_rated_movies").addEventListener("click", () => {
  fetchTopLists("movie", "top_rated", "");
  activeListButton("top_rated_movies");
});

document.getElementById("top_rated_series").addEventListener("click", () => {
  fetchTopLists("tv", "top_rated", "");
  activeListButton("top_rated_series");
});

//DISPLAYING FAVOURITE MOVIES
export const showFavoriteMovies = () => {
  myFavourite.innerHTML = "";
  const savedMovie = JSON.parse(localStorage.getItem("favorite"));

  savedMovie.forEach(id => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(movie => {
        const { title, poster_path, vote_average, overview, id } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = generateMovieHTML(movie);

        myFavourite.appendChild(movieEl);

        document.getElementById(id).addEventListener("click", () => {
          console.log(id);
          openModal(movie);
          heartChecking(movie);
        });
      });
  });
};

//MY FAVOURITE OPEN & CLOSE
document.querySelector(".print-fav").addEventListener("click", () => {
  showFavoriteMovies();
  myFavourite.classList.remove("hide");
  boxFavourite.classList.remove("hide");
  boxFavourite.scrollIntoView({ behavior: "smooth" }, true);
});

document.querySelector(".print_fav_burger").addEventListener("click", () => {
  showFavoriteMovies();
  myFavourite.classList.remove("hide");
  boxFavourite.classList.remove("hide");
  closeBurger();
});

closeFavourite.addEventListener("click", () => {
  boxFavourite.classList.add("hide");
});

//PAGINATION
document.getElementById("next_page").addEventListener("click", () => {
  fetchMovies("movie", "popular", `&page=${nextPage}`);
});

document.getElementById("prev_page").addEventListener("click", () => {
  fetchMovies("movie", "popular", `&page=${prevPage}`);
});

document.getElementById("first_page").addEventListener("click", () => {
  fetchMovies("movie", "popular", "&page=1");
});