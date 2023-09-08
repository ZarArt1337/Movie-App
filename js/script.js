//TMDB 

const API_URL = 'https://api.themoviedb.org/3/tv/popular?api_key=1cf50e6248dc270629e802686245c2c8';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

//GETTING DATA
const fetchMovies = async () => {
    const res = await fetch(API_URL);
    const json = await res.json();
    console.log(json.results);
    showMovies(json.results);
  };
  
  fetchMovies();


//DISPLAYING DATA
function showMovies(data) {
    
    const main = document.getElementById('main');

    data.forEach(movie => {
        const {name, poster_path, vote_average, overview} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML = `
             <img src="${IMG_URL + poster_path}" alt="${name}">

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
                <button class="more">Read more</button
            </div>
        `
        main.appendChild(movieEl);
    })
}

//GETTING VOTE AVERAGE COLOR
function getVoteColor(vote) {
    if (vote>= 8) {
        return 'green'
    } else if (vote >= 5) {
        return "orange"
    } else {
        return 'red'
    }
}


const categories = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]
  
//DISPLAYING CATEGORY LIST
const CategoryEl = document.getElementById('categories');

function setCategories() {
    categories.forEach(category => {
        const cat = document.createElement('div');
        cat.classList.add('cat');
        cat.innerText = category.name;
        CategoryEl.append(cat);
    })
}
setCategories();