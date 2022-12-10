export default class ApiService {
    constructor() {
        this.searchQuery = '';
  }

  fetchImages() {
    const URL = 'https://pixabay.com/api/';

    const API_KEY = '31968153-ea36afa9c46b62a3fbea8fe58';

    const ADD_PARAMETERS =
        'image_type=photo&orientation=horizontal&safesearch=true';
      
    
    fetch(`${URL}?key=${API_KEY}&q=${this.searchQuery}&${ADD_PARAMETERS}&page=1&per_page=40`)
    .then(r => r.json())
    .then(console.log);
    }
    
    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}
