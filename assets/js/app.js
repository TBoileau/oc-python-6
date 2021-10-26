import '../styles/app.scss';
import CategoryRepository from './repository/CategoryRepository';
import CategoryComponent from './component/CategoryComponent';
import MovieRepository from './repository/MovieRepository';
import EventDispatcher from './event_dispatcher/EventDispatcher';
import CoverComponent from './component/CoverComponent';
import Category from './entity/Category';
import ModalComponent from './component/ModalComponent';

const eventDispatcher = new EventDispatcher();
eventDispatcher.register('categoryComponentDidMount');

const categoryRepository = new CategoryRepository(`${process.env.API_URL}/genres`);
const movieRepository = new MovieRepository(`${process.env.API_URL}/titles`);

let lock = false;

const modalComponent = new ModalComponent(movieRepository);
document.querySelector('main').appendChild(modalComponent.element);

movieRepository.getMostRatedMovie().then((movie) => {
  document.querySelector('main').appendChild(new CoverComponent(movie, modalComponent, movieRepository).element);

  categoryRepository.getCategories().then((paginator) => {
    paginator.elements = paginator.elements.sort((a, b) => a.name < b.name ? -1 : 1);

    paginator.elements.unshift(new Category(null, 'Films les mieux notés'));

    paginator.elements.forEach((category, index) => {
      new CategoryComponent(category, movieRepository, eventDispatcher, modalComponent);
    });

    window.addEventListener('scroll', () => {
      if (window.innerHeight - 400 < window.scrollY && !lock) {
        const next = paginator.next();
        if (next === null) {
          return null;
        }

        next.then((paginator) => {
          paginator.elements.forEach((category) => {
            new CategoryComponent(category, movieRepository, eventDispatcher, modalComponent);
          });
        });
      }
    });
  });
});

eventDispatcher.addEventListener('categoryComponentDidMount', (categoryComponent) => {
  document.querySelector('main').appendChild(categoryComponent.element);
  lock = false;
  if ([...document.querySelector('main').children].indexOf(categoryComponent.element) === 3) {
    categoryComponent.element.id = 'categories';
  }
});
