import MovieComponent from './MovieComponent';

/**
 * Class CategoryComponent
 */
export default class CategoryComponent {
  /**
   * CategoryComponent constructor
   * @param {Category} category
   * @param {MovieRepository} movieRepository
   * @param {EventDispatcher} eventDispatcher
   */
  constructor(category, movieRepository, eventDispatcher) {
    eventDispatcher.register('categoryComponentDidMount');
    this.category = category;
    this.movieRepository = movieRepository;
    this.movieRepository.getMoviesByCategory(1, this.category)
        .then((paginator) => paginator.elements.map((movie) => new MovieComponent(movie)))
        .then(this.createElement.bind(this))
        .then(() => eventDispatcher.dispatch('categoryComponentDidMount', this));
  }

  /**
   * Create DOM element
   * @param {Array<MovieComponent>} movieComponents
   */
  createElement(movieComponents) {
    this.element = document.createElement('section');
    this.element.classList.add('category');

    const title = document.createElement('h1');
    title.textContent = this.category.name;
    this.element.appendChild(title);

    const content = document.createElement('div');
    content.classList.add('category-content');
    this.element.appendChild(content);

    const left = document.createElement('a');
    left.classList.add('control', 'control-left');
    content.appendChild(left);

    const right = document.createElement('a');
    right.classList.add('control', 'control-right');
    content.appendChild(right);

    const movies = document.createElement('div');
    movies.classList.add('movies');
    content.appendChild(movies);

    movieComponents.forEach((movieComponent) => {
      movies.appendChild(movieComponent.element);
    });
  }
}
