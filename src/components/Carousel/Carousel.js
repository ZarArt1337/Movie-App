
const API_KEY = "32ccb349a74920e218cca3e62608f9ab";
const carouselBox = document.getElementById("carousel_box");
const carousel = document.getElementById("carousel"),
next = document.getElementById("btn_next"),
prev = document.getElementById("btn_prev");

//CAROUSEL
next.addEventListener("click", e => {
  carousel.scrollBy(220, 0);
});
prev.addEventListener("click", e => {
  carousel.scrollBy(-220, 0);
});

//BUTTON ACTIVATED LIST
const activeListButton = active => {
    const activeOn = document.querySelectorAll(".lists_btn_active");
   
    if (activeOn.length != 0) {
      activeOn.forEach(active =>{
        active.classList.remove("lists_btn_active");
      })
      document.getElementById(active).classList.add("lists_btn_active");
    } else {
      document.getElementById(active).classList.add("lists_btn_active");
    }
  }
  
  //TOP LISTS
  document.getElementById("top_rated_movies").addEventListener("click", () => {
      fetchTopLists('movie','top_rated','');
    activeListButton("top_rated_movies");
  })
  
  document.getElementById("top_rated_series").addEventListener("click", () => {
      fetchTopLists('tv','top_rated','');
    activeListButton("top_rated_series");
  })
  
  document.getElementById("popular_series").addEventListener("click", () => {
      fetchTopLists('tv','popular','');
    activeListButton("popular_series");
  })
  
  document.getElementById("popular_movies").addEventListener("click", () => {
      fetchTopLists('movie','popular','');
    activeListButton("popular_movies");
  })
  
  //FETCHING DATA FOR TOPLISTS
  export function fetchTopLists(type, category, extras) {
    let baseURL = 'https://api.themoviedb.org/3/';
    let apiKey = `api_key=${API_KEY}`;
    let url = `${baseURL}${type}/${category}?${apiKey}${extras}`;
    
    fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.results);
      showTopLists(data.results);
    })
  };
  
  export const showTopLists = data => {
    carouselBox.innerHTML = "";
  
    data.forEach(toplist => {
      const {name, poster_path, vote_average, overview, id, first_air_date, title, release_date} = toplist;
      const carouselEl = document.createElement("div");
      carouselEl.classList.add("carousel_item");
      carouselEl.innerHTML = `
        <img class ='carousel_img' src="${
          poster_path
            ? `https://image.tmdb.org/t/p/w200${poster_path}`
            : "http://via.placeholder.com/300x450"
        }" alt="${name?name:title}">`;
  
      carouselBox.appendChild(carouselEl);
  
      // document.getElementById(id).addEventListener("click", () => {
      //   console.log(id);
      //   openModal(toplist);
      // });
    });
  };