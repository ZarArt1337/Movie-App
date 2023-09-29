import { categories } from "./categories.js";

const API_KEY = "32ccb349a74920e218cca3e62608f9ab";

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const container = document.getElementById("container");
const getCategory = document.getElementById("categories");
const modal = document.getElementById("myModal");
const form = document.getElementById("form");
const search = document.getElementById("search");
let selectedCategories = [];

function fetchPopularTvSeries() {
  fetchMovies(`https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`);
}

function fetchPopularMovies() {
  fetchMovies(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
}

function fetchTopRatedMovies() {
  fetchMovies(`https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`);
}

function fetchTopRatedTvSeries() {
  fetchMovies(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`);
}

function fetchMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.results);
      showMovies(data.results);
    });
}

//DISPLAYING DATA
const showMovies = data => {
  container.innerHTML = "";
  data.forEach(movie => {
    const {name, poster_path, vote_average, overview, id, first_air_date, title, release_date} = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
             <img src="${
               poster_path
                 ? `https://image.tmdb.org/t/p/w500${poster_path}`
                 : "http://via.placeholder.com/300x450"
             }" alt="${name}">

            <div class="movie-info">
                <h3>${name? name: title}</h3>
                <span class="${getVoteColor(
                  vote_average
                )}">${vote_average}</span>
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
        `;
    container.appendChild(movieEl);

    document.getElementById(id).addEventListener("click", () => {
      console.log(id);
      openModal(movie);
    });
  });
};

//OPENING & CLOSING MODAL
const closeModal = () => {
  modal.classList.remove("active");
};

const generateModalHTML = movie => {
  return `
    <div class="modal_container">
      <span class="close">&times;</span>
      <h3>Movie name: ${movie.name? movie.name: movie.title}</h3>
      <div class="modal_content">
          <img src="${
            movie.poster_path
              ? IMG_URL + movie.poster_path
              : "http://via.placeholder.com/300x450"
          }" alt="${movie.name}" class="img_modal">
          <div class="modal_other_info">
              <p>Vote average: <span class="${getVoteColor(
                movie.vote_average
              )}">${movie.vote_average}</span></p>
              <p>Release date: ${movie.first_air_date? movie.first_air_date: movie.release_date}</p>
							<p>${movie.overview}</p>
          </div>
      </div>
      
    </div>`;
};

const openModal = movie => {
  modal.classList.add("active");
  modal.innerHTML = generateModalHTML(movie);

  document.addEventListener("click", function (event) {
    if (
      event.target.classList.contains("close") ||
      (event.target.classList.contains("active") &&
        !event.target.closest(".modal_container"))
    ) {
      closeModal();
    }
  });
};

//GETTING VOTE AVERAGE COLOR
const getVoteColor = vote => {
  return vote >= 8 ? "green" : vote >= 5 ? "orange" : "red";
};

//SEARCH MOVIES
form.addEventListener("keyup", e => {
  e.preventDefault();

  const searchValue = search.value;

  if(searchValue) {
      fetchMovies(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchValue}`);
  } else {
      fetchPopularMovies();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  fetchPopularMovies();
});

//DISPLAYING & FECTHING CATEGORIES
function fetchByCategory() {
	categories.forEach(category => {
			const categoryEl = document.createElement('div');
			categoryEl.classList.add('category');
			categoryEl.id=category.id;
			categoryEl.innerText = category.name;
			categoryEl.addEventListener('click', () => {
					if(selectedCategories.length == 0){
							selectedCategories.push(category.id);
					}else{
							if(selectedCategories.includes(category.id)){
									selectedCategories.forEach((id, index) => {
											if(id == category.id){
													selectedCategories.splice(index, 1);
											}
									})
							}else{
									selectedCategories.push(category.id);
							}
					}
					console.log(selectedCategories)
					fetchMovies('https://api.themoviedb.org/3/movie/popular?api_key=32ccb349a74920e218cca3e62608f9ab&with_genres='+selectedCategories)
					highlightSelection();
					
			})
			getCategory.append(categoryEl);
	})
}

//HIGHLIGHTING CATEGORIES
function highlightSelection() {
	const tags = document.querySelectorAll('.category');
	tags.forEach(tag => {
			tag.classList.remove('highlight')
			document.getElementById('clear_btn').classList.add('hide');
	}) 
	if(selectedCategories.length !=0){ 
		document.getElementById('clear_btn').classList.remove('hide'); 
		selectedCategories.forEach(id => {
			const hightlightedCategory = document.getElementById(id);
			hightlightedCategory.classList.add('highlight');
		})
	}
}

function removeHighlight() {
	const clearCategory = document.querySelectorAll(".highlight");
	clearCategory.forEach(clearHighlight => {
		clearHighlight.classList.remove('highlight');
	})
}

//CLEARING BUTTON
document.getElementById("clear_btn").addEventListener("click", () => {
	selectedCategories = [];
	removeHighlight();
	fetchPopularMovies();
	document.getElementById('clear_btn').classList.add('hide');
})

fetchByCategory();