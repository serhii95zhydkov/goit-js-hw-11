export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const URL = 'https://pixabay.com/api/';

    const API_KEY = '31968153-ea36afa9c46b62a3fbea8fe58';

    const ADD_PARAMETERS =
      'image_type=photo&orientation=horizontal&safesearch=true';

    return fetch(
      `${URL}?key=${API_KEY}&q=${this.searchQuery}&${ADD_PARAMETERS}&page=${this.page}&per_page=40`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        this.incrementPage();
        return data;
      });
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
