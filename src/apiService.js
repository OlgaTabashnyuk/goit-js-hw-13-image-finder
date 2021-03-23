const BASE_URL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const KEY = "20527083-60e3a2c02ad8fed093670ddbc";
  
export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPhoto() {
    const url = ` ${BASE_URL}&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${KEY}`;
    return fetch(url).then(response => response.json());
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