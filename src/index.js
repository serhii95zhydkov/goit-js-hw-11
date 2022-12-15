import './css/styles.css';

import ApiService from './api-service';
import { getPhotoCard } from './photo-card';

import { Notify } from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSearchImages);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const apiService = new ApiService();

onHideLoadMoreBtn();

function onSearchImages(event) {
  event.preventDefault();

  onHideLoadMoreBtn();

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

  onShowLoadMoreBtn();
}

function onLoadMore() {
  apiService.fetchImages().then(appendImages);
}

function appendImages(data) {
  const markup = data.hits.map(getPhotoCard).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);

  if (apiService.page === 2) {
    Notify.success(`Hooray! We found ${data.totalHits} images.`);
  }

  const totalPage = data.totalHits / 40;
  if (apiService.page > totalPage) {
    onHideLoadMoreBtn();
    Notify.info(`We're sorry, but you've reached the end of search results.`);
  }

  lightbox.refresh();
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function onShowLoadMoreBtn() {
  refs.loadMoreBtn.classList.remove('is-hidden');
}

function onHideLoadMoreBtn() {
  refs.loadMoreBtn.classList.add('is-hidden');
}

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
