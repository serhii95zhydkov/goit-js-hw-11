import "./css/styles.css";

import { Notify } from "notiflix";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const URL = "https://pixabay.com/api/";

const API_KEY = "31968153-ea36afa9c46b62a3fbea8fe58";

const ADD_PARAMETERS = "image_type=photo&orientation=horizontal&safesearch=true";

const refs = {
    form: document.querySelector("#search-form"),
}

refs.form.addEventListener("submit", onSearchImages);

function onSearchImages(event) {
    event.preventDefault();

    const searchImages = event.currentTarget.elements.searchQuery.value;
    console.log(searchImages);

    fetch(`${URL}?key=${API_KEY}&q=${searchImages}&${ADD_PARAMETERS}&page=1&per_page=40`)
    .then(r => r.json())
    .then(console.log);
};