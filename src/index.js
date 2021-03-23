import './styles.css';
import ApiService from './apiService';
import { refs } from './refs';
import pictureCard from './cards.hbs';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
const _ = require('lodash');
const { alert } = require('@pnotify/core');
const newsApiService = new ApiService();

refs.formInputRef.addEventListener('input', _.debounce(onSearch, 1000));


function onSearch(e) {
      newsApiService.query = e.target.value;
        if (newsApiService.query === '') {
            return emptyRequest()
        }
  newsApiService.resetPage();
  clearPicturesContainer();
    newsApiService.fetchPhoto()
        .then((photos) => {
    console.log(photos);
            if (photos.total === 0) {
                return notFound()
            }
        createMarkup(refs.galleryListRef, pictureCard(photos.hits))
    newsApiService.incrementPage();

        })};

function clearPicturesContainer() {
  refs.galleryListRef.innerHTML = '';
}
function createMarkup(ref, value) {
  ref.insertAdjacentHTML('beforeend', value);
}

function emptyRequest() {
   alert({
  text: "Please enter your query",
  type: 'error'
   });
}
function notFound() {
   alert({
  text: "Pictures not found!",
  type: 'error'
   });
}

const onEntry = entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && newsApiService.query !== '') {
        newsApiService.fetchPhoto().then((photos) => {
        createMarkup(refs.galleryListRef, pictureCard(photos.hits))
        newsApiService.incrementPage();
      });
    }
  });
};

const observer = new IntersectionObserver(onEntry,
{
  rootMargin: '150px',
});
observer.observe(refs.sentinel);