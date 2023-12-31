import {categories} from "./Categories.js";
import { fetchMovies } from "../MovieList/MovieList.js";

const pagination = document.getElementById('pagination');
const getCategory = document.getElementById("categories");
let selectedCategories = [];

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
			console.log(selectedCategories);
			const extraCategory = `&with_genres=${selectedCategories}`;
			fetchMovies('movie','popular', extraCategory);
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
		hideClearButton();
	}) 
	if(selectedCategories.length !=0){ 
		pagination.classList.add('hide');
		document.getElementById('clear-btn').classList.remove('hide'); 
		selectedCategories.forEach(id => {
			const hightlightedCategory = document.getElementById(id);
			hightlightedCategory.classList.add('highlight');
		})
	} else {
		pagination.classList.remove('hide');
	}
}

export function removeHighlight() {
	const clearCategory = document.querySelectorAll(".highlight");
	clearCategory.forEach(clearHighlight => {
		clearHighlight.classList.remove('highlight');
	})
}

//CLEARING BUTTON
document.getElementById("clear-btn").addEventListener("click", () => {
	selectedCategories = [];
	removeHighlight();
	fetchMovies('movie','popular','');
	hideClearButton();
	pagination.classList.remove('hide');
})

export function hideClearButton() {
	document.getElementById('clear-btn').classList.add('hide');
}

fetchByCategory();