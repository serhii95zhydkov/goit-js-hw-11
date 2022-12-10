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

  clearGallery();

  apiService.query = event.currentTarget.elements.searchQuery.value;

  if (apiService.query === '') {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  apiService.resetPage();

  apiService.fetchImages().then(appendImages);
}

function onLoadMore() {
  apiService.fetchImages().then(appendImages);
}

function appendImages(hits) {
  const markup = hits.map(getPhotoCard).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}
