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
    this.page = 1;
    this.left = this.left.bind(this);
    this.right = this.right.bind(this);
    this.scroll = this.scroll.bind(this);
    this.render = this.render.bind(this);
    this.createElement = this.createElement.bind(this);
    this.category = category;
    this.movieRepository = movieRepository;
    this.movieRepository.getMoviesByCategory(this.page, this.category)
        .then(this.createElement)
        .then(() => eventDispatcher.dispatch('categoryComponentDidMount', this));
  }

  /**
   * Create DOM element
   * @param {Paginator} paginator
   */
  createElement(paginator) {
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
    left.style.display = 'None';
    content.appendChild(left);
    left.addEventListener('click', this.left);

    const right = document.createElement('a');
    right.classList.add('control', 'control-right');
    content.appendChild(right);
    right.addEventListener('click', this.right);

    const movies = document.createElement('div');
    movies.classList.add('movies');
    content.appendChild(movies);

    left.style.display = this.page > 1 ? 'flex': 'none';
    right.style.display = this.page < paginator.pages ? 'flex': 'none';

    this.render(paginator);
  }

  /**
   * Render movies
   * @param {Paginator} paginator
   */
  render(paginator) {
    this.paginator = paginator;
    const content = this.element.querySelector('.category-content');
    const movies = content.querySelector('.movies');

    this.paginator.elements
        .map((movie) => new MovieComponent(movie))
        .forEach((movieComponent) => movies.appendChild(movieComponent.element));
  }

  /**
   * Scroll to left
   */
  left() {
    this.page--;
    const content = this.element.querySelector('.category-content');
    this.scroll(-content.clientWidth);
  }

  /**
   * Scroll to right
   */
  right() {
    this.page++;
    const content = this.element.querySelector('.category-content');

    if (this.page <= this.paginator.currentPage) {
      this.scroll(content.clientWidth);
      return;
    }

    this.paginator.next().then(this.render).then(() => this.scroll(content.clientWidth));
  }

  /**
   * Scroll movies
   * @param {int} width
   * @return {Promise}
   */
  scroll(width) {
    const content = this.element.querySelector('.category-content');
    const left = content.querySelector('.control-left');
    const right = content.querySelector('.control-right');
    const movies = content.querySelector('.movies');

    left.style.display = this.page > 1 ? 'flex': 'none';
    right.style.display = this.page < this.paginator.pages ? 'flex': 'none';

    return new Promise((resolve) => {
      let same = 0;
      let lastPosition = null;

      movies.scroll({
        left: movies.scrollLeft + width + (width > 0 ? 16 : -16),
        behavior: 'smooth',
      });

      const check = () => {
        const position = movies.getBoundingClientRect().left;

        if (position === lastPosition) {
          if (same ++ > 2) {
            return resolve();
          }
        } else {
          same = 0;
          lastPosition = position;
        }

        requestAnimationFrame(check);
      };

      requestAnimationFrame(check);
    });
  };
}
