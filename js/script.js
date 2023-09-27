import {categories} from "./categories.js";

const API_KEY = '32ccb349a74920e218cca3e62608f9ab';
const API_URL = 'https://api.themoviedb.org/3/tv/top_rated?api_key=32ccb349a74920e218cca3e62608f9ab';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = 'https://api.themoviedb.org/3/search/movie?api_key=32ccb349a74920e218cca3e62608f9ab&query=';
const container = document.getElementById('container');
const getCategory = document.getElementById('categories');
const modal = document.getElementById("myModal");
const form = document.getElementById("form");
const search = document.getElementById("search");

var lastUrl ='';



//GETTING DATA
// const fetchMovies = async () => {
//     lastUrl = url;
//     const res = await fetch(url);
//     const json = await res.json();
//     console.log(json.results);
//     showMovies(json.results);
//   };

function fetchMovies(url) {
    lastUrl = url;
        fetch(url).then(res => res.json()).then(data => {
            console.log(data.results)
            showMovies(data.results);
      })
}


//DISPLAYING DATA
const showMovies = (data) => {

    data.forEach(movie => {
        const {name, poster_path, vote_average, overview, id, first_air_date} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
             <img src="${poster_path? IMG_URL + poster_path : "http://via.placeholder.com/300x450"}" alt="${name}">

            <div class="movie-info">
                <h3>${name}</h3>
                <span class="${getVoteColor(vote_average)}">${vote_average}</span>
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
        `
        container.appendChild(movieEl);

        document.getElementById(id).addEventListener('click', () => {
            console.log(id);

            fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
                .then(response => response.json())
                .then(response => console.log("response",`https://www.youtube.com/watch?v=${response.results[0].key}`));

            openModal(movie);
        })
    })
}

//OPENING & CLOSING MODAL
const closeModal = () => {
    modal.classList.remove("active");
};

const openModal = (movie) => {

    modal.classList.add('active');
    modal.innerHTML = `
        <div class="modal_container">
            <span class="close">&times;</span>
            <h3>Movie name: ${movie.name}</h3>
            <div class="modal_content">
                <img src="${movie.poster_path? IMG_URL + movie.poster_path : "http://via.placeholder.com/300x450"}" alt="${movie.name}" class="img_modal">
                <div class="modal_other_info">
                    <span>Vote average: <span class="${getVoteColor(movie.vote_average)}">${movie.vote_average}</span></span>
                    <span>First air date: ${movie.first_air_date}</span>
                </div>
            </div>
            <p class="modal_overview">${movie.overview}</p>
            <iframe src="https://www.youtube.com/watch?v=${movie.key}" frameborder="0"></iframe>
        </div>`  

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("close") ||
          (event.target.classList.contains("active") &&
            !event.target.closest(".modal_container"))
        ) {
          closeModal();
        }
    });         
}

//GETTING VOTE AVERAGE COLOR
const getVoteColor = (vote) => {
    return vote >= 8 ? 'green' : vote >= 5 ? 'orange' : 'red';
}
  
//DISPLAYING CATEGORY LIST
 const setCategories = () => {
    categories.forEach(category => {
        const categoryEl = document.createElement('div');
        categoryEl.classList.add('category');
        categoryEl.innerText = category.name;
        getCategory.append(categoryEl);
    })
}

//SEARCH MOVIES
form.addEventListener('keyup', (e) => {
    e.preventDefault();

    const searchValue = search.value;
    if(searchValue && searchValue !== '') {
        fetchMovies(SEARCH_URL+searchValue);
    }else{
        fetchMovies();
    }
})


fetchMovies(API_URL);
setCategories();
