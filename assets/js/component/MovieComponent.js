/**
 * Class MovieComponent
 */
export default class MovieComponent {
  /**
   * MovieComponent constructor
   * @param {Movie} movie
   * @param {ModalComponent} modalComponent
   */
  constructor(movie, modalComponent) {
    this.movie = movie;
    this.modalComponent = modalComponent;
    this.createElement = this.createElement.bind(this);
    this.createElement();
  }

  /**
   * Create DOM element
   */
  createElement() {
    this.element = document.createElement('article');

    const figure = document.createElement('picture');
    this.element.appendChild(figure);

    const image = document.createElement('img');
    image.src = this.movie.imageUrl;
    image.alt = this.movie.title;
    figure.appendChild(image);

    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      this.modalComponent.open(this.movie);
    });
  }
}
