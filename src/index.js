import './css/styles.css';

import ApiService from './api-service';

import { Notify } from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.form.addEventListener('submit', onSearchImages);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const apiService = new ApiService();


function onSearchImages(event) {
    event.preventDefault();

    apiService.query = event.currentTarget.elements.searchQuery.value;
    
    apiService.fetchImages();
}

function onLoadMore() {
    apiService.fetchImages();
}
