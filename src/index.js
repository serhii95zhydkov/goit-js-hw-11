import './css/styles.css';

import ApiService from './api-service';
import { getPhotoCard } from './photo-card';

import { Notify } from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.button'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSearchImages);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const apiService = new ApiService();

function onSearchImages(event) {
  event.preventDefault();

  apiService.query = event.currentTarget.elements.searchQuery.value;
  apiService.resetPage();

  apiService.fetchImages().then(appendImagesMarkup);
};

function onLoadMore() {
  apiService.fetchImages().then(appendImagesMarkup);
};

function appendImagesMarkup(hits) {
  const markup = hits.map(getPhotoCard).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup)
};