const modal = document.getElementById("myModal");
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const API_KEY = "32ccb349a74920e218cca3e62608f9ab";

//CLOSING MODAL
export const closeModal = () => {
  modal.classList.remove("active");
};

//MY FAVOURITE - LOCALSTORAGE
const heartChecking = movie => {
  const heart = document.querySelector(".heart-icon");
  const savedMovies = JSON.parse(localStorage.getItem("favorite"));

  if (savedMovies.includes(`${movie.id}`)) {
    heart.classList.add("red_heart");
  }

  heart.addEventListener("click", () => {
    if (
      heart.classList.contains("red_heart") &&
      savedMovies.includes(`${movie.id}`)
    ) {
      heart.classList.remove("red_heart");
      var index = savedMovies.indexOf(`${movie.id}`);

      if (index !== -1) {
        savedMovies.splice(index, 1);
      }

      localStorage.setItem("favorite", JSON.stringify(savedMovies));
    } else {
      heart.classList.add("red_heart");
      savedMovies.push(`${movie.id}`);
      localStorage.setItem("favorite", JSON.stringify(savedMovies));
    }
  });
};

//GENERATING DATA FOR MODAL
const generateModalHTML = (movie, firstFiveActors) => {
  return `
    <div class="modal_container">
      <span class="close">&times;</span>
      <h3>Movie name: ${
        movie.name ? movie.name : movie.title
      }<span title="Add to favourite" class="heart-icon" id="heart-icon"> &#10084;</span></h3>
      
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
              <p>CAST: ${firstFiveActors}</p>

              <p>Release date: ${
                movie.first_air_date ? movie.first_air_date : movie.release_date
              }</p>
              <p>${movie.overview}</p>
          </div>
      </div>
    </div>`;
};

//OPENING MODAL
export const openModal = movie => {
  // modal.classList.add("active");
  // modal.innerHTML = generateModalHTML(movie);

  fetch(
    `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=credits`
  )
    .then(response => response.json())
    .then(data => {
      if (data.credits && data.credits.cast) {
        const firstFiveActors = data.credits.cast
          .slice(0, 5)
          .map(actor => actor.name)
          .join(", ");
        modal.classList.add("active");
        modal.innerHTML = generateModalHTML(data, firstFiveActors);
        heartChecking(movie);
      } else {
        console.log("Brak danych o obsadzie");
      }
    })
    .catch(error => {
      console.log("Błąd:", error);
    });

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
export const getVoteColor = vote => {
  return vote >= 8 ? "green" : vote >= 5 ? "orange" : "red";
};
