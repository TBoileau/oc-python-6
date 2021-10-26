import '../styles/app.scss';
import CategoryRepository from './repository/CategoryRepository';
import CategoryComponent from './component/CategoryComponent';
import MovieRepository from './repository/MovieRepository';
import EventDispatcher from './event_dispatcher/EventDispatcher';
import CoverComponent from './component/CoverComponent';
import Category from './entity/Category';

const eventDispatcher = new EventDispatcher();
eventDispatcher.register('categoryComponentDidMount');

const categoryRepository = new CategoryRepository('http://127.0.0.1:8000/api/v1/genres');
const movieRepository = new MovieRepository('http://127.0.0.1:8000/api/v1/titles');

let lock = false;

movieRepository.getMostRatedMovie().then((movie) => {
  document.querySelector('main').appendChild(new CoverComponent(movie).element);
});

eventDispatcher.addEventListener('categoryComponentDidMount', (categoryComponent) => {
  document.querySelector('main').appendChild(categoryComponent.element);
  lock = false;
  if ([...document.querySelector('main').children].indexOf(categoryComponent.element) === 2) {
    categoryComponent.element.id = 'categories';
  }
});

categoryRepository.getCategories().then((paginator) => {
  paginator.elements = paginator.elements.sort((a, b) => a.name < b.name ? -1 : 1);

  paginator.elements.unshift(new Category(null, 'Films les mieux notés'));

  paginator.elements.forEach((category, index) => {
    new CategoryComponent(category, movieRepository, eventDispatcher);
  });

  window.addEventListener('scroll', () => {
    if (window.innerHeight - 400 < window.scrollY && !lock) {
      const next = paginator.next();
      if (next === null) {
        return null;
      }

      next.then((paginator) => {
        paginator.elements.forEach((category) => {
          new CategoryComponent(category, movieRepository, eventDispatcher);
        });
      });
    }
  });
});
