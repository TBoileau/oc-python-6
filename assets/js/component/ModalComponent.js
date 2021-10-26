/**
 * Class ModalComponent
 */
export default class ModalComponent {
  /**
   * ModalComponent constructor
   * @param {ModalRepository} movieRepository
   */
  constructor(movieRepository) {
    this.movieRepository = movieRepository;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.createElement();
  }

  /**
   * Create DOM element
   */
  createElement() {
    this.element = document.createElement('div');
    this.element.classList.add('modal');

    const content = document.createElement('div');
    content.classList.add('modal-content');
    this.element.appendChild(content);

    const close = document.createElement('a');
    close.classList.add('modal-close');
    close.textContent = '×';
    close.addEventListener('click', this.close);
    content.appendChild(close);

    const figure = document.createElement('figure');
    content.appendChild(figure);

    this.image = document.createElement('img');
    figure.appendChild(this.image);

    const caption = document.createElement('figcaption');
    figure.appendChild(caption);

    const movie = document.createElement('div');
    content.appendChild(movie);

    this.title = document.createElement('h1');
    movie.appendChild(this.title);

    const description = document.createElement('ul');
    movie.appendChild(description);

    this.categories = document.createElement('li');
    description.appendChild(this.categories);

    this.publishedAt = document.createElement('li');
    description.appendChild(this.publishedAt);

    this.rated = document.createElement('li');
    description.appendChild(this.rated);

    this.score = document.createElement('li');
    description.appendChild(this.score);

    this.directors = document.createElement('li');
    description.appendChild(this.directors);

    this.actors = document.createElement('li');
    description.appendChild(this.actors);

    this.duration = document.createElement('li');
    description.appendChild(this.duration);

    this.countries = document.createElement('li');
    description.appendChild(this.countries);

    this.income = document.createElement('li');
    description.appendChild(this.income);

    this.description = document.createElement('li');
    description.appendChild(this.description);
  }

  /**
   * Open model
   * @param {Movie} movie
   */
  open(movie) {
    this.movieRepository.getFullDetailOfMovie(movie).then(() => {
      this.element.classList.add('modal-open');
      document.body.classList.add('modal-open');

      const hours = Math.floor(movie.duration / 60);
      const minutes = movie.duration % 60;
      const duration = `${hours}h${minutes}`;

      this.image.src = movie.imageUrl;
      this.title.textContent = movie.title;
      this.categories.textContent = `Catégories : ${movie.categories.join(', ')}`;
      this.publishedAt.textContent = `Date de sortie : 
      ${movie.publishedAt.getDate()}/${movie.publishedAt.getMonth()}/${movie.publishedAt.getFullYear()}`;
      this.rated.textContent = `Rated : ${movie.rated}`;
      this.score.textContent = `Score IMDB : ${movie.score}/10`;
      this.directors.textContent = `Réalisateur(s) : ${movie.directors.join(', ')}`;
      this.actors.textContent = `Acteurs : ${movie.actors.join(', ')}`;
      this.duration.textContent = `Durée : ${duration}`;
      this.countries.textContent = `Pays d'origin : ${movie.countries.join(', ')}`;
      this.income.textContent = `Box office : ${movie.income !== null ? `${movie.income}$` : 'N/C'}`;
      this.description.textContent = `Synopsis : ${movie.description}`;
    });
  }

  /**
   * Close modal
   * @param {HTMLElement} e
   */
  close(e) {
    e.preventDefault();
    this.element.classList.remove('modal-open');
    document.body.classList.remove('modal-open');
  }
}
