import {openModal, getVoteColor} from "../Modal/Modal.js";
const API_KEY = "32ccb349a74920e218cca3e62608f9ab";
const container = document.getElementById("container");
const prev = document.getElementById('prev_page');
const next = document.getElementById('next_page');
const current = document.getElementById('current_page');
const first = document.getElementById('first_page');
const myFavourite = document.getElementById("my_favourite");
const closeFavourite = document.getElementById("close_favourite");

let currentPage = 1;
let nextPage = 2;
let prevPage = '';

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
        currentPage = data.page;
        nextPage = currentPage + 1;
        prevPage = currentPage - 1;

        current.innerText = currentPage;
        prev.innerText = prevPage;
        next.innerText = nextPage;

        if(currentPage <= 1){
          prev.classList.add('hide');
          first.classList.add('hide');
        }else if(currentPage>2){
          first.classList.remove('hide');
        }else {
          prev.classList.remove('hide');
        }

      } else {
        container.innerHTML = '<h1 class="no_results">No results found.</h1>';
      }
  })
};

//CREATING LOCALSTORAGE
if (localStorage.getItem('favorite') === null) {
  localStorage.setItem('favorite',JSON.stringify(['start']));
}  

//DISPLAYING DATA
export const showMovies = data => {
  container.innerHTML = "";

  const savedMovies = JSON.parse(localStorage.getItem('favorite'));
  const myFav = savedMovies;

  data.forEach(movie => {
    const {name, poster_path, vote_average, overview, id, first_air_date, title, release_date} = movie;
    const movieEl = document.createElement("div");

    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <img src="${
        poster_path
        ? `https://image.tmdb.org/t/p/w500${poster_path}`
        : "http://via.placeholder.com/300x450"
      }" alt="${title}">

      <div class="movie-info">
        <h4>${
          title.length >= 20
          ? title.substr(0, 20) + "..."
          : title}</h4>
        <span class="${getVoteColor(
          vote_average
        )}">${vote_average}</span>
      </div>
                
      <div class="overview">
        <h3>Overview</h3>
          ${
            overview.length >= 300
            ? overview.substr(0, 300) + "..."
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
      
      //MY FAVOURITE - LOCALSTORAGE
      const heart = document.querySelector('.heart-icon');

      if (savedMovies.includes(`${id}`)) {
        heart.classList.add('red_heart');
      }

      heart.addEventListener('click', ()=> {

        if (heart.classList.contains('red_heart') && savedMovies.includes(`${id}`)) {
          heart.classList.remove('red_heart');
          var index = myFav.indexOf(`${id}`);

          if (index !== -1) {
             myFav.splice(index, 1);
          }

          localStorage.setItem('favorite',JSON.stringify(myFav));

        } else {

          heart.classList.add('red_heart');
          myFav.push(`${id}`);
          localStorage.setItem('favorite',JSON.stringify(myFav));

        }  
      });
    });
  });
  console.log(savedMovies);
};

export const showFavoriteMovies = () => { 
  myFavourite.innerHTML = "";

  const savedMovieIds = JSON.parse(localStorage.getItem("favorite"));
  const myFav = savedMovieIds;
  
  savedMovieIds.forEach(id => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then(res => res.json())
      .then(movie => {
        const { title, poster_path, vote_average, overview, id } = movie;
        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML = `
          <img src="${
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : "http://via.placeholder.com/300x450"
          }" alt="${title}">
          <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getVoteColor(vote_average)}">${vote_average}</span>
          </div>
          <div class="overview">
            <h3>Overview</h3>
            ${
              overview.length >= 300
                ? overview.substr(0, 300) + "..."
                : overview
            }
            <br/>
            <button class="more" id="${id}">Read more</button>
          </div>
        `;

        myFavourite.appendChild(movieEl);

        document.getElementById(id).addEventListener("click", () => {
          console.log(id);
          openModal(movie);
          
          //MY FAVOURITE - LOCALSTORAGE
          const heart = document.querySelector('.heart-icon');

          if (savedMovieIds.includes(`${id}`)) {
            heart.classList.add('red_heart');
          }
        
          heart.addEventListener('click', ()=> {
          
            if (heart.classList.contains('red_heart') && savedMovieIds.includes(`${id}`)) {
              heart.classList.remove('red_heart');
              var index = myFav.indexOf(`${id}`);
            
              if (index !== -1) {
                 myFav.splice(index, 1);
              }
            
              localStorage.setItem('favorite',JSON.stringify(myFav));
            
            } else {
            
              heart.classList.add('red_heart');
              myFav.push(`${id}`);
              localStorage.setItem('favorite',JSON.stringify(myFav));
            
            }  
          });
        })
      });
  });
};

//PAGINATION
document.getElementById('next_page').addEventListener("click", () => {
  fetchMovies('movie','popular',`&page=${nextPage}`);
});

document.getElementById('prev_page').addEventListener("click", () => {
  fetchMovies('movie','popular',`&page=${prevPage}`);
});

document.getElementById('first_page').addEventListener("click", () => {
  fetchMovies('movie','popular','&page=1');
});

document.querySelector(".print-fav").addEventListener("click", () => {
  showFavoriteMovies();
  myFavourite.classList.remove('hide');
  closeFavourite.classList.remove('hide');
});

closeFavourite.addEventListener("click", () => {
  closeFavourite.classList.add('hide');
  myFavourite.classList.add('hide');
});