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
                <span>${vote_average}</span>
            </div>
                
            <div class="overview">

                <h3>Overview</h3>
                ${(overview.substr(0,500)+'..')}
                <br/> 
                <button class="more">Read more</button
            </div>
        `
        main.appendChild(movieEl);
    })
}
