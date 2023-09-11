import {categories} from "./categories.js";

const API_URL = 'https://api.themoviedb.org/3/tv/popular?api_key=1cf50e6248dc270629e802686245c2c8';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const container = document.getElementById('container');
const getCategory = document.getElementById('categories');
const modal = document.getElementById("myModal");

//GETTING DATA
const fetchMovies = async () => {
    const res = await fetch(API_URL);
    const json = await res.json();
    console.log(json.results);
    showMovies(json.results);
  };

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
            console.log(id)
            openModal(movie)
        })
    })
}

//OPENING MODAL
const openModal = (movie) => {

    modal.style.display = "block";
    modal.innerHTML = `
        <div class="modal_container">
            <span class="close" onclick="document.getElementById('myModal').style.display='none'">&times;</span>
            <h3>Movie name: ${movie.name}</h3>
            <div class="modal_content">
                <img src="${movie.poster_path? IMG_URL + movie.poster_path : "http://via.placeholder.com/300x450"}" alt="${movie.name}"     class="img_modal">
                <div class="modal_other_info">
                    <span>Vote average: <span class="${getVoteColor(movie.vote_average)}">${movie.vote_average}</span></span>
                    <span>First air date: ${movie.first_air_date}</span>
                </div>
            </div>
            <p class="modal_overview">${movie.overview}</p>
        </div>
        `  
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

fetchMovies();
setCategories();

