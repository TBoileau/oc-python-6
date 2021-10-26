/**
 * Class MovieComponent
 */
export default class MovieComponent {
  /**
   * MovieComponent constructor
   * @param {Movie} movie
   */
  constructor(movie) {
    this.movie = movie;
    this.createElement();
  }

  /**
   * Create DOM element
   */
  createElement() {
    this.element = document.createElement('article');

    const figure = document.createElement('figure');
    this.element.appendChild(figure);

    const image = document.createElement('img');
    image.src = this.movie.imageUrl;
    figure.appendChild(image);

    const caption = document.createElement('figcaption');
    caption.textContent = this.movie.title;
    figure.appendChild(caption);
  }
}
