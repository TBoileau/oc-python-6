/**
 * Class CoverComponent
 */
export default class CoverComponent {
  /**
   * CoverComponent constructor
   * @param {Movie} movie
   * @param {ModalComponent} modalComponent
   */
  constructor(movie, modalComponent) {
    this.movie = movie;
    this.modalComponent = modalComponent;
    this.createElement();
  }

  /**
   * Create DOM element
   */
  createElement() {
    this.element = document.createElement('section');
    this.element.classList.add('cover');

    const img = document.createElement('img');
    img.src = this.movie.imageUrl;
    this.element.appendChild(img);

    const wrapper = document.createElement('div');
    this.element.appendChild(wrapper);

    const container = document.createElement('div');
    container.classList.add('container');
    wrapper.appendChild(container);

    const title = document.createElement('h1');
    title.textContent = this.movie.title;
    container.appendChild(title);

    const play = document.createElement('a');
    play.classList.add('btn', 'btn-primary');
    play.href = '#';
    play.textContent = 'Lecture';
    container.appendChild(play);

    play.addEventListener('click', (e) => {
      e.preventDefault();
      this.modalComponent.open(this.movie);
    });
  }
}
