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
  scrollup: document.querySelector('.scrollup'),
};

refs.form.addEventListener('submit', onSearchImages);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

const apiService = new ApiService();

onHideScrollup();
onHideLoadMoreBtn();

async function onSearchImages(event) {
  event.preventDefault();

  onHideLoadMoreBtn();

  clearGallery();

  apiService.query = event.currentTarget.elements.searchQuery.value.trim();

  if (apiService.query === '') {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  apiService.resetPage();
  refs.form.reset();

  try {
    const data = await apiService.fetchImages();

    onShowLoadMoreBtn();
    onShowScrollup();

    const array = await appendImages(data);

    return array;
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return error;
  }

  // apiService.fetchImages().then(appendImages);
}

async function onLoadMore() {
  onSmoothScrolling(refs.gallery);

  try {
    const data = await apiService.fetchImages();

    const array = await appendImages(data);

    return array;
  } catch (error) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return error;
  }

  // apiService.fetchImages().then(appendImages);
}

function appendImages(data) {
  const markup = data.hits.map(getPhotoCard).join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);

  if (data.hits.length === 0) {
    onHideLoadMoreBtn();
    onHideScrollup();

    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

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

function onSmoothScrolling() {
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function onShowScrollup() {
  refs.scrollup.classList.remove('is-hidden');
}

function onHideScrollup() {
  refs.scrollup.classList.add('is-hidden');
}
