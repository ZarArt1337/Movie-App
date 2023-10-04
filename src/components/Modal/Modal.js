const modal = document.getElementById("myModal");
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

//CLOSING MODAL
export const closeModal = () => {
    modal.classList.remove("active");
  };

//GENERATING DATA FOR MODAL
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

//OPENING MODAL
export const openModal = movie => {
  modal.classList.add("active");
  modal.innerHTML = generateModalHTML(movie);
  
  document.addEventListener("click", function (event) {
    if (event.target.classList.contains("close") ||
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